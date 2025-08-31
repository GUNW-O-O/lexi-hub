import React from 'react'
import s from './noteList.module.css'
import { useAuth } from 'shared/lib/context/authProvider'
import { Button } from 'shared/ui/button/button';

export const NoteList: React.FC = () => {

  const { user } = useAuth();


  return (
    <div className={s.noteList}>
      { user ? (
        <>
          <div className={s.sideUtil}>
            <div className={s.nameAndNew}>
              <p>{user.nickname}님의 단어장</p>
              <Button children="새 단어장" to="/note/new" />
            </div>
            <input type="text" placeholder="검색어를 입력하세요" />
          </div>
            <div className='notes'></div>
        </>
      ) : (
        <p>로그인을 해주세요</p>
      )}
    </div>
  )
}
