import { Module } from '@nestjs/common';
import { AwsSqsService } from './aws-sqs.service';
import { UsersService } from 'src/auth/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/users/user.schema';
import { UserRepository } from 'src/auth/users/user.repository';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationRepository } from 'src/notifications/notifications.repository';
import {
  Notification,
  NotificationSchema,
} from 'src/notifications/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [
    AwsSqsService,
    UsersService,
    UserRepository,
    NotificationsService,
    NotificationRepository,
  ],
})
export class AwsSqsModule {}
