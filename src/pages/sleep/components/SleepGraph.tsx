import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

interface SleepGraphProps {
  weeklyHours: number[];
}

export const SleepGraph: React.FC<SleepGraphProps> = ({weeklyHours}) => {
  const screenWidth = Dimensions.get('window').width - 32; // 좌우 패딩 16씩
  const chartWidth = screenWidth - 20; // View의 내부 패딩 8씩

  // 오늘 날짜 기준으로 최근 7일의 날짜 라벨 생성
  const getDateLabels = () => {
    const dates = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.getDate().toString());
    }
    return dates;
  };

  const data = {
    labels: getDateLabels(),
    datasets: [
      {
        data: weeklyHours,
        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`, // 보라색
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`, // 보라색
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#8b5cf6',
    },
  };

  return (
    <View className="bg-white rounded-2xl mt-4">
      <Text className="pl-4 pt-4 text-lg font-bold mb-4">
        이번주 수면 그래프
      </Text>
      <LineChart
        data={data}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier // 곡선으로 표현
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withDots={true}
        withInnerLines={false}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={true}
        // yAxisSuffix="시간"
      />
    </View>
  );
};
