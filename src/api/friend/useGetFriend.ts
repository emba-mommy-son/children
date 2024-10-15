import {client} from '@/api/core/client';
import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {Friend} from '@/types/friend';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getFriend = async (): Promise<Friend[]> => {
  const response = await client.get<BaseResponse<Friend[]>>({
    url: '/friends',
  });
  return response.data;
};

export const useGetFriend = (): UseSuspenseQueryResult<Friend[], Error> => {
  return useSuspenseQuery<Friend[], Error>({
    queryKey: QUERY_KEYS.FRIEND.ALL,
    queryFn: getFriend,
  });
};
