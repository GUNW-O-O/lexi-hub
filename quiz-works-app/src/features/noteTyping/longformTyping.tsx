import React, { useState, useEffect, useRef } from 'react';
import s from './longformTyping.module.css';
import { MongoFlashcard } from 'entities/flashcard/note';

interface LongformTypingProps {
  note: MongoFlashcard
}

export const LongformTyping: React.FC<LongformTypingProps> = ({ note }) => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [strokesPerMinute, setStrokesPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTyping && timer >= 0) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isTyping && typedText.length === note.content.length && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTyping, timer, typedText.length, note.content.length]);

  useEffect(() => {
    if (timer > 0 && isTyping) {
      const typedChars = typedText.length;
      const elapsedTimeInMinutes = timer / 60;
      
      const currentStrokesPerMinute = Math.round(typedChars / elapsedTimeInMinutes);
      const words = typedText.split(' ').filter(word => word !== '').length;
      const currentWPM = Math.round(words / elapsedTimeInMinutes);
      
      setStrokesPerMinute(currentStrokesPerMinute);
      setWpm(currentWPM);
    } else if (typedText.length === note.content.length && timer > 0) {
      const typedChars = typedText.length;
      const elapsedTimeInMinutes = timer / 60;
      const words = typedText.split(' ').filter(word => word !== '').length;
      setStrokesPerMinute(Math.round(typedChars / elapsedTimeInMinutes));
      setWpm(Math.round(words / elapsedTimeInMinutes));
    }
  }, [typedText, timer, isTyping, note.content.length]);

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      setTimer(0);
    }

    if (value.length > note.content.length) {
      return;
    }
    
    setTypedText(value);

    let correctChars = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === note.content[i]) {
        correctChars++;
      }
    }
    const currentAccuracy = value.length > 0 ? (correctChars / value.length) * 100 : 100;
    setAccuracy(currentAccuracy);
    
    if (value.length === note.content.length) {
      setIsTyping(false);
    }
  };

  const isHangulChar = (char: string) => {
      if (!char) return false;
      const code = char.charCodeAt(0);
      // '가' ~ '힣' 범위
      return code >= 0xAC00 && code <= 0xD7A3;
  };

  const renderText = () => {
      return note.content.split('').map((char, index) => {
          let color = 'gray';
          const typedChar = typedText[index];
          const isTypingNow = index === typedText.length - 1;

          if (index < typedText.length) {
              // 입력된 글자가 원본과 일치하는지 확인
              if (typedChar === char) {
                  color = 'green';
              } else {
                  // 한글 입력 중인 불완전한 글자인 경우
                  if (isTypingNow && isHangulChar(note.content[index]) && !isHangulChar(typedChar)) {
                      color = 'black'; // 조합 중인 글자는 오타로 간주하지 않고 커서가 보이도록 검은색으로 표시
                  } else {
                      color = 'red'; // 오타
                  }
              }
          }
          return <span key={index} style={{ color }}>{char}</span>;
      });
  };

  useEffect(() => {
    if (textareaRef.current && contentDivRef.current) {
      const textarea = textareaRef.current;
      const contentDiv = contentDivRef.current;
      contentDiv.scrollTop = textarea.scrollTop;
    }
  }, [typedText]);

  return (
    <div className={s.container}>
      <p>타이머: {timer}초</p>
      <p>타수: {strokesPerMinute}</p>
      <p>WPM: {wpm}</p>
      <p>정확도: {accuracy.toFixed(2)}%</p>

      <div style={{ position: 'relative', width: '100%', height: '300px', marginBottom: '20px' }}>
        <div 
          ref={contentDivRef}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: '10px',
            border: '1px solid #ccc', zIndex: 1, whiteSpace: 'pre-wrap', overflowY: 'auto',
            lineHeight: '1.5', fontSize: '16px', boxSizing: 'border-box'
          }}
        >
          {renderText()}
        </div>
        <textarea
          ref={textareaRef}
          value={typedText}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && typedText.length === 0) {
              e.preventDefault();
            }
          }}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: '10px',
            border: '1px solid #ccc', background: 'transparent', color: 'transparent',
            caretColor: 'black', zIndex: 2, lineHeight: '1.5', fontSize: '16px',
            resize: 'none', overflowY: 'auto', boxSizing: 'border-box'
          }}
          autoFocus
        />
      </div>
    </div>
  );
};