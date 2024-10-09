// 리액트
import {Image, Text, View} from 'react-native';

// 타입
import {RankingList} from '@pages/friend/pages/FriendRankingPage';

// 아이콘
import First from '@assets/icons/friend/first.png';
import Friend from '@assets/icons/friend/friendImage.png';
import Second from '@assets/icons/friend/second.png';
import Third from '@assets/icons/friend/third.png';

export const FrinedRankItem: React.FC<{item: RankingList}> = ({item}) => {
  const rank =
    item.rank === 1
      ? First
      : item.rank === 2
      ? Second
      : item.rank === 3
      ? Third
      : item.rank;
  return (
    <View
      className={`flex flex-row items-center justify-between py-3 px-4 mb-1 ${
        item.rank < 4 && 'bg-primary/20'
      }`}>
      <View className="flex flex-row items-center justify-between space-x-5">
        {item.rank < 4 ? (
          <Image source={rank} className="w-12 h-12" />
        ) : (
          <Text className="text-subheading w-12 text-center font-bold">
            {item.rank}
          </Text>
        )}
        <Image source={Friend} className="h-16 w-16" />
        <Text className="text-subheading text-black font-bold">
          {item.name}
        </Text>
      </View>
      <Text className="text-subheading font-bold w-12 text-center">
        {item.score}
      </Text>
    </View>
  );
};
