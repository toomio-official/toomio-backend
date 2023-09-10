import { Injectable } from '@nestjs/common';
import { JourneyRepository } from './journey.repository';
import { JourneyCreateDto } from './dto/journeyCreate.dto';
import { Journey } from './journey.schema';

@Injectable()
export class JourneysService {
  constructor(private journeyRepository: JourneyRepository) {}
  async createJourney(journeyCreateDto: JourneyCreateDto): Promise<Journey> {
    return await this.journeyRepository.createJourney(journeyCreateDto);
  }
}
