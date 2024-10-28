import {Friend} from '@/types/friend';
import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface FriendItemProps {
  item: Friend;
  onPress: () => void;
}

export const FriendItem: React.FC<FriendItemProps> = ({item, onPress}) => {
  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <View className="bg-white flex flex-row items-center py-4 border-b-[1px] border-gray-700 space-x-6">
        <Image
          source={{uri: item.profileImage}}
          className="w-12 h-12 rounded-full"
        />
        <Text className="text-[14px] text-black font-bold flex-1">
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
