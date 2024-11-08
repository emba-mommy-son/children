import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseErrorResponse, BaseResponse} from '@/types/baseResponse';
import {Location} from '@/types/location';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const getLocation = async (): Promise<Location[]> => {
  const response = await client.get<BaseResponse<Location[]>>({
    url: '/location',
  });

  return response.data;
};

export const useGetLocation = (): UseQueryResult<
  Location[],
  AxiosError<BaseErrorResponse>
> => {
  return useQuery<Location[], AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.LOCATION.ALL,
    queryFn: getLocation,
  });
};
