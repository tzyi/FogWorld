/**
 * useFogMask Hook Tests
 * 迷霧遮罩邏輯 Hook 測試
 */

import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useFogMask } from '../../../src/features/fogmask/hooks/useFogMask';
import { useFogMaskStore } from '../../../src/features/fogmask/store';
import * as Location from 'expo-location';

// Mock expo-location
jest.mock('expo-location');

// Mock the store
jest.mock('../../../src/features/fogmask/store');

// Mock storage
jest.mock('../../../src/features/fogmask/services/storage', () => ({
  saveFogMask: jest.fn().mockResolvedValue(undefined),
  loadFogMask: jest.fn().mockResolvedValue(null),
}));

describe('useFogMask Hook', () => {
  const mockSetExploreStatus = jest.fn();
  const mockSetCurrentLocation = jest.fn();
  const mockSetFogMask = jest.fn();
  const mockUpdateFogMaskGrid = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: 'idle',
      setExploreStatus: mockSetExploreStatus,
      currentLocation: null,
      setCurrentLocation: mockSetCurrentLocation,
      fogMask: null,
      setFogMask: mockSetFogMask,
      updateFogMaskGrid: mockUpdateFogMaskGrid,
    });

    // Mock Location API
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: 25.033,
        longitude: 121.5654,
        altitude: 0,
        accuracy: 10,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    });

    (Location.watchPositionAsync as jest.Mock).mockResolvedValue({
      remove: jest.fn(),
    });
  });

  it('should initialize fogMask on mount', async () => {
    renderHook(() => useFogMask());

    await waitFor(() => {
      expect(mockSetFogMask).toHaveBeenCalled();
    });
  });

  it('should request location permission when starting tracking', async () => {
    const { result } = renderHook(() => useFogMask());

    await act(async () => {
      await result.current.startLocationTracking();
    });

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
  });

  it('should get current position when starting tracking', async () => {
    const { result } = renderHook(() => useFogMask());

    await act(async () => {
      await result.current.startLocationTracking();
    });

    expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
    expect(mockSetCurrentLocation).toHaveBeenCalledWith({
      latitude: 25.033,
      longitude: 121.5654,
    });
  });

  it('should start watching position when starting tracking', async () => {
    const { result } = renderHook(() => useFogMask());

    await act(async () => {
      await result.current.startLocationTracking();
    });

    expect(Location.watchPositionAsync).toHaveBeenCalled();
  });

  it('should return false when location permission is denied', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const { result } = renderHook(() => useFogMask());

    let success = false;
    await act(async () => {
      success = await result.current.startLocationTracking();
    });

    expect(success).toBe(false);
    expect(mockSetExploreStatus).toHaveBeenCalledWith('error');
  });

  it('should stop location tracking when stopLocationTracking is called', async () => {
    const mockRemove = jest.fn();
    (Location.watchPositionAsync as jest.Mock).mockResolvedValue({
      remove: mockRemove,
    });

    const { result } = renderHook(() => useFogMask());

    await act(async () => {
      await result.current.startLocationTracking();
    });

    act(() => {
      result.current.stopLocationTracking();
    });

    expect(mockRemove).toHaveBeenCalled();
  });

  it('should handle invalid coordinates', async () => {
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: 91, // Invalid latitude
        longitude: 121.5654,
        altitude: 0,
        accuracy: 10,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    });

    const { result } = renderHook(() => useFogMask());

    let success = false;
    await act(async () => {
      success = await result.current.startLocationTracking();
    });

    expect(success).toBe(false);
  });
});
