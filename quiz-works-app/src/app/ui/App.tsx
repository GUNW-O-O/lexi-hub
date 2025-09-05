import 'App.css'
import React from 'react'
import { Outlet } from 'react-router-dom';
import { AuthProvider } from 'shared/lib/context/authProvider';
import { Header } from 'widgets/header/header';
import 'react-loading-skeleton/dist/skeleton.css';
import { NoteList } from 'widgets/sideNoteList/noteList';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <div className='container'>
        <NoteList />
        <Outlet />
      </div>
    </AuthProvider>
  )
}
