import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface AuthState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  FCMToken: string;
  setFCMToken: (FCMToken: string) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    set => ({
      accessToken: '',

      setAccessToken: accessToken => {
        set({accessToken});
      },

      refreshToken: '',

      setRefreshToken: refreshToken => {
        set({refreshToken});
      },

      FCMToken: '',

      setFCMToken: FCMToken => {
        set({FCMToken});
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
