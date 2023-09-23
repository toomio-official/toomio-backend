import { Module } from '@nestjs/common';
import { SMPostsController } from './smPosts.controller';
import { SMPostsService } from './smPosts.service';
import { SMPostRepository } from './smPost.repository';
import { SMPost, SMPostSchema } from './smPost.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from 'src/likes/like.schema';
import { User, UserSchema } from 'src/users/user.schema';
import { LikesService } from 'src/likes/likes.service';
import { LikeRepository } from 'src/likes/like.repository';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';
import { CommentsService } from 'src/comments/comments.service';
import { CommentRepository } from 'src/comments/comment.repository';
import { Comment, CommentSchema } from 'src/comments/comment.schema';

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
    UsersService,
    UserRepository,
    CommentsService,
    CommentRepository,
  ],
})
export class SMPostsModule {}
