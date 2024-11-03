import useLocation from '@/database/query/useLocation';
import {Location} from '@/database/schemas/LocationSchema';
import {useRealm} from '@realm/react';
import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

interface GeoLocation {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = () => {
  const [init, setInit] = useState(false);
  const [location, setLocation] = useState<GeoLocation>({
    latitude: 0,
    longitude: 0,
  });
  const realm = useRealm();
  const {findAll, findLastCreatedAt} = useLocation();

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

            const prev = new Date(findLastCreatedAt()!!);
            const now = new Date(position.timestamp);
            const diff = now.getTime() - prev.getTime();

            // 1분 이내에 저장된 위치 정보는 저장하지 않음
            if (diff < 60 * 1000) {
              return;
            }

            console.log('position', position);

            realm.write(() => {
              realm.create<Location>(
                'Location',
                Location.create({
                  altitude: position.coords.altitude || 0,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  accuracy: position.coords.accuracy,
                  speed: position.coords.speed || 0,
                  provider: position.provider || 'none',
                  danger: false,
                  isSent: false,
                }),
              );
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
        // console.log(findAll());
        // console.log('get location');
      }, 10000); // 10초에 한 번씩 저장 시도

      return () => {
        clearInterval(interval);
      };
    }
  }, [init]);

  return {location, initialize, getLocation};
};
