// src/app.js

const { sql, poolPromise } = require("./config/database");
const { transformToXML } = require("./transformer/xmlTransformer");
const { logError, logInfo } = require("./utils/logger");
const fs = require("fs");
const path = require("path");

// 確保輸出目錄存在
const outputDir = path.join(__dirname, "../output/invoices");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 定義發票處理函數
async function processInvoice(invoiceId) {
  try {
    // Step 1: 從資料庫獲取發票資料
    const pool = await poolPromise;
    const request = pool.request();
    request.input("invoiceId", sql.VarChar, invoiceId);

    const headerQuery =
      "SELECT * FROM InvoiceHeader WHERE invoice_id = @invoiceId";
    const detailsQuery =
      "SELECT * FROM InvoiceDetail WHERE invoice_id = @invoiceId";

    const headerResult = await request.query(headerQuery);
    const detailsResult = await request.query(detailsQuery);

    if (headerResult.recordset.length === 0) {
      throw new Error(`Invoice with ID ${invoiceId} not found`);
    }

    const invoiceData = {
      ...headerResult.recordset[0],
      items: detailsResult.recordset,
    };

    // Step 2: 將資料轉換為 XML
    const xml = transformToXML(invoiceData);

    // Step 3: 儲存 XML 檔案
    const fileName = `invoice_${invoiceId}.xml`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, xml, "utf8");

    logInfo(`Successfully generated XML for invoice ${invoiceId}`);
  } catch (err) {
    logError(`Error processing invoice ${invoiceId}: ${err.message}`);
  }
}

// 處理一個發票
processInvoice("INV001");

// 保持應用程式運行（可選）
console.log("Application is running...");
