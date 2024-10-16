import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {BaseResponse} from '@/types/baseResponse';
import {Notification} from '@/types/notification';
import {client} from '@/api/core/client';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getNotifications = async (): Promise<Notification[]> => {
  const response = await client.get<BaseResponse<Notification[]>>({
    url: '/notifications',
  });
  return response.data;
};

export const useGetNotifications = (): UseQueryResult<
  Notification[],
  Error
> => {
  return useQuery<Notification[], Error>({
    queryKey: QUERY_KEYS.NOTIFICATION.ALL,
    queryFn: getNotifications,
  });
};
