// 리액트
import {Image, Text, View} from 'react-native';

// 타입
import {Friend} from '@/types/friend';

export const FriendItem: React.FC<{item: Friend}> = ({item}) => {
  return (
    <View className="bg-white flex flex-row items-center py-5 border-b-[1px] border-gray-200 space-x-6">
      <Image
        source={{uri: item.profileImage}}
        className="w-16 h-16 rounded-full"
      />
      <Text className="text-body-text text-black font-bold flex-1">
        {item.name}
      </Text>
    </View>
  );
};
