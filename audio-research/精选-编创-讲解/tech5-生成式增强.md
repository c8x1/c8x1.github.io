---
方向: 语音编创 / 生成式增强
用户场景: 把嘈杂/窄带/丢帧录音清理恢复成清晰人声、生成式去噪/去混响/BWE/修复
时间范围: 2025-07 ~ 2026-06
检索venue: arXiv(eess.AS/cs.SD)、ICASSP、Interspeech、NeurIPS、ICML、ICLR、ACL、EMNLP、ACM MM、TASLP/TSP/SPL/TMM
论文数: 22
来源: 精选-编创-2025H2-2026.md（97 篇精选、Semantic Scholar 引用核实）
---

# 生成式增强

## 方向概览

生成式增强是本周期论文最多、RL 趋势最显的方向。主线：(1)流匹配 SE——FlowSE 高效高质量、MeanFlowSE 单步、FlowSE-GRPO 把在线 RL 引入 SE 训练；(2)扩散 SE——在线滑窗亚秒延迟、离散+连续联合；(3)GAN SE 全带实时随机再生；(4)判别+生成混合与扩散先验精修；(5)LM/codec SE（UniSE 自回归统一增强/分离/修复、离散 token 域 SE）；(6)Mamba 状态空间 SE；(7)BWE 多子方向；(8)实时/低延迟与测试时自适应；(9)挑战赛基准（URGENT 2025/2026）。RL 进入 SE 是 2026 最强方法论趋势。

## 论文清单

> 仅索引级信息（精选阶段已核实 arXiv ID 与引用）。**论文深度展开暂缺**——展开方法待用户指定后统一填充。

| # | 论文 Title | arXiv ID | 来源 | 引用 | 年 | 技术点 | 场景 | 选取理由 |
|---|---|---|---|---|---|---|---|---|
| 1 | Interspeech 2025 URGENT Speech Enhancement Challenge. | 2505.23212 | Interspeech-2025-A | 29 | 2025 | URGENT 2025挑战（第二届）：更广失真/数据/指标 | 通用SE挑战赛overview | 最高引，挑战赛基准必留；通用 SE 失真/数据/指标统一基准 |
| 2 | ICASSP 2026 URGENT Speech Enhancement Challenge | 2601.13531 | ICASSP-2026-A | 6 | 2026 | 通用增强挑战赛 | 语音增强+质量评估 | 2026 代表，挑战赛基准延续，overview 只留此 1 篇避免重复 |
| 3 | FlowSE: Efficient and High-Quality Speech Enhancement via Flow Matching. | 2505.19476 | Interspeech-2025-A | 21 | 2025 | 流匹配高效高质量SE（免LM量化损失/扩散复杂训练） | 生成式SE | 高引里程碑，流匹配 SE 路线代表，必留 |
| 4 | MeanFlowSE: One-Step Generative Speech Enhancement via Conditional Mean Flow | 2509.14858 | ICASSP-2026-A | 3 | 2025 | 条件均值流单步生成式语音增强 | 单通道语音增强 | 单步/少步流匹配 SE 代表，与多步 FlowSE 互补，体现推理效率路线 |
| 5 | FlowSE-GRPO: Training Flow Matching Speech Enhancement via Online Reinforcement Learning | 2601.16483 | ICASSP-2026-A | 4 | 2026 | 流匹配+在线 GRPO | 生成式语音增强 | 2026 代表，将在线强化学习引入流匹配 SE，训练范式新思路 |
| 6 | Diffusion Buffer: Online Diffusion-based Speech Enhancement with Sub-Second Latency. | 2506.02908 | Interspeech-2025-A | 9 | 2025 | 滑窗扩散在线SE（亚秒延迟） | 在线/流式扩散SE | 扩散 SE 在线流式化代表，覆盖实时扩散路线 |
| 7 | DisContSE: Single-Step Diffusion Speech Enhancement Based on Joint Discrete and Continuous Embeddings | 2601.21940 | ICASSP-2026-A | 1 | 2026 | 离散+连续联合扩散 | 单步扩散语音增强 | 2026 代表，单步扩散+离散/连续联合嵌入，扩散路线新变体 |
| 8 | DeepFilterGAN: A Full-band Real-time Speech Enhancement System with GAN-based Stochastic Regeneration. | 2505.23515 | Interspeech-2025-A | 5 | 2025 | 全带实时SE：预测模型+GAN随机再生避免过抑制 | 全带实时SE | GAN 路线 SE 代表，全带实时+随机再生，区别于流匹配/扩散 |
| 9 | Universal Speech Enhancement with Regression and Generative Mamba. | 2505.21198 | Interspeech-2025-A | 11 | 2025 | USEMamba：状态空间SE处理长序列/TF/多失真（回归+生成） | 通用SE | 状态空间(Mamba)路线代表，回归+生成统一，高引 |
| 10 | UniSE: A Unified Framework for Decoder-only Autoregressive LM-based Speech Enhancement | 2510.20441 | ICASSP-2026-A | 6 | 2025 | 语言模型/自回归、神经编解码 | 增强/分离/修复 | LM/自回归路线 SE 代表，统一增强/分离/修复，覆盖 LM-based 生成式 SE |
| 11 | High-Fidelity Speech Enhancement via Discrete Audio Tokens | 2510.02187 | ICASSP-2026-A | 1 | 2025 | 离散音频 token 域做高保真 SE | 语音增强 | 离散 token 域 SE 代表，与 UniSE 的 LM 路线互补（token 域建模） |
| 12 | A Hybrid Discriminative and Generative System for Universal Speech Enhancement | 2601.19113 | ICASSP-2026-A | 0 | 2026 | 判别+生成混合增强 | 通用语音增强 | 2026 代表，判别+生成混合范式，区别于纯生成路线 |
| 13 | ArrayDPS-Refine: Generative Refinement of Discriminative Multi-Channel Speech Enhancement | 2603.24385 | ICASSP-2026-A | 0 | 2026 | 判别输出+扩散先验精修 | 多通道语音增强 | 2026 代表，生成式精修判别输出，多通道+扩散先验融合新思路 |
| 14 | TS-URGENet: A Three-stage Universal Robust and Generalizable Speech Enhancement Network. | 2505.18533 | Interspeech-2025-A | 6 | 2025 | 三阶段（填充/分离/修复）通用鲁棒可泛化SE | 通用SE（多失真） | 语音修复/inpainting 方向代表，三阶段含显式修复步 |
| 15 | DARAS: Dynamic Audio-Room Acoustic Synthesis for Blind Room Impulse Response Estimation | 2507.08135 | TASLP-2025H2-2026 | 2 | 2025 | Mamba、自监督 | enhancement | 唯一明确去混响方向（盲 RIR 估计/房间声学），覆盖去混响路线 |
| 16 | NLDSI-BWE: Non Linear Dynamical Systems-Inspired Multi Resolution Discriminators for Speech Bandwidth Extension | 2510.01109 | ICASSP-2026-A | 1 | 2025 | 非线性动力系统启发的多分辨率判别器做 BWE | 带宽扩展（窄带→宽带） | BWE 路线代表（判别器驱动窄带→宽带），区别于生成式 SE |
| 17 | Universr: Unified and Versatile Audio Super-Resolution via Vocoder-Free Flow Matching | 2510.00771 | ICASSP-2026-A | 2 | 2025 | 无声码器流匹配统一音频超分 | 音频超分/带宽扩展 | BWE 第二子方向：无声码器流匹配超分，生成式 BWE 代表 |
| 18 | Single-step Controllable Music Bandwidth Extension With Flow Matching | 2601.14356 | ICASSP-2026-A | 1 | 2026 | Flow匹配、修复 | TTS/歌声/增强/修复/带宽扩展 | 2026 代表，BWE 第三子方向：单步可控流匹配，音乐/语音 BWE |
| 19 | Fast-ULCNet: A Fast and Ultra Low Complexity Network for Single-Channel Speech Enhancement | 2601.14925 | ICASSP-2026-A | 0 | 2026 | 超低复杂度快速单通道 SE 网络 | 边缘/低算力增强 | 2026 代表，实时/低延迟 SE 路线（边缘低算力），覆盖实时部署方向 |
| 20 | Test-Time Adaptation for Speech Enhancement via Mask Polarization | 2601.14770 | ICASSP-2026-A | 1 | 2026 | 测试时用 mask 极化自适应 SE | 域偏移 SE | 2026 代表，测试时自适应路线，应对域偏移，区别于训练侧方法 |
| 21 | FlowSE: Flow Matching-based Speech Enhancement | 2508.06840 | arXiv-eessAS-2025H2 | 28 | 2025 | 扩散、流匹配、归一化流 | enhancement | 补选：生成式增强次优(引用28) 〔实录ICASSP 2025〕 |
| 22 | Lessons Learned from the URGENT 2024 Speech Enhancement Challenge. | 2506.01611 | Interspeech-2025-A | 10 | 2025 | URGENT 2024挑战深度分析:数据清洗与评测指标 | 通用SE(挑战赛分析) | 补选：生成式增强次优(引用10) |

## 论文深度展开（方法待定）

> 本节将按用户后续指定的展开方法（如逐篇深读 / 按技术路线对比 / 按场景映射等）统一填充，当前留空。
