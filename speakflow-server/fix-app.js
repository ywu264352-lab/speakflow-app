'use strict';
const fs = require('fs');
const path = 'C:\\Users\\admin\\.qclaw\\workspace\\speakflow-site\\js\\app.js';
const tail = 'C:\\Users\\admin\\.qclaw\\workspace\\speakflow-server\\app-tail-fixed.js';

const content = fs.readFileSync(path, 'utf8');
const fixedTail = fs.readFileSync(tail, 'utf8');

// 找到 wechatLogin 方法开始位置
// 我们在 Auth 对象内部，找 _onWechatScan 的位置来截断
const marker = '\n_onWechatScan(';
const idx = content.indexOf(marker);

if (idx === -1) {
  console.log('ERROR: marker not found');
  process.exit(1);
}

const newContent = content.substring(0, idx) + '\n' + fixedTail;
fs.writeFileSync(path, newContent, 'utf8');
console.log('done, new size:', newContent.length);
