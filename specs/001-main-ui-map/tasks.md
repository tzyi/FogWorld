# Tasks: 主地圖介面仿世界迷霧

**Feature Name**: 主地圖介面仿世界迷霧

---

## Phase 1: Setup
- [X] T001 建立專案目錄結構（src/components, src/hooks, src/services, src/utils, src/theme）
- [X] T002 安裝 UI 參考程式碼所需依賴（react, tailwindcss, lucide-react 等）
- [X] T003 初始化 Tailwind CSS 與全域樣式（src/styles/globals.css）
- [X] T004 設定 TypeScript 與 Prettier/ESLint 規範

## Phase 2: Foundational
- [X] T005 建立 App 進入點與頁面切換邏輯於 src/App.tsx
- [X] T006 建立底部導覽元件於 src/components/BottomNav.tsx

---

## Phase 3: [US1] 主地圖頁 UI 實作（P1）
- [X] T007 [P] [US1] 實作 Dashboard UI（全螢幕地圖、迷霧遮罩、藍點）於 src/components/Dashboard.tsx
- [X] T008 [P] [US1] 實作地圖上方定位按鈕於 src/components/Dashboard.tsx
- [X] T009 [P] [US1] 實作底部狀態欄（等級、探索比例、今日/累積里程）於 src/components/Dashboard.tsx
- [X] T010 [P] [US1] 實作紅色「開始探索」按鈕於 src/components/Dashboard.tsx

### User Story 1 Goal
- APP 啟動即顯示地圖、藍點、迷霧遮罩，UI 完全符合參考設計

### 獨立驗證標準
- 啟動 APP，確認地圖、藍點、迷霧遮罩正確顯示，UI 無差異

---

## Phase 4: [US2] 狀態欄與探索按鈕 UI 實作（P2）
- [X] T011 [P] [US2] 實作狀態欄資訊顯示（等級、探索比例、里程）於 src/components/Dashboard.tsx
- [X] T012 [P] [US2] 實作紅色「開始/停止探索」按鈕切換樣式於 src/components/Dashboard.tsx

### User Story 2 Goal
- 狀態欄與探索按鈕互動樣式正確，UI 完全符合參考設計

### 獨立驗證標準
- 狀態欄資訊與紅色按鈕樣式正確，點擊可切換狀態（僅 UI 切換）

---

## Phase 5: [US3] 工具列與深色模式 UI 實作（P3）
- [X] T013 [P] [US3] 實作橫向捲動工具列（4 個圖示按鈕）於 src/components/BottomNav.tsx
- [X] T014 [P] [US3] 實作深色模式全域樣式於 src/styles/globals.css
- [X] T015 [P] [US3] 確認所有 UI 文字皆為繁體中文於 src/components/

### User Story 3 Goal
- 工具列 4 按鈕、深色主題、繁體中文，UI 完全符合參考設計

### 獨立驗證標準
- 工具列 4 按鈕可見、深色主題正確、所有文字皆為繁體中文

---

## Phase 6: [US4] 其他頁面 UI 實作（P1~P3）
- [X] T016 [P] [US1] 實作個人統計數據頁 UI 於 src/components/Statistics.tsx
- [X] T017 [P] [US1] 實作 GPX 雲端同步頁 UI 於 src/components/SyncPage.tsx
- [X] T018 [P] [US1] 實作設定頁 UI（匯入 GPX 按鈕）於 src/components/SettingsPage.tsx

### User Story 4 Goal
- 其餘 3 頁面 UI 完全符合參考設計

### 獨立驗證標準
- 切換至各頁面，UI 完全一致、無功能

---

## Phase 7: Polish & Cross-Cutting
- [X] T019 全面比對 UI 參考程式碼，確保無任何差異
- [X] T020 檢查所有頁面於不同尺寸下自適應與無遮蔽
- [X] T021 檢查所有 UI 皆為繁體中文

---

## Dependencies
- Phase 1 → Phase 2 → Phase 3/4/5/6（Phase 3~6 可平行）→ Phase 7

## 平行執行建議
- T007~T010、T011~T012、T013~T015、T016~T018 可分組平行開發（不同檔案、無依賴）

## Implementation Strategy
- 先完成 UI，嚴格比對參考程式碼，功能延後
- 每個頁面 UI 完成後可獨立驗證
- MVP 僅需主地圖頁（T007~T010）

---

## 格式驗證
- 所有任務皆為 checklist 格式，含 TaskID、[P]、[US?]、檔案路徑
