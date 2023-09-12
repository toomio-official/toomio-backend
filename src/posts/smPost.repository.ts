import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SMPost } from './smPost.schema';
import mongoose, { Model } from 'mongoose';
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

  async deleteSmPost(smPostId: string): Promise<boolean> {
    const objId = new mongoose.Types.ObjectId(smPostId);
    const ret = await this.smPostModel.deleteOne({ _id: objId });
    return ret.deletedCount === 1;
  }
}
