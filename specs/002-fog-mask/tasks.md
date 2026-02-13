---
description: "Task list for 002-fog-mask: 迷霧遮罩渲染與探索"
---

# Tasks: 002-fog-mask 迷霧遮罩渲染與探索

> 所有任務必須遵循 FogWorld 憲法（技術核心、樣式、Android 最佳化、檔案結構、代碼品質、功能模組、治理條款等）之原則。

**Input**: /specs/002-fog-mask/
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 建立 src/features/fogmask/ 目錄結構（components, hooks, services, styles, types.ts, utils.ts）
- [X] T002 初始化 TypeScript + Expo + React Native 專案依賴（react-native-maps, zustand, @react-native-async-storage/async-storage）
- [X] T003 [P] 設定 ESLint、Prettier、Jest 測試環境

---

## Phase 2: Foundational (Blocking Prerequisites)

- [X] T004 [P] 實作 FogMask、ExploreTrack、UserStat、GPXFile 型別於 src/features/fogmask/types.ts
- [X] T005 [P] 實作 API 服務骨架於 src/features/fogmask/services/api.ts
- [X] T006 [P] 實作本地儲存服務於 src/features/fogmask/services/storage.ts
- [X] T007 [P] 實作 Zustand 狀態管理於 src/features/fogmask/store.ts
- [X] T008 設定 src/theme 與全域樣式規範

---

## Phase 3: User Story 1 - 開啟探索模式並顯示迷霧遮罩 (P1)

**Goal**: 使用者進入主地圖頁（MainMapPage）後，按下「開始探索」顯示迷霧遮罩，並以藍點為中心開啟透明區域，隨移動即時更新
**Independent Test**: 按下「開始探索」後，迷霧遮罩正確顯示，透明區域隨藍點移動即時更新，渲染延遲 <100ms，互動 60fps

- [X] T009 [P] [US1] 實作 FogMask 元件於 src/features/fogmask/components/FogMask.tsx
- [X] T010 [P] [US1] 實作探索啟動按鈕元件於 src/features/fogmask/components/ExploreButton.tsx
- [X] T011 [US1] 整合 Google Map 與 FogMask 顯示於主地圖頁 src/features/fogmask/MainMapPage.tsx
- [X] T012 [US1] 實作透明區域即時更新邏輯於 src/features/fogmask/hooks/useFogMask.ts
- [X] T013 [US1] 單元測試 FogMask 行為於 tests/features/fogmask/FogMask.test.tsx
- [X] T013b [US1] 單元測試 ExploreButton 行為於 tests/features/fogmask/ExploreButton.test.tsx
- [X] T013c [US1] 單元測試 MainMapPage 行為於 tests/features/fogmask/MainMapPage.test.tsx
- [X] T013d [US1] 單元測試 useFogMask 行為於 tests/features/fogmask/useFogMask.test.ts

---


## Phase 4: User Story 2 - 擦除迷霧並記錄探索軌跡 (P2)

**Goal**: 使用者移動時，經過網格會擦除對應遮罩，並每 5-10 秒自動儲存座標與軌跡，探索區域持續擴大
**Independent Test**: 使用者移動時遮罩被擦除，資料庫正確記錄軌跡與探索狀態，查詢延遲 <50ms

- [X] T014 [P] [US2] 擦除遮罩演算法於 src/features/fogmask/utils/eraseFog.ts
- [X] T015 [P] [US2] 軌跡記錄 hook 於 src/features/fogmask/hooks/useTrackRecorder.ts
- [X] T016 [US2] 整合擦除與軌跡記錄於主頁 src/features/fogmask/MainMapPage.tsx
- [X] T017 [US2] 單元測試擦除與軌跡記錄於 tests/features/fogmask/TrackRecorder.test.tsx

---


## Phase 5: User Story 3 - 顯示統計資訊與異常處理 (P3)

**Goal**: 即時顯示已探索面積、百分比、等級，定位失敗或未授權時全遮罩並彈出提示
**Independent Test**: 統計資訊即時更新，異常時全遮罩與提示正確顯示，異常處理 100% 覆蓋

- [X] T018 [P] [US3] 統計資訊元件於 src/features/fogmask/components/Statistics.tsx
- [X] T019 [US3] 狀態欄異常處理邏輯於 src/features/fogmask/hooks/useErrorHandler.ts
- [X] T020 [US3] 整合統計與異常處理於主頁 src/features/fogmask/MainMapPage.tsx
- [X] T021 [US3] 單元測試統計與異常於 tests/features/fogmask/Statistics.test.tsx

---


## Phase N: Polish & Cross-Cutting Concerns

- [X] T022 [P] 文件補充與 API 合約同步於 docs/002-fog-mask/（須包含所有資料實體、API、異常處理、邊界情境說明）
- [X] T023 代碼重構與效能優化（細化：針對地圖互動效能 <100ms、60fps，優化渲染與狀態管理，重構重複邏輯，統一命名）
- [X] T024 [P] 補充單元測試於 tests/features/fogmask/（補齊所有元件：ExploreButton, MainMapPage, useFogMask, useTrackRecorder, useErrorHandler 等，並覆蓋所有邊界情境）
- [ ] T025 安全性強化與權限驗證（明確驗收：權限異常時 100% 彈出提示並禁止探索，測試權限異常與資料異常情境）
- [X] T026 執行 quickstart.md 驗證（須依據 spec.md 之可衡量成果逐項驗證）
- [X] T027 [P] SQLite 索引查詢效能優化與測試於 src/features/fogmask/services/storage.ts、tests/features/fogmask/Storage.test.ts（查詢延遲 <50ms，異常資料測試）
- [ ] T028 [P] 跨平台（Android/iOS）效能與相容性測試，確保 95% 以上裝置不卡頓、顯示正常，並覆蓋不同螢幕尺寸、深色模式
- [X] T029 [P] 地圖資料載入失敗處理與測試於 src/features/fogmask/hooks/useErrorHandler.ts、tests/features/fogmask/ErrorHandler.test.ts（100% 覆蓋載入失敗、API 錯誤、資料異常等情境）
- [X] T030 [P] 邊界情境測試：定位失敗、未授權、地圖資料異常、經緯度超出範圍等於 tests/features/fogmask/BoundaryCases.test.tsx

---


## Dependencies & Execution Order

- Phase 1 → Phase 2 → 各 User Story（P1→P2→P3）可獨立測試
- 各 [P] 任務可平行進行（不同檔案、無依賴）
- 每個 User Story 完成後可單獨驗證
- 所有驗收標準、命名、資料實體、技術規範皆以 spec.md 與 .specify/memory/constitution.md 為唯一依據，避免用詞漂移。

## Parallel Example
- T003、T004、T005、T006、T007、T008 可同時進行
- US1/US2/US3 各自元件、hook、測試可平行開發

## Implementation Strategy
- 先完成 Setup + Foundational，US1 為 MVP，逐步增量交付
