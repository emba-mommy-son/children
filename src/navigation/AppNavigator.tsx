// 라이브러리
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

// 컴포넌트
import { BottomNavigationBar } from '@/components/common/BottomNavigationBar';
import { AlarmPage } from '@/pages/alarm/pages/AlarmPage';
import { ChattingListPage } from '@/pages/chatting/pages/ChattingListPage';
import { ChattingPage } from '@/pages/chatting/pages/ChattingPage';
import { AddFriendPage } from '@/pages/friend/pages/AddFriendPage';
import { FriendPage } from '@/pages/friend/pages/FriendPage';
import { FriendRankingPage } from '@/pages/friend/pages/FriendRankingPage';
import { LocationPage } from '@/pages/location/pages/LocationPage';
import { MainPage } from '@/pages/main/pages/MainPage';
import { RewardPage } from '@/pages/reward/pages/RewardPage';
import { SleepPage } from '@/pages/sleep/pages/SleepPage';
import { TodoPage } from '@/pages/todo/pages/TodoPage';

import { useGetBoundary } from '@/api/location/useGetBoundary';
import { InitialQR } from '@/components/common/InitialQR';
import { ROUTES } from '@/constants/routeURL';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { useLogin } from '@/hooks/useLogin';
import { useNotification } from '@/hooks/useNotification';
import { useSleepSync } from '@/hooks/useSleepSync';
import { WarningLocationPage } from '@/pages/location/pages/WarningLocationPage';
import { useRealm } from '@realm/react';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import { useEffect, useState } from 'react';

type AppNavigatorParamList = {
  [ROUTES.MAIN_TABS]: undefined;
  [ROUTES.ALARM]: undefined;
  [ROUTES.REWARD]: undefined;
  [ROUTES.CHATTING]: {roomId: number};
  [ROUTES.FRIEND_RANKING]: undefined;
  [ROUTES.ADD_FRIEND]: undefined;
  [ROUTES.TODO]: undefined;
  [ROUTES.WARNING]: undefined;
};

type TabNavigatorParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.FRIEND]: undefined;
  [ROUTES.CHATTING_LIST]: undefined;
  [ROUTES.SLEEP]: undefined;
  [ROUTES.LOCATION]: undefined;
};

export type AppNavigatorProp = NativeStackNavigationProp<AppNavigatorParamList>;
export type TabNavigatorProp = BottomTabNavigationProp<TabNavigatorParamList>;

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const TabNavigator = () => {
  const realm = useRealm();
  const [isLogin, setIsLogin] = useState(false);
  const {syncSleepData} = useSleepSync();
  const {getLoginData} = useLogin();
  const {initialize} = useNotification();
  const {getLocation} = useGeoLocation();
  const {data: boundaryData} = useGetBoundary();

  useEffect(() => {
    const fetchAndStoreBoundaries = async () => {
      try {
        if (boundaryData) {
          realm.write(() => {
            const boundaries = realm.objects('Boundary');
            realm.delete(boundaries);

            boundaryData.forEach(boundary => {
              realm.create('Boundary', {
                id: boundary.boundaryId,
                name: boundary.name,
                latitude: boundary.latitude,
                longitude: boundary.longitude,
                radius: boundary.radius,
                danger: boundary.danger,
              });
            });
          });
        }
      } catch (error) {
        console.error('boundary 데이터 가져오기 실패', error);
      }
    };

    fetchAndStoreBoundaries();
  }, [boundaryData]);

  // 특정 작업을 백그라운드에서 주기적으로 실행
  useEffect(() => {
    ReactNativeForegroundService.add_task(() => getLocation(), {
      delay: 5 * 60 * 1000, // 반복 실행 시간
      onLoop: true, // 반복 실행 여부
      taskId: 'mommy-son', // 고유 식별자
      onError: e => console.error(e),
    });

    startTask();
    getLocation();
    return () => {
      stopTask();
    };
  }, []);

  const startTask = () => {
    ReactNativeForegroundService.start({
      id: 'mommy-son',
      title: 'Mommy-son',
      message: 'mommy-son 어플이 실행 중입니다.',
      ServiceType: 'location',
      icon: 'ic_launcher',
      button: true,
      button2: true,
      buttonText: 'Button',
      button2Text: 'Button2',
      buttonOnPress: 'cray',
      setOnlyAlertOnce: 'true',
      color: '#000000',
    });
  };

  const stopTask = () => {
    ReactNativeForegroundService.stopAll();
    console.log('stop');
  };

  useEffect(() => {
    const unsubscribe = initialize();
    syncSleepData();
    (async () => {
      await getLoginData().then(data => {
        setIsLogin(data !== null);
      });
    })();
    return () => {
      unsubscribe;
    };
  }, []);

  if (!isLogin) {
    return <InitialQR/>
  }

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
      <Stack.Screen name={ROUTES.TODO} component={TodoPage} />
      <Stack.Screen name={ROUTES.WARNING} component={WarningLocationPage} />
    </Stack.Navigator>
  );
};
