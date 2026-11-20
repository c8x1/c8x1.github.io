---
name: translate-articles
description: "Translate and align bilingual CN/EN paragraphs for blog articles. Use 'archive' keyword for non-interactive daily pipeline (Track 1 / Claude Opus): fetch 1 English philosophy/classics article + generate 1 Claude Opus AI parable via scripts/parable-ctl.js & concept-pool.json, build bilingual pages, and git push. (The 2nd daily parable is generated independently by Gemini via Antigravity automation.) Also use for fixing paragraph alignment, re-translating, or any bilingual content work on c8x1.github.io."
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

归档模式是**非交互式**的：不需要用户确认，自动完成搜索 → 翻译 → 寓言生成 → 校对入库 → 推送全流程。

**双模型每日分工（重构版）**：
- **轨道 1（本 skill / `07:20` crontab `daily-articles.sh` / Claude Opus）**：每天产 **1 篇英文哲学/经典翻译 + 1 篇 Claude Opus 寓言**（共 2 篇）。
- **轨道 2（`07:55` Antigravity 定时自动化 / Gemini）**：独立产当天 **第 2 篇 Gemini 寓言**（见 `scripts/GEMINI-PARABLE-GUIDE.md`）。
- 两条轨道共用 **`concept-pool.json`**（277+ 跨学科大池）、**`scripts/parable-ctl.js`**（确定性选词/防撞/入库脚本）和 **`concept-briefs.json`**，保证同日不同概念、不同学科、不同视角，并统一署名。

### 归档第一步：搜索英文文章

使用 WebSearch 搜索高质量英文文章。每次从以下搜索词池中选 1 个词：

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

对选中的 1 篇文章，用 `mcp__web_reader__webReader` 获取正文：

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

**EN 段落提取防护**：enParagraphs 只应包含文章正文段落。必须验证：
- 每个 EN 段落应为英文（不包含中文指令文本）
- 最后一段应以完整英文句子结尾（句号、问号或引号）
- 如果最后一段包含非英文内容（如翻译指令残留），截断到上一个正常段落

如果某篇文章获取失败或正文段落 < 3，搜索替代文章。

### 归档第三步：翻译

使用 1 个 opus Agent 翻译 1 篇文章：

```
Agent({ model: "opus", description: "Translate 1 article EN->CN",
  prompt: `你是专业英译中翻译。翻译以下文章的段落。

文章: {title}
段落:
{en_paragraphs_json}

规则:
- 每个英文段落翻译为自然流畅的中文
- 保留列表格式（* 或 -）
- 标题保留为标题
- 人名、地名、专有名词第一次出现时标注英文原文，如：笛卡尔（René Descartes）
- 不要添加开头/结尾说明
- 不要添加 markdown 代码围栏
- **中文引号必须使用「」（U+300C/U+300D），绝对不要使用 ""（ASCII 双引号）或 ""（弯引号），否则会破坏 JSON 格式**

输出 ONLY valid JSON（无 markdown 围栏，无解释）:
{"title_cn": "中文标题", "translations": ["CN段0", "CN段1", ...]}

translations 数组长度必须与输入段落数完全一致。仔细数。` })
```

### 归档第三步半：生成 1 篇 Claude Opus 寓言（第 2 篇文章）

与翻译 Agent **并行**执行：1 个翻译 Agent + 1 条 Claude Opus 寓言链（内部串行：选概念 → 调研 → 写作 → 验证 → 校对入库）。寓言草稿写入 `/tmp/parable_article_claude.json`。

1. **通过 `scripts/parable-ctl.js` 确定性选概念（不再手工扫描 `articles.json` 或硬编码概念池）**：

```bash
cd ~/Workspace/trySth/c8x1.github.io && node scripts/parable-ctl.js pick --model claude
```

脚本会直接输出精简 JSON 任务包（< 4 KB）：
- 若 `status === "already_done"`：今天 Claude Opus 已经发过寓言，**跳过寓言步骤**（仅处理英文翻译篇即可）。
- 若 `status === "ready"`，任务包已自动完成：
  - 优先消耗 `parable-queue.json` 手工插队队列，否则从 `concept-pool.json` 优先选取 **历史使用 0 次（最少使用）+ 与同日 Gemini 篇及近 2 天不同学科** 的概念；
  - 自动轮换并防撞分配 `perspective`（4 视角之一）；
  - 返回 `concept`、`concept_cn`、`domain_cn`、`cached_brief`（命中则直接复用，未命中为 `null`）、`recent_names`（最近 8 篇及同日另一篇主角名）、`recent_motifs`（近 60 条母题）、`pool_stats`。
- **自动补池**：若 `pool_stats.needs_refill === true`（未用概念 < 20 个），在本轮完成后顺手用 opus 提名 30 个全新、具强结构张力的跨学科概念写成 JSON 数组 `/tmp/refill_concepts.json`（格式 `[{"concept":"...","concept_cn":"...","domain":"physics|math|biology|chemistry|cs|ai|economics|psychology|systems|philosophy"}]`），执行 `node scripts/parable-ctl.js refill --file /tmp/refill_concepts.json` 去重入池。

2. **概念调研（grounding）**——若任务包中 `cached_brief` 非空，直接复用；若为 `null`，跑调研 Agent 产出 brief 并保存：

```
Agent({ model: "opus", description: "Ground concept [concept_cn]",
  prompt: `为跨学科概念 [concept]（[concept_cn]）做调研，产出 brief，作为寓言写作与校验的唯一事实基准。不得凭记忆编造。

步骤:
1. 用 Bash curl 抓 Wikipedia（走代理 https_proxy=http://127.0.0.1:7897）。先 https://en.wikipedia.org/wiki/[concept_下划线]，再 https://zh.wikipedia.org/wiki/[concept_cn]。WebSearch 兜底。
2. 从正文提炼，不照搬。

输出 JSON（用 Write 写入 /tmp/concept_brief_claude.json 并返回）:
{
  "concept": "英文概念名（与任务包 concept 严格一致）",
  "concept_cn": "中文概念名",
  "definition_cn": "一句话定义",
  "definition_en": "one-sentence definition",
  "core_mechanism": "核心机制一句话，注明是否非意愿过程（selection-driven / mechanical / deterministic 等）",
  "key_relations": ["核心关系1", "核心关系2"],
  "common_misconceptions": ["常见误区1", "..."],
  "literal_domain_to_avoid": "故事不得设在此字面领域；定理/抽象原则类按需填写或填 null",
  "is_process_type": true/false,
  "canonical_sentence_cn": "标准一句话陈述",
  "canonical_sentence_en": "..."
}` })
```

调研完成后立即入库缓存：
```bash
cd ~/Workspace/trySth/c8x1.github.io && node scripts/parable-ctl.js save-brief --file /tmp/concept_brief_claude.json
```

3. **生成寓言**——把任务包里的 `concept`、`concept_cn`、`perspective`、`brief`、`recent_motifs` 填入下面 prompt，写入 `/tmp/parable_article_claude.json`：

```
Agent({ model: "opus", description: "Generate Claude Opus parable for [concept_cn]",
  prompt: `写一则寓言，揭示概念 [concept_cn]（[concept]）。下面这份 brief 是你唯一的事实源——所有声明必须与 brief 一致，不得凭记忆编造。

BRIEF:
{BRIEF_JSON}

硬约束:
1. 隐喻距离: 故事世界不得设在 brief.literal_domain_to_avoid 或概念字面领域。找一个 disparate 的人/日常/社会境况，其结构（角色关系、张力、抉择）镜像 brief.core_mechanism 与 key_relations。映射必须结构性（关系同构），不得词法改名换皮。
2. 赌注/两难: 必须有角色面临真实代价或两难抉择，不得是过程的平铺直叙。
3. 视角: 本次用 [PERSPECTIVE]。
4. 概念名不得在故事正文出现，只在末尾「注解」中给出。
5. 结尾格式（强制）: 故事讲完后另起一段，以「注解：」开头（英文段以 "Note:" 开头），1-2 句日常语言点明概念名(CN+EN)与核心机制（与 brief.key_relations 一致），可再加半句诚实边界说明。此段是作者注解，坦白跳出寓言，禁止用「这则故事揭示了…的本质」这类伪叙事。末段末尾加上落款：CN 末尾加「（本文由 Claude Opus 创作）」，EN 末尾加 " (Written by Claude Opus)"。
6. 体例: 译名 中文（English）全角括号；全角标点 ，。；：「」。EN 对白统一用双引号 ""。
7. 标题: 英文标题，不提概念名；标题核心名词/意象必须在中译文正文出现 ≥1 次。
8. 意象自足: 正文不得用技术/数学/学科术语标注意象——命名权全部留给注解段。
9. 赌注兑现: 正文立起的每一个具体赌注（生死、期限、危机、赌局）必须在结尾前得到交代；无法兑现就不要立。
10. 句式纪律: 「不是A，而是B」/「并非A——是B」句式全篇 ≤1 次；三连排比列举全篇 ≤1 次；每段破折号插入语 ≤2 处；同一论点正文只许陈述一次，结尾不得预告注解内容。
11. 跨篇去重: 近期已用母题禁止逐字或近义复用: {RECENT_MOTIFS}。近期已用主角名禁止撞名: {RECENT_NAMES}。永久黑名单: 「手心全是汗 / palms slick with sweat」、「并非跳过 / not skip it」。
12. 对话体特别约束: 若 [PERSPECTIVE] 为对话体，知晓者必须付出真实代价、或提问者必须拒绝/反抗/付出代价——禁止纯苏格拉底问答讲义与「权威下达不可能要求」开局。

输出 JSON（用 Write 写入 /tmp/parable_article_claude.json）:
{ "title_en": "...", "title_cn": "...", "paragraphs": [{"en":"...","cn":"..."}, ...] }
段落数 5-8。注解段作为最后一个 paragraph。EN/CN 段数完全一致。` })
```

4. **验证（V1-V12）**——读取 `/tmp/parable_article_claude.json`，跑验证 Agent，brief 为基准。任一 fail 则把 `failed` 与 `reasons` 回灌 writer prompt 重生成一次，再不过则当天跳过该寓言并在日志记 `skip: concept (reason)`，不影响英文翻译篇。

```
Agent({ model: "opus", description: "Verify Claude Opus parable",
  prompt: `校验寓言是否合格。概念 brief 为事实基准。

BRIEF: {BRIEF_JSON}
PARABLE: {PARABLE_JSON}
近期已用主角名: {RECENT_NAMES}
近期已用意象/母题: {RECENT_MOTIFS}

逐项 pass/fail + 一句理由:
V1 概念名(CN或EN)在末两段(含注解)出现
V2 标题核心意象在正文 cn 出现 ≥1 次
V3 科学准确: 注解段及正文声明是否与 brief.key_relations/core_mechanism 矛盾
V4 命名: 主角名与近期已用主角名不撞
V5 标点: cn 段全角标点(，。；：「」)，无半角逗号/句号
V6 译名格式: 统一 中文（English）全角括号
V7 距离: 故事设定未落在 brief.literal_domain_to_avoid 或概念字面领域
V8 软目的论: 若 brief.core_mechanism 为非意愿过程，故事是否给它塞了意愿/品德/耐心
V9 赌注兑现: 正文立起的每个具体赌注/钩子结尾前有交代；立而未收即 fail
V10 中英一致: 数字、代数、年数、人名、注解标签 CN/EN 逐项一致；EN 段无中文残留；EN 对白用双引号；注解标签 CN「注解：」/ EN "Note:"
V11 句式密度: 「不是A而是B」≤1、三连排比 ≤1、正文无技术/数学术语标注意象
V12 跨篇重复: 与 {RECENT_MOTIFS} 无逐字或近义重复；时间线内部自洽

输出 ONLY JSON: 任一 fail → {"reject":true,"failed":["V3"],"reasons":["..."]}；全 pass → {"reject":false}。` })
```

5. **机械校对 + 署名规范化 + 原子入库（一条命令完成）**：

提炼本篇 3-4 个短母题串（用 `|` 分隔），调用 `parable-ctl.js ingest`（内部会自动运行 `scripts/proofread-parable.js`、自动统一写入 `subtitle: "寓言故事 · Claude Opus"`、`author: "Claude Opus · AI Parable"`、`tags` 与末段落款、写入 `articles.json` 与 `parable-queue.json`）：

```bash
cd ~/Workspace/trySth/c8x1.github.io && node scripts/parable-ctl.js ingest \
  --file /tmp/parable_article_claude.json \
  --model claude \
  --concept "[concept]" \
  --motifs "母题1|母题2|母题3" \
  --skip-build
```

若 `proofread-parable.js` 返回 WARN（exit code 1），将 WARN 列表回灌 writer prompt 重生成一次（与 V1-V12 重生成合并计次），仍不过则当天跳过寓言。

### 归档第四步：将翻译文章追加到 articles.json

定义 **`SITE_DIR`** = `~/Workspace/trySth/c8x1.github.io`

（寓言已由上一步 `parable-ctl.js ingest` 写入 `articles.json`，本步只需追加第 1 篇英文翻译文章。）

1. 用 Node.js 脚本读取 `$SITE_DIR/articles.json`，追加翻译文章对象（避免全量 Read 14MB JSON）：

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
  "file": "articles/YYYY/MM/YYYY-MM-DD-slug.html",
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

slug 生成规则：取英文标题，去掉特殊字符，空格转连字符，截断 60 字符。更新 `data.meta.totalArticles = data.articles.length` 与 `data.meta.updated = 当天日期` 后写回 `articles.json`。

### 归档第五步：生成页面

```bash
cd ~/Workspace/trySth/c8x1.github.io && node build-all.js
```

build-all.js 会自动：
- 为所有文章生成 HTML 页面（含新增的翻译篇与 Claude Opus 寓言篇）
- 更新 feed.xml、sitemap.xml 和 articles-index.json
- 首页和归档页无需修改（客户端 JS 已按日期降序排序，新文章自动出现在最前面）

### 归档第六步：Git 提交并推送

```bash
cd ~/Workspace/trySth/c8x1.github.io
git add articles.json articles-index.json articles/ feed.xml sitemap.xml parable-queue.json concept-briefs.json concept-pool.json
git add -u '*.html'
git commit -m "archive: YYYY-MM-DD +2 articles (category1, 寓言故事·Claude Opus)"
git stash -q || true
git pull --rebase origin master
git stash pop -q 2>/dev/null || true
git push origin master
```

如果推送失败，使用代理重试（SSH 经 Clash SOCKS5）：
```bash
cd ~/Workspace/trySth/c8x1.github.io && GIT_SSH_COMMAND="ssh -o HostName=ssh.github.com -o Port=443 -o ProxyCommand='nc -X 5 -x 127.0.0.1:7897 %h %p'" git push origin master
```

### 归档模式 — 输出摘要

完成后输出：

```
[归档完成]

日期: YYYY-MM-DD
新增: 2 articles (1 翻译 + 1 寓言·Claude Opus)
总计: N articles

文章:
  1. 中文标题1 (哲学) — Aeon
  2. 寓言标题1 (寓言故事 · Claude Opus) — [concept_cn]

概念池余量: X 未写 / Y 总计
Git: 已提交并推送到 origin/master
```

### 归档模式 — 错误处理

| 场景 | 处理 |
|------|------|
| WebSearch 无结果 | 换关键词重试一次 |
| 文章页面获取失败 | 跳过该文章，搜索替代 |
| 翻译 Agent 失败 | 单独重试该文章一次 |
| 寓言 Agent 失败 | 重试一次，换概念再试 |
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

对指定索引的文章进行并行 opus 翻译。

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
2. Spawn 3-5 个 opus Agent 并行，每个处理 2-4 篇文章：

```
Agent({
  model: "opus",
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
| `parable-queue.json` | 寓言概念队列（FIFO），`queue` 待生成 + `used` 已用，为空时回退到随机选取 |
| `admin.html` | 寓言概念管理页面，通过 GitHub Contents API 管理队列 |
| `build-all.js` | 静态站点生成器，`makeBody()` 渲染双语布局 |
| `assets/css/article.css` | `.para-pair` flex 布局、切换样式、响应式 |
| `index.html` | 首页（客户端 JS 读 articles-index.json 显示最新 4 篇） |
| `archive.html` | 归档页（客户端 JS 读 articles-index.json，全文搜索 + 分页） |
| `scripts/daily-articles.sh` | Cron bridge 脚本（7:20 AM 自动执行归档模式） |

## 常见问题

| 问题 | 原因 | 修复 |
|------|------|------|
| EN 是 Cloudflare/垃圾文本 | 原始抓取触发机器人防护 | 仅从 CN 重新翻译，删除垃圾 EN 段落 |
| 段落数不匹配 (cn != en) | 旧的机械分割产生错误段数 | 从头重新翻译所有段落 |
| EN 元数据偏移 | EN 有标题/日期行但 CN 没有 | 重新翻译可完全消除此问题 |
| Agent 输出不完整 | 大文章超出 token 限制 | 减小批量（每 Agent 1-2 篇） |

根本原则：**永远不要依赖机械文本分割**。始终逐段翻译，确保每个 CN 段落都有对应的 EN 翻译。
