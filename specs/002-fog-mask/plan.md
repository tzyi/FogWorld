# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]
主要需求：地圖迷霧遮罩即時互動、探索軌跡紀錄、統計資訊顯示。
技術路線：採用 React Native/Expo + TypeScript，地圖整合 Google Maps API，狀態管理用 Zustand，儲存採混合架構（本地 SQLite/AsyncStorage + 雲端 Firebase/Supabase），所有樣式集中管理，效能目標 60fps、渲染延遲 <100ms。
所有技術釐清（如儲存方式）已於 research.md 完成，無 NEEDS CLARIFICATION。
## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]
**Language/Version**: TypeScript (React Native/Expo)
**Primary Dependencies**: Expo, React Native, Google Maps API, Zustand (狀態管理)
**Storage**: NEEDS CLARIFICATION（是否需本地/雲端儲存探索軌跡？）
**Testing**: Jest, React Native Testing Library, ESLint, Prettier
**Target Platform**: Android（優先）、iOS（次要）
**Project Type**: Mobile（Feature-based 結構）
**Performance Goals**: 60fps 互動、渲染延遲 <100ms、資料查詢 <50ms
**Constraints**: 禁用 Inline Style，所有樣式集中管理，地圖整合 Google Map 並支援迷霧遮罩，需有單元測試與 ESLint/Prettier 驗證
**Scale/Scope**: 1 地圖主頁、迷霧遮罩、探索軌跡紀錄、統計資訊（約 3-5 個主要畫面）

## Constitution Check

*GATE: 必須通過 FogWorld 憲法所有原則（技術核心、樣式、Android 最佳化、檔案結構、代碼品質、功能模組、治理條款等），方可進入 Phase 0 研究。Phase 1 設計後需再次檢查。*

1. 僅允許 React Native（Expo）+ TypeScript + Functional Components
2. 嚴格禁止 Inline Style，樣式集中管理
3. 地圖功能必須整合 Google Map 並支援迷霧遮罩
4. 必須有單元測試與 ESLint/Prettier 驗證
5. 檔案結構、命名、權限、圖片、狀態管理等須依憲法規範
6. 重大變更需修訂憲法並團隊共識

---
Phase 1 設計完成後檢查：所有資料模型、API 合約、技術選型、目錄結構、測試與樣式規範皆符合 FogWorld 憲法規範，無違規或需特別說明之處。

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
