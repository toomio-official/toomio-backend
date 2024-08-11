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
import {
  Notification,
  NotificationSchema,
} from 'src/notifications/notification.schema';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationRepository } from 'src/notifications/notifications.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [
    AwsCognitoService,
    JwtStrategy,
    UserRepository,
    AwsSqsService,
    UsersService,
    NotificationsService,
    NotificationRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
