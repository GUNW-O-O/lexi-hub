import React from 'react'
import styles from './header.module.css'
import { Button } from 'shared/ui/button/button'
import { useAuth } from 'shared/lib/context/authProvider'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {

  const { user, logout } = useAuth();

  return (
    <div className={styles.header}>
      <div className="logo">
        {/* <Button children='미정이' to='/' /> */}
        <Link to={'/'} style={{display: 'flex', alignItems: 'center'}}>
          <img src="/logo.png" alt="LexiHub" />
          <h2>LexiHub</h2>
        </Link>
      </div>
      <div className={styles.util}>
        {user ? (
          <>
            <p>안녕하세요 {user.nickname} 님</p>
            <div className="btn" onClick={logout}>로그아웃</div>
          </>
        ) : (
          <Button children='로그인' to='login' />
        )}
      </div>
    </div>
  )
}
