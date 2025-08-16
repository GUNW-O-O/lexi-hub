import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home'; // HomePage 컴포넌트 불러오기
import { QuizPage } from 'pages/quiz';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/quiz/:quizId', // 퀴즈 상세 페이지를 위한 동적 경로를 추가합니다.
    element: <QuizPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);