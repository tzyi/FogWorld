import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../theme';

// 全域通用樣式（深色模式支援）
export const globalStyles = StyleSheet.create({
  // 容器樣式
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  containerDark: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // 文字樣式（深色模式）
  textLight: {
    color: colors.light.foreground,
  },
  textDark: {
    color: colors.dark.foreground,
  },
  textMutedLight: {
    color: colors.light.mutedForeground,
  },
  textMutedDark: {
    color: colors.dark.mutedForeground,
  },
  textPrimaryLight: {
    color: colors.light.primary,
  },
  textPrimaryDark: {
    color: colors.dark.primary,
  },

  // 標題樣式
  heading1Dark: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.dark.foreground,
  },
  heading2Dark: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    color: colors.dark.foreground,
  },
  heading3Dark: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.dark.foreground,
  },

  // 卡片樣式（深色模式）
  cardLight: {
    backgroundColor: colors.light.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  cardDark: {
    backgroundColor: colors.dark.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },

  // 按鈕樣式（深色模式）
  buttonPrimaryLight: {
    backgroundColor: colors.light.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimaryDark: {
    backgroundColor: colors.dark.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextLight: {
    color: colors.light.primaryForeground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  buttonTextDark: {
    color: colors.dark.primaryForeground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },

  // 輸入框樣式（深色模式）
  inputLight: {
    backgroundColor: colors.light.input,
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.base,
    color: colors.light.foreground,
  },
  inputDark: {
    backgroundColor: colors.dark.input,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.base,
    color: colors.dark.foreground,
  },

  // 分隔線（深色模式）
  dividerLight: {
    height: 1,
    backgroundColor: colors.light.border,
  },
  dividerDark: {
    height: 1,
    backgroundColor: colors.dark.border,
  },

  // 危險/錯誤樣式（深色模式）
  dangerTextLight: {
    color: colors.light.destructive,
  },
  dangerTextDark: {
    color: colors.dark.destructiveForeground,
  },
});

