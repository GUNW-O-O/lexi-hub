import React, { useEffect, useState } from 'react'
import { Button } from 'shared/ui/button/button'
import { privateApi } from 'shared/api/api';
import { MongoFlashcard } from 'entities/flashcard/note';
import { useParams } from 'react-router-dom';
import s from './flashcardInfo.module.css'
import Unimplemented from 'shared/lib/skeleton/Unimplemented';

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

  if (loading) {
    <div>로딩중임다</div>
  }

  return (
    <div className={s.cardInfo}>
      <div className={s.infoHeader}>이런저런 설정 추가</div>
      <div className={s.infoTitle}>
        <p className='subtitle'>📃 {note?.title}</p>
      </div>
      <div className={s.container}>
        <div className={s.leftContainer}>
          <div className={s.header}>
            <p>브랜치</p>
            <p>머</p>
            <p>다른</p>
            <p>기능</p>
            <Button children={'타이핑하기'} to={`/notes/typing/${note?._id}`} />
          </div>
          <div className={s.wordInfo}>
            <div className={s.column}>
              <p className='subtitle'>단어</p>
              <p className='subtitle'>뜻</p>
            </div>
            {note?.flashcards?.map((card) =>
              <div className={s.row} key={card._id}>
                <p className={s.word}>{card.word}</p>
                <p className={s.meaning}>{card.meaning}</p>
              </div>
            )}
          </div>
        </div>
        <div className={s.rightContainer}>
          <Unimplemented title='미구현 기능'/>
        </div>
      </div>
    </div>
  )
}
