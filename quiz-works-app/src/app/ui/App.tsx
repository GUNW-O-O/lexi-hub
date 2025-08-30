import React from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/header/header';

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
