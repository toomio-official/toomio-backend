import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { Journey } from './journey.schema';
import { JourneyCreateDto } from './dto/journeyCreate.dto';

@Controller('journeys')
export class JourneysController {
  constructor(private journeysService: JourneysService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createJourney(
    @Body() journeyCreateDto: JourneyCreateDto,
  ): Promise<Journey> {
    return await this.journeysService.createJourney(journeyCreateDto);
  }
}
