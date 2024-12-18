import {AxiosError} from 'axios';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {BaseErrorResponse, BaseResponse} from '@/types/baseResponse';
import {Boundary} from '@/types/location';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

export const getBoundary = async (): Promise<Boundary[]> => {
  const response = await client.get<BaseResponse<Boundary[]>>({
    url: '/boundary',
  });

  return response.data;
};

export const useGetBoundary = (): UseQueryResult<
  Boundary[],
  AxiosError<BaseErrorResponse>
> => {
  return useQuery<Boundary[], AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.LOCATION.BOUNDARY,
    queryFn: getBoundary,
  });
};
