/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// 리액트
import {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
// 라이브러리
import messaging from '@react-native-firebase/messaging';
import {RealmProvider} from '@realm/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as KeyChain from 'react-native-keychain';
import PushNotification from 'react-native-push-notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// 전역상태
import {GenerateMessage} from '@/database/schemas/GenerateMessageSchema';
import {Location} from '@/database/schemas/LocationSchema';
import {Message} from '@/database/schemas/MessageSchema';
import {RefineMessage} from '@/database/schemas/RefineMessageSchema';
import {Sentiment} from '@/database/schemas/SentimentSchema';
import {SleepSession} from '@/database/schemas/SleepSessionSchema';
import {useAuthStore} from '@/store/useAuthStore';

// 컴포넌트
import {AppWrapper} from '@/components/AppWrapper';

// 커스텀 훅
import {signIn} from '@/api/user/signIn';
import {useLogin} from '@/hooks/useLogin';

// 타입
import {Boundary} from '@/database/schemas/BoundarySchema';
import {NotificationType} from '@/types/notification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// background notification
const CHANNEL_ID = 'children';
LogBox.ignoreAllLogs();

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

messaging().setBackgroundMessageHandler(async message => {
  console.log('background message: ', message);
  const {notification} = message;

  if (notification && notification.body) {
    const notificationType = parseNotification(notification.title || '');

    // 만약, 자녀 로그인 알림이라면 노티피케이션을 띄우지 않는다.
    if (notificationType === NotificationType.CHILD_SIGN_IN) {
      const {username, password} = JSON.parse(notification.body);
      await KeyChain.setGenericPassword(username, password);
    } else {
      PushNotification.localNotification({
        channelId: CHANNEL_ID,
        title: notification.title,
        message: notification.body,
      });
    }
  }
});

function App(): React.JSX.Element {
  const {getLoginData} = useLogin();
  const {setAccessToken, setRefreshToken} = useAuthStore.getState();
  const [loginInfo, setLoginInfo] = useState<null | {
    username: string;
    password: string;
  }>(null);
  const fetchLoginData = async () => {
    const loginData = await getLoginData();

    if (loginData) {
      const {username, password} = loginData;
      return {username, password};
    }

    return {username: 'rlaehdud1002', password: 'username_010-9976-1003'};
    // return null;
  };

  // 로그인
  useEffect(() => {
    fetchLoginData().then(data => {
      console.log('로그인 데이터', data);
      setLoginInfo(data);
      if (data) {
        signIn({username: data.username, password: data.password}).then(
          tokenData => {
            console.log('로그인 성공');
            console.log(tokenData.accessToken);
            setAccessToken(tokenData.accessToken);
            setRefreshToken(tokenData.refreshToken);
          },
        );
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RealmProvider
          schema={[
            Message,
            RefineMessage,
            Location,
            Sentiment,
            GenerateMessage,
            SleepSession,
            Boundary,
          ]}>
          <AppWrapper />
        </RealmProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
export default App;
