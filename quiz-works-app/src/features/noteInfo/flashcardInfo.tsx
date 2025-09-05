import { MongoFlashcard } from 'entities/flashcard/note';
import s from './flashcardInfo.module.css'
import Unimplemented from 'shared/lib/skeleton/Unimplemented';
import React from 'react';
import { Button } from 'shared/ui/button/button';

interface FlashcardInfoProps {
  note: MongoFlashcard;
}

export const FlashCardInfo: React.FC<FlashcardInfoProps> = ({note}) => {

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
        <div className={s.rightContainer}>
          <Unimplemented title='미구현 기능'/>
        </div>
      </div>
    </div>
  )
}
