import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {Reward} from '@/types/reward';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getRewards = async (): Promise<Reward[]> => {
  const response = await client.get<BaseResponse<Reward[]>>({
    url: '/reward',
  });
  return response.data;
};

export const useGetRewards = (): UseQueryResult<Reward[], Error> => {
  return useQuery<Reward[], Error>({
    queryKey: QUERY_KEYS.REWARD.ALL,
    queryFn: getRewards,
  });
};
