export const COLORS = {
  // 메인 컬러: 활기차고 따뜻한 오렌지/코랄
  primary: '#FF7E5F',
  primaryLight: '#FEB47B',
  primaryDark: '#E86B4D',

  // 배경: 눈이 편안한 미색 (Warm White)
  background: '#FDFCFB',
  surface: '#FFFFFF',

  // 텍스트: 가독성이 높으면서도 부드러운 차콜
  text: '#2D3436',
  textSecondary: '#636E72',
  textLight: '#B2BEC3',

  // 메시지 배경: 따뜻하고 부드러운 톤
  aiMessageBg: '#FFF3E0',
  userMessageBg: '#E1F5FE',

  border: '#F1F2F6',
  divider: '#F1F2F6',

  // 상태 컬러: 생동감 있는 색상
  success: '#00B894',
  error: '#D63031',
  warning: '#FDCB6E',

  white: '#FFFFFF',
  black: '#000000',

  // 기능별 카드 배경색 (파스텔 톤)
  helperCardBg: '#FFEAA7',
  companionCardBg: '#FAB1A0',
  scheduleCardBg: '#55EFC4',
  pastimeCardBg: '#81ECEC',
  
  companionCallBg: '#E8EAF6',
  gameCorrect: '#00B894',
  gameIncorrect: '#D63031',
} as const;

export type ColorKey = keyof typeof COLORS;
