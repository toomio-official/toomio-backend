import { Injectable } from '@nestjs/common';
import { SendMessageCommand, CreateQueueCommand, SQSClient } from '@aws-sdk/client-sqs';

@Injectable()
export class AwsSqsService {
  private readonly client: SQSClient;

  constructor() {
    this.client = new SQSClient({});
  }

  async createQueueForPosts(email: string) {
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

  async sendMessageToPostsQueue(email: string) {
    const sqsQueueName: string = email.replace('@', '_').replace('.', '_');
    const queueBaseUrl = process.env.AWS_SQS_URL
    const queueUrl = `${queueBaseUrl}/${sqsQueueName}`;
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
}
