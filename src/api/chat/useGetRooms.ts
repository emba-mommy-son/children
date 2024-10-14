import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {Room} from '@/types/chat';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {client} from '@/api/core/client';

const getRooms = async (): Promise<Room[]> => {
  const response = await client.get<BaseResponse<Room[]>>({
    url: '/rooms',
  });
  return response.data;
};

export const useGetRooms = (): UseQueryResult<Room[], Error> => {
  return useQuery<Room[], Error>({
    queryKey: [QUERY_KEYS.ROOM.ALL],
    queryFn: getRooms,
  });
};
