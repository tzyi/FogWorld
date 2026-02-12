
# FogWorld 專案開發憲法

## Core Principles


### I. 技術核心原則
1. 必須使用 React Native（Expo）、TypeScript 與 Functional Components。
2. 狀態管理優先採用 React Hooks，複雜邏輯可用 Context API 或 Zustand。
3. 地圖功能必須整合 Google Map，並支援地圖疊層與迷霧遮罩效果。
**理由**：確保技術棧統一、維護性高，並支援專案核心功能。


### II. 樣式規範原則
1. 統一使用 StyleSheet.create 宣告樣式，嚴禁 Inline Style。
2. 所有間距、顏色、字型等樣式參數，必須引用 src/theme 目錄下的常量。
3. 採用深色模式為主，所有文字皆以繁體中文顯示，並符合 Android 字體規範。
**理由**：確保視覺一致性、可維護性與最佳在地化體驗。


### III. Android 最佳化原則
1. 元件需正確處理 Android 回退鍵（BackHandler）。
2. 圖片載入必須設定 resizeMethod="auto" 以優化記憶體。
3. 權限請求一律遵循 PermissionsAndroid 標準流程。
4. 介面需自適應各種 Android 裝置尺寸，確保地圖與狀態欄不被遮蔽。
**理由**：提升 Android 裝置相容性與效能，避免常見問題。


### IV. 檔案結構原則
1. 採用 Feature-based 結構，每個功能模組皆有獨立資料夾。
2. 每個元件資料夾必須包含 index.tsx 與 styles.ts。
3. 所有 API 請求、型別定義、常量、工具函式需分開管理。
**理由**：提升模組化、可維護性與團隊協作效率。


### V. 代碼品質原則
1. 強制執行 ESLint 與 Prettier，統一程式碼風格。
2. 變數命名採 camelCase，元件命名採 PascalCase。
3. 每個元件需撰寫單元測試，確保主要功能正確性。
**理由**：確保代碼一致性、可讀性與穩定性。

### VI. 功能模組原則
1. 主地圖頁：Google Map 全螢幕顯示，支援迷霧遮罩、探索範圍顯示、狀態欄與底部工具列。
2. 統計頁：展示五大洲探索進度、進度條、百分比、面積資訊。
3. GPX 軌跡頁：支援 GPX 上傳、下載、雲端同步與本機儲存。
4. 設定頁：支援 GPX 匯入、深色模式切換等功能。
5. 其他：所有頁面皆需自適應、支援深色模式、UI/UX 參考《世界迷霧》APP。
**理由**：明確定義核心功能，確保產品完整性與一致性。

## 補充約束與技術要求

1. 僅允許使用 React Native（Expo）與 TypeScript。
2. 嚴禁使用 Inline Style，所有樣式必須集中管理。
3. 必須支援深色模式與 Android 字體規範。
4. 地圖功能必須整合 Google Map，並支援疊層與迷霧遮罩。
5. 權限、圖片、狀態管理等須依本憲法規範執行。


## 開發流程與品質保證

1. 所有程式碼必須通過 ESLint 與 Prettier 驗證。
2. 重大架構或原則變更，需經團隊共識並修訂本憲法。
3. 依據本憲法，規劃 tasks-template.md、spec-template.md、plan-template.md 之檢查門檻。


## 治理條款

1. 本憲法優先於其他開發慣例，所有開發流程、審查、規劃皆須遵循。
2. 憲法修訂需記錄修訂日期、版本號，並於團隊共識下執行。
3. 任何違反本憲法之程式碼不得合併至主分支。
4. 每次修訂須同步更新相關模板（plan、spec、tasks）與開發指引文件。
5. 定期（每月）進行憲法遵循性審查。


**Version**: 1.0.0 | **Ratified**: 2026-02-13 | **Last Amended**: 2026-02-13

<!--
Sync Impact Report
Version change: (init) → 1.0.0
新增全部原則與治理條款
新增補充約束、開發流程、治理條款
Templates requiring updates: plan-template.md ✅, spec-template.md ✅, tasks-template.md ✅
Follow-up TODOs: 無
-->
