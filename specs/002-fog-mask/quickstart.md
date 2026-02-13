# quickstart.md

## Fog Mask 功能模組開發快速指南

### 1. 安裝依賴

```
yarn add react-native-maps zustand @react-native-async-storage/async-storage
# 測試與格式化
yarn add -D jest @testing-library/react-native eslint prettier
```

### 2. 主要資料結構
- 參考 data-model.md

### 3. API 合約
- 參考 contracts/fogmask.openapi.yaml

### 4. 檔案結構建議
```
src/
  features/
    fogmask/
      components/
      hooks/
      services/
      styles/
      types.ts
      utils.ts
```

### 5. 樣式規範
- 嚴禁 Inline Style，統一 StyleSheet.create
- 色彩、字體、間距等參數集中於 src/theme

### 6. 測試與驗證
- 單元測試：Jest，覆蓋率 80%+
- 格式檢查：ESLint、Prettier

### 7. 其他

---

## 專案啟動流程
1. 安裝依賴：
  - `npm install` 或 `yarn install`
  - Expo、React Native、Google Maps API、Zustand、SQLite/AsyncStorage、Firebase/Supabase
2. 啟動模擬器：
  - `expo start`，選擇 Android/iOS 模擬器
3. 主要目錄結構：
  - `src/components/`：UI 組件
  - `src/services/`：資料存取與同步
  - `src/theme/`：樣式與常數
  - `src/models/`：資料結構
4. 測試與驗證：
  - 單元測試：`npm test`（Jest）
  - ESLint/Prettier 驗證：`npm run lint`、`npm run format`
5. 地圖功能：
  - Google Maps API 金鑰設定於環境變數
  - 地圖遮罩與探索軌跡紀錄於本地資料庫，定期同步雲端
6. 資料結構與狀態管理：
  - 使用 Zustand 管理地圖狀態與探索軌跡
  - SQLite/AsyncStorage 儲存軌跡，Firebase/Supabase 雲端同步
7. 主要畫面：
  - 地圖主頁、迷霧遮罩、探索軌跡、統計資訊
8. 開發注意事項：
  - 嚴禁 Inline Style，所有樣式集中於 src/theme
  - 重大變更需團隊共識並修訂憲法
- 地圖功能整合 Google Map，遮罩演算法效能優先
- Android 深色模式、字體規範必須遵守
