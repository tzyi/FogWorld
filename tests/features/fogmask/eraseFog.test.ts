/**
 * EraseFog Utility Tests
 * 迷霧擦除演算法測試
 */

import {
  eraseFog,
  coordinateToGridIndex,
  gridIndexToCoordinate,
  countExploredGrids,
  calculateExploredArea,
  calculateExploredPercent,
} from '../../../src/features/fogmask/utils/eraseFog';
import { MapRegion } from '../../../src/features/fogmask/types';

describe('EraseFog Utility', () => {
  const testBounds = {
    northeast: { latitude: 25.1, longitude: 121.6 },
    southwest: { latitude: 25.0, longitude: 121.5 },
  };

  describe('coordinateToGridIndex', () => {
    it('should convert coordinate to grid index', () => {
      const result = coordinateToGridIndex(
        { latitude: 25.05, longitude: 121.55 },
        testBounds,
        10,
        10
      );

      expect(result).not.toBeNull();
      expect(result?.row).toBeGreaterThanOrEqual(0);
      expect(result?.row).toBeLessThan(10);
      expect(result?.col).toBeGreaterThanOrEqual(0);
      expect(result?.col).toBeLessThan(10);
    });

    it('should return null for out-of-bounds coordinates', () => {
      const result = coordinateToGridIndex(
        { latitude: 26.0, longitude: 121.55 },
        testBounds,
        10,
        10
      );

      expect(result).toBeNull();
    });

    it('should return null for invalid coordinates', () => {
      const result = coordinateToGridIndex(
        { latitude: 91, longitude: 121.55 },
        testBounds,
        10,
        10
      );

      expect(result).toBeNull();
    });
  });

  describe('gridIndexToCoordinate', () => {
    it('should convert grid index to coordinate', () => {
      const result = gridIndexToCoordinate(5, 5, testBounds, 10, 10);

      expect(result.latitude).toBeGreaterThanOrEqual(25.0);
      expect(result.latitude).toBeLessThanOrEqual(25.1);
      expect(result.longitude).toBeGreaterThanOrEqual(121.5);
      expect(result.longitude).toBeLessThanOrEqual(121.6);
    });

    it('should handle corner indices', () => {
      const topLeft = gridIndexToCoordinate(0, 0, testBounds, 10, 10);
      const bottomRight = gridIndexToCoordinate(9, 9, testBounds, 10, 10);

      expect(topLeft.latitude).toBeGreaterThanOrEqual(25.0);
      expect(bottomRight.latitude).toBeLessThanOrEqual(25.1);
    });
  });

  describe('countExploredGrids', () => {
    it('should count explored grids', () => {
      const grid = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 1, 1],
      ];

      expect(countExploredGrids(grid)).toBe(6);
    });

    it('should handle fully explored grid', () => {
      const grid = [
        [1, 1],
        [1, 1],
      ];

      expect(countExploredGrids(grid)).toBe(4);
    });

    it('should handle fully unexplored grid', () => {
      const grid = [
        [0, 0],
        [0, 0],
      ];

      expect(countExploredGrids(grid)).toBe(0);
    });

    it('should handle empty grid', () => {
      expect(countExploredGrids([])).toBe(0);
    });
  });

  describe('calculateExploredArea', () => {
    it('should calculate explored area', () => {
      const grid = [
        [1, 0],
        [0, 1],
      ];

      const area = calculateExploredArea(grid, 100);
      expect(area).toBeGreaterThan(0);
    });

    it('should return 0 for unexplored grid', () => {
      const grid = [
        [0, 0],
        [0, 0],
      ];

      expect(calculateExploredArea(grid, 100)).toBe(0);
    });
  });

  describe('calculateExploredPercent', () => {
    it('should calculate explored percentage', () => {
      const grid = [
        [1, 0],
        [0, 1],
      ];

      expect(calculateExploredPercent(grid)).toBe(50);
    });

    it('should return 100 for fully explored', () => {
      const grid = [
        [1, 1],
        [1, 1],
      ];

      expect(calculateExploredPercent(grid)).toBe(100);
    });

    it('should return 0 for fully unexplored', () => {
      const grid = [
        [0, 0],
        [0, 0],
      ];

      expect(calculateExploredPercent(grid)).toBe(0);
    });
  });

  describe('eraseFog', () => {
    it('should erase fog at location', () => {
      const grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      const result = eraseFog(
        grid,
        { latitude: 25.05, longitude: 121.55 },
        testBounds,
        100
      );

      const exploredCount = countExploredGrids(result);
      expect(exploredCount).toBeGreaterThan(0);
    });

    it('should not modify original grid', () => {
      const grid = [
        [0, 0],
        [0, 0],
      ];
      const original = JSON.parse(JSON.stringify(grid));

      eraseFog(grid, { latitude: 25.05, longitude: 121.55 }, testBounds, 100);

      expect(grid).toEqual(original);
    });

    it('should handle radius parameter', () => {
      const grid = Array(50)
        .fill(null)
        .map(() => Array(50).fill(0));

      const smallRadius = eraseFog(
        grid,
        { latitude: 25.05, longitude: 121.55 },
        testBounds,
        50
      );

      const largeRadius = eraseFog(
        grid,
        { latitude: 25.05, longitude: 121.55 },
        testBounds,
        200
      );

      expect(countExploredGrids(largeRadius)).toBeGreaterThan(
        countExploredGrids(smallRadius)
      );
    });

    it('should handle invalid location gracefully', () => {
      const grid = [
        [0, 0],
        [0, 0],
      ];

      const result = eraseFog(
        grid,
        { latitude: 91, longitude: 121.55 },
        testBounds,
        100
      );

      expect(result).toEqual(grid);
    });

    it('should handle out-of-bounds location', () => {
      const grid = [
        [0, 0],
        [0, 0],
      ];

      const result = eraseFog(
        grid,
        { latitude: 26.0, longitude: 121.55 },
        testBounds,
        100
      );

      expect(result).toEqual(grid);
    });
  });
});
