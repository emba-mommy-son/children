import {View} from 'react-native';

function SkeletonItem() {
  return (
    <View className="bg-white p-4 mb-4 rounded-xl shadow-md shadow-black">
      {/* 날짜 스켈레톤 */}
      <View className="w-20 h-4 mb-2 rounded-md bg-gray-700" />

      <View className="flex-row items-center">
        {/* 아이콘 스켈레톤 */}
        <View className="w-6 h-6 mr-2 rounded-full bg-gray-700" />

        {/* 메시지 스켈레톤 */}
        <View className="flex-1 h-5 rounded-md bg-gray-700" />
      </View>
    </View>
  );
}
export function AlarmListSkeleton() {
  return (
    <View className="flex-1 p-8">
      {[...Array(10)].map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
}
