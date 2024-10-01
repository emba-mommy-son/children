import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomNavigationBar} from '@components/common/BottomNavigationBar';
import {MainPage} from '@pages/main/pages/MainPage';
import {FriendPage} from '@pages/friend/pages/FriendPage';
import {GenerateAIPage} from '@pages/AI/pages/GenerateAIPage';
import {SleepPage} from '@pages/sleep/pages/SleepPage';
import {LocationPage} from '@pages/location/pages/LocationPage';
import {AlarmPage} from '@pages/alarm/pages/AlarmPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
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
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Alarm" component={AlarmPage} />
    </Stack.Navigator>
  );
};
