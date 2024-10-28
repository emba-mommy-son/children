// 리액트
import {Suspense, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

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
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoToAddFriend = () => {
    nav.navigate('AddFriend');
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchQuery('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 space-y-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-subheading font-semibold">친구</Text>
          <View className="flex flex-row space-x-3">
            <TouchableOpacity onPress={toggleSearch}>
              <AntDesignIcons
                name={isSearchVisible ? 'close' : 'search1'}
                color="white"
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoToAddFriend}>
              <AntDesignIcons name="adduser" color="white" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        {isSearchVisible && (
          <View className="bg-white rounded-lg flex-row items-center px-3">
            <AntDesignIcons name="search1" color="gray" size={20} />
            <TextInput
              className="flex-1 ml-2 text-black"
              placeholder="친구 검색"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        )}
      </View>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<FriendListSkeleton />}>
          <FriendList searchQuery={searchQuery} />
        </Suspense>
      </ErrorBoundary>
    </SafeAreaView>
  );
};
