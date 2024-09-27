import graph from 'assets/icons/graph.png';
import {Image, Text, View} from 'react-native';

export const Emotion = () => {
  return (
    <View className="flex flex-col bg-bluishGreen w-[180px] h-[180px] rounded-2xl p-5">
      <Text className="text-white text-SubHeading font-semibold mb-2">
        요즘 기분
      </Text>
      <Text className="text-white text-Body-Text font-semibold">행복해요</Text>
      <Image source={graph} className="w-[50px] h-[50px] ml-auto mt-auto" />
    </View>
  );
};
