import {useGetLocation} from '@/api/location/useGetLocation';
import {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6Icons from 'react-native-vector-icons/FontAwesome6';

interface LocationModalProps {
  modalOpen: boolean;
  name: string;
  setModalOpen: (modalOpen: boolean) => void;
}

const {height} = Dimensions.get('window');

export const LocationModal = ({
  modalOpen,
  name,
  setModalOpen,
}: LocationModalProps) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const today = new Date().toLocaleString().split('.');
  const date = `${today[1]}월 ${today[2]}일`;
  const time = today[3].split(':').slice(0, 2).join(':');
  const {data: notiLocations} = useGetLocation();

  useEffect(() => {
    if (modalOpen) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalOpen, slideAnim]);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Modal visible={modalOpen} transparent animationType="none">
      <TouchableWithoutFeedback onPress={handleClose}>
        <View className="flex-1 justify-end bg-opacity-50 bg-black/50">
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                {transform: [{translateY: slideAnim}]},
                {
                  backgroundColor: 'white',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                  borderBottomWidth: 0,
                },
              ]}>
              <Text className="text-black font-bold">{date}</Text>
              {/* 현재 위치 */}
              <View className="p-5 rounded-lg shadow-lg shadow-gray-700">
                <View className="flex flex-row justify-between">
                  <Text className="text-red">현위치</Text>
                  <Text className="text-black">{time}</Text>
                </View>
                <Text className="text-black mt-6 mb-3 px-2">
                  {name.split(' ').slice(2).join(' ')}
                </Text>
              </View>

              {/* 이동 거리 */}
              <View className="px-5 py-7 rounded-lg shadow-lg shadow-gray-700">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-red mt-1">
                    부모님께 알림이 전송된 위치
                  </Text>
                </View>
                {notiLocations?.map(location => {
                  return (
                    <View className="flex flex-row items-center mt-4 space-x-2 px-2">
                      <FontAwesome6Icons
                        name="location-dot"
                        color="#E86256"
                        size={15}
                      />
                      <Text className="text-black">
                        {location.name.split(' ').slice(2).join(' ')}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
