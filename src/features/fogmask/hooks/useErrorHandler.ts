/**
 * useErrorHandler Hook
 * 錯誤處理 Hook - 管理探索過程中的異常情況
 */

import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFogMaskStore } from '../store';
import { ErrorType, ExploreStatus } from '../types';

interface UseErrorHandlerOptions {
  /**
   * 自動顯示錯誤提示
   */
  autoShowAlert?: boolean;
  /**
   * 錯誤回調
   */
  onError?: (error: { type: ErrorType; message: string }) => void;
}

/**
 * useErrorHandler Hook
 * 處理探索過程中的各種異常情況
 */
export const useErrorHandler = (options: UseErrorHandlerOptions = {}) => {
  const { autoShowAlert = true, onError } = options;

  const { error, clearError, setExploreStatus } = useFogMaskStore();

  /**
   * 處理定位權限錯誤
   */
  const handleLocationPermissionError = useCallback(() => {
    setExploreStatus(ExploreStatus.ERROR);
    
    if (autoShowAlert) {
      Alert.alert(
        '定位權限錯誤',
        '無法取得定位權限，請在設定中開啟定位權限。',
        [
          {
            text: '確定',
            onPress: () => {
              clearError();
              setExploreStatus(ExploreStatus.IDLE);
            },
          },
        ]
      );
    }

    if (onError) {
      onError({
        type: ErrorType.LOCATION_PERMISSION,
        message: '定位權限未授予',
      });
    }
  }, [autoShowAlert, clearError, setExploreStatus, onError]);

  /**
   * 處理定位服務不可用錯誤
   */
  const handleLocationUnavailableError = useCallback(() => {
    setExploreStatus(ExploreStatus.ERROR);
    
    if (autoShowAlert) {
      Alert.alert(
        '定位服務不可用',
        '無法取得當前位置，請確認定位服務已開啟。',
        [
          {
            text: '確定',
            onPress: () => {
              clearError();
              setExploreStatus(ExploreStatus.IDLE);
            },
          },
        ]
      );
    }

    if (onError) {
      onError({
        type: ErrorType.LOCATION_UNAVAILABLE,
        message: '定位服務不可用',
      });
    }
  }, [autoShowAlert, clearError, setExploreStatus, onError]);

  /**
   * 處理地圖載入錯誤
   */
  const handleMapLoadError = useCallback(() => {
    setExploreStatus(ExploreStatus.ERROR);
    
    if (autoShowAlert) {
      Alert.alert(
        '地圖載入失敗',
        '無法載入地圖資料，請檢查網路連線後重試。',
        [
          {
            text: '確定',
            onPress: () => {
              clearError();
              setExploreStatus(ExploreStatus.IDLE);
            },
          },
        ]
      );
    }

    if (onError) {
      onError({
        type: ErrorType.MAP_LOAD_FAILED,
        message: '地圖載入失敗',
      });
    }
  }, [autoShowAlert, clearError, setExploreStatus, onError]);

  /**
   * 處理儲存錯誤
   */
  const handleStorageError = useCallback(() => {
    // 儲存錯誤不中斷探索，只提示
    if (autoShowAlert) {
      Alert.alert(
        '儲存錯誤',
        '資料儲存失敗，可能影響探索進度記錄。',
        [
          {
            text: '確定',
            onPress: () => {
              clearError();
            },
          },
        ]
      );
    }

    if (onError) {
      onError({
        type: ErrorType.STORAGE_ERROR,
        message: '資料儲存失敗',
      });
    }
  }, [autoShowAlert, clearError, onError]);

  /**
   * 處理網路錯誤
   */
  const handleNetworkError = useCallback(() => {
    if (autoShowAlert) {
      Alert.alert(
        '網路錯誤',
        '網路連線失敗，某些功能可能無法使用。',
        [
          {
            text: '確定',
            onPress: () => {
              clearError();
            },
          },
        ]
      );
    }

    if (onError) {
      onError({
        type: ErrorType.NETWORK_ERROR,
        message: '網路連線失敗',
      });
    }
  }, [autoShowAlert, clearError, onError]);

  /**
   * 根據錯誤類型分派處理
   */
  useEffect(() => {
    if (!error) return;

    switch (error.type) {
      case ErrorType.LOCATION_PERMISSION:
        handleLocationPermissionError();
        break;
      case ErrorType.LOCATION_UNAVAILABLE:
        handleLocationUnavailableError();
        break;
      case ErrorType.MAP_LOAD_FAILED:
        handleMapLoadError();
        break;
      case ErrorType.STORAGE_ERROR:
        handleStorageError();
        break;
      case ErrorType.NETWORK_ERROR:
        handleNetworkError();
        break;
      default:
        // 未知錯誤
        if (autoShowAlert) {
          Alert.alert(
            '錯誤',
            error.message || '發生未知錯誤',
            [
              {
                text: '確定',
                onPress: () => {
                  clearError();
                },
              },
            ]
          );
        }
    }
  }, [
    error,
    autoShowAlert,
    handleLocationPermissionError,
    handleLocationUnavailableError,
    handleMapLoadError,
    handleStorageError,
    handleNetworkError,
    clearError,
  ]);

  return {
    handleLocationPermissionError,
    handleLocationUnavailableError,
    handleMapLoadError,
    handleStorageError,
    handleNetworkError,
  };
};
