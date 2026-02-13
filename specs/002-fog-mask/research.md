# research.md

## 需釐清事項與研究任務

1. 狀態管理是否採用 Zustand？還是僅用 React Context？
2. 單元測試標準與覆蓋率要求？Jest 是否唯一選擇？
3. 本地儲存採用 AsyncStorage 還是 SecureStore？是否需支援雲端同步？
4. iOS 是否需完整支援？還是僅 Android？
5. 地圖互動效能目標（fps、遮罩更新延遲、地圖載入時間）具體數值？
6. 用戶數/資料量上限？

## 依據技術選型與整合研究

- Google Maps API 在 React Native（Expo）最佳整合方案
- 迷霧遮罩演算法（即時遮罩、區塊擦除、效能優化）
- 狀態管理（Zustand vs Context API）在地圖互動場景的效能比較
- 本地儲存與同步策略（資料結構、同步頻率、資料一致性）
- 單元測試與 E2E 測試工具選型（Jest、Testing Library、Detox）
- Android 深色模式與字體規範最佳實踐

---

## 研究紀錄格式

## 研究決策紀錄

### 1. 狀態管理方案
決策：採用 Zustand 作為主要狀態管理，簡單場景可用 React Context。
理由：Zustand 輕量、效能佳，適合地圖互動與遮罩狀態，Context 適合全域簡單狀態。
替代方案：僅用 Context（維護複雜度高）、Redux（過重）。

### 2. 單元測試與覆蓋率
決策：Jest 為單元測試主力，覆蓋率目標 80% 以上。
理由：Jest 為 React Native 標配，社群資源豐富，易於 CI 整合。
替代方案：Testing Library（輔助 UI 測試）、Detox（E2E，非必須）。

### 3. 本地儲存與同步
決策：採用 AsyncStorage，暫不強制雲端同步。
理由：AsyncStorage 易於整合 React Native，資料量小時效能足夠，雲端同步可後續擴充。
替代方案：SecureStore（需敏感資料時）、雲端同步（如 Firebase，後續評估）。
# 補充：混合儲存（本地 + 雲端同步）最佳實踐

決策：採用混合儲存架構，探索軌跡先寫入本地資料庫（SQLite/AsyncStorage），每 5-10 秒批次同步至雲端（Firebase/Supabase）。
理由：
1. 本地儲存即時記錄探索軌跡，查詢延遲 <50ms，符合效能目標。
2. 雲端同步備份軌跡，支援跨裝置資料恢復、進度保存。
3. 離線支援，網路恢復後再同步雲端。
4. 雲端資料防止遺失，支援多裝置切換。
5. React Native/Expo 生態系對 SQLite、AsyncStorage、Firebase 等有完整支援。
替代方案：
1. 純本地儲存：效能佳、離線支援，但資料易遺失、無法跨裝置同步。
2. 純雲端儲存：資料安全、可跨裝置，但需持續網路連線，離線時無法記錄軌跡。
3. 混合儲存（推薦）：兼顧效能、離線支援、資料安全、跨裝置同步，需設計同步機制，複雜度略高。

最佳實踐：
- 採用混合儲存架構，先本地記錄，定期同步雲端。
- 本地資料庫選擇 SQLite（expo-sqlite）或 AsyncStorage（@react-native-async-storage/async-storage）。
- 雲端同步推薦 Firebase Firestore、Supabase 或 AWS Amplify。
- 同步機制需考慮網路狀態、資料衝突與重試策略。
- 資料加密與權限控管，保障用戶隱私與安全。

結論：建議採用「混合儲存」方案，先本地記錄探索軌跡，定期同步至雲端，兼顧效能、離線支援、資料安全與跨裝置進度，完全解決 Technical Context 中 Storage 的 NEEDS CLARIFICATION。
### 4. iOS 支援範圍
決策：以 Android 為主，iOS 保持基本相容（不影響主流程即可）。
理由：專案主力為 Android，iOS 僅需確保不閃退、主功能可用。
替代方案：完整 iOS 最佳化（需額外人力）。

### 5. 地圖互動效能目標
決策：地圖互動 60fps，迷霧遮罩即時更新 <100ms，地圖載入 <2s。
理由：60fps 為流暢互動標準，100ms 內遮罩更新不影響體驗，2s 內地圖載入屬可接受。
替代方案：更高效能（需原生優化）、較低標準（體驗下降）。

### 6. 用戶數/資料量上限
決策：單一用戶地圖資料量預設 10MB 內，支援 1,000+ 活躍用戶。
理由：10MB 足以儲存遮罩與軌跡，1,000+ 用戶屬 MVP 合理規模。
替代方案：更大規模（需後端同步與分流設計）。
