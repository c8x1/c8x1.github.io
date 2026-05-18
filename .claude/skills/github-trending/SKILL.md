---
name: github-trending
description: "Fetch GitHub trending repositories, display overview in Chinese, use parallel subagents for deep analysis, and clone selected repos. Use 'archive' keyword for non-interactive daily archival to c8x1.github.io."
argument-hint: "[archive] [daily|weekly|monthly] [language] — e.g. 'archive' or 'daily python'"
allowed-tools:
  - mcp__web_reader__webReader
  - WebSearch
  - Bash
  - Read
  - Write
  - Edit
  - Agent
  - AskUserQuestion
user-invocable: true
---

# GitHub Trending Explorer

追踪 GitHub 热门仓库，并行深度分析，交互式选择并一键 clone。支持 `archive` 归档模式自动更新 c8x1.github.io。

**所有输出必须使用中文。**

## 参数解析

解析用户输入 `$ARGUMENTS`：

0. **运行模式 `mode`**：从参数中检测是否包含关键词 `archive`（别名: `归档`, `arch`）。
   - 如果包含：进入**归档模式**，跳过交互步骤，执行自动归档流程（固定 `since = daily`）
   - 如果不包含：进入**交互模式**（默认），继续现有流程

1. **时间范围 `since`**：从参数中提取，支持以下值：
   - `daily`（默认值）— 别名: `day`, `today`, `日`
   - `weekly` — 别名: `week`, `周`
   - `monthly` — 别名: `month`, `月`

   归档模式下固定为 `daily`，忽略其他值。

2. **编程语言 `language`**：可选参数。如果参数中包含非时间范围的词，视为语言筛选。例如 `python`、`rust`、`go`、`typescript`、`c++`（URL 中为 `c%2B%2B`）、`c#`（URL 中为 `c%23`）。

3. **构造 URL**：
   - 无语言筛选：`https://github.com/trending?since={since}`
   - 有语言筛选：`https://github.com/trending/{language}?since={since}`

---

## 第一步：获取热门仓库（两种模式共用）

使用 `mcp__web_reader__webReader` 获取 GitHub Trending 页面数据：

```
url: 构造的 trending URL
retain_images: false
no_cache: true
```

如果获取失败，重试一次。仍然失败时提示用户检查网络。

### 解析规则

从 webReader 返回的 markdown 中提取仓库信息。每个仓库条目的结构特征：

1. **仓库标识行**：`## owner / repo-name`（H2 标题，包含斜杠分隔的 owner 和 repo name）
2. **描述**：H2 标题后面紧跟的文本段落（直到空行或非描述内容）
3. **语言**：描述后面单独一行的语言名称（如 "Python"、"TypeScript"、"Shell"）。某些仓库可能没有此字段，此时语言为 `-`
4. **总星数**：语言后面出现的纯数字行（如 `30,853`），可能包含逗号
5. **Fork 数**：星数后面出现的纯数字行（如 `2,426`）
6. **新增星数**：包含 "stars today"、"stars this week"、"stars this month" 的行中的数字

**忽略的内容**：
- "Built by" 行及后续的 `![Image...]` 行
- "Sponsor" 和 "Star" 按钮文本
- 页面导航、筛选器、Footer

对每个仓库提取以下字段：
- `owner`：仓库所有者
- `name`：仓库名称
- `fullName`：`owner/name`
- `description`：描述文本（超过 80 字符截断，加 `...`）
- `language`：编程语言
- `stars`：总星数（纯数字）
- `forks`：Fork 数（纯数字）
- `starsDelta`：今日/本周/本月新增星数（纯数字）
- `url`：`https://github.com/owner/name`
- `rank`：页面上的排列顺序（从 1 开始）
- `langColor`：语言颜色，使用以下内置映射表（GitHub 页面的彩色圆点在 webReader 转 markdown 时会丢失）

### 内置语言颜色映射表

| 语言 | 颜色 | | 语言 | 颜色 |
|------|------|-|------|------|
| Python | #3572A5 | | TypeScript | #3178c6 |
| JavaScript | #f1e05a | | Rust | #dea584 |
| Go | #00ADD8 | | Java | #b07219 |
| C++ | #f34b7d | | C | #555555 |
| Shell | #89e051 | | Ruby | #701516 |
| Swift | #F05138 | | Kotlin | #A97BFF |
| Jupyter Notebook | #DA5B0B | | Dart | #00B4AB |
| PHP | #4F5D95 | | Scala | #c22d40 |
| HTML | #e34c26 | | CSS | #563d7c |
| Vue | #41b883 | | Svelte | #ff3e00 |
| Lua | #000080 | | Zig | #ec915c |
| 其他/未知 | #8b949e | | | |

---

## 归档模式

如果参数中包含 `archive`（或别名），进入归档模式。归档模式是**非交互式**的：不需要用户选择仓库、不需要深度分析、不需要 clone。

归档模式的目标：抓取今日 GitHub Trending → 转换为网站数据格式 → 写入 JSON 文件 → 提交并推送到 c8x1.github.io。

### 归档第一步：获取并解析热门仓库

与交互模式的第一步完全相同。确保提取了 `rank` 和 `langColor` 字段。

### 归档第二步：生成中文描述

对全部仓库生成 40-60 字的中文技术描述，替换 GitHub 的英文描述。

使用 1 个 Agent 子代理批量生成（描述生成比深度分析轻量得多，不需要每个仓库单独启动子代理）。

**子代理 prompt 模板**（将花括号中的变量替换为实际值）：

```
你是开源项目中文描述生成器。对以下 GitHub 仓库，生成一段 40-60 字的中文技术描述。

要求：
- 从技术维度描述项目的核心功能和实现特点，不是营销文案
- 用中文书写，技术术语（框架名、协议名、算法名）保持英文原文
- 超过 60 字会被截断显示不全，请精确控制字数
- 每行一个仓库，严格按格式：`repo名: 描述`

仓库列表：
{repos_list}
```

其中 `{repos_list}` 格式为每行一个仓库：
```
1. tinyhumansai/openhuman | https://github.com/tinyhumansai/openhuman | 桌面端AI助手 | Rust | 30853⭐ | +1014
2. ...
```

如果子代理失败或返回格式不对，保留 GitHub 原始英文描述作为 fallback。

解析子代理返回结果时，逐行匹配 `owner/name: 描述` 格式，将中文描述与仓库对应。

### 归档第三步：转换数据格式

将解析结果转换为网站 JSON 格式。字段映射：

| 原始字段 | 目标字段 | 转换规则 |
|---------|---------|---------|
| `rank` | `rank` | 保持不变 |
| `fullName` | `repo` | 直接使用 |
| 中文描述或 `description` | `desc` | 中文描述优先，fallback 英文原文 |
| `stars` | `stars` | 格式化（见下方规则） |
| `language` | `lang` | 直接使用 |
| `langColor` | `langColor` | 从映射表获取 |
| `starsDelta` | `todayStars` | 格式化为 `+X,XXX` |
| `url` | `url` | 直接使用 |

**stars 格式化规则**：
- 小于 1000：直接显示数字字符串（如 `"853"`）
- 1000-99999：除以 1000，保留一位小数，加 `k`（如 `30853` → `"30.9k"`；恰好整数如 `3000` → `"3.0k"`）
- 大于等于 100000：除以 1000，保留一位小数，加 `k`（如 `93900` → `"93.9k"`）

**todayStars 格式化规则**：
- 加 `+` 前缀，数字加千分位逗号（如 `1014` → `"+1,014"`，`5645` → `"+5,645"`）

**articles 数组**：始终使用空数组 `[]`。文章归档由 translate-articles skill 的 article cron 单独管理，trending 归档不应携带文章数据。

### 归档第四步：写入文件

定义 **`SITE_DIR`** = `~/Workspace/trySth/c8x1.github.io`

1. **`$SITE_DIR/data/YYYY-MM-DD.json`** — 当天快照（新建或覆盖）

   使用 Write 工具写入完整的 JSON 对象（含 `date`、`trending`、`articles`）。

2. **`$SITE_DIR/data/latest.json`** — 覆盖为当天快照的副本

   内容与当天快照完全相同。

3. **`$SITE_DIR/data/index.json`** — 在数组头部插入新日期

   - 先用 Read 工具读取 `$SITE_DIR/data/index.json`
   - 解析为 JSON 数组
   - 如果今天的日期已存在于数组中，移到头部；否则在头部插入
   - 用 Write 工具写回

### 归档第五步：更新月度聚合

```bash
cd ~/Workspace/trySth/c8x1.github.io && node scripts/build-monthly.js
```

此脚本会扫描所有 `data/YYYY-MM-DD.json` 文件并重新生成所有 `data/month-YYYY-MM.json` 文件。

### 归档第六步：Git 提交并推送

```bash
cd ~/Workspace/trySth/c8x1.github.io
git add data/
git commit -m "archive: YYYY-MM-DD (N trending)"
# 先同步远端（article cron 可能已推送改动）
git pull --rebase origin master
git push origin master
```

提交消息中的 N 为 trending 数组长度。

如果 `git push` 因网络问题失败，使用代理重试：
```bash
cd ~/Workspace/trySth/c8x1.github.io && https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 git push origin master
```

### 归档模式 — 输出摘要

完成后输出执行日志：

```
[归档完成]

日期: YYYY-MM-DD
仓库: N trending

写入文件:
  data/YYYY-MM-DD.json ✓
  data/latest.json ✓
  data/index.json ✓
  month-YYYY-MM.json ✓

Git: 已提交并推送到 origin/master
```

### 归档模式 — 错误处理

| 场景 | 处理 |
|------|------|
| GitHub Trending 页面获取失败 | 重试一次，仍失败则中止 |
| 某个仓库信息不完整 | 跳过该仓库 |
| 中文描述子代理失败 | 保留 GitHub 英文描述 |
| data/latest.json 读取失败（首次运行） | articles 使用空数组 |
| data/index.json 读取失败 | 创建新的 `["YYYY-MM-DD"]` |
| node scripts/build-monthly.js 失败 | 报错但继续 git 提交 |
| git push 失败 | 使用代理重试一次 |

---

## 交互模式

以下为默认的交互式流程。如果已进入归档模式，上面的步骤已全部完成，无需执行以下内容。

## 第二步：展示概览表格

以中文表格展示所有仓库（通常约 25 个）：

```
## GitHub 热门仓库（{时间范围描述}）{语言筛选描述}

> 共 {N} 个仓库

| # | 仓库 | 描述 | 语言 | ⭐ 总星数 | 🔥 新增 |
|---|------|------|------|----------|---------|
| 1 | [owner/repo](url) | 描述... | Python | 30,853 | +5,645 |
| 2 | ... | ... | ... | ... | ... |
```

**时间范围描述**：daily → "今日"、weekly → "本周"、monthly → "本月"
**语言筛选描述**：有语言时显示 `| 语言: Python`，无语言时不显示

表格说明：
- 仓库名为 markdown 链接，指向 GitHub URL
- 描述超长时截断到 80 字符
- 新增列带 `+` 前缀

**展示表格后，必须使用 AskUserQuestion 询问用户**：

> 请输入感兴趣的仓库编号（空格或逗号分隔，支持范围如 3-7），或输入 'all' 分析全部仓库

等待用户响应。

## 第三步：并行深度分析

解析用户选择（支持：单个数字、逗号分隔、空格分隔、范围如 `3-7`、`all`）。

对每个选中的仓库，使用 Agent 工具启动并行子代理。**所有子代理在同一条消息中同时启动**，不要串行等待。

**并行策略**：
- 单批次最多 8 个子代理
- 如果选中超过 8 个仓库，分批处理（每批 8 个）
- 子代理使用 `model: "sonnet"` 以获得最佳速度/成本平衡

**每个子代理的 prompt 模板**（将花括号中的变量替换为实际值）：

```
你是一个开源项目分析师。请用中文分析以下 GitHub 仓库。

仓库: {fullName}
URL: {url}
描述: {description}
语言: {language} | 总星数: {stars} | 新增: {starsDelta}

请完成以下分析：

1. **README 分析**：使用 mcp__web_reader__webReader 获取 {url} 页面内容。提取 README 核心信息：
   - 项目的主要功能和目标（2-3 句话）
   - 核心特性和亮点
   - 快速上手方式

2. **技术栈评估**：从仓库页面信息判断：
   - 主要编程语言和框架
   - 依赖管理方式
   - 是否有 CI/CD 配置

3. **社区健康度**：使用 WebSearch 搜索 "{fullName} github" 获取补充信息：
   - 项目活跃度（最近是否有更新）
   - 社区规模和关注度
   - 维护者状态

4. **实用价值评估**：
   - 适合什么类型的开发者或场景
   - 是否值得 star/clone
   - 潜在的使用场景和注意事项

请严格按以下格式返回分析结果（不要添加额外的 markdown 标题）：

**一句话总结**: （15 字以内的核心评价）

**项目简介**: （3-4 句话概述项目功能和价值）

**技术栈**: （语言/框架/工具链）

**社区状态**: （活跃/稳定/衰退 + 简要说明）

**推荐指数**: （1-5，仅数字）

**适合人群**: （目标用户类型）

**关键发现**: （任何值得注意的重要信息，1-2 条）

**风险提示**: （如果有潜在问题，如许可证、兼容性、安全风险等）
```

**子代理失败处理**：如果某个子代理返回错误，展示 fallback 消息：
> ⚠️ {fullName} — 分析失败，请直接访问 {url} 查看。

### 展示分析结果

收集所有子代理结果后，逐个展示分析卡片：

```
---

### {idx}. [{fullName}]({url}) ⭐ {stars} (+{starsDelta})

**一句话总结**: {总结}

**项目简介**: {简介}

**技术栈**: {技术栈}

**社区状态**: {状态}

**推荐指数**: ⭐⭐⭐⭐⭐ ({n}/5)

**适合人群**: {人群}

**关键发现**: {发现}

**风险提示**: {风险}

---
```

### 综合对比

所有分析卡片展示完毕后，输出综合对比表：

```
## 综合对比

| # | 仓库 | 推荐 | 亮点 | 适合场景 |
|---|------|------|------|---------|
| 1 | owner/repo | ⭐⭐⭐⭐⭐ | 核心亮点 | 使用场景 |
| 2 | ... | ... | ... | ... |
```

推荐指数用实心星表示，便于快速扫读。

**展示对比表后，必须使用 AskUserQuestion 询问用户**：

> 请选择要 clone 到本地的仓库编号（空格或逗号分隔），或输入 'none' 跳过。

等待用户响应。

## 第四步：Clone 仓库

解析用户的 clone 选择。

对每个选中的仓库执行 clone：

```bash
git clone https://github.com/{owner}/{name}.git ./{name}
```

如果已存在同名目录，跳过并提示用户。
如果 clone 因网络超时失败，使用代理重试。

### 展示 Clone 结果

```
## Clone 结果

| 仓库 | 状态 |
|------|------|
| owner/repo | 成功 |
| owner/repo2 | 已存在（跳过） |
| owner/repo3 | 失败: {错误} |
```

如果用户选择 'none'，输出：
> 已跳过 clone。如需稍后 clone，可手动执行：`git clone {url}`

## 错误处理

| 场景 | 处理方式 |
|------|---------|
| webReader 获取 trending 失败 | 重试一次，仍失败则提示检查网络 |
| 解析不到任何仓库 | 提示可能的语言名称错误或页面结构变化 |
| 用户选择 0 个仓库（跳过分析） | 输出"没有选择任何仓库"，建议重新运行 |
| 子代理全部失败 | 提示网络问题，建议稍后重试 |
| git clone 失败 | 尝试代理重试，报告每个仓库的具体错误 |
| 用户输入无效编号 | 提示有效范围，请重新输入 |

## 重要提醒

- webReader 抓取 GitHub 网页不消耗 GitHub API 速率配额，因此不存在 60 req/hr 的限制
- 所有网络请求优先使用 webReader，避免调用 api.github.com
- clone 阶段如果网络慢，务必提示用户可以使用本地代理 `http://127.0.0.1:7897`
- 描述文本中的英文内容保持原文不翻译，仅界面元素使用中文
