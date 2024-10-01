import {Image, Text, View} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import Friend from '@assets/icons/friend.png';

export const BestFriend = () => {
  return (
    <View className="flex flex-col bg-primary w-[180px] h-[180px] rounded-2xl p-5 mr-3">
      <View className="flex flex-row items-center mb-2">
        <Text className="text-white text-subheading font-semibold mb-1">
          단짝친구
        </Text>
        <Icons name="right" color="white" size={20} />
      </View>
      <Text className="text-white text-body-text font-semibold">민준수</Text>
      <Image source={Friend} className="w-[50px] h-[50px] ml-auto mt-auto" />
    </View>
  );
};
