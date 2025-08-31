import 'App.css'
import React from 'react'
import { Outlet } from 'react-router-dom';
import { AuthProvider } from 'shared/lib/context/authProvider';
import { Header } from 'widgets/header/header';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </AuthProvider>
  )
}
