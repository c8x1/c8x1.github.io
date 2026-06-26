---
方向: 语音编创 / VC/声音克隆
用户场景: 用少量样本克隆音色、零样本语音转换、跨语保音色配音、情感/可控 VC
时间范围: 2025-07 ~ 2026-06
检索venue: arXiv(eess.AS/cs.SD)、ICASSP、Interspeech、NeurIPS、ICML、ICLR、ACL、EMNLP、ACM MM、TASLP/TSP/SPL/TMM
论文数: 18
来源: 精选-编创-2025H2-2026.md（97 篇精选、Semantic Scholar 引用核实）
---

# VC/声音克隆

## 方向概览

zero-shot VC 与声音克隆本周期从专用模型走向 LLM/codec-LM 统一范式。主线：(1)零样本 VC 采样效率——mean flow 单步、解耦离散 token+上下文学习、分解最优传输免训练；(2)流式/实时 VC；(3)情感 VC（CLAP 情感预训练+流匹配双控）；(4)克隆大模型化（VoxCPM/MiMo-Audio 用 LLM 做少样本统一生成，高引）；(5)VC 表征几何（SSL 旋转即可转换）与 VC 隐私维度（Private kNN-VC 揭示识人线索）。硬约束仍是"音色相似度 vs 内容保真 vs 韵律自然度"三角。

## 论文清单

> 仅索引级信息（精选阶段已核实 arXiv ID 与引用）。**论文深度展开暂缺**——展开方法待用户指定后统一填充。

| # | 论文 Title | arXiv ID | 来源 | 引用 | 年 | 技术点 | 场景 | 选取理由 |
|---|---|---|---|---|---|---|---|---|
| 1 | Private kNN-VC: Interpretable Anonymization of Converted Speech. | 2505.17584 | Interspeech-2025-A | 8 | 2025 | kNN-VC 的隐私可解释匿名化(揭示识人线索) | 语音匿名化(可解释) | 隐私/反匿名化角度里程碑，score 最高(11.91)，补充 VC 的安全维度 |
| 2 | ClapFM-EVC: High-Fidelity and Flexible Emotional Voice Conversion with Dual Control from Natural Language and Speech | 2505.13805 | Interspeech-2025-A | 7 | 2025 | CLAP 情感预训练+流匹配高保真 EVC,自然语言/语音双控 | 自然语言/参考语音双控情感 VC | 情感 VC 代表作，自然语言双控路线 |
| 3 | MeanVC: Lightweight and Streaming Zero-Shot Voice Conversion via Mean Flows | 2510.08392 | ICASSP-2026-A | 6 | 2025 | 均值流(mean flow)单步采样,流式零样本 VC | 实时零样本声音克隆 | 实时/流式 zero-shot VC，2026 顶会代表作 |
| 4 | Discl-VC: Disentangled Discrete Tokens and In-Context Learning for Controllable Zero-Shot Voice Conversion | 2505.24291 | Interspeech-2025-A | 6 | 2025 | 解耦离散 token+上下文学习的可控零样本 VC | 零样本可控 VC(源/目标风格可控) | zero-shot + 解耦 + 可控路线代表 |
| 5 | PFluxTTS: Hybrid Flow-Matching TTS with Robust Cross-Lingual Voice Cloning and Inference-Time Model Fusion | 2602.04160 | ICASSP-2026-A | 1 | 2026 | Flow 匹配、声码器、克隆 | 零样本声音转换/克隆 | 跨语克隆 + 推理时模型融合，2026 顶会 |
| 6 | Training-Free Voice Conversion with Factorized Optimal Transport | 2506.09709 | Interspeech-2025-A | 4 | 2025 | kNN-VC 改用分解最优传输(MKL-VC),免训练 | 跨语言 any-to-any VC(5s 参考) | 免训练跨语 any-to-any VC，方法论创新 |
| 7 | LinearVC: Linear Transformations of Self-Supervised Features Through the Lens of Voice Conversion | 2506.01510 | Interspeech-2025-A | 4 | 2025 | 对 SSL 特征做线性变换(旋转即可)做 VC,探究表征几何 | VC 方法论/表征探针 | SSL 表征几何视角的 VC 理论分析 |
| 8 | StarVC: A Unified Auto-Regressive Framework for Joint Text and Speech Generation in Voice Conversion | 2506.02414 | Interspeech-2025-A | 2 | 2025 | 统一自回归框架联合文本+语音生成(显式利用语言内容) | VC(显式语义内容利用) | 自回归统一框架，显式语义内容路线 |
| 9 | VoxMorph: Scalable Zero-shot Voice Identity Morphing via Disentangled Embeddings | 2601.20883 | ICASSP-2026-A | 0 | 2026 | Flow 匹配、语言模型、自回归 | 零样本声音转换/克隆 | 2026 顶会 zero-shot 身份形变，解耦嵌入路线 |
| 10 | Towards Better Disentanglement in Non-Autoregressive Zero-Shot Expressive Voice Conversion | 2506.04013 | Interspeech-2025-A | 2 | 2025 | 非自回归 CVAE+源音色泄漏抑制/语言学-声学解耦 | 零样本表现力 VC | 非自回归解耦+源泄漏抑制路线 |
| 11 | Fairness in Dysarthric Speech Synthesis: Understanding Intrinsic Bias in Dysarthric Speech Cloning using F5-TTS | 2508.05102 | Interspeech-2025-A | 3 | 2025 | 研究 F5-TTS 克隆构音障碍语音的固有偏置(公平性) | 构音障碍语音克隆/数据增强 | 少样本克隆 + 公平性/无障碍角度，差异化路线 |
| 12 | VoxCPM: Tokenizer-Free TTS for Context-Aware Speech Generation and True-to-Life Voice Cloning | 2509.24650 | arXiv-csSD-2025H2 | 28 | 2025 | 扩散、语言模型/自回归、神经编解码 | 语音克隆/VC、情感/韵律 | 高引(28)声音克隆代表作，tokenizer-free 路线 |
| 13 | MiMo-Audio: Audio Language Models are Few-Shot Learners | 2512.23808 | arXiv-eessAS-2025H2 | 88 | 2025 | LLM | tts、voice conversion、speech | 最高引(88)，LLM 少样本统一音频生成，必留里程碑 |
| 14 | MM-Sonate: Multimodal Controllable Audio-Video Generation with Zero-Shot Voice Cloning | 2601.01568 | arXiv-eessAS-2026H1 | 4 | 2026 | 多模态可控音视频生成+ZS-VC | 音视频联合生成+克隆 | 2026 多模态音视频 + zero-shot 克隆代表 |
| 15 | Qwen3-TTS Technical Report | 2601.15621 | arXiv-eessAS-2026H1 | 59 | 2026 | 多语可控流式TTS | 多语可控流式TTS | 补选：VC/声音克隆次优(引用59) |
| 16 | Ming-UniAudio: Speech LLM for Joint Understanding, Generation and Editing with Unified Representation | 2511.05516 | arXiv-eessAS-2025H2 | 16 | 2025 | LLM | tts、cloning、speech editin | 补选：VC/声音克隆次优(引用16) |
| 17 | DiEmo-TTS: Disentangled Emotion Representations via Self-Supervised Distillation for Cross-Speaker Emotion Transfer in Text-to-Speech | 2505.19687 | Interspeech-2025-B | 7 | 2025 | To address this, we propose DiEmo-TTS, a self-supervised distillation method to minimize emotional information loss and preserve speaker identity. | 情感化语音合成/语音转换 (有声书/虚拟人/辅助沟通) | 补选：VC/声音克隆次优(引用7) |
| 18 | MGM-Omni: Scaling Omni LLMs to Personalized Long-Horizon Speech | 2509.25131 | arXiv-csSD-2025H2 | 7 | 2025 | 语言模型/自回归、强化学习、实时/流式 | 语音克隆/VC、语音多模态 | 补选：VC/声音克隆次优(引用7) |

## 论文深度展开（方法待定）

> 本节将按用户后续指定的展开方法（如逐篇深读 / 按技术路线对比 / 按场景映射等）统一填充，当前留空。
