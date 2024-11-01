import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

interface Location {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [init, setInit] = useState(false);
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

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
          position => {
            if (
              position.coords.latitude === 0 &&
              position.coords.longitude === 0
            ) {
              return;
            }
            setLocation(() => {
              return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
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

  useEffect(() => {
    if (init) {
      const interval = setInterval(() => {
        getLocation();
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [init]);

  return {location, initialize, getLocation};
};
