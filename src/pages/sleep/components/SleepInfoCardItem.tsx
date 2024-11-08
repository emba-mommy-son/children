import {Text, View, Image} from 'react-native';
import {ICONS} from '@/constants/icons';

interface SleepInfoCardItemProps {
  iconType: keyof typeof ICONS.sleep;
  value: string | null;
  label: string;
}

export const SleepInfoCardItem: React.FC<SleepInfoCardItemProps> = ({
  iconType,
  value,
  label,
}) => {
  const displayValue = !value || value === '-' ? '0시간 0분' : value;
  return (
    <View className="flex-1 flex-row items-center justify-center gap-4">
      <Image
        source={ICONS.sleep[iconType]}
        className="w-8 h-8"
        resizeMode="contain"
      />
      <View>
        <Text className="text-lg font-bold">{displayValue}</Text>
        <Text className="text-gray-900 text-sm">{label}</Text>
      </View>
    </View>
  );
};
