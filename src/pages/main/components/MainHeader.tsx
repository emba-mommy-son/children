// 리액트
import {Text, TouchableOpacity, View} from 'react-native';

// 라이브러리
import {AppNavigatorProp} from '@navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

// 아이콘
import EntypoIcons from 'react-native-vector-icons/Entypo';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';

interface MainHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const MainHeader = ({open, setOpen}: MainHeaderProps) => {
  const nav = useNavigation<AppNavigatorProp>();

  const onPress = () => {
    nav.navigate('Alarm');
  };

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <View className="flex flex-row justify-between items-center mt-5 mb-8">
      <TouchableOpacity onPress={handleOpen}>
        <View className="flex flex-row items-center space-x-3">
          <Text className="text-white text-subheading font-bold">김도영</Text>
          <EntypoIcons name="chevron-down" size={25} color="white" />
        </View>
      </TouchableOpacity>
      <IoniconsIcons
        name="notifications-outline"
        size={25}
        color="white"
        onPress={onPress}
      />
    </View>
  );
};
