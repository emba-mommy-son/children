import {ToastAndroid} from 'react-native';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const uncompleteGoal = async (goalId: number): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: `goal/undone/${goalId}`,
  });
};

export const useUncompleteGoal = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uncompleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GOAL.ALL});
    },

    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
