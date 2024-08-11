import { Injectable } from '@nestjs/common';
import { Notification } from './notification.schema';
import { NotificationRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(private notificationRepository: NotificationRepository) {}

  async getAllNotificationsForUser(userEmail: string): Promise<Notification[]> {
    return this.notificationRepository.getAllNotificationsForUser(userEmail);
  }

  async createNotification(notification: Notification): Promise<Notification> {
    return this.notificationRepository.createNotification(notification);
  }
}
