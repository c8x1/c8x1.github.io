# ACM MM 2025 (语音相关)

> 归属: 混合（编创 67 / 非编创 24） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


> 检索日期 2026-06-25 | 论文数 76 | 范围: ACM Multimedia 2025 (Dublin, 2025-10-27~31) 语音相关论文(音视频编辑语音侧/语音多模态/语音生成·编辑·增强/audio-video 对齐); 排除纯ASR、纯TTS(纯端到端TTS标为边界)、纯视觉、纯音乐MIR。arXiv ID 经 arXiv HTML abs 页反验(标题匹配); 无 arXiv 版本标 n/a, 绝不编造。

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| **A. 语音驱动数字人/说话头与协同动作 (17)** | | | | | | |
| FlowDubber: Movie Dubbing with LLM-based Semantic-aware Learning and Flow Matching based Voice Enhancing. | 2505.01263 | LLM语义感知+流匹配语音增强的电影配音 | 影视配音/语音增强 | LLM语义学习+流匹配语音增强 | 配音音质与语义一致性提升 | 依赖LLM,延迟与算力高 |
| PESTalk: Speech-Driven 3D Facial Animation with Personalized Emotional Styles. | 2512.05121 | 语音驱动个性化情感3D人脸动画 | 说话头/人脸动画 | 个性化情感风格 | 情感表达自然度提升 | 个性化需定制数据 |
| EventLip: Enhancing Event-Based Lip Reading via Frequency-Aware Spatiotemporal Hypergraph Modeling. | n/a | 事件相机唇读的频域时空超图建模 | 唇读/音视频语音识别 | 事件相机+频域超图 | 高频细节唇读提升 | 事件相机硬件门槛高 |
| UniTalker: Conversational Speech-Visual Synthesis. | 2508.04585 | 会话式语音-视觉合成 | 对话数字人/音视频生成 | 会话式语音-视觉联合合成 | 对话数字人自然度 | 会话连贯性挑战 |
| PTalker: Personalized Speech-Driven 3D Talking Head Animation via Style Disentanglement and Modality Alignment. | 2512.22602 | 风格解耦+模态对齐的个性化语音驱动3D说话头 | 说话头/人脸动画 | 风格解耦+模态对齐 | 个性化自然度提升 | 3D渲染与对齐复杂 |
| DualDub: Video-to-Soundtrack Generation via Joint Speech and Background Audio Synthesis. | 2507.10109 | 联合语音与背景音频的视频到声轨生成 | 视频配音/声轨生成 | 联合语音+背景音频生成 | 声轨完整度提升 | 语音与背景耦合控制难 |
| EchoMask: Speech-Queried Attention-based Mask Modeling for Holistic Co-Speech Motion Generation. | 2504.09209 | 语音查询注意力掩码建模的整体协同动作生成 | 协同动作/数字人 | 语音查询掩码建模 | 整体动作协调性 | 多模态动作一致性难 |
| KDTalker++: Controllable Talking Portrait Generation with Audio, Text, and Expression Editing. | n/a | 音频/文本/表情可控编辑的说话人生成++ | 说话人/数字人生成 | 多模态可控编辑 | 可控说话人生成 | 多控制融合复杂 |
| Ditto: Motion-Space Diffusion for Controllable Realtime Talking Head Synthesis. | 2411.19509 | 运动空间扩散的实时可控说话头合成 | 说话头/数字人 | 运动空间扩散+实时 | 实时可控说话头 | 实时性约束质量 |
| MEDTalk: Multimodal Controlled 3D Facial Animation with Dynamic Emotions by Disentangled Embedding. | 2507.06071 | 解耦嵌入的多模态可控3D人脸动画(动态情感) | 人脸动画/数字人 | 解耦嵌入+动态情感 | 情感可控动画 | 多模态控制复杂 |
| Contextual Gesture: Co-Speech Gesture Video Generation through Context-aware Gesture Representation. | 2502.07239 | 上下文感知手势表征的协同语音手势视频生成 | 协同手势/数字人 | 上下文感知手势表征 | 手势与语音协调 | 长时序一致性难 |
| Disentangle Identity, Cooperate Emotion: Correlation-Aware Emotional Talking Portrait Generation. | 2504.18087 | 身份解耦+情感协作的相关性感知情感说话人生成 | 情感说话人/数字人 | 身份解耦+情感协作 | 情感表达与身份保持 | 解耦不彻底易串扰 |
| Talking Head Generation via Viewpoint and Lighting Simulation Based on Global Representation. | n/a | 基于全局表征的视角与光照模拟说话头生成 | 说话头/数字人 | 视角+光照全局模拟 | 多视角光照鲁棒 | 全局表征训练数据需求 |
| FLAP: Fully-controllable Audio-driven Portrait Video Generation through 3D head conditioned diffusion model. | n/a | 3D头部条件扩散的全可控音频驱动肖像视频生成 | 音频驱动肖像/数字人 | 3D头部条件扩散+全可控 | 可控肖像视频生成 | 3D条件增加计算 |
| Versatile Multimodal Controls for Expressive Talking Human Animation. | n/a | 表达性说话人动画的多模态多功能控制 | 说话人动画/数字人 | 多模态多功能控制 | 可控表达性动画 | 多功能控制融合难 |
| FantasyTalking: Realistic Talking Portrait Generation via Coherent Motion Synthesis. | 2504.04842 | 连贯运动合成的真实说话人像生成 | 说话人像/数字人 | 连贯运动合成 | 真实感说话人像 | 长时序连贯性挑战 |
| Multiple Appropriate Facial Reaction Generation Based on Multi-View Transformation of Speaker Video. | n/a | 基于说话人视频多视图变换的多合适面部反应生成 | 对话反应/数字人 | 多视图变换+多反应 | 对话反应自然多样 | 多反应一致性难 |
| **B. 语音生成/编解码/语音大模型 (8)** | | | | | | |
| MoTAS: MoE-Guided Feature Selection from TTS-Augmented Speech for Enhanced Multimodal Alzheimer's Early Screening. | 2508.20513 | MoE特征选择+TTS增广语音的多模态阿尔茨海默早筛 | 病理语音/早筛 | MoE特征选择+TTS增广 | 早筛可及性提升 | 病理语音数据稀缺 |
| Pseudo-Autoregressive Neural Codec Language Models for Efficient Zero-Shot Text-to-Speech Synthesis. | 2504.10352 | 伪自回归神经编解码语言模型的零样本TTS | 零样本TTS/编解码 | 伪自回归+高效推理 | 零样本TTS效率提升 | 属纯TTS,边界论文 |
| FELLE: Autoregressive Speech Synthesis with Token-Wise Coarse-to-Fine Flow Matching. | 2502.11128 | token级粗到细流匹配的自回归语音合成 | 语音合成 | token级粗到细流匹配 | 合成质量与速度平衡 | 属纯TTS,边界论文 |
| Speech Token Prediction via Compressed-to-fine Language Modeling for Speech Generation. | n/a | 压缩到精细语言建模的语音token预测生成 | 语音生成/编解码 | 压缩到精细分层token预测 | 生成可控性提升 | 属纯生成,边界论文 |
| EmoVoice: LLM-based Emotional Text-To-Speech Model with Freestyle Text Prompting. | 2504.12867 | LLM情感TTS+自由文本提示 | 情感TTS | LLM+自由文本提示 | 情感可控TTS | 属纯TTS,边界论文 |
| AlignDiT: Multimodal Aligned Diffusion Transformer for Synchronized Speech Generation. | 2504.20629 | 多模态对齐扩散变压器的同步语音生成 | 同步语音生成(音视频对齐) | 多模态对齐扩散 | 音视频同步生成 | 属纯语音生成,边界论文 |
| SMIIP-NV: A Multi-Annotation Non-Verbal Expressive Speech Corpus in Mandarin for LLM-Based Speech Synthesis. | n/a | 普通话多标注非言语表达性语音语料(供LLM TTS) | 语音语料/非言语 | 多标注非言语表达 | 支撑情感/非言语TTS | 语种与规模受限 |
| MuCodec: Ultra Low-Bitrate Music Codec for Music Generation. | 2409.13216 | 超低码率音乐编解码器(用于音乐生成) | 音频编解码 | 超低码率音乐codec | 低带宽音乐传输/生成 | 音乐(非语音),边界论文 |
| **C. 语音增强/分离/空间音频 (7)** | | | | | | |
| From Continuous to Discrete: Cross-Domain Collaborative General Speech Enhancement via Hierarchical Language Models. | 2507.19062 | 分层语言模型驱动的跨域通用语音增强 | 语音增强/降噪 | 连续-离散分层表征+跨域协作 | 嘈杂/跨域场景下增强鲁棒性 | 依赖语言模型先验,计算开销大 |
| AV-RISE: Hierarchical Cross-Modal Denoising for Learning Robust Audio-Visual Speech Representation. | n/a | 分层跨模态去噪的鲁棒音视频语音表征 | 音视频语音表征 | 分层跨模态去噪 | 噪声下表征鲁棒性 | 去噪策略对干净数据可能过强 |
| A Multimodal Evaluation Framework for Spatial Audio Playback Systems: From Localization to Listener Preference. | n/a | 空间音频回放系统的多模态评测框架 | 空间音频评测 | 定位到听感偏好的多模态评测 | 空间音频主客观评测统一 | 评测指标主观性较强 |
| CCStereo: Audio-Visual Contextual and Contrastive Learning for Binaural Audio Generation. | 2501.02786 | 音视频上下文对比学习的双耳音频生成 | 空间/双耳音频生成 | 上下文+对比学习 | 双耳空间音频生成质量提升 | 依赖视觉先验 |
| Direction-Aware Room Impulse Response Estimation for Immersive Audio Rendering in Real Environments. | n/a | 方向感知的房间冲激响应估计用于沉浸式音频渲染 | 空间音频/混响 | 方向感知RIR估计 | 真实环境沉浸式渲染 | 真实环境估计误差累积 |
| SonicGauss: Position-Aware Physical Sound Synthesis for 3D Gaussian Representations. | 2507.19835 | 3D高斯表征的位置感知物理声音合成 | 3D场景声音合成 | 位置感知物理合成 | 空间声音真实感 | 依赖3D高斯重建 |
| SpA2V: Harnessing Spatial Auditory Cues for Audio-driven Spatially-aware Video Generation. | 2508.00782 | 空间听觉线索驱动的空间感知视频生成 | 音频驱动视频生成 | 空间听觉线索+空间感知 | 音频空间感知视频 | 空间线索建模复杂 |
| **D. 音视频伪造检测与防御(音频侧) (15)** | | | | | | |
| ALDEN: Dual-Level Disentanglement with Meta-learning for Generalizable Audio Deepfake Detection. | n/a | 双层解耦+元学习的可泛化音频deepfake检测 | 音频伪造检测 | 双层解耦+元学习泛化 | 跨伪造方法泛化提升 | 元学习训练复杂 |
| PhonoFence: A Cross-Task Defense Framework for DeepFake via Phoneme-Level Adversarial Perturbations. | n/a | 音素级对抗扰动的跨任务deepfake防御 | deepfake防御 | 音素级对抗扰动 | 跨任务防御 | 扰动可能影响正常语音质量 |
| Query-Based Audio-Visual Temporal Forgery Localization with Register-Enhanced Representation Learning. | n/a | 查询式音视频时序伪造定位+寄存器增强表征 | 音视频伪造定位 | 查询式定位+寄存器增强 | 细粒度伪造定位 | 定位精度依赖查询质量 |
| SepVAMark: Deep Separable Visual-Audio Fusion Watermarking for Source Tracing and Deepfake Detection. | n/a | 可分离视音频融合水印用于溯源与deepfake检测 | 水印/溯源/检测 | 可分离视音频水印 | 溯源+检测一体 | 水印鲁棒性受压缩影响 |
| Audio-Visual Asynchrony Mitigation: Cross-Modal Alignment and Feature Reconstruction for Deepfake Detection. | n/a | 音视频异步缓解的跨模态对齐+特征重构用于deepfake检测 | 音视频伪造检测 | 异步缓解+特征重构 | 音视频不同步伪造检测 | 异步建模对真同步敏感 |
| Generalizable Audio Deepfake Detection via Risk-Aware Style Alignment and Structural Empirical Risk Minimization. | n/a | 风险感知风格对齐+结构经验风险最小化的可泛化音频deepfake检测 | 音频伪造检测 | 风险感知风格对齐+SERM | 跨域泛化提升 | 风险估计需标注 |
| WhiADD: Semantic-Acoustic Fusion for Robust Audio Deepfake Detection. | n/a | 语义-声学融合的鲁棒音频deepfake检测 | 音频伪造检测 | 语义+声学双融合 | 检测鲁棒性提升 | 双分支计算增加 |
| SiFMimicEvader: Evading Fake Voice Detection with Adversarial Neural Mimicry Attacks. | n/a | 对抗神经模仿攻击规避伪语音检测 | 伪语音检测(攻击) | 对抗神经模仿 | 暴露检测漏洞 | 红队视角,防御需补强 |
| Enkidu: Universal Frequential Perturbation for Real-Time Audio Privacy Protection against Voice Deepfakes. | 2507.12932 | 通用频域扰动的实时音频隐私保护防voice deepfake | 音频隐私保护 | 通用频域扰动+实时 | 防voice deepfake窃取 | 扰动可听性与保护权衡 |
| ALLM4ADD: Unlocking the Capabilities of Audio Large Language Models for Audio Deepfake Detection. | 2505.11079 | 释放音频大语言模型能力用于音频deepfake检测 | 音频伪造检测 | 音频LLM用于检测 | 利用LLM语义能力 | LLM推理成本高 |
| Multi-level SSL Feature Gating for Audio Deepfake Detection. | n/a | 多层SSL特征门控的音频deepfake检测 | 音频伪造检测 | 多层SSL特征门控 | 检测细粒度提升 | SSL特征依赖预训练 |
| AV-Deepfake1M++: A Large-Scale Audio-Visual Deepfake Benchmark with Real-World Perturbations. | 2507.20579 | 大规模音视频deepfake基准(真实扰动)++ | 音视频伪造检测基准 | 大规模+真实扰动 | 鲁棒评测基准 | 数据规模与标注成本 |
| HOLA: Enhancing Audio-visual Deepfake Detection via Hierarchical Contextual Aggregations and Efficient Pre-training. | 2507.22781 | 分层上下文聚合+高效预训练的音视频deepfake检测 | 音视频伪造检测 | 分层聚合+高效预训练 | 检测精度与效率 | 预训练依赖数据 |
| Pindrop it! Audio and Visual Deepfake Countermeasures for Robust Detection and Fine-Grained Localization. | n/a | 音视频deepfake对策:鲁棒检测与细粒度定位 | 音视频伪造检测/定位 | 鲁棒检测+细粒度定位 | 检测+定位一体 | 定位粒度受限 |
| KLASSify to Verify: Audio-Visual Deepfake Detection Using SSL-based Audio and Handcrafted Visual Features. | n/a | SSL音频+手工视觉特征的音视频deepfake检测 | 音视频伪造检测 | SSL音频+手工视觉 | 轻量可解释检测 | 手工特征表达有限 |
| **E. 音视频多模态对齐/理解/大模型 (17)** | | | | | | |
| OV-DAVEL: Towards Open-Vocabulary Dense Audio-Visual Event Localization in Untrimmed Videos. | n/a | 开放词表稠密音视频事件定位 | 音视频事件定位(未剪辑视频) | 开放词表+稠密定位 | 支持任意类别事件定位 | 开放词表召回受文本编码限制 |
| Retaining Temporal Semantics and Relation Topologies for Continual Weakly-Supervised Audio-Visual Video Parsing. | n/a | 持续弱监督音视频解析的时序语义与关系保持 | 音视频解析(持续学习) | 保持时序语义+关系拓扑 | 持续学习抗遗忘 | 弱监督精度上限有限 |
| Detect Any Sound: Open-Vocabulary Sound Event Detection with Multi-Modal Queries. | 2507.16343 | 多模态查询的开放词表声音事件检测 | 声音事件检测 | 多模态查询+开放词表 | 任意类别声音检测 | 查询设计影响召回 |
| Discrepancy-Aware Attention Network for Enhanced Audio-Visual Generalized Zero-Shot Learning. | n/a | 差异感知注意力的音视频广义零样本学习 | 音视频零样本识别 | 差异感知注意力 | 零样本泛化提升 | 零样本精度仍受限 |
| Ear with Eye: Lightweight Multimodal Audio-Visual Network Inspired by Bionic Structures. | n/a | 仿生结构轻量音视频网络 | 音视频多模态识别 | 仿生双通道轻量结构 | 轻量高效多模态 | 轻量化可能牺牲精度 |
| VisAug: Facilitating Speech-Rich Web Video Navigation and Engagement with Auto-Generated Visual Augmentations. | 2508.03410 | 语音丰富网络视频的自动视觉增强导航 | 视频可访问性/导航 | 自动视觉增强+语音 | 语音视频可访问性提升 | 生成增强质量不稳 |
| FreeAudio: Training-Free Timing Planning for Controllable Long-Form Text-to-Audio Generation. | 2507.08557 | 免训练时长规划的长文本到音频生成 | 文本到音频生成 | 免训练时长规划 | 长音频可控生成 | 生成质量依赖基础模型 |
| NEXUS-O: An Omni-Perceptive and -Interactive Model for Language, Audio, and Vision. | 2503.01879 | 语言-音频-视觉全感知交互模型 | 音视频多模态大模型 | 全感知+交互统一 | 多模态交互能力 | 统一模型训练成本高 |
| Enhancing Non-Core Language Instruction-Following in Speech LLMs via Semi-Implicit Cross-Lingual CoT Reasoning. | 2504.20835 | 半隐式跨语言CoT推理增强语音LLM非核心语言指令遵循 | 语音LLM/跨语言 | 半隐式跨语言CoT | 低资源语言指令能力 | CoT推理增加延迟 |
| Can Audio Language Models Listen Between the Lines? A Study on Metaphorical Reasoning via Unspoken. | n/a | 音频语言模型的隐喻推理(言外之意)研究 | 音频LLM评测 | 隐喻推理基准 | 揭示音频LLM理解边界 | 基准覆盖有限 |
| Valor32k-AVQA v2.0: Open-Ended Audio-Visual Question Answering Dataset and Benchmark. | n/a | 开放式音视频问答数据集v2.0 | 音视频问答基准 | 开放式AVQA基准 | 支撑AV理解评测 | 开放式评测难度大 |
| AudioAtlas: A Comprehensive and Balanced Benchmark Towards Movie-Oriented Text-to-Audio Generation. | n/a | 面向影视的文本到音频生成综合均衡基准 | 文本到音频评测基准 | 影视导向均衡基准 | 支撑T2A评测 | 影视场景覆盖受限 |
| AudioFab: Building A General and Intelligent Audio Factory through Tool Learning. | 2512.24645 | 工具学习构建通用智能音频工厂 | 音频智能体/工具学习 | 工具学习统一音频任务 | 通用音频能力 | 工具调度复杂 |
| HarmoniVox: Painting Voices to Match the Avatar's Soul. | n/a | 为化身匹配灵魂的语音绘制(语音-角色匹配) | 语音-虚拟角色匹配 | 语音与角色人格匹配 | 角色语音一致性 | 匹配主观性较强 |
| CatchPhrase: EXPrompt-Guided Encoder Adaptation for Audio-to-Image Generation. | 2507.18750 | EXPrompt引导编码器适配的音频到图像生成 | 音频到图像生成 | EXPrompt+编码器适配 | 音频驱动视觉创作 | 跨模态语义对齐难 |
| AV-DiT: Taming Image Diffusion Transformers for Efficient Joint Audio and Video Generation. | 2406.07686 | 驯服图像扩散Transformer的高效联合音视频生成 | 联合音视频生成 | 扩散Transformer联合生成 | 音视频一体生成 | 联合生成计算密集 |
| AudioGenie: A Training-Free Multi-Agent Framework for Diverse Multimodality-to-Multiaudio Generation. | n/a | 免训练多agent多模态到多音频生成 | 多模态到音频生成 | 免训练+多agent | 多样化音频生成 | 依赖基础模型能力 |
| **F. 音乐生成/编辑/编码(语音邻接) (6)** | | | | | | |
| Multi-Accent Mandarin Dry-Vocal Singing Dataset: Benchmark for Singing Accent Recognition. | 2512.07005 | 多口音普通话干声演唱数据集(演唱口音识别基准) | 演唱语料/口音 | 多口音干声基准 | 支撑演唱口音研究 | 仅普通话,规模有限 |
| MelodyEdit: Zero-shot Music Editing with Disentangled Inversion Control. | n/a | 解耦反转控制的零样本音乐编辑 | 音乐编辑 | 零样本+解耦反转 | 免训练音乐编辑 | 音乐(非语音),边界论文 |
| MusFlow: Multimodal Music Generation via Conditional Flow Matching. | 2504.13535 | 条件流匹配的多模态音乐生成 | 音乐生成 | 多模态+条件流匹配 | 可控音乐生成 | 音乐(非语音),边界论文 |
| Spatial-Temporal Decomposition and Alignment in Controllable Video-to-Music Generation. | n/a | 可控视频到音乐生成的时空分解与对齐 | 视频到音乐生成 | 时空分解+对齐 | 视频音乐同步 | 音乐(非语音),边界论文 |
| Controllable Video-to-Music Generation with Multiple Time-Varying Conditions. | n/a | 多时变条件可控视频到音乐生成 | 视频到音乐生成 | 多时变条件控制 | 细粒度可控配乐 | 音乐(非语音),边界论文 |
| RoboSax Melody Slot Machine. | n/a | RoboSax旋律老虎机(机器人萨克斯旋律交互) | 音乐交互/装置 | 机器人旋律交互 | 创意音乐交互 | 非语音,边界/装置论文 |
| **G. 说话人/副语言/语音评测与语料 (6)** | | | | | | |
| APG-MOS: Auditory Perception Guided-MOS Predictor for Synthetic Speech. | 2504.20447 | 听觉感知引导的合成语音MOS预测 | 语音质量评测(TTS) | 以听觉感知特征引导MOS预测 | 自动评估替代人工评听 | 评测泛化依赖训练分布 |
| VAEmo: Efficient Representation Learning for Visual-Audio Emotion With Knowledge Injection. | 2505.02331 | 知识注入的视音频情感高效表征 | 音视频情感识别 | 知识注入+高效VAE | 情感识别精度提升 | 知识注入依赖外部库 |
| Cued-Agent: A Collaborative Multi-Agent System for Automatic Cued Speech Recognition. | 2508.00391 | 多agent协作的自动手语辅助语音识别(Cued Speech) | 手语辅助语音识别 | 多agent协作 | 特殊场景语音识别可用性 | Cued Speech语种受限 |
| Adaspeaker: Learning Discriminative Speaker Representations with Gradient-Aware Adaptive Scaling. | n/a | 梯度感知自适应缩放的可判别说话人表征 | 说话人识别/表征 | 梯度感知自适应缩放 | 说话人识别鲁棒性 | 说话人(非语音生成),边界 |
| MindSpeak: A Real-Time BCI System for Silent Speech. | n/a | 实时BCI无声语音系统 | 无声语音/BCI | 实时BCI解码 | 无声语音通信 | BCI硬件门槛高 |
| Pretraining Large Brain Language Model for Active BCI: Silent Speech. | n/a | 主动BCI大语言模型预训练:无声语音 | 无声语音/BCI | 大语言模型预训练 | 无声语音解码 | BCI信号个体差异大 |
### 【非编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| ECTSpeech: Enhancing Efficient Speech Synthesis via Easy Consistency Tuning | 2510.05984 | 扩散、蒸馏 | speech synthesis、denois | 高效/轻量 | 音质、效率 | 待核 |
| AD-AVSR: Asymmetric Dual-stream Enhancement for Robust Audio-Visual Speech Recognition | 2508.07608 | 强化学习 | 增强/分离/修复、语音多模态 | 统一/端到端框架、数据集/基准 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |
### 【编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| ECTSpeech: Enhancing Efficient Speech Synthesis via Easy Consistency Tuning | 2510.05984 | 扩散、蒸馏 | speech synthesis、denois | 高效/轻量 | 音质、效率 | 待核 |
| AD-AVSR: Asymmetric Dual-stream Enhancement for Robust Audio-Visual Speech Recognition | 2508.07608 | 强化学习 | 增强/分离/修复、语音多模态 | 统一/端到端框架、数据集/基准 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |

## 备注

- **枚举来源**: DBLP `dblp.org/db/conf/mm/mm2025.html` 全量 1620 篇 ACM MM 2025 论文,经语音/音频信号关键词筛选+人工去噪(剔除纯视觉/纯LLM/纯遥感/纯音乐MIR)得 76 篇语音相关论文。ACM DL 作为补充入口。
- **arXiv ID 反验**: 每个候选 ID 用 `arxiv.org/abs/<ID>` HTML 页核对标题(方法B,因 arXiv API `export.arxiv.org` 在批量检索中触发全局 429,改用 HTML abs 页更抗限流)。38 篇验证通过(标题或首字母缩写匹配),38 篇未检索到 arXiv 版本标 `n/a`(ACM MM 多为 ACM DL 独占,无 arXiv 预印本属常态)。
- **边界标注**: 标注『属纯TTS/音乐(非语音)/边界论文』者为任务要求排除方向但带有多模态/编辑/编解码角度,保留供参考;`EmoVoice`/`FELLE`/`Pseudo-Autoregressive`/`Speech Token Prediction`/`AlignDiT` 属纯TTS合成;`MuCodec`/`MelodyEdit`/`MusFlow`/`Video-to-Music`/`RoboSax` 属音乐(非语音);`Adaspeaker` 属说话人识别(非生成)。
- **标题变体**: `NEXUS-O`(arXiv 标题为 `Nexus:`)、`AV-DiT`(arXiv 副标题为 `Efficient Audio-Visual Diffusion Transformer`)经核验为同一论文(arXiv 版标题措辞不同)。
- **未核实项**: 38 篇 `n/a` 非核实失败,而是无 arXiv 版本;若后续补充可重跑 `arxiv.org/abs` 反验。
- **会议信息**: ACM MM 2025,第33届,爱尔兰都柏林,2025-10-27~31。
