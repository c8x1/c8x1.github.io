# 每日精选 | Daily Curated

每天精选高质量英文文章，翻译为中文，搭配 AI 生成哲学寓言。

## 网站内容

**每日精选**是一个中英双语阅读平台，每天更新 3 篇文章：

- **2 篇翻译文章** — 从 Aeon、The Atlantic、The Guardian 等来源精选哲学、科技、人文类深度文章，全文翻译为中文，支持中英对照阅读
- **1 篇 AI 寓言** — 使用 Amanda Askell 的寓言提示技巧，将哲学/科学概念写成引人入胜的故事，末尾揭晓概念

目前收录 81 篇文章，涵盖哲学、人工智能、技术趋势、伦理学、量子计算等话题。

**访问地址**: [c8x1.github.io](https://c8x1.github.io)

## 技术架构

- **静态站点** — GitHub Pages 托管，无后端服务
- **构建工具** — `build-all.js` 从 `articles.json` 生成所有文章页面、RSS feed、sitemap
- **每日归档** — Claude Code cron 任务（`scripts/daily-articles.sh`）每天自动执行：搜索文章 → 翻译 → 生成页面 → git push
- **寓言队列** — `admin.html` 管理界面通过 GitHub Contents API 管理寓言概念队列
- **双语布局** — 每篇文章支持中英对照显示，点击按钮切换

## 文件结构

```
c8x1.github.io/
├── index.html              # 首页（显示最新 4 篇文章）
├── archive.html            # 归档页（全文搜索 + 分页浏览）
├── admin.html              # 寓言概念队列管理
├── build-all.js            # 静态站点生成器
├── articles.json           # 文章数据源（构建用，1.7MB）
├── articles-index.json     # 轻量索引（前端加载，70KB）
├── parable-queue.json      # 寓言概念队列（FIFO）
├── feed.xml / sitemap.xml  # SEO 文件
├── articles/               # 文章 HTML 页面
│   └── 2026/
│       ├── 02/             # 按年/月组织
│       ├── 03/
│       ├── 04/
│       └── 05/
├── assets/                 # 共享样式和脚本
│   ├── css/main.css
│   ├── css/article.css
│   └── js/main.js
├── data/                   # Trending 数据（cron 生成）
├── scripts/                # 工具脚本
│   ├── daily-articles.sh   # 文章归档 cron
│   ├── daily-trending.sh   # GitHub Trending 归档 cron
│   └── build-monthly.js    # 月度数据生成
└── .claude/skills/         # Claude Code 技能定义
    ├── translate-articles/ # 翻译和文章归档自动化
    └── github-trending/    # GitHub Trending 归档自动化
```

### 关键文件说明

| 文件 | 用途 |
|------|------|
| `articles.json` | 全量文章数据（含段落、翻译），仅构建时使用 |
| `articles-index.json` | 轻量索引（标题、摘要、分类），前端加载 |
| `parable-queue.json` | 寓言概念队列：`queue`（待生成）+ `used`（已用过） |
| `build-all.js` | 读取 articles.json → 生成 HTML + RSS + sitemap |

## 本地预览

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000
```

## 新机器部署

在一台新电脑上 clone 后，3 步设置每日自动归档（文章 + GitHub Trending）：

### 1. 安装依赖

```bash
# Node.js (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install --lts

# Claude Code CLI
npm install -g @anthropic-ai/claude-code
claude auth login   # 或设置 ANTHROPIC_API_KEY 环境变量
```

### 2. Clone 并验证

```bash
git clone git@github.com:c8x1/c8x1.github.io.git
cd c8x1.github.io

# 验证脚本能找到依赖
bash scripts/daily-trending.sh   # 手动跑一次 trending
bash scripts/daily-articles.sh   # 手动跑一次文章归档
```

脚本会自动检测：
- **Node.js** — 从 PATH 或 `~/.nvm/versions/node/` 查找
- **claude CLI** — 从 PATH 查找
- **代理** — 默认 `http://127.0.0.1:7897`，可通过环境变量 `https_proxy` 覆盖，设 `NO_PROXY=1` 禁用

### 3. 设置 Cron

```bash
# 编辑 crontab
crontab -e

# 每天早上 7:03 执行 GitHub Trending 归档
3 7 * * * /bin/bash /path/to/c8x1.github.io/scripts/daily-trending.sh

# 每天早上 7:20 执行文章归档
20 7 * * * /bin/bash /path/to/c8x1.github.io/scripts/daily-articles.sh
```

日志分别输出到 `logs/trending-YYYY-MM-DD.log` 和 `logs/articles-YYYY-MM-DD.log`。
