import {useLogin} from '@/hooks/useLogin';
import {NotificationType} from '@/types/notification';
import messaging from '@react-native-firebase/messaging';
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

      // foreground notification
      const unsubscribe = messaging().onMessage(async message => {
        console.log(message);
        const {notification} = message;
        if (notification && notification.body) {
          const notificationType = parseNotification(notification.title || '');

          if (notificationType === NotificationType.UNKNOWN) {
            return;
          }

          // * 친구 관계 알림
          if (notificationType === NotificationType.FRIENDS) {
            console.log('FRIENDS', notification.body);
            PushNotification.localNotification({
              channelId: CHANNEL_ID,
              // !FIXME: notification.title로 넣지 말고 직접 설정
              title: '친구 관계 알림',
              message: notification.body,
            });
          }

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
            console.log('CHILD_SIGN_IN', userId, username, password);
            setLoginData({username, password});

            // const {data: BoundaryData} = await useGetBoundary();

            // console.log('BoundaryData', BoundaryData);

            // realm.write(() => {
            //   const boundaries = realm.objects('Boundary');
            //   realm.delete(boundaries);

            //   BoundaryData.forEach(boundary => {
            //     realm.create('Boundary', {
            //       id: boundary.boundaryId,
            //       name: boundary.name,
            //       latitude: boundary.latitude,
            //       longitude: boundary.longitude,
            //       radius: boundary.radius,
            //       danger: boundary.danger,
            //       createdAt: boundary.cratedAt,
            //     });
            //   });
            // });
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
      case 'CHILDREN_SIGN_IN':
        return NotificationType.CHILD_SIGN_IN;
      case 'CHAT':
        return NotificationType.CHAT;
      default:
        return NotificationType.UNKNOWN;
    }
  };

  return {initialize};
};
