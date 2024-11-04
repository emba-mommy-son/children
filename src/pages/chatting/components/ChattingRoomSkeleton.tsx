import {ScrollView, View} from 'react-native';

const SkeletonMessage = ({isSend}: {isSend: boolean}) => {
  if (isSend) {
    return (
      <View className="flex flex-row justify-end items-end w-full mb-3 ml-auto space-x-2">
        <View className="w-8 h-3 bg-gray-300" />
        <View className="w-32 h-10 bg-gray-300 rounded-xl rounded-br-none" />
      </View>
    );
  }

  return (
    <View className="flex flex-row justify-start items-end space-x-2 w-full mb-3 mr-auto">
      <View className="w-32 h-10 bg-gray-300 rounded-xl rounded-tr-none" />
      <View className="w-8 h-3 bg-gray-300" />
    </View>
  );
};

export const ChattingRoomSkeleton = () => {
  return (
    <>
      {/* 헤더 */}
      <View className="flex flex-row items-center justify-between bg-gray-300 p-4">
        <View className="flex flex-row items-center space-x-3">
          <View className="w-5 h-5 bg-gray-400" />
          <View className="w-20 h-4 bg-gray-400" />
        </View>
        <View className="w-5 h-5 bg-gray-400" />
      </View>

      {/* 메시지 목록 */}
      <ScrollView className="flex flex-col my-5 p-4">
        {[...Array(8)].map((_, index) => (
          <SkeletonMessage key={index} isSend={index % 2 === 0} />
        ))}
      </ScrollView>

      {/* 입력창 */}
      <View className="flex flex-row items-center p-4 pt-2 space-x-3">
        <View className="bg-gray-300 flex-1 h-10 rounded-3xl" />
        <View className="w-6 h-6 bg-gray-300" />
      </View>
    </>
  );
};
