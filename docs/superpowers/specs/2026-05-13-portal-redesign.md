# c8x1.github.io 门户页重新设计

## Context

c8x1.github.io 当前以"每日精选文章"为主体，项目卡片藏在一个下拉面板里。随着内容维度增加（GitHub Trending 每日概览专栏即将上线），需要将门户页从"单内容型"改为"多专栏入口型"，让各内容板块平级展示。

## 设计决策

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 布局方案 | 纵向分区 | 三专栏自然阅读流，无需交互即可发现所有内容 |
| 视觉风格 | 深色系（与 cortex-m-audio-learning 统一） | 视觉一致性，未来子站逐步统一 |
| 专栏展示 | 卡片墙（最新 3-5 条 + 查看全部链接） | 用户已确认偏好 |
| Trending 专栏 | 先放 placeholder 卡片 | 数据源未接入，骨架搭好等填充 |
| 改动范围 | 仅 `index.html` 单文件重写 | 最小改动，不影响归档页和构建脚本 |

## 页面结构

```
┌─────────────────────────────────────────┐
│  Header（sticky）                        │
│  c8x1 · Daily Curated    [日期]          │
├─────────────────────────────────────────┤
│  Hero（精简）                             │
│  "每日精选 × 开源趋势 × 技术学习"          │
├─────────────────────────────────────────┤
│  Section 1: 📰 每日精选                   │
│  标题行 + "查看全部归档 →"                 │
│  4 张文章卡片（grid）                     │
├─────────────────────────────────────────┤
│  Section 2: 🔥 GitHub Trending           │
│  标题行 + "查看全部 →"                    │
│  4 张 placeholder repo 卡片              │
├─────────────────────────────────────────┤
│  Section 3: 📦 项目                      │
│  标题行 + "github.com/c8x1 →"            │
│  4 张项目卡片                             │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

## 色彩体系（深色主题）

| 元素 | 色值 | 用途 |
|------|------|------|
| 背景 | `#020617` | 页面底色（dark-900） |
| 卡片 | `#0f172a` | 卡片底色（dark-800） |
| 边框 | `#1e293b` | 卡片边框、分割线（dark-700） |
| 正文 | `#e2e8f0` | 主要文字（slate-200） |
| 次要文字 | `#94a3b8` | 描述、日期（slate-400） |
| 强调色 | `#3b82f6` | 链接、标题高亮（blue-500） |
| 文章图标区 | `#667eea → #764ba2` | 文章卡片顶部渐变（保留原色） |
| Trending 强调 | `#22c55e` | GitHub 绿色系（green-500） |
| 项目强调 | `#06b6d4` | 青色系（cyan-500） |

## 组件设计

### Header（sticky）

```
┌──────────────────────────────────────────────┐
│  c8x1 · Daily Curated          2026年5月13日  │
└──────────────────────────────────────────────┘
```

- 背景色 `#0f172a`，底部 `1px solid #1e293b`
- 左侧 logo：`c8x1` 白色 + `· Daily Curated` slate-400
- 右侧日期：中文格式
- 去掉原来的"项目"按钮（项目已有独立 Section）

### Hero（精简）

```
每日精选 × 开源趋势 × 技术学习
```

- 居中，`text-2xl`，白色主文字 + 蓝色分隔符
- 一句话定位，无副标题
- 下方 `1px` 分割线

### 专栏 Section 通用结构

每个专栏遵循统一结构：

```html
<section class="mb-16">
  <!-- 标题行 -->
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-bold text-white flex items-center gap-2">
      <span>📰</span> 每日精选
    </h2>
    <a href="..." class="text-blue-400 hover:text-blue-300 text-sm">查看全部 →</a>
  </div>
  <!-- 卡片 Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- 卡片 -->
  </div>
</section>
```

### 文章卡片

```
┌───────────────────────┐
│  渐变色图标区 (h-40)    │  ← #667eea → #764ba2 + emoji
├───────────────────────┤
│  分类（小号大写）        │  ← text-blue-400
│  标题（Noto Serif）     │  ← text-white
│  摘要（3行截断）         │  ← text-slate-400
│  作者 · 阅读时间         │  ← text-slate-500
└───────────────────────┘
```

- 背景 `#0f172a`，边框 `#1e293b`，hover 时边框变 `#3b82f6` + 上移 2px
- 点击跳转到 `articles/{id}.html`
- 数据来源：保持现有的 JS 硬编码数组（4 篇最新文章）

### GitHub Trending 卡片（placeholder）

```
┌───────────────────────┐
│  🟢 owner/repo        │  ← text-white, font-mono
│  描述（2行截断）         │  ← text-slate-400
│  ⭐ 1.2k  📝 Go        │  ← text-slate-500
│  今日 +342 ⭐           │  ← text-green-400
└───────────────────────┘
```

- 颜色标识：左边框 `3px solid #22c55e`（绿色）
- 当前放 4 张示例 placeholder 卡片，内容为：
  1. `anthropics/claude-code` — AI coding assistant CLI
  2. `deepseek-ai/DeepSeek-V3` — Large language model
  3. `pytorch/pytorch` — Machine learning framework
  4. `tailwindlabs/tailwindcss` — CSS framework
- 卡片链接指向对应的 GitHub repo
- 底部标注 `placeholder: 示例数据，即将上线`（用半透明文字）

### 项目卡片

```
┌───────────────────────┐
│  图标(44px) │ 项目名称  │
│  (圆角方形) │ 描述      │
│             │ 标签 标签  │
└───────────────────────┘
```

- 与当前结构一致，适配深色主题
- 颜色标识：左边框 `3px solid #06b6d4`（青色）
- 展示全部 4 个项目

## "查看全部"链接目标

| 专栏 | 链接目标 |
|------|----------|
| 每日精选 | `dist/` 目录（GitHub Pages 自动列出文件列表） |
| GitHub Trending | `#`（暂无归档页，未来创建） |
| 项目 | `https://github.com/c8x1` |

## 响应式

| 断点 | 行为 |
|------|------|
| `≥ 1024px` | 卡片 grid 4 列 |
| `768px - 1023px` | 卡片 grid 2 列 |
| `< 768px` | 卡片 grid 1 列，hero 字号缩小 |

## 字体

保持现有的 Google Fonts 引用：
- Noto Serif SC（标题）
- Noto Sans SC（正文）

## 不做的事

- 不改子站点（cortex-m-audio-learning 等）的风格
- 不改 `dist/` 下的日期归档页面
- 不改构建脚本（build-all.js 等）
- 不添加动态数据加载（文章数据保持 JS 硬编码）
- 不添加搜索功能
- 不添加暗/亮模式切换（直接全暗色）

## 修改文件清单

| 文件 | 变更 |
|------|------|
| `index.html` | 完整重写：深色主题 + 三专栏布局 |

仅此一个文件。
