import {SafeAreaView, Text, View} from 'react-native';
import React, {Suspense} from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {ChattingList} from '@/pages/chatting/components/ChattingList';
import {ChattingListSkeleton} from '@/pages/chatting/components/ChattingListSkeleton';
import {ErrorComponent} from '@/components/common/ErrorComponent';
export const ChattingListPage: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4">
        <Text className="text-white text-[16px] font-semibold">채팅</Text>
      </View>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<ChattingListSkeleton />}>
          <ChattingList />
        </Suspense>
      </ErrorBoundary>
    </SafeAreaView>
  );
};
