import {client} from '@api/core/client';
import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query';
import {FriendResponse} from 'types/friend';

const getFriend = async (): Promise<FriendResponse[]> => {
  const {data} = await client.get({url: '/friends'});
  return data;
};

export const useGetFriend = (): UseSuspenseQueryResult<
  FriendResponse[],
  Error
> => {
  return useSuspenseQuery<FriendResponse[]>({
    queryKey: ['friend'],
    queryFn: getFriend,
  });
};
