import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SMPost } from './smPost.schema';
import mongoose, { Model } from 'mongoose';
import { SMPostCreateDto } from './dto/smPostCreate.dto';
import { SMPostUpdateDto } from './dto/smPostUpdate.dto';
import { Like } from 'src/likes/like.schema';
import { User } from 'src/auth/users/user.schema';
import { Comment } from 'src/comments/comment.schema';

@Injectable()
export class SMPostRepository {
  constructor(
    @InjectModel(SMPost.name) private smPostModel: Model<SMPost>,
    @InjectModel(Like.name) private likeSmPostModel: Model<Like>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

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

  async findById(smPostId: string): Promise<SMPost> {
    const objId = new mongoose.Types.ObjectId(smPostId);
    return await this.smPostModel.findById(objId);
  }

  async likeAPost(
    smPostId: string,
    newLikeId: mongoose.Types.ObjectId,
  ): Promise<SMPost> {
    return await this.addALikeToAPost(smPostId, newLikeId);
  }

  async addALikeToAPost(
    smPostId: string,
    likeId: mongoose.Types.ObjectId,
  ): Promise<SMPost> {
    return await this.smPostModel.findByIdAndUpdate(
      { _id: smPostId },
      { $push: { likes: likeId } },
    );
  }

  async getLikesCountForPost(smPostId: string): Promise<number> {
    const objId = new mongoose.Types.ObjectId(smPostId);
    const post = await this.smPostModel.findById(objId);
    if (!post) {
      return 0;
    }
    return post.likes ? post.likes.length : 0;
  }

  async commentAPost(
    smPostId: string,
    newCommentId: mongoose.Types.ObjectId,
  ): Promise<SMPost> {
    return await this.addACommentToAPost(smPostId, newCommentId);
  }

  async addACommentToAPost(
    smPostId: string,
    commentId: mongoose.Types.ObjectId,
  ): Promise<SMPost> {
    return await this.smPostModel.findByIdAndUpdate(
      { _id: smPostId },
      { $push: { comments: commentId } },
    );
  }

  async getCommentsCountForPost(smPostId: string): Promise<number> {
    const objId = new mongoose.Types.ObjectId(smPostId);
    const post = await this.smPostModel.findById(objId);
    if (!post) {
      return 0;
    }
    return post.comments ? post.comments.length : 0;
  }

  async getCommentsByPostId(smPostId: string): Promise<Comment[]> {
    const objId = new mongoose.Types.ObjectId(smPostId);
    const post = await this.smPostModel
      .findById(objId)
      .populate<{ comments: Comment[] }>('comments');
    return post ? post.comments : [];
  }

  async getPostsByIds(postIds: string[]): Promise<SMPost[]> {
    return await this.smPostModel.find({ _id: { $in: postIds } });
  }

  async getPostsByUser(userEmail: string): Promise<SMPost[]> {
    return await this.smPostModel.find({ userEmail: userEmail }).exec();
  }

  async getAllPosts(): Promise<SMPost[]> {
    return await this.smPostModel.find().exec();
  }
}
