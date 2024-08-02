import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Get()
  async getFeedForAUser(@Query('email') email: string) {
    return await this.feedService.getFeedForAUser(email);
  }
}
