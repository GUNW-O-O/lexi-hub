// quiz-works-app/src/widgets/quiz-list.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Quiz } from '../entities/quiz'; // FSD가 아니므로 경로를 상대경로로 수정합니다.

export const QuizList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:3000/quiz');
        const data: { id: string, title: string }[] = await response.json();
        
        // 데이터 구조가 변경되었으므로 타입과 로직을 수정합니다.
        const formattedQuizzes: Quiz[] = data.map((quiz) => ({
          id: quiz.id,
          title: quiz.title,
          content: '퀴즈 내용이 여기에 표시됩니다.', 
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
          <Link key={quiz.id} to={`/quiz/${quiz.id}`}>
            <li>
              {/* === 여기를 수정해야 합니다. === */}
              {/* 기존: <li>{quiz}</li> 또는 <li>{quiz.title}</li> */}
              {/* 수정: <li><p><strong>{quiz.title}</strong></p></li> 와 같이 텍스트를 명확하게 렌더링 */}
              <strong>{quiz.title}</strong>
              <p>{quiz.content}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};