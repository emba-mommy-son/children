import {client} from '@api/core/client';
import {useQueries, UseQueryResult} from '@tanstack/react-query';

interface RoomData {
  roomId: number;
  userId: number;
  name: string;
  profileImage: string;
}

interface MessageData {
  senderId: number;
  content: string;
  createdAt: string;
}

export type MessagesResponse = MessageData[];

const getRoomData = async (roomId: number): Promise<RoomData> => {
  const res = await client.get<RoomData>({url: `/rooms/${roomId}`});
  return res.data;
};

const getRoomMessages = async (roomId: number): Promise<MessagesResponse> => {
  const res = await client.get<MessagesResponse>({
    url: `/rooms/${roomId}/messages`,
  });
  return res.data;
};

export const useGetRoom = (
  roomId: number,
): [
  UseQueryResult<RoomData, Error>,
  UseQueryResult<MessagesResponse, Error>,
] => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['room', roomId],
        queryFn: () => getRoomData(roomId),
      },
      {
        queryKey: ['roomMessages', roomId],
        queryFn: () => getRoomMessages(roomId),
      },
    ],
  });

  return results as [
    UseQueryResult<RoomData, Error>,
    UseQueryResult<MessagesResponse, Error>,
  ];
};
