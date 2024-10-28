import {PermissionsAndroid, Platform} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

export const useLocation = () => {
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
