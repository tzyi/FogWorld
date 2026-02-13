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

// FogMask 功能專用主題
export const fogMaskTheme = {
  fog: {
    color: 'rgba(0, 0, 0, 0.7)', // 迷霧顏色（深色半透明）
    exploredColor: 'rgba(0, 0, 0, 0)', // 已探索區域（完全透明）
  },
  explore: {
    buttonBgActive: '#4CAF50', // 探索中按鈕背景色
    buttonBgInactive: '#757575', // 未探索按鈕背景色
    buttonText: '#FFFFFF', // 按鈕文字顏色
  },
  stats: {
    cardBg: 'rgba(255, 255, 255, 0.95)', // 統計卡片背景（深色模式下調整）
    cardBgDark: 'rgba(37, 37, 37, 0.95)', // 深色模式統計卡片背景
    textPrimary: '#252525', // 主要文字顏色
    textPrimaryDark: '#FAFAFA', // 深色模式主要文字顏色
    textSecondary: '#717182', // 次要文字顏色
    textSecondaryDark: '#B5B5B5', // 深色模式次要文字顏色
    progressBar: '#4CAF50', // 進度條顏色
    progressBarBg: '#E0E0E0', // 進度條背景色
  },
  map: {
    markerColor: '#2196F3', // 當前位置標記顏色（藍點）
    trackColor: '#FF5722', // 軌跡顏色
    gridSize: 100, // 網格大小（米）
  },
};
