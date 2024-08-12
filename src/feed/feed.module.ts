import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { SMPostsService } from 'src/posts/smPosts.service';
import { AwsSqsService } from 'src/aws-sqs/aws-sqs.service';
import { SMPostRepository } from 'src/posts/smPost.repository';
import { LikesService } from 'src/likes/likes.service';
import { UserRepository } from 'src/auth/users/user.repository';
import { CommentsService } from 'src/comments/comments.service';
import { UsersService } from 'src/auth/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SMPost, SMPostSchema } from 'src/posts/smPost.schema';
import { Like, LikeSchema } from 'src/likes/like.schema';
import { User, UserSchema } from 'src/auth/users/user.schema';
import { Comment, CommentSchema } from 'src/comments/comment.schema';
import { LikeRepository } from 'src/likes/like.repository';
import { CommentRepository } from 'src/comments/comment.repository';
import {
  Notification,
  NotificationSchema,
} from 'src/notifications/notification.schema';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationRepository } from 'src/notifications/notifications.repository';
import { JourneyRepository } from 'src/journeys/journey.repository';
import { Journey, JourneySchema } from 'src/journeys/journey.schema';
import { JourneysService } from 'src/journeys/journeys.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SMPost.name, schema: SMPostSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }]),
  ],
  providers: [
    FeedService,
    SMPostsService,
    AwsSqsService,
    SMPostRepository,
    LikesService,
    UserRepository,
    CommentsService,
    UsersService,
    LikeRepository,
    CommentRepository,
    NotificationsService,
    NotificationRepository,
    JourneyRepository,
    JourneysService,
  ],
  controllers: [FeedController],
})
export class FeedModule {}
