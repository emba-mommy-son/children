import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getEmotion = async (): Promise<string> => {
  const response = await client.get<BaseResponse<string>>({
    url: `/users/status`,
  });

  return response.data;
};

export const useGetEmotion = (): UseQueryResult<
  string,
  AxiosError<BaseErrorResponse>
> => {
  return useQuery<string, AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.USER.EMOTION,
    queryFn: getEmotion,
  });
};
