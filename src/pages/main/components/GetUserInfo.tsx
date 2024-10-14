import {View} from 'react-native';
import {useGetUserInfo} from '@/api/user/useUserInfo';
import {useUserStore} from '@/store/useUserStore';

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
