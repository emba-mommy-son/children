import {useSuspenseQuery, UseSuspenseQueryResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {Reward} from '@/types/reward';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getRewards = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<Reward[]> => {
  const response = await client.get<BaseResponse<Reward[]>>({
    url: '/reward',
    params: {year, month},
  });
  return response.data;
};

export const useGetRewards = ({
  year,
  month,
}: {
  year: number;
  month: number;
}): UseSuspenseQueryResult<Reward[], AxiosError<BaseErrorResponse>> => {
  return useSuspenseQuery<Reward[], AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.REWARD.BY_MONTH(year, month),
    queryFn: () => getRewards({year, month}),
  });
};
