// 리액트
import {Suspense, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

// 라이브러리

// 컴포넌트
import {useGetEmotion} from '@/api/user/useGetEmotion';
import {ErrorComponent} from '@/components/common/ErrorComponent';
import {AttendanceModal} from '@/pages/main/components/AttendanceModal';
import {BestFriend} from '@/pages/main/components/BestFriend';
import {Emotion} from '@/pages/main/components/Emotion';
import {GetUserInfo} from '@/pages/main/components/GetUserInfo';
import {MainHeader} from '@/pages/main/components/MainHeader';
import {MainProfile} from '@/pages/main/components/MainProfile';
import {QRCodeModal} from '@/pages/main/components/QRCodeModal';
import {Question} from '@/pages/main/components/Question';
import {Reward} from '@/pages/main/components/Reward';
import {Sleep} from '@/pages/main/components/Sleep';
import {TodoList} from '@/pages/main/components/TodoList';
import ErrorBoundary from 'react-native-error-boundary';

export const MainPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  const {data: emotionData} = useGetEmotion();

  console.log('emotion', emotionData);

  // * TODO : 출석 모달 zustand 사용해서 관리
  const [attendanceOpen, setAttendanceOpen] = useState<boolean>(true);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="h-screen relative bg-secondary px-5">
          <MainHeader open={open} setOpen={setOpen} />
          <GetUserInfo />
          {open && <MainProfile setQrOpen={setQrOpen} setOpen={setOpen} />}
          <View className="flex flex-col items-center space-y-3 px-4 z-0 w-full">
            <TodoList />
            <View className="flex flex-row">
              <ErrorBoundary FallbackComponent={ErrorComponent}>
                <Suspense
                  fallback={
                    <View className="bg-primary w-3/5 h-[150px] rounded-2xl"></View>
                  }>
                  <BestFriend />
                </Suspense>
              </ErrorBoundary>
              <Sleep />
            </View>
            <View className="flex flex-row">
              <Reward />
              <Emotion status={emotionData} />
            </View>
            {!emotionData && <Question />}
          </View>
          {qrOpen && <QRCodeModal qrOpen={qrOpen} setQrOpen={setQrOpen} />}
          {attendanceOpen && (
            <AttendanceModal
              attendanceOpen={attendanceOpen}
              setAttendanceOpen={setAttendanceOpen}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
