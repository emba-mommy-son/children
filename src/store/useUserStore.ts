import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface UserStore {
  id: number;
  setId: (id: number) => void;
  username: string;
  setUsername: (username: string) => void;
  name: string;
  setName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  profileImage: string;
  setProfileImage: (profileImage: string) => void;
  reward: number;
  setReward: (rewardid: number) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    set => ({
      id: 0,
      setId: id => {
        set({id});
      },
      username: '',
      setUsername: username => {
        set({username});
      },
      name: '',
      setName: name => {
        set({name});
      },
      phoneNumber: '',
      setPhoneNumber: phoneNumber => {
        set({phoneNumber});
      },
      profileImage: '',
      setProfileImage: profileImage => {
        set({profileImage});
      },
      reward: 0,
      setReward: reward => {
        set({reward});
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
