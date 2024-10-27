// 리액트
import {Suspense} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import {AlarmList} from '@/pages/alarm/components/AlarmList';
import {AlarmListSkeleton} from '@/pages/alarm/components/AlarmListSkeleton';
import {ErrorComponent} from '@/components/common/ErrorComponent';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const AlarmPage: React.FC = () => {
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row items-center space-x-3 bg-secondary p-4">
        <AntDesignIcons
          name="arrowleft"
          color="white"
          size={25}
          onPress={handleBackPress}
        />
        <Text className="text-white text-subheading mb-1">알림</Text>
      </View>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<AlarmListSkeleton />}>
          <AlarmList />
        </Suspense>
      </ErrorBoundary>
    </SafeAreaView>
  );
};
