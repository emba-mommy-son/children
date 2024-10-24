import {useAuthStore} from '@/store/useAuthStore';
import axios, {AxiosInstance, AxiosRequestConfig, Method} from 'axios';

const BASE_URL = 'https://www.mommy-son.kro.kr/api/v1';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 인터셉터
axiosInstance.interceptors.request.use(
  async config => {
    // asyncStorage에서 accessToken 가져오기
    const accessToken = await useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const {setAccessToken, setRefreshToken} = useAuthStore.getState();
const clearUseAuthStore = useAuthStore.persist.clearStorage;

// 401오류가 발생하면 refreshToken을 사용해 토큰 재발급
axiosInstance.interceptors.response.use(
  // 응답이 성공적일 때는 그대로 반환
  response => response.data,

  // 에러가 발생한 경우
  async error => {
    const originalRequest = error.config;
    // 에러가 발생하면 토큰 갱신 시도
    // TODO: accessToken 만료 시 error code 확인 -> 지금은 401로 가정
    if (error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = useAuthStore.getState().refreshToken;

      // refreshToken으로 accessToken 재발급
      const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const {
        data: {accessToken: newAccessToken, refreshToken: newRefreshToken},
      } = refreshResponse.data;

      // 새로운 accessToken, refreshToken 저장
      await setAccessToken(newAccessToken);
      await setRefreshToken(newRefreshToken);

      // 실패했던 요청을 다시 보내기
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axios(originalRequest);
    } catch (refreshError) {
      // refreshToken도 만료된 경우 로그아웃 처리
      clearUseAuthStore();
      // !FIXME : 어디로 가야하죠
      return Promise.reject(refreshError);
    }
  },
);

const createAxiosInstance =
  (instance: AxiosInstance, method: Method) =>
  <T>(config: AxiosRequestConfig): Promise<T> => {
    return instance({
      ...config,
      method,
    });
  };

// HTTP 메소드들을 상수로 정의해서 타입 안정성, 오타 방지
const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
} as const;

// client : 위 두개를 합쳐서 리턴
export const client = {
  get: createAxiosInstance(axiosInstance, HTTP_METHODS.GET),
  post: createAxiosInstance(axiosInstance, HTTP_METHODS.POST),
  put: createAxiosInstance(axiosInstance, HTTP_METHODS.PATCH),
  delete: createAxiosInstance(axiosInstance, HTTP_METHODS.DELETE),
  patch: createAxiosInstance(axiosInstance, HTTP_METHODS.PATCH),
};
