// 라이브러리
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// 컴포넌트
import {BottomNavigationBar} from '@/components/common/BottomNavigationBar';
import {AlarmPage} from '@/pages/alarm/pages/AlarmPage';
import {ChattingListPage} from '@/pages/chatting/pages/ChattingListPage';
import {ChattingPage} from '@/pages/chatting/pages/ChattingPage';
import {AddFriendPage} from '@/pages/friend/pages/AddFriendPage';
import {FriendPage} from '@/pages/friend/pages/FriendPage';
import {FriendRankingPage} from '@/pages/friend/pages/FriendRankingPage';
import {LocationPage} from '@/pages/location/pages/LocationPage';
import {MainPage} from '@/pages/main/pages/MainPage';
import {RewardPage} from '@/pages/reward/pages/RewardPage';
import {SleepPage} from '@/pages/sleep/pages/SleepPage';

import {ROUTES} from '@/constants/routeURL';

type AppNavigatorParamList = {
  [ROUTES.MAIN_TABS]: undefined;
  [ROUTES.ALARM]: undefined;
  [ROUTES.REWARD]: undefined;
  [ROUTES.CHATTING]: {roomId: number};
  [ROUTES.FRIEND_RANKING]: undefined;
  [ROUTES.ADD_FRIEND]: undefined;
};

export type AppNavigatorProp = NativeStackNavigationProp<AppNavigatorParamList>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomNavigationBar {...props} />}>
      <Tab.Screen name={ROUTES.HOME} component={MainPage} />
      <Tab.Screen name={ROUTES.FRIEND} component={FriendPage} />
      <Tab.Screen
        name={ROUTES.CHATTING_LIST}
        component={ChattingListPage}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name={ROUTES.SLEEP} component={SleepPage} />
      <Tab.Screen name={ROUTES.LOCATION} component={LocationPage} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.MAIN_TABS} component={TabNavigator} />
      <Stack.Screen name={ROUTES.ALARM} component={AlarmPage} />
      <Stack.Screen name={ROUTES.REWARD} component={RewardPage} />
      <Stack.Screen name={ROUTES.CHATTING} component={ChattingPage} />
      <Stack.Screen
        name={ROUTES.FRIEND_RANKING}
        component={FriendRankingPage}
      />
      <Stack.Screen name={ROUTES.ADD_FRIEND} component={AddFriendPage} />
    </Stack.Navigator>
  );
};
