import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Journey, JourneyDocument } from './journey.schema';
import { Model } from 'mongoose';

@Injectable()
export class JourneyRepository {
  constructor(
    @InjectModel(Journey.name) private journeyModel: Model<JourneyDocument>,
  ) {}

  async createJourney(journey: Journey): Promise<Journey> {
    const createdJourney = new this.journeyModel(journey);
    return await createdJourney.save();
  }
}
