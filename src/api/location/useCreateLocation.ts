import {client} from '@/api/core/client';
import {AppNavigatorProp} from '@/navigation/AppNavigator';
import {useLocationStore} from '@/store/useLocationStore';
import {BaseResponse, ErrorResponse} from '@/types/baseResponse';
import {Location} from '@/types/location';
import {useNavigation} from '@react-navigation/native';
import {UseMutationResult, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

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
  AxiosError<ErrorResponse>,
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

    onError: error => {
      console.error('location 저장 실패', error.message);
    },
  });
};
