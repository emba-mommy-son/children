// 리액트
import {Suspense} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

// 라이브러리
import {useNavigation} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';

// 타입
import {AppNavigatorProp} from '@/navigation/AppNavigator';

// 컴포넌트
import {ErrorComponent} from '@/components/common/ErrorComponent';
import {FriendList} from '@/pages/friend/components/FriendList';
import {FriendListSkeleton} from '@/pages/friend/components/FriendListSkeleton';

// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
export const FriendPage = () => {
  const nav = useNavigation<AppNavigatorProp>();

  const handleGoToAddFriend = () => {
    nav.navigate('AddFriend');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex-row items-center justify-between">
        <Text className="text-white text-subheading font-semibold">친구</Text>
        <View className="flex flex-row space-x-3">
          {/* 이미 등록된 친구 검색 */}
          <AntDesignIcons name="search1" color="white" size={25} />
          {/* 새로운 친구 검색 */}
          <TouchableOpacity onPress={handleGoToAddFriend}>
            <AntDesignIcons name="adduser" color="white" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<FriendListSkeleton />}>
          <FriendList />
        </Suspense>
      </ErrorBoundary>
    </SafeAreaView>
  );
};
