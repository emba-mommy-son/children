import {client} from '@/api/core/client';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {UseMutationResult, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const postStatus = async (status: string): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: '/users/status',
    data: {status},
  });
};

export const usePostStatus = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  string
> => {
  return useMutation({
    mutationFn: postStatus,
    onSuccess: () => {
      console.log('status 추가 성공');
    },

    onError: error => {
      console.error('status 추가 실패', error.message);
    },
  });
};
