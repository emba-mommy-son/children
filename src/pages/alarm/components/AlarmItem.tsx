import {Text, View, Image} from 'react-native';
import {Notification, NotificationType} from '@/types/notification';
import {formatDate} from '@/utils/formatDate';

const notificationIcons = {
  [NotificationType.HEALTH]: require('@/assets/icons/notification/health.png'),
  [NotificationType.NOTICE]: require('@/assets/icons/notification/notice.png'),
  [NotificationType.REWARD]: require('@/assets/icons/notification/reward.png'),
  [NotificationType.FRIENDS]: require('@/assets/icons/notification/friends.png'),
  [NotificationType.LOCATION]: require('@/assets/icons/notification/location.png'),
};

const getNotificationIcon = (type: NotificationType) => {
  return notificationIcons[type];
};

export const AlarmItem: React.FC<{notification: Notification}> = ({
  notification,
}) => (
  <View className="bg-white p-4 mb-4 rounded-xl shadow-md shadow-black">
    <Text className="text-caption mb-2">
      {formatDate(notification.createdAt)}
    </Text>
    <View className="flex-row items-center">
      <Image
        source={getNotificationIcon(notification.notificationType)}
        className="w-6 h-6 mr-2"
      />
      <Text className="text-subtitle">{notification.message}</Text>
    </View>
  </View>
);
