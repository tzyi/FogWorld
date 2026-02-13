/**
 * FogMask Feature Zustand Store
 * 迷霧遮罩功能狀態管理
 */

import { create } from 'zustand';
import {
  FogMask,
  ExploreTrack,
  UserStat,
  Coordinate,
  MapRegion,
  ExploreStatus,
  ErrorInfo,
  ErrorType,
} from '../types';

interface FogMaskState {
  // 探索狀態
  exploreStatus: ExploreStatus;
  setExploreStatus: (status: ExploreStatus) => void;

  // 當前位置
  currentLocation: Coordinate | null;
  setCurrentLocation: (location: Coordinate) => void;

  // 地圖區域
  mapRegion: MapRegion | null;
  setMapRegion: (region: MapRegion) => void;

  // 迷霧遮罩資料
  fogMask: FogMask | null;
  setFogMask: (fogMask: FogMask) => void;
  updateFogMaskGrid: (grid: number[][]) => void;

  // 探索軌跡
  exploreTracks: ExploreTrack[];
  setExploreTracks: (tracks: ExploreTrack[]) => void;
  addExploreTrack: (track: ExploreTrack) => void;

  // 用戶統計
  userStat: UserStat | null;
  setUserStat: (stat: UserStat) => void;

  // 錯誤處理
  error: ErrorInfo | null;
  setError: (error: ErrorInfo | null) => void;
  clearError: () => void;

  // 遮罩顯示/隱藏
  isFogMaskVisible: boolean;
  toggleFogMaskVisible: () => void;

  // 重置狀態
  reset: () => void;
}

const initialState = {
  exploreStatus: ExploreStatus.IDLE,
  currentLocation: null,
  mapRegion: null,
  fogMask: null,
  exploreTracks: [],
  userStat: null,
  error: null,
  isFogMaskVisible: true,
};

export const useFogMaskStore = create<FogMaskState>((set) => ({
  ...initialState,

  setExploreStatus: (status) => set({ exploreStatus: status }),

  setCurrentLocation: (location) => set({ currentLocation: location }),

  setMapRegion: (region) => set({ mapRegion: region }),

  setFogMask: (fogMask) => set({ fogMask }),

  updateFogMaskGrid: (grid) =>
    set((state) => ({
      fogMask: state.fogMask
        ? { ...state.fogMask, mapGrid: grid, updatedAt: new Date() }
        : null,
    })),

  setExploreTracks: (tracks) => set({ exploreTracks: tracks }),

  addExploreTrack: (track) =>
    set((state) => ({
      exploreTracks: [...state.exploreTracks, track],
    })),

  setUserStat: (stat) => set({ userStat: stat }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  toggleFogMaskVisible: () =>
    set((state) => ({ isFogMaskVisible: !state.isFogMaskVisible })),

  reset: () => set(initialState),
}));

/**
 * 輔助函式：設定定位錯誤
 */
export const setLocationError = (message: string) => {
  useFogMaskStore.getState().setError({
    type: ErrorType.LOCATION_PERMISSION,
    message,
    timestamp: new Date(),
  });
};

/**
 * 輔助函式：設定地圖載入錯誤
 */
export const setMapLoadError = (message: string) => {
  useFogMaskStore.getState().setError({
    type: ErrorType.MAP_LOAD_FAILED,
    message,
    timestamp: new Date(),
  });
};

/**
 * 輔助函式：設定儲存錯誤
 */
export const setStorageError = (message: string) => {
  useFogMaskStore.getState().setError({
    type: ErrorType.STORAGE_ERROR,
    message,
    timestamp: new Date(),
  });
};
