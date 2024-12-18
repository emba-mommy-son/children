import {signIn} from '@/api/user/signIn';
import {useLogin} from '@/hooks/useLogin';
import {TabNavigatorProp} from '@/navigation/AppNavigator';
import {useAuthStore} from '@/store/useAuthStore';
import {NotificationType} from '@/types/notification';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {useRealm} from '@realm/react';
import {useState} from 'react';
import PushNotification from 'react-native-push-notification';

const CHANNEL_ID = 'children';

interface LocationData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  danger: boolean;
}

export const useNotification = () => {
  const realm = useRealm();
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

      PushNotification.createChannel(
        {
          channelId: CHANNEL_ID,
          channelName: '마미손 알림',
          channelDescription: '마미손에서 발송하는 알림',
        },
        created => console.log(`createChannel returned '${created}'`),
      );

      // foreground notification
      const unsubscribe = messaging().onMessage(async message => {
        console.log(message);
        const {notification} = message;
        if (notification && notification.body) {
          const notificationType = parseNotification(notification.title || '');

          // * 위치 알림
          if (notificationType === NotificationType.LOCATION) {
            console.log('LOCATION', notification.body);

            const locationData: LocationData[] = [
              JSON.parse(notification.body),
            ];

            realm.write(() => {
              const boundaries = realm.objects('Boundary');
              realm.delete(boundaries);

              locationData.forEach(location => {
                realm.create('Boundary', {
                  id: location.id,
                  name: location.name,
                  latitude: location.latitude,
                  longitude: location.longitude,
                  radius: location.radius,
                  danger: location.danger,
                  createdAt: new Date(),
                });
              });
            });

            PushNotification.localNotification({
              channelId: CHANNEL_ID,
              title: notification.title,
              message: notification.body,
            });
          } else if (notificationType === NotificationType.CHILD_SIGN_IN) {
            PushNotification.localNotification({
              channelId: CHANNEL_ID,
              title: notification.title,
              message: notification.body,
            });

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
          } else if (notificationType === NotificationType.FRIENDS) {
            PushNotification.localNotification({
              channelId: CHANNEL_ID,
              title: notification.title,
              message: notification.body,
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
