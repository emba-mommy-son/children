// 리액트
import {FlatList} from 'react-native';

// 라이브러리

// 타입
import {FriendRank} from '@/types/friend';

// 컴포넌트
import {FriendRankItem} from '@/pages/friend/components/FriendRankItem';
import {useGetFriendRank} from '@/api/friend';

export const FriendRankList = () => {
  const {data: rankingList} = useGetFriendRank();

  const renderItem = ({item, index}: {item: FriendRank; index: number}) => (
    <FriendRankItem item={item} index={index} />
  );
  return (
    <FlatList
      data={rankingList}
      renderItem={renderItem}
      keyExtractor={item => item.userId.toString()}
      className="flex-1 px-4 pb-4"
    />
  );
};
