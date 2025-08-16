// quiz-works-app/src/pages/quiz.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Quiz } from 'entities/quiz';
import { TypingPractice } from 'features/typing-practice/ui'; // TypingPractice 컴포넌트를 가져옵니다.

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:3000/quiz/${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }
        const data: Quiz = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  if (loading) {
    return <div>퀴즈를 불러오는 중입니다...</div>;
  }

  if (!quiz) {
    return <div>퀴즈를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      {/* 여기에 TypingPractice 컴포넌트를 추가하고, quiz.content를 props로 전달합니다. */}
      <TypingPractice quizText={quiz.content} />
    </div>
  );
};