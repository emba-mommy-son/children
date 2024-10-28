// 리액트
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
// 타입
import {Room} from '@/types/chat';
// 컴포넌트
import {AppNavigatorProp} from '@/navigation/AppNavigator';
// 훅
import {formatDate} from '@/utils/formatDate';
// 아이콘
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

export const ChattingItem: React.FC<{item: Room}> = ({item}) => {
  const nav = useNavigation<AppNavigatorProp>();

  const handleGoChatting = () => {
    nav.navigate('Chatting', {roomId: item.roomId});
  };

  return (
    <TouchableOpacity onPress={handleGoChatting}>
      <View className="flex flex-row items-center py-4 border-b-[1px] border-gray-700 space-x-4">
        <Image
          source={{uri: item.profileImage}}
          className="w-12 h-12 rounded-full"
        />
        <View className="space-y-2 flex-1">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-[14px] text-black font-bold">
              {item.name}
            </Text>
            {!item.read && <FontAwesomeIcons name="circle" color="#9D4BFF" />}
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text>{item.message}</Text>
            <Text className='text-[10px]'>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
