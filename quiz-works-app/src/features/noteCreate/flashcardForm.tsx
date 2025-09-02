import React, { useRef, useState } from 'react'
import s from './noteForm.module.css'
import { FlashcardItem } from 'entities/flashcard/note'

interface FlashcardFormProps {
  addFlashcard: (word: FlashcardItem) => void
  completeFlashcard: () => void
}


export const FlashcardForm: React.FC<FlashcardFormProps> = ({ addFlashcard, completeFlashcard }) => {

  const [meaning, setMeaning] = useState('')
  const [noteWord, setNoteWord] = useState('')
  const inputRef = useRef<HTMLInputElement>(null); // useRef로 참조 생성

  const handleAddFlashcard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (noteWord.trim() === '' || meaning.trim() === '') return;
    addFlashcard({ word: noteWord, meaning: meaning })
    setMeaning('')
    setNoteWord('')
    // 초점을 다시 inputRef가 참조하는 요소로 이동
    inputRef.current?.focus();
  }

  const handleCompleteFlashcard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    completeFlashcard()
  }


  // TODO : json 형식 단어추가

  return (
    <div className={s.flashCardForm}>
      <form action="">
        <label htmlFor="">단어/문장</label>
        <input type="text" onChange={(e) => setNoteWord(e.target.value)}
          value={noteWord} ref={inputRef} required />
        <label htmlFor="">뜻</label>
        <input type="text" onChange={(e) => setMeaning(e.target.value)}
          value={meaning} required />
        <div className={s.btnContainer}>
          <button onClick={handleAddFlashcard} className='btn'>추가하기</button>
          <button onClick={handleCompleteFlashcard} className='btn'>완료</button>
        </div>
      </form>
    </div>
  )
}
