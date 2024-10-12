import {useGetFriend} from '@api/friend/useGetFriend';
import {FriendItem} from '@pages/friend/components/FriendItem';
import {FlatList} from 'react-native';
import {FriendResponse} from 'types/friend';

export const FriendList = () => {
  const {data: friendList} = useGetFriend();
  const renderItem = ({item}: {item: FriendResponse}) => (
    <FriendItem item={item} />
  );

  return (
    <FlatList
      data={friendList}
      renderItem={renderItem}
      keyExtractor={item => item.userId.toString()}
      className="flex-1 px-8 pb-4"
    />
  );
};
