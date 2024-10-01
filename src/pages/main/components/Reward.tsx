import {Image, Text, View} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import Card from '@assets/icons/card.png';

export const Reward = () => {
  return (
    <View className="flex flex-col bg-yellow w-[120px] h-[180px] rounded-2xl p-5 mr-3">
      <View className="flex flex-row items-center mb-2">
        <Text className="text-white text-subheading font-semibold mb-1">
          리워드
        </Text>
        <Icons name="right" color="white" size={20} />
      </View>
      <Text className="text-white text-body-text font-semibold">6,000</Text>
      <Image source={Card} className="w-[50px] h-[50px] ml-auto mt-auto" />
    </View>
  );
};
