/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useSignIn} from '@api/user/useSignin';
import {NavigationContainer} from '@react-navigation/native';
import {RealmProvider} from '@realm/react';
import {useAuthStore} from '@store/useAuthStore';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useLogin} from 'hooks/useLogin';
import {AppNavigator} from 'navigation/AppNavigator';
import {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GenerateMessage} from './src/database/schemas/GenerateMessageSchema';
import {Location} from './src/database/schemas/LocationSchema';
import {Message} from './src/database/schemas/MessageSchema';
import {RefineMessage} from './src/database/schemas/RefineMessageSchema';
import {Sentiment} from './src/database/schemas/SentimentSchema';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const {getLoginData} = useLogin();
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
      useSignIn({username: data.username, password: data.password}).then(
        tokenData => {
          setAccessToken(tokenData.accessToken);
          setRefreshToken(tokenData.refreshToken);
        },
      );
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
