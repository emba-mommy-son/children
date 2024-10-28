import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse} from '@/types/baseResponse';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const deleteAttendance = async (): Promise<void> => {
  const response = await client.delete<BaseResponse<null>>({
    url: '/users/attendance',
  });
};

export const useDeleteAttendance = (): UseMutationResult<void, Error> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAttendance,

    onSuccess: () => {
      console.log('출석 정보 삭제 성공');
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.USER.ATTENDANCE});
    },

    onError: error => {
      console.error('출석 정보 삭제 실패', error.message);
    },
  });
};
