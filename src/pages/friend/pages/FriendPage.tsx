// 리액트
import {Suspense} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

// 라이브러리

// 컴포넌트
import {ErrorComponent} from '@/components/common/ErrorComponent';
import {FriendList} from '@/pages/friend/components/FriendList';

// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const FriendPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex-row items-center justify-between">
        <Text className="text-white text-subheading font-semibold">친구</Text>
        <View className="flex flex-row space-x-3">
          <AntDesignIcons name="search1" color="white" size={25} />
          <AntDesignIcons name="adduser" color="white" size={25} />
        </View>
      </View>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<ActivityIndicator color="#9D4BFF" />}>
          <FriendList />
        </Suspense>
      </ErrorBoundary>
    </SafeAreaView>
  );
};
