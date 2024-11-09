// 리액트
import {Suspense, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

// 라이브러리
import ErrorBoundary from 'react-native-error-boundary';

// 컴포넌트
import {ErrorComponent} from '@/components/common/ErrorComponent';
import {AttendanceModal} from '@/pages/main/components/AttendanceModal';
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
import {useGetEmotion} from '@/api/user/useGetEmotion';
import useUser from '@/hooks/useUser';

export const MainPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  const {data: emotionData} = useGetEmotion();
  const [emotion, setEmotion] = useState<string>('');
  const {user, refetch} = useUser();

  const [attendanceOpen, setAttendanceOpen] = useState<boolean>(true);

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
