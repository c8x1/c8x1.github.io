# 每日 Gemini 寓言自动归档手册（轨道 2）

本手册供 **Antigravity 定时自动化（`Daily Gemini Parable`，每天 07:55 Asia/Shanghai）** 读取执行。
仓库路径：`/Users/noctis/Workspace/trySth/c8x1.github.io`

## 分工背景

- **轨道 1（07:20 crontab `scripts/daily-articles.sh` · Claude Opus）**：每天产 1 篇英文翻译 + 1 篇 Claude Opus 寓言。
- **轨道 2（07:55 Antigravity 定时自动化 · Gemini）**：每天产当天第 2 篇 Gemini 寓言。
- 两条轨道共享 `concept-pool.json`、`parable-queue.json`、`concept-briefs.json` 与 `scripts/parable-ctl.js`，确保同日不同概念、不同学科、不同视角，并自动统一署名。

---

## 执行步骤（严格按序执行，全程非交互）

### 第 1 步：同步远端仓库

```bash
cd /Users/noctis/Workspace/trySth/c8x1.github.io && git pull --rebase origin master
```

（若因存在未提交改动导致 pull 失败，先 `git stash -q` 再 `git pull --rebase origin master`，然后 `git stash pop -q`。）

### 第 2 步：确定性领取今日概念与任务包

```bash
cd /Users/noctis/Workspace/trySth/c8x1.github.io && node scripts/parable-ctl.js pick --model gemini
```

解析输出的 JSON：
- 若 `status === "already_done"`：今天 Gemini 已经发过寓言，**立即结束，报告已跳过**。
- 若 `status === "ready"`：记录 `date`、`concept`、`concept_cn`、`domain_cn`、`perspective`、`cached_brief`、`recent_names`、`recent_motifs`、`pool_stats`。

### 第 3 步：准备概念事实简报（Brief）

- 若 `cached_brief` 非空，直接复用它作为唯一事实基准。
- 若 `cached_brief === null`：
  1. 用 `search_web`（或查阅权威百科资料）核实 `[concept]`（`[concept_cn]`）的准确定义、核心机制、关键关系与常见误区，**不得凭记忆编造**。
  2. 将提炼后的简报 JSON 写入 `/tmp/concept_brief_gemini.json`，包含字段：
     - `concept`（与任务包 `concept` 严格一致）
     - `concept_cn`
     - `definition_cn` / `definition_en`
     - `core_mechanism`（注明是否非意愿/随机/确定性过程）
     - `key_relations`（字符串数组）
     - `common_misconceptions`（字符串数组）
     - `literal_domain_to_avoid`（需避开的字面科学/原生领域，无则 `null`）
     - `is_process_type`（`true`/`false`）
     - `canonical_sentence_cn` / `canonical_sentence_en`
  3. 持久化入库：
     ```bash
     cd /Users/noctis/Workspace/trySth/c8x1.github.io && node scripts/parable-ctl.js save-brief --file /tmp/concept_brief_gemini.json
     ```

### 第 4 步：撰写中英双语寓言（写入 `/tmp/parable_article_gemini.json`）

输出 JSON 格式：
```json
{
  "title_en": "English Title Without Concept Name",
  "title_cn": "中文标题",
  "paragraphs": [
    { "cn": "中文第1段", "en": "English paragraph 1" },
    ...
    { "cn": "注解：……（本文由 Gemini 创作）", "en": "Note: ... (Written by Gemini)" }
  ]
}
```

**硬性质量约束（V1-V12，必须全部满足）**：
1. **隐喻距离（V7）**：绝不落在 `brief.literal_domain_to_avoid` 或概念的字面学科领域；构建一个鲜活、具象、现代或跨文化的人类日常/社会境况，以角色关系、张力与抉择构成**结构同构**（禁止词法换皮）。
2. **真实赌注与兑现（V9）**：角色必须面临具体代价或两难抉择，正文立起的每一个期限、危机、承诺必须在结尾前明确收束交代。
3. **指定视角**：严格使用任务包分配的 `perspective`（全知旁观 / 第一人称亲历 / 对话体 / 倒叙揭示）。若为对话体，禁止无知提问者×全知长者的苏格拉底讲义，双方须有真实代价或冲突。
4. **谜底留白（V1/V8）**：概念名与学科技术术语绝不出现在故事正文，只在最后一段注解中点明；若 `core_mechanism` 为非意愿过程，不得给过程塞主观意愿或美德。
5. **标题与意象（V2）**：英文标题不提概念名；标题核心名词/意象须在中文正文出现 ≥1 次。
6. **注解格式（V1/V3/V10）**：末段以 `注解：`（英文 `Note:`）开头，用 1–2 句日常语言点明概念名（中英对照）与核心机制，并附半句诚实的映射边界说明；末段末尾落款 `（本文由 Gemini 创作）` / `(Written by Gemini)`。
7. **双语体例（V5/V6/V10）**：段落数 5–8 段（含注解），CN/EN 段数、数字、年数、人名完全一致；中文全角标点 `，。；：「」`，译名 `中文（English）` 全角括号；英文段严禁夹带中文，英文对白一律双引号 `""`，破折号统一 `" — "`。
8. **句式纪律（V11）**：「不是A，而是B」/「并非A——是B」全篇 ≤1 次；三连排比 ≤1 次；每段破折号插入语 ≤2 处。
9. **防撞名与去重（V4/V12）**：主角名不得与 `recent_names` 撞名；核心意象不得与 `recent_motifs` 逐字或近义复用；禁用黑名单短语（「手心全是汗 / palms slick with sweat」、「并非跳过 / not skip it」）。

### 第 5 步：机械校对、自动署名、入库并重建静态页

提炼本篇 3–4 个短母题（用 `|` 分隔），执行：

```bash
cd /Users/noctis/Workspace/trySth/c8x1.github.io && node scripts/parable-ctl.js ingest \
  --file /tmp/parable_article_gemini.json \
  --model gemini \
  --concept "<concept>" \
  --motifs "母题1|母题2|母题3"
```

- 该命令会自动运行 `scripts/proofread-parable.js`、强制校验署名格式、写入 `articles.json` 与 `parable-queue.json`，并运行 `node build-all.js` 生成静态 HTML、`feed.xml`、`sitemap.xml` 与 `articles-index.json`。
- 若 `proofread-parable.js` 报 WARN（exit code 1），按提示修改 `/tmp/parable_article_gemini.json` 后重试一次 `ingest`。

### 第 6 步：低水位自动补池（仅当 `pool_stats.needs_refill === true` 时）

若第 2 步返回的 `pool_stats.needs_refill` 为 `true`（0 次未用概念少于 20 个）：
1. 构思 30 个全新、具强结构张力的跨学科概念（覆盖 `physics/math/biology/chemistry/cs/ai/economics/psychology/systems/philosophy`），写入 `/tmp/refill_concepts.json`（JSON 数组，每项含 `concept`, `concept_cn`, `domain`）。
2. 执行去重入池：
   ```bash
   cd /Users/noctis/Workspace/trySth/c8x1.github.io && node scripts/parable-ctl.js refill --file /tmp/refill_concepts.json
   ```

### 第 7 步：Git 提交并推送

```bash
cd /Users/noctis/Workspace/trySth/c8x1.github.io && \
git add articles.json articles-index.json articles/ feed.xml sitemap.xml parable-queue.json concept-briefs.json concept-pool.json && \
git add -u '*.html' && \
git commit -m "archive: <YYYY-MM-DD> +1 article (寓言故事·Gemini)" && \
git pull --rebase origin master && \
(git push origin master || GIT_SSH_COMMAND="ssh -o HostName=ssh.github.com -o Port=443 -o ProxyCommand='nc -X 5 -x 127.0.0.1:7897 %h %p'" git push origin master)
```

完成后输出简明报告：日期、概念（学科）、标题、文章 URL、概念池余量与 Git commit hash。
