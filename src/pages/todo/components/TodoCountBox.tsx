import {Text, View} from 'react-native';

interface TodoCountBoxProps {
  title: string;
  count: number;
}

export const TodoCountBox = ({title, count}: TodoCountBoxProps) => {
  return (
    <View className="flex items-center justify-center text-center bg-primary flex-1 rounded-xl mx-1 py-3">
      <Text className="text-white text-2xl">{count}</Text>
      <Text className="text-white">{title}</Text>
    </View>
  );
};
