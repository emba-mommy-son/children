// 리액트
import {FlatList} from 'react-native';

// 타입
import {Friend} from '@/types/friend';

// 컴포넌트
import {FriendItem} from '@/pages/friend/components/FriendItem';
import {useGetFriends} from '@/api/friend';

export const FriendList = () => {
  const {data: friendList} = useGetFriends();
  const renderItem = ({item}: {item: Friend}) => <FriendItem item={item} />;

  return (
    <FlatList
      data={friendList}
      renderItem={renderItem}
      keyExtractor={item => item.userId.toString()}
      className="flex-1 px-8 pb-4"
    />
  );
};
