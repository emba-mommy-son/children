import {AxiosError} from 'axios';
import {client} from '@/api/core/client';
import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {FriendRank} from '@/types/friend';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getFriendRank = async (): Promise<FriendRank[]> => {
  const response = await client.get<BaseResponse<FriendRank[]>>({
    url: '/friends/rank',
  });

  return response.data;
};

export const useGetFriendRank = (): UseSuspenseQueryResult<
  FriendRank[],
  AxiosError<BaseErrorResponse>
> => {
  return useSuspenseQuery<FriendRank[], AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.FRIEND.RANK,
    queryFn: getFriendRank,
  });
};
