export type GetRoomsResponse = Room[];

export interface Room {
  roomId: number;
  userId: number;
  name: string;
  message: string;
  createdAt: string;
  read: boolean;
}
