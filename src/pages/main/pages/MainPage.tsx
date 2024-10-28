// 리액트
import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';

// 컴포넌트
import {Attendance} from '@/pages/main/components/Attendance';
import {BestFriend} from '@/pages/main/components/BestFriend';
import {Emotion} from '@/pages/main/components/Emotion';
import {GetUserInfo} from '@/pages/main/components/GetUserInfo';
import {MainHeader} from '@/pages/main/components/MainHeader';
import {MainProfile} from '@/pages/main/components/MainProfile';
import {QRCodeModal} from '@/pages/main/components/QRCodeModal';
import {Question} from '@/pages/main/components/Question';
import {Reward} from '@/pages/main/components/Reward';
import {Sleep} from '@/pages/main/components/Sleep';

export const MainPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [qrOpen, setQrOpen] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <View className="h-screen relative bg-secondary px-5">
        <MainHeader open={open} setOpen={setOpen} />
        <GetUserInfo />
        {open && <MainProfile setQrOpen={setQrOpen} setOpen={setOpen} />}
        <View className="flex flex-col items-center space-y-3 z-0 w-full">
          <View className='w-full'>
            <Attendance />
          </View>
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
        {qrOpen && <QRCodeModal qrOpen={qrOpen} setQrOpen={setQrOpen} />}
      </View>
    </SafeAreaView>
  );
};
