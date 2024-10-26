/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {signIn} from '@/api/user/signIn';
import {GenerateMessage} from '@/database/schemas/GenerateMessageSchema';
import {Location} from '@/database/schemas/LocationSchema';
import {Message} from '@/database/schemas/MessageSchema';
import {RefineMessage} from '@/database/schemas/RefineMessageSchema';
import {Sentiment} from '@/database/schemas/SentimentSchema';
import {useLogin} from '@/hooks/useLogin';
import {useNotification} from '@/hooks/useNotification';
import {AppNavigator} from '@/navigation/AppNavigator';
import {useAuthStore} from '@/store/useAuthStore';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {RealmProvider} from '@realm/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
  const {foregroundNotification} = useNotification();
  const {setAccessToken, setRefreshToken} = useAuthStore.getState();
  const fetchLoginData = async () => {
    const loginData = await getLoginData();

    if (loginData) {
      const {username, password} = loginData;
      return {username, password};
    }

    return {username: 'rlaehdud1002', password: 'password123!'};
  };

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

  useEffect(() => {
    foregroundNotification();
    // backgroundNotification();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background FCM message:', remoteMessage);
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
