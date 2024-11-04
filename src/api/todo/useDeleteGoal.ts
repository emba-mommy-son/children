import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {ErrorResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const deleteGoal = async (goalId: number): Promise<void> => {
  await client.delete<null>({
    url: `/goal/${goalId}`,
  });
};

export const useDeleteGoal = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GOAL.ALL});
      console.log('todo 삭제 성공');
    },

    onError: error => {
      console.error('todo 삭제 실패', error.message);
    },
  });
};
