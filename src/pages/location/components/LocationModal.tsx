import useGeocoding from '@/hooks/useGeoCoding';
import {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface LocationModalProps {
  latitude: number;
  longitude: number;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

const {height} = Dimensions.get('window');

export const LocationModal = ({
  latitude,
  longitude,
  modalOpen,
  setModalOpen,
}: LocationModalProps) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const {address, reverseGeocode} = useGeocoding();
  const today = new Date().toLocaleString().split('.');
  const date = `${today[1]}월 ${today[2]}일`;
  const time = today[3];

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

  useEffect(() => {
    reverseGeocode(latitude, longitude);
  }, []);

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
              <View className="m-2 p-5 rounded-md shadow-sm shadow-gray-700">
                <View className="flex flex-row justify-between">
                  <Text className="text-red">현위치</Text>
                  <Text className="text-black">{time}</Text>
                </View>
                <Text className="text-center text-black mt-6 mb-3">
                  {address?.split(' ').slice(2).join(' ')}
                </Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
