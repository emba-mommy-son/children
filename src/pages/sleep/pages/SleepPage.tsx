import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSleepData} from '@/hooks/useSleepData';
interface SleepData {
  date: string;
  weeklyHours: number[];
  averageSleepTime: number;
  sleepQuality: number;
  lastNightSleep: {
    totalSleep: string;
    bedTime: string;
    wakeUpTime: string;
    actualSleep: string;
  };
}

const mockData: SleepData = {
  date: '9월 13일 금요일',
  weeklyHours: [5, 3, 5, 2, 6],
  averageSleepTime: 6.2,
  sleepQuality: 75,
  lastNightSleep: {
    totalSleep: '6h 52m',
    bedTime: '00:20 AM',
    wakeUpTime: '07:12 AM',
    actualSleep: '5h 25m',
  },
};

const WeeklyChart: React.FC<{hours: number[]}> = ({hours}) => (
  <View className="bg-white p-4 rounded-lg flex-row justify-between mb-5">
    {['월', '화', '수', '목', '금'].map((day, index) => (
      <View key={day} className="items-center">
        <Text className="mb-2">{day}</Text>
        <View className="w-12 h-12 rounded-full border-4 border-gray-300 justify-center items-center">
          <View
            className="absolute w-12 h-12 rounded-full border-4 border-purple-500"
            style={{
              borderLeftColor: 'transparent',
              borderBottomColor: 'transparent',
              transform: [{rotate: `${(hours[index] / 24) * 360}deg`}],
            }}
          />
        </View>
        <Text className="mt-2">{hours[index]}h</Text>
      </View>
    ))}
  </View>
);

const StatBox: React.FC<{
  title: string;
  value: number | string;
  unit?: string;
}> = ({title, value, unit}) => (
  <View className="bg-primary p-6 rounded-lg flex-1 items-center justify-center">
    <Text className="text-white text-sm mb-2">{title}</Text>
    <Text className="text-white text-3xl font-bold">
      {value}
      {unit && <Text className="text-lg">{unit}</Text>}
    </Text>
  </View>
);

const SleepInfoItem: React.FC<{icon: string; value: string; label: string}> = ({
  icon,
  value,
  label,
}) => (
  <View className="items-center">
    <Text className="mb-1">{icon}</Text>
    <Text className="font-bold">{value}</Text>
    <Text>{label}</Text>
  </View>
);

export const SleepPage: React.FC = () => {
  const {getWeekSleepData} = useSleepData();

  const handleButtonPress = async () => {
    try {
      const sleepData = await getWeekSleepData();
      console.log('수집된 수면 데이터:', sleepData);
    } catch (error) {
      console.error('수면 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="bg-secondary p-4 flex-row justify-between items-center">
        <Text className="text-white text-body-text font-bold">
          {mockData.date}
        </Text>
        <AntDesign name="calendar" size={24} color="white" />
      </View>
      <ScrollView className="px-7">
        <WeeklyChart hours={mockData.weeklyHours} />

        <View className="flex-row justify-between mb-6">
          <View className="flex-1 mr-2">
            <StatBox
              title="평균 수면시간"
              value={mockData.averageSleepTime}
              unit="시간"
            />
          </View>
          <View className="flex-1 ml-2">
            <StatBox title="숙면도" value={`${mockData.sleepQuality}%`} />
          </View>
        </View>

        <View className="bg-white rounded-lg p-4 mb-6">
          <Text className="text-lg font-bold mb-3">어제의 수면 정보</Text>
          <View className="flex-row justify-between">
            <SleepInfoItem
              icon="🌙"
              value={mockData.lastNightSleep.totalSleep}
              label="총 수면시간"
            />
            <SleepInfoItem
              icon="🌅"
              value={mockData.lastNightSleep.wakeUpTime}
              label="기상 시간"
            />
          </View>
          <View className="flex-row justify-between mt-4">
            <SleepInfoItem
              icon="⏰"
              value={mockData.lastNightSleep.bedTime}
              label="잠든시간"
            />
            <SleepInfoItem
              icon="💤"
              value={mockData.lastNightSleep.actualSleep}
              label="숙면 시간"
            />
          </View>
        </View>

        <View className="bg-white rounded-lg p-4">
          <Text className="text-lg font-bold mb-4">이번주 수면 그래프</Text>
          <Text>그래프 그려 도영</Text>
        </View>

        <TouchableOpacity
          onPress={handleButtonPress}
          className="bg-blue-500 p-4 rounded-lg items-center">
          <Text className="text-white">수면 데이터 가져오기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
