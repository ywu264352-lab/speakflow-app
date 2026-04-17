'use strict';
const http = require('http');

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({ host:'localhost', port:3000, path, method:'POST', headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)} }, res => {
      let d=''; res.on('data',c=>d+=c); res.on('end',()=>resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.write(data); req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    http.get({ host:'localhost', port:3000, path }, res => {
      let d=''; res.on('data',c=>d+=c); res.on('end',()=>{ try{resolve(JSON.parse(d))}catch{resolve(d)} });
    }).on('error', reject);
  });
}

(async () => {
  console.log('1. 获取二维码...');
  const qr = await get('/api/wx/qr');
  console.log('  ticket:', qr.ticket);
  console.log('  qrUrl:', qr.qrUrl.substring(0, 60) + '...');
  console.log('  mockMode:', qr.mockMode);

  console.log('\n2. 模拟扫码...');
  const scan = await post('/api/wx/mock/scan', { ticket: qr.ticket });
  console.log('  扫码用户:', scan.user.nickname);

  console.log('\n3. 模拟确认...');
  const confirm = await post('/api/wx/mock/confirm', { ticket: qr.ticket });
  console.log('  确认结果:', confirm.success);

  console.log('\n4. 查询状态...');
  const status = await get('/api/wx/status/' + qr.ticket);
  console.log('  状态:', status.status);
  console.log('  用户:', status.user ? status.user.nickname : 'none');

  console.log('\nAll tests passed!');
})().catch(e => console.error('Error:', e.message));
