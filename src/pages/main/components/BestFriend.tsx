// 리액트
import {Image, Text, TouchableOpacity, View} from 'react-native';

// 라이브러리
import {AppNavigatorProp} from '@/navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

// 아이콘
import Friend from '@/assets/icons/friend.png';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const BestFriend = () => {
  const nav = useNavigation<AppNavigatorProp>();
  const handlePress = () => {
    nav.navigate('FriendRanking');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex flex-col bg-primary w-3/5 h-[150px] rounded-2xl p-5 mr-3">
      <View className="flex flex-row items-center mb-2">
        <Text className="text-white text-[16px] font-semibold">단짝친구</Text>
        <AntDesignIcons name="right" color="white" size={16} />
      </View>
      <Text className="text-white text-[14px] font-semibold">민준수</Text>
      <Image source={Friend} className="w-[40px] h-[40px] ml-auto mt-auto" />
    </TouchableOpacity>
  );
};
