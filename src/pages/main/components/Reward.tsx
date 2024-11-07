// 리액트
import {Image, Text, TouchableOpacity, View} from 'react-native';

// 라이브러리
import {AppNavigatorProp} from '@/navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

// 아이콘
import Card from '@/assets/icons/card.png';
import {useUserStore} from '@/store/useUserStore';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const Reward = () => {
  const reward = useUserStore(state => state.userInfo?.reward);
  const nav = useNavigation<AppNavigatorProp>();
  const handlePress = () => {
    nav.navigate('Reward');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex flex-col bg-yellow w-2/5 h-[150px] rounded-2xl p-5 mr-3">
      <View className="flex flex-row items-center mb-2">
        <Text className="text-white text-[16px] font-semibold">리워드</Text>
        <AntDesignIcons name="right" color="white" size={16} />
      </View>
      <Text className="text-white text-[14px] font-semibold">
        {reward?.toLocaleString()}
      </Text>
      <Image source={Card} className="w-[40px] h-[40px] ml-auto mt-auto" />
    </TouchableOpacity>
  );
};
