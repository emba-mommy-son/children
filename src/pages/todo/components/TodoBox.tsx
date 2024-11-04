import {useGetGoal} from '@/api/todo';
import {PlusTodoModal} from '@/pages/todo/components/PlusTodoModal';
import {TodoCountBox} from '@/pages/todo/components/TodoCountBox';
import {TodoList} from '@/pages/todo/components/TodoList';
import {WishBox} from '@/pages/todo/components/WishBox';
import {Goal} from '@/types/goal';
import {useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';

export const TodoBox = () => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState<boolean>(false);
  const {data} = useGetGoal();
  const todoList = useMemo(() => data.filter(todo => !todo.done), [data]);
  const completeList = useMemo<Goal[]>(
    () => data.filter(todo => todo.done),
    [data],
  );
  const [ratio, setRatio] = useState<number>(0);

  useEffect(() => {
    setRatio((completeList.length / Math.max(1, data.length)) * 100);
  }, [data]);

  const handleOpen = () => {
    setIsTodoModalOpen(true);
  };

  return (
    <View className="flex flex-col space-y-3 mt-3">
      <WishBox ratio={ratio} />
      <View className="flex flex-row itmes-center justify-center space-x-3">
        <TodoCountBox title="할 일" count={todoList.length} />
        <TodoCountBox title="완료" count={completeList.length} />
      </View>
      <View className="relative bg-white rounded-xl shadow-md shadow-black p-4 overflow-auto">
        <View className="absolute top-4 right-4 z-50">
          <EntypoIcons name="plus" size={25} onPress={handleOpen} />
        </View>
        <Text className="border-b-[1px] border-gray-700 text-black text-center text-lg font-bold pb-3 mb-3">
          할 일
        </Text>
        {todoList.length > 0 ? (
          todoList.map(todo => (
            <TodoList
              key={todo.goalId}
              id={todo.goalId}
              content={todo.content}
              done={todo.done}
            />
          ))
        ) : (
          <View className="w-full h-32 flex items-center justify-center">
            <Text className="text-black text-center font-bold">
              현재 목표가 없습니다.
            </Text>
          </View>
        )}
      </View>
      <View className="bg-white rounded-xl shadow-md shadow-black p-4">
        <Text className="border-b-[1px] border-gray-700 text-black text-center text-lg font-bold pb-3 mb-3">
          완료
        </Text>
        {completeList.length > 0 ? (
          completeList.map(todo => (
            <TodoList
              key={todo.goalId}
              id={todo.goalId}
              content={todo.content}
              done={todo.done}
            />
          ))
        ) : (
          <View className="w-full h-32 flex items-center justify-center">
            <Text className="text-black text-center font-bold">
              현재 완료한 목표가 없습니다.
            </Text>
          </View>
        )}
      </View>
      {isTodoModalOpen && (
        <PlusTodoModal
          isModalOpen={isTodoModalOpen}
          setIsModalOpen={setIsTodoModalOpen}
        />
      )}
    </View>
  );
};
