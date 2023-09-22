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
import { LikesService } from 'src/likes/likes.service';

@Injectable()
export class SMPostRepository {
  constructor(
    @InjectModel(SMPost.name) private smPostModel: Model<SMPost>,
    @InjectModel(Like.name) private likeSmPostModel: Model<Like>,
    @InjectModel(User.name) private userModel: Model<User>,
    private likeService: LikesService,
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

  async addALikeToAPost(
    smPostId: string,
    likeId: mongoose.Types.ObjectId,
  ): Promise<SMPost> {
    return await this.smPostModel.findByIdAndUpdate(
      { _id: smPostId },
      { $push: { likes: likeId } },
    );
  }

  async likeAPost(likeSmPostDto: LikeSmPostDto): Promise<SMPost> {
    const post = await this.findById(likeSmPostDto.smPostId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    //find if user already exists
    let user = await this.userModel.findOne({
      userEmail: likeSmPostDto.userEmail,
    });

    //if user doesn't exist, create a new user
    if (!user) {
      user = await new this.userModel({
        userEmail: likeSmPostDto.userEmail,
      }).save();
    }

    // Check if the user has already liked the post
    const existingLike = await this.likeSmPostModel.findOne({
      user: user._id,
      smPost: likeSmPostDto.smPostId,
    });
    if (existingLike) {
      throw new NotAcceptableException('User has already liked this post');
    }

    //Create a new like
    // const newLike = await new this.likeSmPostModel({
    //   user: user._id,
    //   smPost: likeSmPostDto.smPostId,
    // }).save();

    const newLike = await this.likeService.createLike(
      user._id,
      likeSmPostDto.smPostId,
    );

    // Add the like to the post's likes array
    // return await this.smPostModel.findByIdAndUpdate(
    //   { _id: likeSmPostDto.smPostId },
    //   { $push: { likes: newLike._id } },
    // );
    return await this.addALikeToAPost(likeSmPostDto.smPostId, newLike._id);
  }
}
