import { MongoFlashcard } from 'entities/flashcard/note';
import s from './flashcardInfo.module.css'
import React from 'react';
import { Button } from 'shared/ui/button/button';
import { privateApi } from 'shared/api/api';
import { useNavigate } from 'react-router-dom';

interface FlashcardInfoProps {
  note: MongoFlashcard;
  id: string;
}

export const FlashCardInfo: React.FC<FlashcardInfoProps> = ({ note, id }) => {

  const navigate = useNavigate();

  const realDeleteFlashcard = async () => {
    if (!id) {
      alert('잘못된 접근입니다.')
      navigate('/');
    }
    try {
      var result = false;
      if (window.confirm("정말 삭제하시겠습니까?")) {
        result = true;
      }
      if (!result) return;
      const res = await privateApi.delete(`/notes/${id}`);
      console.log(res);
      if (res.status === 204) {
        alert('삭제완료');
        navigate('/');
      }
    } catch (error) {

    }
  }

  return (
    <div className={s.cardInfo}>
      <div className={s.infoTitle}>
        <p className='subtitle'>📃 {note?.title}</p>
      </div>
      <div className={s.container}>
        <div className={s.leftContainer}>
          <div className={s.header}>
            <button className='btn' onClick={realDeleteFlashcard}>삭제</button>
            <Button children={'수정'} to={`/notes/edit/${note?._id}`} />
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
      </div>
    </div>
  )
}
