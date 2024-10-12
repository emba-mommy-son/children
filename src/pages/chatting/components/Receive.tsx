import {Text, View} from 'react-native';

interface ReceiveProps {
  message: string;
}

export const Receive = ({message}: ReceiveProps) => {
  return (
    <View className="flex flex-row justify-start w-4/5 mb-3">
      <Text className="bg-gray-300 p-3 rounded-xl rounded-tr-none text-left">
        {message}
      </Text>
    </View>
  );
};
