import React, { useEffect, useState } from 'react';

// 엔티티와 공유 모듈에서 타입을 불러올 것입니다.
import type { Quiz } from 'entities/quiz'; 

export const QuizList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 퀴즈 목록을 백엔드에서 불러오는 로직
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:3000/quiz');
        const data: string[] = await response.json();
        
        // string[] 데이터를 Quiz[] 타입으로 변환
        const formattedQuizzes: Quiz[] = data.map((quiz, index) => ({
          id: String(index),
          title: quiz,
          content: '퀴즈 내용이 여기에 표시됩니다.', // 임시 내용
        }));
        setQuizzes(formattedQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, []);
  
  if (loading) {
    return <div>퀴즈를 불러오는 중입니다...</div>;
  }
  
  return (
    <div>
      <h2>퀴즈 목록</h2>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <strong>{quiz.title}</strong>
            <p>{quiz.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};