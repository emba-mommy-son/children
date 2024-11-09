// 리액트
import React, {useEffect} from 'react';
import {Modal, Pressable, View} from 'react-native';

// 라이브러리
import messaging from '@react-native-firebase/messaging';
import QRCode from 'react-native-qrcode-svg';

// 아이콘
import {useUpdateFcmToken} from '@/api/user/useUpdateFcmToken';
import useUser from '@/hooks/useUser';
import {useAuthStore} from '@/store/useAuthStore';

interface QRCodeModalProps {
  qrOpen: boolean;
  setQrOpen: (value: boolean) => void;
}

export const QRCodeModal = ({qrOpen, setQrOpen}: QRCodeModalProps) => {
  const {FCMToken, setFCMToken} = useAuthStore(state => state);
  // const {userInfo, setUserInfo} = useUserStore(state => state);
  const {mutate: updateFcmToken} = useUpdateFcmToken();
  const {user: userInfo, refetch} = useUser();

  const getFCMToken = async () => {
    return await messaging().getToken();
  };

  const handleModalClose = () => {
    setQrOpen(false);
  };

  useEffect(() => {
    console.log('FCM TOKEN', FCMToken);
    if (FCMToken !== userInfo?.fcmToken) {
      getFCMToken()
        .then(token => {
          setFCMToken(token);
          updateFcmToken(token);
          // !FIXME: setUserInfo 사용해서 async storage update
          refetch();
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
