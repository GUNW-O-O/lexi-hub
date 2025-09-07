import React, { useState, useEffect, useRef } from 'react';
import s from './longformTyping.module.css';
import { useNavigate } from 'react-router-dom';
import { MongoFlashcard } from 'entities/flashcard/note';

interface TypingProps {
  note: MongoFlashcard;
}

export const LongformTyping: React.FC<TypingProps> = ({ note }) => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [strokesPerMinute, setStrokesPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isComplete, setIsComplete] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentDivRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const navigate = useNavigate();

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTyping) {
      interval = setInterval(() => setTimer(prevTime => prevTime + 1), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTyping]);

  // WPM and Strokes Per Minute Logic
  useEffect(() => {
    if (timer > 0) {
      const typedChars = typedText.length;
      const elapsedTimeInMinutes = timer / 60;
      setStrokesPerMinute(Math.round(typedChars / elapsedTimeInMinutes));
      const words = typedText.split(' ').filter(word => word !== '').length;
      setWpm(Math.round(words / elapsedTimeInMinutes));
    }
  }, [typedText, timer]);

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      setTimer(0);
    }
    setTypedText(value);

    let correctChars = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === note?.content[i]) {
        correctChars++;
      }
    }
    const currentAccuracy = value.length > 0 ? (correctChars / value.length) * 100 : 100;
    setAccuracy(currentAccuracy);
  };

  // 타이핑 완료 후 Enter 또는 Spacebar 감지
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' && typedText.length === 0) {
      e.preventDefault();
    }
    // 수정된 완료 로직
    if (typedText.length === note?.content.length) {
      if (e.key === 'Enter' || e.key === ' ') {
        setIsTyping(false);
        setIsComplete(true);
      }
    }
  };

  const handleReset = () => {
    setTypedText('');
    setIsTyping(false);
    setTimer(0);
    setWpm(0);
    setStrokesPerMinute(0);
    setAccuracy(100);
    setIsComplete(false);
  };

  // 수정된 커서 위치 보정 로직
  useEffect(() => {
    if (contentDivRef.current && cursorRef.current) {
      const typedIndex = typedText.length;
      const allSpansAndBrs = Array.from(contentDivRef.current.childNodes);

      if (typedIndex === 0) {
        const firstElement = allSpansAndBrs[0];
        if (firstElement instanceof HTMLElement) {
          cursorRef.current.style.left = `${firstElement.offsetLeft}px`;
          cursorRef.current.style.top = `${firstElement.offsetTop}px`;
          cursorRef.current.style.height = `${firstElement.offsetHeight}px`;
        }
      } else if (typedIndex > 0) {
        const lastElement = allSpansAndBrs[typedIndex - 1];
        if (lastElement instanceof HTMLElement) {
          if (lastElement.tagName === 'BR') {
            const nextElement = allSpansAndBrs[typedIndex];
            if (nextElement instanceof HTMLElement) {
              cursorRef.current.style.left = `${nextElement.offsetLeft}px`;
              cursorRef.current.style.top = `${nextElement.offsetTop}px`;
              cursorRef.current.style.height = `${nextElement.offsetHeight}px`;
            }
          } else {
            cursorRef.current.style.left = `${lastElement.offsetLeft + lastElement.offsetWidth}px`;
            cursorRef.current.style.top = `${lastElement.offsetTop}px`;
            cursorRef.current.style.height = `${lastElement.offsetHeight}px`;
          }
        }
      }
      contentDivRef.current.scrollTop = textareaRef.current!.scrollTop;
    }
  }, [typedText]);

  const renderText = () => {
    if (!note?.content) return null;
    const elements = note.content.split('').map((char, index) => {
      if (char === '\n') {
        return <br key={`br-${index}`} />;
      }

      const isTyped = typedText.length > index;
      const typedChar = typedText[index];

      let color = 'gray';
      let backgroundColor = 'transparent';

      if (isTyped) {
        if (index === typedText.length - 1) {
          color = 'white';
        } else {
          const isCorrect = typedChar === char;
          if (isCorrect) {
            color = 'white';
          } else {
            color = 'red';
            backgroundColor = 'rgba(255, 0, 0, 0.2)';
          }
        }
      }

      const contentToShow = (isTyped && typedChar !== undefined) ? typedChar : char;
      if (char === ' ') {
        if (isTyped && typedChar !== ' ') {
          backgroundColor = 'rgba(255, 0, 0, 0.2)';
          color = 'red';
        }
        return <span key={`char-${index}`} style={{ color, backgroundColor }}>&nbsp;</span>;
      }

      return <span key={`char-${index}`} style={{ color, backgroundColor }}>{contentToShow}</span>;
    });

    return (
      <>
        {elements}
        {/* 커서는 typedText의 길이와 상관없이 항상 렌더링되도록 처리 */}
        <span ref={cursorRef} className={s.cursor}></span>
      </>
    );
  };

  if (!note?.content) {
    return <div>내용을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.infoTitle}>
        <p className='subtitle'>📗 {note?.title}</p>
      </div>
      <div className={s.contentContainer}>
        {!isComplete ? (
          <>
            <p>타이머: {timer}초</p>
            <p>타수: {strokesPerMinute}</p>
            <p>WPM: {wpm}</p>
            <p>정확도: {accuracy.toFixed(2)}%</p>
            <div className={s.typingWrapper}>
              <div ref={contentDivRef} className={s.contentDisplay}>
                {renderText()}
              </div>
              <textarea
                ref={textareaRef}
                value={typedText}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                className={s.typingInput}
                autoFocus
              />
            </div>
            <button className='btn' onClick={() => navigate(-1)}>뒤로가기</button>
          </>
        ) : (
          <div className={s.resultsWrapper}>
            <h3>{note.title} 타이핑 완료!</h3>
            <p>최종 타수: {strokesPerMinute}</p>
            <p>최종 WPM: {wpm}</p>
            <p>소요 시간: {timer}초</p>
            <p>정확도: {accuracy.toFixed(2)}%</p>
            <div className={s.resultsButtons}>
              <button className='btn' onClick={handleReset}>다시하기</button>
              <button className='btn' onClick={() => navigate(-1)}>뒤로가기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};