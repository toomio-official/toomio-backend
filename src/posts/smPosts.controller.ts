import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SMPostsService } from './smPosts.service';
import { SMPostCreateDto } from './dto/smPostCreate.dto';
import { SMPost } from './smPost.schema';
import { SMPostUpdateDto } from './dto/smPostUpdate.dto';

@Controller('posts')
export class SMPostsController {
  constructor(private smPostService: SMPostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPost(@Body() smPostCreateDto: SMPostCreateDto): Promise<SMPost> {
    return await this.smPostService.createSMPost(smPostCreateDto);
  }

  @Put('/:smPostId')
  @UsePipes(ValidationPipe)
  async updateJourney(
    @Param('smPostId') smPostId: string,
    @Body() smPostUpdateDto: SMPostUpdateDto,
  ): Promise<SMPost> {
    smPostUpdateDto._id = smPostId;
    return await this.smPostService.updateSmPost(smPostUpdateDto);
  }
}
