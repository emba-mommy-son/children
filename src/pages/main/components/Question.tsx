import angry from 'assets/icons/emotion/angry.png';
import bad from 'assets/icons/emotion/bad.png';
import good from 'assets/icons/emotion/good.png';
import {Image, Text, View} from 'react-native';

export const Question = () => {
  return (
    <View className="bg-navy w-[311px] h-[149px] rounded-2xl p-5 flex flex-col justify-center space-y-3 mt-8">
      <Text className="text-white text-SubHeading font-semibold mb-2 text-center">
        어제 하루는 어땠나요?
      </Text>
      <View className="flex flex-row justify-evenly">
        <Image source={bad} className="w-[50px] h-[50px]" />
        <Image source={good} className="w-[50px] h-[50px]" />
        <Image source={angry} className="w-[50px] h-[50px]" />
      </View>
    </View>
  );
};
