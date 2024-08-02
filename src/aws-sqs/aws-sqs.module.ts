import { Module } from '@nestjs/common';
import { AwsSqsService } from './aws-sqs.service';
import { UsersService } from 'src/auth/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/users/user.schema';
import { UserRepository } from 'src/auth/users/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AwsSqsService, UsersService, UserRepository],
})
export class AwsSqsModule {}
