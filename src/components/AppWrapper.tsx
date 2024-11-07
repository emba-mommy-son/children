import {useNotification} from '@/hooks/useNotification';
import {useSleepSync} from '@/hooks/useSleepSync';
import {AppNavigator} from '@/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

export const AppWrapper = () => {
  // 수면 데이터
  const {syncSleepData} = useSleepSync();

  // 푸시 알림
  const {initialize} = useNotification();

  useEffect(() => {
    const unsubscribe = initialize();
    syncSleepData();
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
