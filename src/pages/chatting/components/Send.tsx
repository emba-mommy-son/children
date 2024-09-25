import {Text, View} from 'react-native';

interface SendProps {
  message: string;
  bgColor: string;
}

const Send = ({message, bgColor}: SendProps) => {
  return (
    <View className="flex flex-row justify-end w-full mb-3">
      <View className="w-4/5">
        <Text
          className="p-3 rounded-xl rounded-br-none text-right ml-auto"
          style={{
            backgroundColor: bgColor,
          }}>
          {message}
        </Text>
      </View>
    </View>
  );
};

export default Send;
