import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {useQueryClient} from '@tanstack/react-query';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const deleteWishImage = async (): Promise<void> => {
  await client.delete({
    url: '/reward/image',
  });
};

export const useDeleteWishImage = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  void
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWishImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER.USERINFO,
      });
    },
    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
