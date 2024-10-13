import {View, Text} from 'react-native';
interface ReceiveProps {
  content: string;
  createdAt: string;
}

export const Receive: React.FC<ReceiveProps> = ({content, createdAt}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  return (
    <View className="flex flex-col rounded-xl justify-end w-full mb-3">
      <Text className="bg-gray-700 p-3 rounded-xl text-center mr-auto">
        {content}
      </Text>
      <Text className="text-xs">{formatTime(createdAt)}</Text>
    </View>
  );
};
