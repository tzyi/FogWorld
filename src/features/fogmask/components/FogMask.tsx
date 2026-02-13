/**
 * FogMask Component
 * 迷霧遮罩元件 - 在地圖上顯示迷霧效果
 */

import React, { useMemo, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Polygon } from 'react-native-maps';
import { fogMaskTheme } from '../../../theme';
import { useFogMaskStore } from '../store';

interface FogMaskProps {
  /**
   * 地圖邊界
   */
  bounds: {
    northeast: { latitude: number; longitude: number };
    southwest: { latitude: number; longitude: number };
  };
}

/**
 * FogMask 元件
 * 根據探索狀態顯示迷霧遮罩，已探索區域為透明，未探索區域為半透明黑色
 */
const FogMaskComponent: React.FC<FogMaskProps> = ({ bounds }) => {
  const { fogMask, isFogMaskVisible } = useFogMaskStore();

  /**
   * 生成迷霧遮罩多邊形座標
   * 將 mapGrid 轉換為地圖上的多邊形區域
   */
  const fogPolygons = useMemo(() => {
    if (!fogMask || !fogMask.mapGrid) return [];

    const polygons: Array<{
      coordinates: Array<{ latitude: number; longitude: number }>;
      explored: boolean;
    }> = [];

    const gridRows = fogMask.mapGrid.length;
    const gridCols = fogMask.mapGrid[0]?.length || 0;

    if (gridRows === 0 || gridCols === 0) return [];

    // 計算每個網格的經緯度大小
    const latStep =
      (bounds.northeast.latitude - bounds.southwest.latitude) / gridRows;
    const lngStep =
      (bounds.northeast.longitude - bounds.southwest.longitude) / gridCols;

    // 遍歷網格並生成多邊形 (只渲染未探索區域以提升效能)
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const explored = fogMask.mapGrid[row][col] === 1;

        // 跳過已探索區域以減少渲染負擔
        if (explored) continue;

        // 計算網格四個角的座標
        const coordinates = [
          {
            latitude: bounds.southwest.latitude + row * latStep,
            longitude: bounds.southwest.longitude + col * lngStep,
          },
          {
            latitude: bounds.southwest.latitude + row * latStep,
            longitude: bounds.southwest.longitude + (col + 1) * lngStep,
          },
          {
            latitude: bounds.southwest.latitude + (row + 1) * latStep,
            longitude: bounds.southwest.longitude + (col + 1) * lngStep,
          },
          {
            latitude: bounds.southwest.latitude + (row + 1) * latStep,
            longitude: bounds.southwest.longitude + col * lngStep,
          },
        ];

        polygons.push({ coordinates, explored: false });
      }
    }

    return polygons;
  }, [fogMask, bounds]);

  if (!isFogMaskVisible || !fogMask) {
    return null;
  }

  return (
    <>
      {fogPolygons.map((polygon, index) => (
        <Polygon
          key={`fog-${index}`}
          coordinates={polygon.coordinates}
          fillColor={fogMaskTheme.fog.color}
          strokeWidth={0}
        />
      ))}
    </>
  );
};

/**
 * 使用 React.memo 優化效能，只在 props 變化時重新渲染
 */
export const FogMask = memo(FogMaskComponent, (prevProps, nextProps) => {
  // 自定義比較函數：只在邊界變化時重新渲染
  return (
    prevProps.bounds.northeast.latitude === nextProps.bounds.northeast.latitude &&
    prevProps.bounds.northeast.longitude === nextProps.bounds.northeast.longitude &&
    prevProps.bounds.southwest.latitude === nextProps.bounds.southwest.latitude &&
    prevProps.bounds.southwest.longitude === nextProps.bounds.southwest.longitude
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
});
