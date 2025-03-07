// src/config/mapping.js

// 定義 ERP 資料庫欄位與 MIG 4.1 XML 元素的映射規則
const mappingRules = {
  Invoice: {
    Main: {
      InvoiceNumber: "invoice_number", // ERP 欄位: invoice_number -> XML: InvoiceNumber
      IssueDate: "issue_date", // ERP 欄位: issue_date -> XML: IssueDate
      InvoiceType: "invoice_type", // ERP 欄位: invoice_type -> XML: InvoiceType
      BuyerId: "buyer_id", // ERP 欄位: buyer_id -> XML: BuyerId
      SellerId: "seller_id", // ERP 欄位: seller_id -> XML: SellerId
      TotalAmount: "total_amount", // ERP 欄位: total_amount -> XML: TotalAmount
      TaxAmount: "tax_amount", // ERP 欄位: tax_amount -> XML: TaxAmount
    },
    Details: {
      Item: {
        Description: "item_description", // ERP 欄位: item_description -> XML: Description
        Quantity: "item_quantity", // ERP 欄位: item_quantity -> XML: Quantity
        UnitPrice: "item_unit_price", // ERP 欄位: item_unit_price -> XML: UnitPrice
        Amount: "item_amount", // ERP 欄位: item_amount -> XML: Amount
      },
    },
  },
};

// 提供一個函數來獲取映射規則
function getMappingRules() {
  return mappingRules;
}

module.exports = {
  getMappingRules,
};
