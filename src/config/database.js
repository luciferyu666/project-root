// src/config/database.js

const sql = require("mssql");

// 定義資料庫連線配置
const dbConfig = {
  user: "your_username", // 資料庫用戶名
  password: "your_password", // 資料庫密碼
  server: "your_server", // 資料庫伺服器地址
  database: "your_database", // 資料庫名稱
  options: {
    encrypt: true, // 使用加密連線 (SSL/TLS)
    trustServerCertificate: true, // 若使用自簽憑證，設為 true
  },
};

// 建立資料庫連線池
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to MsSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed: ", err);
    process.exit(1);
  });

module.exports = {
  sql, // 匯出 mssql 庫，以便在其他模組中使用
  poolPromise, // 匯出連線池承諾，以便在應用程式中重用連線
};
