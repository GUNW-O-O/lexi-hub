import { MongoFlashcard } from 'entities/flashcard/note';
import { FlashcardTyping } from 'features/noteTyping/flashcardTyping'
import { LongformTyping } from 'features/noteTyping/longformTyping';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { privateApi } from 'shared/api/api';

export const NoteTyping: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flashcard, setFlashcard] = useState<MongoFlashcard>(null!);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState<MongoFlashcard>(null!)

  const getNoteById = async () => {
    try {
      setLoading(true);
      const res = await privateApi.get(`/notes/${id}`);
      if (res.data.type === 'flashcard') {
        setFlashcard(res.data);
      } else setNote(res.data);
    } catch (error) {
      alert('초기 로딩 실패');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    getNoteById();
  }, [id]);

  if (loading) {
    return <div>로딩중임다</div>
  }

  return (
    <>
      {flashcard ? (
        <FlashcardTyping flashcard={flashcard} />
      ) : (
        <LongformTyping note={note} />
      )}
    </>
  )
}
