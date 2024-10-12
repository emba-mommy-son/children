/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {RealmProvider} from '@realm/react';
import {AppNavigator} from 'navigation/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GenerateMessage} from './src/database/schemas/GenerateMessageSchema';
import {Location} from './src/database/schemas/LocationSchema';
import {Message} from './src/database/schemas/MessageSchema';
import {RefineMessage} from './src/database/schemas/RefineMessageSchema';
import {Sentiment} from './src/database/schemas/SentimentSchema';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RealmProvider
        schema={[Message, RefineMessage, Location, Sentiment, GenerateMessage]}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </RealmProvider>
    </SafeAreaProvider>
  );
}

export default App;
