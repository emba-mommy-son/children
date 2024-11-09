import {ToastAndroid} from 'react-native';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

export type ImageFile = {
  uri: string;
  type: string;
  name: string;
};

const updateProfileImage = async (file: ImageFile): Promise<void> => {
  const formData = new FormData();
  formData.append('profileImage', file as any);

  await client.patch<BaseResponse<null>>({
    url: '/users',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUpdateProfileImage = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  ImageFile
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.USER.USERINFO});
    },
    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
