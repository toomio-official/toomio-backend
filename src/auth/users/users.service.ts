import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserFollowDto } from './dto/userFollow.dto';
import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { NotificationsService } from 'src/notifications/notifications.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private notificationsService: NotificationsService,
  ) {}

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
    await this.userRepository.updateUser(followerUser);

    await this.notificationsService.createNotification({
      _id: new ObjectId(),
      createdAt: new Date(),
      userEmail: followingUserEmail,
      notificationString: `${followerUserEmail} has followed you.`,
    });

    return followerUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async findUserByEmail(userEmail: string): Promise<User> {
    return await this.userRepository.findAUser(userEmail);
  }

  async getFollowersCount(userEmail: string): Promise<number> {
    const user = await this.userRepository.findAUser(userEmail);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.getFollowersCount(user._id);
  }

  async getFollowingCount(userEmail: string): Promise<number> {
    return await this.userRepository.getFollowingCount(userEmail);
  }
}
