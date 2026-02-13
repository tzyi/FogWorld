/**
 * Statistics Component
 * 統計資訊元件 - 顯示已探索面積、百分比、等級
 */

import React, { useMemo, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, fogMaskTheme } from '../../../theme';
import { useFogMaskStore } from '../store';
import { formatArea, formatPercent, calculateLevel } from '../utils';
import {
  calculateExploredArea,
  calculateExploredPercent,
} from '../utils/eraseFog';

interface StatisticsProps {
  /**
   * 地圖邊界
   */
  bounds?: {
    northeast: { latitude: number; longitude: number };
    southwest: { latitude: number; longitude: number };
  };
}

/**
 * Statistics 元件
 * 顯示探索統計資訊：已探索面積、百分比、等級
 */
const StatisticsComponent: React.FC<StatisticsProps> = ({ bounds }) => {
  const { fogMask, userStat } = useFogMaskStore();

  /**
   * 計算統計資訊
   */
  const stats = useMemo(() => {
    if (!fogMask || !fogMask.mapGrid || !bounds) {
      return {
        exploredArea: 0,
        exploredPercent: 0,
        level: 1,
      };
    }

    const area = calculateExploredArea(fogMask.mapGrid, bounds);
    const percent = calculateExploredPercent(fogMask.mapGrid);
    const level = calculateLevel(area);

    return {
      exploredArea: area,
      exploredPercent: percent,
      level,
    };
  }, [fogMask, bounds]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* 已探索面積 */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>已探索面積</Text>
          <Text style={styles.statValue}>{formatArea(stats.exploredArea)}</Text>
        </View>

        {/* 已探索百分比 */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>探索進度</Text>
          <Text style={styles.statValue}>{formatPercent(stats.exploredPercent)}</Text>
        </View>

        {/* 用戶等級 */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>探索等級</Text>
          <Text style={styles.statValue}>Lv. {stats.level}</Text>
        </View>
      </View>

      {/* 進度條 */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${stats.exploredPercent}%` },
          ]}
        />
      </View>
    </View>
  );
};

/**
 * 使用 React.memo 優化效能，避免不必要的重新渲染
 */
export const Statistics = memo(StatisticsComponent);

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: fogMaskTheme.stats.cardBgDark,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: fogMaskTheme.stats.textSecondaryDark,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: fogMaskTheme.stats.textPrimaryDark,
  },
  progressBarContainer: {
    marginTop: spacing.md,
    height: 8,
    backgroundColor: fogMaskTheme.stats.progressBarBg,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: fogMaskTheme.stats.progressBar,
    borderRadius: borderRadius.full,
  },
});
