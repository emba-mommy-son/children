import {Text, View} from 'react-native';

interface SendProps {
  message: string;
}

export const Send = ({message}: SendProps) => {
  return (
    <View className="flex flex-row justify-end w-full mb-3">
      <View className="w-4/5">
        <Text className="bg-primary p-3 rounded-xl rounded-br-none text-right ml-auto">
          {message}
        </Text>
      </View>
    </View>
  );
};
