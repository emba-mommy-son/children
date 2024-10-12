export interface GetRoomsResponse {
  data: Room[];
}

export interface Room {
  roomId: number;
  userId: number;
  name: string;
  message: string;
  createdAt: Date;
  read: boolean;
}
