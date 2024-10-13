// 라이브러리
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// 컴포넌트
import {BottomNavigationBar} from '@components/common/BottomNavigationBar';
import {AlarmPage} from '@pages/alarm/pages/AlarmPage';
import {ChattingListPage} from '@pages/chatting/pages/ChattingListPage';
import {ChattingPage} from '@pages/chatting/pages/ChattingPage';
import {FriendPage} from '@pages/friend/pages/FriendPage';
import {FriendRankingPage} from '@pages/friend/pages/FriendRankingPage';
import {LocationPage} from '@pages/location/pages/LocationPage';
import {MainPage} from '@pages/main/pages/MainPage';
import {RewardPage} from '@pages/reward/pages/RewardPage';
import {SleepPage} from '@pages/sleep/pages/SleepPage';

type AppNavigatorParamList = {
  MainTabs: undefined;
  Alarm: undefined;
  Reward: undefined;
  Chatting: {roomId: number};
  FriendRanking: undefined;
};

export type AppNavigatorProp = NativeStackNavigationProp<AppNavigatorParamList>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<AppNavigatorParamList>();

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
      <Tab.Screen
        name="ChattingList"
        component={ChattingListPage}
        options={{unmountOnBlur: true}}
      />
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
      <Stack.Screen name="Reward" component={RewardPage} />
      <Stack.Screen name="Chatting" component={ChattingPage} />
      <Stack.Screen name="FriendRanking" component={FriendRankingPage} />
    </Stack.Navigator>
  );
};
