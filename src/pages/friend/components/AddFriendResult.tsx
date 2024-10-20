import {Image, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UserInfo} from '@/types/user';
import {useCreateFriend} from '@/api/friend';

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
  const nav = useNavigation();
  const {mutate: createFriend} = useCreateFriend();

  const handleClear = () => {
    reset();
    setFriendData(null);
  };
  const handleAddFriend = () => {
    createFriend(friendData.id, {
      onSuccess: () => {
        nav.goBack();
      },
    });
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
        <Text
          onPress={handleAddFriend}
          className="bg-primary text-body-text text-white font-bold rounded-xl px-10 py-2">
          추가
        </Text>
      </View>
    </View>
  );
};
