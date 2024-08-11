import { Controller, Get, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  async getAllNotificationsForUser(@Query('email') email: string) {
    return await this.notificationsService.getAllNotificationsForUser(email);
  }
}
