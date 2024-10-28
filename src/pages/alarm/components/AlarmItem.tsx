import {Text, View, Image} from 'react-native';
import {Notification} from '@/types/notification';
import {formatDate} from '@/utils/formatDate';
import {ICONS} from '@/constants/icons';

export const AlarmItem: React.FC<{notification: Notification}> = ({
  notification,
}) => (
  <View className="bg-white p-4 mb-4 rounded-xl shadow-md shadow-black">
    <Text className="text-caption mb-2">
      {formatDate(notification.createdAt)}
    </Text>
    <View className="flex-row items-center">
      <Image
        source={ICONS.notification[notification.notificationType]}
        className="w-6 h-6 mr-2"
      />
      <Text className="text-subtitle">{notification.message}</Text>
    </View>
  </View>
);
