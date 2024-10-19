import {UserInfo} from '@/types/user';
import {Image, Text, View} from 'react-native';

interface AddFriendResultProps {
  friendData: UserInfo;
  setFriendData: (friendData: UserInfo | null) => void;
  reset: () => void;
}

export const AddFriendResult = ({
  friendData,
  setFriendData,
  reset,
}: AddFriendResultProps) => {
  const handleClear = () => {
    reset();
    setFriendData(null);
  };
  
  return (
    <View className="bg-primary/20 m-4 p-5 rounded-xl flex flex-col items-center justify-center space-y-4">
      <Image
        source={{uri: friendData.profileImage}}
        className="w-20 h-20 rounded-full"
      />
      <Text className="text-subheading text-black font-bold">
        {friendData.name}
      </Text>
      <View className="flex flex-row space-x-5">
        <Text
          className="bg-white text-body-text text-black font-bold rounded-xl px-10 py-2"
          onPress={handleClear}>
          취소
        </Text>
        <Text className="bg-primary text-body-text text-white font-bold rounded-xl px-10 py-2">
          추가
        </Text>
      </View>
    </View>
  );
};
