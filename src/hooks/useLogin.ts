import AsyncStorage from '@react-native-async-storage/async-storage';
import crypto from 'crypto';

export interface LoginState {
  username: string; // id
  password: string;
}

const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPT_SECRET_KEY as string;
const iv = process.env.ENCRYPT_IV_KEY as string;

const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (text: string) => {
  const diecipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = diecipher.update(text, 'hex', 'utf8');
  decrypted += diecipher.final('utf8');
  return decrypted;
};

export const useLogin = () => {
  const setLoginData = async ({username, password}: LoginState) => {
    try {
      const encryptedUsername = encrypt(username);
      const encryptedPassword = encrypt(password);

      const LoginData = JSON.stringify({
        username: encryptedUsername,
        password: encryptedPassword,
      });
      await AsyncStorage.setItem('LoginData', LoginData);
      console.log('LoginData asyncStorage 저장 성공');
    } catch {
      console.log('LoginData asyncStorage 저장 실패');
    }
  };

  const getLoginData = async () => {
    try {
      const storedLoginData = await AsyncStorage.getItem('LoginData');

      if (storedLoginData == null) {
        return {
          username: 'rlaehdud1002',
          password: 'password123!',
        };
      }

      const loginDataObject = JSON.parse(storedLoginData);
      const decryptedUsername = decrypt(loginDataObject.username);
      const decryptedPassword = decrypt(loginDataObject.password);

      return {decryptedUsername, decryptedPassword};
    } catch {
      console.log('LoginData asyncStorage 불러오기 실패');
      return null;
    }
  };

  return {setLoginData, getLoginData};
};
