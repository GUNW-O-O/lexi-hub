import React from 'react'
import s from './noteForm.module.css'
import { FlashcardItem } from 'shared/types/note'

interface FlashcardFormProps {
  addFlashcard: (word: FlashcardItem) => void
}


export const FlashcardForm: React.FC<FlashcardFormProps> = ({addFlashcard}) => {


  return (
    <div>flashcardForm</div>
  )
}
