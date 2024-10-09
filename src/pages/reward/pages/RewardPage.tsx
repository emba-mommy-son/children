// 리액트
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

// 라이브러리
import {useNavigation} from '@react-navigation/native';

// 아이콘
import Card from '@assets/icons/card.png';
import Icons from 'react-native-vector-icons/Entypo';

export const RewardPage: React.FC = () => {
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex-row items-center">
        <TouchableOpacity onPress={handleBackPress} className="mr-4">
          <Text className="text-white text-2xl">←</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">리워드</Text>
      </View>
      <View className="p-4 space-y-6">
        <View className="bg-primary w-full p-4 rounded-2xl flex flex-col justify-center items-center">
          <Text className="text-white text-subheading">내가 보유한 리워드</Text>
          <View className="flex flex-row items-center">
            <Image source={Card} className="w-[60px] h-[60px] rotate-90" />
            <Text className="text-white text-subheading">12,000</Text>
          </View>
        </View>
        <View
          className="bg-gray-500 p-2 text-subheading font-semibold flex flex-row justify-center items-center"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icons name="chevron-left" size={20} />
          <Text className="text-subheading">2024년 9월</Text>
          <Icons name="chevron-right" size={20} />
        </View>
      </View>
    </SafeAreaView>
  );
};
