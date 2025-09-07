import React, { useState } from 'react'
import { Button } from 'shared/ui/button/button';
import styles from './auth.module.css'
import { publicApi } from 'shared/api/api'; // publicApi 임포트
import { useAuth } from 'shared/lib/context/authProvider'; // useAuth 훅 임포트
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  reqSingUp: () => void;
  // handleLogin: ({id, password}: {id: string, password: string}) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ reqSingUp }) => {

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, user } = useAuth(); // useAuth 훅 사용

  const navigate = useNavigate();



  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 1. 로그인 요청
      const res = await publicApi.post('/auth/login', { id, password });
      const { accessToken } = res.data;

      // 2. Context API를 통해 인증 상태 전역 업데이트
      login(accessToken);
      console.log('로그인 성공',user)
      // TODO: 로그인 성공 후 페이지 이동 로직 추가 (예: 홈 페이지)
      navigate('/');

    } catch (error) {
      console.error('로그인 실패:', error);
      // 로그인 실패 시 사용자에게 피드백 제공
    }
  }

  return (
    <div className={styles.authForm}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <input type="text" onChange={onChangeId} placeholder='아이디' />
          <input type="password" onChange={onChangePassword} placeholder='비밀번호' />
        </div>
      <div className={styles.btnGroup}>
        <button className='btn' type='submit'>로그인</button>
        <Button to='#'>계정찾기</Button>
      </div>
      </form>
      <p>계정이 없으신가요?</p>
      <Button to='#' onClick={reqSingUp}>회원가입</Button>
    </div>
  )
}
