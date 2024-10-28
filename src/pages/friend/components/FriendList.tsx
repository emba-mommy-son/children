import React, {useState, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

// 타입
import {Friend} from '@/types/friend';

// 컴포넌트
import {FriendItem} from '@/pages/friend/components/FriendItem';
import {FriendDetailModal} from '@/pages/friend/components/FriendDetailModal';
import {useGetFriends, useDeleteFriend} from '@/api/friend';

interface FriendListProps {
  searchQuery: string;
}

export const FriendList: React.FC<FriendListProps> = ({searchQuery}) => {
  const {data: friendList} = useGetFriends();
  const {mutate: deleteFriend} = useDeleteFriend();
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return friendList;
    const query = searchQuery.toLowerCase().trim();
    return friendList?.filter(friend =>
      friend.name.toLowerCase().includes(query),
    );
  }, [friendList, searchQuery]);

  const handleDeleteFriend = useCallback(
    (userId: number, name: string) => {
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
    },
    [deleteFriend],
  );

  const renderItem = useCallback(
    ({item}: {item: Friend}) => (
      <FriendItem item={item} onPress={() => setSelectedFriend(item)} />
    ),
    [],
  );

  const renderHiddenItem = useCallback(
    (data: {item: Friend}) => (
      <View className="flex-1 flex-row justify-end">
        <TouchableOpacity
          className="bg-primary justify-center items-center w-20 h-full"
          onPress={() => handleDeleteFriend(data.item.userId, data.item.name)}>
          <Text className="text-white">삭제</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleDeleteFriend],
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View className="flex-1 justify-center items-center py-8">
        <Text>
          {searchQuery ? '검색 결과가 없습니다.' : '친구 목록이 비어있습니다.'}
        </Text>
      </View>
    ),
    [searchQuery],
  );

  return (
    <>
      <SwipeListView
        data={filteredFriends}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        ListEmptyComponent={renderEmptyComponent}
        rightOpenValue={-75}
        disableRightSwipe
        closeOnRowPress={true}
        closeOnRowBeginSwipe={true}
        keyExtractor={item => item.userId.toString()}
        contentContainerStyle={{paddingHorizontal: 32, paddingBottom: 16}}
      />
      {selectedFriend && (
        <FriendDetailModal
          visible={!!selectedFriend}
          onClose={() => setSelectedFriend(null)}
          userId={selectedFriend.userId}
        />
      )}
    </>
  );
};
