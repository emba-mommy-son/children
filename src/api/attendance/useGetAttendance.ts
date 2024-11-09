import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse} from '@/types/baseResponse';
import {UseQueryResult, useQuery} from '@tanstack/react-query';

const getAttendance = async (): Promise<string[]> => {
  const response = await client.get<BaseResponse<string[]>>({
    url: '/users/attendance',
  });

  if (!response.success) {
    throw new Error('출석 정보를 가져오는데 실패했습니다.');
  }

  return response.data;
};

export const useGetAttendance = (): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.USER.ATTENDANCE,
    queryFn: getAttendance,
  });
};
