import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {client} from '@/api/core/client';
import {ToastAndroid} from 'react-native';

type CreateRoomRequest = {
  receiverId: number;
};

type CreateRoomResponse = {
  roomId: number;
};

const createRoom = async (
  data: CreateRoomRequest,
): Promise<CreateRoomResponse> => {
  const response = await client.post<BaseResponse<CreateRoomResponse>>({
    url: '/rooms',
    data,
  });
  return response.data;
};

// !FIXME : 이렇게 채팅방을 생성하고 return 으로 받는 roomId로 바로 채팅방 입장시키기
export const useCreateRoom = (): UseMutationResult<
  CreateRoomResponse,
  AxiosError<BaseErrorResponse>,
  CreateRoomRequest
> => {
  return useMutation({
    mutationFn: createRoom,
    onError: () => {
      ToastAndroid.show('채팅방 생성에 실패했습니다.', 2000);
    },
  });
};
