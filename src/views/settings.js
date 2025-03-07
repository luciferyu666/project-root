// src/views/settings.js

import React, { useState } from "react";
import axios from "axios"; // 用於發送 HTTP 請求到後端

const Settings = () => {
  // 資料庫連線設定狀態
  const [dbConfig, setDbConfig] = useState({
    host: "",
    user: "",
    password: "",
    database: "",
  });

  // XML 映射規則狀態
  const [mappingRules, setMappingRules] = useState([
    { xmlKey: "InvoiceNumber", dbKey: "invoice_number" },
    { xmlKey: "IssueDate", dbKey: "issue_date" },
  ]);

  // 處理資料庫連線設定的輸入變更
  const handleDbConfigChange = (e) => {
    const { name, value } = e.target;
    setDbConfig({ ...dbConfig, [name]: value });
  };

  // 處理 XML 映射規則的輸入變更
  const handleMappingChange = (index, field, value) => {
    const updatedRules = [...mappingRules];
    updatedRules[index][field] = value;
    setMappingRules(updatedRules);
  };

  // 保存設定的函數
  const saveSettings = async () => {
    try {
      // 假設後端提供 /api/settings API 來保存設定
      await axios.post("/api/settings", { dbConfig, mappingRules });
      alert("設定已保存");
    } catch (error) {
      console.error("保存設定失敗", error);
      alert("保存設定失敗");
    }
  };

  return (
    <div>
      <h2>系統設定</h2>

      {/* 資料庫連線設定區域 */}
      <section>
        <h3>資料庫連線</h3>
        <form>
          <label>
            主機:
            <input
              type="text"
              name="host"
              value={dbConfig.host}
              onChange={handleDbConfigChange}
            />
          </label>
          <label>
            用戶名:
            <input
              type="text"
              name="user"
              value={dbConfig.user}
              onChange={handleDbConfigChange}
            />
          </label>
          <label>
            密碼:
            <input
              type="password"
              name="password"
              value={dbConfig.password}
              onChange={handleDbConfigChange}
            />
          </label>
          <label>
            資料庫:
            <input
              type="text"
              name="database"
              value={dbConfig.database}
              onChange={handleDbConfigChange}
            />
          </label>
        </form>
      </section>

      {/* XML 映射規則管理區域 */}
      <section>
        <h3>XML 映射規則</h3>
        <table>
          <thead>
            <tr>
              <th>XML 元素</th>
              <th>資料庫欄位</th>
            </tr>
          </thead>
          <tbody>
            {mappingRules.map((rule, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={rule.xmlKey}
                    onChange={(e) =>
                      handleMappingChange(index, "xmlKey", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={rule.dbKey}
                    onChange={(e) =>
                      handleMappingChange(index, "dbKey", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 保存按鈕 */}
      <button onClick={saveSettings}>保存設定</button>
    </div>
  );
};

export default Settings;
