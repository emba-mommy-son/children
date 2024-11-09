// 리액트
import {Suspense, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

// 라이브러리
import ErrorBoundary from 'react-native-error-boundary';

// 컴포넌트
import {ErrorComponent} from '@/components/common/ErrorComponent';
import {BestFriend} from '@/pages/main/components/BestFriend';
import {Emotion} from '@/pages/main/components/Emotion';
import {MainHeader} from '@/pages/main/components/MainHeader';
import {MainProfile} from '@/pages/main/components/MainProfile';
import {QRCodeModal} from '@/pages/main/components/QRCodeModal';
import {Question} from '@/pages/main/components/Question';
import {Reward} from '@/pages/main/components/Reward';
import {Sleep} from '@/pages/main/components/Sleep';
import {TodoList} from '@/pages/main/components/TodoList';

// 커스텀 훅
import {useGetAttendance, usePostAttendance} from '@/api/attendance';
import {useGetEmotion} from '@/api/user/useGetEmotion';
import useUser from '@/hooks/useUser';

export const MainPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  const {data: emotionData} = useGetEmotion();
  const [emotion, setEmotion] = useState<string>('');
  const {user, refetch} = useUser();

  const {data: attendanceData} = useGetAttendance();
  const {mutate: postAttendance} = usePostAttendance();

  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (attendanceData === undefined) return;

    console.log(attendanceData, todayDate);

    if (attendanceData.includes(todayDate)) {
      console.log('출석 완료');
      return;
    }

    postAttendance(null);
  }, [attendanceData]);

  useEffect(() => {
    if (emotionData) {
      setEmotion(emotionData);
    }
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="h-screen relative bg-secondary px-5">
          <MainHeader open={open} setOpen={setOpen} />
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
              <Emotion emotion={emotion} />
            </View>
            {!emotion && <Question setEmotion={setEmotion} />}
          </View>
          {qrOpen && <QRCodeModal qrOpen={qrOpen} setQrOpen={setQrOpen} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
