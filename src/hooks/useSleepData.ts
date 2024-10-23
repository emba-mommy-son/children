import {useState, useCallback} from 'react';
import {Platform} from 'react-native';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import GoogleFit, {Scopes} from 'react-native-google-fit';

export type UnifiedSleepType =
  | 'LIGHT_SLEEP'
  | 'DEEP_SLEEP'
  | 'REM_SLEEP'
  | 'AWAKE'
  | 'UNKNOWN';

export interface UnifiedSleepData {
  startDate: Date;
  endDate: Date;
  sleepType: UnifiedSleepType;
}

// Google Fit API 응답 타입
interface GoogleSleepStage {
  sleepStage: number;
  endDate: string;
  startDate: string;
}

interface GoogleSleepGranularity {
  startDate: GoogleSleepStage;
}

interface GoogleSleepSession {
  addedBy: string;
  startDate: string;
  endDate: string;
  granularity: GoogleSleepGranularity[];
}

export const useSleepData = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}.${String(date.getDate()).padStart(2, '0')}.${String(
      date.getHours(),
    ).padStart(2, '0')}.${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const mapAppleSleepType = (value: string): UnifiedSleepType => {
    switch (value.toUpperCase()) {
      case 'DEEP':
        return 'DEEP_SLEEP';
      case 'CORE':
      case 'INBED':
        return 'LIGHT_SLEEP';
      case 'REM':
        return 'REM_SLEEP';
      case 'AWAKE':
        return 'AWAKE';
      default:
        return 'UNKNOWN';
    }
  };

  const mapGoogleSleepType = (stage: number): UnifiedSleepType => {
    switch (stage) {
      case 1:
        return 'AWAKE';
      case 2:
      case 3:
      case 4:
        return 'LIGHT_SLEEP';
      case 5:
        return 'DEEP_SLEEP';
      case 6:
        return 'REM_SLEEP';
      default:
        return 'UNKNOWN';
    }
  };

  const initialize = useCallback(async (): Promise<boolean> => {
    if (isInitialized) return true;

    try {
      if (Platform.OS === 'ios') {
        const permissions: HealthKitPermissions = {
          permissions: {
            read: [AppleHealthKit.Constants.Permissions.SleepAnalysis],
            write: [],
          },
        };

        return new Promise<boolean>((resolve, reject) => {
          AppleHealthKit.initHealthKit(permissions, error => {
            if (error) {
              reject(new Error('헬스킷 초기화 실패: ' + error));
              return;
            }
            setIsInitialized(true);
            resolve(true);
          });
        });
      } else {
        const options = {
          scopes: [Scopes.FITNESS_SLEEP_READ],
        };
        await GoogleFit.authorize(options);
        setIsInitialized(true);
        return true;
      }
    } catch (error) {
      throw new Error(
        `초기화 실패: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }, [isInitialized]);

  const getYesterdaysSleepData = useCallback(async (): Promise<
    UnifiedSleepData[]
  > => {
    if (!isInitialized) {
      await initialize();
    }

    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const startOfDay = new Date(yesterday);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(yesterday);
    endOfDay.setHours(23, 59, 59, 999);

    try {
      if (Platform.OS === 'ios') {
        const options = {
          startDate: startOfDay.toISOString(),
          endDate: endOfDay.toISOString(),
          ascending: true,
        };

        return new Promise<UnifiedSleepData[]>((resolve, reject) => {
          AppleHealthKit.getSleepSamples(
            options,
            (err: string, results: HealthValue[]) => {
              if (err) {
                reject(new Error('수면 데이터 조회 실패: ' + err));
                return;
              }

              const unifiedData: UnifiedSleepData[] = results.map(sample => ({
                startDate: new Date(sample.startDate),
                endDate: new Date(sample.endDate),
                sleepType: mapAppleSleepType(sample.value as unknown as string),
              }));

              resolve(unifiedData);
            },
          );
        });
      } else {
        const options = {
          startDate: startOfDay.toISOString(),
          endDate: endOfDay.toISOString(),
        };

        // @ts-ignore
        const sleepSamples = (await GoogleFit.getSleepSamples(
          options,
        )) as GoogleSleepSession[];

        const unifiedData: UnifiedSleepData[] = [];

        sleepSamples.forEach(session => {
          if (session.granularity?.length > 0) {
            session.granularity.forEach(gran => {
              if (gran.startDate) {
                unifiedData.push({
                  startDate: new Date(gran.startDate.startDate),
                  endDate: new Date(gran.startDate.endDate),
                  sleepType: mapGoogleSleepType(gran.startDate.sleepStage),
                });
              }
            });
          } else {
            // granularity가 빈배열이면 일단 기본값으로 LIGHT_SLEEP 처리
            unifiedData.push({
              startDate: new Date(session.startDate),
              endDate: new Date(session.endDate),
              sleepType: 'LIGHT_SLEEP',
            });
          }
        });

        return unifiedData;
      }
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
    getYesterdaysSleepData,
  };
};
