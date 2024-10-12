import {client} from '@api/core/client';
import {SignInRequest, SignInResponse} from 'types/user';

export const useSignIn = async ({
  username,
  password,
}: SignInRequest): Promise<SignInResponse> => {
  const response = await client.post({
    url: '/auth/sign-in',
    data: {username, password},
  });

  return response.data;
};
