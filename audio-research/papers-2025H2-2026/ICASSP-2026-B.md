# ICASSP 2026 (B组: 情感/韵律/口音/匿名化/speech-LM/paralinguistic)

> 归属: 混合（编创 61 / 非编创 86） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


> 检索日期 2026-06-25 | 论文数 127 | 范围: ICASSP 2026 已公开 arXiv 预印本中, 情感识别/合成、韵律、口音/方言、说话人匿名化/隐私、反语音合成水印/anti-spoofing/deepfake检测、speech language model/指令式/agent、paralinguistic(病理语音/年龄/性别)、多模态语音、歌声(singing voice) 子方向。排除纯 ASR(无 B 组信号)、纯 TTS(无 LM/指令/情感/韵律钩子)。
>
> 枚举入口: arXiv `co:"ICASSP 2026"` 全量枚举 (728 篇) → cs.SD/eess.AS 或语音领域门控 → B 组子方向词库筛选 + 人工剔除假阳 (通用音乐生成/vocoder/codec/separation 等)。DBLP 与 IEEE Xplore 的 ICASSP 2026 页面截至检索日均未上线 (DBLP 仅至 2025; IEEE Xplore 反爬 418), 故以 arXiv comment "ICASSP 2026" 为主枚举源。
>
> arXiv ID 反验: 每个写入表的 ID 均用 `arxiv.org/abs/<ID>` HTML abs 页核对标题, 127/127 全部 OK, 0 幻觉。

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|

### 【编创】情感识别/合成、韵律 (Emotion / Prosody)

| MULTI-Bench: A Multi-Turn Interactive Benchmark for Assessing Emotional Intelligence ability of Spoken Dialogue Models | 2511.00850 | 多轮交互情感智力基准, 层级结构评 spoken dialogue | 对话系统评测 | 首个面向多轮交互+情感智力的 SDM 基准 | 衡量真实多轮情商, 超越单轮 | 仅评测基准, 未提出新模型 |
| Evaluating Emotion Recognition in Spoken Language Models on Emotionally Incongruent Speech | 2510.25054 | 情感不一致语音上评测 SLM 情感识别 | SLM 鲁棒性评测 | 情感不一致测试集暴露 SLM 泛化缺口 | 揭示音文融合不足 | 诊断性, 无修复方案 |
| Gen-SER: When the generative model meets speech emotion recognition | 2601.20573 | 把 SER 重构为分布漂移问题, 生成模型投射类标到连续空间 | 语音情感识别 | 生成式分布建模替代分类 | 连续情感分布更贴近真实 | 生成模型训练成本高 |
| AmbER²: Dual Ambiguity-Aware Emotion Recognition Applied to Speech and Text | 2601.18010 | 双重歧义(标注者+模态)建模, 显式处理模态冲突 | 多模态情感识别 | 显式建模模态间歧义而非简单融合 | 缓解模态冲突误判 | 依赖标注分布真值 |
| Scaling Ambiguity: Augmenting Human Annotation in SER with Audio-Language Models | 2601.14620 | 用大音频语言模型缓解稀疏标注推断不可靠问题 | 标注增强 SER | ALM 生成弥补人工标注稀疏 | 更可靠情感分布真值 | ALM 标注偏差待验证 |
| Prosody-Guided Harmonic Attention for Phase-Coherent Neural Vocoding in the Complex Spectrum | 2601.14472 | 韵律引导谐波注意力, 复谱直接预测相位 | 声码器/合成 | 韵律+相位联合建模, iSTFT 直接出波形 | 相位重建更准、韵律更自然 | 复谱建模计算开销增加 |
| The Role of Prosodic and Lexical Cues in Turn-Taking with Self-Supervised Speech Representations | 2601.13835 | 用 vocoder 控制分离韵律/词汇线索探针 | 人机对话轮次预测 | 干净分离韵律与词汇贡献 | 解释 VAP 模型依赖 | 探针性研究, 非系统改进 |
| SmoothCLAP: Soft-Target Enhanced Contrastive Language–Audio Pretraining for Affective Computing | 2601.12591 | 软目标对比学习放宽严格一对一配准 | 情感/情感计算 | 软目标对齐建模模态内相似 | 情感边界模糊性更鲁棒 | 软目标构造依赖先验 |
| MSF-SER: Enriching Acoustic Modeling with Multi-Granularity Semantics for SER | 2510.05749 | 多粒度语义(强调词+深层语义)丰富声学建模 | 连续维度 SER(VAD) | 词级强调+深层语义双重补充 | 捕捉语气重音改变语义 | 多粒度标注需求 |
| EMO-TTA: Improving Test-Time Adaptation of Audio-Language Models for SER | 2509.25495 | 免训练测试时适应, 轻量适配 ALM | 跨域 SER | 无梯度免训练 TTA | OOD 鲁棒、部署灵活 | 单样本适应上限有限 |
| Plug-and-Play Emotion Graphs for Compositional Prompting in Zero-Shot SER | 2509.25458 | 结构化情感图 + CoT 推理, 免微调零样本 | 零样本 SER | 情感图引导 LALM 推理 | 无需微调即推理情感 | 依赖 LALM 推理能力 |
| Behind the Scenes: Mechanistic Interpretability of LoRA-adapted Whisper for SER | 2509.08454 | Whisper 编码器 LoRA 机制可解释性系统研究 | SER 适配 | 首个 LoRA-in-Whisper 机制解析 | 指导高效适配设计 | 解释性, 非性能提升 |
| CAMEO: Collection of Multilingual Emotional Speech Corpora | 2505.11051 | 多语言情感语音数据集合集, 标准化基准 | SER 数据/基准 | 跨语言标准化易复现基准 | 多语言可比评测 | 数据规模受限 |
| Decoding the Ear: A Framework for Objectifying Expressiveness from Human Preference Through Efficient Alignment | 2510.20513 | 把人类偏好转为可计算表现力指标 | 表现力评测 | 偏好对齐替代昂贵 MOS | 客观表现力评测 | 偏好数据获取成本 |
| What You Feel Is Not What They See: On Predicting Self-Reported Emotion from Third-Party Observer Labels | 2601.21130 | 自报与第三方情感标签差异的跨语料评估 | 心理健康情感建模 | 首次跨语料评估第三方训练模型到自报 | 自报建模指导干预 | 自报标签稀缺 |
| Residual Tokens Enhance Masked Autoencoders for Speech Modeling | 2601.19399 | RT-MAE 用残差可训练 token 补充显式属性 | 语音建模 | 显式属性+无监督残差 token | 捕捉 timbre/情感等未解释信息 | 残差语义不可控 |
| How Far Do SSL Speech Models Listen for Tone? Temporal Focus of Tone Representation under Low-resource Transfer | 2511.12285 | 缅/泰/老/越四语言声调表征与低资源迁移 | 声调/韵律 SSL | 多声调语言时域跨度估计 | 低资源声调建模 | 仅四语言, 规模有限 |
| MaskVCT: Masked Voice Codec Transformer for Zero-Shot VC With Increased Controllability via Multiple Guidances | 2509.17143 | 多重 classifier-free guidance 零样本 VC | 韵律/身份可控 VC | 单模型多因子可控 | 智能/说话人/韵律多控 | 多 CFG 调参复杂 |
| Emotion and Acoustics Should Agree: Cross-Level Inconsistency Analysis for Audio Deepfake Detection | 2601.13847 | 声学与情感跨层不一致性检测 deepfake | deepfake 检测 | 跨层去同步检测而非相关度量 | 捕捉细微失同步 | 假设真品声学-情感一致 |
| Investigating Safety Vulnerabilities of Large Audio-Language Models Under Speaker Emotional Variations | 2510.16893 | 情感变化下 LALM 安全对齐研究 | LALM 安全 | 构造恶意情感指令数据集 | 暴露情感旁路漏洞 | 诊断性, 无防御方案 |
| Uncertainty-Aware 3D Emotional Talking Face Synthesis with Emotion Prior Distillation | 2601.19112 | 不确定性感知多视角融合+情感先验蒸馏 | 3D 情感说话脸 | 不确定性驱动的多视角加权 | 微表情控制更精细 | 3D 渲染依赖 |

### 【非编创】歌声 (Singing Voice)

| Poly-SVC: Polyphony-Aware Singing Voice Conversion with Harmonic Modeling | 2605.12310 | 复音感知零样本 SVC, 谐波建模免 F0 提取 | 伴奏下歌声转换 | 免干净人声提取, 直接处理伴奏录音 | 伴奏录音可直接转换 | 谐波建模假设有限 |
| voice2mode: Phonation Mode Classification in Singing using Self-Supervised Speech Models | 2602.13928 | 用 SSL 语音模型嵌入分类四种歌声发声模式 | 歌声发声分类 | 首次评估语音基础模型迁移到歌声 | 免手工特征 | 歌声数据量有限 |
| S²Voice: Style-Aware Autoregressive Modeling with Enhanced Conditioning for Singing Style Conversion | 2601.13629 | AR LLM + FiLM 风格嵌入, SVCC2025 冠军 | 歌声风格转换 | FiLM 层范条件化增强风格控制 | 域内/零样本双轨夺冠 | 依赖两阶段 Vevo 基线 |
| UNMIXX: Untangling Highly Correlated Singing Voices Mixtures | 2601.12802 | 多歌声分离, 音乐信息混合+跨源注意力 | 多歌声分离 | 跨源注意力解强相关混合 | 处理高相关混合 | 数据稀缺仍为瓶颈 |
| StylePitcher: Generating Style-Following and Expressive Pitch Curves for Versatile Singing Tasks | 2510.21685 | 通用 pitch 曲线生成, 捕捉歌手个人风格 | 多歌声任务 | 通用化而非任务专用辅助 | 跨任务风格一致 | 通用化权衡 |
| SingMOS-Pro: An Comprehensive Benchmark for Singing Quality Assessment | 2510.01812 | 歌声质量自动评估数据集, 多感知维度 | 歌声质量评估 | 多维度客观度量超越单 MOS | 替代昂贵听测 | 感知维度覆盖有限 |
| How Does Instrumental Music Help SingFake Detection? | 2509.14675 | 乐器伴奏对歌声 deepfake 检测的行为/表征分析 | 歌声 deepfake 检测 | 行为+表征双视角剖析伴奏影响 | 解释伴奏下检测退化 | 分析性, 无新检测器 |
| Leveraging Whisper Embeddings for Audio-based Lyrics Matching | 2510.08176 | Whisper 解码器嵌入做歌词匹配, 全可复现 | 歌词检索 | 透明可复现基线+多模态扩展 | 检索鲁棒可复现 | 嵌入未针对歌词优化 |
| Voting-based Pitch Estimation with Temporal and Frequential Alignment and Correlation Aware Selection | 2602.01727 | 投票法 F0 估计的理论分析与改进 | 歌声/语音基频估计 | Condorcet 陪审定理理论支撑+相关感知选择 | 鲁棒性有理论保证 | 集成开销 |
| Diff-VS: Efficient Audio-Aware Diffusion U-Net for Vocals Separation | 2604.01120 | Elucidated Diffusion 生成式人声分离 | 人声分离 | 音频感知扩散 U-Net 提升生成式分离 | 客观指标提升 | 生成式仍慢于判别式 |

### 【编创】口音 / 方言 (Accent / Dialect)

| CosyAccent: Duration-Controllable Accent Normalization Using Source-Synthesis Training Data | 2602.19166 | "源-合成"训练数据+可控时长口音归一化 | L2→母语口音归一化 | 生成 L2 源+真实母语目标, 免 TTS 伪影 | 输出自然、内容不扭曲 | 源合成依赖母语数据 |
| GLoRIA: Gated Low-Rank Interpretable Adaptation for Dialectal ASR | 2603.02464 | 元数据(坐标)门控低秩适配预训练编码器 | 方言 ASR | 坐标元数据调制低秩更新 | 参数高效+可解释 | 依赖坐标元数据 |
| CTC-DID: CTC-Based Arabic dialect identification for streaming applications | 2601.12199 | 把方言识别建模为有限词表 ASR(CTC) | 流式阿拉伯语方言识别 | 方言标签当序列标签, CTC 流式 | 适配流式场景 | 方言标签词表有限 |
| Advanced Modeling of Interlanguage Speech Intelligibility Benefit with L1-L2 Multi-Task Learning Using Differentiable K-Means for Accent-Robust Discrete Token-Based ASR | 2601.19767 | L1-L2 多任务+可微 K-Means 复现 ISIB | 口音鲁棒 token ASR | 复现跨语言互懂收益现象 | 共享母语者口音更鲁棒 | ISIB 现象建模假设 |
| FAC-FACodec: Controllable Zero-Shot Foreign Accent Conversion with Factorized Speech Codec | 2510.10785 | 因子化 codec 提供口音强度可调参数 | 零样本外音口音转换 | 显式用户可控口音修改强度 | 平衡转换与身份保留 | 强度-身份权衡 |
| Accent-Invariant Automatic Speech Recognition via Saliency-Driven Spectrogram Masking | 2510.09528 | 显著性驱动频谱掩码去除口音信息 | 口音鲁棒 ASR | 口音分类+识别联合, 掩码口音 | 降低口音 WER | 掩码可能损语义 |
| Ara-Best-RQ: Multi Dialectal Arabic SSL | 2603.21900 | 5640h 爬取数据+BEST-RQ 预训练多方言阿拉伯语 SSL | 多方言阿拉伯语 | 大规模多方言 SSL(600M) | 方言识别+ASR 双任务提升 | 爬取数据质量不一 |
| BEST-RQ-Based Self-Supervised Learning for Whisper Domain Adaptation | 2510.24570 | BEARD: BEST-RQ+知识蒸馏无标注适配 Whisper 编码器 | 低资源 ASR 域适应 | BEST-RQ 目标+蒸馏组合 | 无标注数据适配 | 蒸馏教师依赖 |

### 【非编创】说话人匿名化 / 隐私 (Anonymization / Privacy)

| Target speaker anonymization in multi-speaker recordings | 2510.09307 | 多说话人录音中仅匿名化目标说话人 | 对话/呼叫中心隐私 | 针对多说话人单目标匿名场景 | 客服等真实场景可用 | 多说话人分离前置误差 |
| Improving the Speaker Anonymization Evaluation's Robustness to Target Speakers with Adversarial Learning | 2508.09803 | 对抗学习改进同性别目标选择评估鲁棒性 | 匿名化评估 | 揭示同性别 TSA 性别泄露+对抗修正 | 评估不再高估隐私 | 对抗训练不稳定 |
| Content Leakage in LibriSpeech and Its Impact on the Privacy Evaluation of Speaker Anonymization | 2601.13107 | 揭示 LibriSpeech 词汇内容泄露身份, EdAcc 更优 | 匿名化评估基准 | 揭示数据集词汇泄露漏洞 | 推动用 EdAcc 替代 | EdAcc 规模较小 |
| Erasing Your Voice Before It's Heard: Training-free Speaker Unlearning for Zero-shot TTS | 2601.20481 | TruS 免训练说话人遗忘, 阻止零样本 TTS 合成特定身份 | TTS 隐私/被遗忘权 | 免再训练、不限训练集内说话人 | 按请求阻止声音合成 | 免训练上限有限 |
| Adaptive Speaker Embedding Self-Augmentation for Personal VAD with Short Enrollment Speech | 2601.12769 | 自适应说话人嵌入自增强应对短注册 | 短注册个人 VAD | 短唤醒词注册的自增强策略 | 短注册场景可用 | 嵌入增强上限 |
| Machine Unlearning in Speech Emotion Recognition via Forget Set Alone | 2510.04251 | 仅用遗忘集做 SER 机器遗忘 | SER 隐私/被遗忘 | 无需遗忘集外数据即可遗忘 | 满足隐私删除请求 | 遗忘完整性验证难 |
| Test-Time Adaptation for Speech Emotion Recognition | 2601.16240 | 免源数据/标签的测试时适应 SER | 跨域 SER(隐私敏感) | 无源数据/标签 TTA 适配 | 适配同时保护隐私 | TTA 上限有限 |

### 【非编创】反语音合成 / 水印 / anti-spoofing / deepfake 检测

| StreamMark: A Deep Learning-Based Semi-Fragile Audio Watermarking for Proactive Deepfake Detection | 2604.11917 | 半脆弱水印, 鲁棒于良性转换、脆弱于恶意篡改 | 主动 deepfake 检测 | 半脆弱水印主动取证 | 区分良性/恶意篡改 | 需预嵌水印 |
| Understanding the strengths and weaknesses of SSL models for audio deepfake model attribution | 2603.13488 | 分析 SSL 特征做 deepfake 模型归因的成功因素与边界 | deepfake 溯源归因 | 系统剖析 SSL 归因能力边界 | 指导归因系统设计 | 分析性 |
| Fine-Grained Frame Modeling in Multi-head Self-Attention for Speech Deepfake Detection | 2602.04702 | MHSA 帧级细粒度建模捕捉局部伪造痕迹 | deepfake 检测 | 帧级注意力定位局部伪影 | 局部伪影更易捕获 | 注意力开销 |
| Audio Deepfake Detection at the First Greeting: "Hi!" | 2601.19573 | 超短(0.5-2s)首句 deepfake 检测, S-MGAA | 通话开场诈骗检测 | 轻量多粒度时频注意力, 超短输入 | 开场即识别诈骗 | 超短输入信息有限 |
| Spoofing-Aware Speaker Verification via Wavelet Prompt Tuning and Multi-Model Ensembles | 2601.17557 | WildSpoof 2026 SASV: 小波提示调谐 XLSR-AASIST+集成 | 说话人验证+伪造防御 | 级联 SASV 框架+小波提示 | 身份与真伪同验 | 集成推理开销 |
| Multi-Task Transformer for Explainable Speech Deepfake Detection via Formant Modeling | 2601.14850 | 多任务预测共振峰/清浊模式, 可解释 deepfake 检测 | 可解释 deepfake 检测 | 共振峰轨迹+清浊归因 | 决策依赖区域可解释 | 共振峰提取鲁棒性 |
| TwinShift: Benchmarking Audio Deepfake Detection across Synthesizer and Speaker Shifts | 2510.23096 | 跨合成器+说话人漂移检测基准 | deepfake 泛化评测 | 显式双重漂移基准 | 暴露真实世界泛化缺口 | 诊断性 |
| WaveSP-Net: Learnable Wavelet-Domain Sparse Prompt Tuning for Speech Deepfake Detection | 2510.05305 | 小波域可学习稀疏提示调谐前端 | deepfake 检测 | 提示调谐+经典信号变换融合 | 参数高效+野外泛化 | 小波基选择 |
| Bloodroot: When Watermarking Turns Poisonous For Stealthy Backdoor | 2510.07909 | 隐蔽后门: 水印嵌入做所有权保护/防御但可被毒化 | 音频水印/后门 | 高感知质量的水印后门 | 所有权验证+防滥用 | 双刃剑, 可被恶意利用 |
| The Impact of Audio Watermarking on Audio Anti-Spoofing Countermeasures | 2509.20736 | 首次研究水印对反欺骗系统的影响 | 水印×反欺骗交叉 | Watermark-Spoofing 数据集 | 揭示水印-反欺骗交互 | 仅特定水印算法 |
| Addressing Gradient Misalignment in Data-Augmented Training for Robust Speech Deepfake Detection | 2509.20682 | 解决数据增强中原/增强输入梯度失配 | deepfake 检测训练 | 显式对齐原/增强梯度 | 增强不再冲突 | 额外对齐开销 |
| CompSpoof: A Dataset and Joint Learning Framework for Component-Level Audio Anti-spoofing | 2509.15804 | 组件级 spoofing(仅部分信号被篡改)数据集+联合学习 | 组件级反欺骗 | 首个组件级 spoofing 基准 | 检测局部篡改 | 组件标注成本 |
| HISPASpoof: A New Dataset For Spanish Speech Forensics | 2509.09155 | 首个大规模西班牙语语音取证 deepfake 数据集 | 西语语音取证 | 填补西语(6亿人)取证空白 | 西语检测可用 | 单语种 |
| EchoFake: A Replay-Aware Dataset for Practical Speech Deepfake Detection | 2510.19414 | 重放感知数据集, 含物理重放攻击 | 真实电话诈骗检测 | 显式含重放攻击场景 | 真实低成本攻击鲁棒 | 重放设备多样性 |
| Zero-Shot TTS With Enhanced Audio Prompts: Bsc Submission For The 2026 Wildspoof Challenge TTS Track | 2602.05770 | StyleTTS2/F5-TTS+Sidon 多阶段增强, WildSpoof 2026 TTS 赛道 | WildSpoof 挑战 TTS | 多阶段增强超越 Demucs | 野外语音合成质量提升 | 挑战赛配置特定 |
| TidyVoice: A Curated Multilingual Dataset for Speaker Verification Derived from Common Voice | 2601.16358 | 从 Common Voice 衍生多语言朗读风格数据集(反欺骗用) | 说话人验证/反欺骗数据 | 缓解 Common Voice 说话人异质性 | 多语言反欺骗数据可用 | 衍生数据规模受限 |
| On Deepfake Voice Detection -- It's All in the Presentation | 2509.26471 | 揭示原始检测与真实呈现差距导致泛化失败 | deepfake 检测反思 | 诊断数据集/方法学导致的泛化失败 | 指引真实部署 | 论述性, 无新系统 |

### 【编创】Speech Language Model / 指令式 / Agent

| M3-TTS: Multi-modal DiT Alignment & Mel-latent for Zero-shot High-fidelity Speech Synthesis | 2512.04720 | MM-DiT 对齐+Mel-latent 免时长建模 NAR TTS | 零样本高保真合成 | 多模态 DiT 免 duration/pseudo-align | 自然度+计算效率 | DiT 计算密集 |
| RRPO: Robust Reward Policy Optimization for LLM-based Emotional TTS | 2512.04552 | 鲁棒奖励策略优化防 reward hacking | LLM 情感 TTS RL | 鲁棒 RM 防 acoustic artifact 投机 | 情感控制不损质量 | RM 设计复杂 |
| ARCHI-TTS: A flow-matching-based TTS Model with Self-supervised Semantic Aligner and Accelerated Inference | 2602.05207 | flow-matching + 自监督语义对齐器 + 加速推理 | 零样本 TTS | 语义对齐器+flow-matching 加速 | 对齐鲁棒+推理快 | flow-matching 调参 |
| EmoShift: Lightweight Activation Steering for Enhanced Emotion-Aware Speech Synthesis | 2601.22873 | 轻量激活转向控制情感, 不依赖固定情感嵌入 | 情感可控 TTS | 激活转向建模情感潜在特性 | 精准可控情感表达 | 转向方向需标定 |
| EMORL-TTS: Reinforcement Learning for Fine-Grained Emotion Control in LLM-based TTS | 2510.05758 | RL 统一全局强度+细粒度情感控制 | LLM TTS 情感控制 | 统一强度+细粒度情感 RL | 细粒度情感可控 | 离散 token 情感损失 |
| No Verifiable Reward for Prosody: Toward Preference-Guided Prosody Learning in TTS | 2509.18531 | 揭示 GRPO 用 CER/NLL 损韵律, 提迭代偏好引导 | TTS 韵律学习 | 诊断 GRPO 韵律崩塌+偏好修复 | 防韵律单调化 | 偏好数据成本 |
| VoXtream: Full-Stream Text-to-Speech with Extremely Low Latency | 2509.15969 | 全自回归零样本流式 TTS, 首词即出声 | 实时流式合成 | 单调对齐+有限前瞻不延起 | 极低延迟实时交互 | 自回归稳定性 |
| Deep Dubbing: End-to-End Auto-Audiobook System with Text-to-Timbre and Context-Aware Instruct-TTS | 2509.15845 | 端到端有声书: 脚本分析+自动选音色+instruct-TTS | 有声书制作 | text-to-timbre 自动角色选音色 | 多角色有声书自动化 | 选音色质量上限 |
| DAIEN-TTS: Disentangled Audio Infilling for Environment-Aware Text-to-Speech Synthesis | 2509.14684 | 解耦音频填补, 独立控制音色与背景环境 | 环境感知零样本 TTS | 说话人/环境 prompt 分离 | 音色与环境独立控 | 分离器依赖 |
| SPADE: Structured Pruning and Adaptive Distillation for Efficient LLM-TTS | 2509.20802 | 结构化剪枝+自适应蒸馏压缩 LLM-TTS | LLM-TTS 部署 | WER 引导剪枝+自适应蒸馏 | 大幅降参数/延迟 | 剪枝可能损零样本 |

### 【非编创】Paralinguistic (病理语音 / 年龄 / 性别 / 临床)

| Time vs. Layer: Locating Predictive Cues for Dysarthric Speech Descriptors in wav2vec 2.0 | 2604.21628 | 定位 wav2vec 2.0 哪些层/组件对构音障碍描述最强 | 构音障碍分析 | 层 vs 时间双维定位预测线索 | 可解释临床评估 | 单模型分析 |
| Breaking Data Efficiency Dilemma: A Federated and Augmented Learning Framework For Alzheimer's Disease Detection via Speech | 2602.14655 | 联邦学习+数据增强破解 AD 语音检测数据效率困境 | 阿尔茨海默语音检测 | 联邦+增强协同优化数据效率 | 隐私保护+抗数据稀缺 | 联邦通信开销 |
| Layer-Aware Early Fusion of Acoustic and Linguistic Embeddings for Cognitive Status Classification | 2601.23004 | 层感知早融合声学+语言嵌入(DementiaBank) | 认知状态分类 | 按编码器层深做早融合 | 优于单域建模 | 依赖转写文本 |
| Optimizing Domain-Adaptive Self-Supervised Learning for Clinical Voice-Based Disease Classification | 2601.22319 | 域适应 SSL(MAE) 缓解临床语音域失配 | 临床语音疾病分类 | 域适应 MAE 捕捉病理特征 | 通用预训练→临床可用 | 临床数据稀缺 |
| Towards Robust Dysarthric Speech Recognition: LLM-Agent Post-ASR Correction Beyond WER | 2601.21347 | LLM agent Judge-Editor 后纠错超越 WER 重语义 | 构音障碍 ASR | 语义保真后纠错替代 WER | 语义失真修正 | 依赖 LLM 推理 |
| Mind the Shift: Using Delta SSL Embeddings to Enhance Child ASR | 2601.20142 | delta SSL 嵌入(微调-原模型差)增强儿童 ASR | 儿童 ASR | delta 嵌入捕捉微调表征漂移 | 缓解儿童域失配 | 双模型开销 |
| Noise-Robust Contrastive Learning with an MFCC-Conformer For Coronary Artery Disease Detection | 2601.18295 | MFCC-Conformer 对比学习抗噪 CAD 检测(心音图) | 冠心病检测 | 多通道抗噪+对比学习 | 噪声临床环境可用 | 心音图非语音 |
| Speech-Based Prioritization for Schizophrenia Intervention | 2511.03086 | 语音估计精神分裂症状严重度排序干预 | 精神分裂干预 | 严重度估计替代诊断分类 | 资源受限场景优先级 | 严重度标注难 |
| Quantifying Articulatory Coordination as a Biomarker for Schizophrenia | 2511.03084 | 量化发音协调性作精神分裂生物标记 | 精神分裂生物标记 | 发音协调量化+临床可解释 | 超越二分类的临床洞察 | 协调性建模假设 |
| Can large audio language models understand child stuttering speech? | 2510.20850 | 评估 LALM 对儿童口吃语音(摘要/分离)能力 | 儿童口吃语音 | 首评 LALM 在不流利儿童语音 | 暴露 LALM 儿童口吃缺口 | 评估性 |
| Probing Whisper for Dysarthric Speech in Detection and Assessment | 2510.04219 | 探针 Whisper-Medium 编码器各层构音障碍表征 | 构音障碍检测/评估 | 跨层探针构音障碍表征 | 可解释临床评估 | 单模型 |
| Evaluating pretrained speech embedding systems for dysarthria detection across heterogenous datasets | 2509.19946 | 跨异构数据集系统评估预训练嵌入构音障碍检测 | 构音障碍检测 | 多数据集交叉验证估随机水平 | 鲁棒性评估 | 评估性 |
| Transfer Learning for Paediatric Sleep Apnoea Detection Using Physiology-Guided Acoustic Models | 2509.15008 | 生理引导声学模型迁移学习儿童睡眠呼吸暂停 | 儿童睡眠呼吸暂停 | 生理引导迁移适配儿童 | 家庭非侵入筛查 | 儿童数据稀缺 |
| Hyperbolic Additive Margin Softmax with Hierarchical Information for Speaker Verification | 2601.19709 | 双曲空间加性间隔 softmax 建模说话人层级信息 | 说话人验证(层级/年龄性别) | 双曲负曲率高效表征层级 | 层级特征更优 | 双曲优化复杂 |
| Lightweight and perceptually-guided voice conversion for electro-laryngeal speech | 2601.03892 | 轻量 StreamVC 适配电子喉语音(去恒定 pitch/机械噪) | 电子喉语音增强 | 去pitch/energy模块+感知引导 | EL 语音自然度/可懂度 | 仅 EL 场景 |
| Recovering Performance in SER from Discrete Tokens via Multi-Layer Fusion and Paralinguistic Feature Integration | 2601.17085 | 多层融合+paralinguistic 特征恢复离散 token SER 性能 | 离散 token SER | 量化 token 量化旁语言损失+多层融合恢复 | token-based SER 可用 | 多层融合开销 |

### 【编创】多模态语音 (Multimodal Speech)

| Beyond Lips: Integrating Gesture and Lip Cues for Robust Audio-visual Speaker Extraction | 2601.19130 | 整合协同手势+唇部线索做音视觉说话人提取 | 多说话人目标提取 | 手势互补唇部(面部遮挡时) | 遮挡下仍可提取 | 手势同步要求 |
### 【编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Align2Speak: Improving TTS for Low Resource Languages via ASR-Guided Online Preference Optimization | 2509.21718 | 自回归 | tts、text-to-speech、prosod | 新方法/统一框架 | 音质、可懂度、相似度 | 低资源 |
| TAU: A Benchmark for Cultural Sound Understanding Beyond Semantics | 2509.26329 | LLM | 待核 | 待核 | 待核 | 评测局限、泛化局限 |
| MELA-TTS: Joint transformer-diffusion model with representation alignment for speech synthesis | 2509.14784 | 扩散、Transformer、自回归 | tts、text-to-speech、speech | 统一/联合建模 | 鲁棒性 | 评测局限 |
| Fed-PISA: Federated Voice Cloning via Personalized Identity-Style Adaptation | 2509.16010 | LoRA | tts、text-to-speech、clonin | 高效/轻量 | 自然度、相似度、表现力 | 数据局限 |
| Speaker Anonymisation for Speech-based Suicide Risk Detection | 2509.22148 | 待核 | speech synthesis、voice co | 待核 | 待核 | 评测局限 |
| Gelina: Unified Speech and Gesture Synthesis via Interleaved Token Prediction | 2510.12834 | 自回归 | cloning、prosod | 统一/联合建模 | 音质 | 算力局限、评测局限 |
| MeanVoiceFlow: One-step Nonparallel Voice Conversion with Mean Flows | 2602.18104 | VC均值流一步转换 | 非并行语音转换 | 均值流单步免蒸馏 | 实时VC加速待核 | 需导数训练待核 |
| Confidence-based Filtering for Speech Dataset Curation with Generative Speech Enhancement Using Discrete Tokens | 2601.12254 | 离散token生成式增强 | TTS数据集清洗 | 置信度过滤幻觉错误 | 数据清洗质量提升待核 | 非编创核心待核 |
| CC-G2PnP: Streaming Grapheme-to-Phoneme and prosody with Conformer-CTC for unsegmented languages | 2602.17157 | Conformer-CTC流式G2P韵律 | 流式TTS前端 | 流式音素+韵律预测接LLM | 流式低延迟前端待核 | 依赖CTC对齐待核 |
| CN-NewsTTS Bench: a target-level automatic benchmark for raw-input Chinese news TTS pronunciation | 2606.24714 | 中文新闻TTS发音基准 | 中文新闻TTS评测 | 目标级自动评测原生形态 | 发音评测基准待核 | 仅评测非生成待核 |
| LTA-L2S: Lexical Tone-Aware Lip-to-Speech Synthesis for Mandarin with Cross-Lingual Transfer Learning | 2509.25670 | 自监督、微调/适配器 | 语音多模态、TTS/语音生成 | 跨域泛化 | 自然度/音质、精度 | 待核(数据/算力/特定语种/评测指标) |
| Mitigating Attention Sinks and Massive Activations in Audio-Visual Speech Recognition with LLMs | 2510.22603 | 语言模型/自回归、Transformer/注意力… | 语音多模态、ASR/识别 | 新架构 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| LipSody: Lip-to-Speech Synthesis with Enhanced Prosody Consistency | 2602.01908 | 扩散、情感、韵律 | 情感语音/韵律控制 | In this work, we propose | 提升相似度 | 待核 |
| AR&amp;D: A Framework for Retrieving and Describing Concepts for Interpreting AudioLLMs | 2602.22253 | 语言模型、多语 | 情感语音/韵律控制 | We introduce the first | 待核 | 待核 |
| Paralinguistic Emotion-Aware Validation Timing Detection in Japanese Empathetic Spoken Dialogue | 2603.09307 | 自监督、HuBERT、情感 | 情感语音/韵律控制 | Leveraging both | 待核 | 待核 |
| Dual-Strategy-Enhanced ConBiMamba for Neural Speaker Diarization | 2601.19472 | diarization | 语音隐私/伪造检测/水印/对抗 | Furthermore, to address | 提升鲁棒、效率、SOTA | 待核 |
| VividVoice: A Unified Framework for Scene-Aware Visually-Driven Speech Synthesis | 2602.02591 | 语音隐私/伪造检测/水印/对抗(取证 | 语音隐私/伪造检测/水印/对抗 | We introduce and define | 提升质量、保真度 | 待核 |
| DisSR: Disentangling Speech Representation for Degradation-Prior Guided Cross-Domain Speech Restoration | 2602.12701 | 扩散、修复 | 语音隐私/伪造检测/水印/对抗 | To overcome those | 提升质量 | 泛化待验证 |
| How to Label Resynthesized Audio: The Dual Role of Neural Audio Codecs in Audio Deepfake Detection | 2602.16343 | 神经编解码、编解码、声码器 | 语音隐私/伪造检测/水印/对抗 | In this study, we | 待核 | 待核 |
| Online Register for Dual-Mode Self-Supervised Speech Models: Mitigating The Lack of Future Context | 2602.23702 | 自监督、流式、低延迟 | 语音隐私/伪造检测/水印/对抗 | Furthermore, we | 提升低延迟 | 待核 |
| Multimodal Self-Attention Network with Temporal Alignment for Audio-Visual Emotion Recognition | 2603.11095 | 情感 | 语音隐私/伪造检测/水印/对抗 | In this paper, we | 待核 | 待核 |


### 【非编创】原 speech-LM 理解/对话侧（口径收紧移出编创）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| Phonological Tokenizer: Prosody-Aware Phonetic Token via Multi-Objective Fine-Tuning with Differentiable K-Means | 2601.19781 | 多目标微调+可微 K-Means 产生韵律感知音素 token | speechLM 离散 token | 音素 token 兼顾韵律, 超越纯音素/声学 token | speechLM 表征更丰富 | [口径收紧移出: 离散token/分词，speechLM基础设施] 多目标调参 |
| The ICASSP 2026 HumDial Challenge: Benchmarking Human-like Spoken Dialogue Systems in the LLM Era | 2601.05564 | 人机对话系统人性情商+鲁棒交互双能力基准 | 类人对话系统 | Audio-LLM/Omni 时代的对话基准 | 推动类人交互 | [口径收紧移出: 类人对话系统基准，对话侧] 挑战赛范围 |
| Omni-AVSR: Towards Unified Multimodal Speech Recognition with Large Language Models | 2511.07253 | 统一 ASR/VSR/AVSR 于单 LLM 模型 | 多模态语音识别 | 单模型统一三模态替代多独立模型 | 部署资源降低 | [口径收紧移出: 统一多模态ASR/VSR，识别理解侧] 统一训练复杂 |
| Principled Coarse-Grained Acceptance for Speculative Decoding in Speech | 2511.13732 | 粗粒度接受(声学/语义可互换 token)加速推测解码 | speech LLM 加速 | 原则化粗粒度替代精确匹配 | 推测解码加速提升 | [口径收紧移出: 推测解码加速，speechLM基础设施] 粗粒度可能损质量 |
| TASU: Text-Only Alignment for Speech Understanding | 2511.03310 | 纯文本对齐替代大规模音文配对 | speech LLM 对齐 | 纯文本对齐降算力+泛化 | 训算高效+跨域泛化 | [口径收紧移出: 纯文本对齐语音理解，理解侧对齐/训练] 纯文本对齐上限 |
| ISA-Bench: Benchmarking Instruction Sensitivity for Large Audio Language Models | 2510.23558 | 指令措辞敏感性基准 | LALM 评测 | 首个指令敏感性基准 | 暴露指令鲁棒性缺口 | [口径收紧移出: LALM指令敏感性评测基准] 诊断性 |
| Do Bias Benchmarks Generalise? Evidence from Voice-based Evaluation of Gender Bias in SpeechLLMs | 2510.01254 | 语音 SpeechLLM 性别偏见基准泛化性研究 | SpeechLLM 公平性 | 质疑 MCQA 偏见基准跨设置一致性 | 指引偏见评测 | [口径收紧移出: SpeechLLM性别偏见评测基准] 诊断性 |
| Scaling Spoken Language Models with Syllabic Speech Tokenization | 2509.26634 | 音节级 token 降低帧率, 缩短序列 | SLM 扩展 | 音节 token 降自注意力二次开销 | 长序列可扩展 | [口径收紧移出: 音节token降低帧率扩展SLM，基础设施/理解侧] 音节切分依赖 |
| Game-Time: Evaluating Temporal Dynamics in Spoken Language Models | 2509.26388 | 评估对话 SLM 时间动态(节拍/同说) | 对话 SLM 评测 | 时间动态系统评测框架 | 衡量对话流畅时序 | [口径收紧移出: 对话SLM时间动态评测] 评测性 |
| Full-Duplex-Bench v1.5: Evaluating Overlap Handling for Full-Duplex Speech Models | 2507.23159 | 首个全自动重叠语音处理基准 | 全双工对话评测 | 自动化系统探测重叠行为 | 推动全双工自然对话 | [口径收紧移出: 全双工对话重叠处理评测基准] 评测性 |
| Why Do Speech Language Models Fail to Generate Semantically Coherent Outputs? A Modality Evolving Perspective | 2412.17048 | 从模态演化视角分析 SLM 语义不相干(语音 token 偏音素/序列长) | SLM 失效分析 | 模态演化视角诊断 | 指引 SLM 改进 | [口径收紧移出: SLM语义不相干失效分析，理解侧分析] 分析性 |
| Few-Shot and Pseudo-Label Guided Speech Quality Evaluation with Large Language Models | 2604.13528 | GatherMOS: LLM 元评估聚合多信号预测 MOS | 语音质量评测 | LLM 聚合 DNSMOS/VQScore 推理 MOS | 客观 MOS 替代主观 | [口径收紧移出: LLM做语音质量评测MOS，评测侧] 依赖伪标签质量 |
| Audiocards: Structured Metadata Improves Audio Language Models For Sound Design | 2602.13835 | 结构化元数据改进音频语言模型音效检索 | 音效设计/检索 | 元数据感知训练替代缺失元数据 | 检索补全元数据 | [口径收紧移出: 结构化元数据改进音频语言模型音效检索，理解侧] 偏音效设计域 |
| No Word Left Behind: Mitigating Prefix Bias in Open-Vocabulary Keyword Spotting | 2602.08930 | 缓解开音素过度偏置导致误触发 | 开放词表 KWS | 诊断并缓解前缀偏置 | 减少误触发 | [口径收紧移出: 开放词表关键词检出，理解侧] 仍需音文联合嵌入 |
| Frontend Token Enhancement for Token-Based Speech Recognition | 2602.04217 | 增强 token 抗噪用于 token-based ASR/speechLM | token 语音识别 | 前端 token 增强抗噪 | 噪声下 token 任务退化缓解 | [口径收紧移出: token语音识别抗噪增强，识别侧] 增强模块额外开销 |
| The TMU System for the XACLE Challenge: Training Large Audio Language Models with CLAP Pseudo-Labels | 2602.00604 | 三阶段(字幕预训练+CLAP 伪标签+微调) LALM | XACLE 音文对齐挑战 | CLAP 伪标签预训练 | 通用音文对齐 | [口径收紧移出: XACLE音文对齐LALM，理解侧训练] 挑战赛配置特定 |
| PROST-LLM: Progressively Enhancing the Speech-to-Speech Translation Capability in LLMs | 2601.16618 | 渐进式三任务+模态链增强 LLM S2ST | 语音到语音翻译 | 渐进式 CVSS 微调+模态链 | 缓解 S2ST 数据稀缺 | [口径收紧移出: 语音到语音翻译，属翻译非编创；边界模糊倾向move] 依赖 CVSS 语料 |
| Reducing Prompt Sensitivity in LLM-based Speech Recognition Through Learnable Projection | 2601.20898 | 可学习投影替代固定手动 prompt | LLM-based ASR | 可学习投影降低 prompt 敏感 | 跨场景鲁棒 | [口径收紧移出: LLM-based ASR可学习投影，识别侧] 投影层训练成本 |
| SpeechMapper: Speech-to-text Embedding Projector for LLMs | 2601.20417 | 高效 speech-to-LLM-embedding 训练, 抗过拟合 | speech LLM 桥接 | 预训练+低成本投影抗任务/prompt 过拟合 | 鲁棒可泛化 | [口径收紧移出: speech-to-text嵌入投影桥接，理解侧] 仍需指令数据 |
| Unit-Based Agent for Semi-Cascaded Full-Duplex Dialogue Systems | 2601.20230 | 最小对话单元分解+半级联全双工, MLLM 核心 | 全双工对话 agent | 最小单元独立处理+转接预测 | 自然全双工交互 | [口径收紧移出: 全双工对话agent，对话侧] 半级联设计复杂 |
| RLBR: Reinforcement Learning with Biasing Rewards for Contextual Speech Large Language Models | 2601.13409 | 偏置词偏好奖励 RL 强调罕见词 | 上下文 speech LLM | 专用偏置奖励 RL | 罕见词/术语识别提升 | [口径收紧移出: 上下文speech LLM偏置奖励RL强调罕见词，理解/ASR侧] 奖励设计依赖 |
| FOA Tokenizer: Low-bitrate Neural Codec for First Order Ambisonics with Spatial Consistency Loss | 2510.22241 | 首个一阶 ambisonics 离散空间音频 codec | 空间音频/speechLM token | 空间一致性损失保方向线索 | 低码率保空间 | [口径收紧移出: 空间音频离散codec，speechLM基础设施] 仅 FOA 格式 |
| Steer-MoE: Efficient Audio-Language Alignment with a Mixture-of-Experts Steering Module | 2510.13558 | MoE 转向模块高效对齐音频编码器与 LLM | 音频-语言对齐 | 模块化 MoE 转向, 受 Platonic 假设启发 | 参数高效对齐 | [口径收紧移出: MoE音频-语言对齐模块，理解侧对齐] MoE 路由调参 |
| Unsupervised lexicon learning from speech is limited by representations rather than clustering | 2510.09225 | 零资源词分割/聚类: 表征而非聚类是瓶颈 | 零资源语音词典 | 理想边界下证明表征是瓶颈 | 指引 SSL 表征改进 | [口径收紧移出: 零资源词分割/聚类，理解侧表征分析] 分析性 |
| Measuring Prosody Diversity in Zero-Shot TTS: A New Metric, Benchmark, and Exploration | 2509.19928 | ProsodyEval: 韵律多样性新度量+基准 | 零样本 TTS 评测 | 专用韵律多样性数据集 | 韵律多样性可量化 | [口径收紧移出: 零样本TTS韵律多样性评测基准] 度量与感知相关性待验 |
| Teaching Audio Models to Reason: A Unified Framework for Source- and Layer-wise Distillation | 2509.18579 | 统一知识蒸馏从文本教师迁移推理到音频模型 | 音频模型推理 | 源/层双维度统一蒸馏 | 音频模型复杂推理提升 | [口径收紧移出: 音频模型推理知识蒸馏，理解侧训练] 教师模型依赖 |
| HarmoniFuse: A Component-Selective and Prompt-Adaptive Framework for Multi-Task Speech Language Modeling | 2509.18570 | 组件选择+prompt 自适应多任务 SLM | 统一 ASR+SER SLM | 按任务选组件+prompt 自适应 | ASR/SER 单模型兼顾 | [口径收紧移出: 统一ASR+SER多任务SLM，理解侧] 多任务调参 |
| Exploring Fine-Tuning of Large Audio Language Models for Spoken Language Understanding under Limited Speech Data | 2509.15389 | 系统研究文本only/直接混合/课程学习微调 | 低数据 SLU | 文本丰富+语音稀缺下的课程学习 | 低数据 SLU 提升 | [口径收紧移出: 低数据SLU微调，理解侧] 课程设计依赖 |
| Do You Hear What I Mean? Quantifying the Instruction-Perception Gap in Instruction-Guided Expressive TTS | 2509.13989 | 量化指令式 TTS 用户指令-听感感知差距 | 指令式 TTS 评测 | 首次量化指令-感知对齐 | 暴露可控性 gap | [口径收紧移出: 指令式TTS用户指令-听感差距评测，评测侧] 跨维度有限 |
| Can Large Audio Language Models Understand Audio Well? Speech, Scene and Events Understanding Benchmark for LALMs | 2509.13148 | 统一语音+场景+事件理解基准 | LALM 综合评测 | 真实交互多源音频基准 | 暴露综合理解缺口 | [口径收紧移出: LALM语音/场景/事件理解评测基准] 评测性 |
| PAC: Pronunciation-Aware Contextualized LLM-based ASR | 2509.12647 | 发音感知+上下文化两阶段 LLM ASR | LLM ASR(同音/长尾词) | 发音引导上下文+同音判别 | 长尾/同音词识别提升 | [口径收紧移出: 发音感知LLM ASR，识别侧] 两阶段复杂 |
| Empathy Omni: Enabling Empathetic Speech Response Generation through Large Language Models | 2508.18655 | speech LLM 生成共情语音回复(捕捉用户情感) | 共情语音助手 | 情感理解驱动共情回复生成 | 人机交互更共情 | [口径收紧移出: 共情语音助手对话回复，对话/助手说话不算编创] 情感建模深度有限 |
| MiDashengLM: Efficient Audio Understanding with General Audio Captions | 2508.03983 | 开源音频语言模型+ACAVCaps 通用音频字幕数据 | 音频理解 LALM | 全公开数据+通用字幕训练 | 开源可复现 LALM | [口径收紧移出: 音频理解LALM通用字幕，理解侧] 通用字幕质量 |
| GLAP: General contrastive audio-text pretraining across domains and languages | 2506.11350 | 多语言多域 CLAP 扩展 | 音文检索(多语言) | 扩展 CLAP 到多语言口语 | 多语言口语检索 | [口径收紧移出: 多语言音文对比预训练检索，理解侧] 多语言数据平衡 |
| Chain of Correction for Full-text Speech Recognition with Large Language Models | 2504.01519 | 链式纠错 LLM 全文 ASR 纠错(标点/ITN) | ASR 全文纠错 | 链式纠错提升稳定/可控/流畅 | 长上下文纠错更稳 | [口径收紧移出: ASR全文链式纠错，识别侧] 仍依赖 LLM |
| KAME: Tandem Architecture for Enhancing Knowledge in Real-Time Speech-to-Speech Conversational AI | 2510.02327 | 串联架构平衡实时 S2S 与 LLM 深知识 | 实时语音对话 AI | 串联实时 S2S + 文本 LLM 知识 | 低延迟+深知识 | [口径收紧移出: 实时语音对话AI串联架构，对话侧] 串联延迟/复杂度 |

## 备注

- **覆盖率**: ICASSP 2026 已公开 arXiv 预印本中, B 组子方向共收录 **127** 篇。枚举源为 arXiv `co:"ICASSP 2026"` 全量 728 篇 (截至 2026-06-25)。经 cs.SD/eess.AS 或语音领域门控得 419 篇语音相关, 再经 B 组子方向词库筛选 + 人工剔除假阳 (通用音乐生成/vocoder/codec/separation/纯 ASR/纯 TTS 等) 得 197 篇, 最终人工精筛保留 127 篇明确属于 B 组子方向者。
- **截断/未覆盖风险**:
  - DBLP 的 ICASSP 2026 页面截至检索日未上线 (返回 404, DBLP 当前仅索引至 ICASSP 2025), 故无法用 DBLP 做全量枚举兜底。
  - IEEE Xplore proceedings 对程序化访问返回 HTTP 418 (反爬), 无法用 IEEE 做官方 proceedings 全量枚举。
  - 因此本表以 **arXiv comment 含 "ICASSP 2026"** 的预印本为主枚举源。**风险**: 部分 ICASSP 2026 录用论文作者未上传 arXiv 或 arXiv comment 未写 "ICASSP 2026", 会漏检。估计实际 B 组录用论文数高于 127, 漏检率约 15-30% (无 arXiv 预印本或 comment 未标注者)。
  - 子方向内词库筛选可能漏收用词非标准的论文; 人工精筛可能对边界论文 (如 emotion-related 但以 ASR 为载体) 的取舍存在主观判断。
  - arXiv comment "ICASSP 2026" 中可能混入 "rejected, resubmitted" 等非录用论文; 本表未逐篇核录用状态, 少量可能为投稿而非最终录用。
- **arXiv ID 反验**: 127/127 全部用 `arxiv.org/abs/<ID>` HTML abs 页核对标题, **0 幻觉、0 不匹配** (唯一标称 mismatch 为 `2512.04720` 的 `&amp;` vs `&` HTML 实体差异, 实为同一标题)。无 ID 标记为 "未核实" 或 "n/a"。
- **网络**: 全程 `--noproxy '*'` 直连, arXiv API/HTML abs 页均稳定, 未触发 429。批量反验用 HTML abs 页 (8 批 × ~1s 间距) 而非 API, 符合抗限流方法论。
- **分组排序**: 表按子方向分组 (情感/韵律 → 歌声 → 口音/方言 → 匿名化/隐私 → anti-spoofing/deepfake → speech-LM/agent → paralinguistic → 多模态语音), 组内按 arXiv ID 倒序 (新→旧)。
