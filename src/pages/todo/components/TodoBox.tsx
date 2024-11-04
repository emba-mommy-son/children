import {PlusTodoModal} from '@/pages/todo/components/PlusTodoModal';
import {TodoCountBox} from '@/pages/todo/components/TodoCountBox';
import {TodoList} from '@/pages/todo/components/TodoList';
import {WishBox} from '@/pages/todo/components/WishBox';
import {useState} from 'react';
import {Text, View} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const TodoListItem = [
  {
    id: 1,
    content: '할 일 1',
    isComplete: false,
  },
  {id: 2, content: '할 일 2', isComplete: false},
  {id: 3, content: '할 일 3', isComplete: false},
  {id: 4, content: '할 일 4', isComplete: false},
  {id: 5, content: '할 일 5', isComplete: false},
  {id: 6, content: '할 일 6', isComplete: true},
  {id: 7, content: '할 일 7', isComplete: true},
  {id: 8, content: '할 일 8', isComplete: true},
  {id: 9, content: '할 일 9', isComplete: true},
  {id: 10, content: '할 일 10', isComplete: false},
  {id: 11, content: '할 일 11', isComplete: true},
  {id: 12, content: '할 일 12', isComplete: false},
  {id: 13, content: '할 일 13', isComplete: true},
];

export const TodoBox = () => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState<boolean>(false);
  const todoList = TodoListItem.filter(todo => !todo.isComplete);
  const completeList = TodoListItem.filter(todo => todo.isComplete);

  const handleOpen = () => {
    setIsTodoModalOpen(true);
  };

  return (
    <View className="flex flex-col space-y-3 mt-3">
      <WishBox ratio={(todoList.length / TodoListItem.length) * 100} />
      <View className="flex flex-row itmes-center justify-center space-x-3">
        <TodoCountBox title="할 일" count={todoList.length} />
        <TodoCountBox title="완료" count={completeList.length} />
      </View>
      <View className="relative bg-white rounded-xl shadow-md shadow-black p-4 overflow-auto">
        <View className="absolute top-4 right-4 z-50">
          <EntypoIcons name="plus" size={25} onPress={handleOpen} />
        </View>
        <Text className="border-b-[1px] border-gray-700 text-black text-center text-lg font-bold pb-3 mb-3">
          TODO
        </Text>
        {todoList.map(todo => (
          <TodoList
            key={todo.id}
            content={todo.content}
            isComplete={todo.isComplete}
          />
        ))}
      </View>
      <View className="bg-white rounded-xl shadow-md shadow-black p-4">
        <Text className="border-b-[1px] border-gray-700 text-black text-center text-lg font-bold pb-3 mb-3">
          COMPLETE
        </Text>
        {completeList.map(todo => (
          <TodoList
            key={todo.id}
            content={todo.content}
            isComplete={todo.isComplete}
          />
        ))}
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
