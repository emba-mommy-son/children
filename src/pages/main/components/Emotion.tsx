// 리액트
import {Image, Text, View} from 'react-native';

// 아이콘
import Graph from '@/assets/icons/graph.png';

interface EmotionProps {
  emotion: string;
}

enum EmotionType {
  happy = '행복해요',
  soso = '그저 그래요',
  angry = '화나요',
}

export const Emotion = ({emotion}: EmotionProps) => {
  return (
    <View className="flex flex-col bg-bluishgreen w-3/5 h-[150px] rounded-2xl p-5">
      <Text className="text-white text-[16px] font-semibold mb-2">
        요즘 기분
      </Text>
      <Text className="text-white text-[14px] font-semibold">
        {emotion === 'happy'
          ? EmotionType.happy
          : emotion === 'soso'
          ? EmotionType.soso
          : emotion === 'angry'
          ? EmotionType.angry
          : ''}
      </Text>
      <Image source={Graph} className="w-[40px] h-[40px] ml-auto mt-auto" />
    </View>
  );
};
