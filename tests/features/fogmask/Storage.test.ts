/**
 * Storage Service Tests
 * 本地儲存服務測試
 */

import {
  initDatabase,
  saveFogMask,
  loadFogMask,
  saveUserStat,
  loadUserStat,
  saveGrid,
  loadExploredGrids,
  saveTrack,
  loadTracks,
  saveStat,
  loadStat,
  clearAllStorage,
} from '../../../src/features/fogmask/services/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

// Mock AsyncStorage and SQLite
jest.mock('@react-native-async-storage/async-storage');
jest.mock('expo-sqlite');

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AsyncStorage Operations', () => {
    it('should save and load FogMask', async () => {
      const mockFogMask = {
        id: '1',
        userId: 'user1',
        mapGrid: [[0, 1], [1, 0]],
        updatedAt: new Date(),
      };

      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockFogMask)
      );

      await saveFogMask(mockFogMask);
      const loaded = await loadFogMask();

      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(loaded).toBeTruthy();
    });

    it('should save and load UserStat', async () => {
      const mockUserStat = {
        userId: 'user1',
        exploredArea: 10.5,
        exploredPercent: 25.5,
        level: 2,
        updatedAt: new Date(),
      };

      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockUserStat)
      );

      await saveUserStat(mockUserStat);
      const loaded = await loadUserStat();

      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(loaded).toBeTruthy();
    });

    it('should return null when no data exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const fogMask = await loadFogMask();
      const userStat = await loadUserStat();

      expect(fogMask).toBeNull();
      expect(userStat).toBeNull();
    });

    it('should handle storage errors gracefully', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(
        new Error('Storage error')
      );

      await expect(
        saveFogMask({
          id: '1',
          userId: 'user1',
          mapGrid: [[0]],
          updatedAt: new Date(),
        })
      ).rejects.toThrow('Storage error');
    });
  });

  describe('SQLite Operations', () => {
    let mockDb: any;

    beforeEach(() => {
      mockDb = {
        execSync: jest.fn(),
        runSync: jest.fn(),
        getAllSync: jest.fn(() => []),
        getFirstSync: jest.fn(),
      };

      (SQLite.openDatabaseSync as jest.Mock).mockReturnValue(mockDb);
    });

    it('should initialize database with tables and indexes', async () => {
      await initDatabase();

      expect(mockDb.execSync).toHaveBeenCalled();
      // Check if CREATE TABLE and CREATE INDEX were called
      expect(mockDb.execSync).toHaveBeenCalledWith(
        expect.stringContaining('CREATE TABLE')
      );
      expect(mockDb.execSync).toHaveBeenCalledWith(
        expect.stringContaining('CREATE INDEX')
      );
    });

    it('should save and load grids', async () => {
      const mockGrid = {
        grid_id: 'grid1',
        explored: true,
        updated_at: new Date(),
      };

      mockDb.getAllSync.mockReturnValue([
        {
          grid_id: 'grid1',
          explored: 1,
          updated_at: mockGrid.updated_at.toISOString(),
        },
      ]);

      await saveGrid(mockGrid);
      const grids = await loadExploredGrids();

      expect(mockDb.runSync).toHaveBeenCalled();
      expect(grids).toHaveLength(1);
      expect(grids[0].grid_id).toBe('grid1');
    });

    it('should save and load tracks', async () => {
      const mockTrack = {
        id: 'track1',
        time: new Date(),
        lat: 25.033,
        lng: 121.5654,
        grid_id: 'grid1',
      };

      mockDb.getAllSync.mockReturnValue([
        {
          id: 'track1',
          time: mockTrack.time.toISOString(),
          lat: 25.033,
          lng: 121.5654,
          grid_id: 'grid1',
        },
      ]);

      await saveTrack(mockTrack);
      const tracks = await loadTracks();

      expect(mockDb.runSync).toHaveBeenCalled();
      expect(tracks).toHaveLength(1);
      expect(tracks[0].id).toBe('track1');
    });

    it('should save and load stats', async () => {
      const mockStat = {
        id: 'stat1',
        key: 'explored_area',
        value: 10.5,
      };

      mockDb.getFirstSync.mockReturnValue({ value: 10.5 });

      await saveStat(mockStat);
      const value = await loadStat('explored_area');

      expect(mockDb.runSync).toHaveBeenCalled();
      expect(value).toBe(10.5);
    });

    it('should handle database query errors', async () => {
      mockDb.getAllSync.mockImplementation(() => {
        throw new Error('Database error');
      });

      const grids = await loadExploredGrids();
      expect(grids).toEqual([]);
    });

    it('should clear all storage', async () => {
      (AsyncStorage.multiRemove as jest.Mock).mockResolvedValue(undefined);

      await clearAllStorage();

      expect(AsyncStorage.multiRemove).toHaveBeenCalled();
      expect(mockDb.execSync).toHaveBeenCalledWith('DELETE FROM grids');
      expect(mockDb.execSync).toHaveBeenCalledWith('DELETE FROM tracks');
      expect(mockDb.execSync).toHaveBeenCalledWith('DELETE FROM stats');
    });
  });

  describe('Performance', () => {
    it('should complete database query in < 50ms', async () => {
      const mockDb = {
        execSync: jest.fn(),
        runSync: jest.fn(),
        getAllSync: jest.fn(() => []),
        getFirstSync: jest.fn(),
      };

      (SQLite.openDatabaseSync as jest.Mock).mockReturnValue(mockDb);
      await initDatabase();

      const startTime = Date.now();
      await loadExploredGrids();
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(50);
    });

    it('should handle large grid datasets efficiently', async () => {
      const mockDb = {
        execSync: jest.fn(),
        runSync: jest.fn(),
        getAllSync: jest.fn(() =>
          Array(1000)
            .fill(null)
            .map((_, i) => ({
              grid_id: `grid${i}`,
              explored: 1,
              updated_at: new Date().toISOString(),
            }))
        ),
        getFirstSync: jest.fn(),
      };

      (SQLite.openDatabaseSync as jest.Mock).mockReturnValue(mockDb);

      const startTime = Date.now();
      const grids = await loadExploredGrids();
      const endTime = Date.now();

      expect(grids).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});
