// 리액트
import {Image, Text, View} from 'react-native';
import {useSleepSession} from '@/database/query/useSleepSession';
// 아이콘
import Moon from '@/assets/icons/moon.png';

export const Sleep = () => {
  const {weeklyStats} = useSleepSession();
  console.log(weeklyStats.sleepQuality);

  const getSleepMessage = (quality: number | undefined) => {
    if (quality === undefined || quality === 0) {
      return '';
    }
    return quality >= 50 ? '잘잤어요' : '못잤어요';
  };
  return (
    <View className="flex flex-col bg-pink w-2/5 h-[150px] rounded-2xl p-5">
      <Text className="text-white text-[16px] font-semibold mb-2">수면</Text>
      <Text className="text-white text-[14px] font-semibold">
        {getSleepMessage(weeklyStats?.sleepQuality)}
      </Text>
      <Image source={Moon} className="w-[40px] h-[40px] ml-auto mt-auto" />
    </View>
  );
};
