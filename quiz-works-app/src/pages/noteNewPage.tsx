// src/pages/NoteNewPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'shared/lib/context/authProvider';
import s from './noteNewPage.module.css';
import { FlashcardForm } from 'features/noteCreate/flashcardForm';
import { FlashcardItem } from 'entities/flashcard/note';
import { privateApi } from 'shared/api/api';
import { Button } from 'shared/ui/button/button';
import { LongformForm } from 'features/noteCreate/longformForm';
// import { LongformForm } from 'features/note/longform-form'; // 아직 만들지 않은 컴포넌트


export const NoteNewPage = () => {
  const { user, userLoading } = useAuth();
  const navigate = useNavigate();
  const [noteType, setNoteType] = useState<'flashcard' | 'longform'>('flashcard');
  const [noteName, setNoteName] = useState<string>('');
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);

  useEffect(() => {
    if (!user && !userLoading) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [userLoading])


  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteType(e.target.value as 'flashcard' | 'longform');
  };

  const addFlashcard = (word: FlashcardItem) => {
    setFlashcards([...flashcards, word]);
  };

  const addBulkFlashcard = (words: FlashcardItem[]) => {
    setFlashcards([...flashcards, ...words]);
  }

  const deleteFlashcard = (idx: number) => {
    // 인덱스가 idx와 같지 않은 요소들만 남겨서 새로운 배열을 만듭니다.
    const newFlashcards = flashcards.filter((_, index) => index !== idx);
    setFlashcards(newFlashcards);
  }

  const completeFlashcard = async () => {
    const data = {
      title: noteName,
      type: 'flashcard',
      flashcards: flashcards,
    };
    try {
      const res = await privateApi.post('/notes', data);
      alert('저장 성공')
      console.log(res)
      navigate('/');
    } catch (error) {
      alert('노트 저장에 실패했습니다.');
      console.error(error);
    }
  }

  const submitLongform = async (content:string) => {
    const data = {
      title: noteName,
      type: 'longform',
      content: content,
    };
    try {
      const res = await privateApi.post('/notes', data);
      alert('저장 성공')
      console.log(res)
      navigate(`/notes/info/${res.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={s.noteNewPage}>
      <div className={s.newNote}>
        <div className={s.btnContainer}>
          <Button children={'취소'} to={'/'} />
        </div>
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


        {noteType === 'flashcard' ? (
          <FlashcardForm addFlashcard={addFlashcard}
          completeFlashcard={completeFlashcard} addBulkFlashcard={addBulkFlashcard} />
        ) : (
          <LongformForm submitLongform={submitLongform} />
        )}
      </div>
      {noteType === 'flashcard' && flashcards.length > 0 && (
        <>
          <div className={s.wordList}>
            <div className={s.wordHeader}>
              <div className={s.word}>
                <p>단어</p>
              </div>
              <div className={s.meaning}>
                <p>뜻</p>
              </div>
            </div>
            {flashcards.map((card, idx) => {
              return (
                <>
                  <div key={idx} className={s.wordItem}>
                    <div className={s.words}>
                      <div className={s.word}>
                        <p>{card.word}</p>
                      </div>
                      <div className={s.meaning}>
                        <p>{card.meaning}</p>
                      </div>
                    </div>
                    <div className={s.btnContainer}>
                      <button className='btn' onClick={() => deleteFlashcard(idx)}>삭제</button>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </>
      )}
    </div>

  );
};