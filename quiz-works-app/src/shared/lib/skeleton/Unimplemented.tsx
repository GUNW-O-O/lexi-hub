// src/components/Unimplemented.tsx
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  title?: string;
}

const Unimplemented:React.FC<Props> = ({ title = '미구현 기능' }: Props) => {
  return (
    // 배경색을 --card-color로 설정
    <div style={{
      backgroundColor: 'var(--card-color)',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: '10px',
    }}>
      <SkeletonTheme
        baseColor="var(--accent-color)" // 스켈레톤 기본색: --accent-color
        highlightColor="var(--sub-color)" // 반짝이는 색: --sub-color
      >
        <p style={{ color: 'var(--main-color)' }}>{title}</p>
        <div style={{ width: '80%', height: '75%', textAlign: 'center' }}>
          <Skeleton count={2} style={{ marginBottom: '10px' }} />
          <Skeleton height="100%" width="100%" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Unimplemented;