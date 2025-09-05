import React from 'react'
import s from './home.module.css'
import Unimplemented from 'shared/lib/skeleton/Unimplemented'


export const Home:React.FC = () => {
  return (
    <div className={s.home}>
      <Unimplemented title='다른유저의 단어장 정보' />
      <Unimplemented title='다른유저의 단어장 정보' />
    </div>
  )
}
