import {client} from '@/api/core/client';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {Location} from '@/types/location';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const createLocation = async (location: Location): Promise<void> => {
  await client.post<BaseResponse<null>>({
    url: '/location',
    data: location,
  });
};

export const useCreateLocation = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  Location
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      console.log('location 저장 성공');
    },

    onError: error => {
      console.error('location 저장 실패', error.message);
    },
  });
};
