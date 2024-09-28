/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RealmProvider} from '@realm/react';
import {FriendPage} from 'pages/friend/pages/FriendPage';
import {LocationPage} from 'pages/location/pages/LocationPage';
import {SleepPage} from 'pages/sleep/pages/SleepPage';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomNavigationBar from './src/components/common/BottomNavigationBar';
import {GenerateMessage} from './src/database/schemas/GenerateMessageSchema';
import {Location} from './src/database/schemas/LocationSchema';
import {Message} from './src/database/schemas/MessageSchema';
import {RefineMessage} from './src/database/schemas/RefineMessageSchema';
import {Sentiment} from './src/database/schemas/SentimentSchema';
import GenerateAIPage from './src/pages/AI/pages/GenerateAIPage';
import {MainPage} from './src/pages/main/pages/MainPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
            <Tab.Screen name="Friend" component={FriendPage} />
            <Tab.Screen name="Chatting" component={GenerateAIPage} />
            <Tab.Screen name="Sleep" component={SleepPage} />
            <Tab.Screen name="Location" component={LocationPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </RealmProvider>
    </SafeAreaProvider>
  );
}

export default App;
