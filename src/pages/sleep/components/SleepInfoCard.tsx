import {Text, View} from 'react-native';
import {SleepInfoCardItem} from '@/pages/sleep/components/SleepInfoCardItem';
import {LABELS} from '@/constants/labels';

interface SleepInfoCardProps {
  totalSleep: string;
  bedTime: string;
  wakeUpTime: string;
  actualSleep: string;
}

export const SleepInfoCard: React.FC<SleepInfoCardProps> = ({
  totalSleep,
  bedTime,
  wakeUpTime,
  actualSleep,
}) => {
  return (
    <View className="bg-white rounded-2xl p-4 mt-4">
      <Text className="text-lg font-bold mb-4">어제의 수면 정보</Text>
      <View className="flex-row justify-between mb-4">
        <SleepInfoCardItem
          iconType="TOTAL"
          value={totalSleep}
          label={LABELS.sleep.TOTAL}
        />
        <SleepInfoCardItem
          iconType="DEEP"
          value={actualSleep}
          label={LABELS.sleep.DEEP}
        />
      </View>
      <View className="flex-row justify-between">
        <SleepInfoCardItem
          iconType="INBED"
          value={bedTime}
          label={LABELS.sleep.INBED}
        />
        <SleepInfoCardItem
          iconType="WAKE"
          value={wakeUpTime}
          label={LABELS.sleep.WAKE}
        />
      </View>
    </View>
  );
};
