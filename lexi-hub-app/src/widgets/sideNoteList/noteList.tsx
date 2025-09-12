import React, { useEffect, useState } from 'react';
import s from './noteList.module.css';
import { useAuth } from 'shared/lib/context/authProvider';
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
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // **새로운 검색어 상태**


  const getNoteList = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await privateApi.get('/notes');
      setNotes(res.data);
    } catch (error) {
      alert('유저 단어장 목록 조회실패');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNoteList();
  }, [userLoading, location]);

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

  // 검색
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotes = notes.filter((note: MongoFlashcard) => {
    const query = searchQuery.toLowerCase();
    return note.title.toLowerCase().includes(query) || note.author.toLowerCase().includes(query);
  });

  if (loading) {
    return (
      <div className={s.noteList} style={{ height: height }}>
        <p>로그인을 해주세요</p>
      </div>
    );
  }

  return (
    <div className={s.noteList} style={{ height: height }}>
      {user && (
        <>
          <div className={s.sideUtil}>
            <div className={s.nameAndNew}>
              <p>{user.nickname}님의 단어장</p>
              <Button children="⌨️ New" to="/note/new" />
            </div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className={s.notes}>
            {notes.length > 0 ? (
              <>
                {filteredNotes.map((note: MongoFlashcard) => (
                  <Link to={`/notes/info/${note._id}`} key={note._id}>
                    <p>
                      {(note.type === 'flashcard' ? '📃' : '📗')}{note.author} / {note.title}
                    </p>
                  </Link>
                ))}
                {filteredNotes.length === 0 && searchQuery !== '' && (
                  <p>검색 결과가 없습니다.</p>
                )}
              </>

            ) : (
              <p>단어장이 없습니다.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};