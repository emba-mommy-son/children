// ChattingSkeleton.tsx
import {FlatList, View} from 'react-native';

const SkeletonItem = () => (
  <View className="flex flex-row items-center py-4 border-b-[1px] border-gray-700 space-x-4">
    {/* 프로필 이미지 스켈레톤 */}
    <View className="w-12 h-12 rounded-full bg-gray-700" />

    <View className="space-y-2 flex-1">
      <View className="flex flex-row justify-between items-center">
        {/* 이름 스켈레톤 */}
        <View className="w-20 h-4 rounded bg-gray-700" />
        {/* 읽음 표시 스켈레톤 */}
        <View className="w-2 h-2 rounded-full bg-gray-700" />
      </View>

      <View className="flex flex-row justify-between items-center">
        {/* 메시지 스켈레톤 */}
        <View className="w-40 h-4 rounded bg-gray-700" />
        {/* 시간 스켈레톤 */}
        <View className="w-12 h-3 rounded bg-gray-700" />
      </View>
    </View>
  </View>
);

export const ChattingListSkeleton = () => {
  const skeletonData = Array.from({length: 8}, (_, i) => i);

  return (
    <FlatList
      data={skeletonData}
      renderItem={() => <SkeletonItem />}
      keyExtractor={item => item.toString()}
      className="flex-1 px-8 pb-4"
    />
  );
};
