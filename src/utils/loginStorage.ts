import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginState {
  password: string;
  phoneNumber: string;
  name: string;
  username: string;
}

export const setLoginData = async ({
  password,
  phoneNumber,
  name,
  username,
}: LoginState) => {
  try {
    const LoginData = JSON.stringify({password, phoneNumber, name, username});
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
        phoneNumber: '010-1234-5678',
        name: '김도영',
        username: 'rlaehdud1002',
      };
    }

    return JSON.parse(storedLoginData) as LoginState;
  } catch {
    console.log('LoginData asyncStorage 불러오기 실패');
    return null;
  }
};
