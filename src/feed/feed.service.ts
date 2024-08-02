import { Injectable } from '@nestjs/common';
import { AwsSqsService } from 'src/aws-sqs/aws-sqs.service';
import { SMPostsService } from 'src/posts/smPosts.service';

@Injectable()
export class FeedService {
    constructor(
        private smPostsService: SMPostsService,
        private sqsService: AwsSqsService,
    ) {}


    async getFeedForAUser(userEmail: string) {

        let sqsQueueName: string = userEmail.replace('@', '_').replace('.', '_');
        const queueBaseUrl = process.env.AWS_SQS_URL;
        const queueUrl = queueBaseUrl +'/' + sqsQueueName;

        const queueResponse = await this.sqsService.receiveMessages(queueUrl);

        let postIds = [];

        if (queueResponse === undefined) {
            return [];
        }
        for (let message of queueResponse) {
            postIds.push(message.MessageAttributes.Id.StringValue);
        }

        const posts = await this.smPostsService.getPostsByIds(postIds);
        return posts;

    }
}
