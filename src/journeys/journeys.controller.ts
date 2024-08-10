import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { Journey } from './journey.schema';
import { JourneyCreateDto } from './dto/journeyCreate.dto';
import { JourneyUpdateDto } from './dto/journeyUpdate.dto';

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

  @Delete('/:journeyId')
  @HttpCode(204)
  async deleteJourney(@Param('journeyId') journeyId: string) {
    const res = await this.journeysService.deleteJourney(journeyId);
    if (!res) {
      throw new NotFoundException(`Journey with id ${journeyId} not found`);
    }
  }

  @Put('/:journeyId')
  @UsePipes(ValidationPipe)
  async updateJourney(
    @Param('journeyId') journeyId: string,
    @Body() journeyUpdateDto: JourneyUpdateDto,
  ): Promise<Journey> {
    journeyUpdateDto._id = journeyId;
    return await this.journeysService.updateJourney(journeyUpdateDto);
  }

  @Get('/user/:userEmail')
  async getJourneysByUser(
    @Param('userEmail') userEmail: string,
  ): Promise<Journey[]> {
    return await this.journeysService.getJourneysByUser(userEmail);
  }
}
