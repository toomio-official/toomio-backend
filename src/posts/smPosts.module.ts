import { Module } from '@nestjs/common';
import { SMPostsController } from './smPosts.controller';
import { SMPostsService } from './smPosts.service';
import { SMPostRepository } from './smPost.repository';
import { SMPost, SMPostSchema } from './smPost.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SMPost.name, schema: SMPostSchema }]),
  ],
  controllers: [SMPostsController],
  providers: [SMPostsService, SMPostRepository],
})
export class SMPostsModule {}
