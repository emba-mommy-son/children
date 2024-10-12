// 리액트
import {Image, Text, TouchableOpacity, View} from 'react-native';

// 라이브러리
import {AppNavigatorProp} from '@navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

// 아이콘
import Card from '@assets/icons/card.png';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const Reward = () => {
  const nav = useNavigation<AppNavigatorProp>();
  const handlePress = () => {
    nav.navigate('Reward');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="flex flex-col bg-yellow w-[120px] h-[180px] rounded-2xl p-5 mr-3">
        <View className="flex flex-row items-center mb-2">
          <Text className="text-white text-subheading font-semibold mb-1">
            리워드
          </Text>
          <AntDesignIcons name="right" color="white" size={20} />
        </View>
        <Text className="text-white text-body-text font-semibold">6,000</Text>
        <Image source={Card} className="w-[50px] h-[50px] ml-auto mt-auto" />
      </View>
    </TouchableOpacity>
  );
};
