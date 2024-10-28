import {useSuspenseQuery, UseSuspenseQueryResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {Reward} from '@/types/reward';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

interface GetRewardsRequest {
  year: number;
  month: number;
}

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
}): UseSuspenseQueryResult<Reward[], AxiosError<ErrorResponse>> => {
  return useSuspenseQuery<Reward[], AxiosError<ErrorResponse>>({
    queryKey: QUERY_KEYS.REWARD.BY_MONTH(year, month),
    queryFn: () => getRewards({year, month}),
  });
};
