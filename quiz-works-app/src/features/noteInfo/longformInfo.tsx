import React, { useState } from 'react'
import s from './longformInfo.module.css'
import { MongoFlashcard } from 'entities/flashcard/note';
import { Button } from 'shared/ui/button/button';
import { privateApi } from 'shared/api/api';
import { useNavigate } from 'react-router-dom';

interface LongformInfoProps {
  note: MongoFlashcard;
  id: string;
}

export const LongformInfo: React.FC<LongformInfoProps> = ({ note, id }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<string>(note.content);

  const navigate = useNavigate();

  const realDeleteLongform = async () => {
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
      console.error(error);
    }
  }

  const updateLongForm = async () => {
    var result = false;
    if (window.confirm("수정하시겠습니까?")) {
      result = true;
    }
    if (!result) return;
    const data = {
      ...note, content: content
    }
    try {
      const res = await privateApi.put(`/notes/${id}`, data)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
    handleEdit();
  }

  const handleEdit = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <div className={s.longformInfo}>
      <div className={s.infoTitle}>
        <p className='subtitle'>📗 {note?.title}</p>
      </div>
      <div className={s.container}>
        <div className={s.header}>
          <button className='btn' onClick={realDeleteLongform}>삭제</button>
          {isEditing ? (
            <>
              <button onClick={handleEdit} className='btn'>취소</button>
              <button onClick={updateLongForm} className='btn'>수정완료</button>
            </>
          ) : (
            <button onClick={handleEdit} className='btn'>수정</button>
          )}
          <Button children={'타이핑하기'} to={`/notes/typing/${note?._id}`} />
        </div>
        <div className={s.contentInfo}>
          <textarea value={content}
            readOnly={!isEditing}
            onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
      </div>
    </div>
  )
}