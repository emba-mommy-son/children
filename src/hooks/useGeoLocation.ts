import {useCreateLocation} from '@/api/location/useCreateLocation';
import {useGeofence} from '@/hooks/useGeofence';
import {mapKey} from '@/secret/mapKey';
import {Location} from '@/types/location';
import {PermissionsAndroid, Platform} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

const GOOGLE_MAPS_API_KEY = mapKey;

interface GeoLocation {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = () => {
  const {mutate: createLocation} = useCreateLocation();
  const {checkBoundary} = useGeofence();

  // 권한 설정 되었는지 확인
  const checkPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (e) {
      console.log('permission error', e);
    }
  };

  // 현재 위치 정보 가져오기
  const getLocation = () => {
    checkPermission().then(result => {
      if (result === 'granted') {
        GeoLocation.getCurrentPosition(
          async position => {
            if (
              position.coords.latitude === 0 &&
              position.coords.longitude === 0
            ) {
              return;
            }

            const outOfBoundaries = await checkBoundary({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            console.log('outOfBoundaries', outOfBoundaries);
            console.log('position', position.coords);

            if (!outOfBoundaries) {
              return;
            }

            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}&language=ko`,
            );
            const data = await response.json();

            outOfBoundaries.forEach(async boundary => {
              const newLocation = {
                boundaryId: boundary.id,
                name: data.results[0].formatted_address,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                danger: true,
              };

              console.log('newLocation', newLocation);

              createLocation(newLocation as Location);
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
          },
        );
      } else {
        console.log('permission denied');
      }
    });
  };

  return {checkPermission, getLocation};
};
