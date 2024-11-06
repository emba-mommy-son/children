import {useGeoLocation} from '@/hooks/useGeoLocation';
import {useNotification} from '@/hooks/useNotification';
import {useSleepSync} from '@/hooks/useSleepSync';
import {AppNavigator} from '@/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

export const AppWrapper: React.FC = () => {
  // 수면 데이터
  const {syncSleepData} = useSleepSync();

  // 지오펜스
  // const {initialze: geofenceInit, isOutOfBounds} = useGeofence();

  // 위치 정보
  // useEffect(() => {
  //   console.log('isOutOfBounds', isOutOfBounds);
  // }, [isOutOfBounds]);

  const {initialize: locationInit} = useGeoLocation();

  // 푸시 알림
  const {initialize} = useNotification();

  useEffect(() => {
    const unsubscribe = initialize();
    console.log(unsubscribe);
    syncSleepData();
    // geofenceInit();
    locationInit();
    return () => {
      unsubscribe;
    };
  }, []);

  // useEffect(() => {

  // }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
