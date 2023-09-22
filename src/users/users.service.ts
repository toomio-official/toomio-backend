import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userEmail: string): Promise<User> {
    return await this.userRepository.createUser(userEmail);
  }
}
