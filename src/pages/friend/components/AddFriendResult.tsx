import FriendImage from '@/assets/icons/friend/friendImage.png';
import {Image, Text, View} from 'react-native';

export const AddFriendResult = () => {
  return (
    <View className="bg-primary/20 m-4 p-5 rounded-xl flex flex-col items-center justify-center space-y-6">
      <Image source={FriendImage} className="w-24 h-24" />
      <Text className="text-subheading text-black font-bold">김민지</Text>
      <View className="flex flex-row space-x-5">
        <Text className="bg-white text-body-text text-black font-bold rounded-xl px-10 py-2">
          취소
        </Text>
        <Text className="bg-primary text-body-text text-white font-bold rounded-xl px-10 py-2">
          추가
        </Text>
      </View>
    </View>
  );
};
