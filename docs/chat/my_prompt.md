# My prompt

## UI

```
你是一位UI/UX專家

請參考世界迷霧這款Android APP
Https://fogofworld.app/zh-hant/

我主要想要用React Native的Expo go複製一模一樣的Android APP

我想用Google Stich幫我產生以上應用程式UI
我應該在Google Stich如何下提示詞呢？
請幫我整理提示詞，讓我可以直接複製到Google Stich中

提示詞請用繁體中文
```

- 結果
```
請參考世界迷霧這款Android APP
Https://fogofworld.app/zh-hant/

我主要想要用React Native的Expo go複製一模一樣的Android APP

1. 主地圖介面 (Main_Dashboard.png)
你是一位資深 React Native 工程師，請協助設計一個仿《世界迷霧》的 Android App 主頁。
請使用 Expo Go 建立全螢幕地圖介面，並具備以下細節：

- 地圖上方需有半透明深灰色疊層，營造迷霧效果，僅中央圓形使用者所在的藍點區域為透明，代表已探索範圍。
- 地圖底部設置一個狀態欄，顯示「等級 1」、「探索比例 0.00001234%」、「今天里程數」與「累積里程數」四項資訊，狀態欄需圓角設計。
- 狀態欄中間一個紅色按鈕，標示「開始探索」，按下後觸發探索功能。再按一次紅色按鈕則停止探索。
- 狀態欄下方有一個橫向捲動的工具列，包含4個圖示按鈕：探索地圖、個人統計數據、GPX 軌跡上傳下載、設定選單。
- 介面整體採用深色模式，所有文字與數字皆以繁體中文顯示。
- 請使用 TypeScript 與 Tailwind CSS 樣式，確保程式碼結構清晰易維護。
- 介面需適配各種 Android 裝置尺寸，確保地圖與狀態欄不會被遮蔽。


2. 個人統計數據頁面 (Statistics_Page.png)
你是一位專業 UI/UX 設計師，請設計一個仿《世界迷霧》的數據統計頁面，內容如下：

- 以列表方式展示五大洲的探索進度，每個洲別需有專屬圖示。
- 每個洲別項目包含：洲別圖示、進度條、精確到小數點後 8 位的百分比數值、以及總探索面積（平方公里）。
- 介面風格極簡，背景為純黑色，文字顏色僅限白色與淺灰色，進度條顏色需明顯區分已探索與未探索部分。
- 最下方有一個橫向捲動的工具列，包含4個圖示按鈕：探索地圖、個人統計數據、GPX 軌跡上傳下載、設定選單。
- 所有文字皆使用繁體中文，並符合 Android 字體規範。
- 介面需自適應不同螢幕尺寸，確保資訊完整顯示且不擁擠。


3. GPX 軌跡與遊玩紀錄雲端同步功能（sync.png）
你是一位專業 React Native UI/UX 設計師，請設計一個仿照附件圖片風格的「GPX 軌跡與遊玩紀錄雲端同步」頁面，具體需求如下：

- 頁面標題為「儲存紀錄」，置中顯示於頂部，字體加粗，背景為深色。
- 中央顯示目前紀錄的檔名（如：Snapshot-20231202T224657+1300.gpx），下方有「重新命名」藍色文字按鈕。
- 設有「下載到本機」按鈕，點擊可將目前快照上的 GPX 或紀錄檔案下載回本機裝置。
- 最下方，「下載到本機」按鈕下面一樣有一個橫向捲動的工具列，包含4個圖示按鈕：探索地圖、個人統計數據、GPX 軌跡上傳下載、設定選單。
- 所有操作、按鈕、提示文字皆以繁體中文顯示，並符合深色模式設計。
- 介面需自適應各種 Android 裝置尺寸，確保所有元件不會被遮蔽或重疊。
- 請使用 Expo 內建元件與 TypeScript，並以 Tailwind CSS 樣式撰寫。

4. 設定頁面 (Settings_Page.png)
- 先幫我實作一個「匯入GPX檔案」的按鈕就好


<!-- 3. GPX 軌跡與遊玩紀錄雲端同步功能（sync.png）
你是一位專業 React Native UI/UX 設計師，請設計一個仿照附件圖片風格的「GPX 軌跡與遊玩紀錄雲端同步」頁面，具體需求如下：

- 頁面標題為「雲端同步」，置中顯示於頂部，字體加粗，背景為深色。
- 中央顯示目前快照或紀錄的檔名（如：Snapshot-20231202T224657+1300.gpx），下方有「重新命名」藍色文字按鈕。
- 提供多個雲端儲存服務選項（如 Google Drive、OneDrive），每個選項左側有服務圖示，右側有勾選框或連結狀態（未連結顯示紅色鏈結圖示）。
- 用戶可多選雲端服務作為上傳目標，已連結的服務可直接勾選，未連結的顯示「連結」按鈕。
- 下方有一段說明文字，提醒用戶快照僅儲存在本機，刪除 APP 會一併刪除所有快照，建議將重要快照上傳雲端備份。
- 提供「上傳快照」的開關（Switch），預設為開啟，關閉時不會自動上傳雲端。
- 另設有「下載到本機」按鈕，點擊可將目前快照上的 GPX 或紀錄檔案下載回本機裝置。
- 頁面下方有一個大按鈕，標示「儲存並上傳」，按下後會將 GPX 或遊玩紀錄同步到所選雲端服務。
- 最下方，「儲存並上傳」按鈕下面一樣有一個橫向捲動的工具列，包含4個圖示按鈕：探索地圖、個人統計數據、GPX 軌跡上傳下載、設定選單。
- 所有操作、按鈕、提示文字皆以繁體中文顯示，並符合深色模式設計。
- 介面需自適應各種 Android 裝置尺寸，確保所有元件不會被遮蔽或重疊。
- 請使用 Expo 內建元件與 TypeScript，並以 Tailwind CSS 樣式撰寫。 -->


<!-- 3. 成就與徽章系統 (Achievements & Badges)
你是一位遊戲化 UI 專家，請設計一個仿《世界迷霧》的成就解鎖牆，具體需求如下：

以 3 欄位網格（Grid）方式排列所有成就徽章，徽章為圓形設計。
已解鎖的徽章顯示彩色發光圖示，未解鎖的則以灰色剪影呈現。
點擊任一徽章時，需彈出 Modal 視窗，顯示該成就的達成日期與詳細描述，內容以繁體中文呈現。
請使用 Expo 內建元件，確保在各種 Android 螢幕尺寸下皆能完美適配，網格間距需均勻。
介面整體風格需現代、簡潔，並強調遊戲化成就感。 -->
```



## constitution
- 跟AI討論，來產生constitution.md
```
你是一位Github Copilot與Spec Kit專家
我專案的技術想要使用React Native打造Android APP
當我下speckit.constitution
後面提示詞要怎麼打比較適合?
```


- constitution.md
```
你是一位資深 React Native 工程師與專案規劃專家，請根據下列規範，為我的專案產生一份完整的開發憲法（constitution），所有內容請以繁體中文撰寫。

【專案技術核心】
- 必須使用 React Native（Expo）、TypeScript 與 Functional Components。
- 狀態管理優先採用 React Hooks，複雜邏輯可用 Context API 或 Zustand。
- 地圖功能必須整合 Google Map，並支援地圖疊層與迷霧遮罩效果。

【樣式規範】
- 統一使用 StyleSheet.create 宣告樣式，嚴禁 Inline Style。
- 所有間距、顏色、字型等樣式參數，必須引用 src/theme 目錄下的常量。
- 採用深色模式為主，所有文字皆以繁體中文顯示，並符合 Android 字體規範。

【Android 最佳化】
- 元件需正確處理 Android 回退鍵（BackHandler）。
- 圖片載入必須設定 resizeMethod="auto" 以優化記憶體。
- 權限請求一律遵循 PermissionsAndroid 標準流程。
- 介面需自適應各種 Android 裝置尺寸，確保地圖與狀態欄不被遮蔽。

【檔案結構】
- 採用 Feature-based 結構，每個功能模組皆有獨立資料夾。
- 每個元件資料夾必須包含 index.tsx 與 styles.ts。
- 所有 API 請求、型別定義、常量、工具函式需分開管理。

【代碼品質】
- 強制執行 ESLint 與 Prettier，統一程式碼風格。
- 變數命名採 camelCase，元件命名採 PascalCase。
- 每個元件需撰寫單元測試，確保主要功能正確性。

【功能模組】
- 主地圖頁：Google Map 全螢幕顯示，支援迷霧遮罩、探索範圍顯示、狀態欄與底部工具列。
- 統計頁：展示五大洲探索進度、進度條、百分比、面積資訊。
- GPX 軌跡頁：支援 GPX 上傳、下載、雲端同步與本機儲存。
- 設定頁：支援 GPX 匯入、深色模式切換等功能。
- 其他：所有頁面皆需自適應、支援深色模式、UI/UX 參考《世界迷霧》APP。

請依上述規範，產生一份完整且可執行的 React Native Android 專案開發憲法。
```

```
/speckit.constitution 請參考 docs\spec-kit\constitution.md
```


## specify
- 依據上面創建UI的提示詞與圖片，來產生ref_specify.md
```
/speckit.specify 請參考 ref_specify.md
```


## Clarify

```
clarify
```


## plan

- 跟AI討論，來產生ref_plan.md
```
你是一位Github Copilot與Spec Kit專家
我要執行/speckit.plan時
如何為 React Native產生實作計劃
```
- ref_plan.md

```
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

```


- 執行
```
/speckit.plan 請參考 docs\plan\plan.md
```


## tasks

```
/speckit.tasks 一開始的步驟請先完成4個頁面的UI實作，UI就好，功能先不實作，等UI完成後再來實作功能。並且UI部分嚴格按照spec.md中的UI設計來實作，不能有任何差異。UI完成後再來實作功能，功能的部分請參考spec.md中的Functional Requirements來實作。
```

## implement

```
/speckit.implement 請幫我時做Phase 1 到 Phase 4的任務，Phase 1 到 Phase 4的任務請參考docs\plan\tasks.md中的Phase 1 到 Phase 4的任務列表，總共12個任務。，不准問我要不要繼續，就一直做下去，直到完成這12個任務才可以停下來。
```

```
/speckit.implement 請幫我時做Phase 5 到 Phase 7的任務，Phase 5 到 Phase 7的任務請參考docs\plan\tasks.md中的Phase 5 到 Phase 7的任務列表，總共9個任務。，不准問我要不要繼續，就一直做下去，直到完成這9個任務才可以停下來。
```