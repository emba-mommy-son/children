import React, {useRef} from 'react';
import {View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

interface DrawerProps {
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({children}: DrawerProps) => {
  const sheetRef = useRef<BottomSheet>(null);
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['50%', '100%']} // 드로어의 스냅 위치 설정
      borderRadius={10}
      renderContent={() => (
        <View className="bg-white p-5 h-[300px]">{children}</View>
      )}
    />
  );
};
