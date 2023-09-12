import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SMPost } from './smPost.schema';
import { Model } from 'mongoose';
import { SMPostCreateDto } from './dto/smPostCreate.dto';
import { SMPostUpdateDto } from './dto/smPostUpdate.dto';

@Injectable()
export class SMPostRepository {
  constructor(@InjectModel(SMPost.name) private smPostModel: Model<SMPost>) {}

  async createSMPost(smPostCreateDto: SMPostCreateDto): Promise<SMPost> {
    const createdSMPost = new this.smPostModel(smPostCreateDto);
    return await createdSMPost.save();
  }

  async updateSmPost(smPostUpdateDto: SMPostUpdateDto): Promise<SMPost> {
    return await this.smPostModel.findByIdAndUpdate(
      smPostUpdateDto._id,
      smPostUpdateDto,
      { new: true },
    );
  }
}
