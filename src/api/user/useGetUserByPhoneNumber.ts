import {AxiosError} from 'axios';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {FriendInfo} from '@/types/user';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getUserByPhoneNumber = async (
  phoneNumber: string,
): Promise<FriendInfo> => {
  const response = await client.get<BaseResponse<FriendInfo>>({
    url: `/users/phoneNumber`,
    params: {
      phoneNumber,
    },
  });
  return response.data;
};

export const useGetUserByPhoneNumber = (
  phoneNumber: string,
): UseQueryResult<FriendInfo, AxiosError<BaseErrorResponse>> => {
  return useQuery<FriendInfo, AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.USER.PHONENUMBER(phoneNumber),
    queryFn: () => getUserByPhoneNumber(phoneNumber),
    enabled: !!phoneNumber,
  });
};
