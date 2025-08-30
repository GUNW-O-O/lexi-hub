// src/shared/ui/button/index.tsx
import React from 'react';
import { Link, To } from 'react-router-dom';
import styles from './button.module.css';

interface ButtonProps {
  to: To; // react-router-dom의 Link 컴포넌트 경로 타입
  // `children` prop을 받아들이도록 수정
  children: React.ReactNode; 
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, to, onClick }) => {
  return (
    <Link to={to}>
      <button className='btn' onClick={onClick} >{children}</button>
    </Link>
  );
};

export { Button };