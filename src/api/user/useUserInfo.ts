import {client} from '@/api/core/client';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {UserInfo} from '@/types/user';
import {BaseResponse} from '@/types/baseResponse';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getUserInfo = async (): Promise<UserInfo> => {
  const response = await client.get<BaseResponse<UserInfo>>({url: '/users'});

  return response.data;
};

export const useGetUserInfo = (): UseQueryResult<UserInfo, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.USER.USERINFO,
    queryFn: getUserInfo,
  });
};
