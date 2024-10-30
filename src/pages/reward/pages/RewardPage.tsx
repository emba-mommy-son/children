// 리액트
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Suspense} from 'react';

// 라이브러리
import {useNavigation} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
// 컴포넌트
import {RewardContentSkeleton} from '@/pages/reward/components/RewardContentSkeleton';
import {ErrorComponent} from '@/components/common/ErrorComponent';
import {RewardContent} from '@/pages/reward/components/RewardContent';
// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const RewardPage: React.FC = () => {
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex-row items-center">
        <TouchableOpacity onPress={handleBackPress} className="mr-4">
          <AntDesignIcons name="arrowleft" color="white" size={20} />
        </TouchableOpacity>
        <Text className="text-white text-[14px] font-semibold">
          리워드
        </Text>
      </View>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<RewardContentSkeleton />}>
          <RewardContent />
        </Suspense>
      </ErrorBoundary>
    </SafeAreaView>
  );
};
