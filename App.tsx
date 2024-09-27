/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {RealmProvider} from '@realm/react';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomNavigationBar from './src/components/common/BottomNavigationBar';
import {GenerateMessage} from './src/database/schemas/GenerateMessageSchema';
import {Location} from './src/database/schemas/LocationSchema';
import {Message} from './src/database/schemas/MessageSchema';
import {RefineMessage} from './src/database/schemas/RefineMessageSchema';
import {Sentiment} from './src/database/schemas/SentimentSchema';
import GenerateAIPage from './src/pages/AI/pages/GenerateAIPage';
import Chatting from './src/pages/chatting/pages/Chatting';
import {MainPage} from './src/pages/main/pages/MainPage';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RealmProvider
        schema={[Message, RefineMessage, Location, Sentiment, GenerateMessage]}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
            tabBar={props => <BottomNavigationBar {...props} />}>
            <Tab.Screen name="Home" component={MainPage} />
            <Tab.Screen name="Location" component={Chatting} />
            <Tab.Screen name="Chatting" component={GenerateAIPage} />
            <Tab.Screen name="Friends" component={Chatting} />
            <Tab.Screen name="Health" component={Chatting} />
          </Tab.Navigator>
        </NavigationContainer>
      </RealmProvider>
    </SafeAreaProvider>
  );
}

export default App;
