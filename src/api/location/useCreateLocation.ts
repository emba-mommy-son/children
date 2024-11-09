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
  const {setLocation, locationIds, setLocationIds} = useLocationStore(
    state => state,
  );
  const nav = useNavigation<AppNavigatorProp>();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: data => {
      setLocation(data);
      if (locationIds.includes(data.locationId!!)) {
        return;
      }

      setLocationIds([...locationIds, data.locationId!!]);
      nav.navigate('Warning');
    },

    onError: () => {
      ToastAndroid.show('서버 상태가 불안정합니다.', 2000);
    },
  });
};
