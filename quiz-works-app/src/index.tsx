import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from 'app/ui/App';
import { HomePage } from './pages/home'; // HomePage 컴포넌트 불러오기
import { AuthPage } from 'pages/login';
import { NoteNewPage } from 'pages/noteNewPage';
import { NoteTyping } from 'pages/noteTyping';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <AuthPage />,
      },
      {
        path: 'note/new',
        element: <NoteNewPage />,
      },
      {
        path: 'notes/:id',
        element: <NoteTyping/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);