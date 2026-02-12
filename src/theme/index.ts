// 主題顏色定義（從參考 UI globals.css 轉換）
export const colors = {
  light: {
    background: '#ffffff',
    foreground: '#252525',
    card: '#ffffff',
    cardForeground: '#252525',
    primary: '#030213',
    primaryForeground: '#ffffff',
    secondary: '#f3f3f5',
    secondaryForeground: '#030213',
    muted: '#ececf0',
    mutedForeground: '#717182',
    accent: '#e9ebef',
    accentForeground: '#030213',
    destructive: '#d4183d',
    destructiveForeground: '#ffffff',
    border: '#e5e5e5',
    input: '#f3f3f5',
  },
  dark: {
    background: '#252525',
    foreground: '#fafafa',
    card: '#252525',
    cardForeground: '#fafafa',
    primary: '#fafafa',
    primaryForeground: '#343434',
    secondary: '#454545',
    secondaryForeground: '#fafafa',
    muted: '#454545',
    mutedForeground: '#b5b5b5',
    accent: '#454545',
    accentForeground: '#fafafa',
    destructive: '#652c38',
    destructiveForeground: '#a33c53',
    border: '#454545',
    input: '#454545',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 10,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
};

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
