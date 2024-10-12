// 리액트
import {SafeAreaView, View} from 'react-native';

// 컴포넌트
import {BestFriend} from '@pages/main/components/BestFriend';
import {Emotion} from '@pages/main/components/Emotion';
import {MainHeader} from '@pages/main/components/MainHeader';
import {MainProfile} from '@pages/main/components/MainProfile';
import {Question} from '@pages/main/components/Question';
import {Reward} from '@pages/main/components/Reward';
import {Sleep} from '@pages/main/components/Sleep';
import {useState} from 'react';

export const MainPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <View className="h-screen relative bg-secondary px-5">
        <MainHeader open={open} setOpen={setOpen} />
        {open && <MainProfile />}
        <View className="flex flex-col items-center space-y-3 z-0">
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
