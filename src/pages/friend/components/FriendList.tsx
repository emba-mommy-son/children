// 리액트
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

// 타입
import {Friend} from '@/types/friend';

// 컴포넌트
import {FriendItem} from '@/pages/friend/components/FriendItem';
import {useGetFriends, useDeleteFriend} from '@/api/friend';

export const FriendList = () => {
  const {data: friendList} = useGetFriends();
  const {mutate: deleteFriend} = useDeleteFriend();

  const handleDeleteFriend = (userId: number, name: string) => {
    Alert.alert('친구 삭제', `${name}님을 친구 목록에서 삭제하시겠습니까?`, [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => {
          deleteFriend(userId);
        },
      },
    ]);
  };

  const renderItem = ({item}: {item: Friend}) => <FriendItem item={item} />;

  const renderHiddenItem = (data: {item: Friend}) => (
    <View className="flex-1 flex-row justify-end">
      <TouchableOpacity
        className="bg-primary justify-center items-center w-20 h-full"
        onPress={() => handleDeleteFriend(data.item.userId, data.item.name)}>
        <Text className="text-white">삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={friendList}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-75}
      disableRightSwipe
      keyExtractor={item => item.userId.toString()}
      contentContainerStyle={{paddingHorizontal: 32, paddingBottom: 16}}
    />
  );
};
