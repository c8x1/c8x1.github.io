#!/usr/bin/env node
/**
 * 寓言概念池与双模型（Claude Opus / Gemini）协作控制脚本
 *
 * 子命令:
 *   stats
 *   pick       --model <claude|gemini> [--date YYYY-MM-DD] [--dry-run]
 *   save-brief --file <brief.json>
 *   ingest     --file <parable.json> --model <claude|gemini> --concept "<en>" [--date YYYY-MM-DD] [--motifs "m1|m2|m3"] [--skip-build]
 *   refill     --file <concepts.json>
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SITE_DIR = path.resolve(__dirname, '..');
const POOL_PATH = path.join(SITE_DIR, 'concept-pool.json');
const QUEUE_PATH = path.join(SITE_DIR, 'parable-queue.json');
const BRIEFS_PATH = path.join(SITE_DIR, 'concept-briefs.json');
const ARTICLES_PATH = path.join(SITE_DIR, 'articles.json');
const PROOFREAD_SCRIPT = path.join(__dirname, 'proofread-parable.js');
const BUILD_SCRIPT = path.join(SITE_DIR, 'build-all.js');

const PERSPECTIVES = ['全知旁观', '第一人称亲历', '对话体', '倒叙揭示'];
const MODELS = {
  claude: {
    key: 'claude',
    displayName: 'Claude Opus',
    subtitle: '寓言故事 · Claude Opus',
    author: 'Claude Opus · AI Parable',
    tag: 'Claude Opus',
  },
  gemini: {
    key: 'gemini',
    displayName: 'Gemini',
    subtitle: '寓言故事 · Gemini',
    author: 'Gemini · AI Parable',
    tag: 'Gemini',
  },
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJson(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf-8');
}

function todayLocal() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function normalizeConcept(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/^the\s+/i, '')
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ');
}

function slugify(enTitle) {
  return String(enTitle || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/-$/, '');
}

function parseArgs(argv) {
  const cmd = argv[0];
  const opts = {};
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        opts[key] = true;
      } else {
        opts[key] = next;
        i++;
      }
    }
  }
  return { cmd, opts };
}

function resolveModel(modelArg) {
  const k = String(modelArg || '').toLowerCase();
  if (k === 'claude' || k === 'opus' || k === 'claude-opus') return MODELS.claude;
  if (k === 'gemini' || k === 'antigravity') return MODELS.gemini;
  throw new Error(`Invalid --model "${modelArg}". Use "claude" or "gemini".`);
}

function isParable(a) {
  return Array.isArray(a.category) && a.category.includes('寓言故事');
}

function detectArticleModelKey(a) {
  const tags = a.tags || [];
  const author = a.author || '';
  const sub = a.subtitle || '';
  if (tags.includes('Gemini') || /Gemini/i.test(author) || /Gemini/i.test(sub)) return 'gemini';
  if (tags.includes('Claude Opus') || /Claude/i.test(author) || /Claude/i.test(sub)) return 'claude';
  return null;
}

function extractNamesFromParagraph(cn) {
  const names = new Set();
  if (!cn) return [];
  // Pattern: 中文名（English Name）
  const parenRe = /([\u4e00-\u9fa5]{1,4})（([A-Z][A-Za-z' -]{1,30})）/g;
  let m;
  while ((m = parenRe.exec(cn)) !== null) {
    const cleanCn = m[1].replace(/^(?:的|名叫|叫做|建筑师|筑师|船长|记者|船主|文书|老|小)/, '');
    names.add(`${cleanCn || m[1]}（${m[2]}）`);
  }
  // Pattern: single-char Chinese surname + honorific
  const titleRe = /(?:^|[，。；：「」\s的])([\u4e00-\u9fa5])(?:姑娘|师傅|娘子|老太爷|木匠|先生|同志|船长|老板|阿婆|大夫|管事|掌柜)/g;
  while ((m = titleRe.exec(cn)) !== null) {
    if (!/^[这那老小大新旧每各某女男上押的了着过]$/.test(m[1])) names.add(m[1]);
  }
  return [...names];
}

function computeHistoryMap(pool, articles) {
  // Build alias -> canonical concept index
  const aliasToConcept = new Map();
  for (const item of pool.concepts) {
    const keys = [item.concept, item.concept_cn, ...(item.aliases || [])];
    for (const k of keys) {
      if (k) aliasToConcept.set(normalizeConcept(k), item.concept);
    }
  }

  const stats = new Map();
  for (const item of pool.concepts) {
    stats.set(item.concept, { count: 0, lastDate: '', titles: [] });
  }

  const parables = articles.filter(isParable);
  for (const a of parables) {
    const tags = (a.tags || []).filter(
      t => !['Amanda Askell', '寓言故事', 'Gemini', 'Claude Opus'].includes(t)
    );
    const matched = new Set();
    for (const t of tags) {
      const canonical = aliasToConcept.get(normalizeConcept(t));
      if (canonical) matched.add(canonical);
    }
    for (const canonical of matched) {
      const st = stats.get(canonical);
      st.count++;
      if ((a.date || '') > st.lastDate) st.lastDate = a.date || '';
      st.titles.push(`${a.date}:${a.title}`);
    }
  }
  return { stats, aliasToConcept, parables };
}

function findCachedBrief(briefsObj, concept) {
  const briefs = briefsObj.briefs || {};
  if (briefs[concept]) return briefs[concept];
  const target = normalizeConcept(concept);
  for (const [k, v] of Object.entries(briefs)) {
    if (normalizeConcept(k) === target) return v;
  }
  return null;
}

function cleanupOldClaims(queue, keepDays = 7) {
  if (!queue.dailyClaims || typeof queue.dailyClaims !== 'object') {
    queue.dailyClaims = {};
    return;
  }
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - keepDays);
  const cutoffStr = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, '0')}-${String(cutoff.getDate()).padStart(2, '0')}`;
  for (const d of Object.keys(queue.dailyClaims)) {
    if (d < cutoffStr) delete queue.dailyClaims[d];
  }
}

function cmdStats() {
  const pool = readJson(POOL_PATH);
  const articlesData = readJson(ARTICLES_PATH);
  const briefs = readJson(BRIEFS_PATH);
  const queue = readJson(QUEUE_PATH);
  const { stats, parables } = computeHistoryMap(pool, articlesData.articles);

  let unused = 0, once = 0, twice = 0, threePlus = 0;
  const byDomain = {};
  for (const item of pool.concepts) {
    const st = stats.get(item.concept);
    if (st.count === 0) unused++;
    else if (st.count === 1) once++;
    else if (st.count === 2) twice++;
    else threePlus++;

    if (!byDomain[item.domain]) byDomain[item.domain] = { total: 0, unused: 0 };
    byDomain[item.domain].total++;
    if (st.count === 0) byDomain[item.domain].unused++;
  }

  const threshold = pool.refillThreshold || 20;
  console.log(`=== Parable Concept Pool Stats ===`);
  console.log(`Total concepts in pool : ${pool.concepts.length}`);
  console.log(`  Never used (0x)      : ${unused} ${unused < threshold ? '⚠️  NEEDS REFILL' : '✓'}`);
  console.log(`  Used 1x              : ${once}`);
  console.log(`  Used 2x              : ${twice}`);
  console.log(`  Used 3x+             : ${threePlus}`);
  console.log(`Manual queue length    : ${(queue.queue || []).length}`);
  console.log(`Cached briefs          : ${Object.keys(briefs.briefs || {}).length}`);
  console.log(`Total parables written : ${parables.length}`);
  console.log(`\nBy domain (unused / total):`);
  for (const [dom, info] of Object.entries(byDomain)) {
    const label = (pool.domains && pool.domains[dom]) || dom;
    console.log(`  ${dom.padEnd(12)} (${label.padEnd(8)}): ${String(info.unused).padStart(3)} / ${String(info.total).padStart(3)}`);
  }

  console.log(`\nRecent 8 parables:`);
  parables.slice(-8).forEach(a => {
    const m = detectArticleModelKey(a) || 'legacy';
    console.log(`  ${a.date} | ${m.padEnd(6)} | ${a.title} | ${(a.tags || [])[0] || ''}`);
  });
}

function cmdPick(opts) {
  const model = resolveModel(opts.model);
  const date = opts.date || todayLocal();
  const dryRun = Boolean(opts['dry-run']);

  const pool = readJson(POOL_PATH);
  const queue = readJson(QUEUE_PATH);
  const briefs = readJson(BRIEFS_PATH);
  const articlesData = readJson(ARTICLES_PATH);
  const { stats, aliasToConcept, parables } = computeHistoryMap(pool, articlesData.articles);

  // 1. Idempotency check: did this model already publish a parable on `date`?
  const todayParables = parables.filter(a => a.date === date);
  const existingForModel = todayParables.find(a => detectArticleModelKey(a) === model.key);
  if (existingForModel) {
    console.log(JSON.stringify({
      status: 'already_done',
      date,
      model,
      existing: {
        id: existingForModel.id,
        title: existingForModel.title,
        file: existingForModel.file,
        tags: existingForModel.tags,
      },
    }, null, 2));
    return;
  }

  cleanupOldClaims(queue);
  const todayClaims = queue.dailyClaims[date] || {};
  const otherModelKey = model.key === 'claude' ? 'gemini' : 'claude';

  // Inspect what the other model already published or claimed today
  const otherPublished = todayParables.find(a => detectArticleModelKey(a) === otherModelKey) || null;
  const otherClaim = todayClaims[otherModelKey] || null;

  const takenConceptsNorm = new Set();
  const takenDomains = new Set();
  let otherPerspective = null;
  let sameDayOther = null;

  if (otherPublished) {
    const rawConcept = (otherPublished.tags || []).find(
      t => !['Amanda Askell', '寓言故事', 'Gemini', 'Claude Opus'].includes(t)
    );
    const canon = rawConcept ? (aliasToConcept.get(normalizeConcept(rawConcept)) || rawConcept) : null;
    if (canon) {
      takenConceptsNorm.add(normalizeConcept(canon));
      const pItem = pool.concepts.find(c => c.concept === canon);
      if (pItem) takenDomains.add(pItem.domain);
    }
    const otherNames = [];
    for (const p of (otherPublished.paragraphs || []).slice(0, 3)) {
      otherNames.push(...extractNamesFromParagraph(p.cn));
    }
    sameDayOther = {
      model: otherModelKey,
      concept: canon,
      title: otherPublished.title,
      names: [...new Set(otherNames)],
    };
  }
  if (otherClaim) {
    if (otherClaim.concept) takenConceptsNorm.add(normalizeConcept(otherClaim.concept));
    if (otherClaim.domain) takenDomains.add(otherClaim.domain);
    if (otherClaim.perspective) otherPerspective = otherClaim.perspective;
    if (!sameDayOther) {
      sameDayOther = {
        model: otherModelKey,
        concept: otherClaim.concept,
        concept_cn: otherClaim.concept_cn,
        domain: otherClaim.domain,
        perspective: otherClaim.perspective,
      };
    }
  }

  // Recent 2 days domains (soft avoidance for cross-day variety)
  const recentDomains = new Set();
  for (const a of parables.slice(-4)) {
    for (const t of (a.tags || [])) {
      const canon = aliasToConcept.get(normalizeConcept(t));
      if (canon) {
        const pItem = pool.concepts.find(c => c.concept === canon);
        if (pItem) recentDomains.add(pItem.domain);
      }
    }
  }

  // 2. Reuse existing un-ingested claim for this date+model if present
  let chosen = null;
  let source = 'pool';
  let perspective = null;
  let queueChanged = false;

  const existingClaim = todayClaims[model.key];
  if (existingClaim && !existingClaim.ingested && existingClaim.concept) {
    const poolItem = pool.concepts.find(c => normalizeConcept(c.concept) === normalizeConcept(existingClaim.concept));
    chosen = poolItem || {
      concept: existingClaim.concept,
      concept_cn: existingClaim.concept_cn || '',
      domain: existingClaim.domain || 'custom',
    };
    source = existingClaim.source || 'claim';
    perspective = existingClaim.perspective || PERSPECTIVES[(queue.perspectiveCursor || 0) % PERSPECTIVES.length];
  } else {
    // 3. Manual queue first (admin.html)
    const manualQueue = Array.isArray(queue.queue) ? queue.queue : [];
    const qIdx = manualQueue.findIndex(
      q => q && q.concept && !takenConceptsNorm.has(normalizeConcept(q.concept))
    );
    if (qIdx !== -1) {
      const qItem = manualQueue[qIdx];
      const poolItem = pool.concepts.find(c => normalizeConcept(c.concept) === normalizeConcept(qItem.concept));
      chosen = {
        concept: poolItem ? poolItem.concept : qItem.concept,
        concept_cn: qItem.concept_cn || (poolItem ? poolItem.concept_cn : ''),
        domain: poolItem ? poolItem.domain : 'custom',
      };
      source = 'queue';
      if (!dryRun) {
        manualQueue.splice(qIdx, 1);
        queue.queue = manualQueue;
        queueChanged = true;
      }
    } else {
      // 4. Pick from concept-pool.json: lowest history_count -> different domain today -> avoid recent 2 days domain -> oldest lastDate
      const candidates = pool.concepts
        .filter(c => !takenConceptsNorm.has(normalizeConcept(c.concept)))
        .map(c => ({ ...c, _st: stats.get(c.concept) || { count: 0, lastDate: '' } }));

      if (!candidates.length) {
        throw new Error('Concept pool has no available candidates.');
      }

      const minCount = Math.min(...candidates.map(c => c._st.count));
      let tier = candidates.filter(c => c._st.count === minCount);

      const diffTodayDomain = tier.filter(c => !takenDomains.has(c.domain));
      if (diffTodayDomain.length > 0) tier = diffTodayDomain;

      const diffRecentDomain = tier.filter(c => !recentDomains.has(c.domain));
      if (diffRecentDomain.length > 0) tier = diffRecentDomain;

      // Sort by oldest lastDate ascending; tie-break randomly among oldest
      tier.sort((a, b) => (a._st.lastDate || '').localeCompare(b._st.lastDate || ''));
      const oldestDate = tier[0]._st.lastDate || '';
      const bestTier = tier.filter(c => (c._st.lastDate || '') === oldestDate);
      chosen = bestTier[Math.floor(Math.random() * bestTier.length)];
      source = 'pool';
    }

    // Perspective selection: rotate cursor and avoid other model's perspective today
    let cursor = Number.isInteger(queue.perspectiveCursor) ? queue.perspectiveCursor : 0;
    perspective = PERSPECTIVES[cursor % PERSPECTIVES.length];
    if (otherPerspective && perspective === otherPerspective) {
      cursor = (cursor + 1) % PERSPECTIVES.length;
      perspective = PERSPECTIVES[cursor % PERSPECTIVES.length];
    }
    const nextCursor = (cursor + 1) % PERSPECTIVES.length;

    if (!dryRun) {
      queue.perspectiveCursor = nextCursor;
      queue.dailyClaims[date] = queue.dailyClaims[date] || {};
      queue.dailyClaims[date][model.key] = {
        concept: chosen.concept,
        concept_cn: chosen.concept_cn,
        domain: chosen.domain,
        perspective,
        source,
        claimedAt: new Date().toISOString(),
        ingested: false,
      };
      queueChanged = true;
    }
  }

  if (queueChanged && !dryRun) {
    writeJson(QUEUE_PATH, queue);
  }

  // Collect recent names from last 8 parables (+ today's other parable)
  const recentNamesSet = new Set();
  for (const a of parables.slice(-8)) {
    for (const p of (a.paragraphs || []).slice(0, 3)) {
      for (const n of extractNamesFromParagraph(p.cn)) recentNamesSet.add(n);
    }
  }
  if (sameDayOther && Array.isArray(sameDayOther.names)) {
    for (const n of sameDayOther.names) recentNamesSet.add(n);
  }

  const unusedCount = pool.concepts.filter(c => (stats.get(c.concept)?.count || 0) === 0).length;
  const refillThreshold = pool.refillThreshold || 20;
  const historyStat = stats.get(chosen.concept) || { count: 0, lastDate: '', titles: [] };

  const output = {
    status: 'ready',
    date,
    dry_run: dryRun,
    model,
    concept: chosen.concept,
    concept_cn: chosen.concept_cn,
    domain: chosen.domain,
    domain_cn: (pool.domains && pool.domains[chosen.domain]) || chosen.domain,
    source,
    history_count: historyStat.count,
    history_last_date: historyStat.lastDate || null,
    perspective,
    cached_brief: findCachedBrief(briefs, chosen.concept),
    recent_names: [...recentNamesSet],
    recent_motifs: (queue.motifs || []).slice(-60),
    same_day_other: sameDayOther,
    pool_stats: {
      total: pool.concepts.length,
      unused: unusedCount,
      refill_threshold: refillThreshold,
      needs_refill: unusedCount < refillThreshold,
    },
  };

  console.log(JSON.stringify(output, null, 2));
}

function cmdSaveBrief(opts) {
  if (!opts.file) throw new Error('--file <brief.json> is required');
  const brief = readJson(path.resolve(opts.file));
  const required = ['concept', 'concept_cn', 'definition_cn', 'core_mechanism', 'key_relations', 'canonical_sentence_cn'];
  for (const field of required) {
    if (!brief[field]) throw new Error(`Brief missing required field: ${field}`);
  }
  const briefsObj = readJson(BRIEFS_PATH);
  briefsObj.briefs = briefsObj.briefs || {};
  briefsObj.briefs[brief.concept] = brief;
  writeJson(BRIEFS_PATH, briefsObj);
  console.log(JSON.stringify({ status: 'saved', concept: brief.concept, totalBriefs: Object.keys(briefsObj.briefs).length }));
}

function cmdIngest(opts) {
  if (!opts.file) throw new Error('--file <parable.json> is required');
  if (!opts.concept) throw new Error('--concept "<en>" is required');
  const model = resolveModel(opts.model);
  const date = opts.date || todayLocal();
  const parablePath = path.resolve(opts.file);
  const skipBuild = Boolean(opts['skip-build']);

  // 1. Run proofread-parable.js (auto-fixes mechanical items; exits non-zero on WARN)
  execFileSync(process.execPath, [PROOFREAD_SCRIPT, parablePath], { stdio: 'inherit' });

  // 2. Load proofread JSON and validate structure
  const draft = readJson(parablePath);
  if (!draft.title_en || !draft.title_cn) throw new Error('Parable JSON must contain title_en and title_cn');
  const paragraphs = draft.paragraphs || [];
  if (paragraphs.length < 5 || paragraphs.length > 9) {
    throw new Error(`Expected 5-9 paragraphs, got ${paragraphs.length}`);
  }
  for (let i = 0; i < paragraphs.length; i++) {
    if (!(paragraphs[i].cn || '').trim() || !(paragraphs[i].en || '').trim()) {
      throw new Error(`Paragraph ${i + 1} has empty cn or en field`);
    }
  }

  // 3. Enforce consistent model attribution in final Note paragraph
  const last = paragraphs[paragraphs.length - 1];
  const cnSig = `（本文由 ${model.displayName} 创作）`;
  const enSig = `(Written by ${model.displayName})`;
  if (!last.cn.includes(model.displayName)) {
    last.cn = last.cn.trimEnd() + cnSig;
  }
  if (!last.en.includes(model.displayName)) {
    last.en = last.en.trimEnd() + ' ' + enSig;
  }

  // 4. Check idempotency against articles.json
  const articlesData = readJson(ARTICLES_PATH);
  const todayParables = articlesData.articles.filter(a => isParable(a) && a.date === date);
  const dupModel = todayParables.find(a => detectArticleModelKey(a) === model.key);
  if (dupModel) {
    throw new Error(`Model ${model.displayName} already published a parable on ${date}: ${dupModel.id}`);
  }

  const slug = slugify(draft.title_en);
  if (!slug) throw new Error(`Could not derive slug from title_en: ${draft.title_en}`);
  if (articlesData.articles.some(a => a.id === slug && a.date === date)) {
    throw new Error(`Duplicate article id+date already exists: ${date} ${slug}`);
  }

  const [yyyy, mm] = date.split('-');
  const htmlRelPath = `articles/${yyyy}/${mm}/${date}-${slug}.html`;
  const firstCn = paragraphs[0].cn.trim();
  const summary = firstCn.length > 150 ? firstCn.slice(0, 150) : firstCn;
  const enWords = paragraphs.map(p => p.en).join(' ').trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(enWords / 300));

  const newArticle = {
    id: slug,
    title: draft.title_cn.trim(),
    subtitle: model.subtitle,
    author: model.author,
    source: '每日精选',
    date,
    category: ['寓言故事'],
    tags: [opts.concept.trim(), 'Amanda Askell', model.tag],
    summary,
    file: htmlRelPath,
    originalUrl: '',
    stats: { wordCount: enWords, readTime },
    content_cn: paragraphs.map(p => p.cn.trim()).join('\n\n'),
    content_en: paragraphs.map(p => p.en.trim()).join('\n\n'),
    paragraphs: paragraphs.map(p => ({ cn: p.cn.trim(), en: p.en.trim() })),
  };

  articlesData.articles.push(newArticle);
  articlesData.meta.totalArticles = articlesData.articles.length;
  articlesData.meta.updated = date;
  writeJson(ARTICLES_PATH, articlesData);

  // 5. Update parable-queue.json (used, motifs FIFO<=60, dailyClaims)
  const queue = readJson(QUEUE_PATH);
  queue.used = Array.isArray(queue.used) ? queue.used : [];
  if (!queue.used.some(u => normalizeConcept(u) === normalizeConcept(opts.concept))) {
    queue.used.push(opts.concept.trim());
  }

  if (opts.motifs) {
    const newMotifs = String(opts.motifs)
      .split('|')
      .map(s => s.trim())
      .filter(Boolean)
      .map(m => (m.endsWith(`（${newArticle.title}）`) ? m : `${m}（${newArticle.title}）`));
    queue.motifs = [...(queue.motifs || []), ...newMotifs].slice(-60);
  }

  cleanupOldClaims(queue);
  queue.dailyClaims[date] = queue.dailyClaims[date] || {};
  queue.dailyClaims[date][model.key] = {
    ...(queue.dailyClaims[date][model.key] || {}),
    concept: opts.concept.trim(),
    id: slug,
    title: newArticle.title,
    file: htmlRelPath,
    ingested: true,
    ingestedAt: new Date().toISOString(),
  };
  writeJson(QUEUE_PATH, queue);

  // 6. Rebuild site
  if (!skipBuild) {
    execFileSync(process.execPath, [BUILD_SCRIPT], { cwd: SITE_DIR, stdio: 'inherit' });
  }

  console.log(JSON.stringify({
    status: 'ingested',
    date,
    model: model.displayName,
    id: slug,
    title: newArticle.title,
    subtitle: newArticle.subtitle,
    author: newArticle.author,
    file: htmlRelPath,
    totalArticles: articlesData.meta.totalArticles,
  }, null, 2));
}

function cmdRefill(opts) {
  if (!opts.file) throw new Error('--file <concepts.json> is required');
  const incoming = readJson(path.resolve(opts.file));
  if (!Array.isArray(incoming)) throw new Error('Refill file must be a JSON array');

  const pool = readJson(POOL_PATH);
  const validDomains = new Set(Object.keys(pool.domains || {}));
  const existingKeys = new Set();
  for (const c of pool.concepts) {
    existingKeys.add(normalizeConcept(c.concept));
    if (c.concept_cn) existingKeys.add(normalizeConcept(c.concept_cn));
    for (const al of (c.aliases || [])) existingKeys.add(normalizeConcept(al));
  }

  const added = [];
  const skipped = [];
  for (const item of incoming) {
    if (!item || !item.concept || !item.concept_cn || !item.domain) {
      skipped.push({ item, reason: 'missing concept/concept_cn/domain' });
      continue;
    }
    if (!validDomains.has(item.domain)) {
      skipped.push({ concept: item.concept, reason: `unknown domain: ${item.domain}` });
      continue;
    }
    const enNorm = normalizeConcept(item.concept);
    const cnNorm = normalizeConcept(item.concept_cn);
    if (existingKeys.has(enNorm) || existingKeys.has(cnNorm)) {
      skipped.push({ concept: item.concept, reason: 'duplicate' });
      continue;
    }
    const clean = {
      concept: item.concept.trim(),
      concept_cn: item.concept_cn.trim(),
      domain: item.domain.trim(),
    };
    if (Array.isArray(item.aliases) && item.aliases.length) clean.aliases = item.aliases;
    pool.concepts.push(clean);
    existingKeys.add(enNorm);
    existingKeys.add(cnNorm);
    added.push(clean.concept);
  }

  if (added.length > 0) {
    pool.updated = todayLocal();
    writeJson(POOL_PATH, pool);
  }

  console.log(JSON.stringify({
    status: 'refilled',
    addedCount: added.length,
    skippedCount: skipped.length,
    totalPoolSize: pool.concepts.length,
    added,
    skipped,
  }, null, 2));
}

function main() {
  const { cmd, opts } = parseArgs(process.argv.slice(2));
  try {
    if (cmd === 'stats') cmdStats();
    else if (cmd === 'pick') cmdPick(opts);
    else if (cmd === 'save-brief') cmdSaveBrief(opts);
    else if (cmd === 'ingest') cmdIngest(opts);
    else if (cmd === 'refill') cmdRefill(opts);
    else {
      console.error('Usage: node scripts/parable-ctl.js <stats|pick|save-brief|ingest|refill> [options]');
      process.exit(2);
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
}

main();
