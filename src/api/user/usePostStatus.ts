import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseErrorResponse, BaseResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {ToastAndroid} from 'react-native';

const postStatus = async (status: string): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: '/users/status',
    data: {status},
  });
};

export const usePostStatus = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.USER.EMOTION});
      console.log('status 추가 성공');
    },

    onError: error => {
      ToastAndroid.show('유저 상태 저장에 실패하였습니다.', 2000);
      console.error('status 추가 실패', error.message);
    },
  });
};
