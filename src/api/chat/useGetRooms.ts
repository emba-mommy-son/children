import {client} from 'api/core/client';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {GetRoomsResponse} from 'types/chat';

const getRooms = async (): Promise<GetRoomsResponse> => {
  const res = await client.get({url: '/rooms'});
  return res.data;
};

export const useGetRooms = (): UseQueryResult<GetRoomsResponse, Error> => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
};
