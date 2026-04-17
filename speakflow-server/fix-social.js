'use strict';
const fs = require('fs');
const path = 'C:\\Users\\admin\\.qclaw\\workspace\\speakflow-site\\js\\app.js';
let c = fs.readFileSync(path, 'utf8');

// Fix: socialLogin calls wechatLoginReal instead of wechatLogin
c = c.replace(
  "if (provider === 'wechat') { this.wechatLogin(); return; }",
  "if (provider === 'wechat') { this.wechatLoginReal(); return; }"
);

// Fix: the old wechatLogin() method (模拟版) should be removed
// Find and remove the old wechatLogin block
const oldWechatStart = c.indexOf('\n  // ── 微信登录 ──\n  wechatLogin() {');
if (oldWechatStart !== -1) {
  // Find the end of wechatLogin (next method _onWechatScan)
  const oldWechatEnd = c.indexOf('\n  _onWechatScan(');
  if (oldWechatEnd !== -1) {
    c = c.substring(0, oldWechatStart) + c.substring(oldWechatEnd);
    console.log('Removed old wechatLogin mock method');
  }
}

fs.writeFileSync(path, c, 'utf8');
console.log('Fixed! new size:', c.length);
