import {client} from '@api/core/client';
import {SignInRequest, SignInResponse} from 'types/User';

const useSignin = async ({
  username,
  password,
}: SignInRequest): Promise<SignInResponse> => {
  const response = await client.post({
    url: '/auth/sign-in',
    data: {username, password},
  });

  return response.data;
};