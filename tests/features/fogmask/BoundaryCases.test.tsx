/**
 * Boundary Cases Tests
 * 邊界情境測試
 */

import {
  isValidCoordinate,
  calculateDistance,
  formatArea,
  formatPercent,
  calculateLevel,
} from '../../../src/features/fogmask/utils';
import {
  coordinateToGridIndex,
  eraseFog,
  calculateExploredArea,
  calculateExploredPercent,
} from '../../../src/features/fogmask/utils/eraseFog';

describe('Boundary Cases', () => {
  describe('Coordinate Validation', () => {
    it('should accept valid coordinates', () => {
      expect(isValidCoordinate({ latitude: 0, longitude: 0 })).toBe(true);
      expect(isValidCoordinate({ latitude: 25.033, longitude: 121.5654 })).toBe(true);
      expect(isValidCoordinate({ latitude: -90, longitude: -180 })).toBe(true);
      expect(isValidCoordinate({ latitude: 90, longitude: 180 })).toBe(true);
    });

    it('should reject invalid latitudes', () => {
      expect(isValidCoordinate({ latitude: 91, longitude: 0 })).toBe(false);
      expect(isValidCoordinate({ latitude: -91, longitude: 0 })).toBe(false);
      expect(isValidCoordinate({ latitude: 100, longitude: 0 })).toBe(false);
    });

    it('should reject invalid longitudes', () => {
      expect(isValidCoordinate({ latitude: 0, longitude: 181 })).toBe(false);
      expect(isValidCoordinate({ latitude: 0, longitude: -181 })).toBe(false);
      expect(isValidCoordinate({ latitude: 0, longitude: 200 })).toBe(false);
    });
  });

  describe('Grid Index Calculation', () => {
    const bounds = {
      northeast: { latitude: 25.1, longitude: 121.6 },
      southwest: { latitude: 25.0, longitude: 121.5 },
    };

    it('should return null for coordinates outside bounds', () => {
      expect(
        coordinateToGridIndex(
          { latitude: 26.0, longitude: 121.55 },
          bounds,
          10,
          10
        )
      ).toBeNull();

      expect(
        coordinateToGridIndex(
          { latitude: 25.05, longitude: 122.0 },
          bounds,
          10,
          10
        )
      ).toBeNull();
    });

    it('should return null for invalid coordinates', () => {
      expect(
        coordinateToGridIndex(
          { latitude: 91, longitude: 121.55 },
          bounds,
          10,
          10
        )
      ).toBeNull();
    });

    it('should handle edge coordinates correctly', () => {
      const index1 = coordinateToGridIndex(
        { latitude: 25.0, longitude: 121.5 },
        bounds,
        10,
        10
      );
      expect(index1).not.toBeNull();
      expect(index1?.row).toBeGreaterThanOrEqual(0);
      expect(index1?.col).toBeGreaterThanOrEqual(0);

      const index2 = coordinateToGridIndex(
        { latitude: 25.1, longitude: 121.6 },
        bounds,
        10,
        10
      );
      expect(index2).not.toBeNull();
    });
  });

  describe('Fog Erasure Edge Cases', () => {
    const bounds = {
      northeast: { latitude: 25.1, longitude: 121.6 },
      southwest: { latitude: 25.0, longitude: 121.5 },
    };

    it('should handle empty grid', () => {
      const emptyGrid: number[][] = [];
      const result = eraseFog(
        emptyGrid,
        { latitude: 25.05, longitude: 121.55 },
        bounds,
        100
      );
      expect(result).toEqual(emptyGrid);
    });

    it('should handle invalid location', () => {
      const grid = [[0, 0], [0, 0]];
      const result = eraseFog(
        grid,
        { latitude: 91, longitude: 121.55 },
        bounds,
        100
      );
      expect(result).toEqual(grid);
    });

    it('should handle location outside bounds', () => {
      const grid = [[0, 0], [0, 0]];
      const result = eraseFog(
        grid,
        { latitude: 26.0, longitude: 121.55 },
        bounds,
        100
      );
      expect(result).toEqual(grid);
    });

    it('should not mutate original grid', () => {
      const originalGrid = [[0, 0], [0, 0]];
      const gridCopy = JSON.parse(JSON.stringify(originalGrid));
      
      eraseFog(
        originalGrid,
        { latitude: 25.05, longitude: 121.55 },
        bounds,
        100
      );

      expect(originalGrid).toEqual(gridCopy);
    });
  });

  describe('Distance Calculation Edge Cases', () => {
    it('should handle same point', () => {
      const point = { latitude: 25.033, longitude: 121.5654 };
      expect(calculateDistance(point, point)).toBe(0);
    });

    it('should handle antipodes', () => {
      const point1 = { latitude: 0, longitude: 0 };
      const point2 = { latitude: 0, longitude: 180 };
      const distance = calculateDistance(point1, point2);
      expect(distance).toBeGreaterThan(20000); // Half Earth circumference
    });

    it('should handle poles', () => {
      const north = { latitude: 90, longitude: 0 };
      const south = { latitude: -90, longitude: 0 };
      const distance = calculateDistance(north, south);
      expect(distance).toBeGreaterThan(20000); // Full Earth circumference
    });
  });

  describe('Statistics Calculation Edge Cases', () => {
    it('should handle fully unexplored grid', () => {
      const grid = [[0, 0], [0, 0]];
      const percent = calculateExploredPercent(grid);
      expect(percent).toBe(0);
    });

    it('should handle fully explored grid', () => {
      const grid = [[1, 1], [1, 1]];
      const percent = calculateExploredPercent(grid);
      expect(percent).toBe(100);
    });

    it('should handle empty grid', () => {
      const grid: number[][] = [];
      const percent = calculateExploredPercent(grid);
      expect(percent).toBe(0);
    });

    it('should handle jagged grid', () => {
      const grid = [[1], [1, 1]];
      // Should handle without crashing
      const percent = calculateExploredPercent(grid);
      expect(percent).toBeGreaterThanOrEqual(0);
      expect(percent).toBeLessThanOrEqual(100);
    });
  });

  describe('Formatting Edge Cases', () => {
    it('should format very small areas', () => {
      expect(formatArea(0.001)).toContain('m²');
    });

    it('should format large areas', () => {
      expect(formatArea(1000)).toContain('km²');
    });

    it('should format zero area', () => {
      expect(formatArea(0)).toContain('m²');
    });

    it('should format extreme percentages', () => {
      expect(formatPercent(0)).toBe('0.00%');
      expect(formatPercent(100)).toBe('100.00%');
      expect(formatPercent(99.999)).toBe('100.00%');
    });
  });

  describe('Level Calculation Edge Cases', () => {
    it('should return level 1 for zero area', () => {
      expect(calculateLevel(0)).toBe(1);
    });

    it('should return level 1 for small areas', () => {
      expect(calculateLevel(5)).toBe(1);
    });

    it('should increase level with area', () => {
      expect(calculateLevel(10)).toBe(2);
      expect(calculateLevel(20)).toBe(3);
      expect(calculateLevel(100)).toBe(11);
    });
  });

  describe('Fast Movement Handling', () => {
    it('should handle rapid location updates', () => {
      const bounds = {
        northeast: { latitude: 25.1, longitude: 121.6 },
        southwest: { latitude: 25.0, longitude: 121.5 },
      };
      const grid = Array(10).fill(null).map(() => Array(10).fill(0));

      // Simulate rapid movement
      const locations = [
        { latitude: 25.01, longitude: 121.51 },
        { latitude: 25.02, longitude: 121.52 },
        { latitude: 25.03, longitude: 121.53 },
        { latitude: 25.04, longitude: 121.54 },
        { latitude: 25.05, longitude: 121.55 },
      ];

      let currentGrid = grid;
      locations.forEach((location) => {
        currentGrid = eraseFog(currentGrid, location, bounds, 100);
      });

      // Should complete without errors
      expect(currentGrid).toBeTruthy();
      expect(Array.isArray(currentGrid)).toBe(true);
    });
  });

  describe('Map Zoom Handling', () => {
    it('should handle different map zoom levels', () => {
      const smallBounds = {
        northeast: { latitude: 25.01, longitude: 121.51 },
        southwest: { latitude: 25.0, longitude: 121.5 },
      };

      const largeBounds = {
        northeast: { latitude: 26.0, longitude: 122.0 },
        southwest: { latitude: 24.0, longitude: 120.0 },
      };

      const grid = [[0, 0], [0, 0]];
      const location = { latitude: 25.005, longitude: 121.505 };

      const result1 = eraseFog(grid, location, smallBounds, 100);
      const result2 = eraseFog(grid, location, largeBounds, 100);

      // Should handle both zoom levels
      expect(result1).toBeTruthy();
      expect(result2).toBeTruthy();
    });
  });
});
