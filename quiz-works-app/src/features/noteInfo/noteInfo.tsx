import React, { useEffect, useState } from 'react'
import { Button } from 'shared/ui/button/button'
import { privateApi } from 'shared/api/api';
import { FlashcardItem } from 'entities/flashcard/note';
import { useParams } from 'react-router-dom';

export const NoteInfo = () => {

  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<FlashcardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const getNoteById = async () => {
      try {
        setLoading(true);
        const res = await privateApi.get(`/notes/typing/${id}`);
        const shufflednote = res.data.flashnote.sort(() => Math.random() - 0.5);
        setNote(shufflednote);
      } catch (error) {
        alert('초기 로딩 실패');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNoteById();
  }, [id]);

  return (
    <>
      <p>해당 단어집의 정보입니다</p>
      {/* <Button children={'타이핑하기'} to={`/notes/typing/${note._id}`} /> */}
    </>
  )
}
