import {View} from 'react-native';

export function RewardContentSkeleton() {
  return (
    <View className="p-4 space-y-6">
      {/* 리워드 카드 */}
      <View className="bg-gray-700 w-full h-[120px] rounded-2xl" />

      {/* 월 선택 섹션 */}
      <View className="bg-gray-700 w-full h-[52px] rounded-lg" />

      {/* 리스트 */}
      <View className="space-y-2">
        {/* 첫번째 섹션 */}
        <View className="w-32 h-6 rounded bg-gray-700 mb-2 mt-4" />
        <View className="flex-row justify-between items-center py-4">
          <View className="flex-row items-center space-x-3">
            <View className="w-8 h-8 rounded-full bg-gray-700" />
            <View className="w-20 h-5 rounded bg-gray-700" />
          </View>
          <View className="w-16 h-5 rounded bg-gray-700" />
        </View>
        <View className="flex-row justify-between items-center py-4">
          <View className="flex-row items-center space-x-3">
            <View className="w-8 h-8 rounded-full bg-gray-700" />
            <View className="w-20 h-5 rounded bg-gray-700" />
          </View>
          <View className="w-16 h-5 rounded bg-gray-700" />
        </View>
        <View className="flex-row justify-between items-center py-4">
          <View className="flex-row items-center space-x-3">
            <View className="w-8 h-8 rounded-full bg-gray-700" />
            <View className="w-20 h-5 rounded bg-gray-700" />
          </View>
          <View className="w-16 h-5 rounded bg-gray-700" />
        </View>

        <View className="w-32 h-6 rounded bg-gray-700 mb-2 mt-4" />
        <View className="flex-row justify-between items-center py-4">
          <View className="flex-row items-center space-x-3">
            <View className="w-8 h-8 rounded-full bg-gray-700" />
            <View className="w-20 h-5 rounded bg-gray-700" />
          </View>
          <View className="w-16 h-5 rounded bg-gray-700" />
        </View>
        <View className="flex-row justify-between items-center py-4">
          <View className="flex-row items-center space-x-3">
            <View className="w-8 h-8 rounded-full bg-gray-700" />
            <View className="w-20 h-5 rounded bg-gray-700" />
          </View>
          <View className="w-16 h-5 rounded bg-gray-700" />
        </View>
      </View>
    </View>
  );
}
