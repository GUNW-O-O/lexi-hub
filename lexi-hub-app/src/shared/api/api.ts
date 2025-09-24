import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie, setCookie } from "shared/lib/cookie/cookieUtil";

export const publicApi = axios.create({
  baseURL: '/api',
  withCredentials: true
})
export const privateApi = axios.create({
  baseURL: 'http://13.125.210.135:3000/api',
  withCredentials: true
})

// 요청 인터셉터를 사용하여 토큰을 동적으로 추가
privateApi.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken'); // 또는 쿠키 등에서 가져옴
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 응답 인터셉터: 토큰 갱신 처리
privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    // 에러가 401이고, 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청합니다.
        // 브라우저가 HttpOnly 리프레시 토큰 쿠키를 자동으로 보냅니다.
        const res = await axios.post('/api/auth/refresh-token');
        const newAccessToken = res.data.accessToken;

        // 새로운 액세스 토큰을 저장합니다.
        setCookie('accessToken', newAccessToken, 60);

        // 원래 요청의 헤더를 업데이트하고 재시도합니다.
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 요청이 실패하면 (예: 리프레시 토큰도 만료),
        // 사용자는 다시 로그인해야 합니다.
        console.error('리프레시 토큰 갱신 실패. 로그아웃합니다.');
        deleteCookie('accessToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);