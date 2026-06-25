# 消费级语音简单编创·正交分层报告设计（重构）

> 原地重构现有《消费级语音简单编创·场景驱动报告》。旧版以 9 个用户场景（C1-C9）为主线，存在不正交问题（C3↔C7、C3↔C8、C5↔C1 重叠）。本版改为**正交分层结构**：7 个操作原语 × 3 个约束维度。

- **日期**：2026-06-25
- **作者**：Claude（与用户协作）
- **状态**：待用户审阅

---

## 1. 报告定位与关系

- **定位不变**：消费级需求 → 学术界 SOTA，不含产品落地（归同事）。
- **与旧版关系**：**原地重构覆盖**。文件路径不变（`audio-editing-simple-consumer-scenarios-2024-2026.{md,html}`），内容从场景驱动改为原语驱动。
- **保留**：40 篇🔑重点论文（重新归到各原语）、121 篇正文论文（重新归类）、arXiv ID 核实结果、横切附录框架。
- **新增**：7 原语×3 维度矩阵总览、约束维度章、P1 分离独立原语（补 3 篇分离论文）。
- **时间窗口**：2024-2026（不变）。

---

## 2. 正交分层：7 原语 × 3 维度

### 2.1 七个操作原语（P1-P7，正交）

| 原语 | 定义 | 旧场景来源 | 迁入论文（代表） |
|---|---|---|---|
| **P1 分离提取** | 从混音中分离/提取目标声源（人声/乐器/事件） | C1 拆出 + 补缺 | AudioSep / ZeroSep(补) / CodeSep(补) / Target Speaker Extraction(补) / Semantically Consistent Dataset / QuarkAudio |
| **P2 擦除** | 删除指定声源/对象，保其余不变 | C1 剩余 | MMEDIT / Ming-UniAudio-Edit / SAO-Instruct / AudEdit / DirectAudioEdit / FreeSonic / RFM-Editing |
| **P3 修复增强** | 降噪/去混响/inpainting 补缺 + 病理发声重建 | C2 + C9 | PGDI / Token-Based Inpainting / PhASE-Flow / FlowSE-GRPO / DisContSe / MAGE / UNIT-DSR / DiffDSR / ClaritySpeech |
| **P4 token 编辑** | 改文字=改录音/口误秒改（词级） | C3 | VoiceCraft / CosyEdit / SSR-Speech / AST / FluentEditor2 / LLaDA-TTS / MaskGCT / Metis |
| **P5 VC 与匿名** | 换声/克隆/隐私匿名化/口音归一 | C5 + C6 | AutoVC / FreeVC / Vevo2 / X-VC / StreamVC / Zero-VC / EASY / DiffAnon / FlowEdit / PHONOS / SonoEdit |
| **P6 情感韵律** | 改情绪/韵律不改内容音色 | C8 | EmoCorrector / EmoSteer-TTS / UDDETTS / emotion2vec / Causal Prosody / ZSDEVC / EASPO |
| **P7 裁剪拼接** | 改结构/重排/拼接（非改内容） | C4 | MMEDIT(reordering) / LLaDA-TTS(selective masking) / AudioChat |

### 2.2 三个约束维度（D1-D3，正交，作 paper 标签）

| 维度 | 定义 | 代表论文 |
|---|---|---|
| **D1 实时/流式** | 低延迟、流式因果、零前瞻 | StreamVC / DualVC3 / PHONOS / Zero-VC / FasterVoiceGrad / Streaming Accent NAR |
| **D2 长内容一致** | 跨段说话人/情感不漂移 | SwanVoice / MoonCast / MultiActor / FastLongSpeech / Borderless Long Speech |
| **D3 噪声鲁棒** | 野外/含噪录音下可靠 | SeamlessEdit / PGDI / Test-Time Training / PAS-SE / MPol |

### 2.3 正交性验证

- P1 分离 vs P2 擦除：提取目标 vs 删除目标（操作方向相反）✓
- P4 token编辑 vs P7 裁剪：改内容 vs 改结构 ✓
- P5 VC vs P6 情感：换音色 vs 改情绪（两个正交属性维度）✓
- D1/D2/D3 是附加约束，与原语正交 ✓
- 旧 C3↔C7 重叠消除：长内容 = P4 + D2 标签 ✓
- 旧 C3↔C8 重叠消除：情感 = P6 独立 ✓
- 旧 C5↔C1 匿名重叠消除：匿名化归 P5，擦除归 P2，分离归 P1 ✓

### 2.4 特殊处理

- **P5 VC 与匿名**：含**口音归一子线**（C6 迁入，标 D1 实时）+ **匿名化子线**（C1 的 Zero-VC/EASY/DiffAnon 迁入）。子线用三级标题分隔。
- **P3 修复增强**：含**外部噪声修复子段**（PGDI/PhASE-Flow 等）+ **病理发声重建子段**（C9 迁入，UNIT-DSR/DiffDSR/ClaritySpeech 等），两子段显式分界（修外部噪声 vs 修发声机能）。

---

## 3. 报告整体结构

1. 报告说明（定位、本次重构说明、与旧场景版关系）
2. **正交分层总览**：7 原语×3 维度矩阵表（P1-P7 行 × D1/D2/D3 列，每格标代表论文数/成熟度）
3. **P1-P7 七个原语章**（每章五段，见 §4）
4. **D1-D3 三个约束维度章**（每个一节，见 §5）
5. 横切附录（A 评测基准 / B 取证 / C 重点论文总表 / D 技术路线索引）
6. 关键洞察（正交分层视角重写）
7. Caveat（沿用 + 新增"正交分层仍非完全正交，部分 paper 跨原语/维度"）

---

## 4. 每原语章内部结构（P1-P7，固定五段）

1. **原语定义与用户诉求** — 做什么、消费级用户为何要它（2-3 典型用户 + 共性诉求）。开头**正交边界声明**：与相邻原语区别。
2. **学术 SOTA 与技术进展** — 主体叙述：2024-2026 路线、已解决到哪、范式演进。
3. **paper→问题映射** — 论文清单（arXiv 链接 + 三要素），**每条带维度标签**：
   - 格式：`- 🔑 **论文名**（[arxivID]）：方法 ｜ 意义 ｜ 局限 ｜ 维度：D1实时 / D2长内容 / D3噪声`
   - 一篇 paper 可标多维度；🔑 重点论文保留（40 篇重新归位）
4. **技术点** — 关键技术名词逗号串。
5. **成熟度与缺口** — 🟢🟡🔴 + 缺口（区分"领域真空白"vs"评测显示未就绪"）。

**篇幅**：每原语章 40-60 行（含维度标签和子线，比旧场景章略长）。

---

## 5. 约束维度章（D1-D3，每节约 15-20 行）

- **D1 实时/流式**：技术路线（因果网络/零前瞻/一步蒸馏/流式 NAR），跨原语影响（P5 VC/P3 增强/P6 情感受低延迟约束），代表论文。
- **D2 长内容一致**：技术路线（长上下文/说话人轮次条件化/推理期长时段），跨原语影响（P4 token编辑在长内容上即旧 C7 诉求）。**明确标注**：旧 C7"长内容局部修"= P4 + D2，编辑端仍真空白。
- **D3 噪声鲁棒**：技术路线（频带感知/测试时适配/inpainting 补缺），跨原语影响（P2 擦除/P3 修复在野外录音下受约束），代表论文。

---

## 6. 论文迁移规则

- 121 篇按 7 原语重新归类，同篇可跨原语（如 MaskGCT 跨 P4/P5；Metis 跨 P4/P5）。
- 40 篇🔑重点保留，重新归位到各原语。
- 旧 C6 口音 → P5 子线；旧 C9 病理 → P3 子段；旧 C7 长内容 → 拆散到 D2 + 各原语；旧 C4 裁剪 → P7（论文少，标🔴领域真空白）。
- 旧 C1 拆分：分离类 → P1，擦除类 → P2。

---

## 7. 补分离论文（P1）

用 audio-paper-search skill 的 HTML abs 页 fallback 方法抓摘要 + 核实 arXiv ID：
- ZeroSep（2505.23625，NeurIPS 2025）— 零训练通用源分离
- CodeSep（2601.12757，ICASSP 2026）— codec 驱动低码率语音分离
- Target Speaker Extraction（2502.16611，NeurIPS 2025）— 噪声注册音目标说话人提取

抓不到摘要的保留旧说明，arXiv ID 经核实。补入 P1，并写三要素（方法/意义/局限）。

---

## 8. 产物与自检

**产物**：
- `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.md`（原地覆盖）
- `audio-research/audio-editing-simple-consumer-scenarios-2024-2026.html`（原地覆盖，沿用旧 CSS 组件库，改总览为矩阵、原语章、维度章）
- PPT 本次不动。

**自检**：
- 7 原语×3 维度矩阵齐全
- 121+3 篇 arXiv ID 一致（MD/HTML 同）
- 维度标签格式统一（`｜ 维度：D1/D2/D3`）
- 无产品名、无 placeholder
- 🔑 40 篇重点重新归位、附录 C 总表同步更新

---

## 9. 实施路径

1. **论文重新归类**：121 篇按 P1-P7 重新归，建迁移映射（含跨原语）；40 篇🔑同步归位。
2. **补分离论文**：抓 3 篇摘要 + 核实 + 写三要素，入 P1。
3. **重写报告骨架**：报告说明 + 矩阵总览 + 7 原语章 + 3 维度章 + 附录 + 洞察 + Caveat。
4. **HTML 重渲染**：沿用旧组件库，总览改矩阵、场景卡改原语卡、加维度标签样式。
5. **自检**：矩阵齐全、arXiv 一致、维度标签统一、无产品名/placeholder。
