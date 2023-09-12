import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JourneysModule } from './journeys/journeys.module';
import { SMPostsModule } from './posts/smPosts.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    JourneysModule,
    SMPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
