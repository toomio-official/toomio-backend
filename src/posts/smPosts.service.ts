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
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.schema';
import { CommentSmPostDto } from 'src/comments/commentSmPost.dto';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class SMPostsService {
  constructor(
    private smPostRepository: SMPostRepository,
    private likeService: LikesService,
    private userService: UsersService,
    private commentService: CommentsService,
  ) {}

  async createSMPost(smPostCreateDto: SMPostCreateDto): Promise<SMPost> {
    return await this.smPostRepository.createSMPost(smPostCreateDto);
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

    let user: User = await this.userService.findAUser(likeSmPostDto.userEmail);

    if (!user) {
      user = await this.userService.createUser(likeSmPostDto.userEmail);
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

  async commentAPost(commentSmPostDto: CommentSmPostDto): Promise<SMPost> {
    const post = await this.smPostRepository.findById(
      commentSmPostDto.smPostId,
    );
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    let user: User = await this.userService.findAUser(
      commentSmPostDto.userEmail,
    );

    if (!user) {
      user = await this.userService.createUser(commentSmPostDto.userEmail);
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
}
