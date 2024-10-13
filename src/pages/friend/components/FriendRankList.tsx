// 리액트
import {FlatList} from 'react-native';

// 라이브러리

// 타입
import {FriendRankResponse} from 'types/friend';

// 컴포넌트
import {useGetFriendRank} from '@api/friend/useGetFriendRank';
import {FriendRankItem} from '@pages/friend/components/FriendRankItem';
import React from 'react';

export const FriendRankList = () => {
  const {data: rankingList} = useGetFriendRank();

  const renderItem = ({
    item,
    index,
  }: {
    item: FriendRankResponse;
    index: number;
  }) => <FriendRankItem item={item} index={index} />;
  return (
    <FlatList
      data={rankingList}
      renderItem={renderItem}
      keyExtractor={item => item.userId.toString()}
      className="flex-1 px-4 pb-4"
    />
  );
};
