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

    return sleepSessions
      .filtered('startDate >= $0 && endDate <= $1', startDate, endDate)
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

    // 총 수면 시간과 평균 계산
    let totalMinutes = 0;
    const weeklyHours: number[] = new Array(7).fill(0);
    const bedTimes: Date[] = [];
    const wakeTimes: Date[] = [];

    // 오늘 날짜
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    sessions.forEach(session => {
      totalMinutes += session.totalSleepTime;

      // 세션 날짜의 시작일
      const sessionDate = new Date(session.startDate);
      sessionDate.setHours(0, 0, 0, 0);

      // 오늘로부터 몇 일 전인지 계산
      const diffDays = Math.floor(
        (today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      // 7일 이내의 데이터만 처리
      if (diffDays >= 0 && diffDays < 7) {
        weeklyHours[diffDays] = session.totalSleepTime / 60;
      }

      bedTimes.push(session.startDate);
      wakeTimes.push(session.endDate);
    });

    // weeklyHours 배열 뒤집기(제일 오랜된 날짜가 마지막에 오도록)
    weeklyHours.reverse();

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
      weeklyHours,
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
