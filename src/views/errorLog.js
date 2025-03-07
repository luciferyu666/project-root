// src/views/errorLog.js

import React, { useState, useEffect } from "react";
import axios from "axios"; // 用於發送 HTTP 請求到後端

const ErrorLog = () => {
  // 狀態定義
  const [logs, setLogs] = useState([]); // 儲存錯誤日誌數據
  const [loading, setLoading] = useState(true); // 控制加載狀態
  const [error, setError] = useState(null); // 儲存錯誤訊息

  // 從後端獲取錯誤日誌的函數
  const fetchErrorLogs = async () => {
    try {
      const response = await axios.get("/api/error-logs"); // 假設後端 API 路徑為 /api/error-logs
      setLogs(response.data); // 將獲取的日誌數據存入狀態
      setLoading(false); // 加載完成
    } catch (err) {
      setError("無法獲取錯誤日誌"); // 設置錯誤訊息
      setLoading(false); // 加載完成
      console.error("獲取錯誤日誌失敗", err); // 記錄錯誤到控制台
    }
  };

  // 組件掛載時自動獲取日誌
  useEffect(() => {
    fetchErrorLogs();
  }, []);

  // 加載中狀態
  if (loading) {
    return <div>正在加載日誌...</div>;
  }

  // 錯誤狀態
  if (error) {
    return <div>{error}</div>;
  }

  // 正常渲染日誌數據
  return (
    <div>
      <h2>錯誤日誌</h2>
      {logs.length === 0 ? (
        <p>暫無錯誤日誌</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>時間</th>
              <th>錯誤訊息</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.timestamp}</td>
                <td>{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ErrorLog;
