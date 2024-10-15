import {View} from 'react-native';
import {useUserStore} from '@/store/useUserStore';
import {useGetUserInfo} from '@/api/user';

export const GetUserInfo = () => {
  const {data: userData, isLoading, isError} = useGetUserInfo();
  const {
    setId,
    setUsername,
    setName,
    setPhoneNumber,
    setProfileImage,
    setReward,
  } = useUserStore.getState();

  if (isLoading) {
    return <View></View>;
  }

  if (isError) {
    return <View></View>;
  }

  if (userData) {
    setId(userData.id);
    setUsername(userData.username);
    setName(userData.name);
    setPhoneNumber(userData.phoneNumber);
    setProfileImage(userData.profileImage);
    setReward(userData.reward);
  }

  return <View></View>;
};
