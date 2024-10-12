// 리액트
import {FlatList, SafeAreaView, Text, View} from 'react-native';

// 컴포넌트
import {ChattingItem} from '@pages/chatting/components/ChattingItem';

// import {useGetRooms} from '@api/chat/useGetRooms';

export interface ChattingList {
  id: number;
  name: string;
  content: string;
}

const chattingList: ChattingList[] = [
  {
    id: 1,
    name: '김민지',
    content: '안녕',
  },
  {id: 2, name: '임준희', content: '안녕'},
  {id: 3, name: '강창우', content: '안녕'},
  {id: 4, name: '박준엽', content: '안녕'},
  {id: 5, name: '민준수', content: '안녕'},
  {id: 6, name: '윤하연', content: '안녕'},
];

export const ChattingListPage = () => {
  const renderItem = ({item}: {item: ChattingList}) => (
    <ChattingItem item={item} />
  );

  // const {data} = useGetRooms();
  // console.log(data);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4">
        <Text className="text-white text-subheading font-semibold">채팅</Text>
      </View>
      <FlatList
        data={chattingList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        className="flex-1 px-8 pb-4"
      />
    </SafeAreaView>
  );
};
