# 每日 Trending 归档流程

> 供 Agent 执行的每日更新手册。每天执行一次，完成 GitHub Trending 数据抓取、JSON 快照写入、首页更新、git 推送。

## 前置条件

- 工作目录：`~/Workspace/trySth/trending-clones/c8x1.github.io/`
- Git 远程：`origin master` → `https://github.com/c8x1/c8x1.github.io.git`
- 网络：需要访问 `github.com/trending`（如网络受限，使用代理 `http://127.0.0.1:7897`）

## 执行步骤

### Step 1: 抓取 GitHub Trending 数据

访问 `https://github.com/trending?since=daily`，解析页面获取仓库列表。

使用 `mcp__web_reader__webReader` 获取页面内容，从返回的 markdown 中提取每个仓库的：
- `owner` / `name` → 组合为 `repo`（如 `tinyhumansai/openhuman`）
- `description` → 官方描述（后续可由 AI 覆盖为中文深度描述）
- `language` → 编程语言（无语言字段时为 `-`）
- `languageColor` → 语言颜色（从 GitHub 页面的彩色圆点获取，无则为 `#ccc`）
- `stars` → 总星数（纯数字字符串，如 `30,853` → `"30.9k"`）
- `starsDelta` → 今日新增星数（从 "stars today" 行提取）
- `url` → `https://github.com/owner/name`

**重要**：保留 GitHub 页面的原始排序，不要按 starsDelta 重新排序。GitHub 的排名算法综合考虑了多个因素。

### Step 2: 组装 JSON 快照

获取当天日期（格式 `YYYY-MM-DD`），组装为：

```json
{
  "date": "2026-05-14",
  "trending": [
    {
      "rank": 1,
      "repo": "owner/name",
      "desc": "GitHub 官方描述",
      "stars": "30.9k",
      "lang": "Python",
      "langColor": "#3572A5",
      "todayStars": "+1,234",
      "url": "https://github.com/owner/name"
    }
  ],
  "articles": [ ... ]
}
```

`articles` 数组：如果当天有新文章，添加进去；如果没有变化，复制 `data/latest.json` 中现有的 articles 数组。

### Step 3: 写入文件

1. **`data/YYYY-MM-DD.json`** — 当天快照（永久保留）
2. **`data/latest.json`** — 覆盖为当天快照的副本（首页固定引用）
3. **`data/index.json`** — 在数组头部插入新日期

```
data/
  index.json         ← 头部插入 "2026-05-14"
  latest.json        ← 覆盖为当天数据
  2026-05-14.json    ← 新建
  2026-05-13.json    ← 保留
  ...
```

### Step 4: 可选 — 生成中文深度描述

如果有时间/预算，对 trending 中的每个仓库：
1. 访问其 GitHub README
2. 理解项目技术实现
3. 用中文写一段 40-60 字的技术维度描述（不是官方营销文案）
4. 覆盖 `desc` 字段

如果跳过此步骤，`desc` 保留 GitHub 官方描述（英文），后续可手动补充。

### Step 5: Git 提交并推送

```bash
cd ~/Workspace/trySth/trending-clones/c8x1.github.io/
git add data/
git commit -m "archive: YYYY-MM-DD (N trending, M articles)"
git push origin master
```

提交消息示例：`archive: 2026-05-14 (25 trending, 4 articles)`

## 数据格式参考

### index.json

```json
["2026-05-14", "2026-05-13"]
```

倒序排列，新日期插到头部。

### YYYY-MM-DD.json

```json
{
  "date": "2026-05-14",
  "trending": [
    {
      "rank": 1,
      "repo": "owner/name",
      "desc": "描述文本",
      "stars": "30.9k",
      "lang": "Python",
      "langColor": "#3572A5",
      "todayStars": "+1,234",
      "url": "https://github.com/owner/name"
    }
  ],
  "articles": [
    {
      "id": "article-id",
      "category": "分类",
      "title": "标题",
      "excerpt": "摘要",
      "author": "作者",
      "date": "2026年3月2日",
      "readTime": "12分钟",
      "icon": "🧠",
      "url": "articles/article-id.html"
    }
  ]
}
```

### latest.json

与当天 `YYYY-MM-DD.json` 内容完全相同。

## 首页如何使用数据

`index.html` 通过 `fetch('data/latest.json')` 加载数据：
- 成功 → 用 JSON 中的 trending/articles 渲染卡片
- 失败 → 用内嵌的 fallback 数据渲染（确保离线也能显示）

## 归档页如何使用数据

`archive.html` 通过 `fetch('data/index.json')` 获取日期列表，然后逐个 `fetch('data/YYYY-MM-DD.json')` 渲染时间线。

## 错误处理

| 场景 | 处理 |
|------|------|
| GitHub Trending 页面获取失败 | 重试一次，仍失败则中止并报错 |
| 某个仓库信息解析失败 | 跳过该仓库，继续处理其他 |
| index.json 读取失败 | 创建新的 `["YYYY-MM-DD"]` |
| git push 失败 | 尝试使用代理：`https_proxy=http://127.0.0.1:7897 git push` |
| 当天快照已存在 | 覆盖更新（允许修正） |

## 示例：完整执行日志

```
[1/5] 抓取 GitHub Trending...
  → 获取到 25 个仓库

[2/5] 组装 JSON 快照...
  → date: 2026-05-14
  → trending: 25 items
  → articles: 4 items (from latest.json)

[3/5] 写入文件...
  → data/2026-05-14.json ✓
  → data/latest.json ✓
  → data/index.json ✓ (prepended 2026-05-14)

[4/5] 跳过中文深度描述（未启用）

[5/5] Git 提交并推送...
  → committed: archive: 2026-05-14 (25 trending, 4 articles)
  → pushed to origin/master ✓
```
