import { Injectable } from '@nestjs/common';
import { JourneyRepository } from './journey.repository';
import { JourneyCreateDto } from './dto/journeyCreate.dto';
import { Journey } from './journey.schema';
import { JourneyUpdateDto } from './dto/journeyUpdate.dto';

@Injectable()
export class JourneysService {
  constructor(private journeyRepository: JourneyRepository) {}

  async createJourney(journeyCreateDto: JourneyCreateDto): Promise<Journey> {
    return await this.journeyRepository.createJourney(journeyCreateDto);
  }

  async deleteJourney(journeyId: string): Promise<boolean> {
    const x = await this.journeyRepository.deleteJourney(journeyId);
    return x;
  }

  async updateJourney(JourneyUpdateDto: JourneyUpdateDto): Promise<Journey> {
    return await this.journeyRepository.updateJourney(JourneyUpdateDto);
  }

  async getJourneysByUser(userEmail: string): Promise<Journey[]> {
    return await this.journeyRepository.getJourneysByUser(userEmail);
  }

  async findJourneyById(journeyId: string): Promise<Journey> {
    return await this.journeyRepository.findById(journeyId);
  }
}
