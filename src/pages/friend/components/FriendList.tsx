import React, {useCallback, useMemo, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

// 타입
import {Friend} from '@/types/friend';

// 컴포넌트
import {useDeleteFriend, useGetFriends} from '@/api/friend';
import {FriendDetailModal} from '@/pages/friend/components/FriendDetailModal';
import {FriendItem} from '@/pages/friend/components/FriendItem';

// 아이콘
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

interface FriendListProps {
  searchQuery: string;
}

export const FriendList: React.FC<FriendListProps> = ({searchQuery}) => {
  const {data: friendList} = useGetFriends();
  const {mutate: deleteFriend} = useDeleteFriend();
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const filteredFriends = useMemo(() => {
    if (!friendList) return [];

    let result = [...friendList];

    // 이름순 정렬
    result.sort((a, b) => a.name.localeCompare(b.name, 'ko'));

    // 검색어가 있는 경우 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(friend =>
        friend.name.toLowerCase().includes(query),
      );
    }

    return result;
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
      <View className="flex-1 flex-row justify-end h-full">
        <TouchableOpacity
          className="bg-primary justify-center items-center w-20 h-full"
          onPress={() => handleDeleteFriend(data.item.userId, data.item.name)}>
          <FontAwesomeIcons name="trash" size={18} color="white" />
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
