import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
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
    <View className="flex-1 justify-center items-center">
      <Modal
        animationType="slide"
        visible={qrOpen}
        // presentationStyle="formSheet"
        transparent={true}
        onRequestClose={() => setQrOpen(false)}>
        <View className="flex-1 justify-center items-center">
          <View className="relative bg-black/50 rounded-xl p-10">
            <EntypoIcons
              name="cross"
              size={30}
              color="#FFFFFF"
              onPress={handleModalClose}
              // className="absolute top-0 right-0"
              style={{position: 'absolute', top: 10, right: 10}}
            />
            {FCMToken && <QRCode value={FCMToken} size={200} />}
          </View>
        </View>
      </Modal>
    </View>
  );
};
