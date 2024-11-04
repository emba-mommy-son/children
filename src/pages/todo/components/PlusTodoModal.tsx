import {usePostGoal} from '@/api/todo';
import {useState} from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// 아이콘
import EntypoIcons from 'react-native-vector-icons/Entypo';

interface PlusTodoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const PlusTodoModal = ({
  isModalOpen,
  setIsModalOpen,
}: PlusTodoModalProps) => {
  const [input, setInput] = useState<string>('');
  const {mutate: createTodo} = usePostGoal();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateTodo = () => {
    console.log('input', input);
    if (!input) {
      return;
    }

    console.log('TODO 추가', input);

    createTodo(input);
    setIsModalOpen(false);
  };

  return (
    <Modal
      animationType="none"
      visible={isModalOpen}
      transparent={true}
      onRequestClose={handleModalClose}>
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={handleModalClose}>
        <View
          className="relative bg-white rounded-xl w-[280px] flex flex-col items-center justify-center p-3 space-y-4"
          onStartShouldSetResponder={() => true}>
          <View className="absolute top-2 right-2">
            <EntypoIcons name="cross" size={20} onPress={handleModalClose} />
          </View>
          <Text className="text-black font-bold text-lg">TODO 추가</Text>
          <TextInput
            className="w-full h-40 rounded-xl bg-white border-[1px] border-gray-700"
            value={input}
            onChangeText={setInput}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity onPress={handleCreateTodo}>
            <View className="bg-primary flex flex-row rounded-lg mt-2">
              <Text className="text-white text-base font-bold w-full text-center py-1.5">
                등록
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};
