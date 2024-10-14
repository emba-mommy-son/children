// 리액트
import {Image, Text, TouchableOpacity, View} from 'react-native';

// 타입
import {Friend} from '@/types/friend';

// 컴포넌트

// 아이콘
import FriendImage from '@/assets/icons/friend/friendImage.png';

export const FriendItem: React.FC<{item: Friend}> = ({item}) => {
  return (
    <View>
      <TouchableOpacity>
        <View className="flex flex-row items-center py-5 border-b-2 border-gray-700 space-x-6">
          <Image source={FriendImage} className="w-16 h-16" />
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
