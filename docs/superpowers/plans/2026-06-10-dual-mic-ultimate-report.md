# 双路麦克风时延对齐终极版报告 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将三份双路麦克风时延对齐调研报告去重、整合为一个全新的终极版 HTML 报告（~90KB）。

**Architecture:** 单个静态 HTML 文件，纯 CSS 无 JS。内容从三份源报告中提取、去重、重组为 13 章。每章以"⚡快速结论"卡片开头。

**Tech Stack:** HTML5 + CSS3 (custom properties, grid, flexbox), no JavaScript.

**Source Files:**
- R1: `dual_mic_alignment_report.html` (63KB, light theme, most comprehensive)
- R2: `dual-channel-audio-delay-alignment-report.html` (58KB, dark theme, complementary analysis)
- R3: `dual-mic-active-calibration-report.html` (28KB, editorial style, product-oriented)

**Output File:** `dual-mic-delay-alignment-ultimate-report.html`

**Spec:** `docs/superpowers/specs/2026-06-10-dual-mic-ultimate-report-design.md`

---

### Task 1: HTML 骨架 + 完整 CSS + 页头

**Files:**
- Create: `dual-mic-delay-alignment-ultimate-report.html`

- [ ] **Step 1: 创建文件，写入 DOCTYPE + CSS + 页头 + 导航 + TOC**

从设计规格中提取色彩系统、排版、布局和全部 10 个组件的 CSS。包含：
- CSS custom properties（11 个色值）
- body / 排版基础样式
- `.nav` sticky 毛玻璃导航条
- `.hero` 页头区域（大标题 + 副标题 + 元信息标签）
- `.toc` 目录（13 项锚点链接）
- 所有组件 CSS：`.kpi-grid` / `.kpi` / `.score-bar` / `.comparison-table` / `.callout`（4 色）/ `.formula` / `pre`+`code` / `.diagram` / `.phase-timeline` / `.badge` / `.flow-steps`
- `@media (max-width: 768px)` 响应式
- `@media print` 打印样式

关键 CSS 结构（完整写入）：

```css
:root {
  --bg: #fafaf7; --surface: #ffffff; --primary: #1e40af;
  --accent: #059669; --warn: #d97706; --danger: #dc2626;
  --code-bg: #1e293b; --text: #1f2937; --text-dim: #6b7280;
  --border: #e5e7eb; --highlight: rgba(5,150,105,0.06);
}
```

页头内容：
- 标题：`🎤 双路麦克风时延对齐 — 终极调研报告`
- 副标题：`手机 + 外接无线麦克风双路拾音 · 冷启动时延估计 · 信号设计 · 系统架构`
- 元信息：日期 2026-06-10、v3.0 Ultimate、Deep Research

- [ ] **Step 2: 浏览器打开验证骨架**

Run: `open dual-mic-delay-alignment-ultimate-report.html`
Expected: 看到页头、导航条、目录，样式正确，无 HTML 错误。

- [ ] **Step 3: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: HTML skeleton + CSS + header for ultimate report"
```

---

### Task 2: 第 1 章 — 一页结论

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`（在 TOC 之后插入）

**Sources:** R3 的 KPI 卡片 (§summary) + R1 摘要 (§1 约束表)

- [ ] **Step 1: 写入第 1 章 HTML**

组件清单：
1. `<section id="sec1">` + `<h2>` + `⚡快速结论` callout
2. KPI 网格（4 格）：
   - 主卡（渐变底，跨 2 列）：首选 MVP = "100-300ms 可听短 Chirp"
   - 副卡：最稳 Fallback = "用户说'开始'"
   - 副卡：高级探索 = "近超声探针（需验证）"
   - 副卡：验收指标 = "< 10ms（内部目标 3-5ms）"
3. "为什么不能只靠算法等第一句话" 的简明 callout（来自 R3）
4. 推荐路径简图（Chirp → 超声 → 水印 → 持续跟踪），用 `.flow-steps` 组件

- [ ] **Step 2: 浏览器验证第 1 章渲染**

- [ ] **Step 3: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch1 executive summary with KPI dashboard"
```

---

### Task 3: 第 2 章 — 问题本质与约束

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

**Sources:** R1 §1（约束表）+ R2 §1（冷启动本质）+ R3 §measurement（几何偏差分析）

- [ ] **Step 1: 写入第 2 章 HTML**

内容结构：
1. `⚡快速结论` callout
2. 约束表（从 R1 §1 合并，含：场景、核心痛点、精度要求、现有方案、待解决问题、约束）
3. "为什么是 10ms" callout（Haas Effect 解释，来自 R1）
4. 问题本质：冷启动（来自 R2 §1.2 的简洁解释）
5. **几何偏差分析**（R3 独有）：
   - 两列对比卡片：`estimated_delay`（喇叭→两麦）vs `wanted_delay`（嘴巴→两麦）
   - 关键设计含义 callout（R3 的 warning callout）

- [ ] **Step 2: 浏览器验证**

- [ ] **Step 3: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch2 problem definition with geometry analysis"
```

---

### Task 4: 第 3 章 — 方案全景图

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

**Sources:** R1 §2（三族 ASCII 图）+ R2 §2（注入架构表）+ R3 §methods（评分卡片）

- [ ] **Step 1: 写入第 3 章 HTML**

内容结构：
1. `⚡快速结论` callout
2. 三族分类 ASCII 图（从 R1 §2 提取）
3. 注入架构对比表（R2 §2.1 的四种架构：扬声器外放 / TX 内置 / 用户操作 / RX 数字注入）
4. 关键判断 callout（R2 的领夹式 vs 手持式讨论）
5. 6 方法评分卡片（R3 风格，每个含条形图）：
   - 短 Chirp（推荐 MVP）
   - MLS/PN 序列
   - 近超声 Chirp
   - 用户口部源校准
   - 硬件 Loopback 标定
   - UI 音效嵌码

- [ ] **Step 2: 浏览器验证**

- [ ] **Step 3: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch3 solution overview with scoring cards"
```

---

### Task 5: 第 4 章 — 主动校准信号（最大章节）

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

**Sources:** R1 §3（主要）+ R2 §3-4（补充）— 最大去重区

- [ ] **Step 1: 写入 §4.1 线性 Chirp（LFM）**

从 R1 §3 A2.1 提取：
- 数学定义（公式块）
- 匹配滤波原理（代码块：频域实现 + 处理增益公式）
- 窗函数对比表（合并 R1 + R2，推荐 Tukey α=0.5）
- 亚样本插值（对数域抛物线，代码块）
- 推荐参数表（f₀=200Hz, f₁=8kHz, T=50ms, TBP=390）

从 R2 §5.4 补充淡入淡出设计（5ms 余弦²）

- [ ] **Step 2: 写入 §4.2 指数扫频 ESS**

从 R1 §3 A2.2 提取：
- 数学定义 + 逆滤波器归一化（含 A_norm）
- 非线性失真分离（ASCII 图）
- LFM vs ESS 对比表

从 R2 §4.3 补充实测对比数据（ESS 80.1dB vs MLS 60.5dB）

- [ ] **Step 3: 写入 §4.3 MLS + §4.4 Golay**

MLS（R1 §3 A2.3）：LFSR 原理 + 参数表（n=10~16）+ FHT 加速 + 长度建议
Golay（R1 §3 A2.4 + R2 §4.1）：互补序列定义 + 递归构造 + **时间开销警告**（R1 的 danger callout：不推荐无线场景）

- [ ] **Step 4: 写入 §4.5 近超声 Chirp + §4.6 综合对比表**

近超声（R1 §3 A2.5）：频段响应表 + **硬件可靠性警告**（R1 的 danger callout + R3 的风险提示）+ 推荐参数
综合对比表：合并 R1 + R2 为终极表（8 列：旁瓣/SNR/非线性分离/播放次数/时长/鲁棒性/感知/推荐度）

- [ ] **Step 5: 浏览器验证第 4 章**

- [ ] **Step 6: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch4 active calibration signals (Chirp/ESS/MLS/Golay/ultrasonic)"
```

---

### Task 6: 第 5-6 章 — 音频水印 + GCC-PHAT

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

**Sources:** R1 §4（水印，主要）+ R1 §5（GCC-PHAT）

- [ ] **Step 1: 写入第 5 章 — 音频水印持续校准**

内容结构：
1. `⚡快速结论` callout
2. 核心原理差异（R1 的 ASCII 图：方案 A vs B 时间关系）
3. §5.1 扩频水印 DSSS：嵌入算法代码 + 心理声学掩蔽表 + 处理增益公式
4. §5.2 导频音：Hilbert 变换代码 + 精度公式 + **相位模糊警告** + 多频 Vernier 解法
5. §5.3 自同步机制表（3 种方式）
6. §5.4 实时性能评估表 + 算法延迟预算

- [ ] **Step 2: 写入第 6 章 — 被动 TDE 基线 GCC-PHAT**

内容结构：
1. `⚡快速结论` callout
2. PHAT 加权公式
3. 优势与局限表（3 优 2 劣）
4. 与主动方案的互补关系 ASCII 图
5. 参考链接（Interspeech 2022 Neural GCC-PHAT）

- [ ] **Step 3: 浏览器验证**

- [ ] **Step 4: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch5-6 audio watermarks and GCC-PHAT baseline"
```

---

### Task 7: 第 7-8 章 — 检测算法 + 心理声学

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

**Sources:** R1 插值分析 + R2 §6（检测）+ R2 §7（心理声学）+ R3（UI 嵌码）

- [ ] **Step 1: 写入第 7 章 — 检测算法与亚采样精度**

内容结构：
1. `⚡快速结论` callout
2. 匹配滤波流程图（采用 R2 §6.1 的 ASCII 图，更清晰）
3. 插值方法对比表（合并 R1 + R2：无插值/抛物线线性/抛物线对数/匹配滤波/GCC-PHAT/频域相位）
4. 插值精度参考 callout（R1 的 Lai et al. 数据）
5. 多径/混响处理策略（R2 §6.3：取最早峰而非最大峰）

- [ ] **Step 2: 写入第 8 章 — 心理声学与用户体验设计**

内容结构：
1. `⚡快速结论` callout
2. 三种频谱整形策略（R2 §7.1 的三列卡片：高频偏好 / 宽带低振幅 / 掩蔽嵌入）
3. 用户可接受性设计表（R2 §7.2）
4. 产品化策略（R3：嵌入倒计时/提示音，探针段不写入最终素材）

- [ ] **Step 3: 浏览器验证**

- [ ] **Step 4: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch7-8 detection algorithms and psychoacoustic design"
```

---

### Task 8: 第 9 章 — 关键工程约束

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

**Sources:** R1 §6（最详细）+ R3 §risks（补充）

- [ ] **Step 1: 写入第 9 章 HTML**

内容结构：
1. `⚡快速结论` callout
2. §9.1 蓝牙编码延迟抖动：编码表（SBC/AAC/aptX/aptX Adaptive + 重传 + USB）+ 影响 callout
3. §9.2 时钟漂移：量化公式（ppm → ms/s → 累积时间）+ 持续跟踪必要性 callout
4. §9.3 手机音频 DSP 管线：DSP 表（NS/AGC/AEC/波束成形/带宽限制）+ 对策 callout（UNPROCESSED / measurement 模式）
5. §9.4 系统音频处理风险（R3 的 AGC/NS/AEC 简明警告）
6. §9.5 多径反射（R3 的"最早且足够强"峰策略 + 重复探针取 median）
7. "不要把主动探针当作唯一真相" danger callout（R3）

- [ ] **Step 2: 浏览器验证**

- [ ] **Step 3: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch9 engineering constraints (BT/clock/DSP)"
```

---

### Task 9: 第 10-11 章 — 持续跟踪 + 实施路线

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

**Sources:** R1 §4 水印跟踪 + R2 §8（跟踪）+ R1 §7（时间线）+ R3 §experiments（实验矩阵）

- [ ] **Step 1: 写入第 10 章 — 持续跟踪与漂移对策**

内容结构：
1. `⚡快速结论` callout
2. §10.1 扩频水印持续跟踪（R2 §8.1 参数表：CSS chirp 12-18kHz, 500ms 周期）
3. §10.2 NLMS 自适应滤波器（R2 §8.2 伪代码）
4. §10.3 BFM 二值化特征匹配（R2 §8.3 简述 + Interspeech 2024 引用）
5. §10.4 周期性重校准（R1 的看门狗机制：延迟变化 >5ms 立即重校准）

- [ ] **Step 2: 写入第 11 章 — 实施与实验路线**

内容结构：
1. `⚡快速结论` callout
2. Phase 时间线（R1 §7 的 4 阶段，用 `.phase-timeline` 组件）：
   - Phase 1: 可听 Chirp（1-2 周）
   - Phase 2: 近超声升级（2-4 周）
   - Phase 3: 扩频水印（1-3 月）
   - Phase 4: 产品级优化（3-6 月）
3. 实验矩阵表（R3 §experiments 的 5 阶段：含实验/成功标准/失败处理）
4. 方案组合推荐（R1 的 8 步完整流程 ASCII 图）

- [ ] **Step 3: 浏览器验证**

- [ ] **Step 4: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch10-11 tracking and implementation roadmap"
```

---

### Task 10: 第 12-13 章 — 参考代码 + 参考文献

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

**Sources:** R1 + R2 代码 + R1 §8-9 + R2 §10 文献

- [ ] **Step 1: 写入第 12 章 — 参考代码**

5 个代码块（去重合并）：
1. Chirp 信号生成（R1 版本，含 Tukey 窗 + generate_chirp 函数）
2. 延迟估计算法（R1 版本，含频域匹配滤波 + 对数域抛物线插值 + estimate_delay_chirp 函数）
3. Golay 序列生成（R2 版本，递归构造 generate_golay_pair）
4. Android AudioTimestamp 粗估（R2 §9.4 Java 代码）
5. 最小可行方案 vs 完美方案（R2 §9.5 双栏对比卡片）

- [ ] **Step 2: 写入第 13 章 — 参考文献 + 审查摘要**

内容结构：
1. 去重文献列表（按主题分 4 组）：
   - 校准信号（~12 条，来自 R1 §8 方案 A）
   - 水印（~10 条，来自 R1 §8 方案 B）
   - TDE/GCC-PHAT（~3 条）
   - 约束与工程（~8 条）
2. 独立审查摘要（R1 §9）：
   - 审查评分网格（A-/B+→A-/B+→A-/A）
   - 已修正 3 项关键问题表（C1/C2/C3）
   - 已纳入 5 项改进表（I1-I5）

- [ ] **Step 3: 写入 Footer + 闭合标签**

Footer 内容：
- AI Disclosure
- 生成日期 + 版本 v3.0 Ultimate
- 技术审查说明

闭合 `</main></div></body></html>`

- [ ] **Step 4: Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: ch12-13 reference code and bibliography"
```

---

### Task 11: 最终验证与修复

**Files:**
- Modify: `dual-mic-delay-alignment-ultimate-report.html`

- [ ] **Step 1: 全文校验**

检查项：
- 所有 13 个 `id="secN"` 锚点存在且与 TOC 链接匹配
- 所有外部链接 `href` 完整（无截断）
- HTML 标签闭合正确（无遗漏 `</section>` / `</table>` / `</div>`）
- 无残留的源报告 CSS 类名（如 R2 的 `.card.highlight`、R3 的 `.flow-step`）— 应使用新 CSS 类名
- 所有 `<pre><code>` 块正确闭合
- 表格 `<table>` 有 `<thead>` / `<tbody>` 结构

- [ ] **Step 2: 浏览器完整浏览验证**

Run: `open dual-mic-delay-alignment-ultimate-report.html`

检查：
- 导航条 sticky 行为正常
- 所有 TOC 链接跳转正确
- 表格无溢出
- 代码块可读
- 响应式：缩小窗口到手机宽度，验证单列布局
- 打印预览：`Cmd+P` 验证黑白样式

- [ ] **Step 3: 文件大小检查**

Run: `wc -c dual-mic-delay-alignment-ultimate-report.html`
Expected: ~80-100KB（目标 85-95KB）

- [ ] **Step 4: 修复发现的问题**

根据浏览器验证修复任何样式、布局或内容问题。

- [ ] **Step 5: 最终 Commit**

```bash
git add dual-mic-delay-alignment-ultimate-report.html
git commit -m "feat: finalize ultimate dual-mic report — all 13 chapters complete"
```
