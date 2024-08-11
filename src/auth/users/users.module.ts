import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
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
    UserRepository,
    UsersService,
    NotificationsService,
    NotificationRepository,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
