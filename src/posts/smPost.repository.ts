import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SMPost } from './smPost.schema';
import mongoose, { Model } from 'mongoose';
import { SMPostCreateDto } from './dto/smPostCreate.dto';
import { SMPostUpdateDto } from './dto/smPostUpdate.dto';
import { LikeSmPostDto } from 'src/likes/likeSmPost.dto';
import { Like } from 'src/likes/like.schema';
import { User } from 'src/users/user.schema';

@Injectable()
export class SMPostRepository {
  constructor(
    @InjectModel(SMPost.name) private smPostModel: Model<SMPost>,
    @InjectModel(Like.name) private likeSmPostModel: Model<Like>,
    @InjectModel(User.name) private userModel: Model<User>,
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

  async likeAPost(likeSmPostDto: LikeSmPostDto): Promise<SMPost> {
    // Check if the post exists
    const post = await this.smPostModel.findById(likeSmPostDto.smPostId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Check if the user has already liked the post
    const existingLike = await this.likeSmPostModel.findOne({
      userEmail: likeSmPostDto.userEmail,
      // smPost: likeSmPostDto.smPostId,
    });

    if (existingLike) {
      //throw a not acceptable saying user has already liked
      throw new NotAcceptableException('User has already liked this post');
    }

    // If the user hasn't liked the post, create a new like
    //create a user and save to db
    const user = new this.userModel({
      email: likeSmPostDto.userEmail,
    });
    const dbuser = await user.save();
    const newLike = new this.likeSmPostModel({
      user: dbuser._id,
      smPost: likeSmPostDto.smPostId,
    });
    const dblike = await newLike.save();

    // const like = new this.likeSmPostModel(likeSmPostDto);

    // Add the like to the post's likes array
    // post.likes.push(dblike);
    // return await post.save();
    return await this.smPostModel.findByIdAndUpdate(
      { _id: likeSmPostDto.smPostId },
      { $push: { likes: dblike._id } },
    );
  }
}
