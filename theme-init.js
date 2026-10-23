'use strict';
// 操作手冊頁：套用主頁所選主題（獨立檔案，以符合 CSP 不允許行內腳本）
try {
  document.documentElement.dataset.theme = localStorage.getItem('namestroke-theme') || 'tech';
} catch (e) {}
