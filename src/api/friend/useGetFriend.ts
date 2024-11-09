import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
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
): UseQueryResult<FriendDetail, AxiosError<BaseErrorResponse>> => {
  //!FIXME : suspenseQuery로 수정
  return useQuery<FriendDetail, AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.FRIEND.DETAIL(friendId),
    queryFn: () => getFriend(friendId),
  });
};
