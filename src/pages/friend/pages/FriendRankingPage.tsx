// 리액트
import {SafeAreaView, Text, View} from 'react-native';
import {Suspense} from 'react';

// 라이브러리
import {useNavigation} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
// 컴포넌트
import {FriendRankList} from '@/pages/friend/components/FriendRankList';
import {ErrorComponent} from '@/components/common/ErrorComponent';
import {FriendRankListSkeleton} from '@/pages/friend/components/FriendRankListSkeleton';
// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const FriendRankingPage = () => {
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex flex-row items-center space-x-2">
        <AntDesignIcons
          name="arrowleft"
          color="white"
          size={20}
          onPress={handleBackPress}
        />
        <Text className="text-white text-[16px] font-semibold">
          단짝 친구
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between px-6 py-3">
        <View className="flex flex-row items-center justify-between space-x-32 pl-4">
          <Text className="text-[14px] font-bold">순위</Text>
          <Text className="text-[14px] font-bold">친구</Text>
        </View>
        <Text className="text-[14px] font-bold">우정 지수</Text>
      </View>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<FriendRankListSkeleton />}>
          <FriendRankList />
        </Suspense>
      </ErrorBoundary>
    </SafeAreaView>
  );
};
