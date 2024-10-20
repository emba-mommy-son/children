// 리액트
import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';

// 라이브러리
import messaging from '@react-native-firebase/messaging';
import QRCode from 'react-native-qrcode-svg';

// 아이콘
import EntypoIcons from 'react-native-vector-icons/Entypo';

interface QRCodeModalProps {
  qrOpen: boolean;
  setQrOpen: (value: boolean) => void;
}

export const QRCodeModal = ({qrOpen, setQrOpen}: QRCodeModalProps) => {
  const [FCMToken, setFCMToken] = useState<string>('');

  const getFCMToken = async () => {
    return await messaging().getToken();
  };

  const handleModalClose = () => {
    setQrOpen(false);
  };

  useEffect(() => {
    getFCMToken()
      .then(token => {
        setFCMToken(token);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={qrOpen}
      transparent={true}
      onRequestClose={handleModalClose}>
      <View className="flex-1 justify-center istems-center">
        <View className="flex-1 justify-center items-center">
          <View className="relative bg-black/50 rounded-xl p-10">
            <EntypoIcons
              name="cross"
              size={30}
              color="#FFFFFF"
              onPress={handleModalClose}
              style={{position: 'absolute', top: 10, right: 10}}
            />
            {FCMToken && <QRCode value={FCMToken} size={200} />}
          </View>
        </View>
      </View>
    </Modal>
  );
};
