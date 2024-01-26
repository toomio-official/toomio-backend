import { Injectable, NotFoundException } from '@nestjs/common';
import { UserFollowDto } from './dto/userFollow.dto';
import { User } from './user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    async FollowUser(userFollowDto: UserFollowDto): Promise<User> {
        const followerUserEmail = userFollowDto.followerUserEmail;
        const followingUserEmail = userFollowDto.followingUserEmail;

        const followerUser = await this.userRepository.findAUser(followerUserEmail);
        const followingUser = await this.userRepository.findAUser(followingUserEmail);

        if (!followerUser) {
            throw new NotFoundException('Follower User Not Found');
        }
        if (!followingUser) {
            throw new NotFoundException('Following User Not Found');
        }
        followerUser.following.push(followingUser);
        return await this.userRepository.updateUser(followerUser);
    }
}
