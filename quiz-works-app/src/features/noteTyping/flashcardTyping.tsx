import React, { useEffect, useState, useRef } from 'react';
import s from './typing.module.css';
import { useNavigate } from 'react-router-dom';
import { FlashcardItem, MongoFlashcard } from 'entities/flashcard/note';

interface TypingProps {
  flashcard: MongoFlashcard;
}

export const FlashcardTyping: React.FC<TypingProps> = ({ flashcard }) => {

  const [cards, setCards] = useState<FlashcardItem[]>(flashcard?.flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();

  const currentCard = cards[currentIndex];

  useEffect(() => {
    const shuffledCards = flashcard.flashcards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);

  }, [flashcard?._id])


  useEffect(() => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  // **커서 위치를 보정하는 useEffect 훅**
  useEffect(() => {
    if (textRef.current && currentCard) {
      const pElement = textRef.current;
      const spans = Array.from(pElement.children) as HTMLElement[];
      let cursorLeft = 0;

      // inputValue.length에 따라 커서 위치 계산
      for (let i = 0; i < inputValue.length; i++) {
        if (spans[i]) {
          cursorLeft += spans[i].offsetWidth;
        }
      }

      const cursorSpan = pElement.querySelector(`.${s.cursor}`) as HTMLElement;
      if (cursorSpan) {
        cursorSpan.style.left = `${cursorLeft + 2}px`;
        cursorSpan.style.height = `${pElement.offsetHeight}px`;
        cursorSpan.style.opacity = '1';
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
          alert('모든 단어를 완료했습니다!');
          navigate(`/notes/info/${flashcard?._id}`);
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


  if (!cards || cards.length === 0) {
    return <div>단어를 찾을 수 없습니다.</div>;
  }

  const chars = currentCard.meaning.split('');

  return (
    <div className={s.container}>
      <button className='btn' onClick={() => navigate(-1)}>뒤로가기</button>
      <div className={s.typing} onClick={handleContainerClick} ref={containerRef}>
        <h2>{currentCard.word}</h2>
        <p className={s.typingText} ref={textRef}>
          {chars.map((char, index) => {
            const isTyped = inputValue.length > index;
            const isCorrect = isTyped && inputValue[index].toLowerCase() === char.toLowerCase();

            let color = '#777';
            if (isTyped) {
              color = isCorrect ? 'white' : 'red';
            }

            const content = char === ' ' ? '\u00A0' : char;

            return (
              <span key={index} style={{ color }}>
                {isTyped ? inputValue[index] : content}
              </span>
            );
          })}
          <span className={s.cursor}></span>
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className={s.typingInput}
          autoFocus
          style={{ opacity: 0, position: 'absolute' }}
        />
      </div>
    </div>
  );
};