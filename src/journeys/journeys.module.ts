import { Module } from '@nestjs/common';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { JourneyRepository } from './journey.repository';
import { Journey, JourneySchema } from './journey.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }]),
  ],
  controllers: [JourneysController],
  providers: [JourneysService, JourneyRepository],
})
export class JourneysModule {}
