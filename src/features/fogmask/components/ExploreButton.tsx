/**
 * ExploreButton Component
 * 探索按鈕元件 - 控制探索模式的啟動與停止
 */

import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../../theme';
import { fogMaskTheme } from '../../../theme';
import { useFogMaskStore } from '../store';
import { ExploreStatus } from '../types';

interface ExploreButtonProps {
  /**
   * 按鈕點擊回調
   */
  onPress: () => void;
  /**
   * 是否正在載入
   */
  loading?: boolean;
}

/**
 * ExploreButton 元件
 * 顯示探索按鈕，根據探索狀態改變按鈕樣式與文字
 */
const ExploreButtonComponent: React.FC<ExploreButtonProps> = ({
  onPress,
  loading = false,
}) => {
  const { exploreStatus } = useFogMaskStore();

  const isExploring = exploreStatus === ExploreStatus.EXPLORING;
  const buttonText = isExploring ? '停止探索' : '開始探索';
  const buttonBg = isExploring
    ? fogMaskTheme.explore.buttonBgActive
    : fogMaskTheme.explore.buttonBgInactive;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonBg }]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={fogMaskTheme.explore.buttonText} />
      ) : (
        <Text style={styles.buttonText}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

/**
 * 使用 React.memo 優化效能，避免不必要的重新渲染
 */
export const ExploreButton = memo(ExploreButtonComponent);

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: fogMaskTheme.explore.buttonText,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
});
