import React, { useState } from 'react'
import s from './longformForm.module.css'

interface LongfromProps {
  submitLongform: (content: string) => void
}

export const LongformForm: React.FC<LongfromProps> = ({submitLongform}) => {
  const [content, setContent] = useState<string>('');

  const handleSubmit = () => {
    if (content.trim() === '') return;
    submitLongform(content);
    setContent('');
  }

  return (
    <div className={s.longformForm}>
      <textarea className={s.content} placeholder='내용을 입력하세요'
      onChange={(e) => setContent(e.target.value)} value={content}></textarea>
      <div className={s.btnContainer}>
        <button className='btn' onClick={handleSubmit}>완료</button>
      </div>
    </div>
  )
}
