import {AxiosError} from 'axios';
import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {Friend} from '@/types/friend';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getFriends = async (): Promise<Friend[]> => {
  const response = await client.get<BaseResponse<Friend[]>>({
    url: '/friends',
  });

  return response.data;
};

export const useGetFriends = (): UseSuspenseQueryResult<
  Friend[],
  AxiosError<BaseErrorResponse>
> => {
  return useSuspenseQuery<Friend[], AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.FRIEND.ALL,
    queryFn: getFriends,
  });
};
