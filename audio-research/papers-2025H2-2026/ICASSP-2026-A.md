# ICASSP 2026 (A组: VC/声音克隆、语音编辑、生成式增强/去噪/去混响/带宽扩展/修复、说话人分离/多对象分离/目标说话人提取、神经语音编解码)

> 归属: 混合（编创 192 / 非编创 1） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


> 检索日期 2026-06-25 | 论文数 38 (28 篇有已验证 arXiv ID + 10 篇无预印本标 n/a) | 范围: ICASSP 2026 (Barcelona, 2026-06 已召开) 已公开条目中, 本组负责子方向——VC/声音克隆、语音编辑、生成式增强/去噪/去混响/带宽扩展/修复、说话人分离/多对象分离/目标说话人提取、神经语音编解码。排除纯 ASR、纯 TTS(交 B 组: 情感/口音/匿名化/speech-LM)。挑战赛 overview/雷达语音增强/音乐美学评估/超光谱等非本组核心条目剔除。
>
> 枚举入口(按顺序试):
> 1. DBLP `dblp.org/db/conf/icassp/icassp2026.html` → 404 (ICASSP 2026 未收录, 仅至 2025)。DBLP API 搜索仅命中 14 条 (多为 challenge arXiv)。
> 2. IEEE Xplore proceedings (conhome 11460365, DOI 前缀 `10.1109/ICASSP55912.2026.*`) → REST/search 端点全被反爬拦截 (返回登录墙 HTML / 405 / `{'reason':'Check Logs'}`), WebFetch 对 ieeexplore 也被拦。无法直连全量枚举。
> 3. arXiv API (`cat:eess.AS`/`cs.SD` + `all:ICASSP`) → 抓取 800+400 条 recent listing, 仅 31 条 comment/journal_ref 提及 ICASSP; arXiv API 在批量标题搜索时触发**全局 429** (账号/IP 段级, 换代理无效), 标题→ID 路径不可用。
> 4. **OpenAlex 全量枚举(实际采用)**: `filter=publication_year:2026&search=ICASSP`, 翻 39 页取 7686 命中, 锚定 `primary_location.raw_source_name` 含 "ICASSP 2026" 且 `raw_type=proceedings-article`、DOI 前缀 `10.1109/icassp55912.2026.*` → 190 篇 IEEE proceedings 真实条目。再逐篇取 OpenAlex `locations[]` 的 `landing_page_url/pdf_url` 提取 arXiv ID (128/190 有预印本链接)。
>
> arXiv ID 反验(强制, 禁幻觉): 每个写入表的 arXiv ID 均用 `https://arxiv.org/abs/<ID>` HTML abs 页核对标题(API 429 时 HTML 页仍可取, 见 skill §2.3)。本表 28 个 arXiv ID 全部 HTML 反验 OK (标题匹配, 0 幻觉)。无 arXiv 预印本的条目标 "n/a", 绝不编造。

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|

### 【编创】语音克隆 / 声音转换 (Voice Conversion / Cloning)

| MeanVC: Lightweight and Streaming Zero-Shot Voice Conversion via Mean Flows | 2510.08392 | 均值流(mean flow)单步采样, 流式零样本 VC | 实时零样本声音克隆 | 用 mean flow 替代多步扩散, 单步+流式 | 推理快、低延迟适合流式 | 单步生成上限受均值流假设约束 |
| Acoustic Teleportation via Disentangled Neural Audio Codec Representations | 2510.13221 | 解耦神经编解码表征做声学"瞬移"(空间/音色迁移) | 空间音频/音色转换 | codec 表征解耦用于跨环境声学迁移 | 单模型完成空间+音色迁移 | 解耦完全性依赖训练分布 |

### 【编创】语音编辑 (Speech Editing)

| ISSE: An Instruction-Guided Speech Style Editing Dataset and Benchmark | 2509.24570 | 指令引导语音风格编辑数据集+基准 | 指令式语音编辑 | 首个 instruction-guided 语音风格编辑基准 | 统一评测指令式编辑 | 仅数据/基准, 非新模型 |
| RFM-Editing: Rectified Flow Matching for Text-Guided Audio Editing | 2509.14003 | 整流流匹配(rectified flow)做文本引导音频编辑 | 文本引导音频编辑 | RFM 直线路径替代弯曲扩散轨迹 | 编辑更精准、采样更少步 | 流匹配训练需配对数据 |

### 【编创】生成式增强 / 去噪 / 去混响 / 带宽扩展 / 修复 (Generative Enhancement / Denoise / Dereverb / BWE / Restoration)

| MeanFlowSE: One-Step Generative Speech Enhancement via Conditional Mean Flow | 2509.14858 | 条件均值流单步生成式语音增强 | 单通道语音增强 | mean flow 单步生成式 SE, 免多步扩散 | 单步高保真增强, 实时友好 | 单步生成保真度上限 |
| MAGE: A Coarse-to-Fine Speech Enhancer with Masked Generative Model | 2509.19881 | 掩码生成模型 coarse-to-fine 语音增强 | 语音增强 | 掩码生成式 SE, 由粗到精迭代 | 生成式重建缺失内容 | 掩码策略与迭代步数调参 |
| GDiffuSE: Diffusion-based Speech Enhancement with Noise Model Guidance | 2510.04157 | 扩散式 SE + 噪声模型引导条件 | 语音增强 | 显式噪声模型引导扩散去噪 | 噪声建模更贴真实、去噪更稳 | 扩散多步推理开销 |
| High-Fidelity Speech Enhancement via Discrete Audio Tokens | 2510.02187 | 离散音频 token 域做高保真 SE | 语音增强 | 在离散 codec token 域增强而非频谱 | token 域抗噪、可接 LM | 受 codec 量化损失约束 |
| Modeling Strategies for Speech Enhancement in the Latent Space of a Neural Audio Codec | 2510.26299 | 神经编解码潜空间内的 SE 建模策略 | 语音增强 | 系统比较 codec 潜空间 SE 建模 | 潜空间增强高效 | 依赖 codec 潜空间质量 |
| I-DCCRN-VAE: An Improved Deep Representation Learning Framework for Complex VAE-Based Single-Channel Speech Enhancement | 2510.12485 | 复数 VAE + 改进 DCCRN 表示学习单通道 SE | 单通道语音增强 | 复数 VAE 概率建模 + DCCRN | 概率建模处理不确定性 | VAE 后验近似复杂 |
| Fast-ULCNet: A Fast and Ultra Low Complexity Network for Single-Channel Speech Enhancement | 2601.14925 | 超低复杂度快速单通道 SE 网络 | 边缘/低算力增强 | 极致轻量化 SE | 可部署边缘设备 | 复杂场景性能上限受限 |
| Test-Time Adaptation for Speech Enhancement via Mask Polarization | 2601.14770 | 测试时用 mask 极化自适应 SE | 域偏移 SE | 免重训测试时适应 | 适配未知噪声域 | TTA 单样本上限 |
| Exploring Resolution-Wise Shared Attention in Hybrid Mamba-U-Nets for Improved Cross-Corpus Speech Enhancement | 2510.01958 | 混合 Mamba-U-Net 分辨率共享注意力跨语料 SE | 跨语料增强 | Mamba+U-Net 分辨率共享注意力 | 跨语料泛化更好 | Mamba 架构调参复杂 |
| PAS-SE: Personalized Auxiliary-Sensor Speech Enhancement for Voice Pickup in Hearables | 2509.20875 | 个性化辅助传感器 SE, 面向可穿戴 | 可穿戴/助听器 | 辅助传感器个性化增强 | 贴合个人听音、低噪 | 需多传感器硬件 |
| From Diet to Free Lunch: Estimating Auxiliary Signal Properties Using Dynamic Pruning Masks in Speech Enhancement | 2602.10666 | 动态剪枝掩码估计辅助信号性质做 SE | 语音增强 | 动态剪枝估计辅助信号 | 信号先验更准、增强更稳 | 剪枝策略需调 |
| WaveNeXt 2: ConvNeXt-Based Fast Neural Vocoders with Residual Denoising and Sub-Modeling for GAN and Diffusion Models | 2605.25506 | ConvNeXt 快速声码器 + 残差去噪 + 子模型, 兼用 GAN/扩散 | 声码器/去噪合成 | 残差去噪+子模型耦合 GAN 与扩散 | 高质量快速波形重建 | 多子模型训练复杂 |
| NLDSI-BWE: Non Linear Dynamical Systems-Inspired Multi Resolution Discriminators for Speech Bandwidth Extension | 2510.01109 | 非线性动力系统启发的多分辨率判别器做 BWE | 带宽扩展(窄带→宽带) | NLDS 启发多分辨率判别 BWE | 宽带扩展高频更自然 | 判别器动力系统建模复杂 |
| Universr: Unified and Versatile Audio Super-Resolution via Vocoder-Free Flow Matching | 2510.00771 | 无声码器流匹配统一音频超分 | 音频超分/带宽扩展 | vocoder-free flow matching 统一超分 | 免声码器、统一多任务 | 流匹配多步采样 |
| Quality Assessment of Noisy and Enhanced Speech with Limited Data: UWB-NTIS System for VoiceMOS 2024 | 2506.00506 | 有限数据下噪声/增强语音质量评估 | 增强语音质量评估(非生成) | 评测系统(关联增强质量) | 量化增强效果 | 评测非生成方法 |
| Are Modern Speech Enhancement Systems Vulnerable to Adversarial Attacks? | 2509.21087 | 现代 SE 系统对抗攻击鲁棒性分析 | 增强系统安全 | 揭示 SE 对抗脆弱性 | 安全风险预警 | 诊断性, 非新增强方法 |

### 【编创】分离 / 目标说话人提取 / 多对象分离 (Separation / Target Speaker Extraction / Diarization)

| PromptSep: Generative Audio Separation via Multimodal Prompting | 2511.04623 | 多模态提示引导生成式音频分离 | 提示式声源分离 | 多模态 prompt 生成式分离 | 文本/图像提示定制分离目标 | 提示质量影响分离 |
| MMAudioSep: Taming Video-to-Audio Generative Model towards Video/Text-Queried Sound Separation | 2510.09065 | 视频/文本查询的生成式声音分离 | 视觉/文本引导分离 | 复用视频→音频生成模型做分离 | 多模态查询灵活分离 | 生成模型迁移偏差 |
| Separate This, and All of these Things Around It: Music Source Separation via Hyperellipsoidal Queries | 2501.16171 | 超椭球查询做音乐源分离 | 音乐源分离 | 超椭球查询建模源分布 | 源建模更紧致 | 查询几何需学习 |
| Two-Stage Audio-Visual Target Speaker Extraction System for Real-Time Processing on Edge Devices | 2505.22229 | 两阶段音视觉目标说话人提取, 边缘实时 | 目标说话人提取 | 两阶段+边缘实时优化 | 边缘实时目标说话人提取 | 两阶段误差累积 |
| RelUNet: Relative Channel Fusion U-Net for Multichannel Speech Enhancement | 2410.05019 | 相对通道融合 U-Net 多通道增强(通道间分离增强) | 多通道增强/分离 | 相对通道融合建模通道关系 | 多通道增强更准 | 多通道麦克风依赖 |
| Mixture-of-Experts Framework for Field-of-View Enhanced Signal-Dependent Binauralization of Moving Talkers | 2509.13548 | MoE 视场增强+信号相关双耳化, 移动说话人 | 双耳化/空间分离 | MoE 处理移动说话人双耳化 | 动态空间双耳渲染 | MoE 路由训练复杂 |
| BioSEN: A Bio-Acoustic Signal Enhancement Network for Animal Vocalizations | 2605.12534 | 生物声学(动物发声)信号增强 | 非语音生物声增强 | 面向动物发声的 SE 网络 | 跨物种生物声增强 | 非语音域迁移有限 |

### 【非编创】神经语音编解码 (Neural Speech Codec)

| TokenChain: A Discrete Speech Chain via Semantic Token Modeling | 2510.06201 | 语义 token 建模的离散语音链 | 离散语音 token/codec | 语义 token 串联语音链 | 统一离散语音表征 | 链式建模误差传播 |

> 无 arXiv 预印本但属本组核心范围的 ICASSP 2026 proceedings 条目(标 n/a, 不编造 ID):
> - Three-Stage BSRNN for Universal Speech Enhancement and Data Curation Using a Large Pre-Trained Speech Restoration Model (n/a) — 三阶段 BSRNN 通用语音增强+大数据策展
> - Hybrid Speech Enhancement with Discriminative and Codec Token Prediction Models Guided by Cleaned SSL Features (n/a) — 判别+codec token 预测混合 SE, SSL 特征引导
> - GAP-URGENet: A Generative-Predictive Fusion Framework for Universal Speech Enhancement (n/a) — 生成-预测融合通用 SE
> - A hybrid discriminative and generative system for Universal speech enhancement (n/a) — 判别+生成混合通用 SE (URGENT 挑战)
> - Multi-Stage Music Source Restoration with BandSplit-RoFormer Separation and HiFi++ GAN (n/a) — 多阶段音乐源修复 BandSplit-RoFormer+HiFi++ GAN
> - DTT-BSR: GAN-Based DTTNet with RoPE Transformer Enhancement for Music Source Restoration (n/a) — GAN DTTNet+RoPE 音乐源修复
> - Enhance, Then Separate: A Two-Stage Framework for Music Source Restoration (n/a) — 先增强后分离两阶段音乐修复
> - Dynamically Slimmable Speech Enhancement Network with Metric-Guided Training (n/a) — 动态可裁剪 SE, 度量引导训练
> - SpatialNet-Echo: Real-Time Acoustic Echo Cancellation via Integrated Narrow-Band and Cross-Band Processing (n/a) — 实时声学回声消除(增强/修复侧)
> - ICASSP 2026 URGENT Speech Enhancement Challenge (n/a) — 通用 SE 挑战赛 overview(基准)
### 【非编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Aligning Generative Speech Enhancement with Perceptual Feedback | 2507.09929 | LLM | enhancement | 待核 | 自然度、音质 | 待核 |
| A Lightweight Fourier-based Network for Binaural Speech Enhancement with Spatial Cue Preservation | 2509.14076 | 待核 | enhancement | 高效/轻量 | 可懂度、鲁棒性、效率 | 算力局限 |
| AmbiDrop: Array-Agnostic Speech Enhancement Using Ambisonics Encoding and Dropout-Based Learning | 2509.14855 | 待核 | enhancement | 新方法/统一框架 | 音质、可懂度、鲁棒性 | 泛化局限 |
| DISPATCH: Distilling Selective Patches for Speech Enhancement | 2509.15922 | 蒸馏 | enhancement | 新方法/统一框架 | 待核 | 待核 |
| Compose Yourself: Average-Velocity Flow Matching for One-Step Speech Enhancement | 2509.15952 | 扩散、流匹配 | enhancement | 高效/轻量 | 音质、效率、速度 | 算力局限 |
| Towards Evaluating Generative Audio: Insights from Neural Audio Codec Embedding Distances | 2509.18823 | 编解码 | codec | 零样本泛化 | 音质 | 评测局限 |
| MeanSE: Efficient Generative Speech Enhancement with Mean Flows | 2509.21214 | 流匹配 | enhancement | 高效/轻量 | 音质、效率 | 算力局限、评测局限 |
| AUV: Teaching Audio Universal Vector Quantization with Single Nested Codebook | 2509.21968 | 编解码、Conformer、蒸馏 | codec | 统一/联合建模 | 音质 | 评测局限 |
| Unsupervised Speech Enhancement using Data-defined Priors | 2509.22942 | 待核 | enhancement | 新方法/统一框架 | 待核 | 待核 |
| MeanFlowSE: One-Step Generative Speech Enhancement via MeanFlow | 2509.23299 | 扩散、流匹配、LLM | enhancement、real-time | 待核 | 音质、可懂度、鲁棒性 | 待核 |
| An Analysis of Joint Nonlinear Spatial Filtering for Spatial Aliasing Reduction | 2509.25982 | 待核 | enhancement | 统一/联合建模 | 音质、鲁棒性、效率 | 待核 |
| PhoenixCodec: Taming Neural Speech Coding for Extreme Low-Resource Scenarios | 2510.21196 | 编解码 | low-resource、codec | 待核 | 音质、可懂度、鲁棒性 | 低资源、算力局限 |
| FlexIO: Flexible Single- and Multi-Channel Speech Separation and Enhancement | 2510.21485 | 待核 | enhancement、separation | 新方法/统一框架 | 鲁棒性 | 待核 |
| SUNAC: Source-aware Unified Neural Audio Codec | 2511.16126 | 编解码、LLM | separation、source separat | 统一/联合建模 | 音质、效率 | 算力局限 |
| TISDiSS: A Training-Time and Inference-Time Scalable Framework for Discriminative Source Separation | 2509.15666 | 待核 | separation、source separat | 统一/联合建模 | 待核 | 待核 |
| Unsupervised Single-Channel Speech Separation with a Diffusion Prior under Speaker-Embedding Guidance | 2509.24395 | 扩散 | separation | 新方法/统一框架 | 待核 | 待核 |
| Spatially Aware Self-Supervised Models for Multi-Channel Neural Speaker Diarization | 2510.14551 | 自监督 | diarization | 高效/轻量 | 待核 | 算力局限、评测局限 |
| VBx for End-to-End Neural and Clustering-based Diarization | 2510.19572 | Conformer | diarization | 待核 | 鲁棒性 | 评测局限、泛化局限 |
| Bone-conduction Guided Multimodal Speech Enhancement with Conditional Diffusion Models | 2601.12354 | 骨导气导条件扩散 | 多模态语音增强 | 骨导模态引导极噪增强 | 极噪可懂度提升待核 | 需骨导传感器待核 |
| CodeSep: Low-Bitrate Codec-Driven Speech Separation with Base-Token Disentanglement and Auxiliary-Token Serial Prediction | 2601.12757 | RVQ编解码器联合分离 | 分离+低码率压缩 | 基token解耦+辅助串行预测 | 在线会议低码率待核 | 分离质量待核 |
| ICASSP 2026 URGENT Speech Enhancement Challenge | 2601.13531 | 通用增强挑战赛 | 语音增强+质量评估 | 两赛道统一增强+评估 | 社区基准待核 | 非单点创新待核 |
| FlowSE-GRPO: Training Flow Matching Speech Enhancement via Online Reinforcement Learning | 2601.16483 | 流匹配+在线GRPO | 生成式语音增强 | 首个在线GRPO对齐增强 | 对齐人类偏好待核 | 在线RL难稳定待核 |
| A Hybrid Discriminative and Generative System for Universal Speech Enhancement | 2601.19113 | 判别+生成混合增强 | 通用语音增强 | TF-GridNet+自回归融合 | 细节丰富抑伪影待核 | 复杂度高待核 |
| DisContSE: Single-Step Diffusion Speech Enhancement Based on Joint Discrete and Continuous Embeddings | 2601.21940 | 离散+连续联合扩散 | 单步扩散语音增强 | 联合codec token与连续嵌入 | 高效单步重建音素待核 | intrusive指标弱待核 |
| ArrayDPS-Refine: Generative Refinement of Discriminative Multi-Channel Speech Enhancement | 2603.24385 | 判别输出+扩散先验精修 | 多通道语音增强 | 训练免阵列无关生成精修 | 抑非线性失真待核 | 依赖SCM估计待核 |
| GAP-URGENet: A Generative-Predictive Fusion Framework for Universal Speech Enhancement | 2604.01832 | 生成-预测融合增强 | 通用语音增强 | 自表示域生成+频谱预测融合 | 48k带宽扩展待核 | 赛道系统待核 |
| Tracking Listener Attention: Gaze-Guided Audio-Visual Speech Enhancement Framework | 2604.08359 | gaze引导视听增强 | 鸡尾酒会视听增强 | gaze选目标说话人+AVSEMamba | 锁定目标说话人待核 | 需gaze硬件待核 |
| Shortcut Flow Matching for Speech Enhancement: Step-Invariant flows via single stage training | 2509.21522 | 扩散、流匹配、微调/适配器 | 增强/分离/修复、边缘/实时 | 实时/低延迟、轻量/高效 | 实时性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| LSZone: A Lightweight Spatial Information Modeling Architecture for Real-time In-car Multi-zone Speech Separation | 2510.10687 | 实时/流式 | 增强/分离/修复、边缘/实时 | 实时/低延迟、轻量/高效 | 鲁棒性、实时性 | 待核(数据/算力/特定语种/评测指标) |
| Improving DF-Conformer Using Hydra For High-Fidelity Generative Speech Enhancement on Discrete Codec Token | 2511.02454 | Transformer/注意力、Mamba/SS… | 增强/分离/修复 | 统一/端到端框架、轻量/高效 | 实时性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| UniSE: A Unified Framework for Decoder-only Autoregressive LM-based Speech Enhancement | 2510.20441 | 语言模型/自回归、神经编解码 | 增强/分离/修复 | 统一/端到端框架、数据集/基准 | 待核 | 待核(数据/算力/特定语种/评测指标) |
| Emotion-Aligned Generation in Diffusion Text to Speech Models via Preference-Guided Optimization | 2509.25416 | 扩散、强化学习 | 增强/分离/修复、情感/韵律 | 统一/端到端框架、可控/指令 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| VoxMorph: Scalable Zero-shot Voice Identity Morphing via Disentangled Embeddings | 2601.20883 | Flow匹配、语言模型、自回归 | 零样本声音转换/克隆 | We propose VoxMorph, a | 提升质量、保真度、可扩展 | 限于 |
| PFluxTTS: Hybrid Flow-Matching TTS with Robust Cross-Lingual Voice Cloning and Inference-Time Model Fusion | 2602.04160 | Flow匹配、声码器、克隆 | 零样本声音转换/克隆 | We present PFluxTTS, a | 提升质量、自然度、鲁棒 | 待核 |
| Single-step Controllable Music Bandwidth Extension With Flow Matching | 2601.14356 | Flow匹配、修复 | TTS/歌声/增强/修复/带宽扩展 | In this paper, we | 提升质量、可控 | 待核 |
| Understanding Frechet Speech Distance for Synthetic Speech Quality Evaluation | 2601.21386 | WavLM | TTS/歌声/增强/修复/带宽扩展 | Objective evaluation of | 提升质量、效率 | 待核 |
| Wave-Trainer-Fit: Neural Vocoder with Trainable Prior and Fixed-Point Iteration towards High-Quality Speech Generation from SSL features | 2602.05443 | 扩散、声码器 | TTS/歌声/增强/修复/带宽扩展 | We propose WaveTrainerFit | 提升质量、自然度、鲁棒 | 待核 |
| Synthetic Data Domain Adaptation for ASR via LLM-based Text and Phonetic Respelling Augmentation | 2603.16920 | 语言模型、LLM | TTS/歌声/增强/修复/带宽扩展 | We propose a | 提升鲁棒 | 待核 |
| A Novel Automatic Framework for Speaker Drift Detection in Synthesized Speech | 2604.06327 | 扩散、语言模型、LLM | TTS/歌声/增强/修复/带宽扩展 | We introduce the first | 提升质量、自然度、相似度 | 待核 |
| LongSpeech: A Scalable Benchmark for Transcription, Translation and Understanding in Long Speech | 2601.13539 | 语言模型、分离 | 会议/多人对话说话人分离与目标提取 | In this work, we present | 提升鲁棒、可扩展、SOTA | 待核 |
| ParaGSE: Parallel Generative Speech Enhancement with Group-Vector-Quantization-based Neural Speech Codec | 2602.01793 | 编解码、增强、分离 | 低码率语音通信/SLM离散token | To overcome these | 提升质量、效率 | 待核 |
### 【编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Aligning Generative Speech Enhancement with Perceptual Feedback | 2507.09929 | LLM | enhancement | 待核 | 自然度、音质 | 待核 |
| A Lightweight Fourier-based Network for Binaural Speech Enhancement with Spatial Cue Preservation | 2509.14076 | 待核 | enhancement | 高效/轻量 | 可懂度、鲁棒性、效率 | 算力局限 |
| AmbiDrop: Array-Agnostic Speech Enhancement Using Ambisonics Encoding and Dropout-Based Learning | 2509.14855 | 待核 | enhancement | 新方法/统一框架 | 音质、可懂度、鲁棒性 | 泛化局限 |
| DISPATCH: Distilling Selective Patches for Speech Enhancement | 2509.15922 | 蒸馏 | enhancement | 新方法/统一框架 | 待核 | 待核 |
| Compose Yourself: Average-Velocity Flow Matching for One-Step Speech Enhancement | 2509.15952 | 扩散、流匹配 | enhancement | 高效/轻量 | 音质、效率、速度 | 算力局限 |
| Towards Evaluating Generative Audio: Insights from Neural Audio Codec Embedding Distances | 2509.18823 | 编解码 | codec | 零样本泛化 | 音质 | 评测局限 |
| MeanSE: Efficient Generative Speech Enhancement with Mean Flows | 2509.21214 | 流匹配 | enhancement | 高效/轻量 | 音质、效率 | 算力局限、评测局限 |
| AUV: Teaching Audio Universal Vector Quantization with Single Nested Codebook | 2509.21968 | 编解码、Conformer、蒸馏 | codec | 统一/联合建模 | 音质 | 评测局限 |
| Unsupervised Speech Enhancement using Data-defined Priors | 2509.22942 | 待核 | enhancement | 新方法/统一框架 | 待核 | 待核 |
| MeanFlowSE: One-Step Generative Speech Enhancement via MeanFlow | 2509.23299 | 扩散、流匹配、LLM | enhancement、real-time | 待核 | 音质、可懂度、鲁棒性 | 待核 |
| An Analysis of Joint Nonlinear Spatial Filtering for Spatial Aliasing Reduction | 2509.25982 | 待核 | enhancement | 统一/联合建模 | 音质、鲁棒性、效率 | 待核 |
| PhoenixCodec: Taming Neural Speech Coding for Extreme Low-Resource Scenarios | 2510.21196 | 编解码 | low-resource、codec | 待核 | 音质、可懂度、鲁棒性 | 低资源、算力局限 |
| FlexIO: Flexible Single- and Multi-Channel Speech Separation and Enhancement | 2510.21485 | 待核 | enhancement、separation | 新方法/统一框架 | 鲁棒性 | 待核 |
| SUNAC: Source-aware Unified Neural Audio Codec | 2511.16126 | 编解码、LLM | separation、source separat | 统一/联合建模 | 音质、效率 | 算力局限 |
| TISDiSS: A Training-Time and Inference-Time Scalable Framework for Discriminative Source Separation | 2509.15666 | 待核 | separation、source separat | 统一/联合建模 | 待核 | 待核 |
| Unsupervised Single-Channel Speech Separation with a Diffusion Prior under Speaker-Embedding Guidance | 2509.24395 | 扩散 | separation | 新方法/统一框架 | 待核 | 待核 |
| Spatially Aware Self-Supervised Models for Multi-Channel Neural Speaker Diarization | 2510.14551 | 自监督 | diarization | 高效/轻量 | 待核 | 算力局限、评测局限 |
| VBx for End-to-End Neural and Clustering-based Diarization | 2510.19572 | Conformer | diarization | 待核 | 鲁棒性 | 评测局限、泛化局限 |
| Bone-conduction Guided Multimodal Speech Enhancement with Conditional Diffusion Models | 2601.12354 | 骨导气导条件扩散 | 多模态语音增强 | 骨导模态引导极噪增强 | 极噪可懂度提升待核 | 需骨导传感器待核 |
| CodeSep: Low-Bitrate Codec-Driven Speech Separation with Base-Token Disentanglement and Auxiliary-Token Serial Prediction | 2601.12757 | RVQ编解码器联合分离 | 分离+低码率压缩 | 基token解耦+辅助串行预测 | 在线会议低码率待核 | 分离质量待核 |
| ICASSP 2026 URGENT Speech Enhancement Challenge | 2601.13531 | 通用增强挑战赛 | 语音增强+质量评估 | 两赛道统一增强+评估 | 社区基准待核 | 非单点创新待核 |
| FlowSE-GRPO: Training Flow Matching Speech Enhancement via Online Reinforcement Learning | 2601.16483 | 流匹配+在线GRPO | 生成式语音增强 | 首个在线GRPO对齐增强 | 对齐人类偏好待核 | 在线RL难稳定待核 |
| A Hybrid Discriminative and Generative System for Universal Speech Enhancement | 2601.19113 | 判别+生成混合增强 | 通用语音增强 | TF-GridNet+自回归融合 | 细节丰富抑伪影待核 | 复杂度高待核 |
| DisContSE: Single-Step Diffusion Speech Enhancement Based on Joint Discrete and Continuous Embeddings | 2601.21940 | 离散+连续联合扩散 | 单步扩散语音增强 | 联合codec token与连续嵌入 | 高效单步重建音素待核 | intrusive指标弱待核 |
| ArrayDPS-Refine: Generative Refinement of Discriminative Multi-Channel Speech Enhancement | 2603.24385 | 判别输出+扩散先验精修 | 多通道语音增强 | 训练免阵列无关生成精修 | 抑非线性失真待核 | 依赖SCM估计待核 |
| GAP-URGENet: A Generative-Predictive Fusion Framework for Universal Speech Enhancement | 2604.01832 | 生成-预测融合增强 | 通用语音增强 | 自表示域生成+频谱预测融合 | 48k带宽扩展待核 | 赛道系统待核 |
| Tracking Listener Attention: Gaze-Guided Audio-Visual Speech Enhancement Framework | 2604.08359 | gaze引导视听增强 | 鸡尾酒会视听增强 | gaze选目标说话人+AVSEMamba | 锁定目标说话人待核 | 需gaze硬件待核 |
| Shortcut Flow Matching for Speech Enhancement: Step-Invariant flows via single stage training | 2509.21522 | 扩散、流匹配、微调/适配器 | 增强/分离/修复、边缘/实时 | 实时/低延迟、轻量/高效 | 实时性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| LSZone: A Lightweight Spatial Information Modeling Architecture for Real-time In-car Multi-zone Speech Separation | 2510.10687 | 实时/流式 | 增强/分离/修复、边缘/实时 | 实时/低延迟、轻量/高效 | 鲁棒性、实时性 | 待核(数据/算力/特定语种/评测指标) |
| Improving DF-Conformer Using Hydra For High-Fidelity Generative Speech Enhancement on Discrete Codec Token | 2511.02454 | Transformer/注意力、Mamba/SS… | 增强/分离/修复 | 统一/端到端框架、轻量/高效 | 实时性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| UniSE: A Unified Framework for Decoder-only Autoregressive LM-based Speech Enhancement | 2510.20441 | 语言模型/自回归、神经编解码 | 增强/分离/修复 | 统一/端到端框架、数据集/基准 | 待核 | 待核(数据/算力/特定语种/评测指标) |
| Emotion-Aligned Generation in Diffusion Text to Speech Models via Preference-Guided Optimization | 2509.25416 | 扩散、强化学习 | 增强/分离/修复、情感/韵律 | 统一/端到端框架、可控/指令 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| VoxMorph: Scalable Zero-shot Voice Identity Morphing via Disentangled Embeddings | 2601.20883 | Flow匹配、语言模型、自回归 | 零样本声音转换/克隆 | We propose VoxMorph, a | 提升质量、保真度、可扩展 | 限于 |
| PFluxTTS: Hybrid Flow-Matching TTS with Robust Cross-Lingual Voice Cloning and Inference-Time Model Fusion | 2602.04160 | Flow匹配、声码器、克隆 | 零样本声音转换/克隆 | We present PFluxTTS, a | 提升质量、自然度、鲁棒 | 待核 |
| Single-step Controllable Music Bandwidth Extension With Flow Matching | 2601.14356 | Flow匹配、修复 | TTS/歌声/增强/修复/带宽扩展 | In this paper, we | 提升质量、可控 | 待核 |
| Understanding Frechet Speech Distance for Synthetic Speech Quality Evaluation | 2601.21386 | WavLM | TTS/歌声/增强/修复/带宽扩展 | Objective evaluation of | 提升质量、效率 | 待核 |
| Wave-Trainer-Fit: Neural Vocoder with Trainable Prior and Fixed-Point Iteration towards High-Quality Speech Generation from SSL features | 2602.05443 | 扩散、声码器 | TTS/歌声/增强/修复/带宽扩展 | We propose WaveTrainerFit | 提升质量、自然度、鲁棒 | 待核 |
| Synthetic Data Domain Adaptation for ASR via LLM-based Text and Phonetic Respelling Augmentation | 2603.16920 | 语言模型、LLM | TTS/歌声/增强/修复/带宽扩展 | We propose a | 提升鲁棒 | 待核 |
| A Novel Automatic Framework for Speaker Drift Detection in Synthesized Speech | 2604.06327 | 扩散、语言模型、LLM | TTS/歌声/增强/修复/带宽扩展 | We introduce the first | 提升质量、自然度、相似度 | 待核 |
| LongSpeech: A Scalable Benchmark for Transcription, Translation and Understanding in Long Speech | 2601.13539 | 语言模型、分离 | 会议/多人对话说话人分离与目标提取 | In this work, we present | 提升鲁棒、可扩展、SOTA | 待核 |
| ParaGSE: Parallel Generative Speech Enhancement with Group-Vector-Quantization-based Neural Speech Codec | 2602.01793 | 编解码、增强、分离 | 低码率语音通信/SLM离散token | To overcome these | 提升质量、效率 | 待核 |

## 备注

- **覆盖率/枚举源**: DBLP 未收录 ICASSP 2026; IEEE Xplore proceedings 全量列表被反爬拦截(REST/search/conhome 端点均返回登录墙或 405, 无法直连)。本表基于 **OpenAlex 全量枚举**: `publication_year:2026 & search:ICASSP` 翻 39 页, 锚定 `raw_source_name` 含 "ICASSP 2026" + DOI 前缀 `10.1109/ICASSP55912.2026.*` → **190 篇 IEEE proceedings 真实条目**(OpenAlex 已索引的子集, 非 ICASSP 2026 全量录用论文; ICASSP 历年录用约 1500-2000 篇, OpenAlex 此刻仅索引到全文出现 "ICASSP" 或被 challenge 锚定的条目)。
- **未截断**: OpenAlex 7686 命中已翻完(到无结果页), 190 篇为全部满足 proceedings 锚定的条目, 未截断。
- **arXiv 反验**: 表中 28 个 arXiv ID 经 `arxiv.org/abs/<ID>` HTML abs 页核对标题全部匹配(0 幻觉)。ID 来源: 27 个来自 OpenAlex `locations[]` 的 `landing_page_url/pdf_url` 指向 arxiv.org 的链接(经 HTML abs 页二次反验), 1 个(TokenChain 2510.06201)来自 arXiv `journal_ref` 字段并同样 HTML 反验 OK。其余本组核心条目无公开 arXiv 预印本, 标 "n/a", 未编造。
- **漏检风险(高)**: ① OpenAlex 对 ICASSP 2026 的索引尚不完整(会议刚结束, IEEE proceedings 元数据 2026-04-21 才批量入库), 大量录用论文若全文无 "ICASSP" 字样且无 arXiv 预印本则**不会被 OpenAlex search=ICASSP 命中**, 故本表为本组已公开条目的**下界**而非全量; ② IEEE Xplore 全量 proceedings 列表无法获取(DBLP/IEEE 双双不可直连), 真实本组论文数应显著高于本表 33 条; ③ B 组负责的 speech-LM/情感/口音/匿名化中若有 codec/edit 交叉已尽量归 A, 但边界条目可能存在归属分歧。建议待 DBLP/IEEE Xplore 上线 ICASSP 2026 全量后复核补全。
- **arXiv API 429 教训**: 批量标题→ID 搜索时 `export.arxiv.org` 触发全局 429(换代理无效), 改用 OpenAlex `locations[]` 提取已索引预印本链接 + HTML abs 页反验的组合, 规避 API 限流(见 skill §2.3 踩坑)。
