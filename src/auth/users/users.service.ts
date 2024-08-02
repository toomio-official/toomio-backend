import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserFollowDto } from './dto/userFollow.dto';
import { User } from './user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async FollowUser(userFollowDto: UserFollowDto): Promise<User> {
    const followerUserEmail = userFollowDto.followerUserEmail;
    const followingUserEmail = userFollowDto.followingUserEmail;

    const followerUser = await this.userRepository.findAUser(followerUserEmail);
    const followingUser = await this.userRepository.findAUser(
      followingUserEmail,
    );

    if (!followerUser) {
      throw new NotFoundException('Follower User Not Found');
    }
    if (!followingUser) {
      throw new NotFoundException('Following User Not Found');
    }

    if (
      followerUser.following.find(
        (user) => user._id.toString() === followingUser._id.toString(),
      )
    ) {
      throw new ConflictException('User Already Followed');
    }

    followerUser.following.push(followingUser);
    return await this.userRepository.updateUser(followerUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }
}
