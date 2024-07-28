import { Injectable } from '@nestjs/common';
import { CreateQueueCommand, SQSClient } from "@aws-sdk/client-sqs";

@Injectable()
export class AwsSqsService {
    private readonly client: SQSClient;
  
    constructor() {
      this.client = new SQSClient({});
    }
  
    async createQueue(sqsQueueName: string) {
      const command = new CreateQueueCommand({
        QueueName: sqsQueueName,
        Attributes: {
          DelaySeconds: "60",
          MessageRetentionPeriod: "86400",
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
}
