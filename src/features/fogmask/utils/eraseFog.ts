/**
 * Erase Fog Algorithm
 * 迷霧擦除演算法 - 根據使用者位置擦除迷霧遮罩
 */

import { Coordinate, MapRegion } from '../types';
import { isValidCoordinate, calculateDistance } from '../utils';
import { fogMaskTheme } from '../../../theme';

/**
 * 計算座標對應的網格索引
 */
export const coordinateToGridIndex = (
  coordinate: Coordinate,
  bounds: { northeast: Coordinate; southwest: Coordinate },
  gridRows: number,
  gridCols: number
): { row: number; col: number } | null => {
  if (!isValidCoordinate(coordinate)) {
    return null;
  }

  const { latitude, longitude } = coordinate;
  const { northeast, southwest } = bounds;

  // 檢查座標是否在邊界內
  if (
    latitude < southwest.latitude ||
    latitude > northeast.latitude ||
    longitude < southwest.longitude ||
    longitude > northeast.longitude
  ) {
    return null;
  }

  // 計算網格索引
  const latRange = northeast.latitude - southwest.latitude;
  const lngRange = northeast.longitude - southwest.longitude;

  const row = Math.floor(
    ((latitude - southwest.latitude) / latRange) * gridRows
  );
  const col = Math.floor(
    ((longitude - southwest.longitude) / lngRange) * gridCols
  );

  // 確保索引在有效範圍內
  if (row < 0 || row >= gridRows || col < 0 || col >= gridCols) {
    return null;
  }

  return { row, col };
};

/**
 * 計算網格索引對應的座標
 */
export const gridIndexToCoordinate = (
  row: number,
  col: number,
  bounds: { northeast: Coordinate; southwest: Coordinate },
  gridRows: number,
  gridCols: number
): Coordinate => {
  const { northeast, southwest } = bounds;

  const latRange = northeast.latitude - southwest.latitude;
  const lngRange = northeast.longitude - southwest.longitude;

  const latitude = southwest.latitude + (row + 0.5) * (latRange / gridRows);
  const longitude = southwest.longitude + (col + 0.5) * (lngRange / gridCols);

  return { latitude, longitude };
};

/**
 * 擦除迷霧 - 根據當前位置更新網格
 * @param mapGrid 當前迷霧遮罩網格
 * @param currentLocation 當前位置
 * @param bounds 地圖邊界
 * @param radius 擦除半徑（米）
 * @returns 更新後的網格
 */
export const eraseFog = (
  mapGrid: number[][],
  currentLocation: Coordinate,
  bounds: { northeast: Coordinate; southwest: Coordinate },
  radius: number = fogMaskTheme.map.gridSize
): number[][] => {
  if (!isValidCoordinate(currentLocation)) {
    return mapGrid;
  }

  const gridRows = mapGrid.length;
  const gridCols = mapGrid[0]?.length || 0;

  if (gridRows === 0 || gridCols === 0) {
    return mapGrid;
  }

  // 複製網格以避免直接修改
  const newGrid = mapGrid.map((row) => [...row]);

  // 計算當前位置的網格索引
  const centerIndex = coordinateToGridIndex(
    currentLocation,
    bounds,
    gridRows,
    gridCols
  );

  if (!centerIndex) {
    return mapGrid;
  }

  // 計算需要擦除的網格範圍
  const radiusInDegrees = radius / 111000; // 約 111km = 1度
  const latRange = bounds.northeast.latitude - bounds.southwest.latitude;
  const lngRange = bounds.northeast.longitude - bounds.southwest.longitude;

  const rowRadius = Math.ceil((radiusInDegrees / latRange) * gridRows);
  const colRadius = Math.ceil((radiusInDegrees / lngRange) * gridCols);

  // 擦除中心點周圍的網格
  for (
    let rowOffset = -rowRadius;
    rowOffset <= rowRadius;
    rowOffset++
  ) {
    for (
      let colOffset = -colRadius;
      colOffset <= colRadius;
      colOffset++
    ) {
      const row = centerIndex.row + rowOffset;
      const col = centerIndex.col + colOffset;

      // 檢查索引範圍
      if (row < 0 || row >= gridRows || col < 0 || col >= gridCols) {
        continue;
      }

      // 計算網格中心座標
      const gridCenter = gridIndexToCoordinate(
        row,
        col,
        bounds,
        gridRows,
        gridCols
      );

      // 計算距離
      const distance = calculateDistance(currentLocation, gridCenter);

      // 如果在擦除半徑內，標記為已探索
      if (distance * 1000 <= radius) {
        newGrid[row][col] = 1;
      }
    }
  }

  return newGrid;
};

/**
 * 計算已探索的網格數量
 */
export const countExploredGrids = (mapGrid: number[][]): number => {
  let count = 0;
  for (let row = 0; row < mapGrid.length; row++) {
    for (let col = 0; col < mapGrid[row].length; col++) {
      if (mapGrid[row][col] === 1) {
        count++;
      }
    }
  }
  return count;
};

/**
 * 計算已探索面積（平方公里）
 */
export const calculateExploredArea = (
  mapGrid: number[][],
  bounds: { northeast: Coordinate; southwest: Coordinate }
): number => {
  const exploredCount = countExploredGrids(mapGrid);
  const totalGrids = mapGrid.length * (mapGrid[0]?.length || 0);

  if (totalGrids === 0) {
    return 0;
  }

  // 計算地圖總面積（平方公里）
  const latRange = bounds.northeast.latitude - bounds.southwest.latitude;
  const lngRange = bounds.northeast.longitude - bounds.southwest.longitude;

  // 粗略估算面積（1度經緯度約 111km）
  const totalArea = (latRange * 111) * (lngRange * 111 * Math.cos((bounds.northeast.latitude + bounds.southwest.latitude) / 2 * Math.PI / 180));

  return (exploredCount / totalGrids) * totalArea;
};

/**
 * 計算已探索百分比
 */
export const calculateExploredPercent = (mapGrid: number[][]): number => {
  const exploredCount = countExploredGrids(mapGrid);
  const totalGrids = mapGrid.length * (mapGrid[0]?.length || 0);

  if (totalGrids === 0) {
    return 0;
  }

  return (exploredCount / totalGrids) * 100;
};
