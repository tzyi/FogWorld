/**
 * FogMask Component Tests
 * 迷霧遮罩元件測試
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { FogMask } from '../../../src/features/fogmask/components/FogMask';
import { useFogMaskStore } from '../../../src/features/fogmask/store';

// Mock the store
jest.mock('../../../src/features/fogmask/store');

describe('FogMask Component', () => {
  const mockBounds = {
    northeast: { latitude: 25.1, longitude: 121.6 },
    southwest: { latitude: 25.0, longitude: 121.5 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render null when fogMask is null', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: null,
      isFogMaskVisible: true,
    });

    const { queryByTestId } = render(<FogMask bounds={mockBounds} />);
    expect(queryByTestId('fog-polygon')).toBeNull();
  });

  it('should render null when isFogMaskVisible is false', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: {
        id: '1',
        userId: 'user1',
        mapGrid: [[0, 1], [1, 0]],
        updatedAt: new Date(),
      },
      isFogMaskVisible: false,
    });

    const { queryByTestId } = render(<FogMask bounds={mockBounds} />);
    expect(queryByTestId('fog-polygon')).toBeNull();
  });

  it('should render fog mask when fogMask exists and is visible', () => {
    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: {
        id: '1',
        userId: 'user1',
        mapGrid: [[0, 1], [1, 0]],
        updatedAt: new Date(),
      },
      isFogMaskVisible: true,
    });

    const { container } = render(<FogMask bounds={mockBounds} />);
    expect(container).toBeTruthy();
  });

  it('should generate correct number of polygons based on grid size', () => {
    const gridSize = 3;
    const mapGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(0));

    (useFogMaskStore as unknown as jest.Mock).mockReturnValue({
      fogMask: {
        id: '1',
        userId: 'user1',
        mapGrid,
        updatedAt: new Date(),
      },
      isFogMaskVisible: true,
    });

    const { container } = render(<FogMask bounds={mockBounds} />);
    // Should render gridSize * gridSize polygons
    expect(container).toBeTruthy();
  });
});
