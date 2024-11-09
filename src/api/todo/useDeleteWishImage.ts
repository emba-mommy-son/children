import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import useUser from '@/hooks/useUser';

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
  const {refetch} = useUser();
  return useMutation({
    mutationFn: deleteWishImage,
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
