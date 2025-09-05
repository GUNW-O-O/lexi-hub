import React from 'react';
import styles from './home.module.css'
import { NoteList } from 'widgets/sideNoteList/noteList';
import { Home } from 'widgets/home/home';

export const HomePage: React.FC = () => {

  return (
    <div className={styles.mainPage}>
      <NoteList />
      <Home />
    </div>
  );
};