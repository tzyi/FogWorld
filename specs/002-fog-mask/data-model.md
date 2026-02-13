# data-model.md

## 主要實體

### 1. FogMask（迷霧遮罩）
- id: string
- userId: string
- mapGrid: Array<Array<number>>  // 0=未探索, 1=已探索
- updatedAt: datetime

### 2. ExploreTrack（探索軌跡）
- id: string
- userId: string
- points: Array<{ lat: number, lng: number, timestamp: number }>
- createdAt: datetime

### 3. UserStat（用戶統計）
- userId: string
- exploredArea: number  // 單位: 平方公里
- exploredPercent: number  // 百分比
- level: number
- updatedAt: datetime

### 4. GPXFile
- id: string
- userId: string
- fileName: string
- uploadedAt: datetime
- localPath: string

## 關聯
- FogMask 與 ExploreTrack 以 userId 關聯
- UserStat 以 userId 匯總 FogMask/ExploreTrack
- GPXFile 以 userId 關聯

## 驗證規則
- mapGrid 限定大小（依地圖區域）
- points 陣列不可為空
- exploredPercent 0~100
- fileName 不可為空

## 狀態轉移
- FogMask: 未探索 → 已探索
- ExploreTrack: 新增 → 擴充
- UserStat: 每次探索後即時更新
