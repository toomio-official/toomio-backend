import { Injectable } from '@nestjs/common';
import { SMPostCreateDto } from './dto/smPostCreate.dto';
import { SMPost } from './smPost.schema';
import { SMPostRepository } from './smPost.repository';

@Injectable()
export class SMPostsService {
  constructor(private smPostRepository: SMPostRepository) {}

  async createSMPost(smPostCreateDto: SMPostCreateDto): Promise<SMPost> {
    return await this.smPostRepository.createSMPost(smPostCreateDto);
  }
}
