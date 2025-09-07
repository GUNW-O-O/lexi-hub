import React, { useEffect, useState } from 'react'
import s from './noteList.module.css'
import { useAuth } from 'shared/lib/context/authProvider'
import { Button } from 'shared/ui/button/button';
import { privateApi } from 'shared/api/api';
import { MongoFlashcard } from 'entities/flashcard/note';
import { Link, useLocation } from 'react-router-dom';

type NoteListProps = {
  parentRef: React.RefObject<HTMLDivElement | null>;
};

export const NoteList: React.FC<NoteListProps> = ({ parentRef }) => {

  const location = useLocation();
  const [height, setHeight] = useState(0);
  const { user, userLoading } = useAuth();
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true);

  const updateHeight = () => {
    if (parentRef.current) {
      setHeight(parentRef.current.offsetHeight - 80);
    }
  };

  const getNoteList = async () => {
    if (!user) return;
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
  }, [userLoading, location])
  
  useEffect(() => {
    if (!parentRef.current) return;

    const observer = new ResizeObserver(() => {
      if (parentRef.current!.offsetHeight >= 864) {
        setHeight(parentRef.current!.offsetHeight);
      }
    });

    observer.observe(parentRef.current);

    return () => observer.disconnect();
  }, []);


  if (loading) {
    return (
      <div className={s.noteList} style={{ height: height }}>
        <p>로그인을 해주세요</p>
      </div>
    )
  }

  return (
    <div className={s.noteList} style={{ height: height }}>
      {user && (
        <>
          <div className={s.sideUtil}>
            <div className={s.nameAndNew}>
              <p>{user.nickname}님의 단어장</p>
              <Button children="새 단어장" to="/note/new" />
            </div>
            <input type="text" placeholder="검색어를 입력하세요" />
          </div>
          <div className={s.notes}>
            {notes.map((note: MongoFlashcard) =>
              <Link to={`/notes/info/${note._id}`}>
                <p>{(note.type === 'flashcard' ? '📃' : '📗')}{note.author} / {note.title}</p>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}
