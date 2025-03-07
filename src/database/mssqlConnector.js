// src/database/mssqlConnector.js

const { sql, poolPromise } = require("../config/database");

// 執行 SQL 查詢的通用函數
async function executeQuery(query, params = {}) {
  try {
    const pool = await poolPromise; // 等待連線池準備好
    const request = pool.request();

    // 綁定參數（如果有）
    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }

    const result = await request.query(query);
    return result.recordset; // 返回查詢結果
  } catch (err) {
    console.error("SQL error", err);
    throw err; // 將錯誤向上拋出
  }
}

// 查詢發票主檔
async function getInvoiceHeader(invoiceId) {
  const query = "SELECT * FROM InvoiceHeader WHERE invoice_id = @invoiceId";
  const params = { invoiceId: invoiceId };
  return await executeQuery(query, params);
}

// 查詢發票明細
async function getInvoiceDetails(invoiceId) {
  const query = "SELECT * FROM InvoiceDetail WHERE invoice_id = @invoiceId";
  const params = { invoiceId: invoiceId };
  return await executeQuery(query, params);
}

module.exports = {
  executeQuery,
  getInvoiceHeader,
  getInvoiceDetails,
};
