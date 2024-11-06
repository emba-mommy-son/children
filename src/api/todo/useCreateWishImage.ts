import {useQueryClient} from '@tanstack/react-query';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
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
  AxiosError<ErrorResponse>,
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
      console.error('wish 이미지 업데이트 실패:', error.response?.data);
    },
  });
};
