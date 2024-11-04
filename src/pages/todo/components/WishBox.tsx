// 리액트
import {Image, Text, View} from 'react-native';

// 라이브러리
import CircularProgress from 'react-native-circular-progress-indicator';

// 아이콘
import Bike from '@/assets/icons/bike.png';
import {WishModal} from '@/pages/todo/components/WishModal';
import {useState} from 'react';
import EntypoIcons from 'react-native-vector-icons/Entypo';

interface WishBoxProps {
  ratio: number;
}

interface WishList {
  wishImg: any;
}

const wishList: WishList = {
  wishImg: Bike,
};

export const WishBox = ({ratio}: WishBoxProps) => {
  const [isWishModalOpen, setIsWishModalOpen] = useState<boolean>(false);
  const percentValue = Math.round(ratio);

  return (
    <View className="relative w-full bg-lightpurple rounded-xl flex flex-col items-center justify-center p-4 space-y-2">
      <View className="absolute top-2 right-2">
        <EntypoIcons
          name="plus"
          size={25}
          onPress={() => setIsWishModalOpen(true)}
        />
      </View>
      {wishList ? (
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
              source={wishList.wishImg}
              className="w-[85px] h-[85px] absolute rounded-full"
            />
          </View>
          <Text className="text-lg text-black font-bold">
            {percentValue}% 달성
          </Text>
        </View>
      ) : (
        <View className="flex items-center justify-center h-20">
          <Text className="text-black text-base font-bold">
            등록한 WISH가 없습니다!
          </Text>
        </View>
      )}
      {isWishModalOpen && (
        <WishModal
          isModalOpen={isWishModalOpen}
          setIsModalOpen={setIsWishModalOpen}
        />
      )}
    </View>
  );
};
