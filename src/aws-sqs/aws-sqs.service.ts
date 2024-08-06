import { Injectable } from '@nestjs/common';
import {
  paginateListQueues,
  SendMessageCommand,
  CreateQueueCommand,
  SQSClient,
  ReceiveMessageCommandInput,
  ReceiveMessageCommand,
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
        MessageRetentionPeriod: '2592000',
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

  async sendMessageToAQueue(queueUrl: string, postId) {
    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      DelaySeconds: 10,
      MessageAttributes: {
        Id: {
          DataType: 'String',
          StringValue: postId,
        },
      },
      MessageBody: 'Post IDs to be seen by the user.',
    });

    const response = await this.client.send(command);
    console.log(response);
    return response;
  }

  async sendMessagesToAllUsersQueues(email: string, postId: string) {
    const queueUrls = await this.listAllQueues();
    for (const queueUrl of queueUrls) {
      await this.sendMessageToAQueue(queueUrl, postId);
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

  async receiveMessages(
    queueUrl: string,
    maxNumberOfMessages: number = 10,
    waitTimeSeconds: number = 20,
  ) {
    const input: ReceiveMessageCommandInput = {
      QueueUrl: queueUrl,
      AttributeNames: ['All'],
      MessageAttributeNames: ['All'],
      MaxNumberOfMessages: maxNumberOfMessages,
      WaitTimeSeconds: waitTimeSeconds,
    };

    const command = new ReceiveMessageCommand(input);
    const response = await this.client.send(command);

    return response.Messages;
  }
}
