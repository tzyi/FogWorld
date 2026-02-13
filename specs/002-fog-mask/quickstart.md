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
- 地圖功能整合 Google Map，遮罩演算法效能優先
- Android 深色模式、字體規範必須遵守
