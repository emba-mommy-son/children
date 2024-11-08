import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const updateFcmToken = async (fcmToken: string): Promise<void> => {
  await client.patch<BaseResponse<null>>({
    url: '/users/fcmToken',
    data: {fcmToken},
  });
};

export const useUpdateFcmToken = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
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
      console.error('fcmToken 업데이트 실패', error.message);
    },
  });
};
