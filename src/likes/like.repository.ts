import { Injectable } from '@nestjs/common';
import { Like, LikeDocument } from './like.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class LikeRepository {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async createLike(
    userId: mongoose.Types.ObjectId,
    smPostId: string,
  ): Promise<Like> {
    return await new this.likeModel({
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      smPost: smPostId,
    }).save();
  }

  async findALike(
    userId: mongoose.Types.ObjectId,
    smPostId: string,
  ): Promise<Like> {
    return await this.likeModel.findOne({
      user: userId,
      smPost: smPostId,
    });
  }
}
