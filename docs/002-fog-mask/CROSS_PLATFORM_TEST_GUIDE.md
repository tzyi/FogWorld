# Cross-Platform Test Guide - 002-fog-mask

迷霧遮罩功能跨平台測試指南

## 測試目標 (T028)

- ✅ 確保 95% 以上裝置不卡頓、顯示正常
- ✅ 覆蓋不同螢幕尺寸
- ✅ 深色模式相容性
- ✅ Android (優先) + iOS (次要)

## 測試裝置清單

### Android 裝置（必測）

#### 高階裝置
- [ ] **Google Pixel 7/8**: Android 14+, 1080x2400
- [ ] **Samsung Galaxy S23**: Android 14+, 1080x2340
- [ ] **OnePlus 11**: Android 14+, 1440x3216

#### 中階裝置
- [ ] **Google Pixel 6a**: Android 13+, 1080x2400
- [ ] **Samsung Galaxy A54**: Android 13+, 1080x2340
- [ ] **Motorola Edge 40**: Android 13+, 1080x2400

#### 低階裝置
- [ ] **Samsung Galaxy A14**: Android 13+, 1080x2408
- [ ] **Xiaomi Redmi Note 11**: Android 11+, 1080x2400
- [ ] **Realme C55**: Android 13+, 1080x2400

### iOS 裝置（選測）

#### iPhone
- [ ] **iPhone 15 Pro**: iOS 17+, 1179x2556
- [ ] **iPhone 14**: iOS 16+, 1170x2532
- [ ] **iPhone SE (3rd)**: iOS 16+, 750x1334

#### iPad
- [ ] **iPad Pro 12.9"**: iPadOS 17+, 2048x2732
- [ ] **iPad Air**: iPadOS 16+, 1640x2360

## 測試項目

### 1. 效能測試

#### 1.1 FPS (幀率測試)
**目標**: 60fps

**測試步驟**:
1. 開啟效能監控工具 (React Native Debugger / Flipper)
2. 啟動探索模式
3. 快速移動地圖
4. 記錄 FPS 數值

**驗收標準**:
- ✅ 靜止時: FPS ≥ 58
- ✅ 移動時: FPS ≥ 55
- ✅ 快速縮放: FPS ≥ 50

#### 1.2 渲染延遲
**目標**: <100ms

**測試步驟**:
1. 按下「開始探索」按鈕
2. 測量迷霧遮罩出現時間
3. 移動到新網格
4. 測量透明區域更新時間

**驗收標準**:
- ✅ 遮罩初始化: <100ms
- ✅ 網格擦除更新: <50ms
- ✅ 統計資訊更新: <50ms

#### 1.3 記憶體使用
**測試步驟**:
1. 開啟記憶體監控
2. 探索 10 分鐘
3. 記錄記憶體增長

**驗收標準**:
- ✅ 初始記憶體: <150MB
- ✅ 10 分鐘後: <250MB
- ✅ 無記憶體洩漏 (穩定增長)

### 2. 螢幕尺寸相容性

#### 2.1 小螢幕 (< 5.5")
**測試裝置**: iPhone SE, 小型 Android 手機

**測試項目**:
- [ ] 地圖顯示完整無裁切
- [ ] 探索按鈕可見且可點擊
- [ ] 統計資訊不重疊
- [ ] 迷霧遮罩正確對齊

#### 2.2 標準螢幕 (5.5" - 6.5")
**測試裝置**: 主流手機

**測試項目**:
- [ ] UI 元素比例正確
- [ ] 文字大小適中
- [ ] 按鈕觸控區域足夠大 (≥44dp)
- [ ] 統計卡片排版正確

#### 2.3 大螢幕 (> 6.5")
**測試裝置**: 大型手機、平板

**測試項目**:
- [ ] UI 元素不過度放大
- [ ] 地圖使用空間充分
- [ ] 統計資訊排版美觀
- [ ] 迷霧遮罩網格密度適當

### 3. 深色模式測試

#### 3.1 系統深色模式
**測試步驟**:
1. 開啟系統深色模式
2. 啟動應用程式
3. 進入探索模式

**驗收標準**:
- [ ] 統計卡片使用深色背景 (cardBgDark)
- [ ] 文字顏色適應深色背景 (textPrimaryDark, textSecondaryDark)
- [ ] 迷霧遮罩透明度正確
- [ ] 進度條顏色可見

#### 3.2 對比度檢查
**工具**: Accessibility Inspector

**驗收標準**:
- [ ] 文字對比度 ≥ 4.5:1 (WCAG AA)
- [ ] 大文字對比度 ≥ 3:1
- [ ] 重要 UI 元素可辨識

### 4. 邊緣情境測試

#### 4.1 長時間使用
**測試步驟**:
1. 啟動探索模式
2. 持續探索 30 分鐘
3. 觀察效能變化

**驗收標準**:
- [ ] FPS 保持穩定 (±5)
- [ ] 記憶體無異常增長
- [ ] UI 響應速度一致
- [ ] 無閃退或凍結

#### 4.2 網路切換
**測試步驟**:
1. 探索模式下
2. 開啟/關閉飛航模式
3. 切換 WiFi/行動網路
4. 觀察錯誤處理

**驗收標準**:
- [ ] 顯示適當錯誤提示
- [ ] 本地功能不受影響
- [ ] 重新連線後自動恢復
- [ ] 資料不遺失

#### 4.3 權限變更
**測試步驟**:
1. 探索模式下
2. 前往設定關閉定位權限
3. 返回應用程式
4. 觀察錯誤處理

**驗收標準**:
- [ ] 立即顯示權限錯誤
- [ ] 停止探索模式
- [ ] 引導使用者開啟權限
- [ ] 重新授權後可繼續探索

### 5. 裝置特性測試

#### 5.1 螢幕方向
**測試步驟**:
1. 橫向/縱向切換
2. 觀察 UI 適應

**驗收標準**:
- [ ] 支援縱向模式
- [ ] (選) 支援橫向模式
- [ ] 切換時無 UI 錯位
- [ ] 迷霧遮罩正確重繪

#### 5.2 多工處理
**測試步驟**:
1. 探索模式下切換到其他應用
2. 返回應用程式
3. 觀察狀態保持

**驗收標準**:
- [ ] 探索狀態保持
- [ ] 迷霧遮罩正確顯示
- [ ] 統計資訊無誤
- [ ] 無重複初始化

#### 5.3 低電量模式
**測試步驟**:
1. 開啟低電量模式
2. 啟動探索
3. 觀察功能限制

**驗收標準**:
- [ ] 核心功能正常
- [ ] 效能略有降低但可接受
- [ ] 無閃退或錯誤
- [ ] 提示使用者節能建議 (選)

## 自動化測試腳本

### Detox (E2E 測試)

```javascript
// e2e/fogmask.test.js
describe('FogMask E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should display fog mask on explore', async () => {
    await element(by.id('exploreButton')).tap();
    await expect(element(by.id('fogMask'))).toBeVisible();
  });

  it('should update statistics', async () => {
    await element(by.id('exploreButton')).tap();
    await waitFor(element(by.id('statistics')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('exploredArea'))).toHaveText(/\d+/);
  });

  it('should handle permission denial', async () => {
    await device.disableLocationPermissions();
    await element(by.id('exploreButton')).tap();
    await expect(element(by.text('定位權限錯誤'))).toBeVisible();
  });
});
```

### Performance Monitor

```javascript
// scripts/performance-test.js
import { startPerformanceMonitor } from 'react-native-performance';

const monitor = startPerformanceMonitor();

monitor.on('fps', (fps) => {
  console.log(`FPS: ${fps}`);
  if (fps < 55) {
    console.warn('⚠️ FPS below target (55)');
  }
});

monitor.on('memory', (usage) => {
  console.log(`Memory: ${usage.used}MB / ${usage.total}MB`);
  if (usage.used > 250) {
    console.warn('⚠️ Memory usage above target (250MB)');
  }
});
```

## 測試報告模板

### 裝置測試報告

```markdown
## 裝置: [裝置名稱]
- **作業系統**: Android/iOS [版本]
- **螢幕尺寸**: [寬]x[高] @ [DPI]
- **測試日期**: [日期]

### 效能
- FPS: [平均值] (最低: [最低值])
- 渲染延遲: [值]ms
- 記憶體: [初始]MB → [30分鐘後]MB

### 相容性
- [ ] 螢幕顯示正常
- [ ] 深色模式正常
- [ ] 觸控響應正常
- [ ] 無閃退或錯誤

### 問題記錄
1. [問題描述]
   - 嚴重度: [critical/high/medium/low]
   - 重現步驟: [步驟]
   - 截圖: [連結]
```

## 驗收標準總結

### 量化指標
- ✅ **FPS**: ≥55 (95% 裝置)
- ✅ **渲染延遲**: <100ms
- ✅ **記憶體**: <250MB (30分鐘)
- ✅ **裝置覆蓋率**: 95% 不卡頓

### 質化指標
- ✅ **UI 顯示**: 所有螢幕尺寸正常
- ✅ **深色模式**: 完全相容
- ✅ **錯誤處理**: 友善且完整
- ✅ **使用者體驗**: 流暢無明顯延遲

## 建議測試時程

- **第1天**: Android 高階裝置 (3台)
- **第2天**: Android 中低階裝置 (6台)
- **第3天**: iOS 裝置 (3台) + 平板 (2台)
- **第4天**: 邊緣情境與自動化測試
- **第5天**: 修正問題並重新測試

---

**注意**: T028 需真機測試環境，無法完全自動化。建議使用 Firebase Test Lab 或 Sauce Labs 進行雲端裝置測試。

**狀態**: 🔸 待執行 (需實機測試環境)
