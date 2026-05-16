#!/usr/bin/env node
/**
 * migrate-to-paragraphs.js
 * Convert content_cn/content_en to paragraphs: [{cn, en}, ...] array
 *
 * Case A: EN has \n\n and paragraph count ~ CN → pair by index
 * Case B: EN is single blob (no \n\n) → split by \n, distribute proportionally by CN length
 * Case C: EN has more paragraphs than CN → merge EN proportionally
 * Case D: EN too short or missing → empty en strings
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'articles.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));

function split(t, sep) {
  return (t || '').split(sep).map(s => s.trim()).filter(Boolean);
}

/**
 * Distribute M source items into N target groups, weighted by groupSizes.
 * Returns array of N strings (joined source items).
 */
function distributeByWeight(sources, targetCount, weights) {
  if (targetCount <= 0) return [];
  if (sources.length === 0) return Array(targetCount).fill('');
  if (targetCount >= sources.length) {
    // More targets than sources — pad with empty
    const result = sources.map(s => s);
    while (result.length < targetCount) result.push('');
    return result;
  }

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const result = [];
  let srcIdx = 0;

  for (let i = 0; i < targetCount; i++) {
    // How many sources this group gets
    const share = (i + 1) / targetCount * sources.length;
    const prevShare = i / targetCount * sources.length;
    let count = Math.round(share) - Math.round(prevShare);
    if (count < 1) count = 1;

    const chunk = sources.slice(srcIdx, srcIdx + count).join('\n\n');
    result.push(chunk);
    srcIdx += count;
  }

  // If we have leftover sources, append to last group
  while (srcIdx < sources.length) {
    result[result.length - 1] += '\n\n' + sources[srcIdx];
    srcIdx++;
  }

  return result;
}

/**
 * Detect and merge leading metadata lines (title, date, author) in EN content.
 * Metadata = first few short lines (< 80 chars) before a long content line.
 * These are merged into the first long content line so they don't create phantom paragraphs.
 */
function mergeLeadingMeta(lines) {
  if (lines.length <= 1) return lines;
  let metaEnd = 0;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    // Stop at first "long" line (> 80 chars) — that's real content
    if (lines[i].length > 80) break;
    metaEnd = i + 1;
  }
  if (metaEnd <= 0) return lines;
  // Merge lines[0..metaEnd-1] into lines[metaEnd] (first content line)
  const meta = lines.slice(0, metaEnd).join('\n');
  const result = [metaEnd < lines.length ? meta + '\n\n' + lines[metaEnd] : meta];
  result.push(...lines.slice(metaEnd + 1));
  return result;
}

/**
 * Merge M paragraphs into N groups proportionally.
 * Similar to distributeByWeight but operates on already-split paragraphs.
 */
function mergeToTarget(paragraphs, targetCount) {
  if (targetCount <= 0) return [];
  if (paragraphs.length <= targetCount) {
    const result = paragraphs.slice();
    while (result.length < targetCount) result.push('');
    return result;
  }

  const result = [];
  for (let i = 0; i < targetCount; i++) {
    const start = Math.round(i / targetCount * paragraphs.length);
    const end = Math.round((i + 1) / targetCount * paragraphs.length);
    result.push(paragraphs.slice(start, end).join('\n\n'));
  }
  return result;
}

let stats = { A: 0, B: 0, C: 0, D: 0 };

for (const article of data.articles) {
  const cnParas = split(article.content_cn, '\n\n');
  const enText = (article.content_en || '').trim();
  const enParasByNN = split(enText, '\n\n');
  const enLinesByN = split(enText, '\n');

  let paragraphs;
  let caseType;

  if (enText.length < 200) {
    // Case D: no useful EN
    paragraphs = cnParas.map(cn => ({ cn, en: '' }));
    caseType = 'D';
  } else if (enParasByNN.length >= 2 && Math.abs(cnParas.length - enParasByNN.length) <= Math.max(cnParas.length, 1) * 0.8) {
    // Case A: EN has \n\n and paragraph count is close to CN
    paragraphs = cnParas.map((cn, i) => ({ cn, en: enParasByNN[i] || '' }));
    // Pad if EN has more
    for (let i = cnParas.length; i < enParasByNN.length; i++) {
      paragraphs.push({ cn: '', en: enParasByNN[i] });
    }
    caseType = 'A';
  } else if (enParasByNN.length <= 1 && enLinesByN.length > 1) {
    // Case B: EN is blob (no \n\n), split by \n and distribute
    // First, merge leading metadata lines (title/date/author) into first content line
    const merged = mergeLeadingMeta(enLinesByN);
    const cnWeights = cnParas.map(p => p.length);
    const enGroups = distributeByWeight(merged, cnParas.length, cnWeights);
    paragraphs = cnParas.map((cn, i) => ({ cn, en: enGroups[i] || '' }));
    caseType = 'B';
  } else if (enParasByNN.length > cnParas.length * 1.5) {
    // Case C: EN has way more paragraphs than CN, merge EN down
    const enGroups = mergeToTarget(enParasByNN, cnParas.length);
    paragraphs = cnParas.map((cn, i) => ({ cn, en: enGroups[i] || '' }));
    caseType = 'C';
  } else {
    // Default: pair by index even if counts differ
    const maxLen = Math.max(cnParas.length, enParasByNN.length);
    paragraphs = [];
    for (let i = 0; i < maxLen; i++) {
      paragraphs.push({ cn: cnParas[i] || '', en: enParasByNN[i] || '' });
    }
    caseType = 'A';
  }

  article.paragraphs = paragraphs;
  stats[caseType]++;

  // Validate
  const cnCount = paragraphs.filter(p => p.cn).length;
  const enCount = paragraphs.filter(p => (p.en || '').trim()).length;
  console.log(`[${caseType}] ${article.id} "${article.title.substring(0, 30)}" → ${paragraphs.length} pairs (cn:${cnCount} en:${enCount})`);
}

// Write back
fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log(`\nDone! Stats: A=${stats.A} B=${stats.B} C=${stats.C} D=${stats.D}`);
