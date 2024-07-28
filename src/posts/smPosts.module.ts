import { Module } from '@nestjs/common';
import { SMPostsController } from './smPosts.controller';
import { SMPostsService } from './smPosts.service';
import { SMPostRepository } from './smPost.repository';
import { SMPost, SMPostSchema } from './smPost.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from 'src/likes/like.schema';
import { User, UserSchema } from 'src/auth/users/user.schema';
import { LikesService } from 'src/likes/likes.service';
import { LikeRepository } from 'src/likes/like.repository';
import { UserRepository } from 'src/auth/users/user.repository';
import { CommentsService } from 'src/comments/comments.service';
import { CommentRepository } from 'src/comments/comment.repository';
import { Comment, CommentSchema } from 'src/comments/comment.schema';
import { AwsSqsService } from 'src/aws-sqs/aws-sqs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SMPost.name, schema: SMPostSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [SMPostsController],
  providers: [
    SMPostsService,
    SMPostRepository,
    LikesService,
    LikeRepository,
    UserRepository,
    CommentsService,
    CommentRepository,
    AwsSqsService
  ],
})
export class SMPostsModule {}
