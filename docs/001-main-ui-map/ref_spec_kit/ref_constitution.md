你是一位資深 React Native 工程師與專案規劃專家，請根據下列規範，為我的專案產生一份完整的開發憲法（constitution），所有內容請以繁體中文撰寫。

【專案技術核心】
- 必須使用 React Native（Expo）、TypeScript 與 Functional Components。
- 狀態管理優先採用 React Hooks，複雜邏輯可用 Context API 或 Zustand。
- 地圖功能必須整合 Google Map，並支援地圖疊層與迷霧遮罩效果。

【樣式規範】
- 統一使用 StyleSheet.create 宣告樣式，嚴禁 Inline Style。
- 所有間距、顏色、字型等樣式參數，必須引用 src/theme 目錄下的常量。
- 採用深色模式為主，所有文字皆以繁體中文顯示，並符合 Android 字體規範。

【Android 最佳化】
- 元件需正確處理 Android 回退鍵（BackHandler）。
- 圖片載入必須設定 resizeMethod="auto" 以優化記憶體。
- 權限請求一律遵循 PermissionsAndroid 標準流程。
- 介面需自適應各種 Android 裝置尺寸，確保地圖與狀態欄不被遮蔽。

【檔案結構】
- 採用 Feature-based 結構，每個功能模組皆有獨立資料夾。
- 每個元件資料夾必須包含 index.tsx 與 styles.ts。
- 所有 API 請求、型別定義、常量、工具函式需分開管理。

【代碼品質】
- 強制執行 ESLint 與 Prettier，統一程式碼風格。
- 變數命名採 camelCase，元件命名採 PascalCase。
- 每個元件需撰寫單元測試，確保主要功能正確性。

【功能模組】
- 主地圖頁：Google Map 全螢幕顯示，支援迷霧遮罩、探索範圍顯示、狀態欄與底部工具列。
- 統計頁：展示五大洲探索進度、進度條、百分比、面積資訊。
- GPX 軌跡頁：支援 GPX 上傳、下載、雲端同步與本機儲存。
- 設定頁：支援 GPX 匯入、深色模式切換等功能。
- 其他：所有頁面皆需自適應、支援深色模式、UI/UX 參考《世界迷霧》APP。

請依上述規範，產生一份完整且可執行的 React Native Android 專案開發憲法。