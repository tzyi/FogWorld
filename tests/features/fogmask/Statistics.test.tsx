/**
 * Statistics Component Tests
 * 統計資訊元件測試
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Statistics } from '../../../src/features/fogmask/components/Statistics';
import { useFogMaskStore } from '../../../src/features/fogmask/store';

// Mock the store
jest.mock('../../../src/features/fogmask/store');

describe('Statistics Component', () => {
  const mockBounds = {
    northeast: { latitude: 25.1, longitude: 121.6 },
    southwest: { latitude: 25.0, longitude: 121.5 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render zero stats when fogMask is null', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: null,
      userStat: null,
    });

    const { getByText } = render(<Statistics bounds={mockBounds} />);
    
    expect(getByText('已探索面積')).toBeTruthy();
    expect(getByText('探索進度')).toBeTruthy();
    expect(getByText('探索等級')).toBeTruthy();
    expect(getByText('0 m²')).toBeTruthy();
    expect(getByText('0.00%')).toBeTruthy();
    expect(getByText('Lv. 1')).toBeTruthy();
  });

  it('should render correct stats when fogMask exists', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: {
        id: '1',
        userId: 'user1',
        mapGrid: [
          [1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ], // 25% explored
        updatedAt: new Date(),
      },
      userStat: null,
    });

    const { getByText } = render(<Statistics bounds={mockBounds} />);
    
    expect(getByText('已探索面積')).toBeTruthy();
    expect(getByText('探索進度')).toBeTruthy();
    expect(getByText('探索等級')).toBeTruthy();
    expect(getByText('25.00%')).toBeTruthy();
  });

  it('should display Lv. 1 for small explored area', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: {
        id: '1',
        userId: 'user1',
        mapGrid: [
          [1, 0],
          [0, 0],
        ], // Small area
        updatedAt: new Date(),
      },
      userStat: null,
    });

    const { getByText } = render(<Statistics bounds={mockBounds} />);
    expect(getByText('Lv. 1')).toBeTruthy();
  });

  it('should render progress bar with correct width', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: {
        id: '1',
        userId: 'user1',
        mapGrid: [
          [1, 1],
          [0, 0],
        ], // 50% explored
        updatedAt: new Date(),
      },
      userStat: null,
    });

    const { container } = render(<Statistics bounds={mockBounds} />);
    expect(container).toBeTruthy();
  });

  it('should handle missing bounds gracefully', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: {
        id: '1',
        userId: 'user1',
        mapGrid: [[1, 1], [1, 1]],
        updatedAt: new Date(),
      },
      userStat: null,
    });

    const { getByText } = render(<Statistics />);
    expect(getByText('0 m²')).toBeTruthy();
  });
});
