import {client} from '@/api/core/client';
import {BaseErrorResponse, BaseResponse} from '@/types/baseResponse';
import {UseMutationResult, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

type CreateAnalysisRequest = {
  roomId: number;
  receiverId: number;
  name: string;
};

const createAnalysis = async (data: CreateAnalysisRequest): Promise<void> => {
  try {
    const response = await client.post<BaseResponse<null>>({
      url: '/analysis',
      data,
    });
  } catch (error) {
    console.error('createAnalysis error', error);
    throw error;
  }
};

export const useCreateAnalysis = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  CreateAnalysisRequest
> => {
  return useMutation({
    mutationFn: createAnalysis,
    onError: () => {
      // ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
