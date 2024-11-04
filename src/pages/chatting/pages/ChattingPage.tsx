import {SafeAreaView, View} from 'react-native';
import {Suspense} from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {ChattingScreenProps} from '@/types/navigation';
import {ChattingRoom} from '@/pages/chatting/components/ChattingRoom';
import {ChattingRoomSkeleton} from '@/pages/chatting/components/ChattingRoomSkeleton';
import {ErrorComponent} from '@/components/common/ErrorComponent';

export const ChattingPage: React.FC<ChattingScreenProps> = ({route}) => {
  const {roomId} = route.params;

  return (
    <SafeAreaView>
      <View className="flex flex-col h-full">
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <Suspense fallback={<ChattingRoomSkeleton />}>
            <ChattingRoom roomId={roomId} />
          </Suspense>
        </ErrorBoundary>
      </View>
    </SafeAreaView>
  );
};
