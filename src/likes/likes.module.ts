import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeRepository } from './like.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  providers: [LikesService, LikeRepository],
})
export class LikesModule {}
