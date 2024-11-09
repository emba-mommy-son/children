import {useGetUserInfo} from '@/api/user';
import {useUserStore} from '@/store/useUserStore';
import {useEffect} from 'react';

export const useStoreUserInfo = () => {
  const setUserInfo = useUserStore(state => state.setUserInfo);

  const storeUserInfo = () => {
    const {data: userInfo, isLoading, isError} = useGetUserInfo();
    console.log('storeUserInfo 안');

    useEffect(() => {
      if (userInfo) {
        console.log('hook userInfo', userInfo);
        setUserInfo(userInfo);
      }
    }, [userInfo, setUserInfo]);
  };

  return {storeUserInfo};
};
