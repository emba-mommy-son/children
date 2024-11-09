import {useState, useCallback} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';

interface GoogleSleepSession {
  startDate: string;
  endDate: string;
  addedBy: string;
}

export const useSleepData = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const requestAndroidPermissions = async (): Promise<boolean> => {
    try {
      // API 29(Android 10) 이상에서만 ACTIVITY_RECOGNITION 권한 필요
      if (parseInt(Platform.Version as string) >= 29) {
        console.log('Android 10 이상: ACTIVITY_RECOGNITION 권한 요청');
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
          {
            title: '활동 권한',
            message: '수면 데이터를 가져오기 위해 활동 권한이 필요합니다.',
            buttonNeutral: '나중에 묻기',
            buttonNegative: '취소',
            buttonPositive: '확인',
          },
        );

        return result === PermissionsAndroid.RESULTS.GRANTED;
      }

      // Android 9 이하에서는 추가 권한이 필요하지 않음
      return true;
    } catch (err) {
      console.warn('권한 요청 에러:', err);
      return false;
    }
  };
  const initialize = useCallback(async (): Promise<boolean> => {
    if (isInitialized) return true;

    try {
      const permissionGranted = await requestAndroidPermissions();
      if (!permissionGranted) {
        throw new Error('활동 권한이 거부되었습니다.');
      }
      console.log('권한 거부 안됨');
      const options = {
        scopes: [
          Scopes.FITNESS_ACTIVITY_READ,
          Scopes.FITNESS_BODY_READ,
          Scopes.FITNESS_SLEEP_READ,
        ],
        androidClientId:
          '631375258700-h4gv5afkqrd07au5advl4vr8olnh5igt.apps.googleusercontent.com',
      };
      const authResult = await GoogleFit.authorize(options);
      console.log('Google Fit 인증 결과:', authResult);

      if (!authResult.success) {
        throw new Error('Google Fit 인증 실패: ' + authResult.message);
      }

      setIsInitialized(true);
      return true;
    } catch (error) {
      throw new Error(
        `초기화 실패: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }, [isInitialized]);

  const getWeekSleepData = useCallback(async (): Promise<
    GoogleSleepSession[]
  > => {
    if (!isInitialized) {
      await initialize();
    }

    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const options = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      const sleepSessions = await GoogleFit.getSleepSamples(options);
      return sleepSessions;
    } catch (error) {
      throw new Error(
        `수면 데이터 처리 중 오류: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }, [isInitialized, initialize]);

  return {
    isInitialized,
    initialize,
    getWeekSleepData,
  };
};
