import {useNotification} from '@/hooks/useNotification';
import {useSleepSync} from '@/hooks/useSleepSync';
import {AppNavigator} from '@/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

export const AppWrapper = () => {

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
