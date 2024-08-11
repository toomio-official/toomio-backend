import {
  Controller,
  Post,
  UsePipes,
  Put,
  ValidationPipe,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserFollowDto } from './dto/userFollow.dto';
import { User } from './user.schema';

@Controller('/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Put('/follow')
  @UsePipes(ValidationPipe)
  async FollowUser(@Body() userFollowDto: UserFollowDto): Promise<User> {
    return await this.userService.FollowUser(userFollowDto);
  }

  @Get(':email/followers-count')
  async getFollowersCount(@Param('email') email: string): Promise<{ count: number }> {
    const count = await this.userService.getFollowersCount(email);
    return { count };
  }
}