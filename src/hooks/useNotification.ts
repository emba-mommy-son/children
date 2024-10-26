import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export const useNotification = () => {
  const foregroundNotification = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM message:', remoteMessage.notification);

      const receivedData = remoteMessage.notification;
      if (receivedData && receivedData.body) {
        console.log('receivedData', receivedData);
        PushNotification.localNotification({
          channelId: 'children',
          title: receivedData.title,
          message: receivedData.body,
        });
      }
    });

    return unsubscribe;
  };

  const pushconfig = () => {
    PushNotification.configure({
      // FCM 등록이 완료되었을 때 호출
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // 알람을 수신했을 때 호출
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // TODO: 알림 클릭 시 동작 정의 여기에
      },

      // 앱이 처음 시작될 때 푸시 알림을 자동으로 열지 여부 설정
      popInitialNotification: true,

      // 푸시 알림을 받을 수 있도록 권한 요청 여부 설정
      requestPermissions: true,
    });
  };

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'children',
        channelName: 'children',
        channelDescription: 'children notification',
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  };

  return {foregroundNotification, pushconfig, createChannel};
};
