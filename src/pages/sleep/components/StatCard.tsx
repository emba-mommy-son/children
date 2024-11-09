import {Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
}

export const StatCard: React.FC<StatCardProps> = ({title, value, unit}) => {
  // 값 표시 형식 결정하는 함수
  const formatValue = (val: number) => {
    if (unit === '시간') {
      return Math.floor(val).toString();
    }
    return Math.floor(val).toString();
  };

  return (
    <View className="flex-1 bg-primary p-4 rounded-2xl justify-center items-center">
      <Text className="text-white text-xl mb-2">{title}</Text>
      {unit === '%' ? (
        // 숙면도 표시용 CircularProgress
        <View className="items-center">
          <CircularProgress
            value={value}
            radius={30}
            duration={1000}
            progressValueColor={'#fff'}
            maxValue={100}
            title={`${value}%`}
            titleColor={'#fff'}
            titleStyle={{fontSize: 16, fontWeight: '600'}}
            activeStrokeColor={'#fff'}
            inActiveStrokeColor={'rgba(255,255,255,0.2)'}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={12}
            activeStrokeWidth={12}
            progressValueStyle={{display: 'none'}}
          />
        </View>
      ) : (
        // 평균 수면시간 표시
        <View className="flex-row items-center justify-center text-center p-4">
          <Text className="text-white text-xl font-bold">
            {formatValue(value)}
          </Text>
          <Text className="text-white text-lg ml-1">{unit}</Text>
        </View>
      )}
    </View>
  );
};
