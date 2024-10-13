import {client} from '@api/core/client';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {UserResponse} from 'types/user';

const getUserInfo = async (): Promise<UserResponse> => {
  const res = await client.get<UserResponse>({url: '/users'});

  return res.data;
};

export const useGetUserInfo = (): UseQueryResult<UserResponse, Error> => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};
