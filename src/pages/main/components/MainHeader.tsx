// 리액트
import {Text, TouchableOpacity, View, Image} from 'react-native';

// 라이브러리
import {AppNavigatorProp} from '@/navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

import {useUserStore} from '@/store/useUserStore';

// 아이콘
import EntypoIcons from 'react-native-vector-icons/Entypo';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';

interface MainHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const MainHeader = ({open, setOpen}: MainHeaderProps) => {
  const nav = useNavigation<AppNavigatorProp>();

  const userInfo = useUserStore(state => state.userInfo);

  const onPress = () => {
    nav.navigate('Alarm');
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <View className="flex flex-row justify-between items-center mt-5 mb-8">
      <TouchableOpacity onPress={handleOpen}>
        <View className="flex flex-row items-center space-x-3">
          {userInfo?.profileImage ? (
            <Image
              source={{uri: userInfo.profileImage}}
              className="w-9 h-9 rounded-full"
            />
          ) : (
            <View className="w-9 h-9 rounded-full bg-white" />
          )}
          <Text className="text-white text-[18px] font-bold">
            {userInfo?.name}
          </Text>
          <EntypoIcons name="chevron-down" size={20} color="white" />
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
