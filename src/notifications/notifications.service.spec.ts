import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { NotificationRepository } from './notifications.repository';
import { Notification } from './notification.schema';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let repository: NotificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: NotificationRepository,
          useValue: {
            getAllNotificationsForUser: jest.fn(),
            createNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    repository = module.get<NotificationRepository>(NotificationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllNotificationsForUser', () => {
    it('should return all notifications for a user', async () => {
      const userEmail = 'user@example.com';
      const notifications: Notification[] = [
        { } as Notification,
      ];

      jest.spyOn(repository, 'getAllNotificationsForUser').mockResolvedValue(notifications);

      expect(await service.getAllNotificationsForUser(userEmail)).toEqual(notifications);
      expect(repository.getAllNotificationsForUser).toHaveBeenCalledWith(userEmail);
    });
  });

  describe('createNotification', () => {
    it('should create a notification', async () => {
      const notification: Notification = { } as Notification;

      jest.spyOn(repository, 'createNotification').mockResolvedValue(notification);

      expect(await service.createNotification(notification)).toEqual(notification);
      expect(repository.createNotification).toHaveBeenCalledWith(notification);
    });
  });
});
