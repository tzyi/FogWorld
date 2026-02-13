/**
 * TrackRecorder Tests
 * 軌跡記錄測試
 */

import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useTrackRecorder } from '../../../src/features/fogmask/hooks/useTrackRecorder';
import { useFogMaskStore } from '../../../src/features/fogmask/store';
import { ExploreStatus } from '../../../src/features/fogmask/types';
import * as storage from '../../../src/features/fogmask/services/storage';

// Mock the store
jest.mock('../../../src/features/fogmask/store');

// Mock storage
jest.mock('../../../src/features/fogmask/services/storage');

describe('useTrackRecorder Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (storage.saveTrack as jest.Mock).mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should start recording when explore status is EXPLORING', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      currentLocation: { latitude: 25.033, longitude: 121.5654 },
      mapRegion: null,
    });

    renderHook(() => useTrackRecorder({ recordInterval: 5000 }));

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(storage.saveTrack).toHaveBeenCalled();
    });
  });

  it('should stop recording when explore status is IDLE', () => {
    const { rerender } = renderHook(() => useTrackRecorder({ recordInterval: 5000 }));

    // Initially EXPLORING
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      currentLocation: { latitude: 25.033, longitude: 121.5654 },
      mapRegion: null,
    });

    rerender({});

    // Change to IDLE
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.IDLE,
      currentLocation: null,
      mapRegion: null,
    });

    rerender({});

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Should not record after stopping
    expect(storage.saveTrack).not.toHaveBeenCalled();
  });

  it('should not record if location is invalid', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      currentLocation: { latitude: 91, longitude: 121.5654 }, // Invalid latitude
      mapRegion: null,
    });

    renderHook(() => useTrackRecorder({ recordInterval: 5000 }));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(storage.saveTrack).not.toHaveBeenCalled();
    });
  });

  it('should not record if movement distance is less than minDistance', async () => {
    // First location
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      currentLocation: { latitude: 25.033, longitude: 121.5654 },
      mapRegion: null,
    });

    const { rerender } = renderHook(() =>
      useTrackRecorder({ recordInterval: 5000, minDistance: 100 })
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(storage.saveTrack).toHaveBeenCalledTimes(1);
    });

    // Move very slightly (less than minDistance)
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      currentLocation: { latitude: 25.0331, longitude: 121.5655 }, // ~15m movement
      mapRegion: null,
    });

    rerender({});

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Should not record again because distance is too small
    await waitFor(() => {
      expect(storage.saveTrack).toHaveBeenCalledTimes(1);
    });
  });

  it('should record if movement distance exceeds minDistance', async () => {
    // First location
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      currentLocation: { latitude: 25.033, longitude: 121.5654 },
      mapRegion: null,
    });

    const { rerender } = renderHook(() =>
      useTrackRecorder({ recordInterval: 5000, minDistance: 10 })
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(storage.saveTrack).toHaveBeenCalledTimes(1);
    });

    // Move significantly (more than minDistance)
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      currentLocation: { latitude: 25.034, longitude: 121.566 }, // ~100m movement
      mapRegion: null,
    });

    rerender({});

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Should record again
    await waitFor(() => {
      expect(storage.saveTrack).toHaveBeenCalledTimes(2);
    });
  });

  it('should handle storage errors gracefully', async () => {
    (storage.saveTrack as jest.Mock).mockRejectedValue(
      new Error('Storage error')
    );

    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      currentLocation: { latitude: 25.033, longitude: 121.5654 },
      mapRegion: null,
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    renderHook(() => useTrackRecorder({ recordInterval: 5000 }));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save track:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
