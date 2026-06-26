# EMNLP 2025 (语音相关)

> 归属: 混合（编创 50 / 非编创 19） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


检索日期 2026-06-25 | 论文数 55 | 范围：spoken language / speech LM / 语音编辑 / 跨语言语音 / 语音多模态；排除纯 ASR、纯 TTS（端到端合成目标）、纯文本 NLP。

枚举入口：DBLP `dblp.org/db/conf/emnlp/emnlp2025.html`（全量 1810 篇 main）+ ACL Anthology events 页（确认 main 1810 篇）+ arXiv `ti`/`abs:"EMNLP 2025"` 反查。
arXiv ID 反验：每个 ID 均用 `https://arxiv.org/abs/<ID>` HTML abs 页核对标题匹配（match=True）。arXiv API 在并发检索中触发 429，已冷却并改用 HTML abs 页（抗限流）完成反验。
无 arXiv 预印本的论文（仅在 ACL Anthology 正会发表）标 "n/a"，均经 arXiv 关键词检索确认无匹配预印本，未编造。

---

## A. Speech LM / 语音大模型（架构、表示、对齐、安全）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Enhancing Speech Large Language Models with Prompt-Aware Mixture of Audio Encoders | 2502.15178 | 多音频编码器 MoE，按 prompt 路由 | speech LM 音频理解 | prompt-aware 路由混合编码器，自适应输入类型 | 不同输入类型下理解质量更稳 | 路由与编码器组合工程量大 |
| VocalNet: Speech LLM with Multi-Token Prediction for Faster and High-Quality Generation | 2504.04060 | 多 token 预测加速 speech LLM 生成 | speech LM 解码效率 | 把多 token 预测引入语音 LLM 提速 | 生成更快且质量不降 | 多 token 预测在语音离散 token 上调参敏感 |
| Understanding the Modality Gap: An Empirical Study on the Speech-Text Alignment Mechanism of Large Speech Language Models | 2510.12116 | 语音-文本表示对齐机制实证 | speech LM 模态对齐 | 系统揭示模态 gap 的形成机制 | 为对齐改进提供可解释依据 | 实证为主，未提新模型 |
| Speech Discrete Tokens or Continuous Features? A Comparative Analysis for Spoken Language Understanding in SpeechLLMs | 2508.17863 | 离散 token vs 连续特征对比 | speech LM 前端表示 | 在 SLU 任务上系统比较两类前端 | 指导前端选择 | 任务范围有限（SLU） |
| SPIRIT: Patching Speech Language Models against Jailbreak Attacks | 2505.13541 | speech LM 越狱攻击防御补丁 | speech LM 安全 | 针对 speech LM 越狱的专项防御 | 提升安全鲁棒性 | 补丁式防御，攻击面演化后需更新 |
| TrojanWave: Exploiting Prompt Learning for Stealthy Backdoor Attacks on Large Audio-Language Models | n/a | audio-LM 后门攻击（prompt learning 触发） | audio-LM 安全 | 利用 prompt learning 的隐蔽后门 | 暴露安全风险（红队） | 仅攻击侧，防御未覆盖 |
| Mitigating Hallucinations in LM-Based TTS Models via Distribution Alignment Using GFlowNets | 2508.15442 | GFlowNet 分布对齐消解 TTS LM 幻觉 | speech LM 生成可靠性 | 用 GFlowNet 对齐输出分布降幻觉 | 减少合成中的串音/幻觉 | 训练成本高 |
| Summarizing Speech: A Comprehensive Survey | 2504.08024 | 语音摘要综述 | speech LM 文本化任务 | 系统梳理语音摘要全链路 | 提供领域地图 | 综述无新方法 |
| Towards Controllable Speech Synthesis in the Era of Large Language Models: A Systematic Survey | 2412.06602 | LLM 时代可控语音合成综述 | speech LM 可控生成 | 梳理 LLM-based 可控合成脉络 | 路线图 | 综述无新方法 |

## B. Audio-Language Model / 音频多模态大模型

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| SoundMind: RL-Incentivized Logic Reasoning for Audio-Language Models | 2506.12935 | RL 强化音频 LM 逻辑推理 | audio-LM 推理 | 用 RL 激励逻辑推理链 | 音频问答推理能力提升 | RL 训练成本高 |
| Audio-Reasoner: Improving Reasoning Capability in Large Audio Language Models | 2503.02318 | 音频 LM 推理增强 | audio-LM 推理 | 显式推理框架提升 audio LM | 复杂音频问答更准 | 推理框架依赖额外结构 |
| iKnow-audio: Integrating Knowledge Graphs with Audio-Language Models | n/a | 知识图谱融入 audio-LM | audio-LM 知识增强 | KG 注入补外部知识 | 减少事实性错误 | KG 构建与对齐工程量 |
| When Audio and Text Disagree: Revealing Text Bias in Large Audio-Language Models | 2508.15407 | 揭示 audio-LM 的文本偏置 | audio-LM 评测/纠偏 | 定位模型偏向文本通道的问题 | 指导去偏 | 诊断为主 |
| Reshaping Representation Space to Balance the Safety and Over-rejection in Large Audio Language Models | 2505.19670 | audio-LM 安全与过度拒绝平衡 | audio-LM 安全 | 表示空间重塑平衡两者 | 减少误拒、保安全 | 平衡点难调 |
| Towards Holistic Evaluation of Large Audio-Language Models: A Comprehensive Survey | 2505.15957 | audio-LM 综合评测综述 | audio-LM 评测 | 全景评测综述 | 评测体系梳理 | 综述无新方法 |
| Evaluating Robustness of Large Audio Language Models to Audio Injection: An Empirical Study | 2505.19598 | audio-LM 音频注入鲁棒性 | audio-LM 安全 | 实证音频注入攻击鲁棒性 | 暴露注入风险 | 实证为主 |
| Audio-centric Video Understanding Benchmark without Text Shortcut | 2503.19951 | 去文本捷径的音频中心视频理解基准 | 音频多模态评测 | 构造无文本捷径的音中心基准 | 更真实评估音频能力 | 基准范围有限 |
| Contra4: Evaluating Contrastive Cross-Modal Reasoning in Audio, Video, Image, and 3D | 2506.01275 | 跨模态对比推理评测 | 多模态评测 | 四模态对比推理基准 | 覆盖音频在内的多模态 | 评测任务设计复杂 |
| RAVEN: Query-Guided Representation Alignment for Question Answering over Audio, Video, Embedded Sensors, and Natural Language | 2505.17114 | 查询引导多模态对齐 QA | 多模态 QA | query-guided 对齐含音频/传感器 | 跨模态检索更准 | 多源对齐工程量大 |
| MultiVox: A Benchmark for Evaluating Voice Assistants for Multimodal Interactions | 2507.10859 | 语音助手多模态交互评测基准 | 语音多模态评测 | 面向多模态交互的 VA 基准 | 综合评估语音助手 | 基准任务范围 |
| SilVar: Speech Driven Multimodal Model for Reasoning Visual Question Answering and Object Localization | 2412.16771 | 语音驱动多模态推理+定位 | 语音多模态 | 语音输入驱动视觉推理与定位 | 语音交互更自然 | 跨模态对齐难度 |
| Orchestrating Audio: Multi-Agent Framework for Long-Video Audio Synthesis | n/a | 多 agent 长视频音频合成 | 音频多模态生成 | 多 agent 协同长视频配音 | 长视频音频一致性 | agent 协同复杂 |
| RiTTA: Modeling Event Relations in Text-to-Audio Generation | 2412.15922 | 事件关系建模的 T2A 生成 | 文本到音频生成 | 显式建模事件间关系 | 音频场景更连贯 | 事件关系标注成本 |
| Language Model Based Text-to-Audio Generation: Anti-Causally Aligned Collaborative Residual Transformers | 2510.04577 | LM-based T2A 协同残差变换器 | 文本到音频生成 | 反因果对齐+协同残差 | 生成质量提升 | 模型结构复杂 |
| Learning to See through Sound: From VggCaps to Multi2Cap for Richer Automated Audio Captioning | n/a | 自动音频字幕生成 | 音频多模态理解 | 视觉-声音迁移做音频字幕 | 字幕更丰富 | 跨模态迁移噪声 |

## C. 语音编辑 / 可控语音合成 / 风格与韵律

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| VoiceCraft-X: Unifying Multilingual, Voice-Cloning Speech Synthesis and Speech Editing | 2511.12347 | 统一多语言音色克隆合成+语音编辑 | 语音编辑/克隆 | 单模型统一多语言克隆与编辑 | 一站式编辑+克隆 | 编辑-合成统一调参 |
| Koel-TTS: Enhancing LLM based Speech Generation with Preference Alignment and Classifier Free Guidance | 2502.05236 | LLM-based TTS + 偏好对齐 + CFG | 可控语音合成 | 偏好对齐+CFG 提升合成 | 主观质量更优 | 偏好数据成本 |
| FillerSpeech: Towards Human-Like Text-to-Speech Synthesis with Filler Insertion and Filler Style Control | n/a | TTS 插入 filler 及风格控制 | 自然语音合成 | 显式填充词插入与风格控 | 更接近真人讲话 | filler 时机难控 |
| Scaling Rich Style-Prompted Text-to-Speech Datasets | 2503.04713 | 富风格 prompt 的 TTS 数据扩展 | 可控语音合成 | 规模化风格 prompt 数据 | 风格多样性提升 | 数据质量把控 |
| Eliciting Implicit Acoustic Styles from Open-domain Instructions to Facilitate Fine-grained Controllable Generation of Speech | n/a | 开放指令隐式声学风格抽取 | 可控语音合成 | 从开放指令挖隐式风格 | 细粒度可控 | 隐式风格不可解释 |
| Multimodal Fine-grained Context Interaction Graph Modeling for Conversational Speech Synthesis | 2509.06074 | 对话语境细粒度交互图建模 | 对话语音合成 | 多模态语境图做对话合成 | 对话合成更连贯 | 图建模复杂 |
| Think, Verbalize, then Speak: Bridging Complex Thoughts and Comprehensible Speech | 2509.16028 | 复杂思维到可懂语音的桥接 | 语音生成 | 思维-言语-语音三段式 | 复杂内容表达更自然 | 桥接模块对齐难 |
| Predicting Prosodic Boundaries for Children's Texts | n/a | 儿童文本韵律边界预测 | 韵律建模 | 面向儿童文本的韵律边界 | 儿童 TTS 韵律更自然 | 仅边界预测 |
| Does Context Matter? A Prosodic Comparison of English and Spanish in Monolingual and Multilingual Discourse Settings | n/a | 英/西韵律跨语种对比 | 韵律/跨语言 | 单/多语话语境韵律对比 | 跨语言韵律理解 | 对比研究无新模型 |

## D. 跨语言语音 / 语音翻译 / 口音与多语

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Whisper-UT: A Unified Translation Framework for Speech and Text | 2509.16375 | 语音+文本统一翻译框架 | 语音翻译 | 统一处理 speech/text 翻译 | 翻译一致性 | 双模态训练复杂 |
| MultiMed-ST: Large-scale Many-to-many Multilingual Medical Speech Translation | 2504.03546 | 多对多医学语音翻译 | 领域语音翻译 | 大规模医学多语 ST | 医疗跨语沟通 | 领域受限 |
| CoVoGER: A Multilingual Multitask Benchmark for Speech-to-text Generative Error Correction with Large Language Models | n/a | 多语 ST 生成式纠错基准 | 语音翻译评测 | 多语多任务 GEC 基准 | 评测 ST 纠错 | 基准为主 |
| Can Large Language Models Translate Spoken-Only Languages through International Phonetic Transcription? | n/a | LLM 经 IPA 翻译纯口语 | 跨语言语音 | 探究 IPA 中介翻译口语 | 助力低资源口语 | IPA 中介损失信息 |
| Towards Language-Agnostic STIPA: Universal Phonetic Transcription to Support Language Documentation at Scale | n/a | 通用音标转写支持语言文档 | 语音文档/低资源 | 语言无关音标转写 | 规模化语言文档 | 转写精度依赖模型 |
| Discourse-Driven Code-Switching: Analyzing the Role of Content and Communicative Function in Spanish-English Bilingual Speech | n/a | 语码切换话语分析（西-英） | 跨语言语音 | 话语驱动 CS 分析 | 理解双语 CS 规律 | 分析为主 |

## E. 口语语言理解 / 对话 / 基准

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| C3: A Bilingual Benchmark for Spoken Dialogue Models Exploring Challenges in Complex Conversations | 2507.22968 | 双语口语对话复杂场景基准 | 口语对话评测 | 复杂对话双语基准 | 评测口语对话模型 | 基准为主 |
| PACHAT: Persona-Aware Speech Assistant for Multi-party Dialogue | n/a | 多人对话 persona 语音助手 | 口语对话 | persona 感知多方对话 | 多人对话更贴角色 | 多人说话人建模难 |
| COAS2W: A Chinese Older-Adults Spoken-to-Written Transformation Corpus with Context Awareness | n/a | 中文老年人口语转书面语料 | 口语理解 | 老年人特定口语归一 | 适老化语音交互 | 单语中文/特定人群 |
| PSET: a Phonetics-Semantics Evaluation Testbed | n/a | 语音-语义评测测试床 | 语音评测 | 音系-语义联合评测 | 评测细粒度 | 测试床范围 |
| Speech Vecalign: an Embedding-based Method for Aligning Parallel Speech Documents | 2509.18360 | 嵌入式并行语音文档对齐 | 语音数据对齐 | 嵌入式语音文档对齐 | 跨语料对齐更稳 | 对齐质量依赖嵌入 |

## F. 语音安全 / 深伪检测 / 偏见

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| What You Read Isn't What You Hear: Linguistic Sensitivity in Deepfake Speech Detection | 2505.17513 | 深伪语音检测的语言敏感性 | 语音安全 | 揭示读写不一致的检测线索 | 检测更准 | 跨语言泛化 |
| VoiceBBQ: Investigating Effect of Content and Acoustics in Social Bias of Spoken Language Model | 2509.21108 | 语音 LM 社会偏见（内容+声学） | 语音公平性 | 拆解内容/声学对偏见的影响 | 暴露偏见来源 | 偏见维度有限 |
| BRSpeech-DF: A Deep Fake Synthetic Speech Dataset for Portuguese Zero-Shot TTS | n/a | 葡语零样本 TTS 深伪数据集 | 语音安全 | 葡语深伪检测数据集 | 补低语种检测 | 单语种 |

## G. 语音表示 / 语音学 / 认知与神经

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Layer-wise Minimal Pair Probing Reveals Contextual Grammatical-Conceptual Hierarchy in Speech Representations | 2509.15655 | 逐层 minimal pair 探针语音表示 | 语音表示分析 | 揭示层次语法-概念结构 | 可解释语音表示 | 探针设计依赖语言学 |
| Emergent morpho-phonological representations in self-supervised speech models | 2509.22973 | 自监督语音模型的形态-音系涌现 | 语音表示 | 发现形态音系涌现 | 理解 SSL 语音模型 | 分析为主 |
| From perception to production: how acoustic invariance facilitates articulatory learning in a self-supervised vocal imitation model | 2509.05849 | 自监督声学不变性促发音学习 | 语音产生/模仿 | 感知-产生闭环模仿 | 语音模仿更接近目标 | 闭环训练复杂 |
| Aligning Text/Speech Representations from Multimodal Models with MEG Brain Activity During Listening | n/a | 多模态语音表示与 MEG 脑活动对齐 | 语音认知 | 与脑活动对齐验证表示 | 表示更贴近人脑 | MEG 数据获取难 |
| The Sound of Syntax: Finetuning and Comprehensive Evaluation of Language Models for Speech Pathology | 2509.16765 | LM 微调评测语音病理 | 病理语音 | 综合评测 LM 在语音病理 | 病理语音分析 | 临床泛化待验 |
| Proactive Hearing Assistants that Isolate Egocentric Conversations | 2511.11473 | 自我中心对话隔离的主动助听 | 助听/可穿戴 | 主动隔离自我中心对话 | 助听体验提升 | 真实环境鲁棒性 |
| From Shortcuts to Balance: Attribution Analysis of Speech-Text Feature Utilization in Distinguishing Original from Machine-Translated Texts | n/a | 语音-文本特征利用归因（原vs机译） | 语音表示/鉴伪 | 拆解语音/文本特征捷径与平衡 | 理解特征利用 | 归因分析无新模型 |
### 【非编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Seeing is Believing: Emotion-Aware Audio-Visual Language Modeling for Expressive Speech Generation | 2508.16188 | LLM | emotion | 待核 | 表现力 | 待核 |
| O_O-VC: Synthetic Data-Driven One-to-One Alignment for Any-to-Any Voice Conversion | 2510.09061 | 待核 | tts、text-to-speech、voice | 零样本泛化 | 音质、相似度 | 泛化局限 |
| Spoken Conversational Agents with Large Language Models | 2512.02593 | 语言模型/自回归、实时/流式、蒸馏/少步 | 口音/方言、匿名化/隐私 | 统一/端到端框架、实时/低延迟 | 鲁棒性、隐私/安全 | 待核(数据/算力/特定语种/评测指标) |
| Progressive Facial Granularity Aggregation with Bilateral Attribute-based Enhancement for Face-to-Speech Synthesis | 2509.07376 | 微调/适配器 | 增强/分离/修复、语音多模态 | 鲁棒、偏好/对齐优化 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |
### 【编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Seeing is Believing: Emotion-Aware Audio-Visual Language Modeling for Expressive Speech Generation | 2508.16188 | LLM | emotion | 待核 | 表现力 | 待核 |
| O_O-VC: Synthetic Data-Driven One-to-One Alignment for Any-to-Any Voice Conversion | 2510.09061 | 待核 | tts、text-to-speech、voice | 零样本泛化 | 音质、相似度 | 泛化局限 |
| Spoken Conversational Agents with Large Language Models | 2512.02593 | 语言模型/自回归、实时/流式、蒸馏/少步 | 口音/方言、匿名化/隐私 | 统一/端到端框架、实时/低延迟 | 鲁棒性、隐私/安全 | 待核(数据/算力/特定语种/评测指标) |

## 备注

- 枚举基于 DBLP 全量 1810 篇 EMNLP 2025 main 论文标题，ACL Anthology events 页确认 main 卷为 1810 篇（demos 卷未纳入）。Findings 论文随 main 同卷计入 DBLP 该列表。
- 筛选口径：标题涉及 speech/spoken/voice/audio/acoustic/phonet/prosod 等且非纯 ASR/纯 TTS/纯文本 NLP；纯 ASR（如 LiteASR、Visual-Aware Speech Recognition、Idiosyncratic Dysarthric、Back-Translation for Speech Recognition、In-Context Learning Boosts Speech Recognition、Dynamic Model-Bank TTA for ASR）按任务要求排除；纯视觉/音乐/手语多模态亦排除。
- arXiv ID 反验：37 个 ID 全部经 `https://arxiv.org/abs/<ID>` HTML abs 页核对，标题匹配通过（match=True）；其中 SilVar/VocalNet 的 arXiv 标题与会议标题有细微词形差异（如 "Speech-Driven"→"Speech Driven"、"Speech LLMs"→"Speech LLM"），语义一致，判为匹配。
- 标 "n/a" 的 18 篇均为仅在 ACL Anthology 正会发表、arXiv 关键词检索确认无匹配预印本，未编造 ID。
- arXiv API 在前期并发标题检索中触发全局 429（换代理无效），已冷却后改用 HTML abs 页完成全部反验；遵循"不验证不写、绝不编造"原则。
- 部分论文 arXiv 预印本时间早于会议（如 SilVar 2412、Controllable Synthesis Survey 2412、RiTTA 2412），属正常预印本先行。
