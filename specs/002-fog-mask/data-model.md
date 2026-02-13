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

# spec.md 補充：

### Grid
- grid_id: string（唯一）
- explored: boolean
- updated_at: datetime

### Track
- id: string（唯一）
- time: datetime
- lat: number
- lng: number
- grid_id: string

### Stat
- id: string（唯一）
- key: string
- value: number

## 關聯補充
- Track 與 Grid 以 grid_id 關聯，紀錄探索軌跡屬於哪個網格。
- Stat 為全域統計資訊，與使用者探索進度、面積等級相關。

## 驗證規則補充
- grid_id 必須唯一且正確對應地圖座標。
- explored 狀態僅能由探索行為觸發。
- Track 必須每 5-10 秒自動儲存，lat/lng 必須有效。
- Stat 必須即時更新，key 唯一。

## 狀態轉換補充
- Grid.explored: false → true（使用者探索擦除迷霧時）
- Track: 新增（每 5-10 秒）、查詢、同步（雲端）
- Stat: 計算、更新（探索面積百分比、等級）
