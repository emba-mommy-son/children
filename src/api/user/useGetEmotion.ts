import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const getEmotion = async (): Promise<string> => {
  const response = await client.get<BaseResponse<string>>({
    url: `/users/status`,
  });

  return response.data;
};

export const useGetEmotion = (): UseQueryResult<
  string,
  AxiosError<ErrorResponse>
> => {
  return useQuery<string, AxiosError<ErrorResponse>>({
    queryKey: QUERY_KEYS.USER.EMOTION,
    queryFn: getEmotion,
  });
};
