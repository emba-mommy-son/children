import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:8080',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// instance.interceptors.request.use(async config => {
//   const accessToken = localStorage.getItem('accessToken');
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

export default instance;
