import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/users/user.repository';
import { AwsSqsService } from 'src/aws-sqs/aws-sqs.service';
import { JourneysService } from 'src/journeys/journeys.service';
import { SMPostsService } from 'src/posts/smPosts.service';
import { UsersService } from 'src/auth/users/users.service';

@Injectable()
export class FeedService {
  constructor(
    private smPostsService: SMPostsService,
    private sqsService: AwsSqsService,
    private userService: UsersService,
    private journeysService: JourneysService,
  ) {}

  async getFeedForAUser(userEmail: string) {
    let sqsQueueName: string = userEmail.replace(/@/g, '_').replace(/\./g, '_');
    const queueBaseUrl = process.env.AWS_SQS_URL;
    const queueUrl = queueBaseUrl + '/' + sqsQueueName;

    const queueResponse = await this.sqsService.receiveMessages(queueUrl);

    let postIds = [];

    if (queueResponse === undefined) {
      return [];
    }
    for (let message of queueResponse) {
      postIds.push(message.MessageAttributes.Id.StringValue);
    }

    let posts = await this.smPostsService.getPostsByIds(postIds);

    posts = await this.smPostsService.getAllPosts();
    for (let post of posts) {
      const user = await this.userService.findUserByEmail(post.userEmail);
      const journey = await this.journeysService.findJourneyById(
        post.journey.toString(),
      );

      if (user) {
        post.userName = `${user.firstName} ${user.lastName}`;
      }

      if (journey) {
        post.journeyName = journey.title;
      }
    }

    return posts;
  }
}
