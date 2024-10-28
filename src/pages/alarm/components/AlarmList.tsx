import {useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import {Notification} from '@/types/notification';
import {AlarmItem} from '@/pages/alarm/components/AlarmItem';
import {useGetNotifications, useUpdateNotifications} from '@/api/notification';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const EmptyAlarmList = () => (
  <View className="items-center gap-5">
    <IoniconsIcon name="notifications" size={50} />
    <Text className="text-subtitle">새로운 알림이 없습니다.</Text>
  </View>
);

export const AlarmList: React.FC = () => {
  const {data} = useGetNotifications();
  const {mutate: updateNotifications} = useUpdateNotifications();

  // 안읽은 알림만(read:false)인것만 표시
  const unreadNotifications = data.filter(
    (notification: Notification) => !notification.read,
  );

  useEffect(() => {
    return () => {
      // 안읽은 알림이 있는 경우에만 읽음처리 api 호출
      if (unreadNotifications.length > 0) {
        updateNotifications();
      }
    };
  }, []);

  const renderItem = ({item}: {item: Notification}) => (
    <AlarmItem notification={item} />
  );

  return (
    <FlatList
      data={unreadNotifications}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      className="flex-1 p-8"
      ListEmptyComponent={<EmptyAlarmList />}
      contentContainerStyle={
        unreadNotifications.length === 0
          ? {flex: 1, justifyContent: 'center'}
          : {paddingBottom: 32}
      }
    />
  );
};
