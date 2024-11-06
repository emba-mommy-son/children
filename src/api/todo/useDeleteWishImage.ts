import {useQueryClient} from '@tanstack/react-query';
import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {ErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const deleteWishImage = async (): Promise<void> => {
  await client.delete({
    url: '/reward/image',
  });
};

export const useDeleteWishImage = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
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
    onError: error => {
      console.error(error.response?.data);
    },
  });
};
