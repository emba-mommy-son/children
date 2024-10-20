import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const deleteFriend = async (friendId: number): Promise<void> => {
  const response = await client.delete<BaseResponse<null>>({
    url: `/friends/${friendId}`,
  });
  if (!response.success) {
    if (response.status === 400) {
      throw new Error(response.message);
    }
  }
};

export const useDeleteFriend = (): UseMutationResult<void, Error, number> => {
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
      console.error(error.message);
    },
  });
};
