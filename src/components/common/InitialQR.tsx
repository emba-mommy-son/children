import {View} from 'react-native';

import {useAuthStore} from '@/store/useAuthStore';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';

export const InitialQR = () => {
  const {FCMToken, setFCMToken} = useAuthStore(state => state);

  const getFCMToken = async () => {
    return await messaging().getToken();
  };

  useEffect(() => {
    if (!FCMToken) {
      getFCMToken()
        .then(token => {
          setFCMToken(token);
          console.log(token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-secondary">
      <View className="relative rounded-xl p-10">
        {FCMToken && <QRCode value={FCMToken} size={200}/>}
      </View>
    </View>
  );
};
