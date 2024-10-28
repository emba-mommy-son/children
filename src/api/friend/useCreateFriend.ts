import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {BaseResponse} from '@/types/baseResponse';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import {AxiosError} from 'axios';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const createFriend = async (friendId: number): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: `/friends/${friendId}`,
  });
};

export const useCreateFriend = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  number
> => {
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
      switch (error.response?.status) {
        case 400:
          console.error('이미 친구로 등록된 사용자입니다.');
          break;
        default:
          console.error('친구 추가 실패', error.message);
      }
    },
  });
};
