/**
 * useFogMask Hook
 * 迷霧遮罩邏輯 Hook - 管理迷霧遮罩的即時更新
 */

import { useEffect, useCallback, useRef } from 'react';
import * as Location from 'expo-location';
import { useFogMaskStore, setLocationError } from '../store';
import { ExploreStatus, Coordinate } from '../types';
import { isValidCoordinate, generateId } from '../utils';
import { saveFogMask, loadFogMask } from '../services/storage';
import { fogMaskTheme } from '../../../theme';

interface UseFogMaskOptions {
  /**
   * 網格行數
   */
  gridRows?: number;
  /**
   * 網格列數
   */
  gridCols?: number;
  /**
   * 位置更新間隔（毫秒）
   */
  updateInterval?: number;
}

/**
 * useFogMask Hook
 * 處理迷霧遮罩的初始化、位置追蹤與遮罩更新
 */
export const useFogMask = (options: UseFogMaskOptions = {}) => {
  const {
    gridRows = 50,
    gridCols = 50,
    updateInterval = 5000,
  } = options;

  const {
    exploreStatus,
    setExploreStatus,
    currentLocation,
    setCurrentLocation,
    fogMask,
    setFogMask,
    updateFogMaskGrid,
    mapRegion,
  } = useFogMaskStore();

  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  /**
   * 初始化迷霧遮罩
   */
  useEffect(() => {
    const initFogMask = async () => {
      // 嘗試從本地載入迷霧遮罩
      const savedFogMask = await loadFogMask();
      
      if (savedFogMask) {
        setFogMask(savedFogMask);
      } else {
        // 建立新的迷霧遮罩（全未探索）
        const newFogMask = {
          id: generateId(),
          userId: 'default-user', // TODO: 從認證系統取得真實 userId
          mapGrid: Array(gridRows)
            .fill(null)
            .map(() => Array(gridCols).fill(0)),
          updatedAt: new Date(),
        };
        setFogMask(newFogMask);
        await saveFogMask(newFogMask);
      }
    };

    initFogMask();
  }, [gridRows, gridCols, setFogMask]);

  /**
   * 請求定位權限並開始追蹤位置
   */
  const startLocationTracking = useCallback(async () => {
    try {
      // 請求定位權限
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationError('定位權限未授予，無法開始探索');
        setExploreStatus(ExploreStatus.ERROR);
        return false;
      }

      // 獲取當前位置
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const currentCoord: Coordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      if (!isValidCoordinate(currentCoord)) {
        setLocationError('定位資料無效');
        setExploreStatus(ExploreStatus.ERROR);
        return false;
      }

      setCurrentLocation(currentCoord);

      // 開始監聽位置變化
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: updateInterval,
          distanceInterval: fogMaskTheme.map.gridSize / 2,
        },
        (newLocation) => {
          const newCoord: Coordinate = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          };
          
          if (isValidCoordinate(newCoord)) {
            setCurrentLocation(newCoord);
          }
        }
      );

      return true;
    } catch (error) {
      console.error('Location tracking error:', error);
      setLocationError('定位服務啟動失敗');
      setExploreStatus(ExploreStatus.ERROR);
      return false;
    }
  }, [updateInterval, setCurrentLocation, setExploreStatus]);

  /**
   * 停止位置追蹤
   */
  const stopLocationTracking = useCallback(() => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  }, []);

  /**
   * 根據當前位置更新迷霧遮罩
   */
  useEffect(() => {
    if (
      exploreStatus === ExploreStatus.EXPLORING &&
      currentLocation &&
      fogMask &&
      mapRegion
    ) {
      // 計算地圖邊界
      const bounds = {
        northeast: {
          latitude: mapRegion.latitude + mapRegion.latitudeDelta / 2,
          longitude: mapRegion.longitude + mapRegion.longitudeDelta / 2,
        },
        southwest: {
          latitude: mapRegion.latitude - mapRegion.latitudeDelta / 2,
          longitude: mapRegion.longitude - mapRegion.longitudeDelta / 2,
        },
      };

      // 使用 eraseFog 演算法更新網格
      const { eraseFog } = require('../utils/eraseFog');
      const newGrid = eraseFog(
        fogMask.mapGrid,
        currentLocation,
        bounds,
        fogMaskTheme.map.gridSize
      );

      // 更新迷霧遮罩
      updateFogMaskGrid(newGrid);

      // 儲存到本地
      saveFogMask({
        ...fogMask,
        mapGrid: newGrid,
        updatedAt: new Date(),
      }).catch((error) => {
        console.error('Failed to save fog mask:', error);
      });
    }
  }, [currentLocation, exploreStatus, fogMask, mapRegion, updateFogMaskGrid]);

  /**
   * 清理資源
   */
  useEffect(() => {
    return () => {
      stopLocationTracking();
    };
  }, [stopLocationTracking]);

  return {
    startLocationTracking,
    stopLocationTracking,
  };
};
