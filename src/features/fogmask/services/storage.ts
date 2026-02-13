/**
 * FogMask Feature Local Storage Service
 * 迷霧遮罩功能本地儲存服務
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import {
  FogMask,
  ExploreTrack,
  UserStat,
  Grid,
  Track,
  Stat,
} from '../types';

const STORAGE_KEYS = {
  FOG_MASK: '@fogworld:fogmask',
  USER_STAT: '@fogworld:userstat',
  EXPLORE_TRACKS: '@fogworld:exploretracks',
};

// SQLite 資料庫初始化
let db: SQLite.SQLiteDatabase | null = null;

/**
 * 初始化 SQLite 資料庫
 */
export const initDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseSync('fogworld.db');
    
    // 建立表格
    db.execSync(`
      CREATE TABLE IF NOT EXISTS grids (
        grid_id TEXT PRIMARY KEY,
        explored INTEGER DEFAULT 0,
        updated_at TEXT
      );
    `);
    
    db.execSync(`
      CREATE TABLE IF NOT EXISTS tracks (
        id TEXT PRIMARY KEY,
        time TEXT,
        lat REAL,
        lng REAL,
        grid_id TEXT,
        FOREIGN KEY (grid_id) REFERENCES grids(grid_id)
      );
    `);
    
    db.execSync(`
      CREATE TABLE IF NOT EXISTS stats (
        id TEXT PRIMARY KEY,
        key TEXT UNIQUE,
        value REAL
      );
    `);
    
    // 建立索引以優化查詢效能
    db.execSync(`
      CREATE INDEX IF NOT EXISTS idx_grids_explored ON grids(explored);
      CREATE INDEX IF NOT EXISTS idx_tracks_grid_id ON tracks(grid_id);
      CREATE INDEX IF NOT EXISTS idx_tracks_time ON tracks(time);
      CREATE INDEX IF NOT EXISTS idx_stats_key ON stats(key);
    `);
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

/**
 * AsyncStorage: 儲存迷霧遮罩資料
 */
export const saveFogMask = async (fogMask: FogMask): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FOG_MASK, JSON.stringify(fogMask));
  } catch (error) {
    console.error('Save FogMask error:', error);
    throw error;
  }
};

/**
 * AsyncStorage: 讀取迷霧遮罩資料
 */
export const loadFogMask = async (): Promise<FogMask | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FOG_MASK);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Load FogMask error:', error);
    return null;
  }
};

/**
 * AsyncStorage: 儲存用戶統計資訊
 */
export const saveUserStat = async (userStat: UserStat): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_STAT, JSON.stringify(userStat));
  } catch (error) {
    console.error('Save UserStat error:', error);
    throw error;
  }
};

/**
 * AsyncStorage: 讀取用戶統計資訊
 */
export const loadUserStat = async (): Promise<UserStat | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_STAT);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Load UserStat error:', error);
    return null;
  }
};

/**
 * SQLite: 儲存網格資料
 */
export const saveGrid = async (grid: Grid): Promise<void> => {
  if (!db) await initDatabase();
  try {
    db!.runSync(
      'INSERT OR REPLACE INTO grids (grid_id, explored, updated_at) VALUES (?, ?, ?)',
      [grid.grid_id, grid.explored ? 1 : 0, grid.updated_at.toISOString()]
    );
  } catch (error) {
    console.error('Save Grid error:', error);
    throw error;
  }
};

/**
 * SQLite: 讀取所有已探索的網格
 */
export const loadExploredGrids = async (): Promise<Grid[]> => {
  if (!db) await initDatabase();
  try {
    const results = db!.getAllSync<{
      grid_id: string;
      explored: number;
      updated_at: string;
    }>('SELECT * FROM grids WHERE explored = 1');
    
    return results.map((row) => ({
      grid_id: row.grid_id,
      explored: row.explored === 1,
      updated_at: new Date(row.updated_at),
    }));
  } catch (error) {
    console.error('Load Explored Grids error:', error);
    return [];
  }
};

/**
 * SQLite: 儲存軌跡點
 */
export const saveTrack = async (track: Track): Promise<void> => {
  if (!db) await initDatabase();
  try {
    db!.runSync(
      'INSERT INTO tracks (id, time, lat, lng, grid_id) VALUES (?, ?, ?, ?, ?)',
      [track.id, track.time.toISOString(), track.lat, track.lng, track.grid_id]
    );
  } catch (error) {
    console.error('Save Track error:', error);
    throw error;
  }
};

/**
 * SQLite: 讀取所有軌跡
 */
export const loadTracks = async (): Promise<Track[]> => {
  if (!db) await initDatabase();
  try {
    const results = db!.getAllSync<{
      id: string;
      time: string;
      lat: number;
      lng: number;
      grid_id: string;
    }>('SELECT * FROM tracks ORDER BY time DESC');
    
    return results.map((row) => ({
      id: row.id,
      time: new Date(row.time),
      lat: row.lat,
      lng: row.lng,
      grid_id: row.grid_id,
    }));
  } catch (error) {
    console.error('Load Tracks error:', error);
    return [];
  }
};

/**
 * SQLite: 儲存統計資料
 */
export const saveStat = async (stat: Stat): Promise<void> => {
  if (!db) await initDatabase();
  try {
    db!.runSync(
      'INSERT OR REPLACE INTO stats (id, key, value) VALUES (?, ?, ?)',
      [stat.id, stat.key, stat.value]
    );
  } catch (error) {
    console.error('Save Stat error:', error);
    throw error;
  }
};

/**
 * SQLite: 讀取統計資料
 */
export const loadStat = async (key: string): Promise<number | null> => {
  if (!db) await initDatabase();
  try {
    const result = db!.getFirstSync<{ value: number }>(
      'SELECT value FROM stats WHERE key = ?',
      [key]
    );
    return result ? result.value : null;
  } catch (error) {
    console.error('Load Stat error:', error);
    return null;
  }
};

/**
 * 清除所有本地儲存資料
 */
export const clearAllStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.FOG_MASK,
      STORAGE_KEYS.USER_STAT,
      STORAGE_KEYS.EXPLORE_TRACKS,
    ]);
    
    if (db) {
      db.execSync('DELETE FROM grids');
      db.execSync('DELETE FROM tracks');
      db.execSync('DELETE FROM stats');
    }
  } catch (error) {
    console.error('Clear storage error:', error);
    throw error;
  }
};
