import {BaseResponse} from '@api/core/baseResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
} from 'axios';

export const BASE_URL = 'http://10.0.2.2:8080/api/v1';

// AxiosRequestConfig를 확장하여 헤더 타입 명시적으로 지정
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  // 기존에는 AxiosRequestHeaders | string[] 이지만 커스텀해서 명시적 지정
  headers: AxiosRequestHeaders;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 인터셉터
axiosInstance.interceptors.request.use(
  async (config: AdaptAxiosRequestConfig): Promise<AdaptAxiosRequestConfig> => {
    // asyncStorage에서 accessToken 가져오기
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      // 값이 있다면 그대로 사용, undefined나 null이면 빈 객체로 설정
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// // TODO : 일단 refreshToken은 나중에
// // 401오류가 발생하면 refreshToken을 사용해 토큰 재발급
axiosInstance.interceptors.response.use(
  // 응답이 성공적일 때는 그대로 반환
  response => response,

  // 에러가 발생한 경우
  async error => {
    const originalRequest = error.config;

    // 에러가 발생하면 토큰 갱신 시도
    // TODO: accessToken 만료 시 error code 확인 -> 지금은 401로 가정
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    try {
      // refreshToken으로 accessToken 재발급
      const refreshResponse = await axios.post(
        // !FIXME : refresh token url 이거 맞나
        // TODO : refreshToken을 어떻게 보내줄 지 확인 일단 쿠키는 아님
        `${BASE_URL}/auth/refresh`,
        {},
      );

      const {accessToken: newAccessToken} = refreshResponse.data;

      // 새로운 accessToken 저장
      await AsyncStorage.setItem('accessToken', newAccessToken);

      // 실패했던 요청을 다시 보내기
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // refreshToken도 만료된 경우 로그아웃 처리
      AsyncStorage.removeItem('accessToken');
      // !FIXME : 어디로 가야하죠
      return Promise.reject(refreshError);
    }
  },
);

// 여기서는 데이터를 한 겹 벗겨주는 작업
const createAxiosInstance = (instance: AxiosInstance, method: Method) => {
  return (config: AxiosRequestConfig): Promise<BaseResponse<any>> => {
    return instance
      .request({...config, method})
      .then(response => response.data);
  };
};

// client : 위 두개를 합쳐서 리턴
export const client = {
  get: createAxiosInstance(axiosInstance, 'get'),
  post: createAxiosInstance(axiosInstance, 'post'),
  put: createAxiosInstance(axiosInstance, 'put'),
  delete: createAxiosInstance(axiosInstance, 'delete'),
  patch: createAxiosInstance(axiosInstance, 'patch'),
};
