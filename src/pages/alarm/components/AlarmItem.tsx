import {View, Text} from 'react-native';

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

export const AlarmItem: React.FC<{item: AlarmItem}> = ({item}) => (
  <View className="bg-white p-5 mb-4 rounded-xl shadow-lg shadow-black/10">
    <Text className="text-xs mb-2">{item.date}</Text>
    <View className="flex-row items-center">
      <Text className="text-2xl mr-2">{item.icon}</Text>
      <View className="flex-1">
        <Text className="text-sm">{item.content}</Text>
        <Text className="text-xs mt-1">{item.time}</Text>
      </View>
    </View>
  </View>
);
