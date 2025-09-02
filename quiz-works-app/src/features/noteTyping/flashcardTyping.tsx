import React, { useEffect, useState, useRef } from 'react';
import s from './typing.module.css';
import { useParams } from 'react-router-dom';
import { privateApi } from 'shared/api/api';
import { FlashcardItem } from 'entities/flashcard/note';

export const FlashcardTyping: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cards, setCards] = useState<FlashcardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const currentCard = cards[currentIndex];

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const getNoteById = async () => {
      try {
        setLoading(true);
        const res = await privateApi.get(`/notes/typing/${id}`);
        const shuffledCards = res.data.flashcards.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
      } catch (error) {
        alert('초기 로딩 실패');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNoteById();
  }, [id]);

  useEffect(() => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (textRef.current && currentCard) {
      const pElement = textRef.current;
      const spans = Array.from(pElement.children) as HTMLElement[];
      let cursorLeft = 0;
      
      for (let i = 0; i < inputValue.length; i++) {
        if (spans[i]) {
          cursorLeft += spans[i].offsetWidth;
        }
      }

      const cursorSpan = pElement.querySelector(`.${s.cursor}`) as HTMLElement;
      if (cursorSpan) {
        cursorSpan.style.left = `${cursorLeft}px`;
        cursorSpan.style.height = `${pElement.offsetHeight}px`;
        cursorSpan.style.opacity = '1'; // 커서 위치 계산 후 보이게 함
      }
    }
  }, [inputValue, currentIndex, currentCard]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const currentMeaning = cards[currentIndex]?.meaning;
      if (currentMeaning && inputValue.toLowerCase() === currentMeaning.toLowerCase()) {
        if (currentIndex < cards.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // TODO : 해당 단어집의 디테일페이지로 이동
          alert('모든 단어를 완료했습니다!');
        }
      } else {
        setInputValue('');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }
  
  if (!cards || cards.length === 0) {
    return <div>단어를 찾을 수 없습니다.</div>;
  }
  
  const renderedElements = [];
  const chars = currentCard.meaning.split('');

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const isTyped = inputValue.length > i;
    const isCorrect = isTyped && inputValue[i].toLowerCase() === char.toLowerCase();
    
    let color = '#777';
    if (isTyped) {
      color = isCorrect ? 'white' : 'red';
    }

    if (i === inputValue.length) {
      renderedElements.push(
        <span key={`cursor-${i}`} className={s.cursor}></span>
      );
    }

    renderedElements.push(
      <span key={i} style={{ color }}>
        {isTyped ? inputValue[i] : char}
      </span>
    );
  }

  if (inputValue.length === chars.length) {
    renderedElements.push(
      <span key={`cursor-end`} className={s.cursor}></span>
    );
  }

  return (
    <div className={s.typing} onClick={handleContainerClick} ref={containerRef}>
      <h2>{currentCard.word}</h2>
      <p className={s.typingText} ref={textRef}>
        {renderedElements}
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className={s.typingInput}
        style={{ opacity: 0, position: 'absolute' }}
      />
    </div>
  );
};