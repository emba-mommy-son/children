import {client} from '@/api/core/client';
import {BaseResponse} from '@/types/baseResponse';
import {UserInfo} from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useMemo, useState} from 'react';

const getUserInfo = async (): Promise<UserInfo> => {
  const response = await client.get<BaseResponse<UserInfo>>({url: '/users'});

  return response.data;
};

const useUser = () => {
  const [user, setUser] = useState<UserInfo | undefined>();
  const reward = useMemo(() => user?.reward, [user]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await getUserInfo();
    setUser(response);
    await AsyncStorage.setItem('userInfo1', JSON.stringify(response));
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const storedUser = await AsyncStorage.getItem('userInfo1');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        fetchUser();
      }
    };

    if (!user) {
      init();
    }
  }, []);

  return {user, reward, isLoading, refetch: fetchUser};
};

export default useUser;
