import alarm from 'assets/icons/alarm.png';
import {BestFriend} from 'pages/main/components/BestFriend';
import {Emotion} from 'pages/main/components/Emotion';
import {Question} from 'pages/main/components/Question';
import {Reward} from 'pages/main/components/Reward';
import {Sleep} from 'pages/main/components/Sleep';
import {Image, Text, View} from 'react-native';

export const MainPage = () => {
  return (
    <View className="h-screen relative bg-secondary px-5">
      <View className="flex flex-row justify-between items-center mt-5 mb-8">
        <Text className="text-white text-SubHeading font-bold">김도영</Text>
        <Image source={alarm} className="w-[20px] h-[20px]" />
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
  );
};
