import {View, Text} from 'react-native';

interface DateHeaderProps {
  date: string;
}

export const DateHeader: React.FC<DateHeaderProps> = ({date}) => {
  const formatDate = (dateString: string) => {
    const today = new Date();
    const messageDate = new Date(dateString);

    // 년도가 다르면 년도까지 표시
    if (messageDate.getFullYear() !== today.getFullYear()) {
      return messageDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
    }

    // 같은 년도면 월, 일, 요일만 표시
    return messageDate.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  return (
    <View className="flex items-center justify-center my-4">
      <View className="bg-gray-200 px-3 py-1 rounded-full">
        <Text className="text-xs text-gray-600">{formatDate(date)}</Text>
      </View>
    </View>
  );
};
