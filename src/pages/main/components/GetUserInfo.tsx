import {View} from 'react-native';
import {useUserStore} from '@/store/useUserStore';
import {useGetUserInfo} from '@/api/user';

export const GetUserInfo = () => {
  const {data: userInfo, isLoading, isError} = useGetUserInfo();
  const setUserInfo = useUserStore(state => state.setUserInfo);

  if (isLoading) {
    return <View></View>;
  }

  if (isError) {
    return <View></View>;
  }

  if (userInfo) {
    setUserInfo(userInfo);
  }

  return <View></View>;
};
