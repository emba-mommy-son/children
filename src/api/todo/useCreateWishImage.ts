import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

export type ImageFile = {
  uri: string;
  type: string;
  name: string;
};

const createWishImage = async (file: ImageFile): Promise<void> => {
  const formData = new FormData();
  formData.append('rewardImage', file as any);

  await client.post<BaseResponse<null>>({
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWishImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER.USERINFO,
      });
    },
    onError: error => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
