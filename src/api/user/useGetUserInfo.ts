import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {UserInfo} from '@/types/user';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getUserInfo = async (): Promise<UserInfo> => {
  const response = await client.get<BaseResponse<UserInfo>>({url: '/users'});

  return response.data;
};

export const useGetUserInfo = (): UseQueryResult<
  UserInfo,
  AxiosError<BaseErrorResponse>
> => {
  return useQuery<UserInfo, AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.USER.USERINFO,
    queryFn: getUserInfo,
  });
};
