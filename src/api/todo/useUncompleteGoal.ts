import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const uncompleteGoal = async (goalId: number): Promise<void> => {
  await client.post<BaseResponse<void>>({
    url: `goal/undone/${goalId}`,
  });
};

export const useUncompleteGoal = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uncompleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GOAL.ALL});
      console.log('todo 완료 취소 성공');
    },

    onError: error => {
      console.error('todo 완료 취소 실패', error.message);
    },
  });
};
