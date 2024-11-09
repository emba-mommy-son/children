import {client} from '@/api/core/client';
import {useUserStore} from '@/store/useUserStore';
import {BaseResponse} from '@/types/baseResponse';
import {UserInfo} from '@/types/user';
import {useEffect, useState} from 'react';

const getUserInfo = async (): Promise<UserInfo> => {
  const response = await client.get<BaseResponse<UserInfo>>({url: '/users'});

  return response.data;
};

const useUser = () => {
  const {userInfo, setUserInfo} = useUserStore(state => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await getUserInfo();
    setUserInfo(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!userInfo) {
      fetchUser();
    }
  }, []);

  return {user: userInfo, isLoading, refetch: fetchUser};
};

export default useUser;
