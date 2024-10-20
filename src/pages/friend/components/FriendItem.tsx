import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {Friend} from '@/types/friend';

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
      <View className="bg-white flex flex-row items-center py-5 border-b-[1px] border-gray-200 space-x-6">
        <Image
          source={{uri: item.profileImage}}
          className="w-16 h-16 rounded-full"
        />
        <Text className="text-body-text text-black font-bold flex-1">
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
