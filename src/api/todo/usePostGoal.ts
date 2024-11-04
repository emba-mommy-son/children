import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const postGoal = async (content: string): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: '/goal',
    data: {content},
  });
};

export const usePostGoal = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GOAL.ALL});
      console.log('todo 추가 성공');
    },

    onError: error => {
      console.error('todo 추가 실패', error.message);
    },
  });
};
