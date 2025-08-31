import axios from "axios";

export const publicApi = axios.create({
  baseURL: '/api',
  withCredentials: true
})
export const privateApi = axios.create({
  baseURL: '/api',
  withCredentials: true
})

// 요청 인터셉터를 사용하여 토큰을 동적으로 추가
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 또는 쿠키 등에서 가져옴
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);