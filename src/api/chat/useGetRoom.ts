import {client} from '@/api/core/client';
import {useQueries, UseQueryResult} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {RoomData, Message} from '@/types/chat';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getRoomData = async (roomId: number): Promise<RoomData> => {
  const response = await client.get<BaseResponse<RoomData>>({
    url: `/rooms/${roomId}`,
  });
  return response.data;
};

const getRoomMessages = async (roomId: number): Promise<Message[]> => {
  const response = await client.get<BaseResponse<Message[]>>({
    url: `/rooms/${roomId}/messages`,
  });
  return response.data;
};

export const useGetRoom = (
  roomId: number,
): [UseQueryResult<RoomData, Error>, UseQueryResult<Message[], Error>] => {
  const results = useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.ROOM.DETAIL(roomId),
        queryFn: () => getRoomData(roomId),
      },
      {
        queryKey: QUERY_KEYS.ROOM.MESSAGES(roomId),
        queryFn: () => getRoomMessages(roomId),
      },
    ],
  });

  return results as [
    UseQueryResult<RoomData, Error>,
    UseQueryResult<Message[], Error>,
  ];
};
