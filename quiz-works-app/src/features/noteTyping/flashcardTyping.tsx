import React, { useEffect, useState } from 'react'
import s from './typing.module.css'
import { useParams } from 'react-router-dom'
import { privateApi } from 'shared/api/api';
import { FlashcardItem } from 'entities/flashcard/note';

export const FlashcardTyping: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [cards, setCards] = useState<FlashcardItem[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    console.log(id)
    const getNotebyNoteId = async () => {
      if (!id) {
        return;
      }
      try {
        setLoading(true);
        const res = await privateApi.get(`/notes/${id}`);
        setCards(res.data)
        console.log(res)
      } catch (error) {
        alert('초기 로딩 실패')
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    getNotebyNoteId();
  }, [id])

  if (loading) {
    return <div>로딩 중...</div>;
  }
  // if (!cards) {
  //   return <div>노트를 찾을 수 없습니다.</div>;
  // }

  return (
    <div className={s.typing}>
      flashcardTyping
    </div>
  )
}