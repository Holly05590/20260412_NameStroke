'use strict';

/* ════════════════════════════════════════════════════════
   姓名學筆劃資料庫（STROKE_DB）
   ─ 已依傳統偏旁規則補正，優先於 cnchar 查詢 ─
   說明：cnchar 以簡體字為主，部分繁體字（如陳、鄭）查不到；
         此表直接給出姓名學正確劃數，無需再套補正公式。
   ════════════════════════════════════════════════════════ */
const STROKE_DB = {
  // ── 常見姓氏（含偏旁補正後的姓名學劃數） ───────────────
  // 無需補正
  '林':8, '黃':12,'張':11,'李':7, '王':4, '吳':7, '劉':15,
  '楊':13,'許':11,'謝':17,'廖':14,'賴':16,'周':8, '徐':10,
  '呂':6, '何':7, '高':10,'羅':20,'孫':10,'朱':6, '盧':16,
  '簡':18,'鍾':17,'方':4, '余':7, '彭':12,'韓':17,'詹':13,
  '馬':10,'唐':10,'傅':12,'石':5, '丁':2, '施':9, '趙':14,
  '顏':18,'柯':9, '翁':10,'殷':10,'袁':10,'尤':4, '田':5,
  '任':6, '梁':11,'盧':16,'范':11,'康':11,'歐':15,'魏':18,
  '薛':19,'魯':15,'龔':22,'夏':10,'秦':10,'連':14,'丘':5,
  '萬':15,'湯':13,
  // 氵+1
  '洪':10,'江':7, '沈':8, '涂':11,'溫':14,'潘':16,'游':13,
  // 艹+2
  '蔡':17,'葉':15,'莊':13,'蘇':22,
  // 阝左（阜旁）+5：阝標準3劃→阜8劃，補正+5
  '陳':16,'陸':16,'陽':17,'陰':16,'隆':17,'阮':12,'阿':13,
  '隋':17,'陵':16,'院':15,'附':13,'階':17,'際':19,
  // 阝右（邑旁）+4：阝標準3劃→邑7劃，補正+4
  '郭':15,'鄭':19,'鄧':19,'邱':12,'邵':12,'鄒':19,'邦':9,
  '郁':13,'鄉':17,'都':15,'郎':14,

  // ── 常用名字字（無補正，直接用傳統楷書劃數） ───────────
  '一':1, '二':2, '三':3, '大':3, '中':4, '文':4, '天':4,
  '心':4, '月':4, '木':4, '水':4, '火':4, '日':4, '仁':4,
  '元':4, '友':4, '公':4, '少':4, '方':4, '之':4,
  '玉':5, '生':5, '平':5, '石':5, '白':5, '立':5, '世':5,
  '功':5, '以':5, '北':5, '司':5, '示':5, '禾':5, '弘':5, '永':5,
  '全':6, '安':6, '宇':6, '先':6, '合':6, '名':6,
  '年':6, '光':6, '向':6, '好':6, '有':6, '存':6, '妃':6,
  '成':7, '志':7, '佑':7, '佳':7, '宏':7, '君':7, '秀':7, '孝':7,
  '均':7, '伯':7, '克':7, '利':7, '助':7, '材':7,
  '明':8, '易':8, '昌':8, '宗':8, '典':8, '奇':8, '承':8,
  '佩':8, '坤':8, '協':8, '昀':8, '采':8, '享':8, '延':8,
  '彤':8, '忠':8, '亞':8,
  '政':9, '俊':9, '信':9, '保':9, '春':9, '星':9, '宣':9,
  '建':9, '思':9, '泉':9, '品':9, '昭':9, '皇':9, '相':9,
  '盈':9, '秋':9, '美':9, '泰':9,
  '真':10,'展':10,'恩':10,'書':10,'剛':10,'家':10,'純':10,
  '時':10,'特':10,'益':10,'起':10,'娜':10,'育':10,
  '國':11,'培':11,'堂':11,'婉':11,'崇':11,'得':11,'敏':11,
  '晨':11,'梅':11,'理':11,'現':11,'符':11,'章':11,'雪':11,
  '偉':11,'健':11,'彩':11,'問':11,'胡':11,'強':11,
  '富':12,'棟':12,'森':12,'智':12,'景':12,'晶':12,'翔':12,
  '雅':12,'喜':12,'傑':12,'欽':12,'發':12,'能':12,'迪':12,
  '意':13,'暉':13,'聖':13,'義':13,'詩':13,'照':13,'達':13,
  '頌':13,'煌':13,
  '嘉':14,'碧':14,'維':14,'豪':14,'榮':14,'毓':14,'誠':14,'壽':14,
  '德':15,'慶':15,'樂':15,'賢':15,'興':15,'寛':15,'逸':15,
  '燕':16,'錦':16,'靜':16,'曉':16,'樺':16,'諸':16,
  '戴':18,

  // ── 含氵補正的名字字（氵=4，已加+1） ───────────────────
  '汪':8, '沐':8, '沛':8, '沁':8, '沂':8, '泓':9, '泠':9,
  '泳':9, '洋':10,'洛':10,'洞':10,'浩':11,'浦':11,'涵':12,
  '淑':12,'淇':12,'淋':12,'淡':12,'深':12,'清':12,'湘':13,
  '漢':15,'海':11,'波':9, '添':12,'滋':13,'滿':15,'漂':15,
  '澤':17,'澄':16,'潔':16,'澳':16,'温':13,'淵':13,

  // ── 含忄補正的名字字（忄=4，已加+1） ───────────────────
  '怡':9, '性':9, '情':12,'惠':12,'慈':14,'悠':12,'慧':15,
  '忻':9, '悅':12,'恢':12,'恒':10,'惟':12,'慎':14,

  // ── 含礻補正的名字字（礻=5，已加+1） ───────────────────
  '祥':12,'祐':10,'祖':10,'福':14,'禎':14,'神':10,'祁':8,
  '祈':9, '禮':19,

  // ── 含玉旁補正的名字字（玉旁=5，已加+1） ───────────────
  '玲':10,'珍':10,'珠':11,'琪':13,'琬':13,'琳':13,'瑞':14,
  '瑤':15,'瑋':14,'瑄':14,'琴':13,'玫':8, '珮':11,'璇':17,
  '瑩':16,'璐':16,'璟':17,'瓊':20,'玨':9,

  // ── 含艹補正的名字字（艹=6，已加+2） ───────────────────
  '芝':8, '花':9, '芳':9, '英':11,'茂':10,'茜':12,'茵':12,
  '莉':13,'菁':14,'菲':14,'萍':14,'薇':18,'蘭':23,'菊':14,
  '蓉':17,'蒼':16,'蓁':16,'薰':19,'蘿':23,'荻':13,'藍':20,'蓮':17,
  '蕭':19,'藤':21,'蒲':16,

  // ── 含衤補正的名字字（衤=6，已加+1） ───────────────────
  '裕':13,'裴':14,
};

/* ════════════════════════════════════════════════════════
   取得姓名學筆劃數
   優先查 STROKE_DB；查不到才退回 cnchar + 偏旁補正表
   ════════════════════════════════════════════════════════ */

// 備用補正表（用於 STROKE_DB 未收錄、cnchar 能查到的字）
const CORRECTION = {
  '氵類': 0, // 個別字已在 STROKE_DB 處理
  // 如有遺漏的氵字，可在此新增：格式 '字': delta
};

function getStroke(char) {
  if (!char || !/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/.test(char)) return null;

  // ① 優先查預計算資料庫
  if (STROKE_DB[char] !== undefined) return STROKE_DB[char];

  // ② 退回 cnchar 查詢（處理資料庫未收錄的字）
  try {
    const raw = cnchar.stroke(char);
    const base = typeof raw === 'number' ? raw : (Array.isArray(raw) ? raw[0] : null);
    if (base == null || isNaN(base) || base < 1) return null;
    const delta = CORRECTION[char] ?? 0;
    return base + delta;
  } catch(e) {
    return null;
  }
}

/* ════════════════════════════════════════════════════════
   動力元素
   ════════════════════════════════════════════════════════ */
function calcDongli(ren, di) {
  const a = Math.floor(ren / 10) + (ren % 10);
  const b = Math.floor(di  / 10) + (di  % 10);
  let diff = Math.abs(a - b);
  while (diff > 4) diff = 9 - diff;
  return diff;
}

/* ════════════════════════════════════════════════════════
   五行對應（依末位數）
   ════════════════════════════════════════════════════════ */
function toWuxing(n) {
  const last = n % 10;
  if (last === 1 || last === 2) return '木 🌿';
  if (last === 3 || last === 4) return '火 🔥';
  if (last === 5 || last === 6) return '土 ⛰';
  if (last === 7 || last === 8) return '金 ✦';
  return '水 💧';
}

/* ════════════════════════════════════════════════════════
   主計算函式
   ════════════════════════════════════════════════════════ */
function calculate() {
  const chars = [
    document.getElementById('c1').value.trim(),
    document.getElementById('c2').value.trim(),
    document.getElementById('c3').value.trim()
  ];

  const strokes = chars.map(getStroke);

  // 更新筆劃卡
  const displayIds = ['d1','d2','d3'];
  const strokeIds  = ['s1','s2','s3'];
  let anyFilled = false;

  chars.forEach((ch, i) => {
    document.getElementById(displayIds[i]).textContent = ch || '—';
    document.getElementById(strokeIds[i]).textContent  = (strokes[i] !== null) ? strokes[i] : '—';
    if (ch) anyFilled = true;
  });

  const rs = document.getElementById('result-section');
  if (anyFilled) {
    rs.classList.add('visible');
    rs.classList.add('animate-in');
  } else {
    rs.classList.remove('visible');
  }

  if (strokes[0] !== null && strokes[1] !== null) {
    const s1 = strokes[0];
    const s2 = strokes[1];
    const s3 = strokes[2];           // null → 二字名
    const twoChar = s3 === null;

    const tian = s1 + 1;
    const ren  = s1 + s2;
    const di   = twoChar ? s2 + 1 : s2 + s3;   // 二字名：名+虛數1
    const wai  = twoChar ? 1       : s3 + 1;   // 二字名：虛數固定1
    const zong = twoChar ? s1 + s2 : s1 + s2 + s3;

    document.getElementById('w-tian').textContent   = tian;
    document.getElementById('w-ren').textContent    = ren;
    document.getElementById('w-di').textContent     = di;
    document.getElementById('w-wai').textContent    = wai;
    document.getElementById('w-zong').textContent   = zong;
    document.getElementById('w-dongli').textContent = calcDongli(ren, di);
    document.getElementById('wx-tian').textContent  = toWuxing(tian);
    document.getElementById('wx-ren').textContent   = toWuxing(ren);
    document.getElementById('wx-di').textContent    = toWuxing(di);
  } else {
    ['w-tian','w-ren','w-di','w-wai','w-zong','w-dongli'].forEach(id =>
      document.getElementById(id).textContent = '—');
    ['wx-tian','wx-ren','wx-di'].forEach(id =>
      document.getElementById(id).textContent = '');
  }
}

/* ════════════════════════════════════════════════════════
   主題切換
   ════════════════════════════════════════════════════════ */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
  localStorage.setItem('namestroke-theme', theme);
}

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

// 初始化：讀取已儲存主題
applyTheme(localStorage.getItem('namestroke-theme') || 'tech');

document.getElementById('btn-clear').addEventListener('click', () => {
  ['c1','c2','c3'].forEach(id => document.getElementById(id).value = '');
  calculate();
  document.getElementById('c1').focus();
});

/* ════════════════════════════════════════════════════════
   事件監聽
   ════════════════════════════════════════════════════════ */
['c1','c2','c3'].forEach(id => {
  const el = document.getElementById(id);
  let composing = false;

  // 輸入法開始組字（倉頡、注音、拼音...）
  el.addEventListener('compositionstart', () => { composing = true; });

  // 組字完成 → 取最後一個中文字，計算，跳格
  el.addEventListener('compositionend', function() {
    composing = false;
    const val = this.value.replace(/[^\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g, '');
    this.value = val.slice(-1);
    calculate();
    if (this.value && id !== 'c3') {
      document.getElementById(id === 'c1' ? 'c2' : 'c3').focus();
    }
  });

  // 直接貼字或非 IME 輸入（組字中則略過）
  el.addEventListener('input', function() {
    if (composing) return;
    const val = this.value.replace(/[^\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g, '');
    this.value = val.slice(-1);
    calculate();
    if (this.value && id !== 'c3') {
      document.getElementById(id === 'c1' ? 'c2' : 'c3').focus();
    }
  });
});
