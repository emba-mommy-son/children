import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const createFriend = async (friendId: number): Promise<void> => {
  const response = await client.post<BaseResponse<null>>({
    url: `/friends/${friendId}`,
  });
  if (!response.success) {
    if (response.status === 400) {
      throw new Error(response.message);
    }
    throw new Error('친구 추가 실패');
  }
};

export const useCreateFriend = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    // !FIXME : 성공시 처리(토스트 or 노티)
    mutationFn: createFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.FRIEND.ALL});
      console.log('친구 추가 성공');
    },
    // !FIXME : 에러시 처리(토스트 or 노티)
    onError: error => {
      console.error('친구 추가 실패', error.message);
    },
  });
};
