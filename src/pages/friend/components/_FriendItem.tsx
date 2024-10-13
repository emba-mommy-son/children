// 리액트
import {useCallback, useMemo, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

// 타입
import {FriendResponse} from 'types/friend';

// 컴포넌트

// 아이콘
import Friend from '@assets/icons/friend/friendImage.png';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const FriendItem: React.FC<{item: FriendResponse}> = ({item}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View>
          <TouchableOpacity onPress={handlePresentModalPress}>
            <View className="flex flex-row items-center py-5 border-b-2 border-gray-700 space-x-6">
              <Image source={Friend} className="w-16 h-16" />
              <Text className="text-body-text text-black font-bold">
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View>
              <Text>이거지</Text>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
