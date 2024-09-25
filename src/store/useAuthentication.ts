import {create} from 'zustand';

const useAuthentication = create(set => ({
  accessToken: '',
  refreshToken: '',
  setAccessToken: (accessToken: string) => set({accessToken}),
  setRefreshToken: (refreshToken: string) => set({refreshToken}),
}));

export default useAuthentication;
