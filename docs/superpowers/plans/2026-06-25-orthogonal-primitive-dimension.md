# 消费级报告正交分层重构 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把现有《消费级语音简单编创·场景驱动报告》（C1-C9）原地重构为正交分层版（7 操作原语 × 3 约束维度），消除场景重叠。

**Architecture:** 121 篇正文论文 + 40 篇🔑重点按 7 原语（P1 分离/P2 擦除/P3 修复增强/P4 token编辑/P5 VC与匿名/P6 情感韵律/P7 裁剪拼接）重新归类，每篇带 D1 实时/D2 长内容/D3 噪声维度标签。P1 补 3 篇分离论文。报告从场景驱动改原语驱动，HTML 沿用旧 CSS 组件库重渲染。

**Tech Stack:** Markdown 报告主体；HTML 配套渲染沿用旧报告组件库；arXiv abs HTML 页（curl，避 API 限流）核实 + 抓摘要；Python 脚本做论文归类与一致性检查。

**Spec:** `docs/superpowers/specs/2026-06-25-orthogonal-primitive-dimension-design.md`

## Global Constraints

- 原地覆盖 `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.{md,html}`，PPT 不动。
- 7 原语 P1-P7 + 3 维度 D1/D2/D3，正交分层（见 spec §2）。
- 旧场景迁移：C1→拆 P1分离+P2擦除；C2→P3；C3→P4；C4→P7；C5+C6→P5（口音/匿名作子线）；C7→拆散 D2+各原语；C8→P6；C9→P3 病理子段。
- 每篇 paper 带维度标签格式：`｜ 维度：D1实时 / D2长内容 / D3噪声`（可多维度，无可不标）。
- 🔑 40 篇重点保留并重新归位；附录 C 重点总表同步更新。
- 不含产品落地（归同事）；arXiv ID 全部经核实；无产品名、无 placeholder。
- arXiv ID 核实/抓摘要用 `curl -sL --noproxy '*' "https://arxiv.org/abs/<id>"`（HTML abs 页，避 export API 限流，见 audio-paper-search skill §2.3）。
- 网络慢/被墙用代理 `http://127.0.0.1:7897`。
- 提交规约：`content:`/`scaffold:`/`render:`/`fix:` 前缀 + `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`。

## File Structure

- Modify（原地覆盖）: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`
- Modify（原地覆盖）: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.html`
- Read（只读，归类源）: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`（旧版，含 121 篇 + 40🔑）
- Read（只读，补分离来源）: `audio-research/audio-editing-accepted-papers-2025-2026.html`（ZeroSep/CodeSep/Target Speaker Extraction 在此清单）
- Read（只读，HTML 风格源）: 旧 HTML 自身的 `<style>` 与组件 class

**工作文件（研究阶段产出，定稿后删）:**
- `audio-research/.tmp_reclassify.json` — 论文归类映射（arxivId → {原语:[Pn], 维度:[Dn], 重点:bool, 三要素:{method,significance,limitation}}）
- `audio-research/.tmp_separation_abs.json` — 3 篇补分离论文的摘要

---

## Task 1: 论文归类映射（121 篇 → 7 原语 + 维度标签）

**Files:**
- Create: `audio-research/.tmp_reclassify.json`（工作映射文件）
- Read: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`（旧版，抽取 121 篇 + 40🔑 + 三要素）

**Interfaces:**
- Consumes: 旧报告 121 篇 paper 条目（含 arxivId/title/三要素/🔑标记）+ 旧场景归属
- Produces: `.tmp_reclassify.json`，结构 `{arxivId: {title, primitives:[P1-P7], dims:[D1/D2/D3], key:bool, method, significance, limitation}}`

- [ ] **Step 1: 抽取旧报告 121 篇 + 三要素 + 🔑标记**

用 Python 从旧 MD 抽取每个 paper 条目。脚本逻辑：
- 遍历 `# C1 ·` 到 `# 横切附录` 之间的 paper 行（`- 🔑 **Title**（[arxivID]）：...` 或 `- **Title**（[arxivID]）：...`）
- 记录旧场景（C1-C9，由 `# Cn ·` 标题判定）、🔑标记、arxivId、title
- 拆三要素：用正则 `｜ 意义：(.*?) ｜ 局限：(.*?)(?: ｜ 维度|$)` 拆 method/significance/limitation

输出到 `.tmp_reclassify.json`，每条含 `old_scene`、`key`、`arxivId`、`title`、`method`、`significance`、`limitation`。

- [ ] **Step 2: 按 spec §2.1 迁移规则归类到 P1-P7**

用 Python 对每篇按旧场景 + 标题关键词归类：
- C1：标题含 separ/sep/extract/分离/提取 → P1；否则 → P2（擦除）
- C2：→ P3（修复增强）
- C3：→ P4（token编辑）
- C4：→ P7（裁剪拼接）
- C5：→ P5（VC与匿名）
- C6：→ P5（口音子线）
- C7：→ 拆散（论文本身归其原语，长内容属性记 D2）
- C8：→ P6（情感韵律）
- C9：→ P3（病理子段）

同篇可跨原语（MaskGCT/Metis 跨 P4/P5）。人工复核跨场景同 ID（2512.20339 MMEDIT 在 C1+C4、2603.26364 LLaDA-TTS 在 C3+C4、2602.17097 AudioChat 在 C1+C4）的归类。

- [ ] **Step 3: 标维度标签 D1/D2/D3**

按标题/三要素关键词标维度：
- D1 实时/流式：stream/流式/real-time/零前瞻/causal/一步蒸馏/one-step/fast
- D2 长内容：long/长/audiobook/播客/podcast/多说话人对话/multi-speaker dialogue/长时段
- D3 噪声鲁棒：noise/噪声/野外/wild/含噪/noisy/inpainting 补缺
一篇可多维度，无可不标。

- [ ] **Step 4: 提交归类映射**

```bash
git add audio-research/.tmp_reclassify.json
git commit -m "research: 121篇论文按7原语重新归类+维度标签

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: 补 3 篇分离论文（P1）

**Files:**
- Create: `audio-research/.tmp_separation_abs.json`
- Read: `audio-research/audio-editing-accepted-papers-2025-2026.html`（含 ZeroSep/CodeSep/Target Speaker Extraction 的 tech/exp 描述）

**Interfaces:**
- Consumes: accepted 清单里 3 篇分离论文的 arxivId + 场景描述
- Produces: 3 篇的三要素（method/significance/limitation）+ 核实状态，并入 Task 1 的 `.tmp_reclassify.json`（归 P1，标维度）

- [ ] **Step 1: 从 accepted 清单取 3 篇分离论文信息**

用 Python 从 `audio-editing-accepted-papers-2025-2026.html` 抽取（沿用之前的 table 行正则）：
- ZeroSep（2505.23625）：tech="零训练通用源分离"，venue=NeurIPS 2025
- CodeSep（2601.12757）：tech="联合分离+压缩"，venue=ICASSP 2026
- Target Speaker Extraction（2502.16611）：tech="噪声注册音目标说话人提取"，venue=NeurIPS 2025

- [ ] **Step 2: arXiv abs HTML 页核实 ID + 抓摘要**

用 audio-paper-search skill §2.3 方法 B（HTML abs 页，避 API 限流）：
```bash
curl -sL --noproxy '*' "https://arxiv.org/abs/2505.23625" | python3 -c "import sys,re,html; t=sys.stdin.read(); m=re.search(r'meta name=\"citation_abstract\" content=\"([^\"]+)\"',t); print(html.unescape(m.group(1)) if m else 'NO-ABS')"
```
对 2505.23625 / 2601.12757 / 2502.16611 各执行一次，间隔 8s。摘要存 `.tmp_separation_abs.json`。抓不到的标 NO-ABS，用 accepted 清单的 tech/exp 作 fallback。

- [ ] **Step 3: 写三要素（method/意义/局限）**

基于摘要写三要素（紧凑中文，每要素 1 句）。若无摘要，用 accepted 清单的 tech/exp 推断，并在 limitation 注"摘要未抓到，基于清单描述推断"。把这 3 篇并入 `.tmp_reclassify.json`，归 P1，按内容标维度（如 Target Speaker Extraction 标 D3 噪声）。

- [ ] **Step 4: 提交**

```bash
git add audio-research/.tmp_separation_abs.json audio-research/.tmp_reclassify.json
git commit -m "research: P1补3篇分离论文(ZeroSep/CodeSep/TargetSpeakerExtraction)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: 报告骨架 + 矩阵总览 + 报告说明

**Files:**
- Modify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`（清空旧场景结构，重写头部）
- Read: `.tmp_reclassify.json`（统计各原语论文数/重点数/维度分布）

**Interfaces:**
- Consumes: Task 1-2 的归类映射
- Produces: MD 文件的报告说明 + §2 矩阵总览表（7×3）

- [ ] **Step 1: 重写报告头部 + 报告说明**

照旧报告头部风格，标题改为 `# 消费级语音简单编创·正交分层报告（2024–2026）`。blockquote 说明：定位（消费级需求→学术 SOTA，不含产品）、**本次重构说明**（从场景驱动 C1-C9 改为正交分层 7 原语×3 维度，消除 C3↔C7/C3↔C8 等重叠）、方法、数据（121+3 篇，40🔑）、日期 2026-06-25。

- [ ] **Step 2: 写 7×3 矩阵总览表**

表头：`| 原语 | 定义 | D1实时 | D2长内容 | D3噪声 | 成熟度 |`，7 行 P1-P7。D1/D2/D3 列填该原语在该维度下的代表论文数 + 1-2 个代表名。成熟度从旧报告迁移（P4🟢/P5🟢/P3🟡/P1🟡/P2🟡/P6🔴公认缺口/P7🔴真空白）。表下加维度图例。

- [ ] **Step 3: 提交骨架**

```bash
git add audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md
git commit -m "scaffold: 正交分层报告头部+7×3矩阵总览

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: 逐原语章 P1-P7

**Files:**
- Modify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`
- Read: `.tmp_reclassify.json`

**Interfaces:**
- Consumes: Task 1-2 的归类映射（每原语的论文清单 + 维度标签 + 三要素 + 🔑）
- Produces: 7 个原语章（五段结构）

每个原语章一个 commit。五段固定（spec §4）：
1. 原语定义与用户诉求（含正交边界声明）
2. 学术 SOTA 与技术进展
3. paper→问题映射（每条带 `｜ 维度：D1/D2/D3` 标签，🔑保留）
4. 技术点
5. 成熟度与缺口

- [ ] **Step 1: 写 P1 分离提取 + 提交**

边界声明：P1 提取目标 vs P2 删除目标。paper 含 AudioSep/ZeroSep/CodeSep/Target Speaker Extraction/Semantically Consistent Dataset/QuarkAudio。每条标维度。

```bash
git commit -am "content: P1 分离提取原语章

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

- [ ] **Step 2-3: 写并提交 P2 擦除**

边界：删除指定声源保其余。含 MMEDIT/Ming-UniAudio-Edit/SAO-Instruct/AudEdit/DirectAudioEdit/FreeSonic/RFM-Editing/SeamlessEdit（SeamlessEdit 标 D3）。

- [ ] **Step 4-5: 写并提交 P3 修复增强（含病理子段）**

两子段：外部噪声修复（PGDI/Token-Based Inpainting/PhASE-Flow/FlowSE-GRPO/DisContSe/MAGE 等）+ 病理发声重建（UNIT-DSR/DiffDSR/CFM-DSR/ClaritySpeech/ChiReSSD/AP-GRPO/EL-Speech/Personalized-TTS-Dysarthric），显式分界"修外部噪声 vs 修发声机能"。

- [ ] **Step 6-7: 写并提交 P4 token 编辑**

边界：改内容（词级）vs P7 改结构。含 VoiceCraft/CosyEdit/SSR-Speech/AST/FluentEditor2/LLaDA-TTS/MaskGCT/Metis/DiffEditor/Edit-Content-Preserve-Acoustics 等。SwanVoice/MoonCast 等长内容论文标 D2 并在缺口段注明"长内容编辑端真空白（旧 C7）"。

- [ ] **Step 8-9: 写并提交 P5 VC 与匿名（含口音/匿名子线）**

含口音归一子线（FlowEdit/PHONOS/SonoEdit/SpeechAccentLLM/Streaming Accent NAR，标 D1）+ 匿名化子线（Zero-VC/EASY/DiffAnon）+ 通用 VC（AutoVC/FreeVC/Vevo2/X-VC/StreamVC/MaskGCT/Metis/ReFlow-VC/FasterVoiceGrad/StarVC 等）。三级标题分子线。

- [ ] **Step 10-11: 写并提交 P6 情感韵律**

含 EmoCorrector/EmoSteer-TTS/EmoShift/UDDETTS/EmotionThinker/VowelPrompt/ZSDEVC/EASPO/ClapFM-EVC/emotion2vec/Causal Prosody/Style Tokens/PromptTTS/InstructTTS。标🔴公认缺口。

- [ ] **Step 12-13: 写并提交 P7 裁剪拼接**

边界：改结构 vs P4 改内容。含 MMEDIT(reordering)/LLaDA-TTS(selective masking)/AudioChat。论文少，标🔴领域真空白。

- [ ] **Step 14: 提交总览矩阵成熟度回填**

回填 Task 3 矩阵各原语成熟度定稿。

```bash
git commit -am "content: 回填P1-P7成熟度定稿

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: 约束维度章 D1-D3

**Files:**
- Modify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`
- Read: `.tmp_reclassify.json`（各维度代表论文）

**Interfaces:**
- Consumes: Task 1 维度标签
- Produces: 3 个维度章

- [ ] **Step 1: 写 D1 实时/流式章**

技术路线（因果网络/零前瞻/一步蒸馏/流式 NAR）+ 跨原语影响（P5 VC/P3 增强/P6 情感受低延迟约束）+ 代表论文（StreamVC/DualVC3/PHONOS/Zero-VC/FasterVoiceGrad/Streaming Accent NAR）。约 15-20 行。

- [ ] **Step 2: 写 D2 长内容一致章**

技术路线（长上下文/说话人轮次条件化/推理期长时段）+ 跨原语影响（P4 在长内容上即旧 C7 诉求）+ **明确标注**：旧 C7"长内容局部修"= P4 + D2，编辑端仍真空白。代表论文（SwanVoice/MoonCast/MultiActor/FastLongSpeech/Borderless Long Speech）。

- [ ] **Step 3: 写 D3 噪声鲁棒章**

技术路线（频带感知/测试时适配/inpainting 补缺）+ 跨原语影响（P2 擦除/P3 修复在野外录音下受约束）+ 代表论文（SeamlessEdit/PGDI/Test-Time Training/PAS-SE/MPol）。

- [ ] **Step 4: 提交**

```bash
git commit -am "content: D1-D3约束维度章

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: 附录 + 洞察 + Caveat

**Files:**
- Modify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`
- Read: `.tmp_reclassify.json`（重点论文清单）

- [ ] **Step 1: 附录 A 评测基准 + B 取证** — 沿用旧报告（MMAE/SpeechEditBench/ISSE + PartialEdit/SED+AiEdit/StreamMark 等），arXiv ID 不变。

- [ ] **Step 2: 附录 C 重点论文总表** — 40 篇🔑按新 P1-P7 原语重新分组（不再按 C 场景），列 原语/论文/arXiv/venue/机构/入选理由。

- [ ] **Step 3: 附录 D 技术路线索引** — 指回 evolution-lineage，不变。

- [ ] **Step 4: 关键洞察（正交分层视角重写）** — 重写旧 6 条洞察为分层视角：①P1 分离独立后仍弱 ②正交分层消除 C3↔C7 等重叠 ③P7 裁剪/P6 情感 是缺口 ④D2 长内容编辑端真空白 ⑤P3 病理子段保身份vs可懂度权衡 ⑥维度标签揭示跨原语共性约束。

- [ ] **Step 5: Caveat** — 沿用旧 + 新增"正交分层仍非完全正交，部分 paper 跨原语/维度（如 MaskGCT 跨 P4/P5）"。

- [ ] **Step 6: 提交**

```bash
git commit -am "content: 附录/洞察/Caveat(正交分层版)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7: HTML 重渲染

**Files:**
- Modify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.html`
- Read: 旧 HTML 自身 `<style>` + 组件 class；新版 MD

**Interfaces:**
- Consumes: Task 3-6 定稿的 MD
- Produces: 配套 HTML，视觉沿用旧组件库

- [ ] **Step 1: 改总览为矩阵表** — 旧场景总览表改为 7×3 矩阵（P1-P7 行 × D1/D2/D3 列）。

- [ ] **Step 2: 场景卡改原语卡** — 9 张场景卡改为 7 张原语卡（P1-P7），五段结构，paper 条目带维度标签（用 chip/badge 样式标 D1/D2/D3）。

- [ ] **Step 3: 加 3 张维度卡** — D1/D2/D3 各一张卡（维度章）。

- [ ] **Step 4: 附录 C 总表** — 40 篇按 P1-P7 分组。

- [ ] **Step 5: 洞察/Caveat 同步** — 正交分层版。

- [ ] **Step 6: 验证 + 提交**

```bash
grep -c 'class="scene' ...html  # 7 原语卡 + 3 维度卡 = 10
grep -oE 'arxiv.org/abs/[0-9]+\.[0-9]+' ...html | sort -u | wc -l  # = MD 的 124 (121+3)
git add audio-research/audio-editing-simple-consumer-scenarios-2024-2026.html
git commit -m "render: 正交分层版HTML重渲染(7原语卡+3维度卡)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 8: 终检与收尾

**Files:**
- Verify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.{md,html}`

- [ ] **Step 1: arXiv ID 一致性** — `grep -oE 'arxiv.org/abs/[0-9]+\.[0-9]+' MD | sort -u` 与 HTML 比对，应均为 124（121+3）。

- [ ] **Step 2: 结构完整性** — 7 原语章 + 3 维度章 + 4 附录齐全；矩阵总览 7×3；每原语五段。

- [ ] **Step 3: 维度标签格式统一** — `grep -E '｜ 维度：' MD` 抽查格式，HTML 同步。

- [ ] **Step 4: 🔑 重点 40 篇归位** — 附录 C 总表 40 行，按 P1-P7 分组。

- [ ] **Step 5: 无产品名/placeholder** — `grep -niE 'Descript|Adobe|ElevenLabs|Samsung|Krisp|iZotope' MD` 应空；`grep -niE 'TBD|TODO|待填|待核|占位' MD` 应空。

- [ ] **Step 6: 清理临时文件**

```bash
rm audio-research/.tmp_reclassify.json audio-research/.tmp_separation_abs.json
git add -A
git commit -m "content: 正交分层报告定稿

终检通过:124 arXiv ID MD/HTML一致、7原语3维度结构齐全、
维度标签统一、40重点归位、无产品名/placeholder。

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```
