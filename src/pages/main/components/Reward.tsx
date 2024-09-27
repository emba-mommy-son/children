import card from 'assets/icons/card.png';
import {Image, Text, View} from 'react-native';

export const Reward = () => {
  return (
    <View className="flex flex-col bg-yellow w-[120px] h-[180px] rounded-2xl p-5 mr-3">
      <Text className="text-white text-SubHeading font-semibold mb-2">
        리워드
      </Text>
      <Text className="text-white text-Body-Text font-semibold">6,000</Text>
      <Image source={card} className="w-[50px] h-[50px] ml-auto mt-auto" />
    </View>
  );
};
