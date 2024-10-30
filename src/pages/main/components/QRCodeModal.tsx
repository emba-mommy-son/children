// 리액트
import React, {useEffect} from 'react';
import {Modal, Pressable, View} from 'react-native';

// 라이브러리
import messaging from '@react-native-firebase/messaging';
import QRCode from 'react-native-qrcode-svg';

// 아이콘
import {useAuthStore} from '@/store/useAuthStore';

interface QRCodeModalProps {
  qrOpen: boolean;
  setQrOpen: (value: boolean) => void;
}

export const QRCodeModal = ({qrOpen, setQrOpen}: QRCodeModalProps) => {
  // const [newFCMToken, setNewFCMToken] = useState<string>('');
  const {FCMToken, setFCMToken} = useAuthStore(state => state);

  const getFCMToken = async () => {
    return await messaging().getToken();
  };

  const handleModalClose = () => {
    setQrOpen(false);
  };

  useEffect(() => {
    console.log('FCM TOKEN', FCMToken);
    if (!FCMToken) {
      getFCMToken()
        .then(token => {
          // setNewFCMToken(token);
          setFCMToken(token);
          console.log(token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Modal
      animationType="none"
      visible={qrOpen}
      transparent={true}
      onRequestClose={handleModalClose}>
      <Pressable
        className="flex-1 bg-black/80 justify-center items-center"
        onPress={handleModalClose}>
        <View
          className="relative rounded-xl p-10"
          onStartShouldSetResponder={() => true}>
          {FCMToken && <QRCode value={FCMToken} size={200} />}
        </View>
      </Pressable>
    </Modal>
  );
};
