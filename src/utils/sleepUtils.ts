// 총 수면시간 점수 계산 (40점 만점)
// 7-8시간: 40점
// 6-7시간 or 8-9시간: 30점
// 5-6시간 or 9-10시간: 20점
// 나머지: 10점
export const calculateSleepTimeScore = (totalMinutes: number): number => {
  const hours = totalMinutes / 60;

  if (hours >= 7 && hours <= 8) return 40;
  if ((hours >= 6 && hours < 7) || (hours > 8 && hours <= 9)) return 30;
  if ((hours >= 5 && hours < 6) || (hours > 9 && hours <= 10)) return 20;
  return 10;
};

// 취침시간 점수 계산 (30점 만점)
// 취침시간은 자정 넘어가서 잘수도 있는거니까 분 단위 계산
// 22:00~23:00: 30점
// 23:00~24:00: 25점
// 24:00~01:00: 20점
// 나머지: 10점
export const calculateBedTimeScore = (bedTime: Date): number => {
  const hours = bedTime.getHours();
  const minutes = bedTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // 22:00~23:00 (1320~1380)
  if (totalMinutes >= 1320 && totalMinutes < 1380) return 30;
  // 23:00~24:00 (1380~1440)
  if (totalMinutes >= 1380 && totalMinutes < 1440) return 25;
  // 00:00~01:00 (0~60)
  if (totalMinutes >= 0 && totalMinutes < 60) return 20;
  return 10;
};

// 기상시간 점수 계산 (30점 만점)
//05:00~07:00: 30점
//07:00~08:00: 25점
//08:00~09:00: 20점
//나머지: 10점
export const calculateWakeTimeScore = (wakeTime: Date): number => {
  const hours = wakeTime.getHours();

  if (hours >= 5 && hours < 7) return 30;
  if (hours >= 7 && hours < 8) return 25;
  if (hours >= 8 && hours < 9) return 20;
  return 10;
};

// 숙면시간 구해야되는데, 데이터가 잠든시간, 일어난 시간밖에 없음
// 총 수면시간의 85~90% 정도를 실제 숙면으로 계산
// 랜덤성을 조금 주되 일정 범위 내에서만 변동...
export const calculateActualSleep = (totalMinutes: number): number => {
  // 주기 수 계산 (90분 단위)
  const randomFactor = 0.85 + Math.random() * 0.05; // 85-90% 사이 랜덤
  return Math.floor(totalMinutes * randomFactor);
};
