import React from 'react'
import s from './home.module.css'
import TextType from 'shared/ui/textType/TextType'


export const Home: React.FC = () => {
  return (
    <div className={s.home}>
      <TextType
        text={[
          "Welcome to LexiHub!",
          "LexiHub는 단어 저장소이자 타이핑 연습장, 그리고 당신의 공부 파트너입니다.",
          "“Tell me and I forget. Teach me and I remember. Involve me and I learn.” – 벤자민 프랭클린",
          "“우리는 우리 자신의 세계 속에서 성장해야 하며, 스스로의 길을 찾아 나아가야 한다.” 『데미안』, 헤르만 헤세",
          "“The beautiful thing about learning is that nobody can take it away from you.” – B. B. King",
          "“사람은 자신의 선택과 책임으로 세상 속에서 성장한다. 아무리 작은 행동이라도 그것이 삶의 방향을 결정한다.” 『죄와 벌』, 도스토옙스키"
        ]}
        typingSpeed={100}
        pauseDuration={2000}
        showCursor={true}
        cursorCharacter="|"
      />
    </div>
  )
}
