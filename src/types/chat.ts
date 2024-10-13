export type GetRoomsResponse = Room[];

export interface Room {
  roomId: number;
  userId: number;
  name: string;
  profileImage: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface RoomInfo {
  roomId: number;
  userId: number;
  name: string;
  profileImage: string;
}
