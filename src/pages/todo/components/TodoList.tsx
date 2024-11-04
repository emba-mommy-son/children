import {useState} from 'react';
import {Text, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TodoListProps {
  content: string;
  isComplete: boolean;
}

export const TodoList = ({content, isComplete}: TodoListProps) => {
  const [complete, setComplete] = useState<boolean>(isComplete);

  const hanelePress = () => {
    setComplete(!complete);
  };

  return (
    <View className="flex flex-row items-center space-x-3 my-1">
      {complete ? (
        <MaterialCommunityIcons
          name="checkbox-marked"
          color="#9D4BFF"
          size={24}
          onPress={hanelePress}
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          color="#9D4BFF"
          size={24}
          onPress={hanelePress}
        />
      )}
      <Text className="text-lg text-black">{content}</Text>
    </View>
  );
};
