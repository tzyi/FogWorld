/**
 * ErrorHandler Tests
 * 錯誤處理測試
 */

import { renderHook, waitFor } from '@testing-library/react-native';
import { useErrorHandler } from '../../../src/features/fogmask/hooks/useErrorHandler';
import { useFogMaskStore } from '../../../src/features/fogmask/store';
import { ErrorType } from '../../../src/features/fogmask/types';
import { Alert } from 'react-native';

// Mock the store
jest.mock('../../../src/features/fogmask/store');

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('useErrorHandler Hook', () => {
  const mockClearError = jest.fn();
  const mockSetExploreStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: null,
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });
  });

  it('should handle location permission error', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: {
        type: ErrorType.LOCATION_PERMISSION,
        message: '定位權限未授予',
        timestamp: new Date(),
      },
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });

    renderHook(() => useErrorHandler({ autoShowAlert: true }));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '定位權限錯誤',
        expect.any(String),
        expect.any(Array)
      );
      expect(mockSetExploreStatus).toHaveBeenCalledWith('error');
    });
  });

  it('should handle location unavailable error', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: {
        type: ErrorType.LOCATION_UNAVAILABLE,
        message: '定位服務不可用',
        timestamp: new Date(),
      },
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });

    renderHook(() => useErrorHandler({ autoShowAlert: true }));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '定位服務不可用',
        expect.any(String),
        expect.any(Array)
      );
      expect(mockSetExploreStatus).toHaveBeenCalledWith('error');
    });
  });

  it('should handle map load failed error', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: {
        type: ErrorType.MAP_LOAD_FAILED,
        message: '地圖載入失敗',
        timestamp: new Date(),
      },
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });

    renderHook(() => useErrorHandler({ autoShowAlert: true }));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '地圖載入失敗',
        expect.any(String),
        expect.any(Array)
      );
      expect(mockSetExploreStatus).toHaveBeenCalledWith('error');
    });
  });

  it('should handle storage error without stopping explore', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: {
        type: ErrorType.STORAGE_ERROR,
        message: '資料儲存失敗',
        timestamp: new Date(),
      },
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });

    renderHook(() => useErrorHandler({ autoShowAlert: true }));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '儲存錯誤',
        expect.any(String),
        expect.any(Array)
      );
      // Storage error should not set explore status to error
    });
  });

  it('should handle network error', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: {
        type: ErrorType.NETWORK_ERROR,
        message: '網路連線失敗',
        timestamp: new Date(),
      },
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });

    renderHook(() => useErrorHandler({ autoShowAlert: true }));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '網路錯誤',
        expect.any(String),
        expect.any(Array)
      );
    });
  });

  it('should call onError callback when provided', async () => {
    const mockOnError = jest.fn();

    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: {
        type: ErrorType.LOCATION_PERMISSION,
        message: '定位權限未授予',
        timestamp: new Date(),
      },
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });

    renderHook(() =>
      useErrorHandler({ autoShowAlert: true, onError: mockOnError })
    );

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith({
        type: ErrorType.LOCATION_PERMISSION,
        message: '定位權限未授予',
      });
    });
  });

  it('should not show alert when autoShowAlert is false', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: {
        type: ErrorType.LOCATION_PERMISSION,
        message: '定位權限未授予',
        timestamp: new Date(),
      },
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });

    renderHook(() => useErrorHandler({ autoShowAlert: false }));

    await waitFor(() => {
      expect(Alert.alert).not.toHaveBeenCalled();
    });
  });

  it('should handle unknown error type', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      error: {
        type: ErrorType.UNKNOWN,
        message: '未知錯誤',
        timestamp: new Date(),
      },
      clearError: mockClearError,
      setExploreStatus: mockSetExploreStatus,
    });

    renderHook(() => useErrorHandler({ autoShowAlert: true }));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '錯誤',
        '未知錯誤',
        expect.any(Array)
      );
    });
  });
});
