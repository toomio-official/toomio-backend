import { Body, Controller, Post } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { Journey } from './journey.schema';

@Controller('journeys')
export class JourneysController {
  constructor(private journeysService: JourneysService) {}

  @Post()
  async createJourney(@Body() journey: Journey) {
    return await this.journeysService.createJourney(journey);
  }
}
