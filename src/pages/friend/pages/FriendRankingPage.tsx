// 리액트
import {FlatList, SafeAreaView, Text, View} from 'react-native';

// 라이브러리
import {useNavigation} from '@react-navigation/native';

// 컴포넌트
import {FrinedRankItem} from '@pages/friend/components/FriendRankItem';

// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export interface RankingList {
  id: number;
  rank: number;
  name: string;
  score: number;
}

const rankingList: RankingList[] = [
  {
    id: 1,
    rank: 1,
    name: '김민지',
    score: 100,
  },
  {
    id: 2,
    rank: 2,
    name: '강창우',
    score: 95,
  },
  {
    id: 3,
    rank: 3,
    name: '임준희',
    score: 90,
  },
  {
    id: 4,
    rank: 4,
    name: '윤하연',
    score: 85,
  },
  {
    id: 5,
    rank: 5,
    name: '민준수',
    score: 80,
  },
  {
    id: 6,
    rank: 6,
    name: '박준엽',
    score: 75,
  },
  {
    id: 7,
    rank: 7,
    name: '양준영',
    score: 70,
  },
  {
    id: 8,
    rank: 8,
    name: '이인준',
    score: 65,
  },
  {
    id: 9,
    rank: 9,
    name: '황성민',
    score: 60,
  },
  {
    id: 10,
    rank: 10,
    name: '이명욱',
    score: 55,
  },
];

export const FriendRankingPage = () => {
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };

  const renderItem = ({item}: {item: RankingList}) => (
    <FrinedRankItem item={item} />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex flex-row items-center space-x-2">
        <AntDesignIcons
          name="arrowleft"
          color="white"
          size={30}
          onPress={handleBackPress}
        />
        <Text className="text-white text-subheading font-semibold">
          단짝 친구
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between px-4 py-3">
        <View className="flex flex-row items-center justify-between space-x-28 pl-5">
          <Text className="text-subheading font-bold">순위</Text>
          <Text className="text-subheading font-bold">친구</Text>
        </View>
        <Text className="text-subheading font-bold">우정 지수</Text>
      </View>
      <FlatList
        data={rankingList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        className="flex-1 px-4 pb-4"
      />
    </SafeAreaView>
  );
};
