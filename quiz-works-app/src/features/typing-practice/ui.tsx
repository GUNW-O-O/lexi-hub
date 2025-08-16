// quiz-works-app/src/features/typing-practice/ui.tsx

import React, { useState } from 'react';
import { checkTypingProgress } from './model'; // 모델 로직을 가져옵니다.

interface TypingPracticeProps {
  quizText: string;
}

export const TypingPractice: React.FC<TypingPracticeProps> = ({ quizText }) => {
  const [userInput, setUserInput] = useState('');
  const [progress, setProgress] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setUserInput(newText);
    
    // 모델 로직을 호출하여 진행도를 계산합니다.
    const newProgress = checkTypingProgress(quizText, newText);
    setProgress(newProgress);
  };

  return (
    <div>
      <h3>타이핑할 내용:</h3>
      <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
        {quizText}
      </div>
      
      <h3>내 입력:</h3>
      <textarea
        value={userInput}
        onChange={handleInputChange}
        style={{ width: '100%', minHeight: '100px', fontSize: '1rem' }}
      />
      
      <p>진행도: {progress.toFixed(2)}%</p>
    </div>
  );
};