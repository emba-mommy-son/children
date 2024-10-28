// 리액트
import {Image, Text, View} from 'react-native';

// 아이콘
import Graph from '@/assets/icons/graph.png';

export const Emotion = () => {
  return (
    <View className="flex flex-col bg-bluishgreen w-[150px] h-[150px] rounded-2xl p-5">
      <Text className="text-white text-[16px] font-semibold mb-2">
        요즘 기분
      </Text>
      <Text className="text-white text-[14px] font-semibold">행복해요</Text>
      <Image source={Graph} className="w-[40px] h-[40px] ml-auto mt-auto" />
    </View>
  );
};
