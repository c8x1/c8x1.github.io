# 语音编创 survey 网页设计 · 2026-06-26

## 目标
把 `audio-research/精选-编创-讲解/` 的 104 个 MD（1 总览 + 6 tech + 97 深读）建成一个**总-分-分**三层静态网站，现代 docs 风，可提 GitHub Pages。

## 已定决策（用户确认）
- **范围**：仅 `精选-编创-讲解/`（104 md）。`papers-2025H2-2026/` 不入站。
- **技术栈**：Python `markdown-it-py` + `Jinja2` + `flexsearch`（无 Node）。
- **导航**：左侧持久侧边栏树（总览/6 tech 可展开→深读）+ 顶部面包屑 + 站内搜索 + 深读页上一篇/下一篇。
- **视觉**：现代 docs 风（无衬线 Inter + JetBrains Mono 代码），亮/暗主题切换，卡片/callout/sticky 表格，响应式。
- **结构**：一页一 MD，共 104 页。
- **部署**：输出 `site/`，推 GitHub Pages（c8x1.github.io）。

## 架构
构建脚本 `build_site.py` 扫 `精选-编创-讲解/` → Jinja2 套 `templates/base.html` → 输出 `site/`。

```
site/
├─ index.html                       (00-总览.md)
├─ tech1-语音编辑.html … tech6-分离-TSE.html
├─ deep/tech1-语音编辑/01-*.html …     (97, 按类分目录)
├─ assets/{style.css, nav.js, search.js, flexsearch.min.js}
└─ search-index.json
```

## 页面结构（总-分-分）
- **总览 index.html**：执行摘要 / venue×tech 矩阵 / 六方向速览(6 卡片→tech) / 横切洞察 / 共性红线 callout / 数据可信度。
- **tech 页(6)**：方向概览(人话版) / 论文清单表(行→深读页) / 侧栏本类深读展开。
- **深读页(97)**：9 节分析 + 页内 sticky TOC + 面包屑(总览›tech›深读NN) + 上一篇/下一篇。

## 导航
- 侧边栏树：总览 / tech1 ▸深读01..NN / … / 搜索框；当前页高亮、当前 tech 自动展开。
- 面包屑每页顶部；上一篇/下一篇在深读页底（类内顺序）。
- 站内搜索(flexsearch)：索引 97 深读 + 6 tech + 总览 的标题与关键段。

## 视觉
- Inter 正文 / JetBrains Mono 代码·ASCII；亮暗切换(CSS 变量+localStorage，默认跟随系统)。
- callout 三色：笔者解读=info / 笔者补充=warn / 红线=danger。
- sticky-head 表格、可折叠侧栏、移动端抽屉化。

## MD 特殊处理（构建时）
- arXiv ID `YYMM.NNNNN` 正则自动超链接 → `arxiv.org/abs/<id>`。
- `笔者解读/笔者补充/红线` 标记行 → callout 框。
- ` ``` ` ASCII 块 → 等宽框。
- GFM 表格 → 带样式表（行 hover、单元格链接可点）。
- 标题 → 锚点（供 sticky TOC）。

## 验收
- `python3 build_site.py` 产出 104 个 HTML + assets + search-index.json。
- 侧边栏树/面包屑/prev-next/搜索/亮暗切换/arXiv 链接/callout/ASCII 框均工作。
- 本地 `python3 -m http.server` 预览无破图断链。
