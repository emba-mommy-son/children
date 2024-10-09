import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface AuthState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    set => ({
      accessToken: '',

      setAccessToken: accessToken => {
        set({accessToken});
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
