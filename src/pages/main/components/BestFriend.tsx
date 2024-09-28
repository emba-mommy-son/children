import friend from 'assets/icons/friend.png';
import {Image, Text, View} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

export const BestFriend = () => {
  return (
    <View className="flex flex-col bg-primary w-[180px] h-[180px] rounded-2xl p-5 mr-3">
      <Text className="text-white text-SubHeading font-semibold mb-2">
        단짝친구
      </Text>
      <Text className="text-white text-Body-Text font-semibold">민준수</Text>
      <Icons name="stepforward" />
      <Image source={friend} className="w-[50px] h-[50px] ml-auto mt-auto" />
    </View>
  );
};
