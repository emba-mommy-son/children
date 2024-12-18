import {ScrollView, Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

interface DayScrollViewProps {
  weeklyHours: number[];
}

export const DayScrollView: React.FC<DayScrollViewProps> = ({weeklyHours}) => {
  const days = Array(7)
    .fill(0)
    .map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index)); // 6부터 시작해서 0까지
      return date.toLocaleDateString('ko-KR', {
        weekday: 'short',
      });
    });
  // 시간 정수로 포멧팅 ex) 7.2 -> 7
  const formatHours = (hours: number) => {
    return `${Math.floor(hours)}h`;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="bg-white rounded-lg p-4"
      contentContainerStyle={{paddingRight: 30}}>
      <View className="flex-row space-x-5">
        {days.map((day, index) => (
          <View key={day} className="items-center">
            <Text className="mb-2">{day}</Text>
            <CircularProgress
              value={(weeklyHours[index] / 24) * 100}
              radius={25}
              duration={1000}
              progressValueColor={'#1a1a1a'}
              maxValue={100}
              title={formatHours(weeklyHours[index])}
              titleColor={'#1a1a1a'}
              titleStyle={{fontSize: 12, fontWeight: '600'}}
              activeStrokeColor={'#8b5cf6'}
              inActiveStrokeColor={'#e5e7eb'}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={6}
              activeStrokeWidth={6}
              progressValueStyle={{display: 'none'}} // 퍼센트 값 숨기기
              valueSuffix={''}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
