// 리액트
import {Image, Text, View} from 'react-native';

// 타입
import {FriendRank} from '@/types/friend';

// 아이콘
import First from '@/assets/icons/friend/first.png';
import Second from '@/assets/icons/friend/second.png';
import Third from '@/assets/icons/friend/third.png';

export const FriendRankItem: React.FC<{
  item: FriendRank;
  index: number;
}> = ({item, index}) => {
  const rankImage =
    index === 0 ? First : index === 1 ? Second : index === 2 ? Third : index;

  return (
    <View
      className={`flex flex-row items-center justify-between py-3 px-4 mb-1 ${
        index < 3 && 'bg-primary/20'
      }`}>
      <View className="flex flex-row items-center justify-between space-x-5">
        {index < 3 ? (
          <Image source={rankImage} className="w-12 h-12" />
        ) : (
          <Text className="text-[14px] w-12 text-center font-bold">
            {index + 1}
          </Text>
        )}
        <Image
          source={{uri: item.profileImage}}
          className="h-12 w-12 rounded-full"
        />
        <Text className="text-[14px] text-black font-bold w-20 text-center">
          {item.name}
        </Text>
      </View>
      <Text className="text-[14px] font-bold w-12 text-center">
        {item.score}
      </Text>
    </View>
  );
};
