# Phase 0 Research: 主地圖介面仿世界迷霧

## 1. 經緯度轉 Canvas 座標（迷霧遮罩）
- Decision: 採用地圖 SDK 提供的投影方法（如 react-native-maps 的 regionToCoordinate/pointForCoordinate）將 GPS 轉換為螢幕座標，再傳遞給 Skia Canvas。
- Rationale: 可直接對應地圖縮放與平移，確保迷霧遮罩與地圖同步。
- Alternatives considered: 手動計算墨卡托投影，需自行處理地圖縮放與偏移，維護成本高。

## 2. Grids 網格劃分策略
- Decision: 採用固定經緯度間隔（如 0.0005°）劃分全球網格，座標點歸屬最近網格。
- Rationale: 計算簡單、查詢快速，利於 SQLite 儲存與索引。
- Alternatives considered: GeoHash、四叉樹等進階空間分割，複雜度較高，暫不採用。

## 3. SQLite 資料表設計
- Decision: grids（主鍵: grid_id, explored）、tracks（主鍵: id, time, lat, lng）、stats（主鍵: id, key, value）
- Rationale: grids 儲存探索狀態，tracks 儲存軌跡，stats 儲存統計資訊，皆設索引加速查詢。
- Alternatives considered: 僅用一張表存所有資料，查詢與維護困難。

## 4. 定位追蹤與權限
- Decision: expo-location + expo-task-manager，前景/背景權限分開請求，Android 需特別處理 BACKGROUND_LOCATION。
- Rationale: Expo 官方支援，社群文件豐富，易於維護。
- Alternatives considered: 原生 module，需 eject，維護成本高。

## 5. 迷霧遮罩效能
- Decision: Skia Canvas 採用 BlendMode.DstOut 擦除遮罩，僅渲染可視範圍。
- Rationale: Skia 效能佳，支援即時遮罩運算。
- Alternatives considered: SVG/Canvas/WebGL，行動端效能較差。

## 6. 單元測試與整合測試
- Decision: Jest + React Native Testing Library，覆蓋 hooks、元件、資料存取。
- Rationale: 主流方案，社群支援佳。
- Alternatives considered: Mocha、AVA，生態系較弱。

## 7. Android 最佳化
- Decision: 權限請求流程嚴格依 Android 標準，深色模式預設，Hermes 引擎啟用。
- Rationale: 提升效能與穩定性。
- Alternatives considered: 不啟用 Hermes，記憶體佔用較高。
