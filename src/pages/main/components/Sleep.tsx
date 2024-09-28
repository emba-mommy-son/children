import Moon from 'assets/icons/moon.png';
import {Image, Text, View} from 'react-native';

export const Sleep = () => {
  return (
    <View className="flex flex-col bg-pink w-[120px] h-[180px] rounded-2xl p-5">
      <Text className="text-white text-subheading font-semibold mb-2">
        수면
      </Text>
      <Text className="text-white text-body-text font-semibold">잘잤어요</Text>
      <Image source={Moon} className="w-[50px] h-[50px] ml-auto mt-auto" />
    </View>
  );
};
