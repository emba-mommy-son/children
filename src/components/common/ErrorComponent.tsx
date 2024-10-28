import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ErrorComponentProps = {
  error: Error;
  resetError: () => void;
};

export const ErrorComponent = ({error, resetError}: ErrorComponentProps) => {
  console.log('에러 내용:', error); // 디버깅용

  return (
    <View className="flex-1 items-center justify-center">
      <MaterialCommunityIcons name="access-point-network-off" size={25} />
      <Text className="mt-2">네트워크 연결 상태가 좋지 않습니다.</Text>
      <Text className="mt-1 text-gray-700">{error.message}</Text>
      <TouchableOpacity
        onPress={resetError}
        className="mt-4 bg-secondary p-2 rounded-md">
        <Text className="text-white">다시 시도</Text>
      </TouchableOpacity>
    </View>
  );
};
