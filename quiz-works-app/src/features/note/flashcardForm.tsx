import React from 'react'
import s from './noteForm.module.css'
import { FlashcardItem } from 'entities/flashcard/note'

interface FlashcardFormProps {
  addFlashcard: (word: FlashcardItem) => void
}


export const FlashcardForm: React.FC<FlashcardFormProps> = ({ addFlashcard }) => {


  return (
    <div className={s.flashCardForm}>
      <form action="">
        <label htmlFor="">단어/문장</label>
        <input type="text" />
        <label htmlFor="">뜻</label>
        <input type="text" />
        <button type="submit" className='btn'>추가하기</button>
      </form>
    </div>
  )
}
