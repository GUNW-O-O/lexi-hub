import React, { useEffect, useState } from 'react'
import { Button } from 'shared/ui/button/button'
import { privateApi } from 'shared/api/api';
import { MongoFlashcard } from 'entities/flashcard/note';
import { useParams } from 'react-router-dom';

export const FlashCardInfo: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<MongoFlashcard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const getNoteById = async () => {
      try {
        setLoading(true);
        const res = await privateApi.get(`/notes/typing/${id}`);
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

  if(loading) {
    <div>로딩중임다</div>
  }

  return (
    <>
      <p>해당 단어집의 정보입니다</p>
      <Button children={'타이핑하기'} to={`/notes/typing/${note?._id}`} />
    </>
  )
}
