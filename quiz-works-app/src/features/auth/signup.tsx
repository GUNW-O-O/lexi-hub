import React, { useState } from 'react'
import { Button } from 'shared/ui/button/button';
import styles from './auth.module.css'
import { publicApi } from 'shared/api/api';


interface SingupFormProps {
  reqSingUp: () => void;
}

export const SignupForm: React.FC<SingupFormProps> = ({ reqSingUp }) => {

  const [id, setId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await publicApi.post('/auth/join', { id, password, nickname }); // 닉네임 전달
      alert('회원가입 성공!');
      reqSingUp();
    } catch (error) {
      console.error(error);
      alert('회원가입 실패');
    }
  }

  return (
    <div className={styles.authForm}>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <div className={styles.formGroup}>
          <input type="text" onChange={onChangeId} placeholder='아이디' />
          <input type="text" onChange={onChangeNickname} placeholder='닉네임' />
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
