#!/usr/bin/env node
// 寓言发布前机械校对（proofread pass）
// 用法: node scripts/proofread-parable.js /tmp/parable_article_1.json [/tmp/parable_article_2.json ...]
//
// 自动修复（写回文件）:
//   - 英文注解标签 Annotation: → Note:（系列统一）
//   - 英文 em-dash 间距统一为 " — "
//   - 英文段落中残留的 CJK 字符删除（如注解里的中文夹注）
// 仅警告（需回灌重生成或人工修）:
//   - 英文对白使用单引号（系列统一双引号）
//   - 黑名单短语（跨篇重复的 AI 腔意象）
//   - 中文段落半角标点
//   - 「不是A，而是B」句式密度 > 1
// 退出码: 0 = 全部通过或已自动修复; 1 = 存在需重生成的警告
//
// 背景: 2026-09-14 双模型评审发现英文侧从未统稿（标签不一、夹注残留、
// 跨篇逐字重复意象），此脚本把机械可查项固化到发布前。

const fs = require('fs');

const BLACKLIST = [
  '手心全是汗', 'palms slick with sweat',
  '并非跳过', 'not skip it',
];
const CJK = /[一-鿿　-〿＀-￯]/;

let hasWarning = false;
const warn = (file, msg) => { hasWarning = true; console.log(`WARN [${file}] ${msg}`); };
const info = (file, msg) => console.log(`FIX  [${file}] ${msg}`);

for (const file of process.argv.slice(2)) {
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const paras = data.paragraphs || [];
  let changed = false;

  paras.forEach((p, i) => {
    const n = i + 1;
    // ── EN 自动修复 ──
    if (p.en) {
      let en = p.en;
      // 注解标签统一
      if (/^Annotation:/.test(en)) {
        en = en.replace(/^Annotation:/, 'Note:');
        info(file, `段${n} EN: Annotation: → Note:`);
      }
      // em-dash 间距统一
      const fixedDash = en.replace(/(?<=\S)—(?=\S)/g, ' — ').replace(/ {2,}—/g, ' —').replace(/— {2,}/g, '— ');
      if (fixedDash !== en) { en = fixedDash; info(file, `段${n} EN: em-dash 间距统一`); }
      // CJK 残留（英文段不应含中文；注解夹注是已知事故）
      if (CJK.test(en)) {
        const before = en;
        en = en.replace(/\s*\([^()]*[一-鿿][^()]*\)/g, ''); // 先删含中文的括号夹注
        if (CJK.test(en)) { warn(file, `段${n} EN 仍含中文字符，需人工处理: ${en.match(/.{0,20}[一-鿿]+.{0,20}/)[0]}`); }
        else info(file, `段${n} EN: 删除中文夹注`);
        if (en !== before) changed = true;
      }
      // 单引号对白（警告，不自动改——撇号会误伤）
      if (/'[A-Z][^']{10,}'/.test(en)) warn(file, `段${n} EN 对白疑似单引号，系列统一双引号`);
      if (en !== p.en) { p.en = en; changed = true; }
    }
    // ── CN 检查 ──
    if (p.cn) {
      if (/[,;:!?]/.test(p.cn.replace(/[a-zA-Z0-9σ_ℏ][^，。；：！？]*$/g, '')) && /[，。][^”」]*[,;]/.test(p.cn)) {
        // 粗查：中文语境中的半角逗号/分号（V5 的机械兜底）
        if (/[一-龥][,;][一-龥]/.test(p.cn)) warn(file, `段${n} CN 含半角标点`);
      }
      const neg = (p.cn.match(/不是[^。；]{1,20}[，——]+(?:而是|是)/g) || []).length
                + (p.cn.match(/并非[^。；]{1,20}[，——]+(?:而是|是)/g) || []).length;
      if (neg > 1) warn(file, `段${n} CN 「不是A而是B」句式 ${neg} 次（全篇限 1 次）`);
    }
    // ── 黑名单（跨篇重复意象） ──
    for (const b of BLACKLIST) {
      if ((p.cn || '').includes(b) || (p.en || '').includes(b)) warn(file, `段${n} 命中黑名单短语「${b}」`);
    }
  });

  // 注解标签 CN 侧统一「注解：」
  const last = paras[paras.length - 1];
  if (last && last.cn && !last.cn.startsWith('注解：')) warn(file, '末段 CN 应以「注解：」开头');

  if (changed) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    info(file, '已写回自动修复');
  }
}

if (hasWarning) {
  console.log('\n存在警告：将 WARN 列表回灌 writer prompt 重生成一次，或人工修正后再入库。');
  process.exit(1);
}
console.log('\n校对通过 ✓');
