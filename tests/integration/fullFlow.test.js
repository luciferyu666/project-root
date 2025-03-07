// tests/integration/fullFlow.test.js

const { sql, poolPromise } = require("../../src/config/database");
const { transformToXML } = require("../../src/transformer/xmlTransformer");
const fs = require("fs");
const path = require("path");

// 測試用發票 ID
const testInvoiceId = "INV001";

// 測試前準備：創建模擬資料庫資料
beforeAll(async () => {
  const pool = await poolPromise;
  await pool.request().query(`
    INSERT INTO InvoiceHeader (invoice_id, invoice_number, issue_date, invoice_type, buyer_id, seller_id, total_amount, tax_amount)
    VALUES ('${testInvoiceId}', 'AB12345678', '2025-03-07', '01', '12345678', '87654321', 1050, 50)
  `);
  await pool.request().query(`
    INSERT INTO InvoiceDetail (invoice_id, item_description, item_quantity, item_unit_price, item_amount)
    VALUES ('${testInvoiceId}', '商品A', 2, 500, 1000)
  `);
});

// 測試後清理：刪除模擬資料
afterAll(async () => {
  const pool = await poolPromise;
  await pool
    .request()
    .query(`DELETE FROM InvoiceDetail WHERE invoice_id = '${testInvoiceId}'`);
  await pool
    .request()
    .query(`DELETE FROM InvoiceHeader WHERE invoice_id = '${testInvoiceId}'`);
});

// 整合測試：完整流程
test("should process invoice from database to XML file", async () => {
  // Step 1: 從資料庫獲取發票資料
  const pool = await poolPromise;
  const headerResult = await pool
    .request()
    .input("invoiceId", sql.VarChar, testInvoiceId)
    .query("SELECT * FROM InvoiceHeader WHERE invoice_id = @invoiceId");
  const detailsResult = await pool
    .request()
    .input("invoiceId", sql.VarChar, testInvoiceId)
    .query("SELECT * FROM InvoiceDetail WHERE invoice_id = @invoiceId");

  const invoiceData = {
    ...headerResult.recordset[0],
    items: detailsResult.recordset,
  };

  // Step 2: 將資料轉換為 XML
  const xml = transformToXML(invoiceData);

  // Step 3: 儲存 XML 檔案
  const outputDir = path.join(__dirname, "../../output/invoices");
  const fileName = `invoice_${testInvoiceId}.xml`;
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, xml, "utf8");

  // Step 4: 驗證檔案是否存在並包含正確內容
  expect(fs.existsSync(filePath)).toBe(true);
  const fileContent = fs.readFileSync(filePath, "utf8");
  expect(fileContent).toContain("<InvoiceNumber>AB12345678</InvoiceNumber>");
  expect(fileContent).toContain("<IssueDate>2025-03-07</IssueDate>");
  expect(fileContent).toContain("<Description>商品A</Description>");
});
