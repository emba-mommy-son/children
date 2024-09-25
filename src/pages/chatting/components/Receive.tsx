import {Text, View} from 'react-native';

interface ReceiveProps {
  message: string;
  bgColor: string;
}

const Receive = ({message, bgColor}: ReceiveProps) => {
  return (
    <View className={`flex flex-row justify-start w-4/5 mb-3`}>
      <Text
        className={`p-3 rounded-xl rounded-tr-none text-left`}
        style={{backgroundColor: `${bgColor}`}}>
        {message}
      </Text>
    </View>
  );
};

export default Receive;
