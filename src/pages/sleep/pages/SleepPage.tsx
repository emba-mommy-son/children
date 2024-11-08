import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useSleepSession} from '@/database/query/useSleepSession';
import {DayScrollView} from '@/pages/sleep/components/DayScrollView';
import {StatCard} from '@/pages/sleep/components/StatCard';
import {SleepInfoCard} from '@/pages/sleep/components/SleepInfoCard';
import {SleepGraph} from '@/pages/sleep/components/SleepGraph';

export const SleepPage: React.FC = () => {
  const {weeklyStats} = useSleepSession();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="bg-secondary p-4 flex-row justify-between items-center">
        <Text className="text-white text-lg font-bold">
          {new Date().toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{paddingBottom: 24}}>
        <DayScrollView weeklyHours={weeklyStats.weeklyHours} />

        <View className="flex-row justify-between mt-4">
          <View className="w-[48%]">
            <StatCard
              title="평균 수면시간"
              value={weeklyStats.averageSleepTime}
              unit="시간"
            />
          </View>
          <View className="w-[48%]">
            <StatCard
              title="숙면도"
              value={weeklyStats.sleepQuality}
              unit="%"
            />
          </View>
        </View>

        <SleepInfoCard
          totalSleep={weeklyStats.lastNightSleep.totalSleep}
          bedTime={weeklyStats.lastNightSleep.bedTime}
          wakeUpTime={weeklyStats.lastNightSleep.wakeUpTime}
          actualSleep={weeklyStats.lastNightSleep.actualSleep}
        />
        <SleepGraph weeklyHours={weeklyStats.weeklyHours} />
      </ScrollView>
    </SafeAreaView>
  );
};
