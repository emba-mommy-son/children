import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseErrorResponse, BaseResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {ToastAndroid} from 'react-native';

const postAttendance = async (): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: '/users/attendance',
  });
};

export const usePostAttendance = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAttendance,
    onSuccess: () => {
      console.log('출석 체크 성공');
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.USER.ATTENDANCE});
    },

    onError: error => {
      switch (error.response?.status) {
        case 400:
          ToastAndroid.show('오늘 이미 출석을 완료하였습니다.', 2000);
          break;
        default:
          ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
          console.error('출석 체크 실패', error.message);
      }
    },
  });
};
