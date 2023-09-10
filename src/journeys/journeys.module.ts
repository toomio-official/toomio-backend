import { Module } from '@nestjs/common';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';

@Module({
  controllers: [JourneysController],
  providers: [JourneysService],
})
export class JourneysModule {}
