// AddFriendSkeleton.tsx
import {View} from 'react-native';

export function AddFriendResultSkeleton() {
  return (
    <View className="bg-gray-500 m-4 p-5 rounded-xl flex flex-col items-center justify-center space-y-4">
      {/* 프로필 이미지 스켈레톤 */}
      <View className="bg-gray-700 w-20 h-20 rounded-full" />

      {/* 이름 스켈레톤 */}
      <View className="bg-gray-700 w-32 h-6 rounded-lg" />

      {/* 버튼 스켈레톤 */}
      <View className="flex flex-row space-x-5">
        <View className="bg-gray-700 rounded-lg w-28 h-8" />
        <View className="bg-gray-700 rounded-lg w-28 h-8" />
      </View>
    </View>
  );
}
