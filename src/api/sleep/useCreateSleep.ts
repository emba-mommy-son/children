import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';

interface SleepData {
  startAt: string;
  endAt: string;
}

const createSleep = async (data: SleepData[]): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: '/sleep',
    data,
  });
};

export const useCreateSleep = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  SleepData[]
> => {
  return useMutation({
    mutationFn: createSleep,
    onSuccess: () => {
      console.log('수면 데이터 전송 성공');
    },
    onError: error => {
      console.error('수면 데이터 전송 실패', error.response?.data);
    },
  });
};
