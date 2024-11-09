import {useSuspenseQuery, UseSuspenseQueryResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {Room} from '@/types/chat';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getRooms = async (): Promise<Room[]> => {
  const response = await client.get<BaseResponse<Room[]>>({
    url: '/rooms',
  });
  return response.data;
};

export const useGetRooms = (): UseSuspenseQueryResult<
  Room[],
  AxiosError<BaseErrorResponse>
> => {
  return useSuspenseQuery<Room[], AxiosError<BaseErrorResponse>>({
    queryKey: [QUERY_KEYS.CHAT.ALL],
    queryFn: getRooms,
    staleTime: 0,
  });
};
