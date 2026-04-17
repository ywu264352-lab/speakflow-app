'use strict';

// ═══════════════════════════════════════
// SpeakFlow App - Auth & Wechat Login Module (Fixed)
// ═══════════════════════════════════════

  _onWechatScan(user) {
    const confirm = document.getElementById('wechatConfirm');
    document.getElementById('wechatQRBox').style.display = 'none';
    document.getElementById('wechatStatus').textContent = '已扫码，请在微信中确认登录';
    confirm.style.display = 'block';
    const name = user && user.nickname ? user.nickname : '微信用户';
    document.getElementById('wxConfirmName').textContent = name;
    document.getElementById('wxConfirmAvatar').textContent = name[0];
    // 自动确认（3秒后，用于模拟/演示模式）
    this._confirmTimer = setTimeout(() => this.confirmWechat(), 3000);
  },

  confirmWechat() {
    if (this._confirmTimer) { clearTimeout(this._confirmTimer); this._confirmTimer = null; }
    const name = document.getElementById('wxConfirmName').textContent;
    App.currentUser = {
      name: name,
      email: 'wx_' + Date.now() + '@speakflow.app',
      level: Math.floor(Math.random() * 5) + 1,
      xp: Math.floor(Math.random() * 500),
      loginType: 'wechat',
      avatar: name[0]
    };
    localStorage.setItem('speakflow_user', JSON.stringify(App.currentUser));
    App.updateUserUI();
    document.getElementById('wechatConfirm').style.display = 'none';
    document.getElementById('wechatStatus').textContent = '';
    const success = document.getElementById('wechatSuccess');
    success.style.display = 'block';
    document.getElementById('wxSuccessName').textContent = name + '，欢迎回来！';
    setTimeout(() => { this.hideWechat(); Toast.show('微信登录成功！', 'OK'); }, 2200);
  },

  cancelWechat() {
    if (this._confirmTimer) { clearTimeout(this._confirmTimer); this._confirmTimer = null; }
    if (this._scanTimer) { clearTimeout(this._scanTimer); this._scanTimer = null; }
    if (this._wxWs) { this._wxWs.close(); this._wxWs = null; }
    this.hideWechat();
    Toast.show('已取消', 'C');
  },

  hideWechat() {
    if (this._confirmTimer) { clearTimeout(this._confirmTimer); this._confirmTimer = null; }
    if (this._scanTimer) { clearTimeout(this._scanTimer); this._scanTimer = null; }
    if (this._wxWs) { this._wxWs.close(); this._wxWs = null; }
    document.getElementById('wechatModal').classList.remove('show');
  },

  // ── 真实后端微信登录 ──
  async wechatLoginReal() {
    this.hideLogin();
    const modal = document.getElementById('wechatModal');
    modal.classList.add('show');

    // 重置状态
    document.getElementById('wechatQRBox').style.display = 'flex';
    document.getElementById('wechatConfirm').style.display = 'none';
    document.getElementById('wechatSuccess').style.display = 'none';
    document.getElementById('wechatStatus').textContent = '正在连接服务器...';
    document.getElementById('wechatQR').innerHTML = '<div style="color:#8b8578;font-size:13px;padding:60px 20px">加载中...</div>';

    try {
      // 调用后端获取二维码
      const res = await fetch('http://localhost:3000/api/wx/qr');
      const data = await res.json();

      // 显示二维码图片
      const qrBox = document.getElementById('wechatQR');
      qrBox.innerHTML = `<img src="${data.qrUrl}" alt="微信二维码" style="width:200px;height:200px;border-radius:4px">`;

      document.getElementById('wechatStatus').textContent = '请使用微信扫描二维码';

      // 保存 ticket
      this._wxTicket = data.ticket;

      // WebSocket 实时接收扫码状态
      const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = protocol + '//localhost:3000?ticket=' + data.ticket;
      this._wxWs = new WebSocket(wsUrl);

      this._wxWs.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.event === 'scan') {
          this._onWechatScan(msg.user);
        } else if (msg.event === 'confirm') {
          this.confirmWechat();
        }
      };

      this._wxWs.onerror = () => {
        // WebSocket 失败时降级轮询
        this._wxPollInterval = setInterval(async () => {
          try {
            const r = await fetch('http://localhost:3000/api/wx/status/' + this._wxTicket);
            const d = await r.json();
            if (d.status === 'scanned') this._onWechatScan(d.user);
            else if (d.status === 'confirmed') { clearInterval(this._wxPollInterval); this.confirmWechat(); }
          } catch {}
        }, 1500);
      };

    } catch (err) {
      // 后端未运行，降级到模拟模式
      Toast.show('后端未运行，已切换模拟登录模式', '!');
      this.wechatLogin();
    }
  },

  logout() {
    App.currentUser = null;
    localStorage.removeItem('speakflow_user');
    App.updateUserUI();
    Toast.show('已退出登录', 'O');
  },

};

// ═══════════════════════════════════════
// TTS Module
// ═══════════════════════════════════════
const TTS = {
  speak(text) {
    if (!text) return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text.trim());
    utt.lang = 'en-US'; utt.rate = 0.85; utt.pitch = 1;
    utt.onerror = () => Toast.show('浏览器不支持语音朗读', 'E');
    speechSynthesis.speak(utt);
  },
};

// ═══════════════════════════════════════
// Toast Module
// ═══════════════════════════════════════
const Toast = {
  show(msg, icon) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    document.getElementById('toastIcon').textContent = icon || 'OK';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  },
};

// ═══════════════════════════════════════
// Boot
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  Videos.renderVideoLibrary();
});
