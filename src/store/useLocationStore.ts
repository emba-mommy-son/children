import {Location} from '@/types/location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface LocationState {
  createdAt: Date;
  setCreatedAt: (createdAt: Date) => void;
  location: Location | null;
  setLocation: (location: Location) => void;
  locationIds: number[];
  setLocationIds: (locationIds: number[]) => void;
}

export const useLocationStore = create(
  persist<LocationState>(
    set => ({
      createdAt: new Date(),

      setCreatedAt: createdAt => {
        set({createdAt});
      },

      location: null,

      setLocation: location => {
        set({location});
      },

      locationIds: [],

      setLocationIds: locationIds => {
        set({locationIds});
      },
    }),
    {
      name: 'location-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
