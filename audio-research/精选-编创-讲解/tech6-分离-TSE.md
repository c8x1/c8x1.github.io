---
方向: 语音编创 / 分离/TSE
用户场景: 鸡尾酒会提取目标说话人、会议谁何时说了什么、多说话人分离与diarization
时间范围: 2025-07 ~ 2026-06
检索venue: arXiv(eess.AS/cs.SD)、ICASSP、Interspeech、NeurIPS、ICML、ICLR、ACL、EMNLP、ACM MM、TASLP/TSP/SPL/TMM
论文数: 14
来源: 精选-编创-2025H2-2026.md（97 篇精选、Semantic Scholar 引用核实）
---

# 分离/TSE

## 方向概览

分离/TSE 围绕 diarization、TSE、多对象分离三条线。主线：(1)说话人日志——SSL 剪枝压缩、流式 Sortformer 在线到达顺序、EEND-TA 单非自回归 SOTA（DIHARD III 14.49%）、SDBench 综合基准；(2)目标说话人提取——流匹配 FlowTSE 免复杂 pipeline、音视觉两阶段边缘实时、手势+唇线索融合；(3)多对象分离——吸引子动态估计人数；(4)会议空间-谱聚类（TDOA 免多通道训练）；(5)挑战赛（MISP 2025 AVSD 高引 52）；(6)长语音基准 LongSpeech。空间线索与 SSL 表征是两大支柱。

## 论文清单

> 仅索引级信息（精选阶段已核实 arXiv ID 与引用）。**论文深度展开暂缺**——展开方法待用户指定后统一填充。

| # | 论文 Title | arXiv ID | 来源 | 引用 | 年 | 技术点 | 场景 | 选取理由 |
|---|---|---|---|---|---|---|---|---|
| 1 | Fine-tune Before Structured Pruning: Towards Compact and Accurate Self-Supervised Models for Speaker Diarization. | 2505.24111 | Interspeech-2025-A | 17 | 2025 | 先微调再结构化剪枝压缩WavLM用于说话人日志 | 资源受限说话人日志 | 高引(17)；SSL(WavLM)+剪枝压缩路线，diarization 轻量化代表 |
| 2 | Leveraging Self-Supervised Learning Based Speaker Diarization for MISP 2025 AVSD Challenge. | 2409.09408 | Interspeech-2025-A | 52 | None | 用WavLM SSL缓解端到端日志数据稀缺(MISP 2025 AVSD) | 音视频说话人日志 | 最高引(52)；挑战赛基准+音视频 diarization，覆盖 MISP 2025 |
| 3 | LongSpeech: A Scalable Benchmark for Transcription, Translation and Understanding in Long Speech | 2601.13539 | ICASSP-2026-A | 4 | 2026 | 语言模型、分离 | 会议/多人对话说话人分离与目标提取 | 2026 ICASSP 代表作；长语音多人对话分离+TSE 基准，覆盖 2026 前沿 |
| 4 | Streaming Sortformer: Speaker Cache-Based Online Speaker Diarization with Arrival-Time Ordering. | 2507.18446 | Interspeech-2025-A | 8 | 2025 | 流式Sortformer:到达顺序说话人缓存在线日志 | 流式在线说话人日志 | 流式在线 diarization 路线代表；Sortformer 系列前沿，引用 8 |
| 5 | FlowTSE: Target Speaker Extraction with Flow Matching. | 2505.14465 | Interspeech-2025-A | 7 | 2025 | 流匹配目标说话人提取(免复杂pipeline/预训练组件) | 目标说话人提取 | TSE 路线代表；流匹配新范式，免复杂 pipeline，引用 7 |
| 6 | SDBench: A Comprehensive Benchmark Suite for Speaker Diarization. | 2507.16136 | Interspeech-2025-A | 3 | 2025 | SDBench:开源说话人日志综合基准(统一划分/指标) | 说话人日志基准 | diarization 基准套件代表；统一划分/指标，评估侧必备 |
| 7 | Pushing the Limits of End-to-End Diarization. | 2509.14737 | Interspeech-2025-A | 3 | 2025 | EEND-TA单一非自回归模型在多数据集达SOTA DER(含DIHARD III 14.49%) | 端到端说话人日志 | 端到端 diarization SOTA 代表；DIHARD III 14.49% DER，硬基准强结果 |
| 8 | Spatio-Spectral Diarization of Meetings by Combining TDOA-based Segmentation and Speaker Embedding-based Clustering. | 2506.16228 | Interspeech-2025-A | 3 | 2025 | TDOA分段+嵌入聚类的空间-谱会议日志(免多通道训练/麦克布置先验) | 会议说话人日志 | 会议/重叠语音路线代表；TDOA 空间-谱聚类，免多通道训练，区别于纯神经方法 |
| 9 | Attractor-Based Speech Separation of Multiple Utterances by Unknown Number of Speakers. | 2505.16607 | Interspeech-2025-A | 1 | 2025 | 单通道吸引子分离:同时分离+动态估计人数+活动检测(多人多句) | 单通道未知人数分离 | 多说话人分离路线代表；吸引子范式，同时分离+估人数+VAD，单通道多句 |
| 10 | Two-Stage Audio-Visual Target Speaker Extraction System for Real-Time Processing on Edge Devices | 2505.22229 | ICASSP-2026-A | 0 | 2025 | 两阶段音视觉目标说话人提取, 边缘实时 | 目标说话人提取 | TSE 第二篇(音视觉+边缘实时)；与 FlowTSE 路线互补，覆盖边缘部署场景 |
| 11 | Beyond Lips: Integrating Gesture and Lip Cues for Robust Audio-visual Speaker Extraction | 2601.19130 | ICASSP-2026-B | 0 | 2026 | 整合协同手势 + 唇部线索做音视觉说话人提取 | 多模态说话人提取、视听融合 | 唯一 2026 候选 + ICASSP-2026 顶会；引入手势这一新颖模态，路线独特，满足"2026 代表作"要求 |
| 12 | Qwen3.5-Omni Technical Report | 2604.15804 | arXiv-eessAS-2026H1 | 45 | 2026 | 百亿参数全模态大模型 | 全模态理解/推理/交互 | 补选：分离/TSE次优(引用45) |
| 13 | SpeakerLM: End-to-End Versatile Speaker Diarization and Recognition with Multimodal Large Language Models | 2508.06372 | arXiv-csSD-2025H2 | 22 | 2025 | 语言模型/自回归 | 说话人分离、语音多模态 | 补选：分离/TSE次优(引用22) 〔实录AAAI 2026〕 |
| 14 | Advances in Speech Separation: Techniques, Challenges, and Future Trends | 2508.10830 | arXiv-eessAS-2025H2 | 10 | 2025 | Transformer、自监督 | separation、source separ | 补选：分离/TSE次优(引用10) |

## 论文深度展开（方法待定）

> 本节将按用户后续指定的展开方法（如逐篇深读 / 按技术路线对比 / 按场景映射等）统一填充，当前留空。
