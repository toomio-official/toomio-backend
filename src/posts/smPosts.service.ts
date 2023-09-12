import { Injectable } from '@nestjs/common';
import { SMPostCreateDto } from './dto/smPostCreate.dto';
import { SMPost } from './smPost.schema';
import { SMPostRepository } from './smPost.repository';
import { SMPostUpdateDto } from './dto/smPostUpdate.dto';

@Injectable()
export class SMPostsService {
  constructor(private smPostRepository: SMPostRepository) {}

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
}
