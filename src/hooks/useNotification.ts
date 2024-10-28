import {NotificationType} from '@/types/notification';
import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
import PushNotification from 'react-native-push-notification';
import {useLogin} from './useLogin';

const CHANNEL_ID = 'children';

export const useNotification = () => {
  const [init, setInit] = useState(false);
  const {setLoginData} = useLogin();

  const initialize = async () => {
    if (!init) {
      PushNotification.configure({
        onRegister: function (token) {
          console.log('TOKEN:', token);
        },
        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);
        },
        popInitialNotification: true,
        requestPermissions: true,
      });

      PushNotification.createChannel(
        {
          channelId: CHANNEL_ID,
          channelName: '마미손 알림',
          channelDescription: '마미손에서 발송하는 알림',
        },
        created => console.log(`createChannel returned '${created}'`),
      );

      const unsubscribe = messaging().onMessage(async message => {
        const {notification} = message;

        if (notification && notification.body) {
          const notificationType = parseNotification(notification.title || '');

          if (notificationType === NotificationType.UNKNOWN) {
            return;
          }

          // * 자녀 어플리케이션 로그인 연결 알림 처리
          if (notificationType === NotificationType.CHILD_SIGN_IN) {
            const {userId, username, password} = JSON.parse(
              notification.body,
            ) as {
              userId: number;
              username: string;
              password: string;
            };

            setLoginData({username, password});
          }
        }
      });

      setInit(true);

      return unsubscribe;
    }
  };

  const parseNotification = (type: string) => {
    switch (type) {
      case 'HEALTH':
        return NotificationType.HEALTH;
      case 'NOTICE':
        return NotificationType.NOTICE;
      case 'REWARD':
        return NotificationType.REWARD;
      case 'FRIENDS':
        return NotificationType.FRIENDS;
      case 'LOCATION':
        return NotificationType.LOCATION;
      case 'CHILD_SIGN_IN':
        return NotificationType.CHILD_SIGN_IN;
      default:
        return NotificationType.UNKNOWN;
    }
  };

  return {initialize};
};
