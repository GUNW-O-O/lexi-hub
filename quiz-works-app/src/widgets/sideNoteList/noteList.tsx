import React, { useEffect, useState } from 'react'
import s from './noteList.module.css'
import { useAuth } from 'shared/lib/context/authProvider'
import { Button } from 'shared/ui/button/button';
import { privateApi } from 'shared/api/api';
import { MongoFlashcard } from 'entities/flashcard/note';
import { Link } from 'react-router-dom';

export const NoteList: React.FC = () => {

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getNoteList = async () => {
    try {
      setLoading(true);
      const res = await privateApi.get('/notes');
      console.log(res)
      setNotes(res.data);
    } catch (error) {
      alert('유저 단어장 목록 조회실패')
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getNoteList();
  }, [])


  if(loading) {
    return <div>로딩..</div>
  }

  return (
    <div className={s.noteList}>
      {user ? (
        <>
          <div className={s.sideUtil}>
            <div className={s.nameAndNew}>
              <p>{user.nickname}님의 단어장</p>
              <Button children="새 단어장" to="/note/new" />
            </div>
            <input type="text" placeholder="검색어를 입력하세요" />
          </div>
          <div className={s.notes}>
            {notes.map((note:MongoFlashcard) => 
              <Link to={`/notes/info/${note._id}`}>
                <p>{(note.type === 'flashcard' ? '📃' : '📗')}{note.author} / {note.title}</p>
              </Link>
            )}
          </div>
        </>
      ) : (
        <p>로그인을 해주세요</p>
      )}
    </div>
  )
}
