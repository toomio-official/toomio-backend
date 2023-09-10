import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Journey, JourneyDocument } from './journey.schema';
import { Model } from 'mongoose';
import { JourneyCreateDto } from './dto/journeyCreate.dto';

@Injectable()
export class JourneyRepository {
  constructor(
    @InjectModel(Journey.name) private journeyModel: Model<JourneyDocument>,
  ) {}

  async createJourney(journeyCreateDto: JourneyCreateDto): Promise<Journey> {
    const createdJourney = new this.journeyModel(journeyCreateDto);
    return await createdJourney.save();
  }
}
