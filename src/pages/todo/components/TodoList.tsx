import {useCompleteGoal, useDeleteGoal, useUncompleteGoal} from '@/api/todo';
import {useState} from 'react';
import {Text, View} from 'react-native';

import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TodoListProps {
  id: number;
  content: string;
  done: boolean;
}

export const TodoList = ({id, content, done}: TodoListProps) => {
  const [isDone, setIsDone] = useState<boolean>(done);
  const {mutate: deleteGoal} = useDeleteGoal();
  const {mutate: completeGoal} = useCompleteGoal();
  const {mutate: uncompleteGoal} = useUncompleteGoal();

  const hanelePress = () => {
    if (isDone) {
      uncompleteGoal(id);
    } else {
      completeGoal(id);
    }

    setIsDone(!isDone);
  };

  const handleDeleteGoal = () => {
    deleteGoal(id);
  };

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center space-x-3 my-1">
        <MaterialCommunityIcons
          name={isDone ? 'checkbox-marked' : 'checkbox-blank-outline'}
          color="#9D4BFF"
          size={24}
          onPress={hanelePress}
        />
        <Text className="text-lg text-black">{content}</Text>
      </View>

      <EntypoIcons name="cross" size={20} onPress={handleDeleteGoal} />
    </View>
  );
};
