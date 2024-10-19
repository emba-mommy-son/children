export interface Notification {
  id: number;
  // !FIXME : notificationType 물어보고 enum으로 선언하기
  notificationType: 'HEALTH';
  message: string;
  createdAt: string;
  read: false;
}
