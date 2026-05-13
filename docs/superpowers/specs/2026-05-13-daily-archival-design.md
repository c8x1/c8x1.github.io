# 每日内容归档系统设计

## Context

c8x1.github.io 门户页有三个内容板块：GitHub Trending、每日精选文章、能力提升计划。其中 Trending 和文章每天都会刷新，如果没有归档机制，历史内容阅后即焚，无法回查。

现有文章归档系统（`dist/` + `build-all.js`）风格与新版门户页不统一，且没有 Trending 归档。需要设计一套统一的归档范式，支持：

1. **日记式回查**：按日期翻阅历史，看到那天 trending 了什么、推荐了什么文章
2. **自动化执行**：每日 agent 定时抓取 trending + 更新文章 + 归档历史 + push
3. **数据结构标准化**：JSON 快照格式固定，任何 agent 都能读写

## 设计决策

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 存储格式 | 每日一个 JSON 快照 | 原子单位，git 友好，不会互相冲突 |
| 命名规则 | `data/YYYY-MM-DD.json` | ISO 日期，自然排序即倒序 |
| 归档浏览 | 独立 `archive.html` 页面 | 按日期倒序的时间线，深色主题统一 |
| 首页数据源 | `data/latest.json` | 固定文件名，纯静态页面可直接 fetch |
| 索引文件 | `data/index.json` | GitHub Pages 无法动态列目录，需要显式索引 |
| 执行方式 | GitHub Actions 定时 + agent | 自动化无人值守 |

## 数据结构

### 每日快照 `data/YYYY-MM-DD.json`

```json
{
  "date": "2026-05-13",
  "trending": [
    {
      "rank": 1,
      "repo": "tinyhumansai/openhuman",
      "desc": "桌面端 AI 助手平台：Memory Tree + SQLite 记忆系统，一键 OAuth 连接 118+ 服务",
      "stars": "3.0k",
      "lang": "Rust",
      "langColor": "#dea584",
      "todayStars": "+1,014",
      "url": "https://github.com/tinyhumansai/openhuman"
    }
  ],
  "articles": [
    {
      "id": "philosophy-eats-ai",
      "category": "哲学 · 人工智能",
      "title": "哲学吞噬AI",
      "excerpt": "要让AI创造可持续的商业价值，领导者必须批判性地思考...",
      "author": "Michael Schrage",
      "date": "2026年3月2日",
      "readTime": "12分钟",
      "icon": "🧠",
      "url": "articles/philosophy-eats-ai.html"
    }
  ]
}
```

字段说明：
- `date`：ISO 日期字符串，与文件名一致
- `trending`：当天 GitHub Trending 列表，保留原始排名（`rank`）
- `trending.desc`：初始可用 GitHub 官方描述，后续 agent 可用 AI 生成中文深度描述覆盖
- `articles`：当天推荐的文章列表，引用已有文章系统，不重复存正文
- 所有字段为字符串，避免类型转换问题

### 索引文件 `data/index.json`

```json
["2026-05-13", "2026-05-12", "2026-05-11"]
```

按时间倒序排列。agent 每次执行时在数组头部插入新日期。

### 当天数据 `data/latest.json`

与当天 `YYYY-MM-DD.json` 内容完全相同。`index.html` 固定 fetch 这个文件名。

## 文件结构

```
c8x1.github.io/
  index.html              # 门户首页（JS 读取 data/latest.json）
  archive.html             # 归档时间线页（JS 读取 data/index.json + data/*.json）
  data/
    index.json             # 日期索引（倒序）
    latest.json            # 当天快照副本（index.html 固定引用）
    2026-05-13.json        # 每日快照（永久保存）
    2026-05-12.json
    ...
  articles/                # 文章详情页（保持现有）
  dist/                    # 旧归档系统（暂保留，不删除）
```

## 首页数据加载

`index.html` 的 `<script>` 改为异步加载数据：

```javascript
// 替换现有的硬编码 trending/articles 数组
fetch('data/latest.json')
  .then(function(r) { return r.json(); })
  .then(function(data) {
    renderTrending(data.trending);
    renderArticles(data.articles);
  })
  .catch(function() {
    // fallback：使用内嵌的默认数据（离线/首次加载）
    renderTrending(defaultTrending);
    renderArticles(defaultArticles);
  });
```

首页保留一份硬编码的 fallback 数据，确保 `latest.json` 不存在时页面不空白。

## 归档页面 `archive.html`

### 页面结构

```
┌─────────────────────────────────────────┐
│  Header（sticky，与首页统一）             │
│  c8x1 · Daily Curated    [日期]          │
├─────────────────────────────────────────┤
│  Hero                                    │
│  "历史归档"                              │
├─────────────────────────────────────────┤
│  < 2026年5月                             │
│  ┌─ 5月13日 ────────────────────────┐   │
│  │  🔥 Trending (11)                 │   │
│  │  紧凑列表卡片（同首页 compact）     │   │
│  │  📰 文章 (4)                      │   │
│  │  简化文章卡片                      │   │
│  └───────────────────────────────────┘   │
│  ┌─ 5月12日 ────────────────────────┐   │
│  │  ...                              │   │
│  └───────────────────────────────────┘   │
│                                          │
│  [加载更多]                              │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

### 加载策略

1. fetch `data/index.json` 获取所有日期
2. 取最近 30 天的日期
3. 并行 fetch 对应的 JSON 文件
4. 按月分组，组内按天倒序渲染
5. 底部"加载更多"按钮，每次加载 30 天

### 卡片样式

复用首页的 CSS 类：
- Trending：`.trending-compact` 紧凑卡片（rank + repo + desc + stats）
- 文章：简化卡片（title + category + author），无需渐变图标区

### 深色主题

与 `index.html` 完全相同的 CSS 变量和配色。

## Agent 执行流程（概要）

每日 agent 执行的完整步骤：

1. **抓取 GitHub Trending**：访问 `github.com/trending`，解析为 trending 数组（使用 GitHub 排名顺序）
2. **获取当日文章列表**：构建 articles 数组（来源待定，可能是 AI 筛选或手动更新）
3. **组装 JSON 快照**：构建完整的 `{ date, trending, articles }` 对象
4. **写入文件**：
   - `data/YYYY-MM-DD.json`（新快照）
   - `data/latest.json`（覆盖，供首页使用）
   - `data/index.json`（头部插入新日期）
5. **git commit + push**：消息格式 `archive: 2026-05-13 (11 trending, 4 articles)`

详细的 agent 执行手册将在单独的 spec 文档中定义。

## 不做的事

- 不改造现有 `dist/` 旧归档系统（暂保留）
- 不添加搜索功能（日记式回查不需要）
- 不添加分类/标签筛选（保持简单）
- 不在 CI 中调用 LLM API（描述生成由后续 agent 单独处理）
- 不改造 `articles/` 目录下的文章详情页

## 修改文件清单

| 文件 | 变更 |
|------|------|
| `index.html` | 改为异步加载 `data/latest.json`，保留 fallback 数据 |
| `archive.html` | 新建：归档时间线页面 |
| `data/latest.json` | 新建：当天数据快照 |
| `data/YYYY-MM-DD.json` | 新建：每日历史快照 |
| `data/index.json` | 新建：日期索引 |
