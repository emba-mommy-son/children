import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {Friend} from '@/types/friend';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getFriends = async (): Promise<Friend[]> => {
  const response = await client.get<BaseResponse<Friend[]>>({
    url: '/friends',
  });

  console.log(response);
  return response.data;
};

export const useGetFriends = (): UseSuspenseQueryResult<Friend[], Error> => {
  return useSuspenseQuery<Friend[], Error>({
    queryKey: QUERY_KEYS.FRIEND.ALL,
    queryFn: getFriends,
  });
};
