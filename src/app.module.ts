import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JourneysModule } from './journeys/journeys.module';
import { SMPostsModule } from './posts/smPosts.module';
import { LikesModule } from './likes/likes.module';
import { UsersModule } from './auth/users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AwsSqsModule } from './aws-sqs/aws-sqs.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    AuthModule,
    JourneysModule,
    SMPostsModule,
    LikesModule,
    UsersModule,
    CommentsModule,
    AwsSqsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
