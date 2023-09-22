import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userEmail: string): Promise<User> {
    return await new this.userModel({
      _id: new mongoose.Types.ObjectId(),
      userEmail: userEmail,
    }).save();
  }
}
