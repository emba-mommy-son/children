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
    <View className="flex flex-row rounded-xl justify-start items-end space-x-2 w-full mb-3 mr-auto">
      <Text className="bg-gray-700 p-3 rounded-xl rounded-tr-none text-center text-black">
        {content}
      </Text>
      <Text className="text-[10px] mb-1">{formatTime(createdAt)}</Text>
    </View>
  );
};
