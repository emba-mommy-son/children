import {View} from 'react-native';

function FriendItemSkeleton() {
  return (
    <View className="bg-white flex flex-row items-center py-5 border-b-[1px] border-gray-700 space-x-6">
      {/* 프로필 이미지 스켈레톤 */}
      <View className="w-16 h-16 rounded-full bg-gray-700" />
      {/* 이름 스켈레톤 */}
      <View className="bg-gray-700 h-6 rounded-lg flex-1 max-w-[200px]" />
    </View>
  );
}

export function FriendListSkeleton() {
  return (
    <View className="px-8">
      {[...Array(8)].map((_, index) => (
        <FriendItemSkeleton key={index} />
      ))}
    </View>
  );
}
