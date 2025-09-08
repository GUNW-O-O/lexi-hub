# LexiHub

커스텀 단어장 학습용 Toy 프로젝트입니다. React(FSD 구조)와 TypeScript를 기반으로 프론트엔드를 구현하고, NestJS와 MongoDB를 활용해 백엔드를 구성했습니다. JWT 기반 인증/인가 흐름도 직접 구현하였습니다.

---

## 기술 스택

- **React (FSD 구조) + TypeScript**: 정적 타입 검증과 유지보수성 향상, 기능 단위별 관심사 분리  
- **NestJS**: TypeScript 지원과 모듈 기반 구조를 활용해 기능별 모듈화 경험  
- **MongoDB**: NoSQL 구조로 단어 중심 데이터 모델 적용, 빠른 프로토타이핑 가능  
- **JWT**: Access Token + HttpOnly Refresh Token을 통한 인증/인가 흐름 구현

---

## 프로젝트 화면

| 화면 | 설명 |
|------|------|
| ![mainSearch](https://github.com/user-attachments/assets/1b97508a-1f6b-46f3-bda2-2024d357521a) | 메인화면 사이드바에서 단어장 목록 검색 가능 |
| ![addFlashcard](https://github.com/user-attachments/assets/561c8dbd-8806-4c5d-bb22-749848b2b059) | 단어장 단일/대량 추가 (JSON, CSV) |
| <img width="1163" height="943" alt="editFlashcard" src="https://github.com/user-attachments/assets/780d2125-919d-4fef-9b18-0d5c03c80fac" /> | 단어 수정 화면 |
| <img width="1163" height="835" alt="editedFlashcard" src="https://github.com/user-attachments/assets/824ec4d3-e4d0-49ab-b906-2d8db7ef5b90" /> | 단어 최종 수정 완료 화면 |
| ![typingFlashcard](https://github.com/user-attachments/assets/8a811a4c-5327-4e02-afc9-190f954d858f) | 단어장 타이핑 화면 |
| <img width="1147" height="943" alt="addLongform" src="https://github.com/user-attachments/assets/08b84fbf-29b7-49ee-a368-1c3567369237" /> | 장문 등록 화면 |
| ![EditLongform](https://github.com/user-attachments/assets/02680b37-44ea-469f-a40b-d1a3137bc885) | 장문 수정 페이지 |
| ![typingLongform](https://github.com/user-attachments/assets/ea08cf4e-2e27-42dd-b2e1-cf3fd42281b0) | 장문 타이핑 화면 |
| <img width="1163" height="684" alt="doneLongform" src="https://github.com/user-attachments/assets/5107511a-3975-4688-be37-341a58417661" /> | 장문 타이핑 완료 화면 |

---

## 프로젝트 경험

### 문제점 (Troubles)
- JWT 만료 시 인증 오류 발생 → 장시간 페이지 체류 시 불필요한 로그인 요청  
- 한글 입력 시 받침 완성 전 오타로 인식  
- JSON/CSV 대량 추가 시 마지막 단어만 추가되는 버그

### 해결방안 (Solution)
- Access Token 만료 시 httpOnly Refresh Token을 사용해 자동 갱신  
- 입력 중인 글자는 오타 검증 제외, 다음 글자 입력 시 이전 글자를 최종 판단  
- FlashCard[] 구조분해를 통한 리스트/단일 추가 로직 처리

---

## 느낀 점
- 제한된 시간 속에서도 TypeScript와 React(FSD 구조)를 활용해 기능 단위 관심사 분리를 학습  
- NestJS 모듈 기반 아키텍처와 MongoDB NoSQL 구조를 경험하며, 백엔드와 프론트엔드 연동 이해  
- 인증/인가 영역을 직접 구현하며 Context와 커스텀 훅 활용 흐름을 학습
