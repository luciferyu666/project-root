// src/utils/logger.js

const fs = require("fs");
const path = require("path");

// 定義日誌檔案的路徑
const logFilePath = path.join(__dirname, "../../logs/error.log");

// 確保日誌目錄存在
const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 記錄錯誤日誌
function logError(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ERROR: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
}

// 記錄資訊日誌
function logInfo(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] INFO: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
}

// 記錄警告日誌
function logWarning(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] WARNING: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
}

// 匯出日誌函數
module.exports = {
  logError,
  logInfo,
  logWarning,
};
