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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SMPost.name, schema: SMPostSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SMPostsController],
  providers: [SMPostsService, SMPostRepository, LikesService, LikeRepository],
})
export class SMPostsModule {}
