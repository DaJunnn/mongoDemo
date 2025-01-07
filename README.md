
# 記帳系統 README

## 主題與目標
我們的主題是記帳系統，目標是想透過簡易的記帳流程來監控、管理自己的花費，也讓使用者更好的掌握自己的財務狀況。

## 技術選擇
- **前端 (React)**：使用 React 建構使用者介面 (UI)。使用 Fetch 呼叫後端 API，來顯示資料和處理使用者輸入。
- **後端 (Node.js + Express)**：提供 API 端點，處理來自前端的請求。包括 CRUD 操作邏輯。與 MongoDB 資料庫進行溝通。
- **資料庫 (MongoDB)**：用來儲存和管理花費資料。提供資料的新增、查詢、更新和刪除操作。
- **頁面設計 (Figma)**：用來設計頁面，增加美感。

## 架構說明
這是一個前端和後端分離的結構。
- 前端使用 React 建立使用者的網頁用來處理使用者的資料輸入和網頁呈現。
- 後端設計提供 API，處理請求和資料操作，將結果傳遞給前端。
- 資料庫使用 MongoDB，記錄花費資料。

## 安裝與執行指引

### 必備工具
- 安裝 **Node.js**
- 安裝 **Docker**
- 安裝 **MongoDB Compass**
- 安裝 **Visual Studio Code** (VSCode)

### 步驟
1. 在終端機執行
   ```bash
   git clone 該專案
   ```
2. 開啟 MongoDB Compass，設定帳號和密碼

### 後端操作
1. 安裝依賴
   ```bash
   npm i
   ```
2. 後端
   ```bash
   npm build
   ```
3. 執行後端
   ```bash
   npm run dev
   ```

### 前端操作
1. 安裝依賴
   ```bash
   npm i
   ```
2. 執行前端
   ```bash
   npm run dev
   ```

### 上傳 GitHub
1. 初始化版本管理
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. 上傳作業
   ```bash
   git push origin main
   ```

## API 說明

### POST /http://localhost:2083/add - 新增一筆花費
#### 請求資料
```json
{
    "sid": 1,
    "name": "咖啡",
    "price": "120",
    "remark": "公司附近餐廳"
}
```
#### 回應資料
```json
{
    "code": 200,
    "message": "新增成功",
    "body": {
        "_id": "677b9d78739eb5f32ec4f8a1",
        "sid": 1,
        "name": "咖啡",
        "price": "120",
        "remark": "公司附近餐廳"
    }
}
```

### PUT /http://localhost:2083/update - 修改一筆花費
#### 請求資料
```json
{
    "_id": "677b9d78739eb5f32ec4f8a1",
    "sid": 1,
    "name": "咖啡",
    "price": "120",
    "remark": "公司附近餐廳"
}
```
#### 回應資料
```json
{
    "code": 200,
    "message": "更新成功",
    "body": {
        "_id": "677b9d78739eb5f32ec4f8a1",
        "sid": 1,
        "name": "咖啡",
        "price": "120",
        "remark": "公司附近餐廳"
    }
}
```

### DELETE /http://localhost:2083/delete - 刪除一筆花費
#### 請求資料
```json
{
    "_id": "677b9d78739eb5f32ec4f8a1"
}
```
#### 回應資料
```json
{
    "code": 200,
    "message": "刪除成功"
    "body": [
        {
            "_id": "677b9d78739eb5f32ec4f8a1",
            "sid": 1,
            "name": "咖啡",
            "price": "120",
            "remark": "公司附近餐廳"
        }
    
    ]
        
    
}
```

### GET /All - 查詢所有花費
```json
{
    "code": 200,
    "message": "查詢成功",
    "body": [
        {
            "_id": "677b9d78739eb5f32ec4f8a1",
            "sid": 1,
            "name": "咖啡",
            "price": "120",
            "remark": "公司附近餐廳"
        }
    ]
}
```
