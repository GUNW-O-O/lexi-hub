// src/shared/lib/context/auth-provider.tsx
import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { privateApi } from 'shared/api/api';

interface AuthContextType {
  user: { id: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<{ id: string } | null>(null);

  const login = (token: string) => {
    // 토큰을 로컬 스토리지에 저장 (나중에 복구 가능)
    localStorage.setItem('accessToken', token);
    // TODO: 토큰에서 사용자 정보 추출 (예: jwt-decode 라이브러리)
    const decodedUser = { id: 'test' }; // 임시
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  // 컴포넌트 마운트 시 로컬 스토리지에서 토큰 복구
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const verifyToken = async () => {
        try {
          // publicApi 대신 privateApi를 사용
          const res = await privateApi.get('/auth/me'); // 예시: 현재 사용자 정보 요청 API
          const verifiedUser = res.data;
          setUser(verifiedUser);
        } catch (error) {
          console.error('토큰 검증 실패:', error);
          logout();
        }
      };
      verifyToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};