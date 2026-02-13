---
description: "Task list for 002-fog-mask: 迷霧遮罩渲染與探索"
---

# Tasks: 002-fog-mask 迷霧遮罩渲染與探索

> 所有任務必須遵循 FogWorld 憲法（技術核心、樣式、Android 最佳化、檔案結構、代碼品質、功能模組、治理條款等）之原則。

**Input**: /specs/002-fog-mask/
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 建立 src/features/fogmask/ 目錄結構（components, hooks, services, styles, types.ts, utils.ts）
- [ ] T002 初始化 TypeScript + Expo + React Native 專案依賴（react-native-maps, zustand, @react-native-async-storage/async-storage）
- [ ] T003 [P] 設定 ESLint、Prettier、Jest 測試環境

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T004 [P] 實作 FogMask、ExploreTrack、UserStat、GPXFile 型別於 src/features/fogmask/types.ts
- [ ] T005 [P] 實作 API 服務骨架於 src/features/fogmask/services/api.ts
- [ ] T006 [P] 實作本地儲存服務於 src/features/fogmask/services/storage.ts
- [ ] T007 [P] 實作 Zustand 狀態管理於 src/features/fogmask/store.ts
- [ ] T008 設定 src/theme 與全域樣式規範

---

## Phase 3: User Story 1 - 開啟探索模式並顯示迷霧遮罩 (P1)

**Goal**: 使用者進入地圖後，按下「開始探索」顯示迷霧遮罩，並以藍點為中心開啟透明區域，隨移動即時更新
**Independent Test**: 按下「開始探索」後，迷霧遮罩正確顯示，透明區域隨藍點移動即時更新

- [ ] T009 [P] [US1] 實作 FogMask 元件於 src/features/fogmask/components/FogMask.tsx
- [ ] T010 [P] [US1] 實作探索啟動按鈕元件於 src/features/fogmask/components/ExploreButton.tsx
- [ ] T011 [US1] 整合 Google Map 與 FogMask 顯示於主頁 src/features/fogmask/MainMapPage.tsx
- [ ] T012 [US1] 實作透明區域即時更新邏輯於 src/features/fogmask/hooks/useFogMask.ts
- [ ] T013 [US1] 單元測試 FogMask 行為於 tests/features/fogmask/FogMask.test.tsx

---

## Phase 4: User Story 2 - 擦除迷霧並記錄探索軌跡 (P2)

**Goal**: 使用者移動時，經過網格會擦除對應遮罩，並每 5-10 秒自動儲存座標與軌跡，探索區域持續擴大
**Independent Test**: 使用者移動時遮罩被擦除，資料庫正確記錄軌跡與探索狀態

- [ ] T014 [P] [US2] 擦除遮罩演算法於 src/features/fogmask/utils/eraseFog.ts
- [ ] T015 [P] [US2] 軌跡記錄 hook 於 src/features/fogmask/hooks/useTrackRecorder.ts
- [ ] T016 [US2] 整合擦除與軌跡記錄於主頁 src/features/fogmask/MainMapPage.tsx
- [ ] T017 [US2] 單元測試擦除與軌跡記錄於 tests/features/fogmask/TrackRecorder.test.tsx

---

## Phase 5: User Story 3 - 顯示統計資訊與異常處理 (P3)

**Goal**: 即時顯示已探索面積、百分比、等級，定位失敗或未授權時全遮罩並彈出提示
**Independent Test**: 統計資訊即時更新，異常時全遮罩與提示正確顯示

- [ ] T018 [P] [US3] 統計資訊元件於 src/features/fogmask/components/Statistics.tsx
- [ ] T019 [US3] 狀態欄異常處理邏輯於 src/features/fogmask/hooks/useErrorHandler.ts
- [ ] T020 [US3] 整合統計與異常處理於主頁 src/features/fogmask/MainMapPage.tsx
- [ ] T021 [US3] 單元測試統計與異常於 tests/features/fogmask/Statistics.test.tsx

---

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T022 [P] 文件補充與 API 合約同步於 docs/002-fog-mask/
- [ ] T023 代碼重構與效能優化
- [ ] T024 [P] 補充單元測試於 tests/features/fogmask/
- [ ] T025 安全性強化與權限驗證
- [ ] T026 執行 quickstart.md 驗證

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → 各 User Story（P1→P2→P3）可獨立測試
- 各 [P] 任務可平行進行（不同檔案、無依賴）
- 每個 User Story 完成後可單獨驗證

## Parallel Example
- T003、T004、T005、T006、T007、T008 可同時進行
- US1/US2/US3 各自元件、hook、測試可平行開發

## Implementation Strategy
- 先完成 Setup + Foundational，US1 為 MVP，逐步增量交付
