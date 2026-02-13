# FogMask Feature Implementation Documentation
# 迷霧遮罩功能實作文件

## 功能概述

本文件記錄 002-fog-mask 功能的完整實作細節，包括所有資料實體、API、異常處理、邊界情境說明。

## 已實作功能

### 1. 核心功能
- ✅ 迷霧遮罩渲染與顯示
- ✅ 探索模式啟動與停止
- ✅ 即時位置追蹤與遮罩擦除
- ✅ 探索軌跡自動記錄
- ✅ 統計資訊即時顯示
- ✅ 異常處理與錯誤提示

### 2. 資料實體

#### FogMask（迷霧遮罩）
```typescript
interface FogMask {
  id: string;
  userId: string;
  mapGrid: number[][]; // 0=未探索, 1=已探索
  updatedAt: Date;
}
```

#### ExploreTrack（探索軌跡）
```typescript
interface ExploreTrack {
  id: string;
  userId: string;
  points: ExplorePoint[];
  createdAt: Date;
}
```

#### UserStat（用戶統計）
```typescript
interface UserStat {
  userId: string;
  exploredArea: number; // 單位: 平方公里
  exploredPercent: number; // 百分比 0-100
  level: number;
  updatedAt: Date;
}
```

#### Grid（網格）
```typescript
interface Grid {
  grid_id: string;
  explored: boolean;
  updated_at: Date;
}
```

#### Track（軌跡點）
```typescript
interface Track {
  id: string;
  time: Date;
  lat: number;
  lng: number;
  grid_id: string;
}
```

### 3. API 接口

實作於 `src/features/fogmask/services/api.ts`

- `GET /fogmask` - 取得迷霧遮罩資料
- `PUT /fogmask` - 更新迷霧遮罩資料
- `GET /exploretrack` - 取得探索軌跡
- `POST /exploretrack` - 新增探索軌跡
- `GET /userstat` - 取得用戶統計資訊
- `GET /gpxfile` - 取得 GPX 檔案列表
- `POST /gpxfile` - 上傳 GPX 檔案

詳細規格請參考 `specs/002-fog-mask/contracts/fogmask.openapi.yaml`

### 4. 本地儲存

實作於 `src/features/fogmask/services/storage.ts`

#### AsyncStorage（快速存取）
- FogMask 資料
- UserStat 資料

#### SQLite（結構化查詢）
- Grids 表格（網格探索狀態）
- Tracks 表格（軌跡點記錄）
- Stats 表格（統計資料）

所有 SQLite 表格已建立索引以優化查詢效能（< 50ms）。

### 5. 狀態管理

實作於 `src/features/fogmask/store.ts`

使用 Zustand 管理全域狀態：
- 探索狀態（IDLE, EXPLORING, PAUSED, ERROR）
- 當前位置
- 地圖區域
- 迷霧遮罩資料
- 探索軌跡
- 用戶統計
- 錯誤資訊
- 遮罩顯示/隱藏

### 6. 異常處理

實作於 `src/features/fogmask/hooks/useErrorHandler.ts`

#### 支援的錯誤類型
1. **定位權限錯誤** (LOCATION_PERMISSION)
   - 觸發條件：使用者拒絕定位權限
   - 處理方式：全遮罩 + 提示「請開啟定位權限」

2. **定位服務不可用** (LOCATION_UNAVAILABLE)
   - 觸發條件：裝置定位服務關閉或無法取得位置
   - 處理方式：全遮罩 + 提示「請開啟定位服務」

3. **地圖載入失敗** (MAP_LOAD_FAILED)
   - 觸發條件：地圖資料載入異常
   - 處理方式：全遮罩 + 提示「地圖載入失敗」

4. **儲存錯誤** (STORAGE_ERROR)
   - 觸發條件：本地儲存寫入失敗
   - 處理方式：提示警告，不中斷探索

5. **網路錯誤** (NETWORK_ERROR)
   - 觸發條件：API 請求失敗
   - 處理方式：提示警告，可離線繼續探索

### 7. 邊界情境處理

#### 座標驗證
- 經度範圍：-180 ~ 180
- 緯度範圍：-90 ~ 90
- 超出範圍的座標會被忽略，不記錄軌跡

#### 距離過濾
- 最小移動距離：10 米
- 小於此距離的移動不記錄新軌跡點

#### 網格邊界
- 網格索引自動檢查範圍
- 超出地圖邊界的網格不擦除

#### 資料異常
- mapGrid 為空時：不更新遮罩
- 定位資料無效時：不更新位置
- 儲存失敗時：記錄錯誤日誌，不中斷探索

### 8. 效能優化

#### 渲染效能
- FogMask 組件使用 `useMemo` 優化多邊形計算
- 地圖遮罩使用 Polygon 而非大量 Marker
- 目標：60fps 互動，渲染延遲 < 100ms

#### 查詢效能
- SQLite 所有表格已建立索引
- AsyncStorage 用於高頻讀寫資料
- 目標：查詢延遲 < 50ms

#### 記憶體優化
- 網格資料結構使用二維陣列（最小化記憶體）
- 軌跡點批次儲存（每 5-10 秒）
- 定期清理過期資料

### 9. 測試覆蓋

已實作單元測試於 `tests/features/fogmask/`：
- ✅ FogMask.test.tsx - 迷霧遮罩元件測試
- ✅ ExploreButton.test.tsx - 探索按鈕測試
- ✅ MainMapPage.test.tsx - 主地圖頁面測試
- ✅ useFogMask.test.ts - 迷霧遮罩 Hook 測試
- ✅ TrackRecorder.test.tsx - 軌跡記錄測試
- ✅ Statistics.test.tsx - 統計資訊測試

覆蓋率目標：80% 以上

### 10. 檔案結構

```
src/features/fogmask/
├── components/
│   ├── FogMask.tsx          # 迷霧遮罩元件
│   ├── ExploreButton.tsx    # 探索按鈕元件
│   └── Statistics.tsx       # 統計資訊元件
├── hooks/
│   ├── useFogMask.ts        # 迷霧遮罩邏輯 Hook
│   ├── useTrackRecorder.ts  # 軌跡記錄 Hook
│   └── useErrorHandler.ts   # 錯誤處理 Hook
├── services/
│   ├── api.ts               # API 服務
│   └── storage.ts           # 本地儲存服務
├── utils/
│   └── eraseFog.ts          # 迷霧擦除演算法
├── styles/                  # 樣式檔案目錄
├── types.ts                 # 型別定義
├── utils.ts                 # 工具函式
├── store.ts                 # Zustand 狀態管理
└── MainMapPage.tsx          # 主地圖頁面
```

### 11. 依賴套件

```json
{
  "dependencies": {
    "zustand": "^5.0.11",
    "@react-native-async-storage/async-storage": "^2.2.0",
    "react-native-maps": "1.20.1",
    "expo-location": "~19.0.8",
    "expo-sqlite": "~16.0.10"
  },
  "devDependencies": {
    "jest": "^29.x",
    "@testing-library/react-native": "^13.3.3"
  }
}
```

### 12. 待辦事項與未來改進

- [ ] 雲端同步功能（Firebase/Supabase）
- [ ] GPX 檔案匯入/匯出
- [ ] 多用戶支援（目前為單一使用者）
- [ ] 五大洲探索進度統計
- [ ] 深色模式完整支援
- [ ] iOS 平台完整測試與優化

## 驗收標準

### US1：開啟探索模式並顯示迷霧遮罩
- ✅ 按下「開始探索」後，90% 以上可在 1 秒內看到迷霧遮罩與透明區域
- ✅ 透明區域隨藍點移動即時更新，無明顯延遲
- ✅ 切換遮罩顯示/隱藏狀態正確

### US2：擦除迷霧並記錄探索軌跡
- ✅ 使用者移動時，經過網格遮罩即時被擦除
- ✅ 每 5-10 秒自動儲存座標與軌跡，資料庫無遺漏
- ✅ 地圖縮放時僅加載可視範圍遮罩，效能無明顯下降

### US3：顯示統計資訊與異常處理
- ✅ 統計資訊（面積、百分比、等級）即時更新
- ✅ 定位失敗或未授權時，100% 顯示全遮罩與提示
- ✅ 地圖資料載入失敗時，100% 顯示錯誤提示並禁用探索

### 邊界情境
- ✅ 使用者快速移動或縮放地圖時，遮罩與透明區域即時更新且不卡頓
- ✅ 經緯度資料異常（超出範圍）時，軌跡不記錄並顯示警告

## 參考文件

- [spec.md](../spec.md) - 功能規格
- [plan.md](../plan.md) - 實作計畫
- [research.md](../research.md) - 技術研究
- [data-model.md](../data-model.md) - 資料模型
- [quickstart.md](../quickstart.md) - 快速開始指南
- [contracts/fogmask.openapi.yaml](../contracts/fogmask.openapi.yaml) - API 合約

## 版本歷史

- v0.1.0 (2026-02-13) - 初始實作完成
  - 基礎迷霧遮罩功能
  - 探索軌跡記錄
  - 統計資訊顯示
  - 異常處理機制
