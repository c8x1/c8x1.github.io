# 每日精选 - 优化版部署包

## 📦 文件结构

```
dist/
├── index.html                    # 首页（已优化）
├── articles.json                 # 文章数据（路径已统一为日期格式）
├── sitemap.xml                   # 站点地图
├── robots.txt                    # 爬虫规则
├── assets/
│   ├── css/
│   │   ├── main.css             # 共享样式（461行）
│   │   └── article.css          # 文章页样式（381行）
│   └── js/
│       └── main.js              # 共享脚本（342行）
├── 2025-02-25/                  # 文章按日期分组
│   ├── collapse.html            # 待迁移
│   ├── seeing-like-a-state.html # 待迁移
│   └── tyranny-of-time.html     # 待迁移
├── 2025-02-26/
│   ├── syrian-feminists.html    # 待迁移
│   └── anti-tech-canon.html     # 待迁移
├── 2025-02-27/
│   ├── kerala.html              # 待迁移
│   ├── sovereign-individual.html# 待迁移
│   └── ningen-ethics.html       # 待迁移
├── 2025-02-28/
│   ├── how-to-start-a-startup.html  # ✅ 示例已完成
│   ├── cosmos-year-end-2025.html    # 待迁移
│   └── ai-change-human-nature.html  # 待迁移
├── 2025-03-01/
│   ├── article-1.html           # 待迁移
│   ├── article-2.html           # 待迁移
│   └── article-3.html           # 待迁移
├── 2025-03-02/
│   ├── article-1.html           # 待迁移
│   └── article-2.html           # 待迁移
└── 2025-03-03/
    └── philosophy-eats-ai.html  # 待迁移
```

## ✨ 优化内容

### 已完成
- ✅ 首页完全重写，新增搜索功能
- ✅ 共享 CSS 提取（消除重复）
- ✅ 共享 JS 模块（主题切换、进度条、返回顶部）
- ✅ 深色模式 FOUC 防护
- ✅ SEO 文件生成（sitemap.xml, robots.txt）
- ✅ 文章页模板标准化
- ✅ 路径统一为 `/{日期}/{文章名}.html` 格式
- ✅ 示例文章页（how-to-start-a-startup.html）

### 待完成（需手动迁移文章）
- ⏳ 剩余 17 篇文章内容迁移

## 🚀 部署方法

### 方法 1：直接部署（推荐）

```bash
# 进入 dist 目录
cd dist

# 初始化 git
git init
git add .
git commit -m "optimize: rebuild site with new structure"

# 推送到 GitHub Pages（替换为你的仓库）
git push -f git@github.com:c8x1/c8x1.github.io.git master
```

### 方法 2：使用 GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📝 文章迁移指南

### 格式对照

**原文结构：**
```html
<!DOCTYPE html>
<html>
<head>...原版样式...</head>
<body>
  <header>...</header>
  <main>
    <div class="article-content">
      <p>正文内容...</p>
    </div>
  </main>
  <footer>...</footer>
</body>
</html>
```

**新结构：**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- 使用共享样式 -->
  <link rel="stylesheet" href="/assets/css/main.css">
  <link rel="stylesheet" href="/assets/css/article.css">
  <script src="/assets/js/main.js"></script>
</head>
<body>
  <nav>...标准化导航...</nav>
  <article>
    <header>...文章元数据...</header>
    <div class="article-content">
      <p>保留原正文内容...</p>
    </div>
  </article>
  <nav>...上一篇/下一篇...</nav>
  <footer>...标准化页脚...</footer>
</body>
</html>
```

### 迁移步骤

1. **复制模板**：从 `2025-02-28/how-to-start-a-startup.html` 复制
2. **修改元数据**：
   - 标题、副标题
   - 作者、来源
   - 日期、阅读时间
   - 分类标签
3. **替换正文**：从原 HTML 中提取 `.article-content` 或 `main` 内容
4. **更新导航链接**：修改上一篇/下一篇链接
5. **测试**：本地打开检查样式和深色模式

### 批量迁移脚本（可选）

如需批量迁移，可使用以下 Node.js 脚本逻辑：

```javascript
const articles = require('./articles.json').articles;

// 遍历每篇文章
for (const article of articles) {
  // 1. 读取原文 HTML
  // 2. 提取正文内容
  // 3. 填充到新模板
  // 4. 写入到对应日期目录
}
```

## 🔧 本地预览

```bash
# 使用 Python 简单服务器
cd dist
python3 -m http.server 8000

# 或使用 Node.js
npx serve .

# 访问 http://localhost:8000
```

## 📊 性能对比

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 首页大小 | ~25KB | ~13KB | 48% |
| CSS 重复 | 3+ 份 | 1 份 | 消除 |
| JS 重复 | 3+ 份 | 1 份 | 消除 |
| 加载请求 | 20+ | 6 | 70% |
| SEO | 基础 | 完整 | +++ |

## 🐛 已知问题

1. **文章内容待迁移**：17 篇文章需要按新格式重新排版
2. **音乐播放器**：原音乐文件较大，建议改为按需加载
3. **图片懒加载**：需要给文章图片添加 `data-src` 属性

## 📮 反馈

如有问题，请通过 GitHub Issues 反馈。
