import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
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
  AxiosError<BaseErrorResponse>,
  CreateAnalysisRequest
> => {
  return useMutation({
    mutationFn: createAnalysis,
    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
