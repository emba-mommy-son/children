import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginState {
  username: string; // id
  password: string;
}

export const setLoginData = async ({username, password}: LoginState) => {
  try {
    const LoginData = JSON.stringify({username, password});
    await AsyncStorage.setItem('LoginData', LoginData);
    console.log('LoginData asyncStorage 저장 성공');
  } catch {
    console.log('LoginData asyncStorage 저장 실패');
  }
};

export const getLoginData = async () => {
  try {
    const storedLoginData = await AsyncStorage.getItem('LoginData');

    if (storedLoginData == null) {
      return {
        password: 'password123!',
        username: 'rlaehdud1002',
      };
    }

    return JSON.parse(storedLoginData) as LoginState;
  } catch {
    console.log('LoginData asyncStorage 불러오기 실패');
    return null;
  }
};
