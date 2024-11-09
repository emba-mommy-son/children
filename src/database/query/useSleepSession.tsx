import {useCallback, useMemo} from 'react';
import {useQuery} from '@realm/react';
import {SleepSession} from '@/database/schemas/SleepSessionSchema';
import {
  calculateSleepTimeScore,
  calculateBedTimeScore,
  calculateWakeTimeScore,
  calculateActualSleep,
} from '@/utils/sleepUtils';

export const useSleepSession = () => {
  const sleepSessions = useQuery(SleepSession);

  // 주간 데이터 조회
  const findWeeklyData = useCallback(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    // 날짜 범위를 시작일 00:00:00부터 종료일 23:59:59로 설정
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return sleepSessions
      .filtered('startDate >= $0 AND endDate <= $1', startDate, endDate)
      .sorted('startDate', true);
  }, [sleepSessions]);

  // 통계 데이터 계산
  const weeklyStats = useMemo(() => {
    const sessions = findWeeklyData();
    if (sessions.length === 0) {
      return {
        averageSleepTime: 0,
        totalSleepTime: 0,
        averageBedTime: '',
        averageWakeTime: '',
        sleepQuality: 0,
        weeklyHours: new Array(7).fill(0),
        lastNightSleep: {
          totalSleep: '0시간 0분',
          bedTime: '-',
          wakeUpTime: '-',
          actualSleep: '0시간 0분',
        },
      };
    }

    // 날짜별 수면 시간을 저장할 객체
    const dailySleep: {[key: string]: number} = {};
    const bedTimes: Date[] = [];
    const wakeTimes: Date[] = [];
    let totalMinutes = 0;

    sessions.forEach(session => {
      // 수면 시작일을 기준으로 날짜 구하기
      const sessionDate = new Date(session.startDate);
      const dateKey = sessionDate.toISOString().split('T')[0];

      // 해당 날짜의 수면 시간 누적
      if (!dailySleep[dateKey]) {
        dailySleep[dateKey] = 0;
      }
      dailySleep[dateKey] += session.totalSleepTime / 60; // 시간 단위로 변환

      totalMinutes += session.totalSleepTime;
      bedTimes.push(session.startDate);
      wakeTimes.push(session.endDate);
    });

    // 최근 7일의 수면 시간 배열 생성
    const weeklyHours = Array(7).fill(0);
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      // 배열의 마지막부터 채움 (최신 데이터가 마지막에)
      weeklyHours[6 - i] = dailySleep[dateKey] || 0;
    }

    // 평균 취침/기상 시간 계산
    const avgBedTime = new Date(
      bedTimes.reduce((sum, date) => sum + date.getTime(), 0) / bedTimes.length,
    );
    const avgWakeTime = new Date(
      wakeTimes.reduce((sum, date) => sum + date.getTime(), 0) /
        wakeTimes.length,
    );

    // 가장 최근 수면 데이터
    const lastSession = sessions[0];

    // 수면 점수 계산(숙면도, 숙면 시간)
    const sleepTimeScore = calculateSleepTimeScore(lastSession.totalSleepTime);
    const bedTimeScore = calculateBedTimeScore(lastSession.startDate);
    const wakeTimeScore = calculateWakeTimeScore(lastSession.endDate);
    const totalSleepQuality = sleepTimeScore + bedTimeScore + wakeTimeScore;

    const formatTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}시간 ${mins}분`;
    };

    const formatTimeWithAmPm = (date: Date) => {
      return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    };

    return {
      averageSleepTime: totalMinutes / (60 * sessions.length), // 시간 단위
      totalSleepTime: totalMinutes / 60, // 시간 단위
      averageBedTime: formatTimeWithAmPm(avgBedTime),
      averageWakeTime: formatTimeWithAmPm(avgWakeTime),
      sleepQuality: totalSleepQuality,
      weeklyHours, // 수정된 weeklyHours 배열
      lastNightSleep: {
        totalSleep: formatTime(lastSession.totalSleepTime),
        bedTime: formatTimeWithAmPm(lastSession.startDate),
        wakeUpTime: formatTimeWithAmPm(lastSession.endDate),
        actualSleep: formatTime(
          calculateActualSleep(lastSession.totalSleepTime),
        ),
      },
    };
  }, [findWeeklyData]);

  // 일별 평균 수면 시간 트렌드
  const getDailyTrend = useCallback(() => {
    const sessions = findWeeklyData();
    const trend: Record<string, number> = {};

    sessions.forEach(session => {
      const date = session.startDate.toISOString().split('T')[0];
      if (!trend[date]) {
        trend[date] = session.totalSleepTime / 60; // 시간 단위로 저장
      }
    });

    return trend;
  }, [findWeeklyData]);

  return {
    findWeeklyData,
    weeklyStats,
    getDailyTrend,
  };
};
