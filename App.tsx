/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// 리액트
import {useEffect} from 'react';

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
import {useLocation} from '@/hooks/useLocation';
import {useLogin} from '@/hooks/useLogin';
import {useNotification} from '@/hooks/useNotification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const CHANNEL_ID = 'children';

messaging().setBackgroundMessageHandler(async message => {
  console.log('background message: ', message);
  const {notification} = message;

  if (notification && notification.body) {
    // 만약, 자녀 로그인 알림이라면 노티피케이션을 띄우지 않는다.
    if (notification.title === 'CHILD_SIGN_IN') {
      const {username, password} = JSON.parse(notification.body);
      await KeyChain.setGenericPassword(username, password);
      return;
    }

    PushNotification.localNotification({
      channelId: CHANNEL_ID,
      title: notification.title,
      message: notification.body,
    });
  }
});

function App(): React.JSX.Element {
  const {getLoginData} = useLogin();
  const {initialize} = useNotification();
  const {getLocation} = useLocation();
  const {setAccessToken, setRefreshToken} = useAuthStore.getState();
  const fetchLoginData = async () => {
    const loginData = await getLoginData();

    if (loginData) {
      const {username, password} = loginData;
      return {username, password};
    }

    return {username: 'rlaehdud1002', password: 'password123!'};
  };

  // 로그인
  useEffect(() => {
    fetchLoginData().then(data => {
      signIn({username: data.username, password: data.password}).then(
        tokenData => {
          console.log('로그인 성공');
          console.log(tokenData.accessToken);
          setAccessToken(tokenData.accessToken);
          setRefreshToken(tokenData.refreshToken);
        },
      );
    });
  }, []);

  // 푸시 알림
  useEffect(() => {
    const unsubscribe = initialize();

    return () => {
      unsubscribe;
    };
  }, []);

  // 위치 정보
  useEffect(() => {
    setInterval(() => {
      // getLocation();
    }, 1000);
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
          ]}>
          <AppWrapper />
        </RealmProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
export default App;
