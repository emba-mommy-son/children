import {useCallback} from 'react';
import {useRealm} from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SleepSyncInfo} from '@/types/sleep';
import {useSleepData} from '@/hooks/useSleepData';
import {useCreateSleep} from '@/api/sleep';
import {STORAGE_KEYS} from '@/constants/storage';

export const useSleepSync = () => {
  const realm = useRealm();
  const {getWeekSleepData} = useSleepData();
  const {mutate: createSleep} = useCreateSleep();

  // AsyncStorage에서 마지막 동기화 정보 조회
  const getLasySyncInfo =
    useCallback(async (): Promise<SleepSyncInfo | null> => {
      try {
        const syncInfoStr = await AsyncStorage.getItem(
          STORAGE_KEYS.SLEEP_LASY_SYNC,
        );
        if (!syncInfoStr) return null;
        return JSON.parse(syncInfoStr) as SleepSyncInfo;
      } catch (error) {
        console.error('마지막 수면데이터 동기화 조회 실패', error);
        return null;
      }
    }, []);

  // 동기화 정보를 AsyncStorage에 업데이트
  const updateSyncInfo = useCallback(async (status: 'success' | 'failed') => {
    try {
      const syncInfo: SleepSyncInfo = {
        lasySyncTime: new Date().toISOString(),
        status,
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.SLEEP_LASY_SYNC,
        JSON.stringify(syncInfo),
      );
    } catch (error) {
      console.error('동기화 정보 업데이트 실패:', error);
    }
  }, []);

  // 동기화가 필요한지 확인
  // 마지막 동기화로부터 24시간이 지났거나, 이전 동기화가 실패한 경우 true 반환
  const needsSync = useCallback(async (): Promise<boolean> => {
    const lasySync = await getLasySyncInfo();
    if (!lasySync) return true;

    const lasySyncTime = new Date(lasySync.lasySyncTime);
    const now = new Date();
    const hoursSinceLasySync =
      (now.getTime() - lasySyncTime.getTime()) / (1000 * 60 * 60);

    return hoursSinceLasySync >= 24 || lasySync.status === 'failed';
  }, [getLasySyncInfo]);

  // 백엔드서버에 수면 데이터 전송 함수
  const syncToServer = useCallback(async () => {
    // isSynced가 false인 데이터들 조회
    const unsyncedSessions = realm
      .objects('SleepSession')
      .filtered('isSynced == false');

    if (unsyncedSessions.length === 0) return;

    try {
      // 필요한 데이터만 배열로 변환
      const sessionsToSync = unsyncedSessions.map(session => ({
        startAt: new Date(session.startDate as Date).toISOString().slice(0, 19),
        endAt: new Date(session.endDate as Date).toISOString().slice(0, 19),
      }));

      await createSleep(sessionsToSync);

      // 서버에 전송 성공하면 isSynced를 true로 업데이트
      realm.write(() => {
        unsyncedSessions.forEach(session => {
          session.isSynced = true;
        });
      });
    } catch (error) {
      console.error('서버 전송 실패 : ', error);
    }
  }, [realm]);

  // 수면 데이터 동기화 메인 함수 (이게 찐임)
  // 1. 동기화 필요 여부 확인
  // 2. Google Fit에서 최근 일주일치 수면 데이터 조회
  // 3. Realm에 데이터 저장
  // 4. 동기화 상태 업데이트
  const syncSleepData = useCallback(async () => {
    try {
      // 동기화 여부 확인
      const shouldSync = await needsSync();
      if (!shouldSync) {
        console.log('동기화가 필요하지 않습니다.');
        return;
      }
      console.log('수면 데이터 동기화 시작');
      // GoogleFit에서 데이터 가져오기
      const sleepData = await getWeekSleepData();

      // Realm에 데이터 저장
      realm.write(() => {
        sleepData.forEach(session => {
          const sessionId = `${session.startDate}_${session.endDate}`;
          const startTime = new Date(session.startDate);
          const endTime = new Date(session.endDate);
          const totalMinutes = Math.floor(
            (endTime.getTime() - startTime.getTime()) / (1000 * 60),
          );
          // 데이터 저장 or 이미 존재하는 경우엔 업데이트
          realm.create(
            'SleepSession',
            {
              id: sessionId,
              startDate: startTime,
              endDate: endTime,
              dataSource: session.addedBy,
              totalSleepTime: totalMinutes,
              createdAt: new Date(),
              updatedAt: new Date(),
              isSynced: false,
            },
            Realm.UpdateMode.Modified,
          );
        });
      });
      // 백엔드 서버에 동기화
      await syncToServer();

      // 동기화 성공 정보 저장
      await updateSyncInfo('success');
      console.log('수면 데이터 동기화 완료');
    } catch (error) {
      console.error('수면 데이터 동기화 실패:', error);
      // 동기화 실패 정보 저장
      await updateSyncInfo('failed');
    }
  }, [realm, getWeekSleepData, needsSync, updateSyncInfo, syncToServer]);

  return {
    syncSleepData,
  };
};
