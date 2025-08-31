import React, { useState } from 'react'
import { Button } from 'shared/ui/button/button';
import styles from './auth.module.css'


interface SingupFormProps {
  reqSingUp: () => void;
  signup: ({id, password}: {id: string, password: string}) => void;
}

export const SignupForm: React.FC<SingupFormProps> = ({ reqSingUp, signup }) => {

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSingup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({id, password});
  }

  return (
    <div className={styles.authForm}>
      <h2>회원가입</h2>
      <form onSubmit={handleSingup}>
        <div className={styles.formGroup}>
          <input type="text" onChange={onChangeId} placeholder='아이디' />
          <input type="password" onChange={onChangePassword} placeholder='비밀번호' />
        </div>
      <div className={styles.btnGroup}>
        <button className='btn' type='submit'>회원가입</button>
        <Button to='#'>계정찾기</Button>
      </div>
      </form>
      <p>취소</p>
      <Button to='#' onClick={reqSingUp}>취소</Button>
    </div>
  )
}
