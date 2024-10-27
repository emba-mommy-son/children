import {View} from 'react-native';

function SkeletonItem() {
  return (
    <View className="flex flex-row items-center justify-between py-3 px-4 mb-1">
      <View className="flex flex-row items-center justify-between space-x-5">
        {/* 순위 아이콘/숫자 스켈레톤 */}
        <View className="w-12 h-12 rounded-full bg-gray-700" />

        {/* 프로필 이미지 스켈레톤 */}
        <View className="W-16 h-16 rounded-full bg-gray-700" />

        {/* 이름 스켈레톤 */}
        <View className="w-32 h-6 rounded-lg bg-gray-700" />
      </View>

      {/* 우정 지수 스켈레톤 */}
      <View className="w-12 h-6 rounded-lg bg-gray-700" />
    </View>
  );
}

export function FriendRankListSkeleton() {
  return (
    <View className="flex-1 px-4 pb-4">
      {[...Array(10)].map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
}
