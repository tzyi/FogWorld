# Data Model: 主地圖介面仿世界迷霧

## Entity: Grid
- grid_id: string (主鍵，經緯度網格編碼)
- explored: boolean (是否已探索)
- updated_at: datetime (最後更新時間)

## Entity: Track
- id: integer (主鍵)
- time: datetime (紀錄時間)
- lat: float (緯度)
- lng: float (經度)
- grid_id: string (對應網格)

## Entity: Stat
- id: integer (主鍵)
- key: string (統計項目，如 total_explored, today_distance)
- value: float (數值)

## 關聯
- 一個 Track 對應一個 Grid
- Stat 為全域統計資訊

## 驗證規則
- Track 必須有合法經緯度（-90~90, -180~180）
- Grid_id 需唯一
- Stat key 唯一

## 狀態轉換
- Grid.explored: false → true（首次經過該網格時）
- Track: 新增時自動關聯 Grid
- Stat: 定期更新
