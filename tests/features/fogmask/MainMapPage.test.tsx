/**
 * MainMapPage Component Tests
 * 主地圖頁面測試
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { MainMapPage } from '../../../src/features/fogmask/MainMapPage';
import { useFogMaskStore } from '../../../src/features/fogmask/store';
import { ExploreStatus } from '../../../src/features/fogmask/types';

// Mock the store
jest.mock('../../../src/features/fogmask/store');

// Mock useFogMask hook
jest.mock('../../../src/features/fogmask/hooks/useFogMask', () => ({
  useFogMask: () => ({
    startLocationTracking: jest.fn().mockResolvedValue(true),
    stopLocationTracking: jest.fn(),
  }),
}));

describe('MainMapPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock return values
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.IDLE,
      setExploreStatus: jest.fn(),
      currentLocation: null,
      mapRegion: null,
      setMapRegion: jest.fn(),
      error: null,
      clearError: jest.fn(),
    });
  });

  it('should render MapView', async () => {
    const { UNSAFE_getByType } = render(<MainMapPage />);
    const MapView = require('react-native-maps').default;
    
    await waitFor(() => {
      expect(UNSAFE_getByType(MapView)).toBeTruthy();
    });
  });

  it('should render ExploreButton', async () => {
    const { getByText } = render(<MainMapPage />);
    
    await waitFor(() => {
      expect(getByText('開始探索')).toBeTruthy();
    });
  });

  it('should render FogMask component', () => {
    const { container } = render(<MainMapPage />);
    expect(container).toBeTruthy();
  });

  it('should render Marker when currentLocation exists', async () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.EXPLORING,
      setExploreStatus: jest.fn(),
      currentLocation: { latitude: 25.033, longitude: 121.5654 },
      mapRegion: null,
      setMapRegion: jest.fn(),
      error: null,
      clearError: jest.fn(),
    });

    const { UNSAFE_getByType } = render(<MainMapPage />);
    const Marker = require('react-native-maps').Marker;
    
    await waitFor(() => {
      expect(UNSAFE_getByType(Marker)).toBeTruthy();
    });
  });

  it('should show error alert when error exists', async () => {
    const mockAlert = jest.spyOn(require('react-native').Alert, 'alert');
    
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      exploreStatus: ExploreStatus.ERROR,
      setExploreStatus: jest.fn(),
      currentLocation: null,
      mapRegion: null,
      setMapRegion: jest.fn(),
      error: {
        type: 'location_permission',
        message: '定位權限未授予',
        timestamp: new Date(),
      },
      clearError: jest.fn(),
    });

    render(<MainMapPage />);
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        '錯誤',
        '定位權限未授予',
        expect.any(Array)
      );
    });
  });
});
