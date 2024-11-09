import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import useUser from '@/hooks/useUser';

export type ImageFile = {
  uri: string;
  type: string;
  name: string;
};

const createWishImage = async (file: ImageFile): Promise<void> => {
  const formData = new FormData();
  formData.append('rewardImage', file as any);

  await client.post({
    url: '/reward/image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useCreateWishImage = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  ImageFile
> => {
  const {refetch} = useUser();

  return useMutation({
    mutationFn: createWishImage,
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
