import React from 'react';
import { QuizList } from 'widgets/quiz-list'; // QuizList 위젯을 불러오기

export const HomePage = () => {
  return (
    <div>
      <h1>타자 연습 사이트</h1>
      <QuizList />
    </div>
  );
};