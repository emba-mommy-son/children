// 리액트
import {Text, View} from 'react-native';

export const MainProfile = () => {
  return (
    <View className="bg-black/50 space-y-3 p-6 mx-3 rounded-2xl z-10 absolute top-16 left-0 right-0">
      <View className="bg-white/90 rounded-lg">
        <Text className="text-center text-subheading text-black py-3">
          프로필 이미지 변경
        </Text>
      </View>
      <View className="bg-white/90 rounded-lg">
        <Text className="text-center text-subheading text-black py-3">
          QR 코드
        </Text>
      </View>
    </View>
  );
};
