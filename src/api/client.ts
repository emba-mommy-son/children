import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://10.0.2.2:8080',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// 인터셉터
instance.interceptors.request.use(
  async config => {
    const accessToken = AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 401오류가 발생하면 refreshToken을 사용해 토큰 재발급
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401에러가 발생하면 토큰 갱신 시도
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    try {
      const refreshResponse = await axios.post(
        // !FIXME : refresh token url 이거 맞나
        'http://10.0.2.2:8080/auth/refresh',
        {},
        {
          withCredentials: true,
        },
      );

      const {accessToken: newAccessToken} = refreshResponse.data;

      // 새로운 accessToken 저장
      await AsyncStorage.setItem('accessToken', newAccessToken);

      // 실패했던 요청을 다시 보내기
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return instance(originalRequest);
    } catch (refreshError) {
      // refreshToken도 만료된 경우 로그아웃 처리
      AsyncStorage.removeItem('accessToken');
      // !FIXME : 어디로 가야하죠
      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  },
);
