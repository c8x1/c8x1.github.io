---
方向: 语音编创 / 情感/韵律
用户场景: 给合成语音带上喜怒哀乐、控制重音语调与韵律、情感识别与可控情感合成
时间范围: 2025-07 ~ 2026-06
检索venue: arXiv(eess.AS/cs.SD)、ICASSP、Interspeech、NeurIPS、ICML、ICLR、ACL、EMNLP、ACM MM、TASLP/TSP/SPL/TMM
论文数: 18
来源: 精选-编创-2025H2-2026.md（97 篇精选、Semantic Scholar 引用核实）
---

# 情感/韵律

## 方向概览

情感/韵律方向识别侧仍占大头，可控合成是编创增长点。主线：(1)情感识别——跨模态注意力对齐、token 级歧义建模、双重歧义（标注者+模态）显式处理、低资源自监督；(2)情感可控合成——扩散 TTS+偏好引导 RL 对齐、激活转向（EmoShift 轻量改激活控情感免固定嵌入）；(3)韵律建模——SSL 表征解耦韵律与词汇、随机韵律建模（Normalizing Flows/CFM）；(4)共情对话验证时机；(5)基准/数据集（MULTI-Bench 多轮情商、CAMEO 多语言情感语料）。编创价值集中在可控合成与韵律迁移。

## 论文清单

> 仅索引级信息（精选阶段已核实 arXiv ID 与引用）。**论文深度展开暂缺**——展开方法待用户指定后统一填充。

| # | 论文 Title | arXiv ID | 来源 | 引用 | 年 | 技术点 | 场景 | 选取理由 |
|---|---|---|---|---|---|---|---|---|
| 1 | Frozen Large Language Models Can Perceive Paralinguistic Aspects of Speech | 2410.01162 | Interspeech-2025-B | 21 | None | LLM 零微调感知副语言特征 | 语音情感识别 | 高引(21)代表作, 唯一从 LLM 角度审视副语言/情感能力, 思路独特必留 |
| 2 | MULTI-Bench: A Multi-Turn Interactive Benchmark for Assessing Emotional Intelligence of Spoken Dialogue Models | 2511.00850 | ICASSP-2026-B | 7 | 2025 | 多轮交互情感智力基准, 层级评测 | 对话系统评测 | 情感基准类唯一多轮交互评测, 2026 代表, 填补 spoken dialogue 情商评估空白 |
| 3 | Improving Speech Emotion Recognition Through Cross Modal Attention Alignment and Balanced Stacking Model | 2505.20007 | Interspeech-2025-B | 6 | 2025 | 跨模态注意力对齐+均衡化堆叠 | 语音情感识别 | Interspeech 2025 自然条件 SER 挑战赛系统, 跨模态对齐思路代表 |
| 4 | Token-Level Logits Matter: Speech Foundation Models for Ambiguous Emotion Recognition | 2505.18484 | Interspeech-2025-B | 6 | 2025 | token 级 logits 细粒度歧义建模 | 语音情感识别 | 唯一从 foundation model token 粒度剖析歧义情感, 高引且技术点不可替代 |
| 5 | EmotionRankCLAP: Bridging Natural Language Speaking Styles and Ordinal Speech Emotion via Rank-N-Contrast | 2505.23732 | Interspeech-2025-B | 4 | 2025 | 有序对比学习+自然语言风格桥接 | 语音情感识别 | 联合维度情感与语言 prompt, 序数/rank 思路区别于普通分类 SER |
| 6 | Medusa: A Multimodal Deep Fusion Multi-Stage Training Framework for SER in Naturalistic Conditions | 2506.09556 | Interspeech-2025-B | 4 | 2025 | 多模态深度融合四阶段, 处理类不均衡/歧义 | 语音情感识别 | 挑战赛系统代表作, 多阶段融合+类不均衡治理代表工程路线 |
| 7 | Explainable Speech Emotion Recognition Through Attentive Pooling: Temporal Localization Insights | 2506.15754 | Interspeech-2025-B | 4 | 2025 | 注意力池化+时序定位可解释 SER | 语音情感识别 | 覆盖"可解释性"子路线, pooling 方法学研究而非又一挑战赛堆叠 |
| 8 | Learning More with Less: Self-Supervised Approaches for Low-Resource SER | 2506.02059 | Interspeech-2025-B | 5 | 2025 | 自监督低资源 SER | 语音情感识别 | 低资源/自监督路线唯一代表, 与挑战赛监督系统形成互补 |
| 9 | Scaling Ambiguity: Augmenting Human Annotation in SER with Audio-Language Models | 2601.14620 | ICASSP-2026-B | 2 | 2026 | 音频语言模型缓解稀疏标注推断不可靠 | 标注增强 SER | 2026 最高分(11.95), 数据标注增强视角独特, 避免重复挑战赛系统 |
| 10 | AmbER²: Dual Ambiguity-Aware Emotion Recognition Applied to Speech and Text | 2601.18010 | ICASSP-2026-B | 1 | 2026 | 双重歧义(标注者+模态)建模, 显式处理模态冲突 | 多模态情感识别 | 2026 代表, 模态冲突显式建模区别于普通多模态融合 |
| 11 | SmoothCLAP: Soft-Target Enhanced Contrastive Language–Audio Pretraining for Affective Computing | 2601.12591 | ICASSP-2026-B | 1 | 2026 | 软目标对比学习放宽严格配准 | 情感计算 | 2026 CLAP 类情感预训练唯一代表, 软目标思路区别于硬对比 |
| 12 | Emotion-Aligned Generation in Diffusion Text to Speech Models via Preference-Guided Optimization | 2509.25416 | ICASSP-2026-A | 3 | 2025 | 扩散 TTS + 偏好引导强化学习, 情感对齐 | 增强/情感合成 | 唯一 tier-A 顶会论文, 可控情感合成+扩散+RL 三个热点融合, 必留 |
| 13 | Paralinguistic Emotion-Aware Validation Timing Detection in Japanese Empathetic Spoken Dialogue | 2603.09307 | ICASSP-2026-B | 2 | 2026 | 自监督 HuBERT 情感, 共情对话验证时机 | 情感语音/韵律控制 | 2026 高分(11.95), 副语言+共情对话轮次检测, 日语表现力对话代表作 |
| 14 | Prosodic Structure Beyond Lexical Content: A Study of Self-Supervised Learning | 2506.02584 | Interspeech-2025-B | 4 | 2025 | SSL 表征解耦韵律结构与词汇 | 韵律建模与控制 | 韵律建模 SSL 解耦路线代表作, 高引, 区别于工程化韵律预测 |
| 15 | Investigating Stochastic Methods for Prosody Modeling in Speech Synthesis | 2507.00227 | Interspeech-2025-B | 1 | 2025 | Normalizing Flows/CFM/Rectified Flows 随机韵律建模 | 韵律建模与控制 | 唯一系统比较多种生成式随机韵律建模方法, 方法论价值高 |
| 16 | CAMEO: Collection of Multilingual Emotional Speech Corpora | 2505.11051 | ICASSP-2026-B | 4 | 2025 | 多语言情感语音数据集合集, 标准化基准 | SER 数据/基准 | 数据集/基准类唯一代表, 多语言标准化填补 SER 语料缺口 |
| 17 | EmoShift: Lightweight Activation Steering for Enhanced Emotion-Aware Speech Synthesis | 2601.22873 | ICASSP-2026-B | 3 | 2026 | 轻量激活转向控制情感, 不依赖固定情感嵌入 | 情感可控 TTS | 2026 新作，激活转向(activation steering)控制路线，无需情感嵌入独特 |
| 18 | Ovi: Twin Backbone Cross-Modal Fusion for Audio-Video Generation | 2510.01284 | arXiv-eessAS-2025H2 | 45 | 2025 | 待核 | emotion | 补选：情感/韵律次优(引用45) |

## 论文深度展开（方法待定）

> 本节将按用户后续指定的展开方法（如逐篇深读 / 按技术路线对比 / 按场景映射等）统一填充，当前留空。
