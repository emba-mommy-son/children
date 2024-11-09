import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import {ToastAndroid} from 'react-native';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {AxiosError} from 'axios';

const createFriend = async (friendId: number): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: `/friends/${friendId}`,
  });
};

export const useCreateFriend = (): UseMutationResult<
  void,
  AxiosError<BaseErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.FRIEND.ALL});
      console.log('친구 추가 성공');
    },
    onError: error => {
      switch (error.response?.status) {
        case 400:
          ToastAndroid.show('이미 친구로 등록된 사용자입니다.', 2000);
          console.error('이미 친구로 등록된 사용자입니다.');
          break;
        case 500:
          ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
          break;
        default:
          ToastAndroid.show('친구 추가에 실패했습니다.', 2000);
          console.error('친구 추가 실패', error.message);
      }
    },
  });
};
