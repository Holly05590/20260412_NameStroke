'use strict';
/**
 * 從 Unicode Unihan.zip 下載並解析 kRSKangXi 欄位，
 * 產生 unihan-rs.js — 康熙部首 + 剩餘筆劃查詢表。
 * 執行：node generate-unihan.js
 */
const https  = require('https');
const fs     = require('fs');
const path   = require('path');
const AdmZip = require('adm-zip');

const ZIP_URL  = 'https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip';
const ZIP_TMP  = path.join(__dirname, 'Unihan.zip');
const OUT_FILE = path.join(__dirname, 'unihan-rs.js');

const RANGES = [
  [0x3400, 0x4DBF],
  [0x4E00, 0x9FFF],
  [0xF900, 0xFAFF],
];
function inRange(cp) {
  return RANGES.some(([lo, hi]) => cp >= lo && cp <= hi);
}

// ── 康熙 214 部首筆劃數（索引 1–214）─────────────────────
const KANGXI_STROKES = [
  0,                                           // [0] 佔位
  1,1,1,1,1,1,                                 // 1–6
  2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,  // 7–29
  3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, // 30–60
  4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4, // 61–94
  5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5, // 95–117
  6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6, // 118–146
  7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,   // 147–166
  8,8,8,8,8,8,8,8,8,                           // 167–175
  9,9,9,9,9,9,9,9,9,9,9,                       // 176–186
  10,10,10,10,10,10,10,10,                      // 187–194
  11,11,11,11,11,11,                            // 195–200
  12,12,12,12,                                  // 201–204
  13,13,13,13,                                  // 205–208
  14,14,                                        // 209–210
  15,                                           // 211
  16,16,                                        // 212–213
  17                                            // 214
];

function downloadZip() {
  return new Promise((resolve, reject) => {
    console.log('Downloading Unihan.zip …');
    const file = fs.createWriteStream(ZIP_TMP);
    https.get(ZIP_URL, res => {
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      const total = parseInt(res.headers['content-length'] || '0');
      let received = 0;
      res.on('data', chunk => {
        received += chunk.length;
        if (total) process.stdout.write(`\r  ${(received/1024/1024).toFixed(1)} / ${(total/1024/1024).toFixed(1)} MB`);
      });
      res.pipe(file);
      file.on('finish', () => { console.log('\n  Done.'); resolve(); });
    }).on('error', reject);
  });
}

async function main() {
  // 下載 zip
  if (!fs.existsSync(ZIP_TMP)) {
    await downloadZip();
  } else {
    console.log('Unihan.zip already exists, skipping download.');
  }

  // 解壓並解析 Unihan_RadicalStrokeCounts.txt
  // kRSUnicode 在 Unihan_IRGSources.txt（Unicode 15.1+ 移除了 kRSKangXi）
  console.log('Extracting Unihan_IRGSources.txt …');
  const zip  = new AdmZip(ZIP_TMP);
  const entry = zip.getEntry('Unihan_IRGSources.txt');
  if (!entry) throw new Error('Unihan_IRGSources.txt not found in zip');
  const text  = entry.getData().toString('utf8');
  const lines = text.split('\n');

  console.log('Parsing kRSUnicode …');
  const result = {};
  for (const line of lines) {
    if (!line.startsWith('U+')) continue;
    const parts = line.split('\t');
    if (parts.length < 3 || parts[1] !== 'kRSUnicode') continue;

    const cp = parseInt(parts[0].slice(2), 16);
    if (!inRange(cp)) continue;

    // 可能有多個值，取第一個；部分帶星號（如 140*.3），去除
    const raw   = parts[2].trim().split(' ')[0].replace('*', '');
    const dot   = raw.indexOf('.');
    if (dot < 0) continue;
    const radical    = parseInt(raw.slice(0, dot), 10);
    const additional = parseInt(raw.slice(dot + 1), 10);
    if (isNaN(radical) || isNaN(additional) || radical < 1 || radical > 214) continue;

    result[cp.toString(16).toUpperCase()] = radical * 256 + additional;
  }

  const count = Object.keys(result).length;

  // 驗證幾個已知字
  const checks = [
    { char: '花', cp: 0x82B1, expect: 9 },
    { char: '陳', cp: 0x9673, expect: 16 },
    { char: '茉', cp: 0x8309, expect: 11 },
    { char: '玨', cp: 0x73A8, expect: 9 },
  ];
  console.log('\n── 驗證 ──');
  checks.forEach(({ char, cp, expect }) => {
    const hex    = cp.toString(16).toUpperCase();
    const packed = result[hex];
    if (packed === undefined) { console.log(`  ${char} (${hex}): 查無資料`); return; }
    const radical    = packed >> 8;
    const additional = packed & 0xFF;
    const strokes    = KANGXI_STROKES[radical] + additional;
    const ok = strokes === expect ? '✅' : '❌';
    console.log(`  ${ok} ${char}: 部首${radical}(${KANGXI_STROKES[radical]}劃) + ${additional} = ${strokes}  (預期 ${expect})`);
  });

  // 輸出 JS
  const entries = Object.entries(result)
    .sort(([a], [b]) => parseInt(a, 16) - parseInt(b, 16))
    .map(([k, v]) => `'${k}':${v}`)
    .join(',');

  const ksArr = KANGXI_STROKES.join(',');

  const output =
`'use strict';
/* ══════════════════════════════════════════════════════════
   Unihan kRSKangXi 查詢表（自動產生，請勿手動編輯）
   來源：Unicode Unihan_RadicalStrokeCounts.txt
   格式：UNIHAN_RS[hex碼點] = radical * 256 + additional_strokes
   共 ${count} 個漢字
   ══════════════════════════════════════════════════════════ */

// 康熙 214 部首的姓名學筆劃數（索引 1–214）
const KANGXI_STROKES=[${ksArr}];

// 漢字 → (部首編號 * 256 + 剩餘筆劃)
const UNIHAN_RS={${entries}};
`;

  fs.writeFileSync(OUT_FILE, output, 'utf8');
  const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
  console.log(`\n✅ Written ${count} entries → unihan-rs.js (${kb} KB)`);
}

main().catch(e => { console.error(e); process.exit(1); });
