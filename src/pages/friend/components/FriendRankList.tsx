// 리액트
import {FlatList, Text, View} from 'react-native';

// 라이브러리

// 타입
import {FriendRank} from '@/types/friend';

// 컴포넌트
import {FriendRankItem} from '@/pages/friend/components/FriendRankItem';
import {useGetFriendRank} from '@/api/friend';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const EmptyListCompnent = () => (
  <View className="flex-1 items-center justify-center gap-5">
    <FontAwesome5Icon name="user-friends" size={40} />
    <Text className="text-body-text">등록된 친구가 없습니다.</Text>
  </View>
);

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
      ListEmptyComponent={EmptyListCompnent}
    />
  );
};
