# 消费级语音简单编创·场景驱动报告 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 产出消费级"简单编创"场景驱动报告（MD + HTML 双产物），与现有专业级场景报告互补，聚焦学术界 SOTA 技术方向。

**Architecture:** 以消费级用户需求定义 C1-C7 七个场景，每场景五段（痛点诉求→学术 SOTA 与技术进展→paper→问题映射→技术点→成熟度与缺口），不含产品落地（归同事）。研究→撰写→渲染→自检四阶段。

**Tech Stack:** Markdown 报告主体；HTML 配套渲染沿用 `audio-editing-scenarios-2025-2026.html` 组件库风格；arXiv API + WebSearch 做论文核实与素材重扫。

**Spec:** `docs/superpowers/specs/2026-06-23-simple-consumer-editing-scenarios-design.md`

## Global Constraints

- 时间窗口：2024-2026，消费级视角重新扫一遍（含旧报告已收工作 + 新增消费级工作）。
- 内容聚焦学术界 SOTA；**不写产品落地情况**（归同事工业界调研）。
- arXiv ID 全部经 API 核实；能力数字标作者自报、未经独立验证。
- 缺口标注区分"领域真空白"vs"评测显示未就绪"（沿用旧报告区分）。
- 每场景约 30-50 行 MD；五段固定结构。
- 产出文件：`audio-research/audio-editing-simple-consumer-scenarios-2024-2026.{md,html}`。
- 网络访问慢时用代理：`export https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897`。
- 提交规约：每个 Task 结尾 commit，message 前缀按 `content:`/`scaffold:`/`render:`/`fix:`。
- Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>。

## File Structure

- Create: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`（报告主体）
- Create: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.html`（配套渲染）
- Reference（只读，供风格/素材复用）:
  - `audio-research/audio-editing-scenarios-2025-2026.md` / `.html`（旧报告：结构模板 + 已收工作）
  - `audio-research/audio-editing-survey-2025-2026.md`（素材池）
  - `audio-research/audio-editing-evolution-lineage.md`（技术路线索引源）

**素材库（研究阶段产出，工作文件）:** `audio-research/.tmp_consumer_research.md` — 临时存放按 C1-C7 分类的论文条目与 arXiv ID 核实结果，报告定稿后可删。

---

## Task 1: 素材重扫与归类（C1-C7）

**Files:**
- Create: `audio-research/.tmp_consumer_research.md`（工作素材库）
- Read: `audio-research/audio-editing-scenarios-2025-2026.md`、`audio-editing-survey-2025-2026.md`

**Interfaces:**
- Consumes: 旧报告已收 ~63 工作的 paper→问题映射
- Produces: `.tmp_consumer_research.md`，按 C1-C7 分节，每条含 `论文 | arXiv ID | 解决的消费级问题 | 核实状态`

- [ ] **Step 1: 从旧报告抽取已收工作**

通读 `audio-editing-scenarios-2025-2026.md` 的 S1-S8 paper→问题映射，把每篇归入对应 C 场景（映射见 spec §2 表：S2→C2、S1→C3、S4→C5、S6→C6、S8→C7；S2/S7→C1）。写入 `.tmp_consumer_research.md` 的对应 C 节，格式：
```
## C1 擦除与对象分离
- 论文名 | arXiv:XXXX.XXXXX | 解决的消费级问题 | 核实:待核
```

- [ ] **Step 2: 补扫消费级新增工作（C1/C2/C4/C5 重点）**

C1（擦除/分离）、C2（降噪增强）、C4（裁剪拼接）、C5（overdub/匿名化）是旧报告偏专业制作、消费级视角下新增工作最多的场景。用 WebSearch + arXiv 搜索 2024-2026：
- C1: "zero-shot sound source separation"、"audio object erasure"、"universal sound separation 2025 2026"
- C2: "speech enhancement real-time consumer"、"dereverberation neural 2025"、"audio inpainting consumer"
- C4: "audio splicing editing"、"music structure editing"、"nonlinear audio editing"
- C5: "one-shot voice conversion privacy"、"voice anonymization 2025"、"overdub speech"
每场景补 2-6 条候选，同样格式写入。标 `核实:待核`。

- [ ] **Step 3: arXiv ID 核实**

对 `.tmp_consumer_research.md` 里所有 `核实:待核` 条目，用 arXiv API（`https://export.arxiv.org/api/query?id_list=XXXX.XXXXX`，慢则走代理）逐条核实 ID 存在且标题匹配。核实通过改 `核实:OK`，不存在/不匹配标 `核实:FAIL` 并从列表移除或重找。

Run: 逐条 `curl -s "https://export.arxiv.org/api/query?id_list=XXXX.XXXXX" | grep -c "<entry>"` 期望 `1`。

- [ ] **Step 4: 提交素材库**

```bash
git add audio-research/.tmp_consumer_research.md
git commit -m "research: 消费级 C1-C7 素材重扫与 arXiv ID 核实

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: 报告骨架 + 场景总览表

**Files:**
- Create: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`
- Read: 旧报告头部（`audio-editing-scenarios-2025-2026.md` 行 1-23）作模板

**Interfaces:**
- Consumes: spec（场景集、定位）
- Produces: MD 文件的 §1 报告说明 + §2 场景总览表（C1-C7 表头）

- [ ] **Step 1: 写报告头部 + 说明**

照旧报告头部风格写：标题 `# 消费级语音简单编创·场景驱动报告（2024–2026）`，blockquote 说明：定位（消费级需求→学术 SOTA）、与旧报告关系（互补、C1-C7 独立编号、附录映射 S1-S8）、方法（消费级视角重扫 2024-2026）、数据、日期 2026-06-23。

- [ ] **Step 2: 写场景总览表**

| # | 用户场景 | 学术 SOTA 方向 | 成熟度 | 映射旧场景 |
七行 C1-C7（方向填 Task1 核实后的主线，成熟度先按预估占位 🟢🟡🔴，后续 Task 3 写作时定稿）。

- [ ] **Step 3: 提交**

```bash
git add audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md
git commit -m "scaffold: 报告头部与场景总览表

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: 逐场景撰写 C1-C7

**Files:**
- Modify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`
- Read: `.tmp_consumer_research.md`（素材库）

**Interfaces:**
- Consumes: Task 1 的 C1-C7 论文条目
- Produces: 七个完整场景段（五段结构）

每个场景一个 commit。每场景五段固定：
1. 场景痛点与用户诉求（消费级视角，3-4 典型用户 + 共性诉求）
2. 学术 SOTA 与技术进展（主体叙述，2024-2026 方向/已解决/路线演进）
3. paper→问题映射（arXiv ID 链接，每条一句话）
4. 技术点（逗号串）
5. 成熟度与缺口（🟢🟡🔴 + 真空白/未就绪区分）

- [ ] **Step 1: 写 C1 擦除与对象分离**

消费旗舰场景。诉求：擦掉背景里某个人声/噪音/音乐或单独调。学术方向：zero-shot 音源分离、对象级擦除、universal sound separation。约 30-50 行。写完核对 arXiv ID 与素材库一致。

- [ ] **Step 2: 提交 C1**

```bash
git add audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md
git commit -m "content: C1 擦除与对象分离

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

- [ ] **Step 3-4: 写并提交 C2 一键降噪/增强修复**

学术方向：语音增强、dereverb、neural inpainting。诉求：脏录音变干净（风噪/回声/嗡声/clipping），一键可靠。

- [ ] **Step 5-6: 写并提交 C3 文字改录音/口误秒改**

学术方向：token infilling、编辑即填空、codec-LM。诉求：改转写字=改录音、删口误/补半句、不可感知。

- [ ] **Step 7-8: 写并提交 C4 片段裁剪拼接重组**

学术方向：音频拼接、结构编辑、非线性编辑。诉求：裁剪/拼接/重排做片段（与 C3 改内容区分：C4 改结构）。

- [ ] **Step 9-10: 写并提交 C5 轻量补一句/换一声**

学术方向：零样本 VC、overdub、隐私匿名化。诉求：用自己的声音补缺/换音色/匿名化。

- [ ] **Step 11-12: 写并提交 C6 口音归一/方言转标准**

学术方向：口音转换、模型编辑、流式。诉求：口音变标准/方言转换、保身份。

- [ ] **Step 13-14: 写并提交 C7 长内容局部修**

学术方向：长时段一致性、编辑端。诉求：改已录长内容一处不破坏全局。标"领域真空白"。

- [ ] **Step 15: 更新场景总览表成熟度**

回填 Task 2 总览表里 C1-C7 的成熟度定稿值。

- [ ] **Step 16: 提交总览表更新**

```bash
git commit -am "content: 回填 C1-C7 成熟度定稿

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: 横切附录 + 洞察 + 战略 + Caveat

**Files:**
- Modify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`

- [ ] **Step 1: 附录 A 评测基准**

列消费级相关 benchmark：MMAE / SpeechEditBench / ISSE + 分离评测（MUSDB/SiSNR 类）+ 增强评测。每条标服务哪个 C 场景、arXiv ID。

- [ ] **Step 2: 附录 B 编辑检测/取证**

沿用旧报告（PartialEdit / SED+AiEdit / StreamMark 等），补一句"消费级擦除/编辑普及后取证需求上升"。arXiv ID 核实。

- [ ] **Step 3: 附录 C 与旧 8 场景映射表**

C1-C7 ↔ S1-S8 对照表，标"新场景/消费视角重述"。

- [ ] **Step 4: 附录 D 技术路线索引**

一句话指回 `audio-editing-evolution-lineage`，不重复成章。

- [ ] **Step 5: 关键洞察（消费级视角）**

写 spec §5 预期 4 条（旗舰 C1、不可感知更严、C7 真空白、需求-能力错配点），按研究阶段实际发现定稿。

- [ ] **Step 6: 战略层·五看三定（消费级读法）**

照旧报告框架写，"四看·看自己"留白，三定依赖部分留白。

- [ ] **Step 7: Caveat**

沿用旧报告 5 条 + 新增 2 条（消费级主观聚类、与同事工业界调研边界划分）。

- [ ] **Step 8: 提交**

```bash
git commit -am "content: 附录/洞察/五看三定/Caveat

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: HTML 渲染

**Files:**
- Create: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.html`
- Read: `audio-research/audio-editing-scenarios-2025-2026.html`（组件库风格源）

**Interfaces:**
- Consumes: Task 2-4 定稿的 MD
- Produces: 配套 HTML，视觉与旧报告一致

- [ ] **Step 1: 抽取旧报告 HTML 组件库**

读 `audio-editing-scenarios-2025-2026.html` 的 `<style>` 与页面骨架（报告头、总览表、场景卡、附录、洞察、五看三定、Caveat 的 class 结构），保留 CSS 不变。

- [ ] **Step 2: 套用新报告内容**

把 MD 各节内容填入对应 HTML 结构：标题、blockquote 说明、总览表、C1-C7 场景卡（五段）、附录 A-D、洞察、五看三定、Caveat、footer。

- [ ] **Step 3: 渲染自检**

浏览器/`grep` 检查：标题正确、七张场景卡齐全、arXiv 链接可点、无占位文字、CSS 未破。

Run: `grep -c "class=\"scard\"" audio-research/audio-editing-simple-consumer-scenarios-2024-2026.html` 期望 `7`。

- [ ] **Step 4: 提交**

```bash
git add audio-research/audio-editing-simple-consumer-scenarios-2024-2026.html
git commit -m "render: 消费级报告 HTML 配套渲染

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: 终检与收尾

**Files:**
- Verify: `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.{md,html}`

- [ ] **Step 1: arXiv ID 终检**

全量复核 MD/HTML 里所有 arXiv 链接 ID 与 `.tmp_consumer_research.md` 核实状态一致，无 FAIL 残留。

- [ ] **Step 2: 结构完整性检查**

- 七场景齐全（C1-C7），每场景五段齐全
- 附录 A-D 齐全
- 无产品落地段（确认未写"落地情况"——归同事）
- 映射表 C1-C7↔S1-S8 一致

- [ ] **Step 3: 无占位检查**

`grep -niE "TBD|TODO|待填|待核|占位|placeholder" audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md` 期望无输出（`待核`只允许在临时素材库，最终报告不得有）。

- [ ] **Step 4: 清理临时素材库**

```bash
rm audio-research/.tmp_consumer_research.md
```

- [ ] **Step 5: 终检提交**

```bash
git add -A
git commit -m "content: 消费级语音简单编创场景报告定稿

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```
