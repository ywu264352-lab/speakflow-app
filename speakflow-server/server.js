'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ── 配置（从环境变量读取，运行时覆盖）─────────────────────────────
const CONFIG = {
  PORT: process.env.PORT || 3000,
  // 微信开放平台（网站应用）配置
  // 申请地址：https://open.weixin.qq.com
  WX_APPID: process.env.WX_APPID || '',
  WX_APPSECRET: process.env.WX_APPSECRET || '',
  // 微信公众号后台配置（网页授权）
  WX_MP_APPID: process.env.WX_MP_APPID || '',
  WX_MP_APPSECRET: process.env.WX_MP_APPSECRET || '',
  // 回调地址（需在微信公众平台配置）
  WX_REDIRECT_URI: process.env.WX_REDIRECT_URI || 'http://localhost:3000/api/wx/callback',
  // 前端地址（开发时）
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  // 启用模拟模式（无真实微信凭证时自动开启）
  MOCK_MODE: !process.env.WX_APPID,
};

// ── 中间件 ──────────────────────────────────────────────────────
app.use(cors({ origin: CONFIG.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../speakflow-site')));

// ── 内存存储（生产环境请换数据库）───────────────────────────────
const loginSessions = new Map();  // ticket -> { state, createdAt, scanned, confirmed, wxUser }
const wsClients = new Map();       // ticket -> WebSocket

// ── 微信 OAuth 2.0 ───────────────────────────────────────────────
function getWXAuthUrl(state) {
  const params = new URLSearchParams({
    appid: CONFIG.WX_APPID,
    redirect_uri: encodeURIComponent(CONFIG.WX_REDIRECT_URI),
    response_type: 'code',
    scope: 'snsapi_login',
    state: state,
  });
  return `https://open.weixin.qq.com/connect/qrconnect?${params.toString()}`;
}

function getWXAccessTokenUrl(code) {
  const params = new URLSearchParams({
    appid: CONFIG.WX_APPID,
    secret: CONFIG.WX_APPSECRET,
    code: code,
    grant_type: 'authorization_code',
  });
  return `https://api.weixin.qq.com/sns/oauth2/access_token?${params.toString()}`;
}

function getWXUserInfoUrl(accessToken, openid) {
  const params = new URLSearchParams({
    access_token: accessToken,
    openid: openid,
  });
  return `https://api.weixin.qq.com/sns/userinfo?${params.toString()}`;
}

// ── WebSocket 连接管理 ────────────────────────────────────────────
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://localhost:${CONFIG.PORT}`);
  const ticket = url.searchParams.get('ticket');

  if (ticket && loginSessions.has(ticket)) {
    wsClients.set(ticket, ws);
    console.log(`[WS] Client connected: ${ticket}`);
  }

  ws.on('close', () => {
    if (ticket) {
      wsClients.delete(ticket);
      console.log(`[WS] Client disconnected: ${ticket}`);
    }
  });

  ws.on('error', (err) => {
    console.error(`[WS] Error: ${err.message}`);
    wsClients.delete(ticket);
  });
});

function notifyClient(ticket, data) {
  const ws = wsClients.get(ticket);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
    return true;
  }
  return false;
}

// ── API 路由 ────────────────────────────────────────────────────

// 获取微信登录二维码
app.get('/api/wx/qr', (req, res) => {
  const ticket = 'WX_' + Date.now() + '_' + uuidv4().replace(/-/g, '').slice(0, 12);
  const state = uuidv4();

  const session = {
    ticket,
    state,
    createdAt: Date.now(),
    scanned: false,
    confirmed: false,
    wxUser: null,
    mockUser: null,
  };
  loginSessions.set(ticket, session);

  let qrUrl, loginUrl;

  if (CONFIG.MOCK_MODE) {
    // 模拟模式：用真实 QRCode 生成二维码内容
    loginUrl = `${CONFIG.FRONTEND_URL}/wx-login.html?ticket=${ticket}`;
    qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(loginUrl)}&color=07C160`;
  } else {
    // 真实模式：微信开放平台 QR 码登录
    loginUrl = getWXAuthUrl(state);
    qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(loginUrl)}&color=07C160`;
  }

  console.log(`[API] QR requested: ${ticket} (mock=${CONFIG.MOCK_MODE})`);

  res.json({
    ticket,
    qrUrl,
    mockMode: CONFIG.MOCK_MODE,
    expireSeconds: 300,
    createdAt: session.createdAt,
  });
});

// 模拟扫码（开发调试用）
app.post('/api/wx/mock/scan', (req, res) => {
  const { ticket } = req.body;
  const session = loginSessions.get(ticket);

  if (!session) {
    return res.status(404).json({ success: false, error: 'session not found' });
  }

  // 模拟微信用户信息
  const mockUsers = [
    { openid: 'mock_001', nickname: '学习小能手', headimgurl: '' },
    { openid: 'mock_002', nickname: '英语达人', headimgurl: '' },
    { openid: 'mock_003', nickname: '歪歪', headimgurl: '' },
    { openid: 'mock_004', nickname: '口语练习者', headimgurl: '' },
  ];

  session.scanned = true;
  session.mockUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  session.mockUser.nickname = session.mockUser.nickname + '_' + Math.floor(Math.random() * 999);

  notifyClient(ticket, { event: 'scan', user: session.mockUser });

  console.log(`[API] Mock scan: ${ticket} by ${session.mockUser.nickname}`);
  res.json({ success: true, user: session.mockUser });
});

// 模拟确认登录（开发调试用）
app.post('/api/wx/mock/confirm', (req, res) => {
  const { ticket } = req.body;
  const session = loginSessions.get(ticket);

  if (!session) {
    return res.status(404).json({ success: false, error: 'session not found' });
  }

  if (!session.scanned) {
    return res.status(400).json({ success: false, error: 'not scanned yet' });
  }

  session.confirmed = true;
  notifyClient(ticket, { event: 'confirm', user: session.mockUser });

  console.log(`[API] Mock confirm: ${ticket}`);
  res.json({ success: true });
});

// 微信回调（真实 OAuth）
app.get('/api/wx/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.send('<html><body style="font-family:sans-serif;padding:40px;text-align:center"><h2>授权失败</h2><p>未获取到授权码</p><a href="/">返回首页</a></body></html>');
  }

  try {
    // 1. 用 code 换 access_token
    const tokenUrl = getWXAccessTokenUrl(code);
    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (tokenData.errcode) {
      console.error('[WX] Token error:', tokenData);
      return res.send(`<html><body style="font-family:sans-serif;padding:40px"><h2>授权失败</h2><p>${tokenData.errmsg}</p><a href="/">返回</a></body></html>`);
    }

    // 2. 用 access_token 换取用户信息
    const userInfoRes = await fetch(getWXUserInfoUrl(tokenData.access_token, tokenData.openid));
    const wxUser = await userInfoRes.json();

    // 3. 找到对应的 session 并更新
    for (const [ticket, session] of loginSessions) {
      if (session.state === state) {
        session.confirmed = true;
        session.wxUser = wxUser;
        notifyClient(ticket, { event: 'confirm', user: wxUser });
        break;
      }
    }

    // 4. 重定向到前端成功页
    res.redirect(`${CONFIG.FRONTEND_URL}/wx-login.html?success=1&name=${encodeURIComponent(wxUser.nickname || '微信用户')}`);
  } catch (err) {
    console.error('[WX] Callback error:', err);
    res.send('<html><body style="font-family:sans-serif;padding:40px"><h2>系统错误</h2><a href="/">返回</a></body></html>');
  }
});

// 查询登录状态（前端轮询用）
app.get('/api/wx/status/:ticket', (req, res) => {
  const { ticket } = req.params;
  const session = loginSessions.get(ticket);

  if (!session) {
    return res.status(404).json({ status: 'not_found' });
  }

  if (session.confirmed) {
    const user = session.mockUser || session.wxUser;
    res.json({
      status: 'confirmed',
      user: {
        openid: user.openid,
        nickname: user.nickname,
        avatar: user.headimgurl || '',
        loginType: 'wechat',
      }
    });
  } else if (session.scanned) {
    res.json({ status: 'scanned', user: session.mockUser || session.wxUser });
  } else {
    res.json({ status: 'waiting' });
  }
});

// 清理过期 session（每10分钟）
setInterval(() => {
  const now = Date.now();
  const expireMs = 10 * 60 * 1000; // 10分钟
  for (const [ticket, session] of loginSessions) {
    if (now - session.createdAt > expireMs) {
      loginSessions.delete(ticket);
      wsClients.delete(ticket);
      console.log(`[CLEAN] Expired session removed: ${ticket}`);
    }
  }
}, 10 * 60 * 1000);

// ── 静态文件：微信登录页（扫码确认页）──────────────────────────
app.get('/wx-login.html', (req, res) => {
  const { ticket, success, name } = req.query;

  if (success === '1' && name) {
    // 真实微信 OAuth 登录成功
    const html = `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>微信登录成功</title>
    <style>
      body{margin:0;background:#0d0f14;color:#e8e4dc;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
      .card{background:#13161d;border:1px solid #2a2f3a;border-radius:16px;padding:40px;text-align:center;max-width:360px;width:90%}
      .icon{width:64px;height:64px;background:rgba(7,193,96,.15);border:2px solid #07C160;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;color:#07C160}
      h2{font-size:20px;margin-bottom:8px}.p{color:#8b8578;font-size:13px;margin-bottom:20px}
      .name{font-size:15px;font-weight:600;margin-bottom:20px;color:#07C160}
      .btn{background:#f0a500;color:#0d0f14;border:none;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block}
    </style>
    </head><body>
    <div class="card">
      <div class="icon">OK</div>
      <h2>微信登录成功</h2>
      <p class="p">欢迎回来！</p>
      <div class="name">${name}</div>
      <a href="/" class="btn">进入学习</a>
    </div>
    <script>
      // 保存用户信息到 localStorage
      const user = { name: decodeURIComponent('${encodeURIComponent(name)}'), loginType: 'wechat', level: 1, xp: 0 };
      localStorage.setItem('speakflow_user', JSON.stringify(user));
      setTimeout(() => { window.location.href = '/'; }, 2000);
    </script>
    </body></html>`;
    return res.send(html);
  }

  if (!ticket) {
    return res.redirect('/');
  }

  // 轮询状态的页面
  const html = `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>微信扫码登录 - SpeakFlow</title>
    <style>
      body{margin:0;background:#0d0f14;color:#e8e4dc;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
      .card{background:#13161d;border:1px solid #2a2f3a;border-radius:16px;padding:40px;text-align:center;max-width:360px;width:90%}
      .logo{font-size:28px;font-weight:700;margin-bottom:20px;font-family:serif}
      .logo span{color:#f0a500}
      .avatar{width:64px;height:64px;border-radius:50%;background:rgba(7,193,96,.12);border:2px solid rgba(7,193,96,.3);display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 10px;color:#07C160}
      h2{font-size:16px;margin-bottom:4px}
      .tip{color:#8b8578;font-size:12px;margin-bottom:16px}
      .dots{color:#07C160;font-size:20px;letter-spacing:4px;animation:blink 1.2s infinite}
      .ok-icon{width:64px;height:64px;background:rgba(7,193,96,.15);border:2px solid #07C160;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 16px;color:#07C160}
      .btn{background:#f0a500;color:#0d0f14;border:none;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer}
      @keyframes blink{0%,100%{opacity:.3}50%{opacity:1}}
    </style>
    </head><body>
    <div class="card" id="card">
      <div class="logo">Speak<span>Flow</span></div>
      <div id="waiting">
        <div class="avatar">?</div>
        <h2 id="nickname">等待扫码...</h2>
        <p class="tip">请在微信中确认登录</p>
        <div class="dots">...</div>
      </div>
      <div id="confirm" style="display:none">
        <div class="avatar" id="confirmAvatar">?</div>
        <h2 id="confirmName">微信用户</h2>
        <p class="tip">请在手机上确认登录</p>
        <div class="dots">...</div>
      </div>
      <div id="success" style="display:none">
        <div class="ok-icon">OK</div>
        <h2>登录成功！</h2>
        <p class="tip">即将进入学习...</p>
      </div>
    </div>
    <script>
      const ticket = '${ticket}';
      let confirmed = false;

      function poll() {
        fetch('/api/wx/status/' + ticket)
          .then(r => r.json())
          .then(data => {
            if (data.status === 'scanned' && !confirmed) {
              document.getElementById('waiting').style.display = 'none';
              document.getElementById('confirm').style.display = 'block';
              document.getElementById('confirmAvatar').textContent = (data.user.nickname || 'W')[0];
              document.getElementById('confirmName').textContent = data.user.nickname || '微信用户';
            } else if (data.status === 'confirmed') {
              confirmed = true;
              document.getElementById('waiting').style.display = 'none';
              document.getElementById('confirm').style.display = 'none';
              document.getElementById('success').style.display = 'block';
              // 保存用户
              const user = { name: data.user.nickname, loginType: 'wechat', level: 1, xp: 0 };
              localStorage.setItem('speakflow_user', JSON.stringify(user));
              setTimeout(() => { window.location.href = '/'; }, 2000);
            }
          })
          .catch(() => {});
      }

      // WebSocket 实时推送（优先）
      const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(protocol + '//' + location.host + '?ticket=' + ticket);
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.event === 'scan') {
          document.getElementById('waiting').style.display = 'none';
          document.getElementById('confirm').style.display = 'block';
          document.getElementById('confirmAvatar').textContent = (data.user.nickname || 'W')[0];
          document.getElementById('confirmName').textContent = data.user.nickname || '微信用户';
        } else if (data.event === 'confirm') {
          confirmed = true;
          document.getElementById('waiting').style.display = 'none';
          document.getElementById('confirm').style.display = 'none';
          document.getElementById('success').style.display = 'block';
          const user = { name: data.user.nickname, loginType: 'wechat', level: 1, xp: 0 };
          localStorage.setItem('speakflow_user', JSON.stringify(user));
          setTimeout(() => { window.location.href = '/'; }, 2000);
        }
      };

      ws.onerror = () => { poll(); }; // WebSocket 失败时降级轮询
      setInterval(poll, 1500);
      poll();
    </script>
    </body></html>`;

  res.send(html);
});

// ── 启动服务器 ───────────────────────────────────────────────────
server.listen(CONFIG.PORT, () => {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  SpeakFlow 服务器启动成功                    ║');
  console.log(`║  地址: http://localhost:${CONFIG.PORT}                ║`);
  console.log(`║  微信模式: ${CONFIG.MOCK_MODE ? '模拟模式（无需配置）' : '真实微信OAuth'}      ║`);
  if (CONFIG.MOCK_MODE) {
    console.log('║  如需真实微信登录，请设置环境变量:           ║');
    console.log('║  WX_APPID=你的AppID WX_APPSECRET=你的Secret  ║');
  }
  console.log('╚══════════════════════════════════════════════╝');
});
