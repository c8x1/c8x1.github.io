---
name: publish-research
description: "Publish research report HTML files to c8x1.github.io. Copies the file to research/, updates research-index.json with metadata, then git commits and pushes. Use this skill whenever the user wants to publish, deploy, or upload a research report / survey / 技术调研 to their site, or says things like '加到我主页' '推送到网站' 'publish this report' 'publish-research'. Also use when the user just generated a new HTML report and wants it live on c8x1.github.io."
argument-hint: "<path-to-html-file(s)> — e.g. '/path/to/My_Report.html' or '/path/to/*.html'"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - AskUserQuestion
user-invocable: true
---

# Publish Research Report to c8x1.github.io

将调研报告 HTML 发布到 c8x1.github.io 的 research 页面。

## 站点结构

c8x1.github.io 的 research 板块由以下文件驱动：
- `research/` — 存放所有报告 HTML 文件
- `research-index.json` — 报告索引，`research.html` 和 `index.html` 通过 JS 动态读取此文件渲染卡片
- `research.html` — 报告列表页（自动从 JSON 加载）
- `index.html` — 首页（自动展示最新 4 篇）

因此只需：复制文件 + 更新 JSON + git push，页面自动生效。

## Workflow

### Step 1: 获取文件

从 `$ARGUMENTS` 读取要发布的 HTML 文件路径。如果没有参数，询问用户。

支持单个文件、多个文件、或 glob 模式。如果文件是 Markdown 而非 HTML，先转换为暗色主题的独立 HTML 报告。

验证文件存在且是有效 HTML（包含 `<!DOCTYPE` 或 `<html`）。

### Step 2: 复制到 research 目录

```bash
cp <source_file> research/<filename>
```

目标目录是 `research/`（相对于 c8x1.github.io 根目录）。

### Step 3: 更新 research-index.json

读取 `research-index.json`，在数组末尾追加新条目。严格遵循已有 schema：

```json
{
  "id": "kebab-case-id",
  "title": "报告标题",
  "file": "research/<filename>",
  "date": "YYYY-MM",
  "tags": ["tag1", "tag2", "tag3"],
  "description": "一句话中文描述报告内容和范围",
  "icon": "emoji"
}
```

字段规则：
- **id**: 从标题推导，kebab-case，简洁（如 "ts-vad-research"）
- **title**: 直接用报告原标题
- **tags**: 从报告内容提取 3-5 个技术关键词，中英文可混用
- **description**: 中文撰写，一句话概括报告范围
- **icon**: 选一个贴合主题的 emoji
- **date**: 当前年月，YYYY-MM 格式

写入后验证 JSON 合法性：
```bash
python3 -c "import json; json.load(open('research-index.json'))"
```

### Step 4: Git commit & push

```bash
git add research/<filename> research-index.json
git commit -m "Add research report: <title>"
git pull --rebase
git push
```

如果 push 被拒（远程有新提交），先 `git pull --rebase` 再重试。禁止 force push。

### Step 5: 确认

告知用户：
- 报告上线地址：`https://c8x1.github.io/research/<filename>`
- 列表页：`https://c8x1.github.io/research.html`
- 当前索引共 N 篇报告
