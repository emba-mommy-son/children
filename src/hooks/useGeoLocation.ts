import {useCreateLocation} from '@/api/location/useCreateLocation';
import {useGeofence} from '@/hooks/useGeofence';
import {useLocationStore} from '@/store/useLocationStore';
import {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

interface GeoLocation {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = () => {
  const {mutate: createLocation} = useCreateLocation();
  const {checkBoundary} = useGeofence();
  const [init, setInit] = useState(false);

  const {createdAt, setCreatedAt, location, setLocation} = useLocationStore(
    state => state,
  );
  const createdAtRef = useRef(createdAt);
  // useEffect(() => {
  //   createdAtRef.current = createdAt;
  // }, [createdAt]);

  const initialize = () => {
    setInit(true);
  };

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

            // const prev = new Date(createdAtRef.current);
            // const now = new Date();
            // const diff = now.getTime() - prev.getTime();

            // if (diff < 60 * 1000) {
            //   return;
            // }

            // TODO : 여기에서 마지막 저장된 위치 asyncstorage에 저장

            // setCreatedAt(now);
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

  useEffect(() => {
    if (init) {
      const interval = setInterval(() => {
        getLocation();
      }, 10000); // 1초에 1번씩 위치 불러오기

      return () => {
        clearInterval(interval);
      };
    }
  }, [init]);

  return {initialize, getLocation};
};
