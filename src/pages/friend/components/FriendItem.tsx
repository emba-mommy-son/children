// 리액트
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

// 타입
import {FriendList} from '@pages/friend/pages/FriendPage';

// 컴포넌트
import {Drawer} from '@components/ui/Drawer';

// 아이콘
import Friend from '@assets/icons/friend/friendImage.png';

export const FriendItem: React.FC<{item: FriendList}> = ({item}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOpen}>
        <View className="flex flex-row items-center py-5 border-b-2 border-gray-700 space-x-6">
          <Image source={Friend} className="w-16 h-16" />
          <Text className="text-body-text text-black font-bold">
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
      {open && (
        <Drawer>
          <View>
            <Text>이거지</Text>
          </View>
        </Drawer>
      )}
    </View>
  );
};
