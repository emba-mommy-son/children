import {client} from '@/api/core/client';
import {BaseResponse} from '@/types/baseResponse';
import {SignInRequest, UserToken} from '@/types/user';

export const useSignIn = async ({
  username,
  password,
}: SignInRequest): Promise<UserToken> => {
  const response = await client.post<BaseResponse<UserToken>>({
    url: '/auth/sign-in',
    data: {username, password},
  });
  return response.data;
};
