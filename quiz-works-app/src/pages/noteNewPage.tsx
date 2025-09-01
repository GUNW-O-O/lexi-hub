// src/pages/NoteNewPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'shared/lib/context/authProvider';
import s from './noteNewPage.module.css';
import { FlashcardForm } from 'features/note/flashcardForm';
import { FlashcardItem } from 'entities/flashcard/note';
// import { LongformForm } from 'features/note/longform-form'; // 아직 만들지 않은 컴포넌트


export const NoteNewPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [noteType, setNoteType] = useState<'flashcard' | 'longform'>('flashcard');
  const [noteName, setNoteName] = useState<string>('')
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([])

  // 로그인 상태 확인
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteType(e.target.value as 'flashcard' | 'longform');
  };

  const addFlashcard = (word: FlashcardItem) => {
    setFlashcards([...flashcards, word]);
  };


  return (
    <div className={s.noteNewPage}>
      <div className={s.newNote}>
        <input type="text" value={noteName} onChange={(e) => setNoteName(e.target.value)} placeholder="제목을 입력하세요" />
        <div className={s.typeSelector}>
          <label htmlFor='flashcard-type' className={`btn ${s.typeLabel} ${noteType === 'flashcard' ? s.active : ''}`}>
            <input
              type="radio"
              id='flashcard-type'
              value="flashcard"
              checked={noteType === 'flashcard'}
              onChange={handleTypeChange}
              className={s.typeInput}
            />
            플래시카드 타입 (단어/뜻)
          </label>
          <label htmlFor='longform-type' className={`btn ${s.typeLabel} ${noteType === 'longform' ? s.active : ''}`}>
            <input
              type="radio"
              id='longform-type'
              value="longform"
              checked={noteType === 'longform'}
              onChange={handleTypeChange}
              className={s.typeInput}
            />
            장문 타입 (긴 글)
          </label>
        </div>


        {/* 선택된 타입에 따라 다른 폼 컴포넌트 렌더링 */}
        {noteType === 'flashcard' ? (
          <FlashcardForm addFlashcard={addFlashcard} />
        ) : (
          <>
          </>
          // <LongformForm />
        )}
      </div>
      {noteType === 'flashcard' && (
        <>
          <div className={s.wordList}>
            <p>123</p>
            <p>123</p>
            <p>123</p>
          </div>
        </>
      )}
    </div>

  );
};