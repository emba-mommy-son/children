// 리액트
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// 라이브러리
import {useNavigation} from '@react-navigation/native';

// 컴포넌트
import {AlarmItem} from '@pages/alarm/components/AlarmItem';

interface AlarmItem {
  id: number;
  date: string;
  content: string;
  icon: string;
  time: string;
}

const mockData: AlarmItem[] = [
  {
    id: 1,
    date: '2024.09.24',
    content: '전문가 상담을 권장합니다.',
    icon: '🩺',
    time: '10분 전',
  },
  {
    id: 2,
    date: '2024.09.24',
    content: '10원이 적립되었습니다.',
    icon: '🪙',
    time: '1시간 전',
  },
  {
    id: 3,
    date: '2024.09.24',
    content: '펜스를 벗어났습니다.',
    icon: '📍',
    time: '4시간 전',
  },
  {
    id: 4,
    date: '2024.09.23',
    content: '지난 밤 수면의 질이 감소했습니다.',
    icon: '🌙',
    time: '1일 전',
  },
  {
    id: 5,
    date: '2024.09.23',
    content: '지난 밤 수면의 질이 감소했습니다.',
    icon: '🌙',
    time: '1일 전',
  },
  {
    id: 6,
    date: '2024.09.23',
    content: '지난 밤 수면의 질이 감소했습니다.',
    icon: '🌙',
    time: '1일 전',
  },
  {
    id: 7,
    date: '2024.09.23',
    content: '지난 밤 수면의 질이 감소했습니다.',
    icon: '🌙',
    time: '1일 전',
  },
];

export const AlarmPage: React.FC = () => {
  const nav = useNavigation();

  const handleBackPress = () => {
    nav.goBack();
  };

  const renderItem = ({item}: {item: AlarmItem}) => <AlarmItem item={item} />;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-secondary p-4 flex-row items-center">
        <TouchableOpacity onPress={handleBackPress} className="mr-4">
          <Text className="text-white text-2xl">←</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">알림</Text>
      </View>
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        className="flex-1 px-8 pt-7 pb-4"
      />
    </SafeAreaView>
  );
};
