import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const completeGoal = async (goalId: number): Promise<void> => {
  await client.post<BaseResponse<void>>({
    url: `goal/done/${goalId}`,
  });
};

export const useCompleteGoal = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GOAL.ALL});
      console.log('todo 완료 성공');
    },

    onError: error => {
      console.error('todo 완료 실패', error.message);
    },
  });
};
