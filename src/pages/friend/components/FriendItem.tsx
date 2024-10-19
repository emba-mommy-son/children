// 리액트
import {Image, Text, TouchableOpacity, View} from 'react-native';

// 타입
import {Friend} from '@/types/friend';

export const FriendItem: React.FC<{item: Friend}> = ({item}) => {
  return (
    <View>
      <TouchableOpacity>
        <View className="flex flex-row items-center py-5 border-b-2 border-gray-700 space-x-6">
          <Image
            source={{uri: item.profileImage}}
            className="w-16 h-16 rounded-full"
          />
          <Text className="text-body-text text-black font-bold">
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View>
          <Text>이거지</Text>
        </View>
      </BottomSheetModal> */}
    </View>
  );
};
