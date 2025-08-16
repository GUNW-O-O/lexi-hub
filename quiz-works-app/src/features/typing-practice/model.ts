// quiz-works-app/src/features/typing-practice/model.ts

export const checkTypingProgress = (originalText: string, typedText: string): number => {
  if (!typedText) {
    return 0;
  }
  
  let correctCount = 0;
  // 입력된 텍스트와 원본 텍스트를 비교합니다.
  for (let i = 0; i < typedText.length; i++) {
    if (originalText[i] === typedText[i]) {
      correctCount++;
    } else {
      // 오타가 발생하면 더 이상 진행도를 높이지 않습니다.
      break; 
    }
  }
  
  // 전체 글자 수 대비 정확하게 입력된 글자 수의 비율을 계산합니다.
  return (correctCount / originalText.length) * 100;
};