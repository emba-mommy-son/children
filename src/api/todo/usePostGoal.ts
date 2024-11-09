import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const postGoal = async (content: string): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: '/goal',
    data: {content},
  });
};

export const usePostGoal = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GOAL.ALL});
    },

    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
