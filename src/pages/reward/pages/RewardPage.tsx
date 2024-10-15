// 리액트
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

// 라이브러리
import {useNavigation} from '@react-navigation/native';

// 컴포넌트
import {MyReward} from '@/pages/reward/components/MyReward';

// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';

export const RewardPage: React.FC = () => {
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex-row items-center">
        <TouchableOpacity onPress={handleBackPress} className="mr-4">
          <AntDesignIcons name="arrowleft" color="white" size={25} />
        </TouchableOpacity>
        <Text className="text-white text-subheading font-semibold mb-1">
          리워드
        </Text>
      </View>
      <View className="p-4 space-y-6">
        <MyReward />
        <View
          className="bg-gray-500 p-2 flex flex-row justify-center items-center"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <EntypoIcons name="chevron-left" size={20} />
          <Text className="text-subheading font-semibold">2024년 9월</Text>
          <EntypoIcons name="chevron-right" size={20} />
        </View>
      </View>
    </SafeAreaView>
  );
};
