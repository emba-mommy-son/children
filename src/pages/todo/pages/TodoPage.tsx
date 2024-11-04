// 리액트
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

// 라이브러리
import {useNavigation} from '@react-navigation/native';

// 컴포넌트
import {TodoBox} from '@/pages/todo/components/TodoBox';

// 커스텀 훅
import {useUserStore} from '@/store/useUserStore';

// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const TodoPage = () => {
  const userName = useUserStore(state => state.userInfo?.username);
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white space-y-3">
      <ScrollView>
        <View className="flex flex-row items-center space-x-3 bg-secondary p-4">
          <AntDesignIcons
            name="arrowleft"
            color="white"
            size={20}
            onPress={handleBackPress}
          />
          <Text className="text-white text-[16px]">{userName}의 목표</Text>
        </View>
        <View className="w-full p-4">
          <TodoBox />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
