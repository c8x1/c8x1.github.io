---
name: translate-articles
description: "Translate and align bilingual CN/EN paragraphs for blog articles. Use 'archive' keyword for non-interactive daily pipeline: fetch 1 English philosophy/classics article + generate 2 AI parables (Amanda Askell prompt technique), translate to Chinese, generate bilingual pages, update homepage, and git push. Also use for fixing paragraph alignment, re-translating, or any bilingual content work on c8x1.github.io."
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

目标：每天获取 1 篇英文哲学/经典文章 + 生成 2 篇 AI 寓言 → 翻译为中文 → 生成双语页面 → git push。

每天共 3 篇新文章：1 篇翻译 + 2 篇寓言。

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

### 归档第三步半：生成 AI 寓言（第 2、3 篇文章）

与翻译 Agent **并行**执行：1 个翻译 Agent + 2 条寓言链（每条内部串行：调研→写作→验证）。两条寓言链用**不同概念**，各自独立写入 `/tmp/parable_article_1.json` 和 `/tmp/parable_article_2.json`。

使用 Amanda Askell 的寓言提示技巧，用 opus Agent 生成 2 篇原创寓言文章：

1. **选择概念**（队列优先，LLM 语义判断兜底）— **本次需选 2 个不同概念，对每个概念独立执行下面的流程**：

   **先读 `$SITE_DIR/parable-queue.json`**：
   - 如果 `queue` 数组非空 → 取第一个元素作为本次概念（`concept` + `concept_cn`）
   - 用完后从 `queue` 中移除该元素，将 `concept` 追加到 `used` 数组
   - 用 Write 写回 `parable-queue.json`
   - **跳过下面的 LLM 判断逻辑，直接用队列概念进入第 2 步**
   - **选第 2 个概念时重复本流程**（若 queue 还有元素就再取一个；否则走下面的 LLM 判断，且必须与第 1 个不同）

   **如果 `queue` 为空** → 用 **LLM 语义判断**选新概念（不要靠字符串匹配，中英文别名要等价对待）：

   **第一步：建立权威「已用」集合**
   - Read `$SITE_DIR/articles.json`
   - 筛出所有 `category` 含「寓言故事」的文章
   - 收集它们的 `tags`（去掉 `Amanda Askell` 和 `寓言故事`）→ 这是权威已用集合
   - 同时合并 `parable-queue.json` 的 `used` 数组
   - 注意中英文等价：`道德运气` = `moral luck`，`自然选择` = `natural selection`，等

   **第二步：LLM 判断选新概念**
   - 你（opus）本身就是判断 LLM。对照下面的科学概念池，**逐一语义比对**已用集合：
     - 若池中某概念的中文或英文名与任一已用 tag **语义相同**（含同义词、中英对照、变体），视为已用
     - 从**语义上未用过**的概念里随机选一个
   - 推理过程要显式写出：列出已用集合 → 逐个排除池中已用项 → 从剩余里选
   - 若池中所有概念都已用过：把 `parable-queue.json` 的 `used` 数组清空（原内容移到 `archived` 字段），然后从全池重选
   - 选中后，将概念英文名追加到 `parable-queue.json` 的 `used` 数组并 Write 回写

```
概念池（基础科学 · 物理/数学/生物/化学，大学本科级别）：

物理：
1. entropy (熵)
2. the Heisenberg uncertainty principle (海森堡不确定性原理)
3. Brownian motion (布朗运动)
4. wave-particle duality (波粒二象性)
5. time dilation (时间膨胀)
6. Maxwell's demon (麦克斯韦妖)
7. the equivalence principle (等效原理)
8. Noether's theorem (诺特定理)
9. quantum tunneling (量子隧穿)
10. spontaneous symmetry breaking (自发对称性破缺)
11. the event horizon (事件视界)
12. the Bose-Einstein condensate (玻色-爱因斯坦凝聚)

数学：
13. Bayes' theorem (贝叶斯定理)
14. the central limit theorem (中心极限定理)
15. fractal self-similarity (分形自相似)
16. the Monty Hall problem (蒙提霍尔问题)
17. Euler paths (欧拉路径)
18. Cantor's diagonal argument (康托尔对角线论证)
19. Russell's paradox (罗素悖论)
20. the Mandelbrot set (曼德博集合)
21. Conway's Game of Life (康威生命游戏)
22. the four-color theorem (四色定理)

生物（已移除难寓言的过程类：trophic cascade / Red Queen / endosymbiosis / fitness landscape / central dogma；保留的若为过程类，brief 会标 is_process_type=true，由 V7/V8 严格校验）：
23. keystone species (关键物种)
24. apoptosis (细胞凋亡)
25. genetic drift (遗传漂变)
26. horizontal gene transfer (水平基因转移)
27. convergent evolution (趋同进化)
28. epigenetics (表观遗传)

化学：
34. Le Chatelier's principle (勒夏特列原理)
35. chirality (手性)
36. the hydrophobic effect (疏水效应)
37. Gibbs free energy (吉布斯自由能)
38. transition state theory (过渡态理论)
39. molecular self-assembly (分子自组装)
40. orbital hybridization (轨道杂化)

计算机科学：
41. the P vs NP problem (P 对 NP 问题)
42. the Byzantine generals problem (拜占庭将军问题)
43. the CAP theorem (CAP 定理)
44. deadlocks (死锁)
45. information entropy (信息熵)
46. Kolmogorov complexity (柯尔莫哥洛夫复杂性)
47. Amdahl's law (阿姆达尔定律)
48. the Byzantine fault tolerance (拜占庭容错)

AI / 机器学习（具时效性）：
49. overfitting (过拟合)
50. the bias-variance tradeoff (偏差-方差权衡)
51. gradient descent (梯度下降)
52. attention (注意力机制)
53. scaling laws (缩放定律)
54. RLHF (基于人类反馈的强化学习)
55. model collapse (模型崩溃)
56. adversarial examples (对抗样本)
57. double descent (双重下降)
58. the lottery ticket hypothesis (彩票假设)
```



2. **概念调研（grounding，新增）**——对每个选定的概念，先产出一份 brief 作为写作与校验的唯一事实基准，**不得凭记忆编造**。概念理解必须 grounded 于外部权威源。

   主循环：先 Read `$SITE_DIR/concept-briefs.json`（形如 `{"briefs": {"Noether's theorem": {...}}}`）；概念命中则复用；未命中跑下面的调研 Agent，append 写回。

```
Agent({ model: "opus", description: "Ground concept [concept_cn]",
  prompt: `为科学概念 [concept]（[concept_cn]）做调研，产出 brief，作为寓言写作与校验的唯一事实基准。不得凭记忆编造。

步骤:
1. 用 Bash curl 抓 Wikipedia（走代理 https_proxy=http://127.0.0.1:7897）。先 https://en.wikipedia.org/wiki/[concept_下划线小写]，再 https://zh.wikipedia.org/wiki/[concept_cn]。WebSearch 兜底（本环境常不可靠，仅作 fallback）。
2. 从正文提炼，不照搬。

输出 JSON（用 Write 写入 /tmp/concept_brief_N.json 并返回）:
{
  "concept": "英文概念名",
  "concept_cn": "中文概念名",
  "definition_cn": "一句话定义",
  "definition_en": "one-sentence definition",
  "core_mechanism": "核心机制一句话，注明是否非意愿过程（selection-driven / mechanical / deterministic 等）",
  "key_relations": ["如诺特: 时间平移对称→能量守恒", "空间平移对称→动量守恒"],
  "common_misconceptions": ["..."],
  "literal_domain_to_avoid": "故事不得设在此领域，如内共生→早期海洋/细胞/细菌；定理类填 null",
  "is_process_type": true/false,
  "canonical_sentence_cn": "标准一句话陈述",
  "canonical_sentence_en": "..."
}` })
```

3. **选视角（perspective rotation，新增）**——Read `$SITE_DIR/parable-queue.json` 的 `perspectiveCursor`（整数，默认 0）。视角池：

```
["全知旁观", "第一人称亲历", "对话体", "倒叙揭示"]
```

两篇寓言分别取 `pool[cursor % 4]` 与 `pool[(cursor+1) % 4]`，写回 `cursor = (cursor+2) % 4`，避免连续两篇同视角。

4. **生成寓言**——对 2 个概念各跑一次 opus Agent（**与翻译 Agent 并行**，寓言臂内部串行：调研→写作→验证），把下面 prompt 里 `N` 分别替换为 `1` 和 `2`，`[PERSPECTIVE]` 替换为上一步选定的视角，`{BRIEF_JSON}` 替换为该概念的 brief JSON：

```
Agent({ model: "opus", description: "Generate parable N for [concept_cn]",
  prompt: `写一则寓言，揭示科学概念 [concept_cn]（[concept]）。你拿到的不是裸概念名，而是下面这份 brief，它是你唯一的事实源——所有科学声明必须与 brief 一致，不得凭记忆编造。

BRIEF:
{BRIEF_JSON}

硬约束:
1. 隐喻距离: 故事世界不得设在 brief.literal_domain_to_avoid 或概念字面科学领域。找一个 disparate 的人/日常/社会境况，其结构（角色关系、张力、抉择）镜像 brief.core_mechanism 与 key_relations。映射必须结构性（关系同构），不得词法改名（禁止 cell→host、ATP→fire 这类换皮）。
2. 赌注/两难: 必须有角色面临真实代价或两难抉择，不得是过程的平铺直叙。
3. 视角: 本次用 [PERSPECTIVE]。
4. 概念名不得在故事正文出现，只在末尾「注解」中给出。
5. 结尾格式（强制）: 故事讲完后另起一段，以「注解：」开头，1-2 句日常语言点明概念名(CN+EN)与核心机制（与 brief.key_relations 一致）。此段是作者注解，坦白跳出寓言，不得伪装成故事，禁止用「这则故事揭示了…的本质」这类伪叙事。
6. 体例: 译名 中文（English）全角括号；全角标点 ，。；：「」。
7. 标题: 英文标题，不提概念名；标题核心名词/意象必须在中译文正文出现 ≥1 次。

输出 JSON（用 Write 写入 /tmp/parable_article_N.json）:
{ "title_en": "...", "title_cn": "...", "paragraphs": [{"en":"...","cn":"..."}, ...] }
段落数 5-8。注解段作为最后一个 paragraph。EN/CN 段数完全一致。` })
```

5. **验证（V1-V8，替换原「验证概念揭示」）**——对每个寓言（N=1,2）读取 `/tmp/parable_article_N.json`，跑验证 Agent，brief 为基准。任一 fail 则重生成一次（把 `failed` 列表与 `reasons` 回灌 writer prompt 再跑），再不过则当天跳过该概念并在日志记 `skip: concept (reason)`，不影响另一篇与翻译篇。

   `recent_names`：主循环从 `articles.json` 末 5 篇寓言 `paragraphs[0].cn` 中抽取人名（取 `（...）` 括号前的中文 token，或括号内的 Capitalized token），去重为数组传入。

```
Agent({ model: "opus", description: "Verify parable N",
  prompt: `校验寓言是否合格。概念 brief 为事实基准。

BRIEF: {BRIEF_JSON}
PARABLE: {PARABLE_JSON}
最近5篇寓言主角名: {RECENT_NAMES}

逐项 pass/fail + 一句理由:
V1 概念名(CN或EN)在末两段(含注解)出现
V2 标题核心意象在正文 cn 出现 ≥1 次
V3 科学准确: 注解段及正文声明是否与 brief.key_relations/core_mechanism 矛盾
V4 命名: 主角名与最近5篇不撞
V5 标点: cn 段全角标点(，。；：「」)，无半角逗号/句号
V6 译名格式: 统一 中文（English）全角括号
V7 距离: 故事设定未落在 brief.literal_domain_to_avoid 或概念字面领域
V8 软目的论: 若 brief.core_mechanism 为非意愿过程，故事是否给它塞了意愿/品德/耐心

输出 ONLY JSON: 任一 fail → {"reject":true,"failed":["V3"],"reasons":["..."]}；全 pass → {"reject":false}。` })
```

6. 验证通过后，构建寓言 article 对象：

```json
{
  "id": "slug-from-en-title",
  "title": "中文标题",
  "subtitle": "",
  "author": "AI Parable (inspired by Amanda Askell)",
  "source": "每日精选",
  "date": "YYYY-MM-DD",
  "category": ["寓言故事"],
  "tags": ["概念英文名 或 中文概念名", "Amanda Askell"],
  "summary": "中文摘要（取第一段翻译前150字，不含注解段）",
  "file": "articles/YYYY/MM/YYYY-MM-DD-slug.html",
  "originalUrl": "",
  "stats": { "wordCount": EN字数, "readTime": Math.max(1, EN字数/300) },
  "content_cn": "...",
  "content_en": "...",
  "paragraphs": [{"cn": "...", "en": "..."}, ...]
}
```

注意事项：
- 注解段作为最后一个 paragraph 保留（不再有 `---` 分隔行或 `Plain Explanation` 标记需要过滤）
- category 固定为 `["寓言故事"]`
- author 固定为 `"AI Parable (inspired by Amanda Askell)"`
- source 固定为 `"每日精选"`
- originalUrl 为空字符串（非抓取文章）
- summary 只取故事正文第一段，不含注解段

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

slug 生成规则：取英文标题，去掉特殊字符，空格转连字符，截断 60 字符。

3. 追加 3 篇新文章（1 篇翻译 + 2 篇寓言）到 `data.articles` 数组末尾
4. 更新 `data.meta.totalArticles` += 3
5. 更新 `data.meta.updated` = 当天日期
6. 用 Write 写回 articles.json

### 归档第五步：生成页面

```bash
cd ~/Workspace/trySth/c8x1.github.io && node build-all.js
```

build-all.js 会自动：
- 为所有文章生成 HTML 页面（含新增的 3 篇）
- 更新 feed.xml 和 sitemap.xml
- 首页和归档页无需修改（客户端 JS 已按日期降序排序，新文章自动出现在最前面）

### 归档第六步：Git 提交并推送

```bash
cd ~/Workspace/trySth/c8x1.github.io
# articles/ 按年/月组织（articles/YYYY/MM/），-u 暂存 build-all.js 重新生成的旧页面
git add articles.json articles-index.json articles/ feed.xml sitemap.xml parable-queue.json
git add -u '*.html'
git commit -m "archive: YYYY-MM-DD +3 articles (category1, 寓言故事, 寓言故事)"
# 先同步远端（trending cron 可能已推送 data/ 改动）
git stash -q || true
git pull --rebase origin master
git stash pop -q 2>/dev/null || true
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
新增: 3 articles (1 翻译 + 2 寓言)
总计: N articles

文章:
  1. 中文标题1 (哲学) — Aeon
  2. 寓言标题1 (寓言故事) — AI Parable
  3. 寓言标题2 (寓言故事) — AI Parable

文件:
  articles.json ✓
  articles/YYYY-MM-DD-slug1.html ✓
  articles/YYYY-MM-DD-slug2.html ✓
  articles/YYYY-MM-DD-slug3.html ✓
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
