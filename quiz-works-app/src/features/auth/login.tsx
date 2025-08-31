import React, { useState } from 'react'
import { Button } from 'shared/ui/button/button';
import styles from './auth.module.css'


interface LoginFormProps {
  reqSingUp: () => void;
  login: ({id, password}: {id: string, password: string}) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ reqSingUp, login }) => {

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({id, password});
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
