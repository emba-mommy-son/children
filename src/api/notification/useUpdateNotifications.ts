import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
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
  AxiosError<ErrorResponse>,
  void
> => {
  const queryClient = useQueryClient();
  return useMutation({
    // !FIXME : 성공시 처리(토스트 or 노티)
    mutationFn: updateNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.NOTIFICATION.ALL});
    },
    // !FIXME : 에러시 처리(토스트 or 노티)
    onError: error => {
      console.error('알림 읽기 실패', error.message);
    },
  });
};
