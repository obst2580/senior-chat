export const FONT_SIZES = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 32,
} as const;

export const LINE_HEIGHTS = {
  xs: 20,
  sm: 24,
  md: 30,
  lg: 34,
  xl: 38,
  xxl: 44,
} as const;

export const TOUCH_TARGET = {
  min: 56,
  comfortable: 64,
} as const;

export type FontSizeKey = keyof typeof FONT_SIZES;
