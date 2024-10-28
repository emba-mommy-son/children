import {useSuspenseQuery, UseSuspenseQueryResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {Notification} from '@/types/notification';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getNotifications = async (): Promise<Notification[]> => {
  const response = await client.get<BaseResponse<Notification[]>>({
    url: '/notifications',
  });
  return response.data;
};

export const useGetNotifications = (): UseSuspenseQueryResult<
  Notification[],
  AxiosError<BaseErrorResponse>
> => {
  return useSuspenseQuery<Notification[], AxiosError<BaseErrorResponse>>({
    queryKey: QUERY_KEYS.NOTIFICATION.ALL,
    queryFn: getNotifications,
  });
};
