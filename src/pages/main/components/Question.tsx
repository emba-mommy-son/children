// 리액트
import {Image, Text, View} from 'react-native';

// 아이콘
import Angry from '@/assets/icons/emotion/angry.png';
import Happy from '@/assets/icons/emotion/happy.png';
import Soso from '@/assets/icons/emotion/soso.png';

export const Question = () => {
  return (
    <View className="bg-navy w-[280px] h-[125px] rounded-2xl p-5 flex flex-col justify-center space-y-3 mt-6">
      <Text className="text-white text-[16px] font-semibold mb-2 text-center">
        어제 하루는 어땠나요?
      </Text>
      <View className="flex flex-row justify-evenly">
        <Image source={Happy} className="w-[40px] h-[40px]" />
        <Image source={Soso} className="w-[40px] h-[40px]" />
        <Image source={Angry} className="w-[40px] h-[40px]" />
      </View>
    </View>
  );
};
