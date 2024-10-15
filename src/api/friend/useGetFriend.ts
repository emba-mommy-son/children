import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {FriendDetail} from '@/types/friend';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {client} from '@/api/core/client';

const getFriend = async (friendId: number): Promise<FriendDetail> => {
  const response = await client.get<BaseResponse<FriendDetail>>({
    url: `/friends/${friendId}`,
  });
  return response.data;
};

export const useGetFriend = (
  friendId: number,
): UseQueryResult<FriendDetail, Error> => {
  //!FIXME : suspenseQuery로 수정
  return useQuery<FriendDetail, Error>({
    queryKey: QUERY_KEYS.FRIEND.DETAIL(friendId),
    queryFn: () => getFriend(friendId),
  });
};
