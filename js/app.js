'use strict';

// ═══════════════════════════════════════
// SpeakFlow App - Main Application
// ═══════════════════════════════════════

// ── Courses Data (from search results) ──
const COURSES_DATA = [
  { id:1, title:'星空外语 SkyLingo · AI口语全通', thumb:'SF', color:'#f0a500', badge:'Top1 · 4.9分', duration:'15000+场景', progress:42, level:'中级', type:'learning', tag:'口语', desc:'1.78亿用户 · 迪士尼官方合作 · 60万+资源 · AI音素级纠音99.9%' },
  { id:2, title:'可栗口语 · AI智能陪练（Keli Speak）', thumb:'AI', color:'#a78bfa', badge:'2026新锐 · 4.9分', duration:'1000万+学员', progress:28, level:'中级', type:'learning', tag:'口语', desc:'音素级+逻辑级双重点评 · 支持8种全球口音 · 24小时AI语聊舱' },
  { id:3, title:'每日英语听力 · VOA/CNN精听特训', thumb:'VOA', color:'#60a5fa', badge:'听力专项', duration:'50期+', progress:65, level:'初级', type:'learning', tag:'听力', desc:'海量听力素材 · 根据水平智能推荐 · 寻梦环游记双语有声书' },
  { id:4, title:'百词斩 · 词汇量飞跃计划', thumb:'BC', color:'#4ade80', badge:'词汇专项 · 2.5亿用户', duration:'词库全开', progress:0, level:'初级', type:'saved', tag:'词汇', desc:'图文情景记忆 · 词根词缀分析 · 艾宾浩斯科学复习 · 150万+五星好评' },
  { id:5, title:'流利说 · 懂你英语A+ 口语系统', thumb:'LS', color:'#fb923c', badge:'口语系统', duration:'自适应课程', progress:0, level:'中级', type:'saved', tag:'口语', desc:'自适应诊断测试精准评估水平 · 智能评分实时反馈 · 场景对话模拟' },
  { id:6, title:'新东方在线 · 全阶段英语系统课', thumb:'XDF', color:'#f472b6', badge:'老牌名校 · 官方课程', duration:'出国/四六级/考研', progress:100, level:'高级', type:'done', tag:'综合', desc:'新东方师资+教学资源 · 个性化互动化学习体验 · 出國考试/国内考试全覆盖' },
  { id:7, title:'多邻国 Duolingo · 游戏化英语入门', thumb:'DU', color:'#34d399', badge:'全球爆款 · 4.9分', duration:'40+语言', progress:80, level:'初级', type:'learning', tag:'综合', desc:'游戏化关卡学习 · 趣味性极强 · 边玩边学 · 全球知名语言学习平台' },
  { id:8, title:'可可英语 · 听说读写全攻全守', thumb:'KK', color:'#60a5fa', badge:'综合全能', duration:'全阶段覆盖', progress:0, level:'中级', type:'saved', tag:'综合', desc:'每日英语听力+英文歌曲+影视英语+考试备考资料 · 适合各水平学习者' },
  { id:9, title:'普特英语听力 · 精听训练体系', thumb:'PT', color:'#818cf8', badge:'听力专项', duration:'等级训练', progress:100, level:'高级', type:'done', tag:'听力', desc:'各难度等级听力素材 · 电影台词讲解 · 广播训练 · 热门英语听力学习网站' },
  { id:10, title:'扇贝 · 词汇+听力双核提升', thumb:'SB', color:'#fb923c', badge:'词汇+听力', duration:'科学记忆法', progress:20, level:'中级', type:'learning', tag:'词汇', desc:'有效果不累的听力训练 · 科学记忆方法 · 听说读写全面提升' },
  { id:11, title:'有道精品课 · 网易名师精品课', thumb:'YD', color:'#f87171', badge:'名师课程 · 口碑8.7', duration:'少儿到成人', progress:0, level:'中级', type:'saved', tag:'综合', desc:'网易旗下在线教育平台 · 高品质在线学校 · 覆盖全年龄段精品课程' },
  { id:12, title:'BBC Learning English · 全球权威课程', thumb:'BBC', color:'#4ade80', badge:'全球权威', duration:'词汇/语法/听力', progress:0, level:'中级', type:'saved', tag:'综合', desc:'全球知名英语学习网站 · 词汇/语法/发音/听力/会话/阅读 · 免费MP3下载' },
];

// Practice training cards
const PRACTICE_DATA = [
  { title:'跟读纠音训练营', desc:'AI 逐句打分，纠正发音问题', icon:'R', color:'#ef4444' },
  { title:'雅思口语陪练', desc:'外教模拟考试，还原真实场景', icon:'I', color:'#60a5fa' },
  { title:'词汇量提升计划', desc:'艾宾浩斯记忆法，科学背单词', icon:'V', color:'#4ade80' },
  { title:'听力理解特训', desc:'听写+复述，快速提升听力', icon:'L', color:'#f0a500' },
];

// Community posts
const POSTS_DATA = [
  { id:1, avatar:'小', name:'英语小达人', tag:'初级学员', time:'10分钟前', content:'用 SpeakFlow 分析了一集《老友记》，生成了超详细的词汇表和句型！学到了 "figure out" 这个词组的用法，比自己查词典高效多了。', tags:['跟读技巧','影视英语'], likes:42, comments:8, liked:false },
  { id:2, avatar:'考', name:'雅思人加油', tag:'高级学员', time:'35分钟前', content:'有没有人和我一样，雅思口语 Part 2 总是卡壳？最近在用 AI 分析 TED 演讲，感觉对构建回答框架很有帮助，强烈推荐！', tags:['雅思','口语技巧'], likes:67, comments:15, liked:true },
  { id:3, avatar:'歪', name:'歪歪学英语', tag:'中级学员', time:'1小时前', content:'今天学了 5 个商务英语词汇：breakthrough、opportunity、tremendous、mindset、appreciate。用网站的跟读功能练了 3 遍，感觉进步明显！', tags:['商务英语','每日打卡'], likes:28, comments:5, liked:false },
  { id:4, avatar:'阿', name:'阿泽不爱背单词', tag:'社区达人', time:'2小时前', content:'分享一下我的学习顺序：①上传视频看原文 ②背核心词汇 ③跟读每个句型 ④自己录音对比 ⑤写一段类似的话。坚持两周，语感真的在变好！', tags:['学习方法','经验分享'], likes:89, comments:21, liked:false },
];

const HOT_TOPICS = [
  { num:1, title:'「老友记」第3季第5集有哪些高频词汇？', meta:'128 浏览 · 23 回复' },
  { num:2, title:'雅思口语 7 分经验分享（附学习计划）', meta:'256 浏览 · 45 回复' },
  { num:3, title:'看美剧学英语到底有没有用？实测 30 天', meta:'189 浏览 · 37 回复' },
  { num:4, title:'推荐几个适合初学者的 YouTube 频道', meta:'98 浏览 · 15 回复' },
];

const MEMBERS_DATA = [
  { name:'小达人', badge:'连续7天', emoji:'小' },
  { name:'歪歪', badge:'高活跃', emoji:'歪' },
  { name:'阿泽', badge:'贡献王', emoji:'阿' },
  { name:'考拉', badge:'学霸', emoji:'考' },
  { name:'小新', badge:'新人', emoji:'新' },
];

// Analysis sample data
function getAnalysisData() {
  return {
    pron: 78, fluency: 7.2, vocab: 65, speed: 142, difficulty: 58,
    sceneTag: '电影 · 日常对话',
    sceneDesc: '美式英语日常对话，语速适中（约142词/分钟），适合中级学习者进阶。',
    vocabulary: [
      { word:'absolutely', level:'easy', levelText:'基础' },
      { word:'genuinely', level:'medium', levelText:'进阶' },
      { word:'incredible', level:'easy', levelText:'基础' },
      { word:'ridiculous', level:'medium', levelText:'进阶' },
      { word:'mindset', level:'medium', levelText:'进阶' },
      { word:'breakthrough', level:'hard', levelText:'高阶' },
      { word:'appreciate', level:'easy', levelText:'基础' },
      { word:'struggle', level:'medium', levelText:'进阶' },
      { word:'opportunity', level:'easy', levelText:'基础' },
      { word:'tremendous', level:'hard', levelText:'高阶' },
      { word:'figure out', level:'easy', levelText:'词组' },
      { word:'work through', level:'medium', levelText:'词组' },
    ],
    phrases: [
      { en:"That's what makes it so incredible.", cn:'这正是它如此令人惊叹的地方。' },
      { en:"I genuinely think we can figure this out.", cn:'我真的觉得我们能解决这个问题。' },
      { en:"That's absolutely ridiculous, but I appreciate the effort.", cn:'这完全荒谬，但我感谢你的努力。' },
      { en:"We've been working through this for a while.", cn:'我们已经处理这个问题有一段时间了。' },
      { en:"It's an incredible opportunity if you think about it.", cn:'如果你仔细想想，这是一个难以置信的机会。' },
      { en:"I'm struggling to appreciate the mindset.", cn:'我很难理解这种心态。' },
      { en:"That's a tremendous breakthrough, honestly.", cn:'说实话，这是一个巨大的突破。' },
    ],
    transcript: [
      { time:'0:00', text:"Hey, have you seen that new movie everyone's talking about? It's absolutely incredible." },
      { time:'0:05', text:"Yeah, I watched it last night. Genuinely one of the best films I've seen this year." },
      { time:'0:10', text:"The character development is so well done. You can really figure out their mindset by the end." },
      { time:'0:16', text:"I know right? The director did a tremendous job with the story structure." },
      { time:'0:21', text:"But some of the dialogue is incredibly fast. I'm still trying to work through some parts." },
      { time:'0:27', text:"That's what makes it interesting. There's always something new to appreciate on rewatch." },
    ],
    highlightWords: ['absolutely','genuinely','incredible','figure','mindset','tremendous','appreciate'],
    culture: [
      { icon:'M', bg:'rgba(240,165,0,0.15)', text:'美式幽默中常用 <strong>"ridiculous"</strong> 表示"离谱/夸张"，是一种轻松的自嘲表达。' },
      { icon:'C', bg:'rgba(74,222,128,0.15)', text:'在英语对话中，<strong>"I appreciate that"</strong> 比 "Thank you" 更正式、更有礼貌。' },
      { icon:'B', bg:'rgba(96,165,250,0.15)', text:'<strong>"Mindset"</strong> 是英语思维中的高频词，表达"心态/思维方式"。' },
    ],
    pronTips: [
      { icon:'S', bg:'rgba(244,114,182,0.15)', text:'注意 <strong>"absolutely"</strong> 中 /əb/ 的弱读，第一个音节要轻。' },
      { icon:'P', bg:'rgba(251,146,60,0.15)', text:'<strong>"genuinely"</strong> 的 /dʒ/ 音要注意舌尖位置。' },
      { icon:'G', bg:'rgba(167,139,250,0.15)', text:'美语中 <strong>"gonna"</strong> 是 "going to" 的自然连读。' },
    ]
  };
}

// ═══════════════════════════════════════
// APP - Main Application
// ═══════════════════════════════════════
const App = {
  currentUser: null,

  init() {
    this.loadUserState();
    this.initUpload();
    this.initEventDelegation();
    this.renderStats();
    this.renderCourseGrid();
    this.renderPracticeGrid();
    this.renderMyCourses();
    this.renderVideoLibrary();
    this.renderHomeVideos();
    this.renderPosts();
    this.renderHotTopics();
    this.renderActiveMembers();
  },

  loadUserState() {
    const stored = localStorage.getItem('speakflow_user');
    if (stored) { try { this.currentUser = JSON.parse(stored); } catch {} }
    this.updateUserUI();
  },

  updateUserUI() {
    const unauth = document.getElementById('header-unauth');
    const auth = document.getElementById('header-auth');
    if (this.currentUser) {
      unauth.style.display = 'none';
      auth.style.display = 'flex';
      document.getElementById('headerUserName').textContent = this.currentUser.name;
      document.getElementById('headerUserLevel').textContent = this.currentUser.level || 1;
      document.getElementById('headerAvatar').textContent = this.currentUser.name[0].toUpperCase();
    } else {
      unauth.style.display = 'flex';
      auth.style.display = 'none';
    }
  },

  switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const nav = document.getElementById('nav-' + page);
    if (nav) nav.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showProfileMenu() {
    if (!this.currentUser) { Auth.showLogin('login'); return; }
    Toast.show(`${this.currentUser.name} · Lv.${this.currentUser.level} · ${this.currentUser.xp || 0} XP`, 'U');
    setTimeout(() => { if (confirm('确定要退出登录吗？')) Auth.logout(); }, 500);
  },

  selectLevel(level) {
    const names = { beginner:'初级', intermediate:'中级', advanced:'高级' };
    Toast.show(`已选择「${names[level]}」学习路径`, 'R');
  },

  // Stats
  renderStats() {
    const bar = document.getElementById('statsBar');
    bar.innerHTML = [
      { icon:'V', value:0, label:'已分析视频', color:'var(--success)' },
      { icon:'W', value:0, label:'已学词汇', color:'var(--info)' },
      { icon:'T', value:0, label:'学习分钟', color:'var(--accent)' },
      { icon:'S', value:0, label:'连续学习天数', color:'var(--purple)' },
    ].map((s, i) => `
      <div class="stat-card">
        <div class="stat-icon">${s.icon}</div>
        <div class="stat-value" id="stat${i}" style="color:${s.color}">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('');
  },

  updateStats(videos, words, minutes) {
    const s = ['V','W','T','S'].map((_,i) => parseInt(document.getElementById('stat'+i)?.textContent || '0'));
    const el = document.getElementById('stat0'); if (el) el.textContent = s[0] + videos;
    const el1 = document.getElementById('stat1'); if (el1) el1.textContent = s[1] + words;
    const el2 = document.getElementById('stat2'); if (el2) el2.textContent = s[2] + minutes;
    const el3 = document.getElementById('stat3'); if (el3) el3.textContent = Math.max(s[3], 1);
  },

  // Courses
  renderCourseGrid() {
    const grid = document.getElementById('courseGrid');
    grid.innerHTML = COURSES_DATA.slice(0,6).map(c => this.courseCardHTML(c)).join('');
  },

  courseCardHTML(c) {
    const col = c.progress === 100 ? 'var(--success)' : 'var(--accent)';
    const badgeClass = c.type === 'done' ? 'badge-done' : c.type === 'saved' ? 'badge-bookmark' : 'badge-learning';
    const badgeText = c.type === 'done' ? '已完成' : c.type === 'saved' ? '收藏' : '学习中';
    return `<div class="course-card" onclick="Courses.open(${c.id})">
      <div class="course-thumb" style="background:${c.color}22">
        <span style="font-size:24px;font-weight:700;color:${c.color}">${c.thumb}</span>
        <span class="course-badge">${c.badge}</span>
        <span class="course-duration">${c.duration}</span>
      </div>
      <div class="course-body">
        <div class="course-title">${c.title}</div>
        <div class="course-meta"><span>${c.level}</span><span>${c.tag}</span></div>
        <div class="course-desc">${c.desc}</div>
        <div class="course-progress-bar">
          <div class="course-progress-fill" style="width:${c.progress}%;background:${col}"></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
          <span style="font-size:11px;color:var(--text-muted)">${c.progress}%</span>
          <span class="mycourse-badge ${badgeClass}">${badgeText}</span>
        </div>
      </div>
    </div>`;
  },

  renderPracticeGrid() {
    const grid = document.getElementById('practiceGrid');
    grid.innerHTML = PRACTICE_DATA.map(p => `
      <div class="course-card" onclick="Toast.show('${p.title}功能即将上线！', 'C')">
        <div class="course-thumb" style="background:${p.color}22">
          <span style="font-size:36px;color:${p.color}">${p.icon}</span>
        </div>
        <div class="course-body">
          <div class="course-title">${p.title}</div>
          <div class="course-desc">${p.desc}</div>
        </div>
      </div>`).join('');
  },

  // My Courses
  renderMyCourses(filter) {
    filter = filter || 'all';
    const list = document.getElementById('mycourseList');
    const filtered = filter === 'all' ? COURSES_DATA : COURSES_DATA.filter(c => c.type === filter);
    if (filtered.length === 0) {
      list.innerHTML = `<div class="empty-state">
        <div class="empty-state-icon">?</div>
        <h3>暂无课程</h3>
        <p>去学习中心开始你的学习之旅吧！</p>
        <button class="btn btn-primary" style="margin-top:14px" onclick="App.switchPage('center')">去学习中心</button>
      </div>`;
      return;
    }
    list.innerHTML = `<div class="mycourse-grid">${filtered.map(c => `
      <div class="mycourse-card" onclick="Courses.open(${c.id})">
        <div class="mycourse-thumb-small" style="background:${c.color}22;color:${c.color}">${c.thumb}</div>
        <div class="mycourse-info">
          <div class="mycourse-title">${c.title}</div>
          <div class="mycourse-sub">${c.duration} · ${c.level} · ${c.tag}</div>
          <div class="mycourse-progress-bar">
            <div class="mycourse-progress-fill" style="width:${c.progress}%;background:${c.progress===100?'var(--success)':'var(--accent)'}"></div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
            <span style="font-size:11px;color:var(--text-muted)">${c.progress}%</span>
            <span class="mycourse-badge badge-${c.type}">${c.type==='done'?'已完成':c.type==='saved'?'收藏':'学习中'}</span>
          </div>
        </div>
      </div>`).join('')}</div>`;
  },

  // Home video preview
  renderHomeVideos() {
    const grid = document.getElementById('homeVideoGrid');
    if (typeof VIDEO_COURSES !== 'undefined') {
      grid.innerHTML = VIDEO_COURSES.slice(0,4).map(v => `
        <div class="video-card" onclick="Videos.open(${v.id})">
          <div class="video-card-thumb" style="background:${v.color}22;color:${v.color}">
            <span>${v.thumb}</span>
            <div class="video-card-play">&#9658;</div>
          </div>
          <div class="video-card-body">
            <div class="video-card-title">${v.title}</div>
            <div class="video-card-meta">
              <span class="video-card-badge" style="background:${v.color}22;color:${v.color}">${v.level}</span>
              <span>${v.duration}</span>
            </div>
          </div>
        </div>`).join('');
    } else {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px">正在加载视频库...</div>`;
    }
  },

  // Community
  renderPosts() {
    const feed = document.getElementById('postsFeed');
    feed.innerHTML = POSTS_DATA.map(p => `
      <div class="post-card" data-id="${p.id}">
        <div class="post-author">
          <div class="post-avatar">${p.avatar}</div>
          <div>
            <div class="post-author-name">${p.name}</div>
            <div class="post-author-tag">${p.tag}</div>
          </div>
          <div class="post-time">${p.time}</div>
        </div>
        <div class="post-content">${p.content}</div>
        <div class="post-tags">${p.tags.map(t => `<span class="post-tag">#${t}</span>`).join('')}</div>
        <div class="post-actions">
          <div class="post-action ${p.liked?'liked':''}" data-action="like"><span>${p.liked?'❤️':'🤍'}</span><span class="action-count">${p.likes}</span></div>
          <div class="post-action" data-action="comment"><span>💬</span><span>${p.comments}</span></div>
          <div class="post-action" data-action="bookmark">🔖</div>
          <div class="post-action" data-action="share">↗</div>
        </div>
      </div>`).join('');
  },

  renderHotTopics() {
    document.getElementById('hotTopics').innerHTML = HOT_TOPICS.map(t => `
      <div class="hot-topic" onclick="Toast.show('${t.title}', 'H')">
        <div class="hot-num">${t.num}</div>
        <div>
          <div class="hot-title">${t.title}</div>
          <div class="hot-meta">${t.meta}</div>
        </div>
      </div>`).join('');
  },

  renderActiveMembers() {
    document.getElementById('activeMembers').innerHTML = MEMBERS_DATA.map(m => `
      <div class="member-item">
        <div class="member-avatar">${m.emoji}</div>
        <div>
          <div class="member-name">${m.name}</div>
          <div class="member-badge">${m.badge}</div>
        </div>
      </div>`).join('');
  },

  // Upload
  initUpload() {
    const zone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', e => { if (!zone.contains(e.relatedTarget)) zone.classList.remove('dragover'); });
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('dragover');
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith('video/')) Upload.loadFile(f);
    });
    fileInput.addEventListener('change', e => { if (e.target.files[0]) Upload.loadFile(e.target.files[0]); });
    document.getElementById('removeBtn').addEventListener('click', () => Upload.remove());
  },

  // Event delegation
  initEventDelegation() {
    document.addEventListener('click', e => {
      const t = e.target;

      // Vocab click
      if (t.closest('.vocab-item')) {
        const el = t.closest('.vocab-item');
        const word = el.dataset.word;
        el.classList.add('speaking');
        TTS.speak(word);
        setTimeout(() => el.classList.remove('speaking'), 1200);
        return;
      }

      // Phrase play
      if (t.closest('.phrase-play')) {
        const el = t.closest('.phrase-item');
        el.classList.add('speaking');
        TTS.speak(el.dataset.phrase);
        setTimeout(() => el.classList.remove('speaking'), 1800);
        return;
      }

      // Phrase record
      if (t.closest('.phrase-rec')) {
        const btn = t.closest('.phrase-rec');
        btn.classList.toggle('recording');
        Toast.show(btn.classList.contains('recording') ? '录音中...' : '录音已保存', 'R');
        return;
      }

      // Transcript highlight word
      if (t.classList.contains('highlight-word')) {
        const word = t.dataset.word || t.textContent;
        t.classList.add('speaking');
        TTS.speak(word.trim());
        setTimeout(() => t.classList.remove('speaking'), 1200);
        return;
      }

      // Post actions
      if (t.closest('.post-action[data-action="like"]')) {
        const card = t.closest('.post-card');
        const postId = parseInt(card.dataset.id);
        const post = POSTS_DATA.find(p => p.id === postId);
        if (post) {
          post.liked = !post.liked;
          post.likes += post.liked ? 1 : -1;
          const action = t.closest('.post-action');
          action.classList.toggle('liked', post.liked);
          const icon = action.querySelector('span:first-child');
          if (icon) icon.textContent = post.liked ? '❤️' : '🤍';
          const count = action.querySelector('.action-count');
          if (count) count.textContent = post.likes;
        }
        return;
      }

      if (t.closest('.post-action[data-action="comment"]')) {
        Toast.show('评论功能开发中...', 'C');
        return;
      }

      if (t.closest('.post-action[data-action="bookmark"]')) {
        t.closest('.post-action').classList.toggle('liked');
        Toast.show('已收藏！', 'B');
        return;
      }

      if (t.closest('.post-action[data-action="share"]')) {
        Toast.show('分享功能开发中...', 'S');
        return;
      }

      // Learning path
      if (t.closest('.path-step.clickable')) {
        const step = parseInt(t.closest('.path-step').id.replace('pstep','')) - 1;
        const targets = ['resultsSection','resultsSection','vocabList','phraseList','practiceSection'];
        const target = document.getElementById(targets[step] || 'resultsSection');
        if (target) {
          target.scrollIntoView({ behavior:'smooth', block:'center' });
          target.style.outline = '2px solid var(--accent)';
          target.style.outlineOffset = '4px';
          setTimeout(() => { target.style.outline = ''; target.style.outlineOffset = ''; }, 2000);
        }
        const titles = ['上传视频','理解内容','记忆词汇','跟读练习','输出表达'];
        Toast.show(`进入「${titles[step]}」阶段`, 'R');
      }
    });
  },
};

// ═══════════════════════════════════════
// Upload Module
// ═══════════════════════════════════════
const Upload = {
  loadFile(file) {
    document.getElementById('videoPlayer').src = URL.createObjectURL(file);
    document.getElementById('videoName').textContent = file.name;
    document.getElementById('videoSize').textContent = this.formatSize(file.size);
    document.getElementById('previewSection').classList.add('show');
    document.getElementById('resultsSection').classList.remove('show');
    Analysis.resetBtn();
    Toast.show('视频已加载，点击「开始 AI 分析」', 'V');
  },

  remove() {
    document.getElementById('fileInput').value = '';
    document.getElementById('previewSection').classList.remove('show');
    document.getElementById('resultsSection').classList.remove('show');
    Analysis.resetBtn();
  },

  formatSize(b) {
    return b < 1048576 ? (b/1024).toFixed(1) + ' KB' : (b/1048576).toFixed(1) + ' MB';
  },
};

// ═══════════════════════════════════════
// Analysis Module
// ═══════════════════════════════════════
const Analysis = {
  data: null,
  practiceIdx: 0,
  mediaRec: null,
  isRecording: false,

  start() {
    const btn = document.getElementById('analyzeBtn');
    const btnIcon = document.getElementById('btnIcon');
    const btnText = document.getElementById('btnText');
    btn.disabled = true; btn.classList.remove('done'); btn.classList.add('loading');
    btnIcon.innerHTML = '<div class="spinner"></div>';
    btnText.textContent = 'AI 正在分析中...';

    setTimeout(() => {
      btn.classList.remove('loading'); btn.classList.add('done');
      btnIcon.innerHTML = 'OK'; btnText.textContent = '分析完成！';
      btn.disabled = false;
      this.data = getAnalysisData();
      this.renderResults(this.data);
      App.updateStats(1, this.data.vocabulary.length, 15);
      document.getElementById('previewSection').scrollIntoView({ behavior:'smooth', block:'start' });
      Toast.show('学习内容已生成！点击词汇/句型可听发音', 'A');
    }, 2200);
  },

  resetBtn() {
    const btn = document.getElementById('analyzeBtn');
    btn.classList.remove('loading','done'); btn.disabled = false;
    document.getElementById('btnIcon').textContent = 'AI';
    document.getElementById('btnText').textContent = '开始 AI 分析';
  },

  reset() {
    document.getElementById('fileInput').value = '';
    document.getElementById('previewSection').classList.remove('show');
    document.getElementById('resultsSection').classList.remove('show');
    this.resetBtn();
    document.getElementById('diffBar').style.width = '0%';
    Toast.show('已重置，可上传新视频', 'R');
    window.scrollTo({ top:0, behavior:'smooth' });
  },

  savePlan() {
    Toast.show('学习计划已保存到「我的课程」！', 'S');
  },

  renderResults(data) {
    document.getElementById('resultsSection').classList.add('show');

    // Score grid
    const scoreGrid = document.getElementById('scoreGrid');
    scoreGrid.innerHTML = [
      { id:'ring1', valId:'val1', v:data.pron, unit:'%', color:'var(--success)', label:'发音评分', sub:'Pronunciation' },
      { id:'ring2', valId:'val2', v:data.fluency, unit:'/10', color:'var(--info)', label:'流利度', sub:'Fluency' },
      { id:'ring3', valId:'val3', v:data.vocab, unit:'%', color:'var(--warning)', label:'词汇难度', sub:'Vocabulary' },
      { id:'ring4', valId:'val4', v:data.speed, unit:'', color:'var(--accent)', label:'语速 WPM', sub:'Speed' },
    ].map((s, i) => {
      setTimeout(() => this.animateScore(s.id, s.valId, s.v, s.unit, s.color), 150 + i * 120);
      return `<div class="score-card">
        <div class="score-ring-wrap"><div class="score-ring">
          <svg width="60" height="60" viewBox="0 0 60 60"><circle class="bg" cx="30" cy="30" r="24"/><circle class="fg" id="${s.id}" cx="30" cy="30" r="24" stroke="${s.color}" stroke-dasharray="150.8" stroke-dashoffset="150.8"/></svg>
          <div class="val" id="${s.valId}" style="color:${s.color}">—</div>
        </div></div>
        <div class="score-label">${s.label}</div>
        <div class="score-sub">${s.sub}</div>
      </div>`;
    }).join('');

    setTimeout(() => { document.getElementById('diffBar').style.width = data.difficulty + '%'; }, 200);

    // Content grid
    document.getElementById('contentGrid').innerHTML = `
      <div class="content-card">
        <div class="content-card-header">
          <div class="content-card-icon" style="background:rgba(240,165,0,0.15)">M</div>
          <div><h3>内容场景分析</h3><div class="sub-label">Video Context</div></div>
        </div>
        <div class="scene-tag">${data.sceneTag}</div>
        <div class="diff-labels"><span>初学者</span><span>中级</span><span>高级</span></div>
        <div class="diff-bar"><div class="diff-fill" id="diffBar"></div></div>
        <div class="scene-desc">${data.sceneDesc}</div>
      </div>
      <div class="content-card">
        <div class="content-card-header">
          <div class="content-card-icon" style="background:rgba(74,222,128,0.15)">W</div>
          <div><h3>核心词汇表</h3><div class="sub-label">点击朗读</div></div>
        </div>
        <div class="vocab-list" id="vocabList">${data.vocabulary.map(v => `<div class="vocab-item" data-word="${v.word}">${v.word} <span class="vocab-level ${v.level}">${v.levelText}</span></div>`).join('')}</div>
      </div>
      <div class="content-card full-width">
        <div class="content-card-header">
          <div class="content-card-icon" style="background:rgba(96,165,250,0.15)">P</div>
          <div><h3>重点句型 & 跟读练习</h3><div class="sub-label">点击播放 · 录音跟读</div></div>
        </div>
        <div id="phraseList">${data.phrases.map(p => `<div class="phrase-item" data-phrase="${p.en.replace(/"/g,'&quot;')}">
          <div class="phrase-en"><span class="phrase-text">${p.en}</span><span class="phrase-play">S</span><button class="phrase-rec">REC</button></div>
          <div class="phrase-cn">${p.cn}</div>
        </div>`).join('')}</div>
      </div>
      <div class="content-card full-width">
        <div class="content-card-header">
          <div class="content-card-icon" style="background:rgba(251,146,60,0.15)">T</div>
          <div><h3>视频原文转写</h3><div class="sub-label">点击高亮词听发音</div></div>
        </div>
        <div id="transcriptList">${data.transcript.map(t => `<div class="transcript-seg">
          <span class="transcript-time">${t.time}</span>
          <span class="transcript-text">${this.highlight(t.text, data.highlightWords)}</span>
        </div>`).join('')}</div>
      </div>
      <div class="content-card">
        <div class="content-card-header">
          <div class="content-card-icon" style="background:rgba(167,139,250,0.15)">C</div>
          <div><h3>文化背景知识</h3><div class="sub-label">Cultural Context</div></div>
        </div>
        ${data.culture.map(c => `<div class="tip-item"><div class="tip-icon" style="background:${c.bg}">${c.icon}</div><div class="tip-text">${c.text}</div></div>`).join('')}
      </div>
      <div class="content-card">
        <div class="content-card-header">
          <div class="content-card-icon" style="background:rgba(244,114,182,0.15)">R</div>
          <div><h3>发音 & 听力技巧</h3><div class="sub-label">Pronunciation Tips</div></div>
        </div>
        ${data.pronTips.map(p => `<div class="tip-item"><div class="tip-icon" style="background:${p.bg}">${p.icon}</div><div class="tip-text">${p.text}</div></div>`).join('')}
      </div>`;

    // Practice
    this.practiceIdx = 0;
    this.renderPractice();

    // Learning path
    document.getElementById('learningPath').innerHTML = `
      <h3>学习路径</h3>
      <div class="path-steps">
        <div class="path-step done clickable" id="pstep1" onclick="App.initEventDelegation()">
          <div class="path-num">1</div><div class="path-title">上传视频</div><div class="path-desc">已完成</div>
        </div>
        <div class="path-step current clickable" id="pstep2">
          <div class="path-num">2</div><div class="path-title">理解内容</div><div class="path-desc">当前阶段</div>
        </div>
        <div class="path-step clickable" id="pstep3">
          <div class="path-num">3</div><div class="path-title">记忆词汇</div><div class="path-desc">复习核心单词</div>
        </div>
        <div class="path-step clickable" id="pstep4">
          <div class="path-num">4</div><div class="path-title">跟读练习</div><div class="path-desc">模仿原声</div>
        </div>
        <div class="path-step clickable" id="pstep5">
          <div class="path-num">5</div><div class="path-title">输出表达</div><div class="path-desc">自主造句</div>
        </div>
      </div>`;
  },

  animateScore(ringId, valId, val, unit, color) {
    const ring = document.getElementById(ringId);
    const valEl = document.getElementById(valId);
    if (!ring || !valEl) return;
    const circ = 150.8;
    const maxVal = unit === '/10' ? 10 : (unit === '' ? 180 : 100);
    const pct = Math.min(Math.max(val,0)/maxVal, 1);
    ring.style.strokeDashoffset = circ * (1 - pct);
    valEl.textContent = unit === '' ? val : (unit === '/10' ? val : Math.round(val) + unit);
  },

  highlight(text, words) {
    let r = text;
    words.forEach(w => {
      const esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      r = r.replace(new RegExp('\\b(' + esc + ')\\b', 'gi'),
        '<span class="highlight-word" data-word="$1">$1</span>');
    });
    return r;
  },

  renderPractice() {
    const p = this.data.phrases[this.practiceIdx];
    document.getElementById('practiceSection').innerHTML = `
      <div class="practice-header">
        <span style="font-size:18px">R</span>
        <div><h3>跟读练习模式</h3><div class="sub-label">先听原声，再模仿跟读，录音对比</div></div>
      </div>
      <div class="practice-phrase" id="practicePhrase">${this.practiceIdx + 1}. ${p.en}</div>
      <div class="practice-controls">
        <button class="practice-btn play" onclick="Analysis.playPractice()">PLAY</button>
        <button class="practice-btn record" id="practiceRecBtn" onclick="Analysis.toggleRecord()">REC</button>
        <button class="practice-btn next-pr" id="nextPracticeBtn" onclick="Analysis.nextPractice()">NEXT</button>
      </div>`;
    document.getElementById('nextPracticeBtn').disabled = this.practiceIdx >= this.data.phrases.length - 1;
  },

  playPractice() {
    if (!this.data) return;
    TTS.speak(this.data.phrases[this.practiceIdx].en);
    Toast.show('播放中，请跟读...', 'P');
  },

  async toggleRecord() {
    const btn = document.getElementById('practiceRecBtn');
    if (!this.isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRec = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const chunks = [];
        this.mediaRec.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
        this.mediaRec.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url;
          a.download = `speakflow_${Date.now()}.webm`; a.click();
          URL.revokeObjectURL(url);
          stream.getTracks().forEach(t => t.stop());
          Toast.show('录音已保存！', 'OK');
        };
        this.mediaRec.start();
        this.isRecording = true;
        btn.classList.add('recording'); btn.textContent = 'STOP';
        Toast.show('录音中... 说出你的跟读', 'R');
      } catch { Toast.show('需要麦克风权限', 'E'); }
    } else {
      if (this.mediaRec && this.mediaRec.state !== 'inactive') this.mediaRec.stop();
      this.isRecording = false;
      btn.classList.remove('recording'); btn.textContent = 'REC';
    }
  },

  nextPractice() {
    if (!this.data || this.practiceIdx >= this.data.phrases.length - 1) return;
    this.practiceIdx++;
    this.renderPractice();
    Toast.show(`第 ${this.practiceIdx + 1} 句`, 'N');
  },
};

// ═══════════════════════════════════════
// Videos Module (Real Video Library)
// ═══════════════════════════════════════
const Videos = {
  currentVideo: null,
  currentTab: 'transcript',

  renderLibrary(filter) {
    filter = filter || 'all';
    const grid = document.getElementById('videoLibraryGrid');
    if (typeof VIDEO_COURSES === 'undefined') {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:60px 0">视频库加载中...</div>`;
      return;
    }
    const filtered = filter === 'all' ? VIDEO_COURSES : VIDEO_COURSES.filter(v => v.tag.includes(filter));
    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:60px 0">该分类暂无视频</div>`;
      return;
    }
    grid.innerHTML = filtered.map(v => `
      <div class="lib-video-card" onclick="Videos.open(${v.id})">
        <div class="lib-video-thumb" style="background:${v.color}22">
          <span style="font-size:28px;font-weight:700;color:${v.color}">${v.thumb}</span>
          <div class="lib-video-play">&#9658;</div>
          <span class="lib-video-platform">${v.platform === 'bilibili' ? 'B站' : v.platform.toUpperCase()}</span>
        </div>
        <div class="lib-video-body">
          <div class="lib-video-title">${v.title}</div>
          <div class="lib-video-meta">
            <span class="lib-video-badge" style="background:${v.color}22;color:${v.color}">${v.level}</span>
            <span>${v.duration}</span>
            <span>${v.tag}</span>
          </div>
          <div style="font-size:11px;color:var(--text-muted);line-height:1.4">${v.desc}</div>
        </div>
      </div>`).join('');
  },

  renderVideoLibrary() {
    this.renderLibrary('all');
  },

  filter(tag, btn) {
    document.querySelectorAll('#page-videos .filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    this.renderLibrary(tag);
  },

  open(id) {
    const v = typeof VIDEO_COURSES !== 'undefined' ? VIDEO_COURSES.find(x => x.id === id) : null;
    if (!v) { Toast.show('视频加载中...', 'V'); return; }
    this.currentVideo = v;
    this.currentTab = 'transcript';

    // Build player — Bilibili embed (国内可直接播放)
    const wrap = document.getElementById('videoPlayerWrap');
    if (v.platform === 'bilibili' && v.videoId) {
      wrap.innerHTML = `<iframe src="https://player.bilibili.com/player.html?bvid=${v.videoId}&page=1&autoplay=0" allow="autoplay; fullscreen" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>`;
    } else {
      wrap.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:14px">视频加载中... <a href="https://www.bilibili.com/video/${v.videoId}" target="_blank" style="color:var(--accent);margin-left:8px">在B站打开</a></div>`;
      wrap.style.position = '';
    }

    // Info
    document.getElementById('modalVideoTitle').textContent = v.title;
    document.getElementById('modalVideoBadge').textContent = v.badge;
    document.getElementById('modalVideoLevel').textContent = v.level;
    document.getElementById('modalVideoPlatform').textContent = v.platform.toUpperCase();
    document.getElementById('modalVideoDesc').textContent = v.desc || v.videoDesc || '';

    // Reset tabs
    document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.video-tab').classList.add('active');
    this.renderTab('transcript');

    document.getElementById('videoModal').classList.add('show');
  },

  close() {
    document.getElementById('videoModal').classList.remove('show');
    const wrap = document.getElementById('videoPlayerWrap');
    wrap.innerHTML = '';
    wrap.style.position = '';
    this.currentVideo = null;
  },

  switchTab(tab, btn) {
    this.currentTab = tab;
    document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    this.renderTab(tab);
  },

  renderTab(tab) {
    const v = this.currentVideo;
    if (!v) return;
    const content = document.getElementById('videoTabContent');

    if (tab === 'transcript') {
      const segs = v.transcripts || [];
      content.innerHTML = segs.length ? segs.map(s => `
        <div class="transcript-seg">
          <span class="transcript-time">${s.time}</span>
          <span class="transcript-text">${this.highlightWords(s.text, v.keyWords || [])}</span>
        </div>`).join('') : '<div style="color:var(--text-muted);font-size:13px;padding:10px">暂无转写数据</div>';
    } else if (tab === 'vocab') {
      const words = v.keyWords || [];
      content.innerHTML = words.length ? `<div class="vocab-list">${words.map(w => `<div class="vocab-item" onclick="TTS.speak('${w}');this.classList.add('speaking');setTimeout(()=>this.classList.remove('speaking'),1200)">${w}</div>`).join('')}</div>` : '<div style="color:var(--text-muted);font-size:13px;padding:10px">暂无词汇数据</div>';
    } else if (tab === 'practice') {
      const phrases = v.transcripts ? v.transcripts.map(s => ({ en: s.text, cn: '点击播放练习跟读' })) : [];
      content.innerHTML = phrases.length ? phrases.map((p, i) => `
        <div class="phrase-item" data-phrase="${p.en.replace(/"/g,'&quot;')}" onclick="TTS.speak('${p.en.replace(/'/g,"\\'")}');this.classList.add('speaking');setTimeout(()=>this.classList.remove('speaking'),2000)">
          <div class="phrase-en"><span>${p.en}</span><span class="phrase-play">S</span></div>
          <div class="phrase-cn">${p.cn}</div>
        </div>`).join('') : '<div style="color:var(--text-muted);font-size:13px;padding:10px">暂无练习数据</div>';
    }
  },

  highlightWords(text, words) {
    if (!words || !words.length) return text;
    let r = text;
    words.forEach(w => {
      const esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      r = r.replace(new RegExp('\\b(' + esc + ')\\b', 'gi'),
        '<span class="highlight-word" data-word="$1">$1</span>');
    });
    return r;
  },
};

// ═══════════════════════════════════════
// Courses Module
// ═══════════════════════════════════════
const Courses = {
  filter(type, btn) {
    document.querySelectorAll('#courseFilterTabs .filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    App.renderMyCourses(type);
  },

  open(id) {
    const course = COURSES_DATA.find(c => c.id === id);
    if (!course) return;
    Toast.show(`打开「${course.title}」`, 'C');
    // Navigate to home and start analysis
    setTimeout(() => {
      App.switchPage('home');
      setTimeout(() => Analysis.start(), 300);
    }, 500);
  },
};

// ═══════════════════════════════════════
// Community Module
// ═══════════════════════════════════════
const Community = {
  focusPost() {
    document.getElementById('postTextarea').focus();
  },

  addEmoji(type) {
    const ta = document.getElementById('postTextarea');
    const emojis = { happy:'happy', thinking:'thinking', idea:'idea', book:'book' };
    ta.value += '#' + (emojis[type] || type) + ' ';
    ta.focus();
  },

  submitPost() {
    const content = document.getElementById('postTextarea').value.trim();
    if (!content) { Toast.show('请输入内容！', '!'); return; }
    if (!App.currentUser) { Toast.show('请先登录', 'L'); document.getElementById('postTextarea').value = ''; return; }
    const newPost = {
      id: Date.now(),
      avatar: App.currentUser.name[0],
      name: App.currentUser.name,
      tag: '新学员',
      time: '刚刚',
      content: content,
      tags: ['学习打卡'],
      likes: 0, comments: 0, liked: false
    };
    POSTS_DATA.unshift(newPost);
    App.renderPosts();
    document.getElementById('postTextarea').value = '';
    Toast.show('发布成功！', 'OK');
  },
};

// ═══════════════════════════════════════
// Auth Module
// ═══════════════════════════════════════
const Auth = {
  showLogin(mode) {
    this.switchModal(mode);
    document.getElementById('loginModal').classList.add('show');
  },

  hideLogin() {
    document.getElementById('loginModal').classList.remove('show');
  },

  switchModal(mode) {
    document.getElementById('loginForm').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = mode === 'register' ? 'block' : 'none';
    document.getElementById('modalTitle').textContent = mode === 'login' ? '登录 SpeakFlow' : '注册 SpeakFlow';
    document.getElementById('modalSubtitle').textContent = mode === 'login' ? '欢迎回来，继续你的英语学习之旅' : '创建账号，开启英语学习之旅';
    document.querySelectorAll('.form-error').forEach(e => e.classList.remove('show'));
  },

  doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pwd = document.getElementById('loginPassword').value;
    let valid = true;
    if (!email || !email.includes('@')) {
      document.getElementById('loginEmailErr').textContent = '请输入有效的邮箱';
      document.getElementById('loginEmailErr').classList.add('show'); valid = false;
    } else document.getElementById('loginEmailErr').classList.remove('show');
    if (!pwd || pwd.length < 6) {
      document.getElementById('loginPwdErr').textContent = '密码至少6位';
      document.getElementById('loginPwdErr').classList.add('show'); valid = false;
    } else document.getElementById('loginPwdErr').classList.remove('show');
    if (!valid) return;
    const name = email.split('@')[0].replace(/[._0-9]/g, '').replace(/^\w/, c => c.toUpperCase());
    App.currentUser = { name, email, level: 3, xp: 240 };
    localStorage.setItem('speakflow_user', JSON.stringify(App.currentUser));
    App.updateUserUI();
    this.hideLogin();
    Toast.show(`欢迎回来，${name}！`, 'W');
  },

  doRegister() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pwd = document.getElementById('regPassword').value;
    const pwd2 = document.getElementById('regPassword2').value;
    let valid = true;
    if (!name || name.length < 2) {
      document.getElementById('regNameErr').textContent = '用户名至少2个字符';
      document.getElementById('regNameErr').classList.add('show'); valid = false;
    } else document.getElementById('regNameErr').classList.remove('show');
    if (!email || !email.includes('@')) {
      document.getElementById('regEmailErr').textContent = '请输入有效的邮箱';
      document.getElementById('regEmailErr').classList.add('show'); valid = false;
    } else document.getElementById('regEmailErr').classList.remove('show');
    if (!pwd || pwd.length < 8 || !/[a-zA-Z]/.test(pwd) || !/[0-9]/.test(pwd)) {
      document.getElementById('regPwdErr').textContent = '密码至少8位，需包含字母和数字';
      document.getElementById('regPwdErr').classList.add('show'); valid = false;
    } else document.getElementById('regPwdErr').classList.remove('show');
    if (pwd !== pwd2) {
      document.getElementById('regPwd2Err').textContent = '两次密码不一致';
      document.getElementById('regPwd2Err').classList.add('show'); valid = false;
    } else document.getElementById('regPwd2Err').classList.remove('show');
    if (!valid) return;
    App.currentUser = { name, email, level: 1, xp: 0 };
    localStorage.setItem('speakflow_user', JSON.stringify(App.currentUser));
    App.updateUserUI();
    this.hideLogin();
    Toast.show(`注册成功！欢迎 ${name} 加入！`, 'R');
  },

  socialLogin(provider) {
    if (provider === 'wechat') { this.wechatLoginReal(); return; }
    Toast.show(`${provider} 登录功能开发中...`, 'D');
  },

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

  // 演示：模拟扫码（调用后端API，后端通过WebSocket推送scan事件）
  async mockScan() {
    if (!this._wxTicket) { Toast.show('请先生成二维码', '!'); return; }
    const btn = document.getElementById('mockScanBtn');
    if (btn) { btn.disabled = true; btn.textContent = '已扫码...'; }
    try {
      await fetch('https://wrinkle-conceal-lifting.ngrok-free.dev/api/wx/mock/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket: this._wxTicket })
      });
    } catch (e) {
      Toast.show('后端未运行，请先启动服务器', 'E');
      if (btn) { btn.disabled = false; btn.textContent = '我已扫码（演示）'; }
    }
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
      const res = await fetch('https://wrinkle-conceal-lifting.ngrok-free.dev/api/wx/qr');
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
            const r = await fetch('https://wrinkle-conceal-lifting.ngrok-free.dev/api/wx/status/' + this._wxTicket);
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
