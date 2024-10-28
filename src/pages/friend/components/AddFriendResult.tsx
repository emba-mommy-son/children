import {Image, Text, View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FriendInfo} from '@/types/user';
import {useCreateFriend, useDeleteFriend} from '@/api/friend';

interface AddFriendResultProps {
  friendData: FriendInfo;
  setFriendData: (friendData: FriendInfo | null) => void;
  reset: () => void;
}

export const AddFriendResult = ({
  friendData,
  setFriendData,
  reset,
}: AddFriendResultProps) => {
  const nav = useNavigation();
  const {mutate: createFriend} = useCreateFriend();
  const {mutate: deleteFriend} = useDeleteFriend();

  const handleClear = () => {
    reset();
    setFriendData(null);
  };
  const handleFriendAction = () => {
    if (friendData.friend) {
      // 삭제 전 확인 Alert
      Alert.alert(
        '친구 삭제',
        `${friendData.name}님을 친구 목록에서 삭제하시겠습니까?`,
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '삭제',
            style: 'destructive',
            onPress: () => {
              deleteFriend(friendData.id, {
                onSuccess: () => {
                  nav.goBack();
                },
              });
            },
          },
        ],
      );
    }
    if (!friendData.friend) {
      createFriend(friendData.id, {
        onSuccess: () => {
          nav.goBack();
        },
      });
    }
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
          onPress={handleFriendAction}
          className={`text-body-text text-white font-bold rounded-xl px-10 py-2 ${
            friendData.friend ? 'bg-red' : 'bg-primary'
          }`}>
          {friendData.friend ? '삭제' : '추가'}
        </Text>
      </View>
    </View>
  );
};
