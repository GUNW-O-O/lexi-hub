// src/shared/ui/button/index.tsx
import React from 'react';
import { Link, To } from 'react-router-dom';
import styles from './button.module.css';

interface ButtonProps {
  text: string;
  to: To; // react-router-dom의 Link 컴포넌트 경로 타입
}

const Button: React.FC<ButtonProps> = ({ text, to }) => {
  return (
    <Link to={to}>
      <button className={styles.button}>{text}</button>
    </Link>
  );
};

export { Button };