import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {UserInfo} from '@/types/user';

interface UserStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    set => ({
      userInfo: null,
      setUserInfo: userInfo => {
        set({userInfo});
      },
      clearUserInfo: () => {
        set({userInfo: null});
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
