import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const updateNotifications = async (): Promise<void> => {
  const response = await client.post<BaseResponse<null>>({
    url: '/notifications',
  });
  if (!response.success) {
    throw new Error(response.message || '알림 업데이트 실패');
  }
};

export const useUpdateNotifications = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  void
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.NOTIFICATION.ALL});
    },
    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
