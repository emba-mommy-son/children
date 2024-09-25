/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RealmProvider} from '@realm/react';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomNavigationBar from './src/components/common/BottomNavigationBar';
import {GenerateMessage} from './src/database/schemas/GenerateMessageSchema';
import {Location} from './src/database/schemas/LocationSchema';
import {Message} from './src/database/schemas/MessageSchema';
import {RefineMessage} from './src/database/schemas/RefineMessageSchema';
import {Sentiment} from './src/database/schemas/SentimentSchema';
import Chatting from './src/pages/chatting/pages/Chatting';
import GenerateAIPage from './src/pages/AI/pages/GenerateAIPage';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RealmProvider
        schema={[Message, RefineMessage, Location, Sentiment, GenerateMessage]}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Chatting"
            screenOptions={{
              headerShown: false,
            }}
            tabBar={props => <BottomNavigationBar {...props} />}>
            <Tab.Screen name="Home" component={Chatting} />
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
