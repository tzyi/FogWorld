/**
 * useTrackRecorder Hook
 * 軌跡記錄 Hook - 管理探索軌跡的記錄與儲存
 */

import { useEffect, useRef, useCallback } from 'react';
import { useFogMaskStore } from '../store';
import { ExploreStatus, Track } from '../types';
import { generateId, isValidCoordinate } from '../utils';
import { saveTrack } from '../services/storage';

interface UseTrackRecorderOptions {
  /**
   * 記錄間隔（毫秒）
   */
  recordInterval?: number;
  /**
   * 最小移動距離（米）- 小於此距離不記錄新點
   */
  minDistance?: number;
}

/**
 * useTrackRecorder Hook
 * 處理探索軌跡的自動記錄與儲存
 */
export const useTrackRecorder = (options: UseTrackRecorderOptions = {}) => {
  const { recordInterval = 5000, minDistance = 10 } = options;

  const {
    exploreStatus,
    currentLocation,
    mapRegion,
  } = useFogMaskStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRecordedLocation = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);

  /**
   * 計算兩點之間的距離（米）
   */
  const calculateDistanceInMeters = useCallback(
    (
      point1: { latitude: number; longitude: number },
      point2: { latitude: number; longitude: number }
    ) => {
      const R = 6371e3; // 地球半徑（米）
      const φ1 = (point1.latitude * Math.PI) / 180;
      const φ2 = (point2.latitude * Math.PI) / 180;
      const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
      const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    },
    []
  );

  /**
   * 計算網格 ID
   */
  const calculateGridId = useCallback(
    (latitude: number, longitude: number): string => {
      // 使用簡單的網格劃分（0.001度 約 111米）
      const gridLat = Math.floor(latitude / 0.001);
      const gridLng = Math.floor(longitude / 0.001);
      return `${gridLat}_${gridLng}`;
    },
    []
  );

  /**
   * 記錄軌跡點
   */
  const recordTrackPoint = useCallback(async () => {
    if (!currentLocation || !isValidCoordinate(currentLocation)) {
      return;
    }

    // 檢查是否需要記錄（距離上次記錄點的距離）
    if (lastRecordedLocation.current) {
      const distance = calculateDistanceInMeters(
        lastRecordedLocation.current,
        currentLocation
      );
      
      if (distance < minDistance) {
        // 移動距離太小，不記錄
        return;
      }
    }

    // 計算網格 ID
    const gridId = calculateGridId(
      currentLocation.latitude,
      currentLocation.longitude
    );

    // 建立軌跡點
    const track: Track = {
      id: generateId(),
      time: new Date(),
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
      grid_id: gridId,
    };

    try {
      // 儲存軌跡點到 SQLite
      await saveTrack(track);
      
      // 更新最後記錄的位置
      lastRecordedLocation.current = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      };

      console.log(`Track recorded: ${track.id} at (${track.lat}, ${track.lng})`);
    } catch (error) {
      console.error('Failed to save track:', error);
    }
  }, [currentLocation, minDistance, calculateDistanceInMeters, calculateGridId]);

  /**
   * 開始記錄軌跡
   */
  const startRecording = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // 立即記錄一次
    recordTrackPoint();

    // 設定定時記錄
    intervalRef.current = setInterval(() => {
      recordTrackPoint();
    }, recordInterval);
  }, [recordInterval, recordTrackPoint]);

  /**
   * 停止記錄軌跡
   */
  const stopRecording = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    lastRecordedLocation.current = null;
  }, []);

  /**
   * 根據探索狀態自動開始/停止記錄
   */
  useEffect(() => {
    if (exploreStatus === ExploreStatus.EXPLORING) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => {
      stopRecording();
    };
  }, [exploreStatus, startRecording, stopRecording]);

  return {
    startRecording,
    stopRecording,
    recordTrackPoint,
  };
};
