import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.schema';

@Injectable()
export class CommentsService {
  constructor(private commentRepository: CommentRepository) {}

  async createComment(
    userId: mongoose.Types.ObjectId,
    smPostId: string,
    content: string,
  ): Promise<Comment> {
    return await this.commentRepository.createComment(
      userId,
      smPostId,
      content,
    );
  }

  async findAComment(
    userId: mongoose.Types.ObjectId,
    smPostId: string,
  ): Promise<Comment> {
    return await this.commentRepository.findAComment(userId, smPostId);
  }
}
