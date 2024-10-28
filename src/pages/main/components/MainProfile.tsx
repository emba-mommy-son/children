// 리액트
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUpdateProfileImage} from '@/api/user';

interface MainProfileProps {
  setQrOpen: (qrOpen: boolean) => void;
  setOpen: (open: boolean) => void;
}

export const MainProfile = ({setQrOpen, setOpen}: MainProfileProps) => {
  const {mutate: updateProfileImage} = useUpdateProfileImage();

  const onQrOpen = () => {
    setQrOpen(true);
    setOpen(false);
  };

  const handleImageSelect = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
        maxWidth: 1024,
        maxHeight: 1024,
        selectionLimit: 1,
      });

      const asset = result.assets?.[0];
      // 타입 단언
      if (!asset?.uri || !asset?.type || !asset?.fileName) return;

      if (result.assets && result.assets[0]) {
        const file = {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName,
        };

        updateProfileImage(file, {
          onSuccess: () => {
            Alert.alert('완료', '프로필 수정이 완료되었습니다.');
            setOpen(false);
          },
        });
      }
    } catch (error) {
      console.error('이미지 선택 에러:', error);
    }
  };

  return (
    <View className="bg-black/50 space-y-3 p-6 mx-3 rounded-2xl z-10 absolute top-16 left-0 right-0">
      <TouchableOpacity
        className="bg-white/90 rounded-lg"
        onPress={handleImageSelect}>
        <Text className="text-center text-subheading text-black py-3">
          프로필 이미지 변경
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white/90 rounded-lg" onPress={onQrOpen}>
        <Text className="text-center text-subheading text-black py-3">
          QR 코드
        </Text>
      </TouchableOpacity>
    </View>
  );
};
