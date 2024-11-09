import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {ToastAndroid} from 'react-native';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const deleteFriend = async (friendId: number): Promise<void> => {
  await client.delete<BaseResponse<null>>({
    url: `/friends/${friendId}`,
  });
};

export const useDeleteFriend = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.FRIEND.ALL});
      ToastAndroid.show('친구 삭제 성공', 2000);
    },
    onError: error => {
      switch (error.response?.status) {
        case 400:
          ToastAndroid.show('친구가 아닌 유저입니다.', 2000);
          break;
        case 500:
          ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
          break;
        default:
          ToastAndroid.show('친구 삭제에 실패했습니다.', 2000);
      }
    },
  });
};
