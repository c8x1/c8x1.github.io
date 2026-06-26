---
方向: 语音编创 / 语音编辑
用户场景: 一键修复口误、插入/删除/替换词句而不改变整体音色韵律、文本/指令驱动的语音编辑
时间范围: 2025-07 ~ 2026-06
检索venue: arXiv(eess.AS/cs.SD)、ICASSP、Interspeech、NeurIPS、ICML、ICLR、ACL、EMNLP、ACM MM、TASLP/TSP/SPL/TMM
论文数: 16
来源: 精选-编创-2025H2-2026.md（97 篇精选、Semantic Scholar 引用核实）
---

# 语音编辑

## 方向概览

2025H2-2026 语音编辑沿四条主线演进，共同逼近硬约束"局部编辑不引发全局漂移"：(1)评测基准系统化——SpeechEditBench 以中英双语 7 原子任务+anchor 解耦评测+content-preservation hard gate 首次把"改对目标"与"没改坏其余"独立度量；(2)RL/偏好对齐进入编辑——自一致性奖励 GRPO（Edit-Content-Preserve）显式偏好局部外科编辑而非全局重写；(3)training-free 操控——反事实激活编辑改模型内部表示修口误/韵律、latent inversion 不重训母体；(4)流匹配编辑与情感一致性后校正（RFM-Editing 整流流匹配、EmoCorrector 编辑后情绪修复）。复合编辑 joint success 仍近 0，是最大开放空间。

## 论文清单

> 仅索引级信息（精选阶段已核实 arXiv ID 与引用）。**论文深度展开暂缺**——展开方法待用户指定后统一填充。

| # | 论文 Title | arXiv ID | 来源 | 引用 | 年 | 技术点 | 场景 | 选取理由 |
|---|---|---|---|---|---|---|---|---|
| 1 | RFM-Editing: Rectified Flow Matching for Text-Guided Audio Editing | 2509.14003 | ICASSP-2026-A | 5 | 2025 | 整流流匹配(rectified flow)做文本引导音频编辑 | 文本引导音频编辑 | 分最高(11.56)，顶会，流匹配编辑路线代表作 |
| 2 | Counterfactual Activation Editing for Post-hoc Prosody and Mispronunciation Correction in TTS Models | 2506.00832 | Interspeech-2025-A | 3 | 2025 | 反事实激活编辑做TTS事后韵律调控/发音纠错 | TTS韵律/发音事后编辑 | 韵律/口误修正编辑路线唯一代表，顶会 |
| 3 | Towards Emotionally Consistent Text-Based Speech Editing: Introducing EmoCorrector and The ECD-TSE Dataset | 2505.20341 | Interspeech-2025-A | 1 | 2025 | EmoCorrector:文本编辑后情感一致性后校正+ECD-TSE数据集 | 文本编辑语音(TSE)情感一致 | 文本语音编辑(TSE)情感一致性+数据集，顶会 |
| 4 | ISSE: An Instruction-Guided Speech Style Editing Dataset and Benchmark | 2509.24570 | ICASSP-2026-A | 0 | 2025 | 指令引导语音风格编辑数据集+基准 | 指令式语音编辑 | 指令式编辑路线+基准/数据集，顶会 |
| 5 | SpeechEditBench: A Bilingual Multi-Attribute Benchmark for Instruction-Guided Speech Editing | 2606.01804 | arXiv-eessAS-2026H1 | 0 | 2026 | 指令语音编辑双语基准 | 指令语音编辑 | 基准类必留，2026 双语多属性基准 |
| 6 | Edit Content, Preserve Acoustics: Imperceptible Text-Based Speech Editing via Self-Consistency Rewards | 2602.00560 | arXiv-eessAS-2026H1 | 1 | 2026 | 自一致性奖励RL文本编辑 | 文本语音编辑 | 2026 代表作，文本编辑+RL 自一致性奖励路线独特 〔实录Interspeech 2026〕 |
| 7 | Step-Audio-EditX Technical Report | 2511.03601 | arXiv-eessAS-2025H2 | 7 | 2025 | LLM | tts/text-to-speech/emotion | 基于 TTS 的编辑路线必留，高引(7) |
| 8 | MMEDIT: A Unified Framework for Multi-Type Audio Editing via Audio Language Model | 2512.20339 | arXiv-csSD-2025H2 | 5 | 2025 | 扩散、语言模型/自回归 | 语音编辑 | 音频语言模型统一多类型编辑框架，高引(5) 〔投稿中〕 |
| 9 | Speak, Edit, Repeat: High-Fidelity Voice Editing and Zero-Shot TTS with Cross-Attentive Mamba | 2510.04738 | arXiv-eessAS-2025H2 | 2 | 2025 | 扩散、Mamba、自回归 | tts/speech | 编辑+Zero-Shot TTS 统一，Mamba 技术点独特 |
| 10 | Audio MultiChallenge: A Multi-Turn Evaluation of Spoken Dialogue Systems on Natural Human Interaction | 2512.14865 | arXiv-csSD-2025H2 | 10 | 2025 | 待核 | 语音编辑、对话/agent | 补选：语音编辑次优(引用10) |
| 11 | SALM: Spatial Audio Language Model with Structured Embeddings for Understanding and Editing | 2507.16724 | arXiv-eessAS-2025H2 | 6 | 2025 | LLM、对比学习 | 待核 | 补选：语音编辑次优(引用6) |
| 12 | InstructAudio: Unified speech and music generation with natural language instruction | 2511.18487 | arXiv-eessAS-2025H2 | 6 | 2025 | 扩散、Transformer | tts、text-to-speech、speech | 补选：语音编辑次优(引用6) |
| 13 | LEMAS: Large A 150K-Hour Large-scale Extensible Multilingual Audio Suite with Generative Speech Models | 2601.04233 | arXiv-eessAS-2026H1 | 4 | 2026 | 150k多语生成数据+TTS | 多语生成数据+TTS基座 | 补选：语音编辑次优(引用4) |
| 14 | Towards Automatic Evaluation and High-Quality Pseudo-Parallel Dataset Construction for Audio Editing: A Human-in-the-Loop Method | 2508.11966 | arXiv-csSD-2025H2 | 3 | 2025 | 语言模型/自回归、自监督、强化学习 | 语音编辑、边缘/实时 | 补选：语音编辑次优(引用3) |
| 15 | Recomposer: Event-roll-guided generative audio editing | 2509.05256 | arXiv-csSD-2025H2 | 3 | 2025 | Transformer/注意力、图网络 | 语音编辑、ASR/识别 | 补选：语音编辑次优(引用3) |
| 16 | CodecSep: Prompt-Driven Universal Sound Separation on Neural Audio Codec Latents | 2509.11717 | arXiv-csSD-2025H2 | 1 | 2025 | Transformer/注意力、神经编解码 | 语音编辑、增强/分离/修复 | 补选：语音编辑次优(引用1) 〔实录TMLR〕 |

## 论文深度展开（方法待定）

> 本节将按用户后续指定的展开方法（如逐篇深读 / 按技术路线对比 / 按场景映射等）统一填充，当前留空。
