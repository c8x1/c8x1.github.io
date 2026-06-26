# NeurIPS 2025 (语音相关)

> 归属: 混合（编创 57 / 非编创 30） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


检索日期 2026-06-25 | 论文数 64 | 范围：NeurIPS 2025（Conference，2025年12月）全量枚举 5286 篇，筛选保留 VC/语音编辑/生成式增强/分离/情感/韵律/口音/匿名化/编解码/speech-LM/指令式agent/paralinguistic/语音多模态，排除纯 ASR、纯 TTS 及与语音无关的通用多模态/图像/视频工作。枚举入口：OpenReview api2（NeurIPS.cc/2025/Conference，5286 条 accepted notes，分页 limit=1000×6 取全量去重）。arXiv ID 全部经 arxiv.org/abs/<ID> HTML abs 页标题反验（不匹配即记 n/a，绝不编造）；5 篇未检出 arXiv（n/a），其余 59 篇核对一致。

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| **A. 语音生成 / speech-LM（spoken language model）** | | | | | | |
| Metis: A Foundation Speech Generation Model with Masked Generative Pre-training | 2502.03128 | 掩码生成式预训练的统一语音生成基础模型；SSL token + acoustic token 双离散表示 | 多任务语音生成 | 预训练+微调范式（非任务特定）；双离散表示联合掩码建模 | 统一框架跨任务语音生成质量 | 依赖大规模无标注语音，下游任务适配数据需求 |
| Efficient Speech Language Modeling via Energy Distance in Continuous Latent Space (SLED) | 2505.13181 | 连续潜空间 + 能量距离目标的 speech LM；绕开 RVQ | speech LM 建模 | 以解析能量距离替代离散量化建模连续自回归分布 | 训练效率/免 RVQ | 连续表示建模复杂度，与离散 token 生态兼容性待验 |
| SALMONN-omni: A Standalone Speech LLM without Codec Injection for Full-duplex Conversation | 2505.17060 | 全双工对话 speech LLM；无 codec 注入的端到端 | 全双工语音对话 | 去除 VAD/中断器/多 LLM 模块，单模型处理双工+回声消除+barge-in | 对话低延迟/自然轮替 | 单模型承担多职责，复杂语境鲁棒性待验 |
| FastLongSpeech: Enhancing Large Speech-Language Models for Efficient Long-Speech Processing | 2507.14815 | 大 speech-LM 高效长语音处理 | 长篇语音理解/生成 | 针对长语音高效处理设计（缓解长语音数据稀缺） | 长语音处理效率/上下文 | 长语音评测基准与数据有限 |
| VITA-Audio: Fast Interleaved Audio-Text Token Generation for Efficient Large Speech-Language Model | 2505.03739 | 交错音频-文本 token 快速生成；端到端大 speech 模型 | 低延迟语音交互 | 降低首音频 token 延迟的交错 token 生成 | 流式首音延迟 | 端到端训练成本，多轮对话稳定性 |
| MoonCast: High-Quality Zero-Shot Podcast Generation | 2503.14345 | 零样本长篇多说话人自发对话播客生成 | 长篇多说话人对话语音生成 | 将 TTS 扩展到长、多说话人、自发对话播客场景 | 零样本长对话质量 | 长篇连贯性与说话人一致性挑战 |
| CoVoMix2: Advancing Zero-Shot Dialogue Generation with Fully Non-Autoregressive Flow Matching | 2506.00885 | 全非自回归 flow matching 的零样本多说话人对话生成 | 多说话人对话/播客生成 | 全 NAR flow matching 同时建模重叠语音与说话人一致性 | 对话生成效率/重叠语音 | NAR 质量与自回归差距，长对话一致性 |
| StreamFlow: Streaming Audio Generation from Discrete Tokens via Streaming Flow Matching | 2506.23986 | 因果流式 flow matching 从离散 token 实时生成音频 | 实时/流式语音生成 | 因果流式 flow matching 替代多步 FM 用于流式生成 | 实时低延迟生成 | 流式质量与离线差距，因果建模约束 |
| Word-Level Emotional Expression Control in Zero-Shot Text-to-Speech Synthesis | 2509.24629 | 零样本 TTS 词级情感表达控制 | 情感语音生成 | 词级情感过渡建模（突破句级情感限制） | 词级情感可控性 | 多情感过渡建模复杂，词级标注稀缺 |
| SongBloom: Coherent Song Generation via Interleaved Autoregressive Sketching and Diffusion Refinement | 2506.07634 | 交错自回归草图+扩散精修的连贯歌曲生成 | 歌曲生成（人声+伴奏） | AR 草图保全局结构 + 扩散精修保局部保真 | 歌曲结构连贯性/音乐性 | 歌曲结构-音质权衡，长曲稳定性 |
| **B. 语音/音频编解码（codec / neural codec）** | | | | | | |
| FocalCodec: Low-Bitrate Speech Coding via Focal Modulation Networks | 2502.04465 | 低码率单 codebook 语音 codec；focal modulation | 低码率语音编码 | 单 codebook 同时保语义+声学（替代多 codebook），低码率 | 低码率质量/简化设计 | 单 codebook 信息容量上限，跨域泛化 |
| TaDiCodec: Text-aware Diffusion Speech Tokenizer for Speech Language Modeling | 2508.16790 | 文本感知扩散 Transformer 语音 tokenizer | speech LM 离散化 | 单阶段文本感知扩散 tokenizer（免多 RVQ/免外部语义蒸馏/免两阶段） | tokenizer 训练效率/语义对齐 | 扩散 tokenizer 推理开销 |
| **C. 语音分离 / 增强 / 信号恢复 / 目标提取** | | | | | | |
| ZeroSep: Separate Anything in Audio with Zero Training | 2505.23625 | 零训练任意音频分离；基于现成基础模型 | 通用音频/语音分离 | 零训练即可分离任意源（无需分离训练数据） | 免训练分离可用性 | 依赖基础模型先验，复杂混合分离质量 |
| Target Speaker Extraction through Comparing Noisy Positive and Negative Audio Enrollments | 2502.16611 | 比较噪声正/负注册音频的目标说话人提取 | 噪声多说话人目标提取 | 用正负噪声注册对比提升目标说话人提取鲁棒性 | 噪声下目标提取鲁棒性 | 注册质量影响，负样本构造策略敏感 |
| Improving Target Sound Extraction via Disentangled Codec Representations with Privileged Knowledge Distillation | n/a | 解耦 codec 表示 + 特权知识蒸馏的目标声音提取 | 目标声音提取 | 解耦 codec 表示 + 特权知识蒸馏提升目标声音提取 | 目标声音提取质量 | 无 arXiv（未检出），细节待论文页确认 |
| E-BATS: Efficient Backpropagation-Free Test-Time Adaptation for Speech Foundation Models | 2506.07078 | 免反向传播测试时自适应；speech 基础模型 | 语音基础模型下游适配 | 无需反向传播的 TTA，降低适配计算 | 适配效率/部署成本 | 适配增益上限有限，复杂任务待验 |
| BNMusic: Blending Environmental Noises into Personalized Music | 2506.10754 | 将环境噪声融合进个性化音乐（声学掩蔽） | 环境噪声掩蔽/音频工程 | 个性化音乐掩蔽对齐噪声降低烦扰 | 噪声烦扰缓解 | 噪声-音乐对齐质量，主观偏好差异 |
| **D. 语音情感 / 表达 / paralinguistic / 脑语音解码** | | | | | | |
| Federated Dialogue-Semantic Diffusion for Emotion Recognition under Incomplete Modalities | 2511.00344 | 联邦+对话语义扩散的模态缺失情感识别 | 对话情感识别 | 联邦学习下扩散恢复缺失模态做情感识别 | 缺失模态下情感识别鲁棒性 | 联邦通信开销，扩散恢复质量 |
| Brain-tuning Improves Generalizability and Efficiency of Brain Alignment in Speech Models | 2510.21520 | brain-tuning 提升 speech 模型脑对齐的泛化与效率 | 语音-神经对齐 | brain-tuning 改进 speech 模型与脑响应对齐 | 语音脑对齐泛化/效率 | 脑数据稀缺，跨被试泛化有限 |
| Inner Speech as Behavior Guides: Steerable Imitation of Diverse Behaviors for Human-AI coordination | 2602.20517 | 内在语音（inner speech）作为行为引导的可控模仿 | 人机协调/行为模仿 | 以 inner speech 引导多样化行为可控模仿 | 行为多样性/可控性 | inner speech 信号获取与建模困难 |
| Time-Masked Transformers with Lightweight Test-Time Adaptation for Neural Speech Decoding | 2507.02800 | 时间掩码 Transformer + 轻量 TTA 的神经语音解码 | 脑机接口语音解码 | 时间掩码+轻量 TTA 提升神经语音解码跨日稳定 | 跨日解码稳定性 | 神经数据个体差异，解码词汇量受限 |
| A Scalable, Causal, and Energy Efficient Framework for Neural Decoding with Spiking Neural Networks | 2510.20683 | 可扩展因果节能 SNN 神经解码（含语音） | BCI 语音/运动解码 | SNN 因果节能框架用于实时神经解码 | 解码能效/实时性 | SNN 训练难度，精度对比 ANN 待提升 |
| CRRL: Learning Channel-invariant Neural Representations for High-performance Cross-day Decoding | n/a | 通道不变神经表示的跨日解码 | BCI 跨日语音/运动解码 | 学习通道不变表示缓解跨日神经不稳定 | 跨日解码稳定性 | 无 arXiv（未检出），细节待论文页确认 |
| Generalizable, Real-time Neural Decoding with Hybrid State-space Models | 2506.05320 | 混合状态空间模型的实时可泛化神经解码 | 实时神经/语音解码 | 混合 SSM 兼顾实时性与泛化 | 实时解码效率/泛化 | 混合架构复杂度，跨任务泛化待验 |
| **E. 语音编辑 / 自然语言指令编辑 / 水印安全** | | | | | | |
| SAO-Instruct: Free-form Audio Editing using Natural Language Instructions | 2510.22795 | 自由形式自然语言指令的音频编辑 | 指令式音频编辑 | 自由形式 NL 指令驱动音频编辑 | 编辑可控性/易用性 | 自由指令理解歧义，细粒度编辑精度 |
| ThinkSound: Chain-of-Thought Reasoning in Multimodal LLMs for Audio Generation and Editing | 2506.21448 | CoT 推理的多模态 LLM 音频生成与编辑 | 音频生成与编辑 | 以 chain-of-thought 推理增强音频生成/编辑的规划 | 生成/编辑规划合理性 | 推理链延迟，推理可靠性待验 |
| Robust Distortion-Free Watermark for Autoregressive Audio Generation Models | 2510.21115 | 自回归音频生成的无失真鲁棒水印 | 生成音频版权/溯源 | 针对自回归音频生成的无失真鲁棒水印 | 防伪/溯源/不可感知 | 鲁棒性-容量权衡，未知攻击待验 |
| E2E-VGuard: Adversarial Prevention for Production LLM-based End-To-End Speech Synthesis | 2511.07099 | 生产级端到端 LLM 语音合成的对抗防御 | 语音合成安全/反滥用 | 针对生产级端到端 LLM TTS 的对抗性防御 | 合成安全/防滥用 | 攻防对抗性，防御对合成质量影响 |
| **F. 语音/音频多模态（audio-language / audio-visual / speech 多模态）** | | | | | | |
| Audio Flamingo 3: Advancing Audio Intelligence with Fully Open Large Audio Language Models | 2507.08128 | 全开源大型音频-语言模型；音频智能 | 音频理解/推理/对话 | 全开源大音频 LLM，推进音频智能 | 开源可复现/音频问答 | 开源模型规模与闭源差距，长音频开销 |
| AudSemThinker: Enhancing Audio-Language Models Through Reasoning over Semantics of Sound | 2505.14142 | 声音语义推理增强的音频-语言模型 | 音频语义理解/推理 | 显式声音语义推理增强 ALM | 音频语义推理能力 | 推理链成本，语义标注依赖 |
| Mellow: a Small Audio Language Model for Reasoning | 2503.08540 | 小型音频语言模型带推理 | 边缘音频理解/推理 | 小模型具备音频推理能力 | 边缘部署/低算力推理 | 小模型推理上限，复杂推理受限 |
| ALMGuard: Safety Shortcuts and Where to Find Them as Guardrails for Audio-Language Models | 2510.26096 | 音频-语言模型安全护栏；安全捷径检测 | ALM 安全/内容过滤 | 识别 ALM 安全捷径并构建护栏 | ALM 安全性 | 安全-能力权衡，新型攻击覆盖 |
| AVCD: Mitigating Hallucinations in Audio-Visual Large Language Models through Contrastive Decoding | 2505.20862 | 对比解码缓解音视频 LLM 幻觉 | 音视频理解 | 对比解码降低 AV-LLM 幻觉 | 音视频问答可靠性 | 对比解码设计经验性，计算开销 |
| ARECHO: Autoregressive Evaluation via Chain-Based Hypothesis Optimization for Speech Multi-Metric Estimation | 2505.24518 | 自回归链式假设优化的语音多指标估计 | 语音质量评测 | 自回归链式假设优化做语音多指标自动评测 | 评测自动化/多指标 | 评测对齐人类主观，基准泛化 |
| JavisGPT: A Unified Multi-modal LLM for Sounding-Video Comprehension and Generation | 2512.22905 | 统一音视频 LLM；理解+生成 | 音视频理解与生成 | 统一 encoder-LLM-decoder + 同步感知融合 | 音视频联合理解/生成 | 双向生成一致性，同步精度 |
| SAVVY: Spatial Awareness via Audio-Visual LLMs through Seeing and Hearing | 2506.05414 | 音视频 LLM 空间感知 | 空间感知/音视频定位 | 音视频 LLM 空间感知能力 | 空间定位/场景理解 | 空间标注稀缺，3D 精度有限 |
| Seeing Sound, Hearing Sight: Uncovering Modality Bias and Conflict of AI Models in Sound Localization | 2505.11217 | 揭示 AI 模型声源定位的模态偏差与冲突 | 声源定位/多模态感知 | 揭示并分析声源定位中的模态偏差与冲突 | 多模态定位可靠性 | 偏差建模分析性，修正能力有限 |
| MAGNET: A Multi-agent Framework for Finding Audio-Visual Needles by Reasoning over Multi-Video Haystacks | 2506.07016 | 多 agent 框架跨多视频音视频检索推理 | 多视频音视频检索 | 多 agent 跨视频音视频"针"检索推理 | 复杂检索准确性 | 多 agent 协同成本，检索评测基准 |
| PreFM: Online Audio-Visual Event Parsing via Predictive Future Modeling | 2505.23155 | 在线音视频事件解析；预测未来建模 | 音视频事件解析 | 预测性未来建模做在线 AV 事件解析 | 在线解析时效性 | 在线预测误差累积，长时稳定 |
| Watch and Listen: Understanding Audio-Visual-Speech Moments with Multimodal LLM | 2505.18110 | 多模态 LLM 理解音视频-语音时刻 | 音视频语音时刻理解 | 统一音视频语音时刻理解 | 时刻定位/理解 | 时刻标注细粒度，跨域泛化 |
| Omni-R1: Reinforcement Learning for Omnimodal Reasoning via Two-System Collaboration | 2505.20256 | RL + 双系统协作的全模态推理（含音频） | 全模态推理 | 双系统架构 + RL 做全模态（视频-音频）推理 | 全模态推理能力 | 双系统复杂度，RL 训练成本 |
| OmniResponse: Online Multimodal Conversational Response Generation in Dyadic Interactions | 2505.21724 | 在线双人对话多模态响应生成（含语音反馈） | 双人对话响应生成 | 在线生成同步言语+非言语倾听反馈 | 对话自然度/反馈同步 | 在线生成延迟，双人同步复杂 |
| OpenOmni: Advancing Open-Source Omnimodal Large Language Models with Progressive Multimodal Alignment and Real-time Emotional Speech Synthesis | 2501.04561 | 全模态 LLM + 渐进多模态对齐 + 实时情感语音合成 | 全模态交互/情感语音合成 | 渐进式多模态对齐 + 开源全模态含实时情感 TTS | 开源全模态/情感语音交互 | 实时情感合成质量，对齐数据成本 |
| VITA-1.5: Towards GPT-4o Level Real-Time Vision and Speech Interaction | 2501.01957 | 实时视觉+语音交互多模态 LLM | 实时多模态交互 | 面向 GPT-4o 级实时视觉+语音交互 | 实时交互质量 | 实时性-质量权衡，多模态对齐 |
| **G. 音频生成（text-to-audio / video-to-audio / 空间音频）** | | | | | | |
| Audio Super-Resolution with Latent Bridge Models | 2509.17609 | 潜在桥接模型的音频超分辨率 | 音频超分/带宽扩展 | 潜在桥接模型做音频超分 | 音频带宽/清晰度 | 超分伪影，跨内容泛化 |
| Aligning What Matters: Masked Latent Adaptation for Text-to-Audio-Video Generation | n/a | 掩码潜空间适配的文本到音视频生成 | 文本到音视频生成 | masked latent adaptation 对齐 T2AV 生成 | T2AV 对齐质量 | 无 arXiv（未检出），细节待论文页确认 |
| Model-Guided Dual-Role Alignment for High-Fidelity Open-Domain Video-to-Audio Generation | 2510.24103 | 模型引导双角色对齐的开域视频到音频生成 | 视频到音频生成 | 双角色对齐提升开域 V2A 高保真 | V2A 保真/开域泛化 | 开域复杂场景保真，计算开销 |
| Unbiased Sliced Wasserstein Kernels for High-Quality Audio Captioning | 2502.05435 | 无偏切片 Wasserstein 核的音频字幕 | 音频字幕生成 | 无偏 SW 核提升音频字幕质量 | 音频字幕质量 | 核方法计算，字幕评测对齐 |
| **H. 语音/音频驱动数字人 / talking head / 舞蹈 / 手势** | | | | | | |
| OmniTalker: One-shot Real-time Text-Driven Talking Audio-Video Generation With Multimodal Style Mimicking | 2504.02433 | 单样本实时文本驱动 talking 音视频生成+风格模仿 | talking 音视频生成 | one-shot 实时文本驱动 + 多模态风格模仿 | 实时风格化 talking | 单样本泛化，实时质量 |
| MoCha: Towards Movie-Grade Talking Character Generation | 2503.23307 | 电影级 talking 角色生成 | 高质量 talking 角色 | 面向电影级质量的 talking 角色生成 | talking 影视级质量 | 电影级数据/算力需求 |
| VASA-3D: Lifelike Audio-Driven Gaussian Head Avatars from a Single Image | 2512.14677 | 单图音频驱动 3D Gaussian 头像 | 音频驱动数字人 | 单图生成栩栩如生 3D Gaussian 头像 | 数字人真实感/3D | 单图约束下泛化，3D 渲染开销 |
| Let Them Talk: Audio-Driven Multi-Person Conversational Video Generation | 2505.22647 | 音频驱动多人对话视频生成 | 多人对话视频生成 | 音频驱动多人对话场景视频生成 | 多人对话视频自然度 | 多人一致性/交互建模复杂 |
| OmniSync: Towards Universal Lip Synchronization via Diffusion Transformers | 2505.21448 | 扩散 Transformer 的通用唇音同步 | 唇音同步 | 扩散 Transformer 实现通用唇同步（免参考帧/免掩码修复） | 唇同步通用性/鲁棒性 | 扩散推理延迟，极端姿态退化 |
| Audio-Sync Video Generation with Multi-Stream Temporal Control | 2506.08003 | 多流时序控制的音频同步视频生成 | 音频同步视频生成 | 多流时序控制实现音视频同步 | 音视频同步精度 | 多流控制复杂度，长视频同步 |
| MEGADance: Mixture-of-Experts Architecture for Genre-Aware 3D Dance Generation | 2505.17543 | 风格感知 MoE 的音频驱动 3D 舞蹈生成 | 音频驱动舞蹈生成 | 风格感知 MoE 提升音频驱动舞蹈多样性 | 舞蹈风格多样性 | MoE 路由复杂，风格标注依赖 |
| 🎧MOSPA: Human Motion Generation Driven by Spatial Audio | 2507.11949 | 空间音频驱动的人体运动生成 | 空间音频驱动运动 | 空间音频（非单声道）驱动运动生成 | 空间感知运动自然度 | 空间音频标注稀缺，运动多样性 |
| PyraMotion: Attentional Pyramid-Structured Motion Integration for Co-Speech 3D Gesture Synthesis | n/a | 注意力金字塔运动整合的协同语音 3D 手势合成 | 协同语音手势生成 | 注意力金字塔结构整合运动做协语手势 | 手势自然度/时序对齐 | 无 arXiv（未检出），细节待论文页确认 |
| Toward Human Deictic Gesture Target Estimation | n/a | 人类指示性手势目标估计（协语音指示手势） | 协语音手势目标定位 | 估计协语音指示手势的目标 | 手势目标理解/人机交互 | 无 arXiv（未检出），2D 目标估计受限 |
| **I. 语音跨领域（手语/声学场景/生物声学/NeRF 声学）** | | | | | | |
| Bridging Sign and Spoken Languages: Pseudo Gloss Generation for Sign Language Translation | 2505.15438 | 伪 gloss 生成的手语到口语翻译 | 手语-口语翻译 | 伪 gloss 生成降低手语翻译对专家 gloss 标注依赖 | 手语翻译可访问性/降标注 | 伪 gloss 质量，跨语种泛化 |
| Advanced Sign Language Video Generation with Compressed and Quantized Multi-Condition Tokenization | 2506.15980 | 压缩量化多条件 token 化的手语视频生成 | 手语视频生成 | 多条件压缩量化 token 化提升手语视频生成 | 手语视频质量/身份保持 | 多条件 token 复杂度，长序列稳定 |
| Resounding Acoustic Fields with Reciprocity | 2510.20602 | 互易性原理的声场重建 | 声场建模/声学感知 | 利用互易性原理重建声场 | 声场重建精度 | 互易性假设约束，复杂环境泛化 |
| Can NeRFs "See" without Cameras? | 2505.22441 | NeRF 用 RF/音频信号（非相机）感知场景 | 声学/RF 场景感知 | NeRF 扩展到音频/RF 信号感知 | 非视觉场景感知 | 音频/RF 信号分辨率低 |
| WhAM: Towards A Translative Model of Sperm Whale Vocalization | 2512.02206 | 抹香鲸发声的翻译式模型 | 生物声学/跨物种交流 | 首个 Transformer 生成抹香鲸 coda 的翻译式模型 | 生物声学/跨物种理解 | 鲸鱼语义未知，生成-真实对齐难验证 |
| **J. 语音翻译 / 翻译（非纯 ASR）** | | | | | | |
| SimulMEGA: MoE Routers are Advanced Policy Makers for Simultaneous Speech Translation | 2509.01200 | MoE 路由做同时语音翻译策略制定 | 同时语音翻译 | MoE 路由作为同传策略制定者 | 同传质量-延迟平衡 | 多语对 MoE 训练成本，延迟下界 |
### 【非编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| DeepASA: An Object-Oriented Multi-Purpose Network for Auditory Scene Analysis | 2509.17247 | Transformer | separation、source separat | 统一/联合建模 | 鲁棒性 | 评测局限 |
| JEPA as a Neural Tokenizer: Learning Robust Speech Representations with Density Adaptive Attention | 2512.07168 | GAN、编解码、自监督 | codec | 统一/联合建模 | 鲁棒性、效率 | 待核 |
| MoME: Mixture of Matryoshka Experts for Audio-Visual Speech Recognition | 2510.04136 | 语言模型/自回归 | 语音多模态、ASR/识别 | 统一/端到端框架、鲁棒 | 鲁棒性、泛化 | 待核(数据/算力/特定语种/评测指标) |
### 【编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| DeepASA: An Object-Oriented Multi-Purpose Network for Auditory Scene Analysis | 2509.17247 | Transformer | separation、source separat | 统一/联合建模 | 鲁棒性 | 评测局限 |
| JEPA as a Neural Tokenizer: Learning Robust Speech Representations with Density Adaptive Attention | 2512.07168 | GAN、编解码、自监督 | codec | 统一/联合建模 | 鲁棒性、效率 | 待核 |
| MoME: Mixture of Matryoshka Experts for Audio-Visual Speech Recognition | 2510.04136 | 语言模型/自回归 | 语音多模态、ASR/识别 | 统一/端到端框架、鲁棒 | 鲁棒性、泛化 | 待核(数据/算力/特定语种/评测指标) |

## 备注

- **数据源**：OpenReview api2（`https://api2.openreview.net/notes?content.venueid=NeurIPS.cc/2025/Conference`），venueid 确认存在（group `NeurIPS.cc/2025/Conference`），分页 `limit=1000&offset=0..5000` 共 6 页，去重后 **5286** 篇 accepted notes。旧端点 `openreview.net/notes`（307 重定向提示）与 `api.openreview.net/notes`（返回空）均不可用；DBLP `dblp.org/db/conf/nips/nips2025.html` 截至 2026-06-25 仍 404（2025 卷未上线），故以 OpenReview 为唯一全量枚举源。
- **筛选口径**：5286 篇经"标题+摘要+关键词"三字段语音/音频强信号正则初筛（speech/voice/speaker/acoustic/audio/codec/prosody/emotion/accent/separation/denoise/anonymize/paralinguistic/speech-LM 等），得候选 ~128 篇；人工逐篇读摘要复核，剔除纯 ASR（BlockDecoder、DP-Federated Speech Recognition、Objective Soups、MoME-AVSR）、纯 TTS（Shallow Flow Matching for TTS）、以及非语音 codec（OSCAR 图像扩散 codec）、非语音 VC-dimension/通用噪声等误匹配，最终保留 **64** 篇。
- **arXiv ID 反验（强制，禁幻觉）**：因 OpenReview bibtex/abstract 不含 arXiv ID，改用 arxiv.org HTML 搜索接口 `arxiv.org/search/?searchtype=all&query=<标题关键词>` 发现候选 ID，再逐个用 `arxiv.org/abs/<ID>` HTML abs 页 `<title>` 反验标题一致性（Jaccard≥0.6 视为一致）。**59/64 核对一致**；**5 篇未检出 arXiv**（标注 `n/a`，绝不编造）：Aligning What Matters、CRRL、Improving Target Sound Extraction via Disentangled Codec Representations、PyraMotion、Toward Human Deictic Gesture Target Estimation——均如实记 n/a。
- **限流踩坑**：`export.arxiv.org` API 与 `arxiv.org/search` HTML 接口共享 429 限流（账号/IP 段级，换代理 `127.0.0.1:7897` 无效），连续 ~14 次请求即触发，冷却窗 3–5 分钟；本环境另有遗留并发 arXiv 检索进程加剧限流。改用 15s 间距分批 + 5min 冷却分段完成；`arxiv.org/abs/<ID>` HTML abs 页限流更松，用于最终反验。WebFetch 在本环境对 arxiv.org 被拦截，全程用 curl/urllib 直连。
- **标题不一致但确认为同一篇**：StreamFlow（NeurIPS 标题"Streaming Audio Generation from Discrete Tokens via Streaming Flow Matching"）在 arXiv 为"StreamFlow: Streaming Flow Matching with Block-wise Guided Attention Mask for Speech Token Decoding"（2506.23986），摘要首句即"discrete token-based speech generation"，确认为同一篇语音工作，已收录。
- **范围声明**：纯 ASR、纯 TTS 已排除；TTS+情感控制（Word-Level Emotional Expression Control）保留（属情感/韵律）；手语翻译/生成保留（语音跨领域，spoken language 衔接）；生物声学（WhAM 抹香鲸）、声场/NeRF 声学（Resounding Acoustic Fields、Can NeRFs See）保留（声学范畴）；脑语音解码（inner speech/神经解码）保留（paralinguistic/语音 BCI）。talking head/舞蹈/手势等音频驱动生成保留（语音多模态/语音驱动）。
- 论文数 64；检索日期 2026-06-25。
