import {signIn} from '@/api/user/signIn';
import {useLogin} from '@/hooks/useLogin';
import {TabNavigatorProp} from '@/navigation/AppNavigator';
import {useAuthStore} from '@/store/useAuthStore';
import {NotificationType} from '@/types/notification';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import PushNotification from 'react-native-push-notification';

export const useLoginFirebase = () => {
  const [init, setInit] = useState(false);
  const {setAccessToken, setRefreshToken} = useAuthStore();
  const {setLoginData} = useLogin();
  const nav = useNavigation<TabNavigatorProp>();

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

      // foreground notification
      const unsubscribe = messaging().onMessage(async message => {
        console.log(message);
        const {notification} = message;
        if (notification && notification.body) {
          const notificationType = parseNotification(notification.title || '');
          if (notificationType === NotificationType.CHILD_SIGN_IN) {
            const {userId, username, password} = JSON.parse(
              notification.body,
            ) as {
              userId: number;
              username: string;
              password: string;
            };

            console.log('CHILD_SIGN_IN', userId, username, password);
            setLoginData({username, password});
            signIn({username, password}).then(tokenData => {
              console.log('로그인 성공');
              console.log(tokenData.accessToken);
              setAccessToken(tokenData.accessToken);
              setRefreshToken(tokenData.refreshToken);
              nav.navigate('Home');
            });
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
      case 'FRIENDS':
        return NotificationType.FRIENDS;
      case 'LOCATION':
        return NotificationType.LOCATION;
      case 'CHILD_SIGN_IN':
        return NotificationType.CHILD_SIGN_IN;
      case 'CHAT':
        return NotificationType.CHAT;
      default:
        return NotificationType.UNKNOWN;
    }
  };

  return {initialize};
};
