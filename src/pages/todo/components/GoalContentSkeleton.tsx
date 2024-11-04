import {View} from 'react-native';

export const GoalContentSkeleton = () => {
  return (
    <View className="mt-3">
      {/* 목표 */}
      <View className="bg-gray-700 rounded-xl w-full h-40" />

      {/* 목표 갯수 */}
      <View className="flex flex-row itmes-center justify-center space-x-3 mt-3">
        <View className="bg-gray-700 rounded-xl w-[47%] h-20" />
        <View className="bg-gray-700 rounded-xl w-[47%] h-20" />
      </View>

      {/* Todo, Complete */}
      <View className="bg-gray-700 rounded-xl w-full h-60 mt-3" />
    </View>
  );
};
