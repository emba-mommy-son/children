import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

export const useNotification = () => {
  const foregroundNotification = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM message:', remoteMessage);
      // Alert.alert(
      //   'A new FCM message arrived!',
      //   JSON.stringify(remoteMessage.notification),
      // );
      const receivedData = JSON.stringify(remoteMessage.notification);
      console.log('receivedData', receivedData);
      PushNotification.localNotification({
        // title: receivedData.title,
        message: receivedData,
      }); 
    });

    return unsubscribe;
  };

  return {foregroundNotification};
};
