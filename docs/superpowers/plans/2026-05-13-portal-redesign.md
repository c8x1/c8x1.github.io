# c8x1.github.io 门户页重设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `c8x1.github.io/index.html` from a single-topic "daily articles" page into a multi-section portal with three equal-level columns: daily articles, GitHub Trending (placeholder), and projects — all in a dark theme matching the cortex-m-audio-learning subsite.

**Architecture:** Single-file static HTML rewrite. All CSS inline in `<style>`, all JS inline in `<script>`. No external dependencies beyond Google Fonts. Three vertical sections, each with a title row + card grid + "view all" link.

**Tech Stack:** Plain HTML/CSS/JS, Google Fonts (Noto Serif SC, Noto Sans SC), no frameworks.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `index.html` | Rewrite | Complete portal page: header, hero, 3 sections, footer |
| `docs/superpowers/specs/2026-05-13-portal-redesign.md` | Read-only | Design spec |

---

### Task 1: Rewrite index.html

**Files:**
- Rewrite: `index.html`

This is a single task because the entire change is one self-contained HTML file. The rewrite replaces the current file completely.

- [ ] **Step 1: Read the current `index.html` to preserve article data and project data**

Read: `index.html`

Extract these data arrays for reuse:
- `articles` JS array (4 articles with id, category, title, excerpt, author, date, readTime, icon)
- Project card data (4 projects with href, icon style, title, description, tags)

- [ ] **Step 2: Write the complete new `index.html`**

Write the new file with these exact sections:

**`<head>`:**
- Same charset, viewport, title: `每日精选 | Daily Curated`
- Same Google Fonts link (Noto Serif SC + Noto Sans SC)
- Inline `<style>` with dark theme CSS (all values from spec color table)

**CSS variables:**
```css
:root {
    --bg: #020617;
    --card-bg: #0f172a;
    --border: #1e293b;
    --text: #e2e8f0;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --accent-blue: #3b82f6;
    --accent-green: #22c55e;
    --accent-cyan: #06b6d4;
}
```

**Base styles:**
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Noto Sans SC', sans-serif; background: var(--bg); color: var(--text); line-height: 1.8; }
a { text-decoration: none; color: inherit; }
```

**Header (sticky):**
```css
header {
    background: var(--card-bg);
    border-bottom: 1px solid var(--border);
    padding: 0.8rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.header-content { display: flex; justify-content: space-between; align-items: center; }
.logo { font-family: 'Noto Serif SC', serif; font-size: 1.3rem; font-weight: 700; color: #fff; }
.logo span { color: var(--accent-blue); }
.date { font-size: 0.9rem; color: var(--text-muted); }
```

**Hero:**
```css
.hero { text-align: center; padding: 3rem 0 2rem; border-bottom: 1px solid var(--border); margin-bottom: 3rem; }
.hero h1 { font-size: 1.5rem; font-weight: 500; color: #fff; letter-spacing: 0.05em; }
.hero .sep { color: var(--accent-blue); margin: 0 0.5rem; }
```

**Section title row:**
```css
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.section-title { font-size: 1.2rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 0.5rem; }
.section-link { font-size: 0.85rem; color: var(--accent-blue); transition: color 0.2s; }
.section-link:hover { color: #60a5fa; }
```

**Card grid:**
```css
.card-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; margin-bottom: 3rem; }
```

**Article card:**
```css
.article-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
    display: block;
    color: inherit;
}
.article-card:hover { border-color: var(--accent-blue); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
.article-icon { height: 140px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
.article-body { padding: 1.2rem; }
.article-category { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: var(--accent-blue); font-weight: 600; margin-bottom: 0.4rem; }
.article-title { font-family: 'Noto Serif SC', serif; font-size: 1.1rem; font-weight: 600; line-height: 1.4; margin-bottom: 0.6rem; color: #fff; }
.article-excerpt { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.article-meta { display: flex; justify-content: space-between; margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid var(--border); font-size: 0.8rem; color: var(--text-muted); }
```

**Trending card:**
```css
.trending-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent-green);
    border-radius: 10px;
    padding: 1.2rem;
    transition: all 0.2s;
    cursor: pointer;
    display: block;
    color: inherit;
}
.trending-card:hover { border-color: var(--accent-green); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
.trending-repo { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.95rem; font-weight: 600; color: #fff; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem; }
.trending-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0.8rem; }
.trending-stats { font-size: 0.8rem; color: var(--text-muted); display: flex; gap: 1rem; }
.trending-today { color: var(--accent-green); font-size: 0.8rem; margin-top: 0.4rem; }
.trending-placeholder { font-size: 0.7rem; color: var(--text-muted); opacity: 0.5; margin-top: 0.6rem; }
```

**Project card:**
```css
.project-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent-cyan);
    border-radius: 10px;
    padding: 1.2rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.2s;
    color: inherit;
}
.project-card:hover { border-color: var(--accent-cyan); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
.project-icon { flex-shrink: 0; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
.project-info h3 { font-size: 0.95rem; font-weight: 600; line-height: 1.3; color: #fff; }
.project-info p { font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem; line-height: 1.4; }
.project-tag { display: inline-block; font-size: 0.7rem; color: var(--accent-cyan); border: 1px solid rgba(6,182,212,0.3); padding: 0.1rem 0.5rem; border-radius: 4px; margin-top: 0.4rem; }
```

**Footer:**
```css
footer { background: var(--card-bg); border-top: 1px solid var(--border); color: var(--text-muted); padding: 2rem 0; margin-top: 4rem; text-align: center; font-size: 0.85rem; }
```

**Responsive:**
```css
@media (max-width: 1023px) {
    .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
    .card-grid { grid-template-columns: 1fr; }
    .hero h1 { font-size: 1.2rem; }
    .container { padding: 0 1rem; }
}
```

**`<body>` HTML structure:**

1. **Header** — simplified, no projects button:
```html
<header>
    <div class="container">
        <div class="header-content">
            <a href="/" class="logo">c8x1<span> · Daily Curated</span></a>
            <div class="date" id="current-date"></div>
        </div>
    </div>
</header>
```

2. **Hero** — one-liner:
```html
<main>
    <div class="container">
        <div class="hero">
            <h1>每日精选 <span class="sep">×</span> 开源趋势 <span class="sep">×</span> 技术学习</h1>
        </div>
```

3. **Section 1: 每日精选** — title row + JS-rendered article cards:
```html
        <section>
            <div class="section-header">
                <h2 class="section-title"><span>📰</span> 每日精选</h2>
                <a href="dist/" class="section-link">查看全部归档 →</a>
            </div>
            <div class="card-grid" id="articles-container"></div>
        </section>
```

4. **Section 2: GitHub Trending** — 4 placeholder cards:
```html
        <section>
            <div class="section-header">
                <h2 class="section-title"><span>🔥</span> GitHub Trending</h2>
                <a href="#" class="section-link">查看全部 →</a>
            </div>
            <div class="card-grid" id="trending-container"></div>
        </section>
```

5. **Section 3: 项目** — 4 project cards:
```html
        <section>
            <div class="section-header">
                <h2 class="section-title"><span>📦</span> 项目</h2>
                <a href="https://github.com/c8x1" target="_blank" class="section-link">github.com/c8x1 →</a>
            </div>
            <div class="card-grid">
                <!-- Project cards: reuse data from current index.html -->
                <a class="project-card" href="https://c8x1.github.io/smartglasses-study/" target="_blank">
                    <div class="project-icon" style="background:#1a1e2e;">👓</div>
                    <div class="project-info">
                        <h3>14天嵌入式AI智能眼镜速成</h3>
                        <p>基于 OpenSourceSmartGlasses，由浅入深拆解 ESP32 + FreeRTOS + LVGL 全栈开发</p>
                        <span class="project-tag">ESP32</span>
                        <span class="project-tag">FreeRTOS</span>
                        <span class="project-tag">音频</span>
                    </div>
                </a>
                <a class="project-card" href="https://c8x1.github.io/embedded-dev/" target="_blank">
                    <div class="project-icon" style="background:#1a2e1a;">🔧</div>
                    <div class="project-info">
                        <h3>嵌入式开发速成</h3>
                        <p>音频工程师的嵌入式开发入门路线图</p>
                        <span class="project-tag">嵌入式</span>
                        <span class="project-tag">入门</span>
                    </div>
                </a>
                <a class="project-card" href="https://c8x1.github.io/embedded-quick-learning-site/" target="_blank">
                    <div class="project-icon" style="background:#2e1a1a;">⚡</div>
                    <div class="project-info">
                        <h3>嵌入式快速学习站</h3>
                        <p>嵌入式系统快速学习静态站点</p>
                        <span class="project-tag">学习站</span>
                    </div>
                </a>
                <a class="project-card" href="https://c8x1.github.io/cortex-m-audio-learning/" target="_blank">
                    <div class="project-icon" style="background:#1a1a2e;">🎧</div>
                    <div class="project-info">
                        <h3>Cortex-M 音频嵌入式学习</h3>
                        <p>7 阶段 · 10 个开源项目源码走读 — 从架构基础到音频 DSP 全栈</p>
                        <span class="project-tag">Cortex-M</span>
                        <span class="project-tag">音频 DSP</span>
                        <span class="project-tag">BLE</span>
                    </div>
                </a>
            </div>
        </section>
    </div>
</main>
```

6. **Footer:**
```html
<footer>
    <div class="container">
        <p>&copy; 2026 c8x1 · Daily Curated</p>
    </div>
</footer>
```

7. **`<script>`** — date display + article rendering + trending placeholder rendering:

```javascript
// Date display
var dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
document.getElementById('current-date').textContent = new Date().toLocaleDateString('zh-CN', dateOptions);

// Articles (reuse existing data)
var articles = [
    { id:'philosophy-eats-ai', category:'哲学 · 人工智能', title:'哲学吞噬AI', excerpt:'要让AI创造可持续的商业价值，领导者必须批判性地思考决定AI开发、训练和部署的深层哲学基础。', author:'Michael Schrage', date:'2026年3月2日', readTime:'12分钟', icon:'🧠' },
    { id:'article-1', category:'心理学', title:'世上没有精神病患者', excerpt:'几乎所有你认为关于精神病的常识都已被彻底证伪。', author:'Rasmus Rosenberg Larsen', date:'2026年2月27日', readTime:'24分钟', icon:'🧠' },
    { id:'article-2', category:'哲学', title:'六秒的拥抱', excerpt:'从艺术到宗教再到性，工具化已经抽空了事物的内在价值。', author:'Julian Baggini', date:'2026年2月24日', readTime:'26分钟', icon:'🤔' },
    { id:'article-3', category:'技术', title:'书籍与屏幕', excerpt:'你无法专注不是你的错。这是一个设计问题。', author:'Carlo Iacono', date:'2026年2月19日', readTime:'23分钟', icon:'📱' }
];

var container = document.getElementById('articles-container');
articles.forEach(function(article) {
    var card = document.createElement('a');
    card.className = 'article-card';
    card.href = 'articles/' + article.id + '.html';
    card.innerHTML = '<div class="article-icon">' + article.icon + '</div>' +
        '<div class="article-body">' +
        '<div class="article-category">' + article.category + '</div>' +
        '<h2 class="article-title">' + article.title + '</h2>' +
        '<p class="article-excerpt">' + article.excerpt + '</p>' +
        '<div class="article-meta"><span>' + article.author + '</span><span>' + article.readTime + '</span></div>' +
        '</div>';
    container.appendChild(card);
});

// Trending placeholders
var trending = [
    { repo: 'anthropics/claude-code', desc: 'AI-powered coding assistant CLI — write, debug, and ship code faster', stars: '12.5k', lang: 'TypeScript', todayStars: '+342', url: 'https://github.com/anthropics/claude-code' },
    { repo: 'deepseek-ai/DeepSeek-V3', desc: 'Large language model with strong reasoning and code generation capabilities', stars: '28.1k', lang: 'Python', todayStars: '+891', url: 'https://github.com/deepseek-ai/DeepSeek-V3' },
    { repo: 'pytorch/pytorch', desc: 'Tensors and dynamic neural networks in Python with strong GPU acceleration', stars: '92.4k', lang: 'Python', todayStars: '+156', url: 'https://github.com/pytorch/pytorch' },
    { repo: 'tailwindlabs/tailwindcss', desc: 'A utility-first CSS framework for rapid UI development', stars: '87.3k', lang: 'CSS', todayStars: '+128', url: 'https://github.com/tailwindlabs/tailwindcss' }
];

var trendingContainer = document.getElementById('trending-container');
trending.forEach(function(item) {
    var card = document.createElement('a');
    card.className = 'trending-card';
    card.href = item.url;
    card.target = '_blank';
    card.innerHTML = '<div class="trending-repo">🟢 ' + item.repo + '</div>' +
        '<div class="trending-desc">' + item.desc + '</div>' +
        '<div class="trending-stats"><span>⭐ ' + item.stars + '</span><span>📝 ' + item.lang + '</span></div>' +
        '<div class="trending-today">今日 +' + item.todayStars + ' ⭐</div>' +
        '<div class="trending-placeholder">示例数据，即将上线</div>';
    trendingContainer.appendChild(card);
});
```

- [ ] **Step 3: Open the page in browser to verify layout**

Run: `open /Users/noctis/Workspace/trySth/trending-clones/c8x1.github.io/index.html`

Check:
- Dark background (#020617) renders correctly
- Header is sticky at top
- Hero shows "每日精选 × 开源趋势 × 技术学习"
- Three sections each show 4 cards in a grid
- Article cards have purple gradient icon area
- Trending cards have green left border
- Project cards have cyan left border
- "查看全部" links are visible in each section header
- Responsive: resize browser to check 4→2→1 column grid
- Footer shows copyright

- [ ] **Step 4: Commit**

```bash
git add index.html docs/superpowers/
git commit -m "Redesign portal: dark theme, three equal sections (articles/trending/projects)"
```
