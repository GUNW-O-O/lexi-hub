import 'App.css'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from 'shared/lib/context/authProvider';
import { Header } from 'widgets/header/header';
import 'react-loading-skeleton/dist/skeleton.css';
import { NoteList } from 'widgets/sideNoteList/noteList';

export const App: React.FC = () => {

  const location = useLocation();

  return (
    <AuthProvider>
      <Header />
      <div className='container'>
        {location.pathname !== '/login' && (
          <NoteList />
        )}
        <Outlet />
      </div>
    </AuthProvider>
  )
}
