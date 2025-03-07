// src/transformer/xmlTransformer.js

const xmlbuilder = require("xmlbuilder");
const { getMappingRules } = require("../config/mapping");

// 取得映射規則
const mappingRules = getMappingRules();

// 將發票資料轉換為 MIG 4.1 XML 格式
function transformToXML(invoiceData) {
  try {
    // 創建 XML 根元素，指定編碼為 UTF-8
    const xml = xmlbuilder.create("Invoice", { encoding: "UTF-8" });

    // 轉換 Main 部分
    const main = xml.ele("Main");
    const mainMapping = mappingRules.Invoice.Main;
    for (const [xmlKey, dbKey] of Object.entries(mainMapping)) {
      const value = invoiceData[dbKey];
      if (value !== undefined) {
        main.ele(xmlKey, value); // 添加子元素及其值
      } else {
        throw new Error(`Missing required field: ${dbKey}`);
      }
    }

    // 轉換 Details 部分
    const details = xml.ele("Details");
    const itemMapping = mappingRules.Invoice.Details.Item;
    invoiceData.items.forEach((itemData) => {
      const item = details.ele("Item");
      for (const [xmlKey, dbKey] of Object.entries(itemMapping)) {
        const value = itemData[dbKey];
        if (value !== undefined) {
          item.ele(xmlKey, value); // 添加明細項目的子元素及其值
        } else {
          throw new Error(`Missing required field in item: ${dbKey}`);
        }
      }
    });

    // 返回美化後的 XML 字串
    return xml.end({ pretty: true });
  } catch (err) {
    console.error("XML transformation error", err);
    throw err; // 將錯誤向上拋出以供上層處理
  }
}

module.exports = {
  transformToXML,
};
