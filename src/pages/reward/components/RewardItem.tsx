import {View, Text, Image} from 'react-native';
import {Reward} from '@/types/reward';
import {getAmountWithSign, getAmountColor} from '@/utils/checkAmount';
import {ICONS} from '@/constants/icons';
import {LABELS} from '@/constants/labels';
interface RewardItemProps {
  item: Reward;
}

export const RewardItem = ({item}: RewardItemProps) => {
  return (
    <View className="flex-row justify-between items-center py-4">
      <View className="flex-row items-center space-x-3">
        <Image source={ICONS.reward[item.type]} className="w-8 h-8" />
        <View>
          <Text className="text-black">{LABELS.reward[item.type]}</Text>
        </View>
      </View>
      <Text className={`font-semibold ${getAmountColor(item.amount)}`}>
        {getAmountWithSign(item.amount)}
      </Text>
    </View>
  );
};
