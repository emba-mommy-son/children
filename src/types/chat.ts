export interface Room extends RoomData {
  message: string;
  createdAt: string;
  read: boolean;
}

export interface RoomData {
  roomId: number;
  userId: number;
  name: string;
  profileImage: string;
}

export interface Message {
  senderId: number;
  content: string;
  createdAt: string;
}
