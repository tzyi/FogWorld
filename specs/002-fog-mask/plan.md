# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (React Native, Expo)  
**Primary Dependencies**: React Native, Expo, Google Maps API, Zustand (狀態管理，需確認), ESLint, Prettier, Jest (單元測試，需確認)  
**Storage**: 本地儲存（AsyncStorage 或 SecureStore，需釐清），雲端同步（未定，需釐清）  
**Testing**: Jest（單元測試，需釐清覆蓋率標準）、ESLint、Prettier  
**Target Platform**: Android（優先）、iOS（次要，需釐清支援範圍）
**Project Type**: mobile（feature-based 結構）  
**Performance Goals**: 地圖互動 60fps、迷霧遮罩即時更新 <100ms、地圖載入 <2s（需釐清）  
**Constraints**: 嚴禁 Inline Style、樣式集中管理、必須支援深色模式、Android 字體規範、權限嚴格遵循憲法、地圖功能必須整合 Google Map 並支援迷霧遮罩  
**Scale/Scope**: 1~2 地圖主頁、1 統計頁、1 設定頁、1 GPX 頁，迷霧遮罩演算法與狀態管理須可擴展（需釐清用戶數/資料量上限）


## Constitution Check

*GATE: 必須通過 FogWorld 憲法所有原則（技術核心、樣式、Android 最佳化、檔案結構、代碼品質、功能模組、治理條款等），方可進入 Phase 0 研究。Phase 1 設計後需再次檢查。*

### 技術核心原則
1. 僅允許 React Native（Expo）+ TypeScript + Functional Components
2. 狀態管理優先用 React Hooks，複雜可用 Context API 或 Zustand
3. 地圖功能必須整合 Google Map 並支援地圖疊層與迷霧遮罩

### 樣式規範原則
1. 嚴格禁止 Inline Style，統一用 StyleSheet.create 宣告
2. 所有樣式參數須引用 src/theme 常數
3. 深色模式為主，字體須符合法規，繁中顯示

### Android 最佳化原則
1. 處理 BackHandler、圖片記憶體優化、權限請求流程標準化
2. 介面需自適應各種 Android 裝置尺寸

### 檔案結構原則
1. 採 feature-based 結構，每模組獨立資料夾
2. 元件資料夾必含 index.tsx 與 styles.ts
3. API、型別、常數、工具函式分開管理

### 代碼品質原則
1. 強制執行 ESLint 與 Prettier
2. 命名規則：變數 camelCase、元件 PascalCase
3. 每元件需有單元測試

### 功能模組原則
1. 主地圖頁：Google Map 全螢幕、迷霧遮罩、狀態欄、底部工具列
2. 統計頁：五大洲進度、進度條、百分比、面積資訊
3. GPX 頁：支援 GPX 上傳/下載/同步/本機儲存
4. 設定頁：GPX 匯入、深色模式切換等
5. 其他：全頁自適應、深色模式、UI/UX 參考《世界迷霧》APP

### 補充約束與技術要求
1. 僅允許 React Native（Expo）與 TypeScript
2. 嚴禁 Inline Style，樣式集中管理
3. 必須支援深色模式與 Android 字體規範
4. 地圖功能必須整合 Google Map 並支援疊層與迷霧遮罩
5. 權限、圖片、狀態管理等須依憲法規範執行

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
