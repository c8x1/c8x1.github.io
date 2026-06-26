# Interspeech 2025 (A组: VC/编辑/增强/分离/编解码)

> 归属: 混合（编创 132 / 非编创 17） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


> 检索日期 2026-06-25 | 论文数 145 (83 篇有已验证 arXiv ID + 62 篇无预印本标 n/a) | 范围: Interspeech 2025 (Rotterdam, 2025-08/09) 全部已公开条目中, 本组负责子方向——VC/声音克隆、语音编辑(含基于 TTS 的编辑)、生成式增强/去噪/去混响/带宽扩展/修复、说话人分离/多对象分离/目标说话人提取、神经语音编解码。排除纯 ASR、纯 TTS(交 B 组: 情感/口音/匿名化/speech-LM)、深度伪造检测/水印、心音肺音/事件分类等非本组核心条目。

> 枚举入口(按顺序):
> 1. **DBLP 全量枚举(主入口)**: `dblp.org/db/conf/interspeech/interspeech2025.html` → 解析 1181 篇 inproceedings 条目, 取全部 title span 全量(不靠关键词采样, 规避 ~20-30% 召回上限)。
> 2. ISCA Anthology: DBLP 条目经 `doi.org/10.21437/Interspeech.2025-*` 重定向至 `isca-archive.org/interspeech_2025/<key>_interspeech.html`(官方开放获取 proceedings), 用作无 arXiv 条目的摘要来源。
> 3. arXiv 标题搜索: 对筛选后每篇用 `export.arxiv.org/api/query?search_query=ti:...` 检索(7s 间距, 防全局 429)。
>
> arXiv ID 反验(强制, 禁幻觉): 每个写入表的 arXiv ID 均用 `https://arxiv.org/abs/<ID>` HTML abs 页核对标题(API 429 时 HTML 页仍可取, 见 skill §2.3)。aTENNuate 一篇 DBLP 标题缺前缀、arXiv 标题为 `aTENNuate: Optimized Real-time...`, 经 HTML 反验匹配后纳入(2409.03377)。本表 83 个 arXiv ID 全部 HTML 反验 OK(标题匹配, 0 幻觉)。无 arXiv 预印本的 62 条标 "n/a", 绝不编造(其中 61 条 arXiv 标题搜索无任何匹配、1 条仅命中近似标题确认无对应预印本)。

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|

### 【编创】VC / 声音克隆 (Voice Conversion / Cloning)

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| VibE-SVC: Vibrato Extraction with High-frequency F0 Contour for Singing Voice Conversion. | 2505.20794 | 高频F0轮廓驱动颤音提取+可控SVC | 歌唱声音转换(颤音控制) | 显式建模颤音并解耦为可控维度 | 颤音表达力提升、情绪更自然 | 颤音建模依赖F0质量,复杂装饰音受限 |
| Bridging Speech and Singing: Multi-stage Speech-Prompted Singing Voice Conversion with Speaker Embedding Adaptation. | n/a | 语音音色→歌唱的多阶段SVC(SSAN对齐+说话人嵌入自适应) | 语音转歌唱(SV) | 专门解决语音音色映射到歌唱的域鸿沟 | 跨域(语音→歌唱)音色可用 | 多阶段流程较重,依赖对齐质量 |
| DAFMSVC: One-Shot Singing Voice Conversion with Dual Attention Mechanism and Flow Matching. | 2508.05978 | 双注意力+流匹配的任意目标one-shot SVC | 任意歌手one-shot歌唱克隆 | flow匹配替代扩散、双注意力抑音色泄漏 | 音色相似度与质量更高、采样更快 | one-shot对参考质量敏感 |
| Simple and Effective Content Encoder for Singing Voice Conversion via SSL-Embedding Dimension Reduction. | n/a | SSL嵌入降维的内容编码器(缓解token重建差/嵌入泄漏) | 任意目标SVC内容编码 | 在token式与嵌入式之间取折中降维 | 内容保真+抑泄漏兼得 | 仅内容编码模块,需配解码前端 |
| Unified Microphone Conversion: Many-to-Many Device Mapping via Feature-wise Linear Modulation. | 2410.18322 | FiLM条件化的多设备麦克风音色映射(单模型many-to-many) | 设备泛化/SEC增强 | 用频响条件替代每对一模型 | 单模型覆盖多设备、可扩展 | 依赖频响估计,极端设备外推有限 |
| Towards Better Disentanglement in Non-Autoregressive Zero-Shot Expressive Voice Conversion. | 2506.04013 | 非自回归CVAE框架+源音色泄漏抑制/语言学-声学解耦 | 零样本表现力VC | 改进解耦降低源音色泄漏 | 风格迁移更纯净、非自回归快 | 表现力上限受CVAE容量限制 |
| Voice Conversion for Likability Control via Automated Rating of Speech Synthesis Corpora. | 2507.01356 | VC控制语音'好感度'(likability),自动评分语料驱动 | 社交/广告语音好感度调控 | 用自动评分语料学习likability方向 | 可面向受众定制好感音色 | likability主观性强,评分模型有偏 |
| REWIND: Speech Time Reversal for Enhancing Speaker Representations in Diffusion-based Voice Conversion. | 2505.20756 | 时间反转语音作扩散VC的说话人表征源 | 扩散VC说话人建模 | 用反语音保留音调模式做说话人身份 | 反语音仍可识人,作正则增强相似度 | 反转信号语言学信息丢失,需配内容流 |
| Training-Free Voice Conversion with Factorized Optimal Transport. | 2506.09709 | kNN-VC改用分解最优传输(MKL-VC),免训练 | 跨语言any-to-any VC(5s参考) | Monge-Kantorovich线性OT分解替代kNN回归 | 5s参考即跨语言克隆、免训练 | 线性OT假设可能限制复杂映射 |
| E2E-BPVC: End-to-End Background-Preserving Voice Conversion via In-Context Learning. | n/a | 端到端保留背景声的上下文学习VC | 含背景声语音的VC(保留语义相关背景) | 去噪+VC端到端合并、保留背景 | 背景语义保留、避免分离失真 | 上下文学习对算力/上下文长度有要求 |
| Discl-VC: Disentangled Discrete Tokens and In-Context Learning for Controllable Zero-Shot Voice Conversion. | 2505.24291 | 解耦离散token+上下文学习的可控零样本VC | 零样本可控VC(源/目标风格可控) | 离散token解耦使源/目标风格可分别控制 | 可控性强、零样本 | 离散量化有损,token设计敏感 |
| ReFlow-VC: Zero-shot Voice Conversion Based on Rectified Flow and Speaker Feature Optimization. | 2506.01032 | 整流流(rectified flow)+说话人特征优化的零样本VC | 零样本VC | 整流流直线路径减少采样步数 | 比DDPM快很多、零样本 | 整流流训练需配对/蒸馏 |
| In This Environment, As That Speaker: A Text-Driven Framework for Multi-Attribute Speech Conversion. | n/a | TES-VC:文本同时驱动目标音色与环境声学的多属性VC | 文本可控音色+环境VC | 文本独立控制音色与环境、解耦声码器 | 文本即可指定音色和环境 | 依赖合成解耦数据训练 |
| LinearVC: Linear Transformations of Self-Supervised Features Through the Lens of Voice Conversion. | 2506.01510 | 对SSL特征做线性变换(旋转即可)做VC,探究表征几何 | VC方法论/表征探针 | 发现旋转SSL特征足以高质量换音 | 极简、可解释、洞察表征结构 | 线性变换上限有限,复杂风格受限 |
| Speaker Normalization and Content Restoration for Zero-Shot Voice Conversion with Attention-Enhanced Discriminator. | n/a | 内容编码器联合音素分类+说话人归一化,注意力增强判别器 | 零样本VC | 从零训内容编码器+音素分类+说话人归一化 | 解耦更彻底、零样本质量高 | 从零训内容编码器成本高 |
| Unleashing the Inner Monster: Demonstrating High-Fidelity Human to Non-Human Voice Conversion. | n/a | 人→非人(怪物)高保真VC,面向MMORPG | 游戏怪物音效生成 | 针对非人声音特征设计VC、突破人声训练局限 | 游戏怪物声高质量生成、降成本 | 非人声音评测标准缺失 |
| VoiceQualityVC: A Voice Conversion System for Studying the Perceptual Effects of Voice Quality in Speech. | n/a | 用CPPS/H1-H2/H1-A3等嗓音质量特征做VC工具 | 嗓音质量(voice quality)感知研究 | 显式操控嗓音质量维度做感知实验 | 可系统研究voice quality感知 | 工具型,非追求自然度SOTA |
| When Humans Growl and Birds Speak: High-Fidelity Voice Conversion from Human to Animal and Designed Sounds. | 2505.24336 | 人→动物/设计声(狮吼鸟鸣/合成咆哮)高保真VC(44.1kHz) | 人→非语音声音转换 | 覆盖更广非语音声+高采样率高保真 | 多样化非语音声生成、高保真 | 非语音参考数据稀缺 |
| DiffEmotionVC: A Dual-Granularity Disentangled Diffusion Framework for Any-to-Any Emotional Voice Conversion. | n/a | 双粒度情感编码(句级+帧级)+扩散的任意目标EVC | 任意目标情感VC(any-to-any) | 双粒度情感编码解耦情感/音色/内容 | 情感表达细腻、any-to-any | 扩散采样慢,情感标注成本高 |
| ZSDEVC: Zero-Shot Diffusion-based Emotional Voice Conversion with Disentangled Mechanism. | 2409.03636 | 扩散+解耦机制的零样本情感VC | 零样本情感VC | 解耦情感/音色/内容+扩散生成 | 零样本到未见说话人情感转换 | 扩散慢,解耦完全性依赖数据 |
| ClapFM-EVC: High-Fidelity and Flexible Emotional Voice Conversion with Dual Control from Natural Language and Speech. | 2505.13805 | CLAP情感预训练+流匹配的高保真灵活EVC,自然语言/语音双控 | 自然语言/参考语音双控情感VC | EVC-CLAP对比预训练+流匹配+可调强度 | 高保真、语言/语音双控、强度可调 | CLAP预训练成本高 |
| PromptEVC: Controllable Emotional Voice Conversion with Natural Language Prompts. | 2505.20678 | 自然语言prompt可控EVC(用LLM编码prompt) | 自然语言可控情感VC | 用LLM将自然语言映射为情感表征 | 细粒度、个性化情感控制(跨个体) | 依赖LLM,prompt歧义影响稳定 |
| StarVC: A Unified Auto-Regressive Framework for Joint Text and Speech Generation in Voice Conversion. | 2506.02414 | 统一自回归框架联合文本+语音生成的VC(显式利用语言内容) | VC(显式语义内容利用) | 自回归联合建模显式利用语言学内容 | 内容/音色解耦更充分 | 自回归推理慢、易出错累积 |
| FasterVoiceGrad: Faster One-step Diffusion-Based Voice Conversion with Adversarial Diffusion Conversion Distillation. | 2508.17868 | VoiceGrad蒸馏为单步扩散VC+对抗蒸馏,省去重内容编码器 | 快速扩散VC | 对抗扩散蒸馏到单步、免重编码器 | 单步推理大幅加速、保质量 | 蒸馏需教师模型,单步上限受限 |
| Streaming Non-Autoregressive Model for Accent Conversion and Pronunciation Improvement. | 2506.16580 | 首个流式口音转换(AC):Emformer+非自回归+TTS理想发音引导 | 流式口音转换与发音改善 | 流式AC+TTS生成理想发音参考 | 实时、保音色保韵律改发音 | 流式上下文受限,口音覆盖有限 |
| Private kNN-VC: Interpretable Anonymization of Converted Speech. | 2505.17584 | kNN-VC的隐私可解释匿名化(揭示识人线索) | 语音匿名化(可解释) | 剖析并干预kNN-VC中被利用的识人线索 | 匿名化更可解释/可控 | 匿名化与可用性折中 |
| DiffMV-ETS: Diffusion-based Multi-Voice Electromyography-to-Speech Conversion using Speaker-Independent Speech Training Targets. | n/a | 扩散多音色EMG-to-Speech,用说话人无关训练目标 | 肌电(静默)语音假体多音色合成 | 说话人无关训练目标使无需该说话人语音即可多音色 | 静默发声多音色可选 | EMG信号质量与对齐难 |
| Conformer-based Ultrasound-to-Speech Conversion. | 2506.03831 | Conformer(含bi-LSTM变体)做超声舌像→语音 | 无声语音接口(超声) | Conformer建模超声→mel | 超声静默语音合成质量提升 | 说话人相关模型、数据小 |
| NAM-to-Speech Conversion with Multitask-Enhanced Autoregressive Models. | n/a | 对齐无关端到端NAM(非听觉低语)→语音自回归多任务模型 | NAM静默语音合成 | 对齐无关+多任务增强自回归、缓解多说话人对齐退化 | 摆脱每说话人大量NAM-文本对 | 自回归易出错,NAM信号弱 |
| Fairness in Dysarthric Speech Synthesis: Understanding Intrinsic Bias in Dysarthric Speech Cloning using F5-TTS. | 2508.05102 | 研究F5-TTS克隆构音障碍语音的固有偏置(公平性) | 构音障碍语音克隆/数据增强 | 系统揭示零样本克隆对构音障碍的偏置 | 为公平辅助技术提供偏置认知 | 偏置存在,克隆质量受限 |

### 【编创】语音编辑 (Speech Editing, 含基于 TTS 的编辑)

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Counterfactual Activation Editing for Post-hoc Prosody and Mispronunciation Correction in TTS Models. | 2506.00832 | 反事实激活编辑做TTS事后韵律调控/发音纠错 | TTS韵律/发音事后编辑 | 反事实激活编辑免额外模块/训练做事后调整 | 事后精确调控韵律与发音 | 激活编辑可解释性有限,需访问内层 |
| SpeechSEC: A Unified Multi-Task Framework for Speech Synthesis, Editing, and Continuation. | n/a | 统一多任务框架:合成/编辑/续写,建模声学特征内部关系 | 语音合成+编辑+续写(统一) | 单框架统一三任务、利用声学特征内部关系 | 多任务统一、减少重复模型 | 多任务平衡难,统一框架复杂 |
| VoiceNoNG: Robust High-Quality Speech Editing Model without Hallucinations. | n/a | 兼顾Voicebox(背景声差)与VoiceCraft(幻觉)缺陷的鲁棒高质量编辑 | 含背景声/多场景语音编辑 | 解决背景声编辑与幻觉问题 | 多场景高质量无幻觉编辑 | 需权衡两类前代模型 |
| Towards Emotionally Consistent Text-Based Speech Editing: Introducing EmoCorrector and The ECD-TSE Dataset. | 2505.20341 | EmoCorrector:文本编辑后情感一致性后校正+ECD-TSE数据集 | 文本编辑语音(TSE)情感一致 | 关注文本改动引发的情感不一致并后校正 | 编辑段情感与上下文一致 | 后校正依赖LLM,数据集规模有限 |

### 【编创】生成式增强 / 去噪 / 去混响 (Generative Enhancement / Denoising / Dereverberation)

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Optimized Real-time Speech Enhancement with Deep SSMs on Raw Audio. | 2409.03377 | aTENNuate:深度状态空间自编码器端到端原始语音增强(去噪/超分/去量化) | 实时原始语音增强 | SSM端到端原始波形、高效在线 | 实时、多任务(去噪/超分/去量化) | 原始波形建模对算力与数据要求高 |
| A Two-Stage Hierarchical Deep Filtering Framework for Real-Time Speech Enhancement. | 2506.01023 | 子带处理+深度滤波的两阶段分层单通道SE | 实时单通道语音增强 | 子带捕获邻频+深度滤波输出联合 | 充分利用邻TF bin信息 | 单通道,多说话人受限 |
| Real-Time Audio-Visual Speech Enhancement Using Pre-trained Visual Representations. | 2507.21448 | RAVEN:实时视听SE,用预训练视觉嵌入隔离屏上说话人 | 实时视听SE(干扰说话人) | 预训练视觉表征做目标锁定 | 抗干扰说话人、实时 | 依赖视觉质量/对齐 |
| Lightweight Speech Enhancement Model Based on Harmonic Attention and Phase Estimation with Skin-Attachable Accelerometer. | n/a | LAU-Net:皮肤加速度计+麦克风轻量U-Net,谐波注意力+相位估计 | 可穿戴ACC辅助SE | 谐波注意力+相位估计+ACC模态 | 轻量实时、噪声鲁棒 | ACC硬件依赖 |
| TSDT-Net: Ultra-Low-Complexity Two-Stage Model Combining Dual-Path-Transformer and Transform-Average-Concatenate Network for Speech Enhancement. | n/a | 双阶段超低复杂度SE(DPT+TAC双通道波束优化) | 低复杂度SE | 两阶段DPT+TAC,第二阶段波束优化 | 超低参数/算力下高性能 | 精度受低复杂度约束 |
| Structured Codebook Based Hierarchical Framework for DNN for Computationally Efficient Speech Enhancement. | n/a | HF-DNN:结构化码本分层多小DNN替代单大DNN | 计算高效SE | 分层多简单DNN+结构化码本 | 降算力保性能 | 分层调度/码本设计复杂 |
| CAGCRN: Real-Time Speech Enhancement with a Lightweight Model for Joint Acoustic Echo Cancellation and Noise Suppression. | n/a | 轻量联合回声消除+降噪的实时SE | 通信AEC+NS联合 | 单模型联合AEC与NS、资源友好 | 实时、资源受限可用 | 联合训练需配回声数据 |
| Diffusion Buffer: Online Diffusion-based Speech Enhancement with Sub-Second Latency. | 2506.02908 | 滑窗扩散在线SE(亚秒延迟) | 在线/流式扩散SE | 滑窗渐进腐蚀-去噪框架 | 扩散SE可流式、亚秒 | 扩散步数仍影响延迟 |
| A Deformable Convolution GAN Approach for Speech Dereverberation in Cochlear Implant Users. | n/a | 可变形卷积GAN为人工耳蜗用户去混响 | CI用户去混响 | 可变形卷积GAN针对CI感知优化 | 提升CI用户可懂度 | 面向CI,泛化到正常听力有限 |
| Lessons Learned from the URGENT 2024 Speech Enhancement Challenge. | 2506.01611 | URGENT 2024挑战深度分析:数据清洗与评测指标 | 通用SE(挑战赛分析) | 揭示SE中数据清洗与评测被低估问题 | 为通用SE开发提供经验 | 分析性,非新模型 |
| Interspeech 2025 URGENT Speech Enhancement Challenge. | 2505.23212 | URGENT 2025挑战(第二届):更广失真/数据/指标 | 通用SE挑战赛overview | 扩展失真类型+多语言+综合指标 | 推动通用鲁棒可泛化SE | 挑战赛overview,基线有限 |
| TS-URGENet: A Three-stage Universal Robust and Generalizable Speech Enhancement Network. | 2505.18533 | 三阶段(填充/分离/修复)通用鲁棒可泛化SE | 通用SE(多失真) | 三阶段处理多种失真 | 通用、鲁棒、可泛化 | 三阶段流程较重 |
| Multistage Universal Speech Enhancement System for URGENT Challenge. | n/a | 多阶段通用SE系统(去削顶/丢包补偿/分离/谱修复) | 通用SE(挑战系统) | 跨时/子带/时频多域多子模块 | 多失真联合处理 | 多模块级联复杂 |
| Scaling beyond Denoising: Submitted System and Findings in URGENT Challenge 2025. | n/a | 端到端联合多退化SE系统(双路径TF变体+快带处理) | 通用SE(超越去噪) | 端到端联合多退化、双路径架构 | 超越单一去噪、多失真 | 端到端训练数据需求大 |
| DeepFilterGAN: A Full-band Real-time Speech Enhancement System with GAN-based Stochastic Regeneration. | 2505.23515 | 全带实时SE:预测模型+GAN随机再生避免过抑制 | 全带实时SE | GAN随机再生补预测模型过抑制 | 全带实时、减少过抑制 | GAN再生可能引入伪影 |
| FUSE: Universal Speech Enhancement using Multi-Stage Fusion of Sparse Compression and Token Generation Models for the URGENT 2025 Challenge. | 2506.00809 | 稀疏压缩+token生成多阶段融合的通用SE(URGENT 2025) | 通用SE(挑战) | 稀疏压缩网+生成模型masked LM精修 | 多阶段融合、鲁棒 | 多阶段融合调参复杂 |
| Universal Speech Enhancement with Regression and Generative Mamba. | 2505.21198 | USEMamba:状态空间SE处理长序列/TF/多失真(回归+生成) | 通用SE | Mamba长序列建模+回归与生成结合 | 长序列高效、多失真 | Mamba调参/稳定性 |
| Mel-McNet: A Mel-Scale Framework for Online Multichannel Speech Enhancement. | 2505.19576 | Mel尺度在线多通道SE框架(谱+空间双组件) | 在线多通道SE | Mel频域更贴合听觉+计算高效 | 听觉匹配+高效在线 | Mel分辨率限制 |
| A Lightweight Hybrid Dual Channel Speech Enhancement System under Low-SNR Conditions. | 2505.19597 | IVA+改版dual-path轻量混合双通道SE(低SNR) | 低SNR轻量多通道SE | IVA与dual-path混合、轻量 | 低SNR、资源受限可用 | 轻量精度上限有限 |
| ARiSE: Auto-Regressive Multi-Channel Speech Enhancement. | 2505.22051 | 多通道SE引入自回归连接(前帧估计作当前输入) | 帧在线多通道SE | 自回归连接利用前帧估计 | 增强时序建模、帧在线 | 自回归误差累积风险 |
| WTFormer: A Wavelet Conformer Network for MIMO Speech Enhancement with Spatial Cues Peservation. | 2506.22001 | 小波Conformer做MIMO SE保时空信号完整 | MIMO多通道SE | 小波多分辨率+保空间线索 | MIMO时空完整、保空间线索 | 小波设计/计算量 |
| A Three-Stage Beamforming with Harmonic Guidance for Multi-Channel Speech Enhancement. | n/a | 三阶段波束成形+谐波引导的多通道SE(低SNR) | 多通道SE(低SNR) | 显式提取语音谱结构+谐波引导波束 | 低SNR下空间-谱联合更稳 | 谐波引导依赖F0估计 |
| Speech Enhancement with Dual-path Multi-Channel Linear Prediction Filter and Multi-norm Beamforming. | 2507.18350 | 双路径MCLP滤波+多范数波束成形的SE | 多通道SE | 时/频双路径MCLP+多范数波束 | 联合空间-谱降噪、多范数鲁棒 | 滤波/波束设计复杂 |
| Investigating continuous autoregressive generative speech enhancement. | n/a | 研究连续(非离散token)自回归扩散生成式SE | 生成式SE | 用连续扩散替代离散token概率建模 | 性能与效率优于离散token AR | 连续AR训练/稳定性 |
| Dynamic Layer Gating for Speech Enhancement. | n/a | 动态层门控(子带/分段SNR自适应网络结构)SE | 自适应计算SE | 按时变谱特性动态门控网络层 | 计算高效+可解释 | 门控策略需调 |
| Test-Time Training for Speech Enhancement. | 2508.01847 | 测试时训练(TTT)SE应对不可预测噪声/域漂移 | 域自适应SE | Y型架构主任务+自监督辅助任务推理时自适应 | 推理时适应新域/噪声 | TTT增加推理开销 |
| Few-step Adversarial Schr dinger Bridge for Generative Speech Enhancement. | n/a | 少步对抗Schrödinger桥生成式SE(替代多步扩散) | 生成式SE | 可 tractable Schrödinger桥+对抗少步 | 少步高质量生成增强 | 桥/对抗训练稳定性 |
| Exploiting Bispectral Features for Single-Channel Speech Enhancement. | n/a | 双谱特征(bispectral)单通道SE降复杂度 | 单通道SE(低复杂度) | 双谱特征替代部分编码、降算力 | 计算高效、保性能 | 双谱特征工程复杂 |
| Improving Noise Robustness of LLM-based Zero-shot TTS via Discrete Acoustic Token Denoising. | 2505.13830 | 神经编解码语音去噪器集成LauraTTS做噪声鲁棒零样本TTS | 噪声鲁棒零样本TTS(去噪prompt token) | codec级去噪prompt、与LLM-TTS集成 | 含噪prompt下TTS质量提升 | codec去噪与TTS耦合调优 |
| Real-Time Diffusion Buffer for Speech Enhancement On A Laptop. | n/a | 单麦克笔记本实时扩散去噪(混响+ babble)演示系统 | 实时演示系统 | 滑窗扩散亚秒延迟、单mic | 笔记本实时体验式增强 | 演示性,规模有限 |
| Boosting StoRM Convergence with Metric Guidance and Non-uniform State-Sampling for Optimal Dereverberation. | n/a | StoRM扩散去混响+度量引导+非均匀状态采样 | 去混响 | 度量引导+非均匀采样加速收敛、建模变异性 | 去混响收敛更好、高效 | 度量引导依赖指标质量 |
| Modality-Specific Speech Enhancement and Noise-Adaptive Fusion for Acoustic and Body-Conduction Microphone Framework. | 2508.17336 | 声学mic+骨导mic模态专属SE+噪声自适应融合 | 多模态SE(骨导+声学) | 模态专属处理+噪声自适应融合、骨导补高频 | 噪声抑制+高频重建兼得 | 双模态硬件依赖 |
| Joint Rate Allocation and Sensor Selection for Speech Enhancement in Wireless Acoustic Sensor Networks. | n/a | 无线声传感网中联合速率分配+传感器选择SE(能效) | 无线传感网SE(能效) | 联合RA+SS在频域优化能效 | 预定性能下省能 | 网络/调度假设较强 |
| Individualized speech enhancement for hearing-impaired listeners. | n/a | 个体化SE:降噪+听力损失放大补偿闭环可微框架 | 听障个体化SE | NR+放大补偿统一闭环可微设计 | 听障者可懂度+感知质量提升 | 个体听力曲线依赖 |
| First Analyze Then Enhance: A Task-Aware System for Speech Separation, Denoising, and Dereverberation. | n/a | FATE:先分类退化类型再用专属模块增强(分离/去噪/去混响) | 多退化SE(任务感知) | 先分析退化类型再选模块、避免过处理 | 避免过处理、降复杂度 | 分类器错误影响后续 |
| A Semantic Information-based Hierarchical Speech Enhancement Method Using Factorized Codec and Diffusion Model. | 2505.13843 | 语义信息分层SE:分解codec+扩散(语义/声学分层) | 通用SE(语义分层) | 因子化codec分层语义/声学+扩散 | 复杂环境+下游任务友好 | 分层codec+扩散复杂 |
| Voice-ENHANCE: Speech Restoration using a Diffusion-based Voice Conversion Framework. | 2505.15254 | 说话人无关语音修复+VC的演播室级质量SE | 语音修复(演播室级) | 用扩散VC做同说话人语音修复 | 演播室级质量 | VC对噪声脆弱,需前置处理 |
| SNR-Aligned Consistent Diffusion for Adaptive Speech Enhancement. | n/a | SNR自适应对齐扩散时间步的一致性扩散SE | 自适应生成式SE | 扩散时间步按输入SNR动态对齐 | 多样噪声下鲁棒、一致性快 | SNR估计误差影响 |
| MDDM: A Multi-view Discriminative Enhanced Diffusion-based Model for Speech Enhancement. | 2505.13029 | 多视角判别增强扩散SE(融合判别与生成) | 生成式SE | 多视角特征+判别-生成融合 | 兼顾质量与计算、减少失真 | 多视角/双目标训练复杂 |
| Lightweight Speech Enhancement for Mandarin Esophageal Speech. | n/a | 三种轻量SE(帧掩蔽/IRM/VC)用端到端ASR损失训,面向食管语音 | 食管语音增强(中文) | ASR损失训练+VC技术、轻量 | 提升食管语音可懂度 | 食管语音数据稀缺 |
| SaD: A Scenario-Aware Discriminator for Speech Enhancement. | 2509.00405 | 场景感知判别器(SaD)用于GAN-SE | GAN-SE | 判别器利用场景上下文信息 | 场景自适应提升增强质量 | 场景标签/标注依赖 |
| Efficient Speech Enhancement via Embeddings from Pre-trained Generative Audioencoders. | 2506.11514 | 用预训练生成式audioencoder嵌入做高效可扩展SE | 高效SE | 预训练嵌入+小编码器去噪 | 高效可扩展、利用预训练 | 预训练模型偏向其域 |
| Towards Personalised Audio Visual Speech Enhancement. | n/a | 个性化(person-specific)+视听SE融合(声纹+唇动) | 个性化视听SE | PSE声纹+AV视觉融合解决标签置换 | 噪声+多说话人下质量/可懂度 | 需注册数据+视觉对齐 |
| FlowSE: Efficient and High-Quality Speech Enhancement via Flow Matching. | 2505.19476 | 流匹配高效高质量SE(免LM量化损失/扩散复杂训练) | 生成式SE | 流匹配替代LM量化与扩散 | 高效+保说话人相似度/可懂度 | 流匹配训练需配对 |
| Speech Enhancement based on cascaded two flows. | 2508.06842 | 级联双流(flow matching)SE,引入更多条件变量 | 生成式SE | 级联两流+多条件变量、小NFE | 少NFE高质量 | 级联流训练/调参 |
| MSFNet: A Nested Model for Multi-Sampling-Frequency Speech Enhancement. | n/a | 多采样频率嵌套SE(免架构改、适配SF变化) | 通用SE(多采样率) | 嵌套结构适配可变采样频率 | 单一模型多采样率通用 | 嵌套设计复杂度 |
| TF-SkiMNet: Speech Enhancement Based on Inplace Modeling and Skipping Memory in Time-Frequency Domain. | n/a | TF域inplace建模+跳跃记忆的SkiMNet SE | 高效SE | inplace建模+跳跃内存、保SOTA | 高效、参数更省 | 架构工程复杂 |
| xLSTM-SENet: xLSTM for Single-Channel Speech Enhancement. | 2501.06146 | 首个xLSTM单通道SE(线性可扩展替代注意力) | 单通道SE | xLSTM线性可扩展替代Conformer | 长序列高效、可扩展 | xLSTM在SE上限待验证 |
| From KAN to GR-KAN: Advancing Speech Enhancement with KAN-Based Methodology. | 2412.17778 | GR-KAN(分组有理KAN)替换DNN-SE激活函数 | SE激活函数 | GR-KAN保KAN表达力+可扩展 | 高保真SE、多尺度建模 | KAN类训练稳定性 |
| Stack Less, Repeat More: A Block Reusing Approach for Progressive Speech Enhancement. | 2505.19401 | 重复单块渐进精炼替代堆叠的SE(浅编解码+复用) | 高效SE | 重复复用单块渐进精炼、减冗余 | 参数更少、渐进精炼 | 重复块容量上限 |
| Mamba-based Hybrid Model for Speech Enhancement. | n/a | MH-SENet:U-Net+双向Mamba(时/谱并行)+Mamba-Transformer交叉域 | 单通道SE | 双向Mamba并行时谱+交叉域Mamba-Transformer | 长上下文建模、跨域 | Mamba稳定性/调参 |
| Restoring Harmonics: Enhancing Speech Quality with Deep Mask and Harmonic Restoration Network. | n/a | DMHRN两阶段:深度掩蔽去噪+谐波修复(抗过抑制/谐波退化) | SE质量提升 | 显式谐波修复阶段补低能成分 | 抗过抑制、保谐波结构 | 谐波/F0估计依赖 |

### 【编创】带宽扩展 / 修复 / 补全 (Bandwidth Extension / Restoration / Inpainting)

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| A Neural Codec Approach for Noise-Robust Bandwidth Expansion. | n/a | 预训练codec+conformer预测干净码本索引,同时去噪+带宽扩展 | 噪声鲁棒带宽扩展 | 用codec码本索引联合去噪+BWE | 同时去噪+扩展带宽 | codec码本设计依赖 |
| HWB-Net: A Novel High-Performance and Efficient Hybrid Waveform Bandwidth Extension Method. | n/a | 半波整流信号+原始波形混合的HWB-Net BWE | 窄带→宽带BWE | 半波信号+原始波形混合、高效 | 高效高性能BWE | 半波处理对相位敏感 |
| Frequency-Domain Enhanced Extreme Bandwidth Extension Network with ICCRN for Superior Speech Quality. | n/a | 频域增强极端BWE+ICCRN(缓解EBEN下采样损失) | 极端带宽扩展 | 频域增强+ICCRR缓解下采样信息损失 | 更优语音质量(极宽带) | 结构较复杂 |
| MelRe: Vision-Based Mel-Spectrogram Restoration. | n/a | 视觉(图像/视觉模型)方法做mel谱修复 | mel谱修复 | 将视觉技术引入mel谱修复、更细粒度 | 跨域视觉方法可用 | 视觉-音频对齐不确定 |
| Listen through the Sound: Generative Speech Restoration Leveraging Acoustic Context Representation. | 2508.08953 | UNIVERSE++扩散修复+CLAP声学上下文嵌入条件 | 生成式语音修复 | CLAP环境属性上下文嵌入作条件 | 上下文感知修复 | CLAP预训练依赖 |
| Discovering Directions of Uncertainty in Speech Inpainting. | n/a | NPPC(神经后验主成分)恢复语音补全后验主变化方向 | 语音补全(inpainting) | 适配NPPC得后验变化主方向(非单一输出) | 显式不确定性/多解 | 后验估计计算重 |

### 【编创】说话人分离 / 多对象分离 / 目标说话人提取 (Diarization / Separation / TSE)

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Quadruple Path Modeling with Latent Feature Transfer for Permutation-free Continuous Speech Separation. | n/a | QPM:无置换连续语音分离(块内/说话人间/块间+LFT) | 连续/流式语音分离 | 四路径建模+潜在特征传输免置换 | 流式/变说话人免置换 | 多路径复杂 |
| Speaker Separation for an Unknown Number of Speakers with Encoder-Decoder-Based Contextual Information Module. | n/a | 编码-解码上下文信息模块生成说话人吸引子(未知人数) | 未知人数语音分离 | 上下文信息模块替代紧凑吸引子保留上下文 | 保留上下文、未知人数 | LSTM解码训练成本 |
| Attractor-Based Speech Separation of Multiple Utterances by Unknown Number of Speakers. | 2505.16607 | 单通道吸引子分离:同时分离+动态估计人数+活动检测(多人多句) | 单通道未知人数分离 | 吸引子模块同时做分离/计人数/活动检测 | 动态人数、多句 | 单通道上限 |
| ReSepNet: A Unified-Light Model for Recursive Speech Separation with Unknown Speaker Count. | n/a | 递归分离网络(ReSepNet)动态适配未知人数,统一轻量 | 未知人数单通道分离 | 递归分离动态适配人数、轻量统一 | 轻量、动态人数 | 递归深度影响延迟 |
| Deep-Simplex Multichannel Speech Separation. | n/a | Deep-Simplex:深度先验重建说话人活动概率单纯形(多通道) | 多通道语音分离 | 深度先验法重建活动概率单纯形、少数据可泛化 | 少训练数据、泛化好 | 深度先验优化慢 |
| FLASepformer: Efficient Speech Separation with Gated Focused Linear Attention Transformer. | 2508.19528 | 聚焦线性注意力Transformer的高效语音分离(降二次复杂度) | 长序列语音分离 | Focused Linear Attention+门控降复杂度 | 长序列高效、省内存 | 线性注意力表达力折中 |
| Power Spectral Density Estimation for Acoustic Source Separation Using A Spherical Microphone Array. | n/a | 球面mic阵列PSD估计用于波束+后滤波声源分离 | 球阵声源分离 | PSD估计驱动后滤波分离 | 噪声下PSD更准、分离更稳 | 球阵硬件/几何假设 |
| Exploring Efficient Directional and Distance Cues for Regional Speech Separation. | 2508.07563 | 改进延时-求和取方向线索+距离线索做区域语音分离(麦克风阵列) | 区域(方向+距离)语音分离 | 同时利用方向与距离线索 | 指定方向+距离内提取 | 距离估计精度有限 |
| Fine-tune Before Structured Pruning: Towards Compact and Accurate Self-Supervised Models for Speaker Diarization. | 2505.24111 | 先微调再结构化剪枝压缩WavLM用于说话人日志 | 资源受限说话人日志 | 先微调后剪枝保高剪枝率性能 | 高压缩率保精度 | 剪枝策略需调 |
| Count Your Speakers! Multitask Learning for Multimodal Speaker Diarization. | n/a | 多任务多模态说话人日志(显式计数,替代阈值聚类) | 多模态说话人日志 | 多任务显式估计说话人数、避免过聚类 | 避免过聚类、降DER | 多模态对齐复杂 |
| End-to-End Diarization utilizing Attractor Deep Clustering. | 2506.11090 | conformer解码+transformer吸引子+深度聚类角度loss的紧凑日志 | 端到端说话人日志 | 吸引子+深度聚类角度loss refine | 紧凑、结构化表征鲁棒 | 吸引子数量预设 |
| SDBench: A Comprehensive Benchmark Suite for Speaker Diarization. | 2507.16136 | SDBench:开源说话人日志综合基准(统一划分/指标) | 说话人日志基准 | 统一数据划分与指标做跨系统可比评测 | 可比、标准化评测 | 基准非模型 |
| Pretraining Multi-Speaker Identification for Neural Speaker Diarization. | 2505.24545 | 多说话人识别预训练为端到端日志(缓解数据饥渴) | 端到端说话人日志 | 多说话人识别预训练、省存储 | 缓解标注数据饥渴 | 预训练数据生成策略依赖 |
| DLF-EEND: Dynamic Layer Fusion for End-to-End Speaker Diarization. | n/a | EEND动态层融合(辅助分支+动态路由自适应融合多分辨率) | 端到端说话人日志 | 动态路由自适应融合Transformer层 | 多分辨率层级学习更好 | 辅助分支增加训练复杂 |
| Cross-attention and Self-attention for Audio-visual Speaker Diarization in MISP-Meeting Challenge. | 2506.02621 | CASA-Net:交叉+自注意力做音视频说话人日志(MISP 2025) | 音视频会议说话人日志 | 交叉注意力捕获跨模态+自注意力 | 会议AV日志更准 | 依赖视觉质量/对齐 |
| Multi-Channel Sequence-to-Sequence Neural Diarization: Experimental Results for The MISP 2025 Challenge. | 2505.16387 | MC-S2SND:多通道序列到序列神经日志(MISP 2025) | 多通道会议说话人日志 | 单通道S2SND扩展到多通道 | 多通道信息提升日志 | 挑战系统,基线受限 |
| Leveraging Self-Supervised Learning Based Speaker Diarization for MISP 2025 AVSD Challenge. | 2409.09408 | 用WavLM SSL缓解端到端日志数据稀缺(MISP 2025 AVSD) | 音视频说话人日志 | WavLM SSL缓解数据稀缺 | 数据稀缺下日志改善 | SSL微调成本 |
| Robust Target Speaker Diarization and Separation via Augmented Speaker Embedding Sampling. | 2508.06393 | 增强说话人嵌入采样的免注册分离+日志联合训练 | 免注册分离+日志 | 免注册、增强嵌入采样联合分离与日志 | 无需注册、联合训练 | 免注册精度上限 |
| REAL-T: Real Conversational Mixtures for Target Speaker Extraction. | n/a | REAL-T:首个对话中心的TSE真实混合数据集+分析 | 真实对话TSE评测 | 首个对话中心真实混合数据集 | 弥补合成数据与真实对话鸿沟 | 数据集非模型 |
| SepVAC: Multitask Learning of Speaker Separation, Speaker Localization, Microphone Array Localization, and Room Acoustic Parameter Estimation in Various Acoustic Conditions. | n/a | SepVAC:分离+说话人定位+阵列定位+房间声学参数联合多任务 | 鲁棒语音分离(显式估计环境) | 显式估计位置/房间参数解歧义 | 抗噪/混响、可解释多任务 | 多任务标注/平衡难 |
| FlowTSE: Target Speaker Extraction with Flow Matching. | 2505.14465 | 流匹配目标说话人提取(免复杂pipeline/预训练组件) | 目标说话人提取 | 流匹配简化pipeline、免预训练组件 | 高效、生成式TSE | 流匹配训练需配对 |
| MTSE: Multi-Target Speaker Extraction for Conversation Scenarios. | n/a | 多目标说话人提取(MTSE):对话中多注册多目标 | 对话多目标TSE | 定义并解决多目标提取任务 | 支持多目标提取场景 | 多注册复杂度上升 |
| Location-Aware Target Speaker Extraction for Hearing Aids. | n/a | 位置感知双耳低延迟TSE(助听器,可提取非正视目标) | 助听器TSE | 位置感知+双耳低延迟低复杂度 | 助听器实时、可提取非正视目标 | 助听器算力约束 |
| Online AV-CrossNet: a Causal and Efficient Audiovisual System for Speech Enhancement and Target Speaker Extraction. | n/a | 在线AV-CrossNet:因果高效音视频SE+TSE(因果层+压缩+1帧前瞻) | 因果实时音视频SE/TSE | 因果化+压缩+单帧前瞻 | 因果实时、高效 | 因果约束影响精度 |
| TargetVoice: Single Channel Low-Latency Target Speaker Extraction. | n/a | TargetVoice:单通道低延迟轻量TSE(边缘/呼叫中心) | 边缘低延迟TSE | 轻量低延迟优化边缘设备 | 边缘实时、提升ASR | 单通道+轻量精度上限 |
| Mitigating Non-Target Speaker Bias in Guided Speaker Embedding. | 2506.12500 | 缓解引导说话人嵌入中非目标说话人偏置(低重叠退化) | 多说话人嵌入 | 剖析并缓解严重重叠训练导致的低重叠退化 | 低重叠场景退化减少 | 需调整训练分布 |
| Speaker Diarization with Overlapping Community Detection Using Graph Attention Networks and Label Propagation Algorithm. | 2506.02610 | OCDGALP:图注意力+标签传播的重叠社区检测日志 | 说话人日志聚类 | 重叠社区检测处理复杂嵌入分布与重叠段 | 处理重叠段、复杂分布 | 图构建/超参敏感 |
| Pushing the Limits of End-to-End Diarization. | 2509.14737 | EEND-TA单一非自回归模型在多数据集达SOTA DER(含DIHARD III 14.49%) | 端到端说话人日志 | 统一非自回归EEND-TA+规模预训练 | 多数据集SOTA、强泛化 | 大模型/预训练成本 |
| Spatio-Spectral Diarization of Meetings by Combining TDOA-based Segmentation and Speaker Embedding-based Clustering. | 2506.16228 | TDOA分段+嵌入聚类的空间-谱会议日志(免多通道训练/麦克布置先验) | 会议说话人日志 | TDOA分段+嵌入聚类、免多通道训练与布置先验 | 适配紧/分布阵、免先验 | TDOA估计精度依赖 |
| Selective Channel Attention based Target Speaker Voice Activity Detection for Speaker Diarization under AD-HOC Microphone Array Settings. | n/a | SCA-TSVAD:选择性通道注意力目标说话人VAD(ad-hoc阵列) | ad-hoc阵列说话人日志 | 模拟多样拓扑+选择性通道注意力 | 适配多样阵列配置 | 需模拟数据覆盖拓扑 |
| Diarization-Guided Multi-Speaker Embeddings. | n/a | 日志引导的多说话人嵌入(合成混合+oracle活动训练) | 多说话人嵌入 | 日志引导训练多说话人嵌入、缓解域失配 | 多说话人场景嵌入可靠 | 需oracle活动标签 |
| Streaming Sortformer: Speaker Cache-Based Online Speaker Diarization with Arrival-Time Ordering. | 2507.18446 | 流式Sortformer:到达顺序说话人缓存在线日志 | 流式在线说话人日志 | 到达顺序说话人缓存、在线 | 流式在线、保到达顺序 | 缓存策略/延迟权衡 |
| Band-SCNet: A Causal, Lightweight Model for High-Performance Real-Time Music Source Separation. | n/a | Band-SCNet:因果轻量实时音乐源分离(稀疏压缩+跨/窄带块) | 实时音乐源分离 | 稀疏压缩+跨带/窄带块、因果轻量 | 实时高性能MSS、缩水小 | 面向音乐,语音迁移有限 |
| CabinSep: IR-Augmented Mask-Based MVDR for Real-Time In-car Speech Separation with Distributed Heterogeneous Arrays. | 2509.01399 | CabinSep:IR增强掩蔽MVDR车载分布式异构阵列分离(降ASR错) | 车载语音分离 | IR增强+掩蔽MVDR+分布式异构阵 | 车载ASR错降、实时 | 车载IR/阵列硬件特定 |
| DGMO: Training-Free Audio Source Separation through Diffusion-Guided Mask Optimization. | 2506.02858 | DGMO:免训练用预训练扩散先验做语言查询音频分离(LASS) | 语言查询开放词表分离 | 免训练、扩散先验引导掩蔽优化 | 免训练、开放词表 | 扩散先验域受限、慢 |
| DnR-nonverbal: Cinematic Audio Source Separation DatasetContaining Non-Verbal Sounds. | 2506.02499 | DnR-nonverbal:含非语言声(笑/尖叫)的电影音频分离数据集 | 电影音频源分离(CASS) | 纳入非语言表演声的数据集 | 更贴近真实电影音频、含情感声 | 数据集非模型 |

### 【非编创】神经语音编解码 (Neural Speech Codec)

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| SpecTokenizer: A Lightweight Streaming Codec in the Compressed Spectrum Domain. | 2510.21209 | SpecTokenizer:压缩谱域轻量流式codec(替代G级算力NAC) | 轻量流式神经编解码 | 压缩谱域操作、轻量流式 | 轻量流式、低算力 | 谱域压缩可能损信息 |
| TS3-Codec: Transformer-Based Simple Streaming Single Codec. | 2411.18803 | TS3-Codec:纯Transformer无卷积流式单codec | 流式神经编解码 | 纯Transformer无卷积架构 | 简洁、流式、易与LM结合 | 纯Transformer算力/稳定性 |
| LSPnet: an ultra-low bitrate hybrid neural codec. | n/a | LSPnet:基于LPCNet+线谱对(LSP)的1.2kbps超低码率混合codec | 超低码率语音编解码 | LSP改进量化+免显式LPC估计直接预测概率 | 1.2kbps高保真、低复杂 | 超低码率上限受限 |
| On the Language and Gender Biases in PSTN, VoIP and Neural Audio Codecs. | 2506.02545 | 研究PSTN/VoIP/神经codec的语言与性别偏置(公平性) | codec公平性分析 | 系统揭示编码机制固有偏置 | 公平性认知、减少差异 | 分析性,偏置难根治 |
| EnCodecMAE: leveraging neural codecs for universal audio representation learning. | 2309.07391 | EnCodecMAE:基于神经codec的掩蔽自编码通用音频表征学习 | 通用音频表征学习 | 以EnCodec token做MAE预训练 | 语音/音乐/环境声通用表征 | 依赖codec token、表征偏其域 |
| FreeCodec: A Disentangled Neural Speech Codec with Fewer Tokens. | 2412.01053 | FreeCodec:解耦、更少token的神经语音codec(高编码效率) | 低token解耦编解码 | 改进RVQ编码效率、更少token保质量 | 少token高质量、利于LLM | 解耦训练复杂 |
| DualCodec: A Low-Frame-Rate, Semantically-Enhanced Neural Audio Codec for Speech Generation. | 2505.13000 | DualCodec:双流低帧率语义增强codec(语义+声学双stem) | LM语音生成的低帧率codec | 双stem语义+声学、低帧率 | 低帧率保语义+质量、利LM | 双流训练/对齐复杂 |
| Prosody-Adaptable Audio Codecs for Zero-Shot Voice Conversion via In-Context Learning. | 2505.15402 | 韵律可适配codec+VALLE-X上下文学习做零样本VC | 零样本VC(韵律可适配codec) | codec引入韵律控制+上下文学习 | 零样本VC韵律可控 | codec设计+上下文长度依赖 |
| DS-Codec: Dual-Stage Training with Mirror-to-NonMirror Architecture Switching for Speech Codec. | 2505.24314 | DS-Codec:镜像/非镜像架构切换的双阶段训练codec | 高质量语音codec(TTS) | 双阶段训练+镜像-非镜像架构切换 | 高质量语音codec | 双阶段训练成本 |
| PeriodCodec: A Pitch-Controllable Neural Audio Codec Using Periodic Signals for Singing Voice Synthesis. | n/a | PeriodCodec:解码器引入显式周期信号做F0可控codec(歌唱) | 歌唱合成(F0可控codec) | 显式周期信号入解码器、F0可控 | 适合歌唱合成F0控制 | 专为歌唱,通用性有限 |
| Unlocking Temporal Flexibility: Neural Speech Codec with Variable Frame Rate. | n/a | 可变帧率(VFR)神经语音codec(按信息密度自适应码率) | 高效编解码(可变帧率) | 按静音/发声信息密度变帧率、自适应码率 | 更省码率/token、利实时 | VFR机制复杂、对齐难 |
| SPCODEC: Split and Prediction for Neural Speech Codec. | n/a | SPCODEC:时域端到端潜在分割+预测方案的codec(跨频带相关) | 高效神经编解码 | 潜在分割+预测利用跨频带相关 | 更高效、可解释性增强 | 分割-预测设计复杂 |
| Probing the Robustness Properties of Neural Speech Codecs. | 2505.24248 | 系统探查神经语音codec在噪声环境下的鲁棒性 | codec鲁棒性分析 | 系统评测codec噪声鲁棒性 | 揭示codec鲁棒性短板、指引改进 | 分析性,非新模型 |
| LSCodec: Low-Bitrate and Speaker-Decoupled Discrete Speech Codec. | 2410.15764 | LSCodec:低码率+说话人解耦的离散语音codec(说话人扰动训练) | 低码率解耦编解码 | 多阶段无监督+说话人扰动解耦 | 低码率+去冗余音色、利LM | 解耦训练复杂 |
| Bringing Interpretability to Neural Audio Codecs. | 2506.04492 | 为神经音频codec引入可解释性(语义单元对齐/探针) | 可解释编解码 | 对齐语义单元/探针提升声学单元可解释 | codec单元可解释 | 可解释与重建质量权衡 |
| Benchmarking Neural Speech Codec Intelligibility with SITool. | 2506.01731 | SITool:神经语音codec可懂度主观评测工具(DRT/MRT标准化) | codec可懂度评测 | 标准化可懂度测试工具 | 补足质量外可懂度评测 | 工具型,非模型 |
| LombardTokenizer: Disentanglement and Control of Vocal Effort in a Neural Speech Codec. | n/a | LombardTokenizer:基于SpeechTokenizer多阶段量化解耦发声努力度(vocal effort) | 发声努力度可控codec | codec解耦vocal effort维度 | 可调控发声努力度、利合成/VC | 多阶段量化复杂 |
### 【编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| NanoCodec: Towards High-Quality Ultra Fast Speech LLM Inference | 2508.05835 | 编解码、LLM、自回归 | codec | 高效/轻量 | 音质、效率、速度 | 待核 |
| ParaNoise-SV: Integrated Approach for Noise-Robust Speaker Verification with Parallel Joint Learning of Speech Enhancement and Noise Extraction | 2508.07219 | 待核 | enhancement | 统一/联合建模 | 鲁棒性 | 待核 |
| Leveraging Mamba with Full-Face Vision for Audio-Visual Speech Enhancement | 2508.13624 | Mamba | enhancement、target speech | 高效/轻量 | 音质、可懂度、效率 | 评测局限、限于 |
| Lightweight Front-end Enhancement for Robust ASR via Frame Resampling and Sub-Band Pruning | 2509.21833 | 待核 | 增强/分离/修复、ASR/识别 | 轻量/高效、数据集/基准 | 鲁棒性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |

## 备注

- **枚举完整性**: 以 DBLP Interspeech 2025 全量 1181 篇为基础(非关键词采样), 经子方向关键词初筛 225 篇后人工逐篇定子方向, 剔除纯 ASR/TTS/检测/分类/水印/心音肺音等, 收录 145 篇 A 组论文。
- **arXiv 覆盖**: 145 篇中 83 篇有 arXiv 预印本(57.2%), 62 篇仅 ISCA proceedings(标 n/a)。Interspeech 工程系统/挑战赛/短文类论文多无预印本, 属常态。
- **子方向分布**: VC/克隆 30、语音编辑 4、生成式增强/去噪/去混响 52、带宽扩展/修复/补全 6、说话人分离/分离/TSE 36、神经语音编解码 17。
- **挑战赛相关**: URGENT 2025 语音增强挑战(含 overview + 多个提交系统)为 2025 增强子方向主轴; MISP 2025 挑战驱动音视频说话人日志多篇。
- **趋势观察**: (1) 生成式增强全面转向扩散/流匹配/Schrödinger 桥, 并强调少步化与一致性模型; Mamba/xLSTM/KAN 等新骨干被引入 SE。(2) codec 子方向聚焦低帧率/低码率/解耦(语义/声学/说话人/vocal effort 分离)与可变帧率, 直接服务于 speech-LM。(3) VC 子方向零样本+解耦(离散 token/上下文学习)为主流, 情感VC(EVC)与歌唱VC(SVC)分支活跃, 出现人→动物/怪物等非人声VC新场景。(4) 分离/TSE 关注未知人数、免注册、流式在线与多模态(视听); 端到端日志(EEND-TA)在多数据集刷SOTA。
- **反验方法**: 全部 arXiv ID 用 HTML abs 页(`arxiv.org/abs/<ID>`)核对, 未用 WebFetch(本环境对 arxiv.org 拦截), 未用 arXiv API 连发(易触发账号级 429)。1 篇(aTENNuate)arXiv 标题与 DBLP 存在前缀差异, 经 HTML 反验匹配后纳入(2409.03377); 1 篇(Mamba-based Hybrid Model for Speech Enhancement)arXiv 检索仅命中近似标题, 确认无对应预印本, 标 n/a。
- **同类文件**: 见本目录 `ICASSP-2026-A.md` / `ICML-2025.md` / `CHiME-2025.md` 等同格式调研表。