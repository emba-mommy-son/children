import {AxiosError} from 'axios';
import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query';
import {BaseErrorResponse, BaseResponse} from '@/types/baseResponse';
import {Goal} from '@/types/goal';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getGoal = async (): Promise<Goal[]> => {
  const response = await client.get<BaseResponse<Goal[]>>({
    url: '/goal',
  });

  return response.data;
};

export const useGetGoal = (): UseSuspenseQueryResult<
  Goal[],
  AxiosError<BaseErrorResponse>
> => {
  return useSuspenseQuery<Goal[], AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.GOAL.ALL,
    queryFn: getGoal,
  });
};
