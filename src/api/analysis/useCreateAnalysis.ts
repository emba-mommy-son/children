import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';

type CreateAnalysisRequest = {
  roomId: number;
  receiverId: number;
  name: string;
};

const createAnalysis = async (data: CreateAnalysisRequest): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: '/analysis',
    data,
  });
};

export const useCreateAnalysis = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  CreateAnalysisRequest
> => {
  return useMutation({
    mutationFn: createAnalysis,
    onSuccess: () => {
      console.log('성공함');
    },
    onError: error => {
      console.error(error.message);
    },
  });
};
