---
name: translate-articles
description: "Translate and align bilingual CN/EN paragraphs for blog articles. Use 'archive' keyword for non-interactive daily pipeline: fetch 2 English philosophy/classics articles, translate to Chinese, generate bilingual pages, update homepage, and git push. Also use for fixing paragraph alignment, re-translating, or any bilingual content work on c8x1.github.io."
argument-hint: "[archive] [scan] [article indices] — e.g. 'archive' or '0,2,4'"
allowed-tools:
  - WebSearch
  - mcp__web_reader__webReader
  - Bash
  - Read
  - Write
  - Edit
  - Agent
  - AskUserQuestion
user-invocable: true
---

# Bilingual Article Translation & Daily Pipeline

处理 c8x1.github.io 博客的双语文章配对、翻译、每日自动归档。

**所有输出必须使用中文（除英文原文和代码外）。**

## 参数解析

解析用户输入 `$ARGUMENTS`：

0. **运行模式 `mode`**：从参数中检测关键词：
   - 包含 `archive`（别名: `归档`, `arch`）→ **归档模式**（非交互式每日管线）
   - 包含 `scan` → **扫描模式**（检测错位文章）
   - 其他 → **翻译模式**（对指定文章翻译）

---

## 归档模式

归档模式是**非交互式**的：不需要用户确认，自动完成搜索 → 翻译 → 生成 → 推送全流程。

目标：每天获取 2 篇英文哲学/经典文章 → 翻译为中文 → 生成双语页面 → git push。

### 归档第一步：搜索英文文章

使用 WebSearch 搜索高质量英文文章。每次从以下搜索词池中选 2 个不同类别的词：

```
搜索词池：
1. "philosophy essay 2026" site:aeon.co OR site:theatlantic.com
2. "timeless essay classic" site:newyorker.com OR site:theguardian.com
3. "philosophy of mind consciousness 2026" site:aeon.co OR site:theconversation.com
4. "ethics technology 2026" site:aeon.co OR site:quillette.com
5. "existentialism meaning of life essay"
6. "epistemology knowledge philosophy 2026"
7. "political philosophy essay 2026" site:aeon.co OR site:theatlantic.com
8. "philosophy of science essay 2026"
```

筛选条件：
- 来源为知名媒体/期刊（Aeon, The Atlantic, New Yorker, Guardian Long Read, The Conversation, Quillette, 3:AM Magazine 等）
- 文章长度 > 1000 词（排除短讯）
- **排除已抓取过的 URL**：先 Read articles.json，提取所有 `originalUrl`，新文章 URL 不能重复

如果第一个搜索词无合适结果，换下一个搜索词继续。

### 归档第二步：抓取文章内容

对选中的 2 篇文章，用 `mcp__web_reader__webReader` 获取正文：

```
url: 文章 URL
retain_images: false
no_cache: true
```

从返回的 markdown 中提取：
- **标题**：第一个 H1 或 title 元素
- **作者**：byline、meta 信息或 "By XXX" 模式
- **正文段落**：去掉导航、广告、页脚、推荐链接后，按 `\n\n` 分段
- 去掉空段落和过短段落（< 30 字符，可能是导航残余）
- 最终得到 `enParagraphs` 数组

如果某篇文章获取失败或正文段落 < 3，搜索替代文章。

### 归档第三步：翻译

使用 1 个 sonnet Agent 批量翻译 2 篇文章：

```
Agent({ model: "sonnet", description: "Translate 2 articles EN->CN",
  prompt: `你是专业英译中翻译。翻译以下 2 篇文章的段落。

文章 1: {title1}
段落:
{en_paragraphs_json_1}

文章 2: {title2}
段落:
{en_paragraphs_json_2}

规则:
- 每个英文段落翻译为自然流畅的中文
- 保留列表格式（* 或 -）
- 标题保留为标题
- 人名、地名、专有名词第一次出现时标注英文原文，如：笛卡尔（René Descartes）
- 不要添加开头/结尾说明
- 不要添加 markdown 代码围栏

输出 ONLY valid JSON（无 markdown 围栏，无解释）:
[
  {"articleIndex": 0, "title_cn": "中文标题", "translations": ["CN段0", "CN段1", ...]},
  {"articleIndex": 1, "title_cn": "中文标题", "translations": ["CN段0", "CN段1", ...]}
]

translations 数组长度必须与输入段落数完全一致。仔细数。` })
```

### 归档第四步：构建 article 对象并追加到 articles.json

定义 **`SITE_DIR`** = `~/Workspace/trySth/c8x1.github.io`

1. Read `$SITE_DIR/articles.json`
2. 为每篇新文章构建对象：

```json
{
  "id": "slug-from-title",
  "title": "中文标题",
  "subtitle": "",
  "author": "Author Name",
  "source": "Aeon",
  "date": "YYYY-MM-DD",
  "category": ["哲学"],
  "tags": [],
  "summary": "中文摘要（取第一段翻译前150字）",
  "file": "articles/YYYY-MM-DD-slug.html",
  "originalUrl": "https://...",
  "stats": { "wordCount": EN字数, "readTime": Math.max(1, EN字数/300) },
  "content_cn": "中文段落1\n\n中文段落2...",
  "content_en": "English para 1\n\nEnglish para 2...",
  "paragraphs": [
    {"cn": "中文段1", "en": "English para 1"},
    {"cn": "中文段2", "en": "English para 2"}
  ]
}
```

slug 生成规则：取英文标题，去掉特殊字符，空格转连字符，截断 60 字符。

3. 追加 2 篇新文章到 `data.articles` 数组末尾
4. 更新 `data.meta.totalArticles` += 2
5. 更新 `data.meta.updated` = 当天日期
6. 用 Write 写回 articles.json

### 归档第五步：生成页面

```bash
cd ~/Workspace/trySth/c8x1.github.io && node build-all.js
```

build-all.js 会自动：
- 为所有文章生成 HTML 页面（含新增的 2 篇）
- 更新 feed.xml 和 sitemap.xml
- 首页和归档页无需修改（客户端 JS 自动从 articles.json 读取最新数据）

### 归档第六步：Git 提交并推送

```bash
cd ~/Workspace/trySth/c8x1.github.io
git add articles.json articles/ feed.xml sitemap.xml
git commit -m "archive: YYYY-MM-DD +2 articles (category1, category2)"
# 先同步远端（trending cron 可能已推送 data/ 改动）
git pull --rebase origin master
git push origin master
```

如果推送失败，使用代理重试：
```bash
cd ~/Workspace/trySth/c8x1.github.io && https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 git push origin master
```

### 归档模式 — 输出摘要

完成后输出：

```
[归档完成]

日期: YYYY-MM-DD
新增: 2 articles
总计: N articles

文章:
  1. 中文标题1 (哲学) — Aeon
  2. 中文标题2 (科学哲学) — The Atlantic

文件:
  articles.json ✓
  articles/YYYY-MM-DD-slug1.html ✓
  articles/YYYY-MM-DD-slug2.html ✓
  feed.xml ✓
  sitemap.xml ✓

Git: 已提交并推送到 origin/master
```

### 归档模式 — 错误处理

| 场景 | 处理 |
|------|------|
| WebSearch 无结果 | 换关键词重试一次 |
| 文章页面获取失败 | 跳过该文章，搜索替代 |
| 翻译 Agent 失败 | 单独重试该文章一次 |
| articles.json 读取/写入失败 | 中止，报错 |
| build-all.js 失败 | 报错但继续 git 提交已修改的文件 |
| git push 失败 | 代理重试一次 |

---

## 扫描模式

扫描 articles.json 中 CN/EN 段落数不匹配的文章：

```bash
node -e "
const data = require('./articles.json');
data.articles.forEach((a, i) => {
  const paras = a.paragraphs || [];
  const cnCount = paras.filter(p => (p.cn||'').trim()).length;
  const enCount = paras.filter(p => (p.en||'').trim()).length;
  if (cnCount !== enCount) {
    console.log('[' + i + '] ' + a.id + ' cn:' + cnCount + ' en:' + enCount);
  }
});
"
```

输出错位文章列表，供翻译模式使用。

---

## 翻译模式

对指定索引的文章进行并行 sonnet 翻译。

### 数据结构

`articles.json` 每篇文章有 `paragraphs` 数组：

```json
"paragraphs": [
  {"cn": "Chinese paragraph text", "en": "English translation"},
  {"cn": "Another CN paragraph", "en": "Another EN translation"}
]
```

关键约束：**`paragraphs.length` 等于 CN 段落数**，每个 `en` 是对应 `cn` 的翻译。

### 渲染管线

`build-all.js` → `makeBody(article)`:
- 遍历 `paragraphs`，每个 CN/EN 对包装在 `.para-pair` div
- `wrapPara(text)` 将文本转为 HTML：`<p>` 标签、`<ul><li>` 列表、`<br>` 换行
- 如有 EN 内容，显示切换按钮；点击添加 `.show-en` class
- CN 列始终可见；EN 列默认隐藏
- 布局从 800px 扩展到 1280px（双语模式）
- 响应式：768px 以下 CN/EN 纵向堆叠

### 翻译流程

1. 从用户输入解析文章索引（逗号/空格分隔）
2. Spawn 3-5 个 sonnet Agent 并行，每个处理 2-4 篇文章：

```
Agent({
  model: "sonnet",
  description: "Translate articles X,Y,Z CN->EN",
  prompt: `你是专业中英翻译。读取 articles.json。
对索引 X, Y, Z 的文章：提取每个 paragraphs 数组条目中的 CN 段落文本。
将每个 CN 段落翻译为自然流畅的英文。

规则:
- 逐段翻译，每个 CN 段落对应一个 EN 翻译
- 保留格式：列表项（* 或 -）保持列表格式
- 标题保持标题格式
- 简洁准确，匹配原文语气和含义
- 不要添加开头/结尾说明

输出 ONLY valid JSON（无 markdown 围栏）:
[
  {"articleIndex": X, "translations": ["EN段0", "EN段1", ...]},
  {"articleIndex": Y, "translations": [...]},
  {"articleIndex": Z, "translations": [...]}
]

translations 数组必须与 paragraphs 数组长度完全一致。仔细数。`
})
```

3. 收集所有 Agent 结果，用 Node.js 脚本应用到 articles.json：

```bash
node -e "
const fs = require('fs');
const FILE = 'articles.json';
const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
const translations = JSON.parse(fs.readFileSync('/dev/stdin', 'utf-8'));
for (const item of translations) {
  const a = data.articles[item.articleIndex];
  for (let i = 0; i < a.paragraphs.length; i++) {
    if (i < item.translations.length) a.paragraphs[i].en = item.translations[i];
  }
  a.content_en = a.paragraphs.map(p => p.en || '').filter(Boolean).join('\n\n');
}
fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log('Updated ' + translations.length + ' articles');
" < /tmp/translations.json
```

4. 重建所有页面：

```bash
node build-all.js
```

---

## 关键文件

| 文件 | 用途 |
|------|------|
| `articles.json` | 数据源，每篇文章有 `paragraphs: [{cn, en}]` |
| `build-all.js` | 静态站点生成器，`makeBody()` 渲染双语布局 |
| `assets/css/article.css` | `.para-pair` flex 布局、切换样式、响应式 |
| `index.html` | 首页（手动维护，客户端 JS 读 articles.json 显示最新 4 篇） |
| `archive.html` | 归档页（手动维护，客户端 JS 全文搜索 + 分页） |
| `scripts/daily-articles.sh` | Cron bridge 脚本（7:20 AM 自动执行归档模式） |

## 常见问题

| 问题 | 原因 | 修复 |
|------|------|------|
| EN 是 Cloudflare/垃圾文本 | 原始抓取触发机器人防护 | 仅从 CN 重新翻译，删除垃圾 EN 段落 |
| 段落数不匹配 (cn != en) | 旧的机械分割产生错误段数 | 从头重新翻译所有段落 |
| EN 元数据偏移 | EN 有标题/日期行但 CN 没有 | 重新翻译可完全消除此问题 |
| Agent 输出不完整 | 大文章超出 token 限制 | 减小批量（每 Agent 1-2 篇） |

根本原则：**永远不要依赖机械文本分割**。始终逐段翻译，确保每个 CN 段落都有对应的 EN 翻译。
