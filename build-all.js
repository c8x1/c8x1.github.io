#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT_DIR = __dirname;
const BASE_URL = 'https://c8x1.github.io';

function esc(t) { return t ? t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') : ''; }
function escX(t) { return t ? t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;') : ''; }

const TAG_COLORS = {'\u54f2\u5b66':'blue','\u4eba\u5de5\u667a\u80fd':'blue','\u5546\u4e1a\u6218\u7565':'blue','\u521b\u4e1a':'green','\u5546\u4e1a':'green','\u4e66\u8bc4':'green','\u653f\u6cbb\u5b66':'green','\u6587\u5316':'orange','\u7f8e\u597d\u751f\u6d3b':'orange','\u81ea\u6211\u8ba4\u77e5':'orange','\u5973\u6027\u4e3b\u4e49':'pink','\u4e2d\u4e1c\u653f\u6cbb':'pink','\u9605\u8bfb\u6e05\u5355':'purple','\u6587\u5316\u6279\u8bc4':'purple','\u793e\u4f1a\u5b66':'blue','\u7ecf\u6d4e\u5b66':'blue','\u79d1\u6280':'blue','\u6280\u672f':'blue','\u5fc3\u7406\u5b66':'purple','\u79d1\u5b66\u54f2\u5b66':'purple','\u751f\u7269\u5b66':'green','\u79d1\u5b66\u53d1\u73b0':'green','\u521b\u610f\u5199\u4f5c':'orange','\u53d1\u5c55\u7814\u7a76':'green','\u5bd3\u8a00\u6545\u4e8b':'orange'};

function fmtDate(d) { if(!d)return''; const dt=new Date(d); return `${dt.getFullYear()}\u5e74${dt.getMonth()+1}\u6708${dt.getDate()}\u65e5`; }
function fmtRfc(d) { return d ? new Date(d).toUTCString() : ''; }

function wrapPara(text) {
  if (!text || !text.trim()) return '';
  const t = text.trim();
  if (t.startsWith('* ') || t.startsWith('- '))
    return '<ul>' + t.split('\n').filter(l => l.startsWith('* ') || l.startsWith('- ')).map(l => `<li>${esc(l.replace(/^[*-] /, ''))}</li>`).join('') + '</ul>';
  return `<p>${esc(t).replace(/\n/g, '<br>')}</p>`;
}

function makeBody(a) {
  const paragraphs = a.paragraphs || [];
  if (!paragraphs.length) {
    const cnParas = (a.content_cn || '').split('\n\n').filter(p => p.trim());
    if (!cnParas.length) return `<p>${esc(a.summary || '')}</p>`;
    return cnParas.map(p => wrapPara(p)).join('');
  }
  const hasEn = paragraphs.some(p => (p.en || '').trim().length > 0);
  let pairs = '';
  for (const p of paragraphs) {
    pairs += `<div class="para-pair"><div class="para-cn">${wrapPara(p.cn)}</div><div class="para-en">${hasEn ? wrapPara(p.en) : ''}</div></div>`;
  }
  const toggleBtn = hasEn ? `<button class="bilingual-toggle" id="bilingual-toggle" onclick="(function(){var c=document.getElementById('bilingual-container');var b=document.getElementById('bilingual-toggle');var a=c.closest('.article-container');if(c.classList.contains('show-en')){c.classList.remove('show-en');a.classList.remove('bilingual-wide');b.textContent='\u5c55\u5f00\u82f1\u6587\u5bf9\u7167 \u2194';}else{c.classList.add('show-en');a.classList.add('bilingual-wide');b.textContent='\u6536\u8d77\u82f1\u6587 \u2715';}})()">\u5c55\u5f00\u82f1\u6587\u5bf9\u7167 \u2194</button>` : '';
  return `<div class="bilingual-wrapper">${toggleBtn}<div class="bilingual-container${hasEn ? '' : ' cn-only'}" id="bilingual-container">${pairs}</div></div>`;
}

const ARTICLE_SCRIPT = `
(function(){
  var pb=document.getElementById('reading-progress'),tk=false;
  function up(){var s=window.scrollY||document.documentElement.scrollTop,d=document.documentElement.scrollHeight-window.innerHeight;pb.style.width=Math.min(d>0?(s/d)*100:0,100)+'%';tk=false;}
  if(pb)window.addEventListener('scroll',function(){if(!tk){requestAnimationFrame(up);tk=true;}},{passive:true});
  var bt=document.getElementById('back-to-top'),tk2=false;
  function tg(){bt.classList.toggle('visible',(window.scrollY||document.documentElement.scrollTop)>300);tk2=false;}
  if(bt){window.addEventListener('scroll',function(){if(!tk2){requestAnimationFrame(tg);tk2=true;}},{passive:true});bt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});}

})();`;

function articleHead(a) {
  return `<!DOCTYPE html><html lang="zh-CN"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="${esc(a.summary||'')}">
<title>${esc(a.title)} | \u6bcf\u65e5\u7cbe\u9009</title>
<meta property="og:title" content="${esc(a.title)}"><meta property="og:description" content="${esc(a.summary||'')}">
<meta property="og:type" content="article"><meta property="article:published_time" content="${a.date}">
<meta property="article:author" content="${esc(a.author||'')}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"><\/script>
<script>tailwind.config={darkMode:'class',theme:{extend:{fontFamily:{serif:['Noto Serif SC','serif'],sans:['Inter','sans-serif']}}}}<\/script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet" href="/assets/css/main.css"><link rel="stylesheet" href="/assets/css/article.css">
<script>(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else if(t==='light'){document.documentElement.setAttribute('data-theme','light');}})();<\/script>
</head>`;
}

function articleMeta(a) {
  const rts = a.stats?.readTime ? `<span class="meta-separator">\u00b7</span><span>${a.stats.readTime}\u5206\u949f\u9605\u8bfb</span>` : '';
  const org = a.originalUrl ? `<span class="meta-separator">\u00b7</span><a href="${a.originalUrl}" target="_blank" rel="noopener noreferrer">\u539f\u6587 <i class="fas fa-external-link-alt text-xs"></i></a>` : '';
  return `<span itemprop="author">${esc(a.author||'\u672a\u77e5\u4f5c\u8005')}</span><span class="meta-separator">\u00b7</span><span itemprop="publisher">${esc(a.source||'\u672a\u77e5\u6765\u6e90')}</span><span class="meta-separator">\u00b7</span><time itemprop="datePublished" datetime="${a.date}">${fmtDate(a.date)}</time>${rts}${org}`;
}

function generateArticle(article, all) {
  const idx = all.findIndex(a => a.id === article.id);
  const prev = all[idx+1], next = all[idx-1];
  const cats = (article.category||[]).map(c=>`<span class="tag tag-${TAG_COLORS[c]||'gray'}">${esc(c)}</span>`).join('');
  const pNav = prev ? `<a href="/${prev.file}" class="nav-link prev" title="${esc(prev.title)}"><span class="nav-link-text">${esc(prev.title)}</span></a>` : '<span></span>';
  const nNav = next ? `<a href="/${next.file}" class="nav-link next" title="${esc(next.title)}"><span class="nav-link-text">${esc(next.title)}</span></a>` : '<span></span>';
  const srcLink = article.originalUrl ? `<div class="source-section"><p class="source-link"><strong>\u539f\u6587\u94fe\u63a5\uff1a</strong><a href="${article.originalUrl}" target="_blank" rel="noopener noreferrer">${article.originalUrl}</a></p></div>` : '';

  return `${articleHead(article)}
<body class="bg-gray-50 dark:bg-[#0f0f23] text-gray-800 dark:text-gray-200">
<div class="reading-progress" id="reading-progress"></div>
<nav class="bg-white dark:bg-[#1a1a2e] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90"><div class="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
<a href="/" class="font-serif text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1"><span>\u6bcf\u65e5</span><span class="text-blue-600">\u7cbe\u9009</span></a>
<div class="flex items-center gap-3"><a href="/" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">\u2190 \u8fd4\u56de\u9996\u9875</a>
<button class="theme-toggle w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors" title="\u5207\u6362\u4e3b\u9898"><i class="fas fa-moon text-gray-600 dark:text-gray-400 icon-moon"></i><i class="fas fa-sun text-yellow-500 icon-sun hidden"></i></button></div>
</div></nav>
<article class="article-container" itemscope itemtype="http://schema.org/Article">
<header class="article-header"><div class="article-categories">${cats}</div>
<h1 class="article-page-title" itemprop="headline">${esc(article.title)}</h1>
${article.subtitle?`<p class="article-subtitle">${esc(article.subtitle)}</p>`:''}
<div class="article-meta-row">${articleMeta(article)}</div></header>
<div class="article-content" itemprop="articleBody">${makeBody(article)}</div>${srcLink}</article>
<nav class="article-navigation" aria-label="\u6587\u7ae0\u5bfc\u822a">${pNav}<a href="/" class="nav-home">\u8fd4\u56de\u5217\u8868</a>${nNav}</nav>
<footer class="bg-gray-100 dark:bg-[#16213e] border-t border-gray-200 dark:border-gray-800 py-8 mt-auto"><div class="max-w-3xl mx-auto px-4 text-center"><p class="text-sm text-gray-500 dark:text-gray-400">&copy; 2025 Noc's Blog \u00b7 \u6bcf\u65e5\u7cbe\u9009</p></div></footer>
<button class="back-to-top" id="back-to-top" aria-label="\u8fd4\u56de\u9876\u90e8">\u2191</button>
<script src="/assets/js/main.js"><\/script><script>${ARTICLE_SCRIPT}<\/script>
</body></html>`;
}

// RSS 2.0 feed
function generateFeed(articles) {
  const items = [...articles].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(a =>
    `    <item>\n      <title>${escX(a.title)}</title>\n      <link>${BASE_URL}/${a.file}</link>\n      <guid isPermaLink="true">${BASE_URL}/${a.file}</guid>\n      <description>${escX(a.summary||'')}</description>\n      <pubDate>${fmtRfc(a.date)}</pubDate>\n      <author>${escX(a.author||'')}</author>\n    </item>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>\u6bcf\u65e5\u7cbe\u9009 | Daily Curated</title>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>\u6bcf\u5929\u7cbe\u9009\u9ad8\u8d28\u91cf\u82f1\u6587\u6587\u7ae0\uff0c\u7ffb\u8bd1\u4e3a\u4e2d\u6587</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

// Sitemap
function generateSitemap(articles) {
  const sorted = [...articles].sort((a,b)=>new Date(b.date)-new Date(a.date));
  const urls = [`  <url>\n    <loc>${BASE_URL}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`];
  sorted.forEach(a => urls.push(`  <url>\n    <loc>${BASE_URL}/${a.file}</loc>\n    <lastmod>${a.date}</lastmod>\n    <priority>0.8</priority>\n  </url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
}

// Ensure root-level assets
function ensureRootAssets() {
  ['assets/css','assets/js'].forEach(d => { if(!fs.existsSync(path.join(ROOT_DIR,d)))fs.mkdirSync(path.join(ROOT_DIR,d),{recursive:true}); });
  ['main.css','article.css'].forEach(f => {
    const root=path.join(ROOT_DIR,'assets/css',f), dist=path.join(ROOT_DIR,'dist/assets/css',f);
    if(!fs.existsSync(root)&&fs.existsSync(dist)){fs.copyFileSync(dist,root);console.log(`  Copied ${f}`);}
  });
  const rj=path.join(ROOT_DIR,'assets/js/main.js'), dj=path.join(ROOT_DIR,'dist/assets/js/main.js');
  if(!fs.existsSync(rj)&&fs.existsSync(dj)){fs.copyFileSync(dj,rj);console.log('  Copied main.js');}
}

// Main
function main() {
  console.log('=== Build started ===\n');
  console.log('Ensuring root-level assets...');
  ensureRootAssets();

  const articles = JSON.parse(fs.readFileSync(path.join(ROOT_DIR,'articles.json'),'utf-8')).articles;

  console.log('\nGenerating article pages...');
  let count = 0;
  for (const a of articles) {
    if (!a.file || typeof a.file !== 'string') { console.warn(`  Skip: ${a.title||a.id}`); continue; }
    const out = path.join(ROOT_DIR, a.file), dir = path.dirname(out);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(out, generateArticle(a, articles), 'utf-8');
    count++;
  }
  console.log(`  Generated ${count} pages`);

  fs.writeFileSync(path.join(ROOT_DIR,'feed.xml'), generateFeed(articles), 'utf-8');
  console.log('  feed.xml');
  fs.writeFileSync(path.join(ROOT_DIR,'sitemap.xml'), generateSitemap(articles), 'utf-8');
  console.log('  sitemap.xml');
  console.log(`\n=== Done: ${count} articles, feed.xml, sitemap.xml ===`);
}

main();
