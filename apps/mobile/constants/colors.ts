export const COLORS = {
  primary: '#1565C0',
  primaryLight: '#1E88E5',
  primaryDark: '#0D47A1',

  background: '#FFFEF7',
  surface: '#FFFFFF',

  text: '#212121',
  textSecondary: '#616161',
  textLight: '#9E9E9E',

  aiMessageBg: '#FFF8F0',
  userMessageBg: '#E3F2FD',

  border: '#E0E0E0',
  divider: '#F5F5F5',

  success: '#2E7D32',
  error: '#C62828',
  warning: '#F57F17',

  white: '#FFFFFF',
  black: '#000000',

  scheduleCardBg: '#F1F8E9',
  pastimeCardBg: '#FFF3E0',
  companionCallBg: '#E8EAF6',
  gameCorrect: '#4CAF50',
  gameIncorrect: '#EF5350',
} as const;

export type ColorKey = keyof typeof COLORS;
