# Quickstart: 主地圖介面仿世界迷霧

1. 安裝依賴
   - yarn add react-native-maps @shopify/react-native-skia expo-location expo-task-manager expo-sqlite
   - yarn add -D jest @testing-library/react-native eslint prettier

2. 建立主要檔案
   - src/components/MainMap.tsx
   - src/hooks/useLocationTracker.ts
   - src/services/db.ts
   - src/utils/geoUtils.ts

3. 初始化 SQLite 資料表
   - grids（grid_id, explored, updated_at）
   - tracks（id, time, lat, lng, grid_id）
   - stats（id, key, value）

4. 權限請求
   - 請求 FOREGROUND_SERVICE、ACCESS_BACKGROUND_LOCATION
   - Android 需特別處理背景定位權限

5. 迷霧遮罩渲染
   - 於地圖上方覆蓋 Skia Canvas，根據已探索 grids 擦除遮罩

6. 定位追蹤
   - useLocationTracker 於背景持續記錄座標，每 5-10 秒寫入 SQLite

7. 效能優化
   - 迷霧僅渲染可視範圍，軌跡點批次寫入，啟用 Hermes

8. 單元測試
   - 使用 Jest + Testing Library 覆蓋 hooks、元件、資料存取

9. 執行
   - npx expo start

10. 參考
   - 需求規格：specs/001-main-ui-map/spec.md
   - 實作計劃：specs/001-main-ui-map/plan.md
   - 資料模型：specs/001-main-ui-map/data-model.md
   - API 契約：specs/001-main-ui-map/contracts/mainmap.openapi.yaml
