// src/shared/lib/context/auth-provider.tsx
import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { jwtDecode } from 'jwt-decode';
import { privateApi } from 'shared/api/api';

// JWT 페이로드 타입을 정의합니다.
interface JwtPayload {
  sub: string;
  nickname: string; // 닉네임 필드를 추가합니다.
}
interface AuthContextType {
  user: { id: string; nickname: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; nickname: string } | null>(null);

  const login = (token: string) => {
    // 토큰을 로컬 스토리지에 저장 (나중에 복구 가능)
    localStorage.setItem('accessToken', token);

    const decodedToken = jwtDecode<JwtPayload>(token);
    const userId = decodedToken.sub;
    const userNickname = decodedToken.nickname;

    const decodedUser = { id: userId, nickname: userNickname };
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
          const decodedToken = jwtDecode<JwtPayload>(token);
          const userNickname = decodedToken.nickname;
          setUser({ id: decodedToken.sub, nickname: userNickname });
        } catch (error) {
          console.error('토큰 유효성 검사 실패:', error);
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