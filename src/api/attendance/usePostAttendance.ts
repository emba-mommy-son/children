import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const postAttendance = async (): Promise<void> => {
  const response = await client.post<BaseResponse<null>>({
    url: '/users/attendance',
  });

  if (!response.success) {
    if (response.status === 400) {
      throw new Error(response.message);
    }

    throw new Error('출석 체크 실패');
  }
};

export const usePostAttendance = (): UseMutationResult<void, Error> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAttendance,
    // !FIXME : 성공시 처리(토스트 or 노티)
    onSuccess: () => {
      console.log('출석 체크 성공');
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.USER.ATTENDANCE});
    },

    // !FIXME : 에러시 처리(토스트 or 노티)
    onError: error => {
      console.error('출석 체크 실패', error.message);
    },
  });
};
