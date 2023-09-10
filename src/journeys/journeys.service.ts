import { Injectable } from '@nestjs/common';
import { JourneyRepository } from './journey.repository';
import { Journey } from './journey.schema';

@Injectable()
export class JourneysService {
  constructor(private journeyRepository: JourneyRepository) {}
  async createJourney(journey: Journey) {
    return await this.journeyRepository.createJourney(journey);
  }
}
