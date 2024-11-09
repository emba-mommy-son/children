import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const deleteGoal = async (goalId: number): Promise<void> => {
  await client.delete({
    url: `/goal/${goalId}`,
  });
};

export const useDeleteGoal = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GOAL.ALL});
    },

    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
