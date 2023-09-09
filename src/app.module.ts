import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JourneysModule } from './journeys/journeys.module';

@Module({
  imports: [MongooseModule.forRoot('MONOGODB_URL'), JourneysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
