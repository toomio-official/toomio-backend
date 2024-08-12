import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Journey, JourneyDocument } from './journey.schema';
import mongoose, { Model } from 'mongoose';
import { JourneyCreateDto } from './dto/journeyCreate.dto';
import { JourneyUpdateDto } from './dto/journeyUpdate.dto';

@Injectable()
export class JourneyRepository {
  constructor(
    @InjectModel(Journey.name) private journeyModel: Model<JourneyDocument>,
  ) {}

  async createJourney(journeyCreateDto: JourneyCreateDto): Promise<Journey> {
    const createdJourney = new this.journeyModel(journeyCreateDto);
    return await createdJourney.save();
  }

  async deleteJourney(journeyId: string): Promise<boolean> {
    const objId = new mongoose.Types.ObjectId(journeyId);

    const ret = await this.journeyModel.deleteOne({ _id: objId });
    return ret.deletedCount === 1;
  }

  async updateJourney(JourneyUpdateDto: JourneyUpdateDto): Promise<Journey> {
    return await this.journeyModel.findByIdAndUpdate(
      {
        _id: JourneyUpdateDto._id,
      },
      {
        title: JourneyUpdateDto.title,
        description: JourneyUpdateDto.description,
      },
      { new: true },
    );
  }

  async getJourneysByUser(userEmail: string): Promise<Journey[]> {
    return await this.journeyModel.find({ userEmail: userEmail }).exec();
  }

  async findById(id: string): Promise<Journey | null> {
    return await this.journeyModel.findById(id).exec();
  }
}
