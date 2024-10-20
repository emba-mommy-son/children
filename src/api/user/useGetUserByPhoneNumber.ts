import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse} from '@/types/baseResponse';
import {UserInfo} from '@/types/user';
import {useQuery, UseQueryResult} from '@tanstack/react-query';

export const getUserByPhoneNumber = async (
  phoneNumber: string,
): Promise<UserInfo> => {
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
): UseQueryResult<UserInfo, Error> => {
  return useQuery<UserInfo, Error>({
    queryKey: QUERY_KEYS.USER.PHONENUMBER(phoneNumber),
    queryFn: () => getUserByPhoneNumber(phoneNumber),
    enabled: !!phoneNumber,
  });
};
