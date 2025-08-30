import React from 'react'
import { Button } from 'shared/ui/button/button';
import styles from './auth.module.css'


interface LoginFormProps {
  reqSingUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ reqSingUp }) => {
  return (
    <div className={styles.authForm}>
      <h2>로그인</h2>
      <form action="">
        <div className={styles.formGroup}>
          <input type="text" name="" id="" />
          <input type="password" name="" id="" />
        </div>
      </form>
      <div className={styles.btnGroup}>
        <button className='btn' type='submit'>로그인</button>
        <Button to='#'>계정찾기</Button>
      </div>
      <p>계정이 없으신가요?</p>
      <Button to='#' onClick={reqSingUp}>회원가입</Button>
    </div>
  )
}
