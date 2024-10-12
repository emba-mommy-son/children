// 리액트
import {FlatList, SafeAreaView, Text, View} from 'react-native';

// 컴포넌트
import {FriendItem} from '@pages/friend/components/FriendItem';

// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export interface FriendList {
  id: number;
  name: string;
}

const friendList: FriendList[] = [
  {
    id: 1,
    name: '김민지',
  },
  {id: 2, name: '임준희'},
  {id: 3, name: '강창우'},
  {id: 4, name: '박준엽'},
  {id: 5, name: '민준수'},
  {id: 6, name: '윤하연'},
];

export const FriendPage = () => {
  const renderItem = ({item}: {item: FriendList}) => <FriendItem item={item} />;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex-row items-center justify-between">
        <Text className="text-white text-subheading font-semibold">친구</Text>
        <View className="flex flex-row space-x-3">
          <AntDesignIcons name="search1" color="white" size={25} />
          <AntDesignIcons name="adduser" color="white" size={25} />
        </View>
      </View>
      <FlatList
        data={friendList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        className="flex-1 px-8 pb-4"
      />
    </SafeAreaView>
  );
};
