import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse} from '@/types/baseResponse';
import {Friend} from '@/types/friend';
import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query';

const getFriend = async (): Promise<Friend[]> => {
  const response = await client.get<BaseResponse<Friend[]>>({
    url: '/friends',
  });

  console.log(response);
  return response.data;
};

export const useGetFriend = (): UseSuspenseQueryResult<Friend[], Error> => {
  return useSuspenseQuery<Friend[], Error>({
    queryKey: QUERY_KEYS.FRIEND.ALL,
    queryFn: getFriend,
  });
};
