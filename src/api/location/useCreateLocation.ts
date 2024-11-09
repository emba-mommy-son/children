import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import {UseMutationResult, useMutation} from '@tanstack/react-query';
import {AppNavigatorProp} from '@/navigation/AppNavigator';
import {BaseResponse, BaseErrorResponse} from '@/types/baseResponse';
import {Location} from '@/types/location';
import {useLocationStore} from '@/store/useLocationStore';
import {client} from '@/api/core/client';

const createLocation = async (location: Location): Promise<Location> => {
  console.log('저장하는 location', location);
  const response = await client.post<BaseResponse<Location>>({
    url: '/location',
    data: location,
  });

  return response.data;
};

export const useCreateLocation = (): UseMutationResult<
  Location,
  AxiosError<BaseErrorResponse>,
  Location
> => {
  const setLocation = useLocationStore(state => state.setLocation);
  const nav = useNavigation<AppNavigatorProp>();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: data => {
      setLocation(data);
      console.log('location 저장 성공', data);
      nav.navigate('Warning');
    },

    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
