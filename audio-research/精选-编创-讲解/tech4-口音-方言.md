---
方向: 语音编创 / 口音/方言
用户场景: 口音识别/归一化/转换、方言识别与合成、跨语言语音、口音鲁棒适应
时间范围: 2025-07 ~ 2026-06
检索venue: arXiv(eess.AS/cs.SD)、ICASSP、Interspeech、NeurIPS、ICML、ICLR、ACL、EMNLP、ACM MM、TASLP/TSP/SPL/TMM
论文数: 9
来源: 精选-编创-2025H2-2026.md（97 篇精选、Semantic Scholar 引用核实）
---

# 口音/方言

## 方向概览

口音/方言是小而应用价值高的方向。主线：(1)口音识别机理——证明 SOTA LID 实为口音分类器（靠短音素特征）；(2)方言识别数据集（ADI-17 扩展、大规模四川话语料）；(3)口音归一化（CosyAccent 源-合成训练+可控时长）；(4)口音转换（FAC-FACodec 因子化 codec 提供口音强度可调参数）；(5)口音鲁棒（L1-L2 多任务复现 ISIB、显著性频谱掩码）；(6)LALM 口音适应（激活引导）。因子化 codec 是口音可控的关键工具。

## 论文清单

> 仅索引级信息（精选阶段已核实 arXiv ID 与引用）。**论文深度展开暂缺**——展开方法待用户指定后统一填充。

| # | 论文 Title | arXiv ID | 来源 | 引用 | 年 | 技术点 | 场景 | 选取理由 |
|---|---|---|---|---|---|---|---|---|
| 1 | Advanced Modeling of Interlanguage Speech Intelligibility Benefit with L1-L2 Multi-Task Learning Using Differentiable K-Means for Accent-Robust Discrete Token-Based ASR | 2601.19767 | ICASSP-2026-B | 2 | 2026 | L1-L2 多任务+可微 K-Means 复现 ISIB | 口音鲁棒 token ASR | 榜首(11.95)；口音鲁棒 ASR 代表，离散 token+可微 K-Means 复现 ISIB 现象，技术路线独特，2026 顶会 |
| 2 | LID Models are Actually Accent Classifiers: Implications and Solutions for LID on Accented Speech | 2506.00628 | Interspeech-2025-B | 2 | 2025 | 证明 SOTA LID 实为口音分类器(短音素特征) | 口音识别机理 | 口音识别机理性洞察，揭示 LID/口音边界混淆，视角独特不可替代，顶会 |
| 3 | ADI-20: Arabic Dialect Identification dataset and models | 2511.10070 | Interspeech-2025-B | 5 | 2025 | ADI-17 扩展数据集+方言识别模型 | 方言识别与建模 | 方言识别类最高引(5)；数据集+模型基准，方言识别路线核心代表，顶会 |
| 4 | FAC-FACodec: Controllable Zero-Shot Foreign Accent Conversion with Factorized Speech Codec | 2510.10785 | ICASSP-2026-B | 4 | 2025 | 因子化 codec 提供口音强度可调参数 | 零样本外音口音转换 | 口音转换类最高引(4)；因子化 codec 零样本+强度可控，与流式 AC 思路不同，顶会+2026 |
| 5 | CosyAccent: Duration-Controllable Accent Normalization Using Source-Synthesis Training Data | 2602.19166 | ICASSP-2026-B | 1 | 2026 | "源-合成"训练数据+可控时长口音归一化 | L2→母语口音归一化 | 口音归一化路线代表；时长可控+"源-合成"数据，区别于离散 token/扩散归一，2026 顶会 |
| 6 | Accent-Invariant Automatic Speech Recognition via Saliency-Driven Spectrogram Masking | 2510.09528 | ICASSP-2026-B | 3 | 2025 | 显著性驱动频谱掩码去除口音信息 | 口音鲁棒 ASR | 口音鲁棒 ASR 另一思路(频谱掩码抹除口音)，与 ISIB 的 token 路线互补，顶会+2026 |
| 7 | WenetSpeech-Chuan: A Large-Scale Sichuanese Corpus with Rich Annotation for Dialectal Speech Processing | 2509.18004 | arXiv-csSD-2025H2 | 12 | 2025 | 大规模四川话语料+丰富标注 | 方言 TTS/语音生成 | 全类最高引(12)；方言合成语料规模代表，中文方言路线，填补方言 TTS 数据维度 |
| 8 | Activation Steering for Accent Adaptation in Large Audio Language Models | 2603.05813 | arXiv-eessAS-2026H1 | 2 | 2026 | 激活引导口音适应 LALM | 音频 LLM 口音适应 | 全新路线：音频大模型口音适应(激活引导)，区别于传统 ASR/VC 路线，2026 代表 〔实录Interspeech 2026〕 |
| 9 | PSP: An Interpretable Per-Dimension Accent Benchmark for Indic Text-to-Speech | 2604.25476 | arXiv-csSD-2026H1 | 2 | 2026 | 可解释逐维度口音 benchmark(印地语 TTS) | 口音/低资源方言语音 | benchmark 路线代表；可解释逐维口音评估，印地语低资源方言 TTS，2026 |

## 论文深度展开（方法待定）

> 本节将按用户后续指定的展开方法（如逐篇深读 / 按技术路线对比 / 按场景映射等）统一填充，当前留空。
