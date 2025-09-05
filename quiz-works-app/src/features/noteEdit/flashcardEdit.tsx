import React, { useEffect, useState } from 'react'
import s from './flashcardEdit.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { privateApi } from 'shared/api/api';
import { MongoFlashcard, FlashcardItem } from 'entities/flashcard/note';
import { useAuth } from 'shared/lib/context/authProvider';

export const FlashcardEdit: React.FC = () => {

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mongoCard, setMongoCard] = useState<MongoFlashcard>(null!);
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(null!);
  const [loading, setLoading] = useState(true);
  const [editNo, setEditNo] = useState<number>(-1);
  const [editWord, setEditWord] = useState('');
  const [editMeaning, setEditMeaning] = useState('');
  const [addWord, setAddWord] = useState('');
  const [addMeaning, setAddMeaning] = useState('');


  useEffect(() => {
    if (!user) {
      alert('로그인을 해주세요');
      navigate('/');
    }
    const getNoteById = async () => {
      try {
        setLoading(true);
        const res = await privateApi.get(`/notes/${id}`);
        setMongoCard(res.data);
        setFlashcards(res.data.flashcards);
        console.log(res.data)
      } catch (error) {
        alert('초기 로딩 실패');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNoteById();
  }, [id])
  
  const openEditWord = (index: number) => {
    if (editNo === index) {
      setEditNo(-1);
    } else {
      setEditNo(index);
      setEditWord(flashcards[index].word);
      setEditMeaning(flashcards[index].meaning);
    }
  }

  const tempSaveWord = () => {

  }

  const tempDeleteWord = (index: number) => {
    var result = false;
    if (window.confirm("정말 삭제하시겠습니까?")) {
      result = true;
    }
    if (!result) return;
    setFlashcards(prev => prev.filter((_, i) => i !== index))
  }

  const saveTempWord = (index: number) => {
    setFlashcards(prev =>
      prev.map((card, i) =>
        i === index ? { ...card, word: editWord, meaning: editMeaning } : card
      )
    );
    setEditNo(-1);
  }

  const submitEditedFlashcard = async () => {
    const updateMongoCard = {
      ...mongoCard, flashcards: flashcards
    }
    try {
      const res = await privateApi.put(`/notes/${id}`, updateMongoCard);
      console.log(res);
      setMongoCard(res.data);
      setFlashcards(res.data.flashcards);
      alert('수정완료');
      navigate(`/notes/info/${id}`)
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <div>로딩중...</div>
  }

  return (
    <div className={s.cardEditContainer}>
      <div className={s.cardEdit}>
        {flashcards.map((card, index: number) =>
          <>
            <div key={index} className={s.card}>
              {index + 1}
              {editNo !== index ? (
                <>
                  <p>{card.word}</p>
                  <span>{card.meaning}</span>
                </>
              ) : (
                <div className={s.editForm}>
                  <input className={s.wordInput} type="text" value={editWord}
                    onChange={(e) => setEditWord(e.target.value)} />
                  <input className={s.meaningInput} type="text" value={editMeaning}
                    onChange={(e) => setEditMeaning(e.target.value)} />
                </div>
              )}
              {editNo === index ? (
                <div className='btn' onClick={() => saveTempWord(index)}>완료</div>
              ) : (
                <div className='btn' onClick={() => openEditWord(index)}>수정</div>
              )}
              {editNo === index ? (
                <div className='btn' onClick={() => openEditWord(index)}>취소</div>
              ) : (
                <div className='btn' onClick={() => tempDeleteWord(index)}>삭제</div>
              )}
            </div>
          </>
        )}
        <button className='btn' onClick={submitEditedFlashcard}>수정완료</button>
      </div>
      <div className={s.addCard}>
        123
      </div>
    </div>
  )
}
