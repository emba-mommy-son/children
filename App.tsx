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
import {NavigationContainer} from '@react-navigation/native';
import {RealmProvider} from '@realm/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import PushNotification from 'react-native-push-notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// 전역상태
import {GenerateMessage} from '@/database/schemas/GenerateMessageSchema';
import {Location} from '@/database/schemas/LocationSchema';
import {Message} from '@/database/schemas/MessageSchema';
import {RefineMessage} from '@/database/schemas/RefineMessageSchema';
import {Sentiment} from '@/database/schemas/SentimentSchema';
import {useAuthStore} from '@/store/useAuthStore';

// 컴포넌트
import {AppNavigator} from '@/navigation/AppNavigator';

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

function App(): React.JSX.Element {
  const {getLoginData} = useLogin();
  const {foregroundNotification, pushconfig, createChannel} = useNotification();
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
    // push config
    pushconfig();

    // notification
    createChannel();

    // foreground
    // foregroundNotification();

    // background
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const receivedData = remoteMessage.notification;
      console.log('back');
      if (receivedData && receivedData.body) {
        console.log('receivedData', receivedData);
        PushNotification.localNotification({
          channelId: 'children',
          title: receivedData.title,
          message: receivedData.body,
        });
      }
    });
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
          ]}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </RealmProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
export default App;
