// 리액트
import {useState} from 'react';
import {Image, Text, View, Alert} from 'react-native';

// 라이브러리
import CircularProgress from 'react-native-circular-progress-indicator';
import {useUserStore} from '@/store/useUserStore';
import {useDeleteWishImage} from '@/api/todo';
// 아이콘
import {WishModal} from '@/pages/todo/components/WishModal';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
interface WishBoxProps {
  ratio: number;
}

export const WishBox = ({ratio}: WishBoxProps) => {
  const {mutate: deleteWishImage} = useDeleteWishImage();
  const [isWishModalOpen, setIsWishModalOpen] = useState<boolean>(false);
  const percentValue = Math.round(ratio);
  const rewardImage = useUserStore(state => state.userInfo?.rewardImage);

  const handleDeletePress = () => {
    Alert.alert(
      '이미지 삭제',
      '선물 이미지를 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            deleteWishImage();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View className="relative w-full bg-lightpurple rounded-xl flex flex-col items-center justify-center p-4 space-y-2">
      <View className="absolute top-2 right-3 flex flex-row gap-3">
        {rewardImage ? (
          <>
            <AntDesignIcons
              name="edit"
              size={23}
              onPress={() => setIsWishModalOpen(true)}
            />
            <AntDesignIcons
              name="delete"
              size={22}
              onPress={handleDeletePress}
            />
          </>
        ) : (
          <EntypoIcons
            name="plus"
            size={25}
            onPress={() => setIsWishModalOpen(true)}
          />
        )}
      </View>
      {rewardImage ? (
        <View>
          <View className="flex justify-center items-center relative">
            <CircularProgress
              value={percentValue}
              radius={50}
              duration={1000}
              maxValue={100}
              activeStrokeColor="#9D4BFF"
              inActiveStrokeColor="#DEDEDE"
              inActiveStrokeOpacity={1}
              inActiveStrokeWidth={8}
              activeStrokeWidth={8}
              progressValueStyle={{display: 'none'}}
            />
            <Image
              source={{uri: rewardImage}}
              className="w-[85px] h-[85px] absolute rounded-full"
            />
          </View>
          <Text className="text-lg text-black text-center font-bold">
            {percentValue}% 달성
          </Text>
        </View>
      ) : (
        <View className="flex items-center justify-center h-20">
          <Text className="text-black text-base font-bold">
            나를 위한 선물을 등록해보세요! 🎁
          </Text>
        </View>
      )}
      {isWishModalOpen && (
        <WishModal
          isModalOpen={isWishModalOpen}
          setIsModalOpen={setIsWishModalOpen}
          rewardImage={rewardImage}
        />
      )}
    </View>
  );
};
