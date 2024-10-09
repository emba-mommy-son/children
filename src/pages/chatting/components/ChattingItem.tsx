// 리액트
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';

// 컴포넌트
import {AppNavigatorProp} from '@navigation/AppNavigator';
import {ChattingList} from '@pages/chatting/pages/ChattingListPage';

// 아이콘
import Friend from '@assets/icons/friend/friendImage.png';
import Icons from 'react-native-vector-icons/FontAwesome';

export const ChattingItem: React.FC<{item: ChattingList}> = ({item}) => {
  const nav = useNavigation<AppNavigatorProp>();

  const handleGoChatting = () => {
    // nav.navigate('Chatting', {id: item.id});
    nav.navigate('Chatting');
  };

  return (
    <TouchableOpacity onPress={handleGoChatting}>
      <View className="flex flex-row items-center py-5 border-b-2 border-gray-700 space-x-6">
        <Image source={Friend} className="w-16 h-16" />
        <View className="space-y-2 flex-1">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-body-text text-black font-bold">
              {item.name}
            </Text>
            <Icons name="circle" color="#9D4BFF" />
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text>{item.content}</Text>
            <Text>9:44</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
