/**
 * FogMask Feature Utility Functions
 * 迷霧遮罩功能工具函式
 */

import { Coordinate } from './types';

/**
 * 計算兩點之間的距離（公里）
 * Haversine formula
 */
export const calculateDistance = (
  point1: Coordinate,
  point2: Coordinate
): number => {
  const R = 6371; // 地球半徑（公里）
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  const lat1 = toRad(point1.latitude);
  const lat2 = toRad(point2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * 將角度轉換為弧度
 */
const toRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * 生成唯一 ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 驗證座標是否有效
 */
export const isValidCoordinate = (coord: Coordinate): boolean => {
  return (
    coord.latitude >= -90 &&
    coord.latitude <= 90 &&
    coord.longitude >= -180 &&
    coord.longitude <= 180
  );
};

/**
 * 格式化面積顯示（平方公里）
 */
export const formatArea = (area: number): string => {
  if (area < 0.01) {
    return `${(area * 1000000).toFixed(0)} m²`;
  } else if (area < 1) {
    return `${(area * 1000).toFixed(2)} km²`;
  } else {
    return `${area.toFixed(2)} km²`;
  }
};

/**
 * 格式化百分比顯示
 */
export const formatPercent = (percent: number): string => {
  return `${percent.toFixed(2)}%`;
};

/**
 * 計算用戶等級（基於探索面積）
 */
export const calculateLevel = (exploredArea: number): number => {
  // 每 10 km² 增加 1 級
  return Math.floor(exploredArea / 10) + 1;
};
