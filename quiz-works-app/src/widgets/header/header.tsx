import React from 'react'
import styles from './header.module.css'
import { Button } from 'shared/ui/button/button'

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="logo">
        <h1>123</h1>
      </div>
      <div className="util">
        <Button children='로그인' to='login' />
      </div>
    </div>
  )
}
