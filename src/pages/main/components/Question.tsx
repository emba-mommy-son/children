// 리액트
import {Image, Pressable, Text, View} from 'react-native';

// 아이콘
import Angry from '@/assets/icons/emotion/angry.png';
import Happy from '@/assets/icons/emotion/happy.png';
import Soso from '@/assets/icons/emotion/soso.png';
import {useEffect, useState} from 'react';

export const Question = () => {
  const [selected, setSelected] = useState<string>('');

  const handleClick = (emotion: string) => {
    setSelected(emotion);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <View className="bg-navy w-[280px] h-[125px] rounded-2xl p-5 flex flex-col justify-center space-y-3 mt-6">
      <Text className="text-white text-[16px] font-semibold mb-2 text-center">
        어제 하루는 어땠나요?
      </Text>
      <View className="flex flex-row justify-evenly">
        <Pressable onPress={() => handleClick('happy')}>
          <Image source={Happy} className="w-[40px] h-[40px]" />
        </Pressable>
        <Pressable onPress={() => handleClick('soso')}>
          <Image source={Soso} className="w-[40px] h-[40px]" />
        </Pressable>
        <Pressable onPress={() => handleClick('angry')}>
          <Image source={Angry} className="w-[40px] h-[40px]" />
        </Pressable>
      </View>
    </View>
  );
};
