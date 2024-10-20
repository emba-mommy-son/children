// 리액트
import {Text, TouchableOpacity, View} from 'react-native';

interface MainProfileProps {
  setQrOpen: (open: boolean) => void;
}

export const MainProfile = ({setQrOpen}: MainProfileProps) => {
  const onQrOpen = () => {
    setQrOpen(true);
  };

  return (
    <View className="bg-black/50 space-y-3 p-6 mx-3 rounded-2xl z-10 absolute top-16 left-0 right-0">
      <TouchableOpacity className="bg-white/90 rounded-lg">
        <Text className="text-center text-subheading text-black py-3">
          프로필 이미지 변경
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white/90 rounded-lg" onPress={onQrOpen}>
        <Text className="text-center text-subheading text-black py-3">
          QR 코드
        </Text>
      </TouchableOpacity>
    </View>
  );
};
