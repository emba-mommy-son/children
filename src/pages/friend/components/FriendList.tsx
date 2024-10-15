import {FlatList} from 'react-native';
import {Friend} from '@/types/friend';
import {FriendItem} from '@/pages/friend/components/FriendItem';
import {useGetFriend} from '@/api/friend';

export const FriendList = () => {
  const {data: friendList} = useGetFriend();
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
