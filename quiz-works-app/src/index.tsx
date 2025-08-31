import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from 'app/ui/App';
import { HomePage } from './pages/home'; // HomePage 컴포넌트 불러오기
import { QuizPage } from 'pages/quiz';
import { AuthPage } from 'pages/login';

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
        path: 'quiz/:quizId',
        element: <QuizPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);