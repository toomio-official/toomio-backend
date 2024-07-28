import {
  Controller,
  Post,
  UsePipes,
  Put,
  ValidationPipe,
  Body,
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
}
