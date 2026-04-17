'use strict';
const fs = require('fs');
const path = 'C:\\Users\\admin\\.qclaw\\workspace\\speakflow-site\\js\\app.js';
let c = fs.readFileSync(path, 'utf8');

// 找 cancelWechat 结尾 + hideWechat 开头之间的位置
const search = "  },\n\n  hideWechat() {";
const insert = "  },\n\n  // 演示：模拟扫码（调用后端API，后端通过WebSocket推送scan事件）\n  async mockScan() {\n    if (!this._wxTicket) { Toast.show('请先生成二维码', '!'); return; }\n    const btn = document.getElementById('mockScanBtn');\n    if (btn) { btn.disabled = true; btn.textContent = '已扫码...'; }\n    try {\n      await fetch('http://localhost:3000/api/wx/mock/scan', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ ticket: this._wxTicket })\n      });\n    } catch (e) {\n      Toast.show('后端未运行，请先启动服务器', 'E');\n      if (btn) { btn.disabled = false; btn.textContent = '我已扫码（演示）'; }\n    }\n  },\n\n  hideWechat() {";

const idx = c.indexOf(search);
if (idx === -1) {
  console.log('Not found. Searching for hideWechat...');
  const i = c.indexOf('hideWechat()');
  console.log('hideWechat at:', i, JSON.stringify(c.substring(i-20, i+30)));
  process.exit(1);
}

c = c.substring(0, idx) + insert + c.substring(idx + search.length);
fs.writeFileSync(path, c, 'utf8');
console.log('Done, new size:', c.length);
