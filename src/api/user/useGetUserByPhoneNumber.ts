import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse} from '@/types/baseResponse';
import {UserInfo} from '@/types/user';
import {useQuery, UseQueryResult} from '@tanstack/react-query';

// !FIXME : phoneNumber : string인지 number인지 안알려줬음
export const getUserByPhoneNumber = async (phoneNumber: string): Promise<UserInfo> => {
  const response = await client.get<BaseResponse<UserInfo>>({
    url: `/users/phoneNumber`,
    params: {
      phoneNumber,
    },
  });
  if (!response.success) {
    if (response.status === 404) {
      throw new Error(response.message);
    }
    // !FIXME : 에러 처리(토스트 or 노티)
    throw new Error('친구 조회 실패');
  }
  return response.data;
};

export const useGetUserByPhoneNumber = (
  phoneNumber: string,
): UseQueryResult<UserInfo, Error> => {
  return useQuery<UserInfo, Error>({
    queryKey: QUERY_KEYS.USER.PHONENUMBER(phoneNumber),
    queryFn: () => getUserByPhoneNumber(phoneNumber),
  });
};