import { Injectable } from '@nestjs/common';
import {
  paginateListQueues,
  SendMessageCommand,
  CreateQueueCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { UsersService } from 'src/auth/users/users.service';

@Injectable()
export class AwsSqsService {
  private readonly client: SQSClient;

  constructor(private usersService: UsersService) {
    this.client = new SQSClient({});
  }

  async createQueueForUser(email: string) {
    let sqsQueueName: string = email.replace('@', '_').replace('.', '_');

    const command = new CreateQueueCommand({
      QueueName: sqsQueueName,
      Attributes: {
        DelaySeconds: '60',
        MessageRetentionPeriod: '86400',
      },
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async sendMessageToAQueue(queueUrl: string) {
    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      DelaySeconds: 10,
      MessageAttributes: {
        Title: {
          DataType: 'String',
          StringValue: 'The Whistler',
        },
        Author: {
          DataType: 'String',
          StringValue: 'John Grisham',
        },
        WeeksOn: {
          DataType: 'Number',
          StringValue: '6',
        },
      },
      MessageBody:
        'Information about current NY Times fiction bestseller for week of 12/11/2016.',
    });

    const response = await this.client.send(command);
    console.log(response);
    return response;
  }

  async sendMessagesToAllUsersQueues(email: string) {
    const queueUrls = await this.listAllQueues();
    for (const queueUrl of queueUrls) {
      await this.sendMessageToAQueue(queueUrl);
    }
  }

  async listAllQueues() {
    const paginatedListQueues = paginateListQueues({ client: this.client }, {});
    const urls: string[] = [];

    for await (const page of paginatedListQueues) {
      const nextUrls = page.QueueUrls?.filter((qurl) => !!qurl) || [];
      urls.push(...nextUrls);
      nextUrls.forEach((url) => console.log(url));
    }

    return urls;
  }
}
