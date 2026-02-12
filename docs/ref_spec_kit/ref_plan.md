# ref_plan

請根據下列需求，產生一份完整的「世界迷霧」復刻專案實作計劃（plan），內容需包含：

1. 技術棧與環境配置
- 地圖引擎：react-native-maps（Google Maps 底圖）
- 迷霧渲染：@shopify/react-native-skia（高效遮罩擦除）
- 定位追蹤：expo-location + expo-task-manager（支援後台持續記錄）
- 本地數據：expo-sqlite（存儲海量 GPS 座標點，不建議用 AsyncStorage，會卡頓）

2. 實作階段規劃
- 階段一：地圖與定位
    任務：建立全螢幕地圖視圖，並實作「當前位置」追蹤。
    關鍵點：請求 FOREGROUND_SERVICE 與 ACCESS_BACKGROUND_LOCATION 權限。
    檔案：src/components/MainMap.tsx, src/hooks/useLocationTracker.ts。
    
- 階段二：迷霧層渲染
    任務：在地圖上方覆蓋一層 Skia Canvas。
    實作邏輯：
        將全球劃分為網格 (Grids)，每個座標點對應一個網格狀態。
        使用 Skia 的 Canvas.clear() 或 BlendMode.DstOut 功能，根據用戶行經的座標點「擦除」黑色遮罩。
    關鍵點：需將經緯度轉換為 Canvas 上的座標系。

- 階段三：數據存儲與性能優化
    任務：實作每 5-10 秒存儲一次座標，並在地圖縮放時僅加載可視範圍內的迷霧。
    優化：利用 SQLite 的索引功能優化經緯度查詢速度。
    檔案：src/services/db.ts, src/utils/geoUtils.ts。

- 階段四：統計資訊與位階系統
    任務：計算已探索面積（％）與領土等級。
    邏輯：遍歷 SQLite 中的網格數據，計算 Unique Grids 數量。


3. 關鍵檔案結構建議
- src/components/MainMap.tsx
- src/hooks/useLocationTracker.ts
- src/services/db.ts
- src/utils/geoUtils.ts

4. SQLite 表格結構建議
- 建議設計 grids、tracks、stats 等資料表，並說明欄位用途與索引設計。

5. 測試與驗證
- 規劃單元測試與整合測試，確保定位、迷霧渲染、資料存取皆可獨立驗證。

6. 里程碑與時程
- 條列各階段預估時程與交付標準。

7. Android 最佳化細節
- 權限請求流程、深色模式、螢幕適配、效能優化建議。

8. 效能優化
- 軌跡點批次寫入(每 30 秒或累積 20 個點)
- 地圖渲染採用虛擬化技術,僅載入可視範圍內的迷霧圖層
- 使用 Hermes 引擎減少記憶體佔用

請以繁體中文條列，內容務必具體可執行，方便團隊直接依據此計劃進行開發。