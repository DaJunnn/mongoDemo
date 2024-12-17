# mongoDemo
前端（React + TypeScript）
畫面呈現

學生資料卡片視覺化（StudentHub）。
包含帳號、座號、系所、年級、班級和缺席次數等資訊。
主要功能

新增學生：表單輸入學生基本資料，並透過 POST 請求送至後端。
修改學生資料：提供表單，修改並儲存現有學生的資訊。
刪除學生：選取特定學生，發送 DELETE 請求刪除資料。
檔案整理

組件：CreateData.tsx、UpdateData.tsx。
功能邏輯：使用 handleChange 處理輸入，並使用 API 發送請求。
後端（TypeScript + Node.js + MongoDB）
核心功能

UserService 處理資料庫邏輯，如：
deleteById：刪除指定 id 的學生紀錄。
userNameValidator：驗證學生的帳號格式，必須符合 tku + 科系代碼 + 四位數字。
錯誤處理和回應格式統一。
路由設計

API 路徑：如 /api/students。
常見的 HTTP 動作：GET（查詢）、POST（新增）、PUT（修改）、DELETE（刪除）。
檔案整理

路由：UserRoute.ts。
服務邏輯：UserService.ts。
資料模型：studentSchemas.ts。