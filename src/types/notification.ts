export interface Notification {
  id: number;
  notificationType: NotificationType;
  message: string;
  createdAt: string;
  read: false;
}

export enum NotificationType {
  HEALTH = 'HEALTH',
  NOTICE = 'NOTICE',
  REWARD = 'REWARD',
  FRIENDS = 'FRIENDS',
  LOCATION = 'LOCATION',
}
