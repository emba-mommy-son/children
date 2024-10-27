import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppNavigatorProp} from '@/navigation/AppNavigator';
import {useGetFriend} from '@/api/friend';
import {useCreateRoom} from '@/api/chat';
import {ROUTES} from '@/constants/routeURL';

interface FriendDetailModalProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
}

const {height} = Dimensions.get('window');

export const FriendDetailModal: React.FC<FriendDetailModalProps> = ({
  visible,
  onClose,
  userId,
}) => {
  const navigation = useNavigation<AppNavigatorProp>();
  const {data: friendDetail} = useGetFriend(userId);
  const {mutate: createRoom} = useCreateRoom();
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
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
  }, [visible, slideAnim]);

  const handleChatPress = () => {
    if (friendDetail?.roomId) {
      navigation.navigate(ROUTES.CHATTING, {roomId: friendDetail.roomId});
      onClose();
    } else {
      createRoom(
        {
          receiverId: Number(friendDetail?.userId),
        },
        {
          onSuccess: data => {
            navigation.navigate(ROUTES.CHATTING, {roomId: data.roomId});
            onClose();
          },
        },
      );
    }
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-opacity-50">
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
              {friendDetail?.profileImage && (
                <Image
                  source={{uri: friendDetail?.profileImage}}
                  className="w-24 h-24 rounded-full self-center mb-4"
                />
              )}
              <Text className="text-xl font-bold text-center mb-6">
                {friendDetail?.name}
              </Text>
              <TouchableOpacity
                className="bg-primary py-3 px-6 rounded-full mb-4"
                onPress={handleChatPress}>
                <Text className="text-white text-center font-bold">
                  1:1 채팅하기
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-center bg-gray-100">닫기</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
