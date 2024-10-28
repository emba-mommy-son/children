import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const deleteFriend = async (friendId: number): Promise<void> => {
  await client.delete<BaseResponse<null>>({
    url: `/friends/${friendId}`,
  });
};

export const useDeleteFriend = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriend,
    // !FIXME : 성공시 처리(토스트 or 노티)
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.FRIEND.ALL});
      console.log('친구 삭제 성공');
    },
    // !FIXME : 에러시 처리(토스트 or 노티)
    onError: error => {
      switch (error.response?.status) {
        case 400:
          console.error('친구가 아닌 유저입니다.');
          break;
        default:
          console.error('친구 삭제 실패', error.message);
      }
    },
  });
};
