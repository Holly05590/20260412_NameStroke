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
  '陸':16,'陽':17,'陰':16,'隆':17,'阮':12,'阿':13,
  '隋':17,'陵':16,'院':15,'附':13,'階':17,'際':19,
  // 阝右（邑旁）+4：阝標準3劃→邑7劃，補正+4
  '郭':15,'鄭':19,'鄧':19,'邱':12,'鄒':19,'邦':9,
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
  '瑩':16,'璐':16,'璟':17,'瓊':20, '瑛':14,'璞':16,
  '璽':18,

  // ── 含艹補正的名字字（艹=6，已加+2） ───────────────────
  '芝':8, '芳':9, '茉':11,'茱':12,'英':11,'茂':10,'茜':12,'茵':12,
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

// 部首 → 補正值（供 cnchar.radical 自動偵測使用）
const RADICAL_DELTA = {
  '水': 1, '氵': 1,   // 氵類
  '心': 1, '忄': 1,   // 忄類
  '手': 1, '扌': 1,   // 扌類
  '犬': 1, '犭': 1,   // 犭類
  '示': 1, '礻': 1,   // 礻類
  '玉': 1, '王': 1,    // 玉旁（cnchar 可能回傳 '玉' 或 '王'）
  '艸': 2, '艹': 2,   // 艹類
  '衣': 1, '衤': 1,   // 衤類
  '阜': 5,             // 阝左（阜旁）
  '邑': 4,             // 阝右（邑旁）
};

// 個別字手動補正（極少數 cnchar.radical 偵測不準的例外）
const CORRECTION = {};

// 回傳 { n: number|null, uncertain: boolean }
// uncertain=true 表示部首未識別，筆劃數可能需要人工確認
function getStroke(char) {
  if (!char || !/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/.test(char))
    return { n: null, uncertain: false };

  // ① 優先查預計算資料庫（已人工核對，確定正確）
  if (STROKE_DB[char] !== undefined)
    return { n: STROKE_DB[char], uncertain: false };

  // ② Unihan kRSUnicode：部首筆劃（康熙全形）+ 剩餘筆劃，自動涵蓋所有偏旁補正
  if (typeof UNIHAN_RS !== 'undefined') {
    const hex = char.codePointAt(0).toString(16).toUpperCase();
    if (UNIHAN_RS[hex] !== undefined) {
      const packed     = UNIHAN_RS[hex];
      const radical    = packed >> 8;
      const additional = packed & 0xFF;
      return { n: KANGXI_STROKES[radical] + additional, uncertain: false };
    }
  }

  // ③ 最終退回 cnchar（處理 Unihan 未收錄的極少數字）
  try {
    const raw = cnchar.stroke(char);
    const base = typeof raw === 'number' ? raw : (Array.isArray(raw) ? raw[0] : null);
    if (base == null || isNaN(base) || base < 1) return { n: null, uncertain: false };

    let delta = CORRECTION[char] ?? null;
    let uncertain = false;

    if (delta === null) {
      try {
        const rad = typeof cnchar.radical === 'function' ? cnchar.radical(char) : null;
        const radStr = typeof rad === 'string' ? rad : (Array.isArray(rad) ? rad[0] : null);
        if (radStr) {
          delta = RADICAL_DELTA[radStr] ?? 0;
          // 部首找到但不在補正表 → delta=0，一般正確；不標示不確定
        } else {
          delta = 0;
          uncertain = true; // 部首完全讀不到，偏旁補正可能遺漏
        }
      } catch(_) {
        delta = 0;
        uncertain = true;
      }
    }
    return { n: base + delta, uncertain };
  } catch(e) {
    return { n: null, uncertain: false };
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

function toWuxingElem(n) {
  const last = n % 10;
  if (last === 1 || last === 2) return '木';
  if (last === 3 || last === 4) return '火';
  if (last === 5 || last === 6) return '土';
  if (last === 7 || last === 8) return '金';
  return '水';
}

// 回傳 { cls, symbol }；a=上方格，b=下方格，箭頭方向反映生剋流向
function relInfo(a, b) {
  if (!a || !b) return null;
  const sheng = { '木':'火', '火':'土', '土':'金', '金':'水', '水':'木' };
  const ke    = { '木':'土', '土':'水', '水':'火', '火':'金', '金':'木' };
  if (a === b) return { cls: 'rel-bi', symbol: '‖' };
  if (sheng[a] === b) return { cls: 'rel-sheng', symbol: '▽' }; // a生b → 向下
  if (sheng[b] === a) return { cls: 'rel-sheng', symbol: '△' }; // b生a → 向上
  if (ke[a] === b)    return { cls: 'rel-ke',    symbol: '▼' }; // a克b → 向下
  if (ke[b] === a)    return { cls: 'rel-ke',    symbol: '▲' }; // b克a → 向上
  return null;
}

function setWuxing(id, wuxingStr) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = wuxingStr || '';
}

let _arrowConfig = [];

function applyRelArrow(arrowId, sq1Id, sq2Id, rel) {
  const arrow = document.getElementById(arrowId);
  if (!arrow) return;
  if (!rel) { arrow.hidden = true; return; }
  const sq1 = document.getElementById(sq1Id);
  const sq2 = document.getElementById(sq2Id);
  const container = document.getElementById('result-section');
  if (!sq1 || !sq2 || !container) { arrow.hidden = true; return; }
  const cRect  = container.getBoundingClientRect();
  const s1Rect = sq1.getBoundingClientRect();
  const s2Rect = sq2.getBoundingClientRect();
  const midY = (s1Rect.bottom + s2Rect.top) / 2 - cRect.top;
  const midX = (s1Rect.left  + s1Rect.right)  / 2 - cRect.left;
  arrow.style.left  = midX + 'px';
  arrow.style.top   = midY + 'px';
  arrow.className   = `wx-between-arrow ${rel.cls}`;
  arrow.textContent = rel.symbol;
  arrow.hidden = false;
}

function positionRelArrows() {
  _arrowConfig.forEach(([arrowId, sq1Id, sq2Id, rel]) =>
    applyRelArrow(arrowId, sq1Id, sq2Id, rel));
}

window.addEventListener('resize', positionRelArrows);

/* ════════════════════════════════════════════════════════
   主計算函式
   ════════════════════════════════════════════════════════ */
function calculate() {
  const chars = [
    document.getElementById('c1').value.trim(),
    document.getElementById('c2').value.trim(),
    document.getElementById('c3').value.trim()
  ];

  const results   = chars.map(getStroke);
  const strokes   = results.map(r => r.n);
  const uncertains = results.map(r => r.uncertain);

  // 更新筆劃卡
  const displayIds = ['d1','d2','d3'];
  const strokeIds  = ['s1','s2','s3'];
  let anyFilled    = false;
  let anyUncertain = false;

  chars.forEach((ch, i) => {
    document.getElementById(displayIds[i]).textContent = ch || '—';
    const el = document.getElementById(strokeIds[i]);
    if (strokes[i] !== null) {
      if (ch && uncertains[i]) {
        el.innerHTML = strokes[i] + '<sup class="uncertain-mark">＊</sup>';
        anyUncertain = true;
      } else {
        el.textContent = strokes[i];
      }
    } else {
      el.textContent = '—';
    }
    if (ch) anyFilled = true;
  });

  const warnEl = document.getElementById('uncertain-warning');
  if (warnEl) warnEl.style.display = anyUncertain ? 'block' : 'none';

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
    const tianElem = toWuxingElem(tian);
    const renElem  = toWuxingElem(ren);
    const diElem   = toWuxingElem(di);
    setWuxing('wx-tian', toWuxing(tian));
    setWuxing('wx-ren',  toWuxing(ren));
    setWuxing('wx-di',   toWuxing(di));
    _arrowConfig = [
      ['wx-arrow-1', 'wx-tian', 'wx-ren', relInfo(tianElem, renElem)],
      ['wx-arrow-2', 'wx-ren',  'wx-di',  relInfo(renElem,  diElem)],
    ];
    requestAnimationFrame(positionRelArrows);
    drawLiuyunChart(zong % 10, getBirthAge());
  } else {
    ['w-tian','w-ren','w-di','w-wai','w-zong','w-dongli'].forEach(id =>
      document.getElementById(id).textContent = '—');
    ['wx-tian','wx-ren','wx-di'].forEach(id =>
      document.getElementById(id).textContent = '');
    _arrowConfig = [];
    ['wx-arrow-1','wx-arrow-2'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.hidden = true;
    });
    drawLiuyunChart(null, getBirthAge());
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

/* ════════════════════════════════════════════════════════
   出生日期 → 年齡
   ════════════════════════════════════════════════════════ */
// 民國虛歲：出生那年算 1 歲，每到「生日後半年」歲數切換點再加 1
// 切換點 = 生日月日 + 6 個月；到達切換點當天，「年齡年份」進為下一民國年
// 公式：age = ageYear - birthROC + 1
// 例：62年4月5日出生，今日 115年5月13日（未到 10月5日切換點）
//   → ageYear = 115，age = 115 - 62 + 1 = 54
function calcAge(rocYear, month, day) {
  const now = new Date();
  const gy  = now.getFullYear();
  const gm  = now.getMonth() + 1;
  const gd  = now.getDate();

  let hm = month + 6;
  if (hm > 12) hm -= 12;

  const rocNow  = gy - 1911;
  // 今日 MMDD >= 切換點 MMDD → 年齡年份進到下一民國年
  const ageYear = (gm * 100 + gd) >= (hm * 100 + day)
    ? rocNow + 1
    : rocNow;

  return ageYear - rocYear + 1;
}

function getBirthAge() {
  const y = parseInt(document.getElementById('b-year')?.value);
  const m = parseInt(document.getElementById('b-month')?.value);
  const d = parseInt(document.getElementById('b-day')?.value);
  if (!y || !m || !d || y < 1 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  return calcAge(y, m, d);
}

/* ════════════════════════════════════════════════════════
   流年運程圖（SVG）
   ════════════════════════════════════════════════════════ */
// zongDigit：命宮個位數 (0–9)，null 不顯示數字
// age：年齡，null 不顯示年齡徽章及高亮
function drawLiuyunChart(zongDigit, age) {
  const container = document.getElementById('liuyun-chart');
  if (!container) return;

  const CX = 250, CY = 250;
  const RO = 215;  // 外圓
  const RM = 172;  // 中環（數字 ↔ 名稱 分界）
  const RI = 135;  // 內環（名稱 ↔ 星芒 分界）
  const RS = 108;  // 星芒尖端
  const RC = 33;   // 星芒內凹
  const RK = 26;   // 中心圓

  const rName = (RM + RI) / 2;  // 階段名稱置中半徑
  const rNum  = (RO + RM) / 2;  // 流年數字置中半徑

  function pt(r, a) {
    const rad = (90 + a) * Math.PI / 180;
    return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
  }
  function lx(r, a) { return pt(r, a)[0].toFixed(2); }
  function ly(r, a) { return pt(r, a)[1].toFixed(2); }
  function xy(r, a) { return lx(r,a) + ',' + ly(r,a); }

  const stages = [
    { label: '胎',   angle:   0 },
    { label: '養',   angle:  36 },
    { label: '長生', angle:  72 },
    { label: '冠帶', angle: 108 },
    { label: '臨官', angle: 144 },
    { label: '帝旺', angle: 180 },
    { label: '衰',   angle: 216 },
    { label: '病',   angle: 252 },
    { label: '死',   angle: 288 },
    { label: '絕',   angle: 324 },
  ];
  // 冠帶在 stages[3]，公式：(zongDigit + i - 3 + 10) % 10
  const KUANDAI_IDX = 3;

  const bounds    = [342, 18, 54, 90, 126, 162, 198, 234, 270, 306];
  const degLabels = [0, 18, 54, 90, 126, 162, 180, 198, 234, 270, 306, 342];

  // 扇形弧形路徑（環狀扇形）：從 a1 沿 chart CCW（SVG CW）到 a2
  function annularSector(r1, r2, a1, a2) {
    const f = n => n.toFixed(2);
    const [x1, y1] = pt(r2, a1);
    const [x2, y2] = pt(r2, a2);
    const [x3, y3] = pt(r1, a2);
    const [x4, y4] = pt(r1, a1);
    return `M${f(x1)},${f(y1)} A${r2},${r2},0,0,1,${f(x2)},${f(y2)} L${f(x3)},${f(y3)} A${r1},${r1},0,0,0,${f(x4)},${f(y4)} Z`;
  }

  let s = `<svg viewBox="-15 -15 530 530" xmlns="http://www.w3.org/2000/svg" class="liuyun-svg">`;

  // 三個同心圓：外/內圈用 ink，中環（數字分界）用 primary
  s += `<circle cx="${CX}" cy="${CY}" r="${RO}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
  s += `<circle cx="${CX}" cy="${CY}" r="${RM}" fill="none" stroke="var(--primary)" stroke-width="1" opacity="0.6"/>`;
  s += `<circle cx="${CX}" cy="${CY}" r="${RI}" fill="none" stroke="currentColor" stroke-width="1"/>`;

  // 年齡對應格高亮（扇形底色，畫在分隔線之前）
  if (zongDigit != null && age != null) {
    const ageDigit  = ((age % 10) + 10) % 10;
    const matchIdx  = (ageDigit - zongDigit + KUANDAI_IDX + 10) % 10;
    const a1 = stages[matchIdx].angle - 18;
    const a2 = stages[matchIdx].angle + 18;
    s += `<path d="${annularSector(RI, RO, a1, a2)}" fill="var(--primary)" opacity="0.22"/>`;
  }

  // 10 個扇形分隔線（RI → RO）
  bounds.forEach(a => {
    s += `<line x1="${lx(RI,a)}" y1="${ly(RI,a)}" x2="${lx(RO,a)}" y2="${ly(RO,a)}" stroke="currentColor" stroke-width="1"/>`;
  });

  // 十字虛線（0/180° 及 90/270°），用 primary 色
  [[0,180],[90,270]].forEach(([a1,a2]) => {
    s += `<line x1="${lx(RO,a1)}" y1="${ly(RO,a1)}" x2="${lx(RO,a2)}" y2="${ly(RO,a2)}" stroke="var(--primary)" stroke-width="1" stroke-dasharray="5,4" opacity="0.45"/>`;
  });

  // 階段名稱（內環 RI–RM）
  const F = `font-family="Noto Sans TC,sans-serif" fill="currentColor" text-anchor="middle" dominant-baseline="middle"`;
  stages.forEach(({ label, angle }) => {
    const [x, y] = pt(rName, angle);
    if (label.length === 2) {
      s += `<text x="${x.toFixed(2)}" y="${(y-8).toFixed(2)}" font-size="13" ${F}>${label[0]}</text>`;
      s += `<text x="${x.toFixed(2)}" y="${(y+8).toFixed(2)}" font-size="13" ${F}>${label[1]}</text>`;
    } else {
      s += `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" font-size="15" ${F}>${label}</text>`;
    }
  });

  // 流年數字（外環 RM–RO），有命宮個位數時才顯示
  if (zongDigit != null) {
    const FN = `font-family="Noto Sans TC,sans-serif" text-anchor="middle" dominant-baseline="middle" font-weight="700"`;
    stages.forEach(({ angle }, i) => {
      const val = (zongDigit + i - KUANDAI_IDX + 10) % 10;
      const [x, y] = pt(rNum, angle);
      s += `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" font-size="17" fill="var(--primary)" ${FN}>${val}</text>`;
    });
  }

  // 度數標籤（外圓外側）
  degLabels.forEach(a => {
    const [x, y] = pt(RO + 22, a);
    s += `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" font-size="11" font-family="sans-serif" fill="currentColor" text-anchor="middle" dominant-baseline="middle" opacity="0.75">${a}°</text>`;
  });

  // 4 芒星 + 中心圓鏤空（evenodd）
  const starPath = [0, 45, 90, 135, 180, 225, 270, 315].map((a, i) =>
    (i === 0 ? 'M' : 'L') + xy(i % 2 === 0 ? RS : RC, a)
  ).join(' ') + 'Z';
  const H = RK;
  const hole = `M${(CX+H).toFixed(2)},${CY} A${H},${H},0,1,0,${(CX-H).toFixed(2)},${CY} A${H},${H},0,1,0,${(CX+H).toFixed(2)},${CY} Z`;
  // 星芒用 accent 色，中心圓外框也用 accent
  s += `<path d="${starPath} ${hole}" fill-rule="evenodd" fill="var(--accent)"/>`;
  s += `<circle cx="${CX}" cy="${CY}" r="${RK}" fill="none" stroke="var(--accent)" stroke-width="1.5"/>`;

  // 年齡徽章（右上角，外圓之外）
  if (age != null) {
    const bx = 434, by = 12, bw = 72, bh = 54, mx = bx + bw / 2;
    const FA = `font-family="Noto Sans TC,sans-serif" fill="var(--primary)" text-anchor="middle"`;
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" fill="var(--primary)" opacity="0.1"/>`;
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" fill="none" stroke="var(--primary)" stroke-width="1" opacity="0.35"/>`;
    s += `<text x="${mx}" y="${by + 15}" dominant-baseline="middle" font-size="10" font-family="sans-serif" fill="var(--primary)" text-anchor="middle" opacity="0.8">年 齡</text>`;
    s += `<text x="${mx - 4}" y="${by + 38}" dominant-baseline="middle" font-size="24" font-weight="700" ${FA}>${age}</text>`;
    s += `<text x="${bx + bw - 6}" y="${by + 46}" dominant-baseline="middle" font-size="10" font-family="sans-serif" fill="var(--primary)" text-anchor="middle">歲</text>`;
  }

  s += `</svg>`;
  container.innerHTML = s;
}

drawLiuyunChart();

document.getElementById('btn-clear').addEventListener('click', () => {
  ['c1','c2','c3'].forEach(id => document.getElementById(id).value = '');
  ['b-year','b-month','b-day'].forEach(id => document.getElementById(id).value = '');
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

// 出生日期變更 → 重繪流年圖（不重新計算五格）
['b-year', 'b-month', 'b-day'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    const zongText = document.getElementById('w-zong')?.textContent ?? '—';
    const zong = parseInt(zongText);
    drawLiuyunChart(isNaN(zong) ? null : zong % 10, getBirthAge());
  });
});
