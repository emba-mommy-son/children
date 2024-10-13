import {client} from '@api/core/client';
import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query';
import {FriendRankResponse} from 'types/friend';

const getFriendRank = async (): Promise<FriendRankResponse[]> => {
  const {data} = await client.get({
    url: '/friends/rank',
  });

  return data;
};

export const useGetFriendRank = (): UseSuspenseQueryResult<
  FriendRankResponse[],
  Error
> => {
  return useSuspenseQuery({
    queryKey: ['friend', 'rank'],
    queryFn: getFriendRank,
  });
};
