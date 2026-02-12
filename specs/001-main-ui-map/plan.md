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

**Language/Version**: TypeScript 5.x, React Native (Expo) 最新 LTS  
**Primary Dependencies**: react-native-maps、@shopify/react-native-skia、expo-location、expo-task-manager、expo-sqlite  
**Storage**: SQLite（expo-sqlite，設計 grids、tracks、stats 資料表）  
**Testing**: Jest、React Native Testing Library、ESLint、Prettier  
**Target Platform**: Android 10+（支援多尺寸螢幕、深色模式）
**Project Type**: mobile（feature-based 結構）  
**Performance Goals**: 地圖渲染 60fps、迷霧遮罩即時更新、定位追蹤延遲 <1s  
**Constraints**: 僅載入可視範圍迷霧、軌跡點批次寫入、記憶體佔用低、支援離線  
**Scale/Scope**: 單一 APP，主地圖頁 1、狀態欄 1、工具列 1、核心元件 4 個


## Constitution Check


*GATE: 已通過 FogWorld 憲法所有原則（技術核心、樣式、Android 最佳化、檔案結構、代碼品質、功能模組、治理條款等），可進入 Phase 0 研究。Phase 1 設計後將再次檢查。*

1. 僅允許 React Native（Expo）+ TypeScript + Functional Components
2. 嚴格禁止 Inline Style，樣式集中管理（StyleSheet.create 或 Tailwind）
3. 地圖功能整合 Google Map 並支援迷霧遮罩
4. 必須有單元測試與 ESLint/Prettier 驗證
5. 檔案結構、命名、權限、圖片、狀態管理等依憲法規範
6. 重大變更需修訂憲法並團隊共識

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
ios/ or android/

```text
src/
├── components/         # UI 元件（MainMap, StatusBar, ToolBar 等）
├── hooks/              # React Hooks（useLocationTracker 等）
├── services/           # 業務邏輯與資料存取（db.ts）
├── utils/              # 工具函式（geoUtils.ts）
├── theme/              # 樣式常量
└── ...
tests/
├── unit/               # 單元測試
├── integration/        # 整合測試
└── contract/           # API/資料結構契約測試
```

**Structure Decision**: 採用 feature-based mobile 結構，所有主功能模組（地圖、定位、迷霧、狀態欄、工具列）皆有獨立目錄，測試與契約分開管理，完全符合憲法規範。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
