// 리액트
import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';

// 아이콘
import EntypoIcons from 'react-native-vector-icons/Entypo';

interface WishModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const WishModal = ({isModalOpen, setIsModalOpen}: WishModalProps) => {
  const handleModalClose = () => {
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
          <Text className="text-black font-bold text-lg">WISH 등록 / 변경</Text>
          <View className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center">
            <Text>이미지 선택</Text>
          </View>
          <TouchableOpacity>
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
