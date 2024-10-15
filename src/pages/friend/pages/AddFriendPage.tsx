import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const AddFriendPage = () => {
  const [inputText, setInputText] = useState<string>('');
  const nav = useNavigation();
  const goBack = () => {
    nav.goBack();
  };

  const onChangeNumber = (text: string) => {
    setInputText(text);
  };

  return (
    <SafeAreaView>
      <View className="bg-secondary p-4 flex-row items-center space-x-3">
        <TouchableOpacity onPress={goBack}>
          <AntDesignIcons name="arrowleft" color="white" size={25} />
        </TouchableOpacity>
        <Text className="text-white text-subheading font-semibold mb-1">
          친구 추가
        </Text>
      </View>
      <View className="w-full p-5">
        <TextInput
          onChangeText={onChangeNumber}
          value={inputText}
          placeholder="친구의 전화번호를 입력하세요."
          className="border-b-[1px] border-x-secondary"
        />
      </View>
    </SafeAreaView>
  );
};
