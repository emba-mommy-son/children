import * as KeyChain from 'react-native-keychain';
export interface LoginState {
  username: string; // id
  password: string;
}

export const useLogin = () => {
  const setLoginData = async ({username, password}: LoginState) => {
    try {
      await KeyChain.setGenericPassword(username, password);
      console.log('LoginData asyncStorage 저장 성공');
    } catch {
      console.log('LoginData asyncStorage 저장 실패');
    }
  };

  const getLoginData = async () => {
    try {
      const storedLoginData = await KeyChain.getGenericPassword();
      if (storedLoginData) {
        return {
          username: storedLoginData.username,
          password: storedLoginData.password,
        };
      }

      return null;
    } catch {
      console.log('LoginData asyncStorage 불러오기 실패');
      return null;
    }
  };

  return {setLoginData, getLoginData};
};
