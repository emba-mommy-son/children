import useLocation from '@/database/query/useLocation';
import {Location} from '@/database/schemas/LocationSchema';
import {useRealm} from '@realm/react';
import {PermissionsAndroid, Platform} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

export const useGeoLocation = () => {
  const realm = useRealm();
  const {findAll, findLastCreatedAt} = useLocation();
  console.log(findAll());

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
      console.log('permission result', result);
      if (result === 'granted') {
        console.log('허용됨');
        GeoLocation.getCurrentPosition(
          position => {
            console.log(position);
            const prev = new Date(findLastCreatedAt()!!);
            const now = new Date(position.timestamp);
            const diff = now.getTime() - prev.getTime();
            return;
            if (diff < 60 * 1000) {
              return;
            }
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

  return {getLocation};
};
