import {View} from 'react-native';
import {useEffect} from 'react';
import {useUserStore} from '@/store/useUserStore';
import {useGetUserInfo} from '@/api/user';

export const GetUserInfo = () => {
  const {data: userInfo, isLoading, isError} = useGetUserInfo();
  const setUserInfo = useUserStore(state => state.setUserInfo);

  // 시간없어서 못바꿈 진짜 무조건 바꿔야되는데 여기
  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo, setUserInfo]);

  if (isLoading) {
    return <View></View>;
  }

  if (isError) {
    return <View></View>;
  }

  return <View></View>;
};
