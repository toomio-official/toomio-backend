import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AwsCognitoService } from './aws-cognito.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './users/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/user.schema';
import { AwsSqsService } from 'src/aws-sqs/aws-sqs.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AwsCognitoService,
    JwtStrategy,
    UserRepository,
    AwsSqsService,
    UsersService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
