🎯 電子發票 XML 轉檔程式

✅ 專案概述
本專案開發一套電子發票轉檔程式，主要目的在將客戶的鼎新 Workflow ERP II 系統資料轉換為符合台灣財政部 MIG 4.1 標準的 XML 格式，取代現有的 MIG 3.1.2 版轉檔軟體。系統提升電子發票的合規性與管理效能，並確保符合法規要求。

✅ 功能特點
📍 從 MsSQL 資料庫擷取發票資料。
📍 依據 MIG 4.1 規範生成 XML 電子發票檔案。
📍 提供系統設定介面，支援 XML 映射規則管理和資料庫連線設定。
📍 錯誤處理機制，記錄無法轉換的資料並通知用戶。
📍 支援手動與批次處理模式。

✅ 技術架構
📍 前端：React（繁體中文介面）
📍 後端：Node.js
📍 資料庫：MsSQL（唯讀權限，加密連線）
📍 轉檔模組：依據 MIG 4.1 規格進行 XML 轉換

✅ 目錄結構

```
project-root/
├── src/                           # 原始碼目錄
│   ├── config/                    # 設定檔目錄
│   ├── database/                  # 資料庫相關模組
│   ├── transformer/               # 資料轉換模組
│   ├── utils/                     # 工具函數目錄
│   ├── views/                     # 前端視圖目錄
│   └── app.js                     # 主應用程式入口
├── tests/                         # 測試目錄
│   ├── unit/                      # 單元測試
│   └── integration/               # 整合測試
├── docs/                          # 文件目錄
│   ├── installation.md            # 安裝指南
│   └── userManual.md              # 操作手冊
├── logs/                          # 日誌目錄
├── output/                        # 輸出目錄
│   └── invoices/                  # XML 檔案目錄
├── package.json                   # 專案依賴與腳本
└── README.md                      # 專案說明文件
```

✅ 安裝步驟

1. 安裝 Node.js  
   下載並安裝 [Node.js](https://nodejs.org/)（建議使用 LTS 版本）。

2. 克隆專案

   git clone <https://github.com/luciferyu666/project-root>
   cd project-root

   ```

   ```

3. 安裝依賴

   npm install

   ```

   ```

4. 配置資料庫連線  
   編輯 `src/config/database.js`，填入正確的資料庫連線資訊，例如：

   ```javascript
   module.exports = {
     host: "your_host",
     user: "your_user",
     password: "your_password",
     database: "your_database",
     encrypt: true,
   };
   ```

5. 運行應用程式

   npm start

   ```

   ```

✅ 使用指南

1. 系統設定  
   📍 打開設置介面（位於 `src/views/settings.js`），配置資料庫連線和 XML 映射規則。  
   📍 保存設定後，系統將套用新配置進行資料轉換。

2. 處理發票  
   📍 調用以下函數處理單一發票（假設已實現在 `transformer` 模組中）：

   ```javascript
   const { processInvoice } = require("./src/transformer");
   processInvoice("invoice_id"); // 傳入發票 ID
   ```

   📍 系統將從資料庫獲取資料，轉換為 XML，並儲存至 `output/invoices/` 目錄。

3. 查看日誌  
   📍 錯誤日誌儲存於 `logs/error.log`，可直接查看檔案或透過介面檢視錯誤訊息。

✅ 測試
📍 單元測試

npm test

```
運行位於 `tests/unit/` 的單元測試，驗證個別模組功能。

📍 整合測試

npm test
```

運行位於 `tests/integration/` 的整合測試，驗證完整轉檔流程。

✅ 聯絡資訊
📍 維護者：Vincent Liu  
📍 郵件：vinceyue667@gmail.com

✅ 許可證
本專案採用 MIT 許可證，詳見 [LICENSE](LICENSE) 檔案。
