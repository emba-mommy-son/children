// 리액트
import {SafeAreaView, Text, View} from 'react-native';

// 라이브러리
import {useNavigation} from '@react-navigation/native';

// 컴포넌트
import {FriendRankList} from '@/pages/friend/components/FriendRankList';

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
          size={25}
          onPress={handleBackPress}
        />
        <Text className="text-white text-subheading font-semibold">
          단짝 친구
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between px-4 py-3">
        <View className="flex flex-row items-center justify-between space-x-40 pl-5">
          <Text className="text-subheading font-bold">순위</Text>
          <Text className="text-subheading font-bold">친구</Text>
        </View>
        <Text className="text-subheading font-bold">우정 지수</Text>
      </View>
      {/* <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<ActivityIndicator color="#9D4BFF" />}> */}
      <FriendRankList />
      {/* </Suspense>
      </ErrorBoundary> */}
    </SafeAreaView>
  );
};
