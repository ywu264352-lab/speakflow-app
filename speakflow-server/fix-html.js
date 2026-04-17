'use strict';
const fs = require('fs');
const path = 'C:\\Users\\admin\\.qclaw\\workspace\\speakflow-site\\index.html';
let c = fs.readFileSync(path, 'utf8');

// 找到被破坏的 wechat-qrbox 区域并修复
const brokenStart = c.indexOf('<!-- 二维码区域 -->\n    <div class="wechat-qrbox" id="wechatQRBox">');
if (brokenStart !== -1) {
  // 找到这个区域的结束（下一个 <!--）
  const nextSection = c.indexOf('<!-- 扫码成功确认区域 -->', brokenStart);
  if (nextSection !== -1) {
    const fixed = `<!-- 二维码区域 -->
    <div class="wechat-qrbox" id="wechatQRBox">
      <div id="wechatQR">
        <div style="width:200px;height:200px;display:flex;align-items:center;justify-content:center;color:#999;font-size:13px">加载中...</div>
      </div>
    </div>
    <!-- 演示调试按钮 -->
    <div style="text-align:center;margin-top:10px;margin-bottom:6px">
      <button class="btn btn-ghost btn-sm" id="mockScanBtn" onclick="mockScan()" style="border-color:rgba(7,193,96,.3);color:#07C160;font-size:11px;padding:5px 12px">&#128247; 我已扫码（演示）</button>
    </div>

`;
    c = c.substring(0, brokenStart) + fixed + c.substring(nextSection);
    console.log('Fixed wechat-qrbox area');
  } else {
    console.log('Could not find next section');
  }
} else {
  console.log('Broken area not found, checking current state...');
  const hasQrDiv = c.indexOf('id="wechatQR"');
  console.log('Has wechatQR div:', hasQrDiv !== -1);
}

// 保存
fs.writeFileSync(path, c, 'utf8');
console.log('Done, size:', c.length);
