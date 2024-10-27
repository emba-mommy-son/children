import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
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
  AxiosError<ErrorResponse>,
  ImageFile
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.USER.USERINFO});
    },
    onError: error => {
      console.error('프로필 이미지 업데이트 실패:', error);
    },
  });
};
