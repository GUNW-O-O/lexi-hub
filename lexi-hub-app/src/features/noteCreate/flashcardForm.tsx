import React, { useRef, useState } from 'react'
import s from './noteForm.module.css'
import { FlashcardItem } from 'entities/flashcard/note'

interface FlashcardFormProps {
  addFlashcard: (word: FlashcardItem) => void
  completeFlashcard: () => void
  addBulkFlashcard: (words: FlashcardItem[]) => void
}


export const FlashcardForm: React.FC<FlashcardFormProps> = ({ addFlashcard, completeFlashcard, addBulkFlashcard }) => {

  const [meaning, setMeaning] = useState('');
  const [noteWord, setNoteWord] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // useRef로 참조 생성

  const handleAddFlashcard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (noteWord.trim() === '' || meaning.trim() === '') return;
    addFlashcard({ word: noteWord, meaning: meaning })
    setMeaning('')
    setNoteWord('')
    // 초점을 다시 inputRef가 참조하는 요소로 이동
    inputRef.current?.focus();
  }

  const handleCompleteFlashcard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    completeFlashcard()
  }

  const handleAddBulkFlashcard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bulkInput.trim() === '') return;

    // JSON 형식 시도
    try {
      const parsedData = JSON.parse(bulkInput);
      if (Array.isArray(parsedData)) {
        addBulkFlashcard(parsedData);
        alert(`${parsedData.length}개의 플래시카드를 추가했습니다.`);
        setBulkInput('');
        return;
      }
    } catch (error) {
      // JSON 파싱 실패 -> CSV 형식으로 처리
    }

    // CSV 형식 시도
    const arr:FlashcardItem[] = [];
    const lines = bulkInput.split('\n');
    let addedCount = 0;
    console.log(lines)
    lines.forEach((line) => {
      const parts = line.split(',').map((part) => part.trim());
      if (parts.length >= 2 && parts[0] !== '' && parts[1] !== '') {
        arr.push({ word: parts[0], meaning: parts[1] });
        addedCount++;
      }
    });
    
    if (addedCount > 0) {
      addBulkFlashcard(arr);
      alert(`${addedCount}개의 플래시카드를 추가했습니다.`);
      setBulkInput('');
    } else {
      alert('유효한 플래시카드를 찾을 수 없습니다. JSON 또는 CSV 형식을 확인해주세요.');
    }
  };

  return (
    <div className={s.flashCardForm}>
      <form>
        <label htmlFor="">단어/문장</label>
        <input type="text" onChange={(e) => setNoteWord(e.target.value)}
          value={noteWord} ref={inputRef} required />
        <label htmlFor="">뜻</label>
        <input type="text" onChange={(e) => setMeaning(e.target.value)}
          value={meaning} required />
        <div className={s.btnContainer}>
          <button onClick={handleAddFlashcard} className='btn'>추가하기</button>
          <button onClick={handleCompleteFlashcard} className='btn'>완료</button>
        </div>
      </form>
      <div className={s.bulkAddSection}>
        <h3>대량 추가 (JSON 또는 CSV)</h3>
        <textarea
          rows={5}
          placeholder="여기에 JSON 또는 CSV 형식으로 입력하세요.
          
JSON 예시:
[
  { 'word': '사과', 'meaning': 'Apple' },
  { 'word': '바나나', 'meaning': 'Banana' }
]

CSV 예시:
사과,Apple
바나나,Banana"
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
        />
        <button onClick={handleAddBulkFlashcard} className="btn">
          대량 추가
        </button>
      </div>
    </div>
  )
}
