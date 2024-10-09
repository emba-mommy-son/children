// 리액트
import {Image, Text, View} from 'react-native';

// 아이콘
import Graph from '@assets/icons/graph.png';

export const Emotion = () => {
  return (
    <View className="flex flex-col bg-bluishgreen w-[180px] h-[180px] rounded-2xl p-5">
      <Text className="text-white text-subheading font-semibold mb-2">
        요즘 기분
      </Text>
      <Text className="text-white text-body-text font-semibold">행복해요</Text>
      <Image source={Graph} className="w-[50px] h-[50px] ml-auto mt-auto" />
    </View>
  );
};
