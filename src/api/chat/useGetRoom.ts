import {client} from '@/api/core/client';
import {useSuspenseQueries} from '@tanstack/react-query';
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

export const useGetRoom = (roomId: number): readonly [RoomData, Message[]] => {
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.CHAT.DETAIL(roomId),
        queryFn: () => getRoomData(roomId),
        staleTime: 0,
      },
      {
        queryKey: QUERY_KEYS.CHAT.MESSAGES(roomId),
        queryFn: () => getRoomMessages(roomId),
        staleTime: 0,
      },
    ],
  });

  return [results[0].data, results[1].data] as const;
};
