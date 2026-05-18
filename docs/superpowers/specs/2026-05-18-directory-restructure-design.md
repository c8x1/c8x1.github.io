# Directory Restructure & README Rewrite

## Goal

将文章 HTML 从根目录日期文件夹（31 个 `YYYY-MM-DD/`）和扁平 `articles/` 迁移到 `articles/YYYY/MM/` 两级子目录结构，并重写 README。

## Current State

- 31 个根目录日期文件夹（2025-02-25/ 到 2026-04-05/），共 111 个 HTML
- `articles/` 扁平目录存 9 篇最新文章
- 总计 81 篇文章，每天 +3 篇持续增长
- README 过时（描述已删除的 dist/ 目录和迁移计划）

## Target State

### 目录结构

新路径格式：`articles/YYYY/MM/YYYY-MM-DD-slug.html`

```
articles/
  2025/
    02/
      2025-02-25-collapse.html
      2025-02-25-seeing-like-a-state.html
      ...
    03/
      2025-03-07-selective-amnesia-llm-unlearning.html
      ...
  2026/
    03/
      2026-03-08-xxx.html
      ...
    04/
      ...
    05/
      2026-05-18-the-glassblower-who-made-people.html
      ...
```

迁移后删除：31 个旧日期目录 + articles/ 下的扁平文件。

### README

三段式结构：
1. **网站介绍** — 每日精选，内容类型（哲学/科技翻译 + AI寓言），更新频率
2. **技术架构** — 静态站点（GitHub Pages），构建管线（build-all.js），每日归档 cron 流程
3. **文件结构** — 目录树 + 关键文件说明（articles.json, parable-queue.json, data/ 等）

删除所有过时内容。

## Changes Required

### 1. articles.json — 更新所有 file 字段

```
旧: "file": "2026-03-08/slug.html"
新: "file": "articles/2026/03/2026-03-08-slug.html"

旧: "file": "articles/2026-05-18-slug.html"
新: "file": "articles/2026/05/2026-05-18-slug.html"
```

### 2. build-all.js — 修改输出路径逻辑

`generateArticle()` 写入路径改为从 article.date 提取 YYYY/MM：

```javascript
const date = new Date(article.date);
const yearDir = `articles/${date.getFullYear()}`;
const monthDir = `${yearDir}/${String(date.getMonth()+1).padStart(2,'0')}`;
const out = path.join(ROOT_DIR, monthDir, path.basename(a.file));
```

### 3. 物理文件迁移

Node.js 脚本：
- 读 articles.json 获取所有旧 file 路径
- 创建目标 articles/YYYY/MM/ 目录
- `fs.renameSync(旧路径, 新路径)`
- 迁移完后删除空旧目录

### 4. SKILL.md — 更新路径引用

- git add 行改为 `git add articles/`
- 路径描述更新

### 5. README.md — 完全重写

按上述三段式结构。

## Out of Scope

- `data/` 目录不动（trending JSON 独立管线）
- `scripts/` 目录不动
- `assets/` 目录不动
- 文章内容/翻译质量不涉及

## Execution Order

1. 物理迁移文件
2. 更新 articles.json file 字段
3. 更新 build-all.js
4. 运行 build-all.js 重新生成所有页面（含新导航链接）
5. 重写 README.md
6. 更新 SKILL.md
7. Git 提交推送
