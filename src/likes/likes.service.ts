import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Like } from './like.schema';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikesService {
  constructor(private likeRepository: LikeRepository) {}

  async createLike(
    userId: mongoose.Types.ObjectId,
    smPostId: string,
  ): Promise<Like> {
    return await this.likeRepository.createLike(userId, smPostId);
  }

  async findALike(
    userId: mongoose.Types.ObjectId,
    smPostId: string,
  ): Promise<Like> {
    return await this.likeRepository.findALike(userId, smPostId);
  }
}
