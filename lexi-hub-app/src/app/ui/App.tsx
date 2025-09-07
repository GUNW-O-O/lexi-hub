import 'App.css'
import React, { useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from 'shared/lib/context/authProvider';
import { Header } from 'widgets/header/header';
import 'react-loading-skeleton/dist/skeleton.css';
import { NoteList } from 'widgets/sideNoteList/noteList';

export const App: React.FC = () => {

  const location = useLocation();
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <AuthProvider>
      <Header />
      <div className='container' ref={parentRef}>
        {location.pathname !== '/login' && (
          <NoteList parentRef={parentRef} />
        )}
        <Outlet />
      </div>
    </AuthProvider>
  )
}
