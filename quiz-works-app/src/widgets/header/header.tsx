import React from 'react'
import styles from './header.module.css'
import { Button } from 'shared/ui/button/button'

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="logo">123</div>
      <div className="util">
        <Button text='로그인' to='login' />
      </div>
    </div>
  )
}
