import {AxiosError} from 'axios';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {UserInfo} from '@/types/user';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getUserByPhoneNumber = async (phoneNumber: string): Promise<UserInfo> => {
  const response = await client.get<BaseResponse<UserInfo>>({
    url: `/users/phoneNumber`,
    params: {
      phoneNumber,
    },
  });
  return response.data;
};

export const useGetUserByPhoneNumber = (
  phoneNumber: string,
): UseQueryResult<UserInfo, AxiosError<BaseErrorResponse>> => {
  return useQuery<UserInfo, AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.USER.PHONENUMBER(phoneNumber),
    queryFn: () => getUserByPhoneNumber(phoneNumber),
    enabled: !!phoneNumber,
  });
};
