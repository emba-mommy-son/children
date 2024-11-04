import Todo from '@/assets/icons/todo.png';
import {AppNavigatorProp} from '@/navigation/AppNavigator';
import {useUserStore} from '@/store/useUserStore';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export const TodoList = () => {
  const userName = useUserStore(state => state.userInfo?.username);
  const nav = useNavigation<AppNavigatorProp>();
  const handlePress = () => {
    nav.navigate('Todo');
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="w-full h-16 bg-[#79C0E1] rounded-xl flex flex-row items-center justify-between px-4">
        <View className="flex flex-row items-center">
          <Text className="text-white text-base mr-2">{userName}의 목표</Text>
          <AntDesignIcons name="right" color="white" size={18} />
        </View>
        <Image source={Todo} className="w-[40px] h-[40px]" />
      </View>
    </TouchableOpacity>
  );
};
