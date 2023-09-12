import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SMPostsService } from './smPosts.service';
import { SMPostCreateDto } from './dto/smPostCreate.dto';
import { SMPost } from './smPost.schema';

@Controller('posts')
export class SMPostsController {
  constructor(private smPostService: SMPostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPost(@Body() smPostCreateDto: SMPostCreateDto): Promise<SMPost> {
    return await this.smPostService.createSMPost(smPostCreateDto);
  }
}
