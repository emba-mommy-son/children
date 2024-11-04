import Card from '@/assets/icons/card.png';
import {useMonthControl} from '@/hooks/useMonthControl';
import {RewardList} from '@/pages/reward/components/RewardList';
import {useUserStore} from '@/store/useUserStore';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';

export function RewardContent() {
  const reward = useUserStore(state => state.userInfo?.reward);
  const {date, isCurrentMonth, handlePrevMonth, handleNextMonth} =
    useMonthControl();

  return (
    <View className="p-4 space-y-3">
      <View className="bg-primary w-full p-4 rounded-2xl flex flex-col justify-center items-center">
        <Text className="text-white text-[14px]">내가 보유한 리워드</Text>
        <View className="flex flex-row items-center gap-2">
          <Image source={Card} className="w-[40px] h-[40px] rotate-90" />
          <Text className="text-white text-[14px] font-bold">
            {reward?.toLocaleString()}
          </Text>
        </View>
      </View>
      <View className="bg-gray-700 p-3 rounded-lg flex-row justify-between items-center">
        <TouchableOpacity onPress={handlePrevMonth}>
          <EntypoIcons name="chevron-left" size={20} color="#666" />
        </TouchableOpacity>
        <Text className="font-semibold text-black">
          {date.year}년 {date.month}월
        </Text>
        {!isCurrentMonth() ? (
          <TouchableOpacity onPress={handleNextMonth}>
            <EntypoIcons name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        ) : (
          <View style={{width: 24}} />
        )}
      </View>
      <RewardList year={date.year} month={date.month} />
    </View>
  );
}
