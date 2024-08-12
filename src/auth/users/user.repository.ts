import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto } from './dto/userCreate.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    return await new this.userModel(userCreateDto).save();
  }

  async findAUser(userEmail: string): Promise<User> {
    return await this.userModel.findOne({
      email: userEmail,
    });
  }

  async updateUser(followerUser: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      followerUser._id,
      followerUser,
      {
        new: true,
      },
    );
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getFollowersCount(userId: mongoose.Types.ObjectId): Promise<number> {
    return await this.userModel.countDocuments({ following: userId });
  }

  async getFollowingCount(userEmail: string): Promise<number> {
    const user = await this.userModel.findOne({ email: userEmail });
    return user ? user.following.length : 0;
  }
}