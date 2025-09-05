import { MongoFlashcard } from 'entities/flashcard/note';
import { FlashCardInfo } from 'features/noteInfo/flashcardInfo'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { privateApi } from 'shared/api/api';

export const NoteInfo: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<MongoFlashcard>(null!);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const getNoteById = async () => {
      try {
        setLoading(true);
        const res = await privateApi.get(`/notes/${id}`);
        setNote(res.data)
      } catch (error) {
        alert('초기 로딩 실패');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNoteById();
  }, [id]);

  if (loading) {
    return <div>로딩중임다</div>
  }

  return (
    <>
      <FlashCardInfo note={note} />
    </>
  )
}