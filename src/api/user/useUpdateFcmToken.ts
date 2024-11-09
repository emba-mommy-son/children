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

const updateFcmToken = async (fcmToken: string): Promise<void> => {
  await client.patch<BaseResponse<null>>({
    url: '/users/fcmToken',
    data: {fcmToken},
  });
};

export const useUpdateFcmToken = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFcmToken,
    onSuccess: () => {
      console.log('fcmToken 업데이트 성공');
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.USER.USERINFO});
    },

    onError: error => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
      console.error('fcmToken 업데이트 실패', error.message);
    },
  });
};
