import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(
    userId: mongoose.Types.ObjectId,
    smPostId: string,
    content: string,
  ): Promise<Comment> {
    return await new this.commentModel({
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      smPost: smPostId,
      content: content,
    }).save();
  }

  async findAComment(
    userId: mongoose.Types.ObjectId,
    smPostId: string,
  ): Promise<Comment> {
    return await this.commentModel.findOne({
      user: userId,
      smPost: smPostId,
    });
  }
}
