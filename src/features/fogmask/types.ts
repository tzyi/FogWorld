/**
 * FogMask Feature Type Definitions
 * 迷霧遮罩功能型別定義
 */

/**
 * 迷霧遮罩資料結構
 */
export interface FogMask {
  id: string;
  userId: string;
  mapGrid: number[][]; // 0=未探索, 1=已探索
  updatedAt: Date;
}

/**
 * 探索軌跡資料結構
 */
export interface ExploreTrack {
  id: string;
  userId: string;
  points: ExplorePoint[];
  createdAt: Date;
}

/**
 * 探索軌跡點
 */
export interface ExplorePoint {
  lat: number;
  lng: number;
  timestamp: number;
}

/**
 * 用戶統計資訊
 */
export interface UserStat {
  userId: string;
  exploredArea: number; // 單位: 平方公里
  exploredPercent: number; // 百分比 0-100
  level: number;
  updatedAt: Date;
}

/**
 * GPX 檔案資料結構
 */
export interface GPXFile {
  id: string;
  userId: string;
  fileName: string;
  uploadedAt: Date;
  localPath: string;
}

/**
 * 網格資料結構
 */
export interface Grid {
  grid_id: string;
  explored: boolean;
  updated_at: Date;
}

/**
 * 軌跡資料結構
 */
export interface Track {
  id: string;
  time: Date;
  lat: number;
  lng: number;
  grid_id: string;
}

/**
 * 統計資料結構
 */
export interface Stat {
  id: string;
  key: string;
  value: number;
}

/**
 * 座標資料結構
 */
export interface Coordinate {
  latitude: number;
  longitude: number;
}

/**
 * 地圖區域資料結構
 */
export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * 探索狀態
 */
export enum ExploreStatus {
  IDLE = 'idle',
  EXPLORING = 'exploring',
  PAUSED = 'paused',
  ERROR = 'error',
}

/**
 * 錯誤類型
 */
export enum ErrorType {
  LOCATION_PERMISSION = 'location_permission',
  LOCATION_UNAVAILABLE = 'location_unavailable',
  MAP_LOAD_FAILED = 'map_load_failed',
  STORAGE_ERROR = 'storage_error',
  NETWORK_ERROR = 'network_error',
  UNKNOWN = 'unknown',
}

/**
 * 錯誤資訊
 */
export interface ErrorInfo {
  type: ErrorType;
  message: string;
  timestamp: Date;
}
