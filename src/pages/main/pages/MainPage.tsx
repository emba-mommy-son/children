// 리액트
import {SafeAreaView, Text, View} from 'react-native';

// 컴포넌트
import {BestFriend} from '@pages/main/components/BestFriend';
import {Emotion} from '@pages/main/components/Emotion';
import {Question} from '@pages/main/components/Question';
import {Reward} from '@pages/main/components/Reward';
import {Sleep} from '@pages/main/components/Sleep';

// 아이콘
import Icons from 'react-native-vector-icons/Ionicons';

export const MainPage = ({navigation}: any) => {
  const onPress = () => {
    navigation.navigate('Alarm');
  };

  return (
    <SafeAreaView>
      <View className="h-screen relative bg-secondary px-5">
        <View className="flex flex-row justify-between items-center mt-5 mb-8">
          <Text className="text-white text-subheading font-bold">김도영</Text>
          <Icons
            name="notifications-outline"
            size={25}
            color="white"
            onPress={onPress}
          />
        </View>
        <View className="flex flex-col items-center space-y-3">
          <View className="flex flex-row space-x-3">
            <BestFriend />
            <Sleep />
          </View>
          <View className="flex flex-row space-x-3">
            <Reward />
            <Emotion />
          </View>
          <Question />
        </View>
      </View>
    </SafeAreaView>
  );
};
