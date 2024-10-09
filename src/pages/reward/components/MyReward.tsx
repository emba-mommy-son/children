import Card from '@assets/icons/card.png';
import {Image, Text, View} from 'react-native';

export const MyReward: React.FC = () => {
  return (
    <View className="bg-primary w-full p-4 rounded-2xl flex flex-col justify-center items-center">
      <Text className="text-white text-subheading">내가 보유한 리워드</Text>
      <View className="flex flex-row items-center">
        <Image source={Card} className="w-[60px] h-[60px] rotate-90" />
        <Text className="text-white text-subheading">12,000</Text>
      </View>
    </View>
  );
};
