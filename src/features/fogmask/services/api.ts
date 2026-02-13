/**
 * FogMask Feature API Service
 * 迷霧遮罩功能 API 服務層
 */

import {
  FogMask,
  ExploreTrack,
  UserStat,
  GPXFile,
} from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * API 回應型別
 */
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * 取得目前用戶的迷霧遮罩資料
 */
export const getFogMask = async (userId: string): Promise<ApiResponse<FogMask>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/fogmask?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * 更新迷霧遮罩資料
 */
export const updateFogMask = async (fogMask: FogMask): Promise<ApiResponse<FogMask>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/fogmask`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fogMask),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * 取得探索軌跡
 */
export const getExploreTracks = async (
  userId: string
): Promise<ApiResponse<ExploreTrack[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/exploretrack?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * 新增探索軌跡
 */
export const createExploreTrack = async (
  track: ExploreTrack
): Promise<ApiResponse<ExploreTrack>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/exploretrack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(track),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * 取得用戶統計資訊
 */
export const getUserStat = async (userId: string): Promise<ApiResponse<UserStat>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/userstat?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * 取得 GPX 檔案列表
 */
export const getGPXFiles = async (userId: string): Promise<ApiResponse<GPXFile[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/gpxfile?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * 上傳 GPX 檔案
 */
export const uploadGPXFile = async (
  file: File,
  userId: string
): Promise<ApiResponse<GPXFile>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const response = await fetch(`${API_BASE_URL}/gpxfile`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
