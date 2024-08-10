import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { SMPostCreateDto } from './dto/smPostCreate.dto';
import { SMPost } from './smPost.schema';
import { SMPostRepository } from './smPost.repository';
import { SMPostUpdateDto } from './dto/smPostUpdate.dto';
import { LikeSmPostDto } from 'src/likes/likeSmPost.dto';
import { LikesService } from 'src/likes/likes.service';
import { User } from 'src/auth/users/user.schema';
import { CommentSmPostDto } from 'src/comments/commentSmPost.dto';
import { CommentsService } from 'src/comments/comments.service';
import { UserRepository } from '../auth/users/user.repository';
import { AwsSqsService } from 'src/aws-sqs/aws-sqs.service';

@Injectable()
export class SMPostsService {
  constructor(
    private smPostRepository: SMPostRepository,
    private likeService: LikesService,
    private userRepository: UserRepository,
    private commentService: CommentsService,
    private awsSqsService: AwsSqsService,
  ) {}

  async createSMPost(smPostCreateDto: SMPostCreateDto): Promise<SMPost> {
    const createdSmPost: SMPost = await this.smPostRepository.createSMPost(
      smPostCreateDto,
    );
    this.awsSqsService.sendMessagesToAllUsersQueues(
      createdSmPost.userEmail,
      createdSmPost._id.toString(),
    );
    return createdSmPost;
  }

  async updateSmPost(smPostUpdateDto: SMPostUpdateDto): Promise<SMPost> {
    return await this.smPostRepository.updateSmPost(smPostUpdateDto);
  }

  async deleteSmPost(smPostId: string): Promise<boolean> {
    const x = await this.smPostRepository.deleteSmPost(smPostId);
    return x;
  }

  async likeAPost(likeSmPostDto: LikeSmPostDto): Promise<SMPost> {
    const post = await this.smPostRepository.findById(likeSmPostDto.smPostId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user: User = await this.userRepository.findAUser(
      likeSmPostDto.userEmail,
    );

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const existingLike = await this.likeService.findALike(
      user._id,
      likeSmPostDto.smPostId,
    );
    if (existingLike) {
      throw new NotAcceptableException('User has already liked this post');
    }

    const newLike = await this.likeService.createLike(
      user._id,
      likeSmPostDto.smPostId,
    );

    return await this.smPostRepository.likeAPost(
      likeSmPostDto.smPostId,
      newLike._id,
    );
  }

  async getLikesCount(smPostId: string): Promise<number> {
    const count = await this.smPostRepository.getLikesCountForPost(smPostId);
    console.log('count: ' + count);
    return count;
  }

  async commentAPost(commentSmPostDto: CommentSmPostDto): Promise<SMPost> {
    const post = await this.smPostRepository.findById(
      commentSmPostDto.smPostId,
    );
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    let user: User = await this.userRepository.findAUser(
      commentSmPostDto.userEmail,
    );

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const newComment = await this.commentService.createComment(
      user._id,
      commentSmPostDto.smPostId,
      commentSmPostDto.content,
    );

    return await this.smPostRepository.commentAPost(
      commentSmPostDto.smPostId,
      newComment._id,
    );
  }

  async getCommentsCount(smPostId: string): Promise<number> {
    const count = await this.smPostRepository.getCommentsCountForPost(smPostId);
    return count;
  }

  async getPostsByIds(ids: string[]): Promise<SMPost[]> {
    return await this.smPostRepository.getPostsByIds(ids);
  }

  async getPostsByUser(userEmail: string): Promise<SMPost[]> {
    return await this.smPostRepository.getPostsByUser(userEmail);
  }
}
