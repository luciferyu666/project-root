// tests/unit/transformer.test.js

const { transformToXML } = require("../../src/transformer/xmlTransformer");

// 定義測試用發票資料
const sampleInvoiceData = {
  invoice_number: "AB12345678",
  issue_date: "2025-03-07",
  invoice_type: "01",
  buyer_id: "12345678",
  seller_id: "87654321",
  total_amount: 1050,
  tax_amount: 50,
  items: [
    {
      item_description: "商品A",
      item_quantity: 2,
      item_unit_price: 500,
      item_amount: 1000,
    },
  ],
};

// 測試案例 1：正常轉換
test("should transform invoice data to XML correctly", () => {
  const xml = transformToXML(sampleInvoiceData);
  expect(xml).toContain("<InvoiceNumber>AB12345678</InvoiceNumber>");
  expect(xml).toContain("<IssueDate>2025-03-07</IssueDate>");
  expect(xml).toContain("<InvoiceType>01</InvoiceType>");
  expect(xml).toContain("<BuyerId>12345678</BuyerId>");
  expect(xml).toContain("<SellerId>87654321</SellerId>");
  expect(xml).toContain("<TotalAmount>1050</TotalAmount>");
  expect(xml).toContain("<TaxAmount>50</TaxAmount>");
  expect(xml).toContain("<Description>商品A</Description>");
  expect(xml).toContain("<Quantity>2</Quantity>");
  expect(xml).toContain("<UnitPrice>500</UnitPrice>");
  expect(xml).toContain("<Amount>1000</Amount>");
});

// 測試案例 2：缺少必填欄位
test("should throw error when required field is missing", () => {
  const invalidData = { ...sampleInvoiceData };
  delete invalidData.invoice_number; // 移除 invoice_number
  expect(() => transformToXML(invalidData)).toThrow(
    "Missing required field: invoice_number"
  );
});

// 測試案例 3：明細項目缺少欄位
test("should throw error when item field is missing", () => {
  const invalidItemData = {
    ...sampleInvoiceData,
    items: [{ item_description: "商品A", item_quantity: 2 }], // 缺少 item_unit_price 和 item_amount
  };
  expect(() => transformToXML(invalidItemData)).toThrow(
    "Missing required field in item: item_unit_price"
  );
});
