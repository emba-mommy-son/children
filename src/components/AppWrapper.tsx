import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from '@/navigation/AppNavigator';
import {useSleepSync} from '@/hooks/useSleepSync';

export const AppWrapper: React.FC = () => {
  const {syncSleepData} = useSleepSync();

  useEffect(() => {
    syncSleepData();
  }, [syncSleepData]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
