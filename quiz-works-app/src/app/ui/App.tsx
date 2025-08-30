import 'App.css'
import React from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/header/header';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </>
  )
}
