// 리액트
import {SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';

// 라이브러리
import {useNavigation} from '@react-navigation/native';

// 아이콘
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FeatherIcons from 'react-native-vector-icons/Feather';

export const ChattingPage: React.FC = () => {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col h-full">
        <View className="flex flex-row items-center space-x-3 bg-secondary p-4">
          <AntDesignIcons
            name="arrowleft"
            color="white"
            size={30}
            onPress={goBack}
          />
          <Text className="text-white text-subheading">김도영</Text>
        </View>
        <ScrollView className="flex flex-col my-5 p-4"></ScrollView>
        <View className="flex flex-row items-center p-4 pt-2 space-x-3">
          <TextInput
            className="bg-gray-700 flex-1 rounded-3xl text-body-text pl-5"
            placeholder="메시지를 입력하세요."
            placeholderTextColor="#B7B7B7"
            style={{
              shadowColor: 'black', // 그림자 색상
              shadowOffset: {width: 0, height: 1}, // 그림자 크기 (x, y)
              shadowOpacity: 0.25, // 그림자 불투명도
              shadowRadius: 3.84, // 그림자 흐림 정도
              elevation: 2, // Android에서의 그림자 효과
            }}
          />
          <FeatherIcons name="send" size={30} />
        </View>
      </View>
    </SafeAreaView>
  );
};
