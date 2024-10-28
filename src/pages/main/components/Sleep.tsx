// 리액트
import {Image, Text, View} from 'react-native';

// 아이콘
import Moon from '@/assets/icons/moon.png';

export const Sleep = () => {
  return (
    <View className="flex flex-col bg-pink w-[120px] h-[150px] rounded-2xl p-5">
      <Text className="text-white text-[16px] font-semibold mb-2">
        수면
      </Text>
      <Text className="text-white text-[14px] font-semibold">잘잤어요</Text>
      <Image source={Moon} className="w-[40px] h-[40px] ml-auto mt-auto" />
    </View>
  );
};
