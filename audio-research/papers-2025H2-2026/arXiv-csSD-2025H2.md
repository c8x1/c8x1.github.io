# arXiv cs.SD 2025H2 (净新增: 补漏+未覆盖venue+arXiv-only)

> 归属: 混合（编创 125 / 非编创 156） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


> 检索日期 2026-06-25 | 枚举总数 1803 | 域内 766 | 已收录跳过 485 | 净新增 281 (补漏 29/未覆盖venue 19/arXiv-only 233)
>
> 枚举: arXiv API cat:cs.SD + submittedDate 2025-07-01..2025-12-31, 分页200/页(9s间距防429), 共10页取完1803条(去重后1803)。域内筛选: 排除纯ASR(仅转写)、纯TTS(仅文本→语音无可控/零样本/编辑/agent)、纯音乐MIR/音乐生成、纯声学事件/场景检测(非语音)、纯图像/雷达/通信/水声/空间音频/ANC/DOA/房间声学/beamforming; 保留VC/克隆、语音编辑、生成式增强/分离/修复/BWE、说话人分离/TSE、情感/韵律、口音/方言、匿名化/隐私/anti-spoofing/deepfake、神经编解码(语音)、speech-LM/指令/agent、paralinguistic、语音多模态、歌声; 边界模糊保留标注。comment 关键词归一化 venue-year, 无关键词→arXiv-only。去重: 与 eess.AS 两 md + 17 venue md(共2086 ID)比对, 命中即"已收录"跳过。

| 论文 Title | arXiv ID | comment归属venue | 状态 | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|------------|----------|------------------|------|--------|------|--------|----------|--------|

## 补漏 (29)

### 【编创】生成式增强/分离/修复/BWE (5)
| AD-AVSR: Asymmetric Dual-stream Enhancement for Robust Audio-Visual Speech Recognition | 2508.07608 | ACMMM-2025 | 补漏 | 强化学习 | 增强/分离/修复、语音多模态 | 统一/端到端框架、数据集/基准 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |
| Shortcut Flow Matching for Speech Enhancement: Step-Invariant flows via single stage training | 2509.21522 | ICASSP-2026 | 补漏 | 扩散、流匹配、微调/适配器 | 增强/分离/修复、边缘/实时 | 实时/低延迟、轻量/高效 | 实时性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Lightweight Front-end Enhancement for Robust ASR via Frame Resampling and Sub-Band Pruning | 2509.21833 | Interspeech-2025 | 补漏 | 待核 | 增强/分离/修复、ASR/识别 | 轻量/高效、数据集/基准 | 鲁棒性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| LSZone: A Lightweight Spatial Information Modeling Architecture for Real-time In-car Multi-zone Speech Separation | 2510.10687 | ICASSP-2026 | 补漏 | 实时/流式 | 增强/分离/修复、边缘/实时 | 实时/低延迟、轻量/高效 | 鲁棒性、实时性 | 待核(数据/算力/特定语种/评测指标) |
| Improving DF-Conformer Using Hydra For High-Fidelity Generative Speech Enhancement on Discrete Codec Token | 2511.02454 | ICASSP-2026 | 补漏 | Transformer/注意力、Mamba/SS… | 增强/分离/修复 | 统一/端到端框架、轻量/高效 | 实时性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】说话人分离/TSE (2)
| UniSE: A Unified Framework for Decoder-only Autoregressive LM-based Speech Enhancement | 2510.20441 | ICASSP-2026 | 补漏 | 语言模型/自回归、神经编解码 | 增强/分离/修复 | 统一/端到端框架、数据集/基准 | 待核 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】情感/韵律 (2)
| Enhancing Speech Emotion Recognition with Multi-Task Learning and Dynamic Feature Fusion | 2508.17878 | Interspeech-2025 | 补漏 | Transformer/注意力、自监督、微调/适… | 情感/韵律 | 统一/端到端框架、新架构 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Emotion-Aligned Generation in Diffusion Text to Speech Models via Preference-Guided Optimization | 2509.25416 | ICASSP-2026 | 补漏 | 扩散、强化学习 | 增强/分离/修复、情感/韵律 | 统一/端到端框架、可控/指令 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】口音/方言 (1)
| Spoken Conversational Agents with Large Language Models | 2512.02593 | EMNLP-2025 | 补漏 | 语言模型/自回归、实时/流式、蒸馏/少步 | 口音/方言、匿名化/隐私 | 统一/端到端框架、实时/低延迟 | 鲁棒性、隐私/安全 | 待核(数据/算力/特定语种/评测指标) |

### 【非编创】匿名化/隐私 (1)
| Content Anonymization for Privacy in Long-form Audio | 2510.12780 | ICASSP-2026 | 补漏 | 变分 | 对话/智能体/会议、隐私/安全/鉴伪 | 匿名化/去标识 | 隐私-效用折中、说话人不可链接性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】anti-spoofing/deepfake (4)
| WildSpoof Challenge Evaluation Plan | 2508.16858 | ICASSP-2026 | 补漏 | 可控/指令、GAN、变分 | 隐私/安全/鉴伪、增强/分离/修复 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Multi-level SSL Feature Gating for Audio Deepfake Detection | 2509.03409 | ACMMM-2025 | 补漏 | 自监督、变分 | 多语言/低资源、隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SVeritas: Benchmark for Robust Speaker Verification under Diverse Conditions | 2509.17091 | EMNLP-2025 | 补漏 | 语言模型/自回归、可控/指令、图网络 | 隐私/安全/鉴伪、增强/分离/修复 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Robust TTS Training via Self-Purifying Flow Matching for the WildSpoof 2026 TTS Track | 2512.17293 | ICASSP-2026 | 补漏 | 流匹配、微调/适配器 | 隐私/安全/鉴伪、增强/分离/修复 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】神经编解码/声码器 (2)
| Speaking Clearly: A Simplified Whisper-Based Codec for Low-Bitrate Speech Coding | 2510.20504 | ICASSP-2026 | 补漏 | 语言模型/自回归、低资源、变分 | 通用语音处理 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Adapting Neural Audio Codecs to EEG | 2511.23142 | NeurIPS-2025 | 补漏 | Transformer/注意力、自监督、微调/适配器 | 副语言/病理/无障碍 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |


### 【非编创】TTS/语音生成 (1)
| Progressive Facial Granularity Aggregation with Bilateral Attribute-based Enhancement for Face-to-Speech Synthesis | 2509.07376 | EMNLP-2025 | 补漏 | 微调/适配器 | 增强/分离/修复、语音多模态 | 鲁棒、偏好/对齐优化 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |

### 【非编创】歌声(singing voice) (3)
| CoMelSinger: Discrete Token-Based Zero-Shot Singing Synthesis With Structured Melody Control and Guidance | 2509.19883 | TASLP-2025 | 补漏 | 语言模型/自回归、零样本、可控/指令 | 歌声/音乐 | 零样本歌声合成/SVC/编辑 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Not All Deepfakes Are Created Equal: Triaging Audio Forgeries for Robust Deepfake Singer Identification | 2510.17474 | NeurIPS-2025 | 补漏 | — | 隐私/安全/鉴伪、歌声/音乐 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Adapting Speech Language Model to Singing Voice Synthesis | 2512.14657 | NeurIPS-2025 | 补漏 | 流匹配、语言模型/自回归、自监督 | 歌声/音乐、增强/分离/修复 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【编创】语音多模态 (3)
| LTA-L2S: Lexical Tone-Aware Lip-to-Speech Synthesis for Mandarin with Cross-Lingual Transfer Learning | 2509.25670 | ICASSP-2026 | 补漏 | 自监督、微调/适配器 | 语音多模态、TTS/语音生成 | 跨域泛化 | 自然度/音质、精度 | 待核(数据/算力/特定语种/评测指标) |
| MoME: Mixture of Matryoshka Experts for Audio-Visual Speech Recognition | 2510.04136 | NeurIPS-2025 | 补漏 | 语言模型/自回归 | 语音多模态、ASR/识别 | 统一/端到端框架、鲁棒 | 鲁棒性、泛化 | 待核(数据/算力/特定语种/评测指标) |
| Mitigating Attention Sinks and Massive Activations in Audio-Visual Speech Recognition with LLMs | 2510.22603 | ICASSP-2026 | 补漏 | 语言模型/自回归、Transformer/注意力… | 语音多模态、ASR/识别 | 新架构 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |

### 【非编创】说话人验证/识别 (1)
| Rethinking Leveraging Pre-Trained Multi-Layer Representations for Speaker Verification | 2512.22148 | Interspeech-2025 | 补漏 | Transformer/注意力、变分 | 通用语音处理 | 鲁棒说话人验证/跨域 | EER、鲁棒性、可部署性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】ASR/识别(边界) (1)
| UniCoM: A Universal Code-Switching Speech Generator | 2508.15244 | EMNLP-2025 | 补漏 | 变分 | 多语言/低资源 | ASR/识别(边界,与生成交叉) | 识别精度、鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】其他/边界 (1)
| From Independence to Interaction: Speaker-Aware Simulation of Multi-Speaker Conversational Timing | 2509.15808 | ICASSP-2026 | 补漏 | 变分 | 对话/智能体/会议 | 边界/交叉方向 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |

## 未覆盖venue (19)

### 【编创】说话人分离/TSE (1)
| Neural Speech Separation with Parallel Amplitude and Phase Spectrum Estimation | 2509.13825 | APSIPA-2025 | 未覆盖venue | Transformer/注意力 | 增强/分离/修复 | 数据集/基准 | 精度、泛化 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】情感/韵律 (1)
| DiFlow-TTS: Compact and Low-Latency Zero-Shot Text-to-Speech with Discrete Flow Matching | 2509.09631 | Interspeech-2026 | 未覆盖venue | 扩散、流匹配、语言模型/自回归 | 增强/分离/修复、情感/韵律 | 统一/端到端框架、零样本 | 鲁棒性、实时性 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】口音/方言 (5)
| K-Function: Joint Pronunciation Transcription and Feedback for Evaluating Kids Language Function | 2507.03043 | ICASSP-2025 | 未覆盖venue | 语言模型/自回归、Mamba/SSM | 口音/方言、ASR/识别 | 统一/端到端框架 | 自然度/音质、精度 | 待核(数据/算力/特定语种/评测指标) |
| Geolocation-Aware Robust Spoken Language Identification | 2508.17148 | ASRU-2025 | 未覆盖venue | 自监督 | 口音/方言、多语言/低资源 | 统一/端到端框架、数据集/基准 | 鲁棒性、零样本/低资源可用 | 待核(数据/算力/特定语种/评测指标) |
| Data-efficient Targeted Token-level Preference Optimization for LLM-based Text-to-Speech | 2510.05799 | ACL-2026 | 未覆盖venue | 语言模型/自回归、强化学习 | 口音/方言、TTS/语音生成 | 轻量/高效、鲁棒 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Dialect Identification Using Resource-Efficient Fine-Tuning Approaches | 2512.02074 | APSIPA-2025 | 未覆盖venue | 微调/适配器 | 口音/方言 | 轻量/高效、数据集/基准 | 精度、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| Style Amnesia: Investigating Speaking Style Degradation and Mitigation in Multi-Turn Spoken Language Models | 2512.23578 | ACL-2026 | 未覆盖venue | 语言模型/自回归 | 情感/韵律、口音/方言 | 可控/指令 | 表现力 | 待核(数据/算力/特定语种/评测指标) |

### 【非编创】匿名化/隐私 (1)
| Protecting Bystander Privacy via Selective Hearing in Audio LLMs | 2512.06380 | ACL-2026 | 未覆盖venue | 语言模型/自回归、微调/适配器、变分 | 隐私/安全/鉴伪 | 匿名化/去标识 | 隐私-效用折中、说话人不可链接性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】anti-spoofing/deepfake (3)
| QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection | 2509.20679 | Interspeech-2026 | 未覆盖venue | 变分、Mamba/SSM | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| MultiAPI Spoof: A Multi-API Dataset and Local-Attention Network for Speech Anti-spoofing Detection | 2512.07352 | Interspeech-2026 | 未覆盖venue | Transformer/注意力、变分 | 隐私/安全/鉴伪、增强/分离/修复 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The Affective Bridge: Preserving Speech Representations while Enhancing Deepfake Detection vian emotional Constraints | 2512.11241 | SLT-2026 | 未覆盖venue | 微调/适配器、变分 | 副语言/病理/无障碍、隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】神经编解码/声码器 (1)
| Two-Dimensional Quantization for Geometry-Aware Audio Coding | 2512.01537 | ICML-2026 | 未覆盖venue | 语言模型/自回归、变分 | 歌声/音乐 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |



### 【非编创】歌声(singing voice) (2)
| Generating Separated Singing Vocals Using a Diffusion Model Conditioned on Music Mixtures | 2511.21342 | WASPAA-2025 | 未覆盖venue | 扩散模型、可控/指令 | 歌声/音乐、增强/分离/修复 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Robust Training of Singing Voice Synthesis Using Prior and Posterior Uncertainty | 2512.14653 | ASRU-2025 | 未覆盖venue | 变分 | 歌声/音乐 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】ASR/识别(边界) (1)
| Cross-Attention is Half Explanation in Speech-to-Text Models | 2509.18010 | Interspeech-2026 | 未覆盖venue | Transformer/注意力、变分 | 多语言/低资源 | ASR/识别(边界,与生成交叉) | 识别精度、鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

## arXiv-only (233)

### 【编创】VC/克隆 (18)
| Any-to-any Speaker Attribute Perturbation for Asynchronous Voice Anonymization | 2508.15565 | arXiv-only | arXiv-only | 待核 | 匿名化/隐私 | 数据集/基准 | 鲁棒性、隐私/安全 | 待核(数据/算力/特定语种/评测指标) |
| When Fine-Tuning is Not Enough: Lessons from HSAD on Hybrid and Adversarial Audio Spoof Detection | 2509.07323 | arXiv-only | arXiv-only | Transformer/注意力、自监督、微调/适… | 语音克隆/VC、情感/韵律 | 统一/端到端框架、零样本 | 鲁棒性、零样本/低资源可用 | 待核(数据/算力/特定语种/评测指标) |
| Spectral Masking and Interpolation Attack (SMIA): A Black-box Adversarial Attack against Voice Authentication and Anti-Spoofing Systems | 2509.07677 | arXiv-only | arXiv-only | 待核 | 语音克隆/VC、鉴伪/安全 | 统一/端到端框架、偏好/对齐优化 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |
| DeCodec: Rethinking Audio Codecs as Universal Disentangled Representation Learners | 2509.09201 | arXiv-only | arXiv-only | 解耦、神经编解码 | 语音克隆/VC、增强/分离/修复 | 统一/端到端框架、可控/指令 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |
| A Lightweight Pipeline for Noisy Speech Voice Cloning and Accurate Lip Sync Synthesis | 2509.12831 | arXiv-only | arXiv-only | 扩散、Transformer/注意力、GAN | 语音克隆/VC、情感/韵律 | 零样本、实时/低延迟 | 鲁棒性、实时性 | 待核(数据/算力/特定语种/评测指标) |
| Cross-Lingual F5-TTS: Towards Language-Agnostic Voice Cloning and Speech Synthesis | 2509.14579 | arXiv-only | arXiv-only | 待核 | 语音克隆/VC、TTS/语音生成 | 统一/端到端框架、跨域泛化 | 自然度/音质、零样本/低资源可用 | 待核(数据/算力/特定语种/评测指标) |
| VoxCPM: Tokenizer-Free TTS for Context-Aware Speech Generation and True-to-Life Voice Cloning | 2509.24650 | arXiv-only | arXiv-only | 扩散、语言模型/自回归、神经编解码 | 语音克隆/VC、情感/韵律 | 统一/端到端框架、零样本 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| MGM-Omni: Scaling Omni LLMs to Personalized Long-Horizon Speech | 2509.25131 | arXiv-only | arXiv-only | 语言模型/自回归、强化学习、实时/流式 | 语音克隆/VC、语音多模态 | 统一/端到端框架、零样本 | 实时性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| VCB Bench: An Evaluation Benchmark for Audio-Grounded Large Language Model Conversational Agents | 2510.11098 | arXiv-only | arXiv-only | 语言模型/自回归 | 语音克隆/VC、语音多模态 | 统一/端到端框架、可控/指令 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Perturbation Self-Supervised Representations for Cross-Lingual Emotion TTS: Stage-Wise Modeling of Emotion and Speaker | 2510.11124 | arXiv-only | arXiv-only | 自监督、解耦 | 语音克隆/VC、情感/韵律 | 统一/端到端框架、解耦可控 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| VCTR: A Transformer-Based Model for Non-parallel Voice Conversion | 2510.12964 | arXiv-only | arXiv-only | Transformer/注意力、GAN、变分 | 语音克隆/VC | 轻量/高效、新架构 | 鲁棒性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| UniTok-Audio: A Unified Audio Generation Framework via Generative Modeling on Discrete Codec Tokens | 2510.26372 | arXiv-only | arXiv-only | 语言模型/自回归、神经编解码 | 语音克隆/VC、增强/分离/修复 | 统一/端到端框架 | 自然度/音质、泛化 | 待核(数据/算力/特定语种/评测指标) |
| FabasedVC: Enhancing Voice Conversion with Text Modality Fusion and Phoneme-Level SSL Features | 2511.10112 | arXiv-only | arXiv-only | Transformer/注意力、自监督 | 语音克隆/VC、增强/分离/修复 | 统一/端到端框架、数据集/基准 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| SceneGuard: Training-Time Voice Protection with Scene-Consistent Audible Background Noise | 2511.16114 | arXiv-only | arXiv-only | 待核 | 语音克隆/VC、增强/分离/修复 | 鲁棒 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Continual Audio Deepfake Detection via Universal Adversarial Perturbation | 2511.19974 | arXiv-only | arXiv-only | 自监督、微调/适配器 | 语音克隆/VC、鉴伪/安全 | 统一/端到端框架、轻量/高效 | 鲁棒性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| A comparative study of generative models for child voice conversion | 2512.12129 | arXiv-only | arXiv-only | 扩散、GAN、变分 | 语音克隆/VC、增强/分离/修复 | 轻量/高效、数据集/基准 | 鲁棒性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| DisCo-Speech: Controllable Zero-Shot Speech Generation with A Disentangled Speech Codec | 2512.13251 | arXiv-only | arXiv-only | 语言模型/自回归、解耦、神经编解码 | 语音克隆/VC、情感/韵律 | 统一/端到端框架、零样本 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Zero-Shot to Zero-Lies: Detecting Bengali Deepfake Audio through Transfer Learning | 2512.21702 | arXiv-only | arXiv-only | Transformer/注意力、自监督、微调/适… | 语音克隆/VC、鉴伪/安全 | 零样本、数据集/基准 | 零样本/低资源可用、精度 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】语音编辑 (9)
| Towards Automatic Evaluation and High-Quality Pseudo-Parallel Dataset Construction for Audio Editing: A Human-in-the-Loop Method | 2508.11966 | arXiv-only | arXiv-only | 语言模型/自回归、自监督、强化学习 | 语音编辑、边缘/实时 | 统一/端到端框架、数据集/基准 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| RephraseTTS: Dynamic Length Text based Speech Insertion with Speaker Style Transfer | 2508.17031 | arXiv-only | arXiv-only | 语言模型/自回归、Transformer/注意力 | 语音编辑、情感/韵律 | 待核 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Recomposer: Event-roll-guided generative audio editing | 2509.05256 | arXiv-only | arXiv-only | Transformer/注意力、图网络 | 语音编辑、ASR/识别 | 偏好/对齐优化、新架构 | 待核 | 待核(数据/算力/特定语种/评测指标) |
| CodecSep: Prompt-Driven Universal Sound Separation on Neural Audio Codec Latents | 2509.11717 | arXiv-only | arXiv-only | Transformer/注意力、神经编解码 | 语音编辑、增强/分离/修复 | 统一/端到端框架、可控/指令 | 实时性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| Virtual Consistency for Audio Editing | 2509.17219 | arXiv-only | arXiv-only | 扩散、微调/适配器 | 语音编辑 | 数据集/基准 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Coherent Audio-Visual Editing via Conditional Audio Generation Following Video Edits | 2512.07209 | arXiv-only | arXiv-only | 待核 | 语音编辑、语音多模态 | 数据集/基准 | 待核 | 待核(数据/算力/特定语种/评测指标) |
| Schrodinger Audio-Visual Editor: Object-Level Audiovisual Removal | 2512.12875 | arXiv-only | arXiv-only | 待核 | 语音编辑、语音多模态 | 统一/端到端框架、可控/指令 | 精度 | 待核(数据/算力/特定语种/评测指标) |
| Audio MultiChallenge: A Multi-Turn Evaluation of Spoken Dialogue Systems on Natural Human Interaction | 2512.14865 | arXiv-only | arXiv-only | 待核 | 语音编辑、对话/agent | 统一/端到端框架、可控/指令 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| MMEDIT: A Unified Framework for Multi-Type Audio Editing via Audio Language Model | 2512.20339 | arXiv-only | arXiv-only | 扩散、语言模型/自回归 | 语音编辑 | 统一/端到端框架、可控/指令 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】生成式增强/分离/修复/BWE (13)
| Audio-Visual Speech Enhancement: Architectural Design and Deployment Strategies | 2508.08468 | arXiv-only | arXiv-only | 实时/流式 | 增强/分离/修复、语音多模态 | 统一/端到端框架、实时/低延迟 | 鲁棒性、实时性 | 待核(数据/算力/特定语种/评测指标) |
| Optimizing Neural Architectures for Hindi Speech Separation and Enhancement in Noisy Environments | 2508.12009 | arXiv-only | arXiv-only | 微调/适配器 | 增强/分离/修复、边缘/实时 | 数据集/基准、偏好/对齐优化 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |
| Flowing Straighter with Conditional Flow Matching for Accurate Speech Enhancement | 2508.20584 | arXiv-only | arXiv-only | 流匹配 | 增强/分离/修复 | 待核 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Target matching based generative model for speech enhancement | 2509.07521 | arXiv-only | arXiv-only | 扩散 | 增强/分离/修复 | 统一/端到端框架、轻量/高效 | 鲁棒性、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| ArtiFree: Detecting and Reducing Generative Artifacts in Diffusion-based Speech Enhancement | 2509.19495 | arXiv-only | arXiv-only | 扩散 | 增强/分离/修复 | 待核 | 自然度/音质、精度 | 待核(数据/算力/特定语种/评测指标) |
| Loud-loss: A Perceptually Motivated Loss Function for Speech Enhancement Based on Equal-Loudness Contours | 2511.05945 | arXiv-only | arXiv-only | 待核 | 增强/分离/修复 | 数据集/基准 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Speech Separation for Hearing-Impaired Children in the Classroom | 2511.07677 | arXiv-only | arXiv-only | 强化学习、微调/适配器、实时/流式 | 增强/分离/修复、边缘/实时 | 实时/低延迟、轻量/高效 | 鲁棒性、实时性 | 待核(数据/算力/特定语种/评测指标) |
| Regularized Schrödinger Bridge: Alleviating Distortion and Exposure Bias in Solving Inverse Problems | 2511.11686 | arXiv-only | arXiv-only | 扩散 | 增强/分离/修复 | 统一/端到端框架 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| IMSE: Efficient U-Net-based Speech Enhancement using Inception Depthwise Convolution and Amplitude-Aware Linear Attention | 2511.14515 | arXiv-only | arXiv-only | Transformer/注意力 | 增强/分离/修复 | 轻量/高效、数据集/基准 | 自然度/音质、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| VibOmni: Towards Scalable Bone-conduction Speech Enhancement on Earables | 2512.02515 | arXiv-only | arXiv-only | 待核 | 增强/分离/修复、对话/agent | 统一/端到端框架、轻量/高效 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Investigating training objective for flow matching-based speech enhancement | 2512.10382 | arXiv-only | arXiv-only | 流匹配 | 增强/分离/修复 | 轻量/高效 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| CogSR: Semantic-Aware Speech Super-Resolution via Chain-of-Thought Guided Flow Matching | 2512.16304 | arXiv-only | arXiv-only | 流匹配、语言模型/自回归 | 增强/分离/修复 | 统一/端到端框架、鲁棒 | 鲁棒性、精度 | 待核(数据/算力/特定语种/评测指标) |
| DPDFNet: Boosting DeepFilterNet2 via Dual-Path RNN | 2512.16420 | arXiv-only | arXiv-only | 微调/适配器、实时/流式 | 增强/分离/修复、多语言/低资源 | 统一/端到端框架、实时/低延迟 | 鲁棒性、实时性 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】说话人分离/TSE (11)
| SpeakerLM: End-to-End Versatile Speaker Diarization and Recognition with Multimodal Large Language Models | 2508.06372 | arXiv-only | arXiv-only | 语言模型/自回归 | 说话人分离、语音多模态 | 统一/端到端框架、数据集/基准 | 鲁棒性、泛化 | 待核(数据/算力/特定语种/评测指标) |
| Thinking in cocktail party: Chain-of-Thought and reinforcement learning for target speaker automatic speech recognition | 2509.15612 | arXiv-only | arXiv-only | 语言模型/自回归、强化学习、微调/适配器 | 增强/分离/修复、ASR/识别 | 统一/端到端框架、数据集/基准 | 泛化 | 待核(数据/算力/特定语种/评测指标) |
| Brainprint-Modulated Target Speaker Extraction | 2509.17883 | arXiv-only | arXiv-only | Transformer/注意力 | 增强/分离/修复 | 统一/端到端框架、数据集/基准 | 鲁棒性、泛化 | 待核(数据/算力/特定语种/评测指标) |
| From Coarse to Fine: Recursive Audio-Visual Semantic Enhancement for Speech Separation | 2509.22425 | arXiv-only | arXiv-only | 待核 | 增强/分离/修复、语音多模态 | 统一/端到端框架、数据集/基准 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |
| Benchmarking Diarization Models | 2509.26177 | arXiv-only | arXiv-only | 待核 | 说话人分离、多语言/低资源 | 数据集/基准 | 待核 | 待核(数据/算力/特定语种/评测指标) |
| SAGE-LD: Towards Scalable and Generalizable End-to-End Language Diarization via Simulated Data Augmentation | 2510.00582 | arXiv-only | arXiv-only | 强化学习 | 说话人分离、多语言/低资源 | 统一/端到端框架、数据集/基准 | 泛化 | 待核(数据/算力/特定语种/评测指标) |
| TFGA-Net: Temporal-Frequency Graph Attention Network for Brain-Controlled Speaker Extraction | 2510.12275 | arXiv-only | arXiv-only | Transformer/注意力、图网络 | 增强/分离/修复、情感/韵律 | 可控/指令、数据集/基准 | 表现力 | 待核(数据/算力/特定语种/评测指标) |
| DELULU: Discriminative Embedding Learning Using Latent Units for Speaker-Aware Self-Trained Speech Foundational Model | 2510.17662 | arXiv-only | arXiv-only | 自监督、微调/适配器、零样本 | 说话人分离、口音/方言 | 零样本、数据集/基准 | 零样本/低资源可用 | 待核(数据/算力/特定语种/评测指标) |
| Probabilistic Fusion and Calibration of Neural Speaker Diarization Models | 2511.22696 | arXiv-only | arXiv-only | 待核 | 说话人分离 | 统一/端到端框架、数据集/基准 | 待核 | 待核(数据/算力/特定语种/评测指标) |
| O-EENC-SD: Efficient Online End-to-End Neural Clustering for Speaker Diarization | 2512.15229 | arXiv-only | arXiv-only | 待核 | 说话人分离、对话/agent | 统一/端到端框架、轻量/高效 | 效率/成本 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】情感/韵律 (44)
| TAGF: Time-aware Gated Fusion for Multimodal Valence-Arousal Estimation | 2507.02080 | arXiv-only | arXiv-only | Transformer/注意力 | 情感/韵律、语音多模态 | 统一/端到端框架、数据集/基准 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| NonverbalTTS: A Public English Corpus of Text-Aligned Nonverbal Vocalizations with Emotion Annotations for Text-to-Speech | 2507.13155 | arXiv-only | arXiv-only | 微调/适配器 | 情感/韵律、TTS/语音生成 | 数据集/基准 | 表现力 | 待核(数据/算力/特定语种/评测指标) |
| NVSpeech: An Integrated and Scalable Pipeline for Human-Like Speech Modeling with Paralinguistic Vocalizations | 2508.04195 | arXiv-only | arXiv-only | 微调/适配器、零样本 | 情感/韵律、TTS/语音生成 | 零样本、可控/指令 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| EmoAugNet: A Signal-Augmented Hybrid CNN-LSTM Framework for Speech Emotion Recognition | 2508.06321 | arXiv-only | arXiv-only | 待核 | 情感/韵律 | 统一/端到端框架、轻量/高效 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Improving French Synthetic Speech Quality via SSML Prosody Control | 2508.17494 | arXiv-only | arXiv-only | 语言模型/自回归、Mamba/SSM、微调/适配器 | 情感/韵律、TTS/语音生成 | 统一/端到端框架、数据集/基准 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Speech Emotion Recognition via Entropy-Aware Score Selection | 2508.20796 | arXiv-only | arXiv-only | 自监督 | 增强/分离/修复、情感/韵律 | 统一/端到端框架、数据集/基准 | 表现力 | 待核(数据/算力/特定语种/评测指标) |
| VoxRole: A Comprehensive Benchmark for Evaluating Speech-Based Role-Playing Agents | 2509.03940 | arXiv-only | arXiv-only | 语言模型/自回归、Mamba/SSM | 情感/韵律、对话/agent | 数据集/基准、偏好/对齐优化 | 表现力 | 待核(数据/算力/特定语种/评测指标) |
| CLAIP-Emo: Parameter-Efficient Adaptation of Language-supervised models for In-the-Wild Audiovisual Emotion Recognition | 2509.14527 | arXiv-only | arXiv-only | Transformer/注意力、微调/适配器 | 情感/韵律、语音多模态 | 统一/端到端框架、轻量/高效 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| MECap-R1: Emotion-aware Policy with Reinforcement Learning for Multimodal Emotion Captioning | 2509.18729 | arXiv-only | arXiv-only | 强化学习 | 情感/韵律、语音多模态 | 统一/端到端框架、数据集/基准 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Finding My Voice: Generative Reconstruction of Disordered Speech for Automated Clinical Evaluation | 2509.19231 | arXiv-only | arXiv-only | Mamba/SSM、解耦 | 情感/韵律、口音/方言 | 统一/端到端框架、解耦可控 | 表现力、精度 | 待核(数据/算力/特定语种/评测指标) |
| An Efficient Transfer Learning Method Based on Adapter with Local Attributes for Speech Emotion Recognition | 2509.23795 | arXiv-only | arXiv-only | Transformer/注意力、自监督、微调/适… | 情感/韵律、对话/agent | 轻量/高效、数据集/基准 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Optimizing Speech Language Models for Acoustic Consistency | 2509.26276 | arXiv-only | arXiv-only | 语言模型/自回归、自监督、微调/适配器 | 情感/韵律 | 数据集/基准、鲁棒 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Stream RAG: Instant and Accurate Spoken Dialogue Systems with Streaming Tool Usage | 2510.02044 | arXiv-only | arXiv-only | 语言模型/自回归、图网络、实时/流式 | 对话/agent、TTS/语音生成 | 统一/端到端框架、实时/低延迟 | 实时性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Flamed-TTS: Flow Matching Attention-Free Models for Efficient Generating and Dynamic Pacing Zero-shot Text-to-Speech | 2510.02848 | arXiv-only | arXiv-only | 扩散、流匹配、语言模型/自回归 | 情感/韵律、TTS/语音生成 | 统一/端到端框架、零样本 | 实时性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Listening or Reading? Evaluating Speech Awareness in Chain-of-Thought Speech-to-Text Translation | 2510.03115 | arXiv-only | arXiv-only | 待核 | 情感/韵律、ASR/识别 | 鲁棒 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| AUREXA-SE: Audio-Visual Unified Representation Exchange Architecture with Cross-Attention and Squeezeformer for Speech Enhancement | 2510.05295 | arXiv-only | arXiv-only | Transformer/注意力 | 增强/分离/修复、语音多模态 | 统一/端到端框架、轻量/高效 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| EmoHRNet: High-Resolution Neural Network Based Speech Emotion Recognition | 2510.06072 | arXiv-only | arXiv-only | 待核 | 情感/韵律 | 数据集/基准 | 表现力 | 待核(数据/算力/特定语种/评测指标) |
| Universal Discrete-Domain Speech Enhancement | 2510.09974 | arXiv-only | arXiv-only | 神经编解码 | 增强/分离/修复、情感/韵律 | 鲁棒、偏好/对齐优化 | 鲁棒性、泛化 | 待核(数据/算力/特定语种/评测指标) |
| Improving Speech Emotion Recognition with Mutual Information Regularized Generative Model | 2510.10078 | arXiv-only | arXiv-only | Transformer/注意力、GAN | 情感/韵律、语音多模态 | 统一/端到端框架、数据集/基准 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| BridgeCode: A Dual Speech Representation Paradigm for Autoregressive Zero-Shot Text-to-Speech Synthesis | 2510.11646 | arXiv-only | arXiv-only | 语言模型/自回归、零样本 | TTS/语音生成 | 统一/端到端框架、零样本 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| TASLA: Text-Aligned Speech Tokens with Multiple Layer-Aggregation | 2510.14934 | arXiv-only | arXiv-only | Transformer/注意力 | 情感/韵律 | 统一/端到端框架、新架构 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| SpikeVox: Towards Energy-Efficient Speech Therapy Framework with Spike-driven Generative Language Models | 2510.15566 | arXiv-only | arXiv-only | 语言模型/自回归 | 情感/韵律、口音/方言 | 统一/端到端框架、轻量/高效 | 精度、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| Emotion Detection in Speech Using Lightweight and Transformer-Based Models: A Comparative and Ablation Study | 2511.00402 | arXiv-only | arXiv-only | Transformer/注意力、自监督、实时/流式 | 情感/韵律、边缘/实时 | 实时/低延迟、轻量/高效 | 实时性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| CantoASR: Prosody-Aware ASR-LALM Collaboration for Low-Resource Cantonese | 2511.04139 | arXiv-only | arXiv-only | 语言模型/自回归、微调/适配器 | 情感/韵律、口音/方言 | 统一/端到端框架、可控/指令 | 表现力、零样本/低资源可用 | 待核(数据/算力/特定语种/评测指标) |
| MERaLiON-SER: Robust Speech Emotion Recognition Model for English and SEA Languages | 2511.04914 | arXiv-only | arXiv-only | 语言模型/自回归 | 情感/韵律、语音多模态 | 统一/端到端框架、轻量/高效 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Enabling Automatic Self-Talk Detection via Earables | 2511.07493 | arXiv-only | arXiv-only | 语言模型/自回归 | 情感/韵律、对话/agent | 数据集/基准、鲁棒 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Robust Multi-modal Task-oriented Communications with Redundancy-aware Representations | 2511.08642 | arXiv-only | arXiv-only | 变分 | 情感/韵律 | 统一/端到端框架、轻量/高效 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Speech Emotion Recognition with Phonation Excitation Information and Articulatory Kinematics | 2511.07955 | arXiv-only | arXiv-only | 图网络 | 情感/韵律 | 数据集/基准、偏好/对齐优化 | 表现力 | 待核(数据/算力/特定语种/评测指标) |
| StyleBreak: Revealing Alignment Vulnerabilities in Large Audio-Language Models via Style-Aware Audio Jailbreak | 2511.10692 | arXiv-only | arXiv-only | 语言模型/自回归、微调/适配器 | 情感/韵律、副语言/病理 | 统一/端到端框架、鲁棒 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Beyond saliency: enhancing explanation of speech emotion recognition with expert-referenced acoustic cues | 2511.11691 | arXiv-only | arXiv-only | 待核 | 情感/韵律 | 统一/端到端框架、数据集/基准 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| MSMT-FN: Multi-segment Multi-task Fusion Network for Marketing Audio Classification | 2511.11006 | arXiv-only | arXiv-only | 待核 | 情感/韵律 | 轻量/高效、数据集/基准 | 表现力、效率/成本 | 待核(数据/算力/特定语种/评测指标) |
| MF-Speech: Achieving Fine-Grained and Compositional Control in Speech Generation via Factor Disentanglement | 2511.12074 | arXiv-only | arXiv-only | 解耦 | 情感/韵律 | 统一/端到端框架、可控/指令 | 表现力、精度 | 待核(数据/算力/特定语种/评测指标) |
| Preference-Based Learning in Audio Applications: A Systematic Analysis | 2511.13936 | arXiv-only | arXiv-only | 强化学习 | 情感/韵律 | 统一/端到端框架、数据集/基准 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Voiced-Aware Style Extraction and Style Direction Adjustment for Expressive Text-to-Speech | 2511.14824 | arXiv-only | arXiv-only | 待核 | TTS/语音生成 | 待核 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Three-Class Emotion Classification for Audiovisual Scenes Based on Ensemble Learning Scheme | 2511.17926 | arXiv-only | arXiv-only | 强化学习、图网络 | 情感/韵律、语音多模态 | 统一/端到端框架、轻量/高效 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Multi-Reward GRPO for Stable and Prosodic Single-Codebook TTS LLMs at Scale | 2511.21270 | arXiv-only | arXiv-only | 语言模型/自回归、强化学习、神经编解码 | 情感/韵律、TTS/语音生成 | 统一/端到端框架、轻量/高效 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| HPSU: A Benchmark for Human-Level Perception in Real-World Spoken Speech Understanding | 2511.23178 | arXiv-only | arXiv-only | 语言模型/自回归 | 情感/韵律、ASR/识别 | 统一/端到端框架、数据集/基准 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| STCTS: Generative Semantic Compression for Ultra-Low Bitrate Speech via Explicit Text-Prosody-Timbre Decomposition | 2512.00451 | arXiv-only | arXiv-only | 强化学习、解耦、神经编解码 | 情感/韵律、匿名化/隐私 | 统一/端到端框架、解耦可控 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| GLM-TTS Technical Report | 2512.14291 | arXiv-only | arXiv-only | 扩散、语言模型/自回归、强化学习 | 情感/韵律、口音/方言 | 统一/端到端框架、可控/指令 | 实时性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| InstructDubber: Instruction-based Alignment for Zero-shot Movie Dubbing | 2512.17154 | arXiv-only | arXiv-only | 语言模型/自回归、微调/适配器、零样本 | 情感/韵律、口音/方言 | 零样本、可控/指令 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Explainable Transformer-CNN Fusion for Noise-Robust Speech Emotion Recognition | 2512.18298 | arXiv-only | arXiv-only | Transformer/注意力、自监督 | 情感/韵律 | 统一/端到端框架、数据集/基准 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Task Vector in TTS: Toward Emotionally Expressive Dialectal Speech Synthesis | 2512.18699 | arXiv-only | arXiv-only | 零样本 | 情感/韵律、口音/方言 | 零样本、可控/指令 | 自然度/音质、表现力 | 待核(数据/算力/特定语种/评测指标) |
| Distilled HuBERT for Mobile Speech Emotion Recognition: A Cross-Corpus Validation Study | 2512.23435 | arXiv-only | arXiv-only | Transformer/注意力、自监督 | 情感/韵律、边缘/实时 | 轻量/高效、数据集/基准 | 鲁棒性、表现力 | 待核(数据/算力/特定语种/评测指标) |

### 【编创】口音/方言 (15)
| Mixture of LoRA Experts with Multi-Modal and Multi-Granularity LLM Generative Error Correction for Accented Speech Recognition | 2507.09116 | arXiv-only | arXiv-only | 语言模型/自回归、微调/适配器 | 口音/方言、ASR/识别 | 数据集/基准 | 精度 | 待核(数据/算力/特定语种/评测指标) |
| SpecASR: Accelerating LLM-based Automatic Speech Recognition via Speculative Decoding | 2507.18181 | arXiv-only | arXiv-only | 语言模型/自回归、Transformer/注意力… | 口音/方言、ASR/识别 | 统一/端到端框架、实时/低延迟 | 实时性、精度 | 待核(数据/算力/特定语种/评测指标) |
| WenetSpeech-Chuan: A Large-Scale Sichuanese Corpus with Rich Annotation for Dialectal Speech Processing | 2509.18004 | arXiv-only | arXiv-only | 待核 | 口音/方言、TTS/语音生成 | 统一/端到端框架、数据集/基准 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Building Tailored Speech Recognizers for Japanese Speaking Assessment | 2509.20655 | arXiv-only | arXiv-only | Mamba/SSM、图网络 | 口音/方言、ASR/识别 | 统一/端到端框架、新架构 | 精度 | 待核(数据/算力/特定语种/评测指标) |
| Zero- and One-Shot Data Augmentation for Sentence-Level Dysarthric Speech Recognition in Constrained Scenarios | 2510.16700 | arXiv-only | arXiv-only | 零样本 | 增强/分离/修复、口音/方言 | 零样本、轻量/高效 | 零样本/低资源可用、精度 | 待核(数据/算力/特定语种/评测指标) |
| Vox-Evaluator: Enhancing Stability and Fidelity for Zero-shot TTS with A Multi-Level Evaluator | 2510.20210 | arXiv-only | arXiv-only | 扩散、语言模型/自回归、强化学习 | 口音/方言、TTS/语音生成 | 零样本、数据集/基准 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| HI-TransPA: Hearing Impairments Translation Personal Assistant | 2511.09915 | arXiv-only | arXiv-only | 待核 | 口音/方言、语音多模态 | 统一/端到端框架、可控/指令 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| CLARITY: Contextual Linguistic Adaptation and Accent Retrieval for Dual-Bias Mitigation in Text-to-Speech Generation | 2511.11104 | arXiv-only | arXiv-only | 待核 | 口音/方言、TTS/语音生成 | 统一/端到端框架、可控/指令 | 自然度/音质、精度 | 待核(数据/算力/特定语种/评测指标) |
| Enhancing Quranic Learning: A Multimodal Deep Learning Approach for Arabic Phoneme Recognition | 2511.17477 | arXiv-only | arXiv-only | Transformer/注意力、强化学习、Mam… | 口音/方言、语音多模态 | 统一/端到端框架、数据集/基准 | 鲁棒性、精度 | 待核(数据/算力/特定语种/评测指标) |
| PROFASR-BENCH: A Benchmark for Context-Conditioned ASR in High-Stakes Professional Speech | 2512.23686 | arXiv-only | arXiv-only | 语言模型/自回归、强化学习 | 口音/方言、对话/agent | 可控/指令、轻量/高效 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |

### 【非编创】匿名化/隐私 (3)
| SegReConcat: A Data Augmentation Method for Voice Anonymization Attack | 2508.18907 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪、增强/分离/修复 | 匿名化/去标识 | 隐私-效用折中、说话人不可链接性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Measuring Soft Biometric Leakage in Speaker De-Identification Systems | 2509.14469 | arXiv-only | arXiv-only | 零样本、变分 | 隐私/安全/鉴伪 | 匿名化/去标识 | 隐私-效用折中、说话人不可链接性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| AISHELL6-whisper: A Chinese Mandarin Audio-visual Whisper Speech Dataset with Speech Recognition Baselines | 2509.23833 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪、歌声/音乐 | 匿名化/去标识 | 隐私-效用折中、说话人不可链接性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】anti-spoofing/deepfake (32)
| ESDD 2026: Environmental Sound Deepfake Detection Challenge Evaluation Plan | 2508.04529 | arXiv-only | arXiv-only | 低资源、变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SCDF: A Speaker Characteristics DeepFake Speech Dataset for Bias Analysis | 2508.07944 | arXiv-only | arXiv-only | Transformer/注意力、图网络、变分 | 隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Fake Speech Wild: Detecting Deepfake Speech on Social Media Platform | 2508.10559 | arXiv-only | arXiv-only | 自监督、变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SyncGuard: Robust Audio Watermarking Capable of Countering Desynchronization Attacks | 2508.17121 | arXiv-only | arXiv-only | 变分、水印/隐写 | 隐私/安全/鉴伪、增强/分离/修复 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ERF-BA-TFD+: A Multimodal Model for Audio-Visual Deepfake Detection | 2508.17282 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪、增强/分离/修复 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ClearMask: Noise-Free and Naturalness-Preserving Protection Against Voice Deepfake Attacks | 2508.17660 | arXiv-only | arXiv-only | 实时/流式 | 边缘/实时、对话/智能体/会议 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Wav2DF-TSL: Two-stage Learning with Efficient Pre-training and Hierarchical Experts Fusion for Robust Audio Deepfake Detection | 2509.04161 | arXiv-only | arXiv-only | 自监督、微调/适配器 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| AUDETER: A Large-scale Dataset for Deepfake Audio Detection in Open Worlds | 2509.04345 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪、歌声/音乐 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Adversarial Attacks on Audio Deepfake Detection: A Benchmark and Comparative Study | 2509.07132 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪、增强/分离/修复 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| MoLEx: Mixture of LoRA Experts in Speech Self-Supervised Models for Audio Deepfake Detection | 2509.09175 | arXiv-only | arXiv-only | 自监督、微调/适配器、变分 | 边缘/实时、隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Emoanti: audio anti-deepfake with refined emotion-guided representations | 2509.10781 | arXiv-only | arXiv-only | Transformer/注意力、自监督、微调/适配器 | 副语言/病理/无障碍、隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Improving Out-of-Domain Audio Deepfake Detection via Layer Selection and Fusion of SSL-Based Countermeasures | 2509.12003 | arXiv-only | arXiv-only | 自监督、变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Attention-based Mixture of Experts for Robust Speech Deepfake Detection | 2509.17585 | arXiv-only | arXiv-only | Transformer/注意力、变分 | 隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SEA-Spoof: Bridging The Gap in Multilingual Audio Deepfake Detection for South-East Asian | 2509.19865 | arXiv-only | arXiv-only | 微调/适配器、变分 | 多语言/低资源、隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| AuthGlass: Benchmarking Voice Liveness Detection and Authentication on Smart Glasses via Comprehensive Acoustic Features | 2509.20799 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Zero-Day Audio DeepFake Detection via Retrieval Augmentation and Profile Matching | 2509.21728 | arXiv-only | arXiv-only | 可控/指令、微调/适配器、变分 | 边缘/实时、隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Generalizable Speech Deepfake Detection via Information Bottleneck Enhanced Adversarial Alignment | 2509.23618 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪、增强/分离/修复 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Forensic Similarity for Speech Deepfakes | 2510.02864 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Sparse deepfake detection promotes better disentanglement | 2510.05696 | arXiv-only | arXiv-only | 解耦、变分 | 隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Can Current Detectors Catch Face-to-Voice Deepfake Attacks? | 2510.21004 | arXiv-only | arXiv-only | 微调/适配器、变分 | 隐私/安全/鉴伪、歌声/音乐 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Your Microphone Array Retains Your Identity: A Robust Voice Liveness Detection System for Smart Speakers | 2510.24393 | arXiv-only | arXiv-only | Transformer/注意力、变分 | 隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SynthGuard: An Open Platform for Detecting AI-Generated Multimedia with Multimodal LLMs | 2511.12404 | arXiv-only | arXiv-only | 语言模型/自回归、变分 | 隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Investigating self-supervised representations for audio-visual deepfake detection | 2511.17181 | arXiv-only | arXiv-only | 自监督、变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SONAR: Spectral-Contrastive Audio Residuals for Generalizable Deepfake Detection | 2511.21325 | arXiv-only | arXiv-only | Transformer/注意力、自监督、解耦 | 隐私/安全/鉴伪、增强/分离/修复 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| DeepAgent: A Dual Stream Multi Agent Fusion for Robust Multimodal Deepfake Detection | 2512.07351 | arXiv-only | arXiv-only | 变分 | 对话/智能体/会议、隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| DFALLM: Achieving Generalizable Multitask Deepfake Detection by Optimizing Audio LLM Components | 2512.08403 | arXiv-only | arXiv-only | 语言模型/自回归、变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Toward Noise-Aware Audio Deepfake Detection: Survey, SNR-Benchmarks, and Practical Recipes | 2512.13744 | arXiv-only | arXiv-only | 可控/指令、自监督、微调/适配器 | 隐私/安全/鉴伪、增强/分离/修复 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| HQ-MPSD: A Multilingual Artifact-Controlled Benchmark for Partial Deepfake Speech Detection | 2512.13012 | arXiv-only | arXiv-only | 可控/指令、变分 | 多语言/低资源、隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| BEAT2AASIST model with layer fusion for ESDD 2026 Challenge | 2512.15180 | arXiv-only | arXiv-only | Transformer/注意力、变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Data-Centric Approach to Generalizable Speech Deepfake Detection | 2512.18210 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Reliable Audio Deepfake Detection in Variable Conditions via Quantum-Kernel SVMs | 2512.18797 | arXiv-only | arXiv-only | 变分 | 隐私/安全/鉴伪、增强/分离/修复 | 泛化鉴伪/部分伪造/溯源 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Environmental Sound Deepfake Detection Challenge: An Overview | 2512.24140 | arXiv-only | arXiv-only | — | 隐私/安全/鉴伪 | 检测/定位/鲁棒 | 对未知攻击泛化、低假阳/假阴 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】神经编解码/声码器 (15)
| Learning Neural Vocoder from Range-Null Space Decomposition | 2507.20731 | arXiv-only | arXiv-only | 自监督、解耦、变分 | 通用语音处理 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| AudioCodecBench: A Comprehensive Benchmark for Audio Codec Evaluation | 2509.02349 | arXiv-only | arXiv-only | 语言模型/自回归、Transformer/注意力、变分 | 歌声/音乐 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Finite Scalar Quantization Enables Redundant and Transmission-Robust Neural Audio Compression at Low Bit-rates | 2509.09550 | arXiv-only | arXiv-only | 语言模型/自回归、变分 | 通用语音处理 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Baseline Systems For The 2025 Low-Resource Audio Codec Challenge | 2510.00264 | arXiv-only | arXiv-only | 低资源、变分 | 增强/分离/修复 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Soft Disentanglement in Frequency Bands for Neural Audio Codecs | 2510.03735 | arXiv-only | arXiv-only | 解耦、变分 | 通用语音处理 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| U-Codec: Ultra Low Frame-rate Neural Speech Codec for Fast High-fidelity Speech Generation | 2510.16718 | arXiv-only | arXiv-only | 语言模型/自回归、Transformer/注意力、变分 | 通用语音处理 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ADNAC: Audio Denoiser using Neural Audio Codec | 2511.01773 | arXiv-only | arXiv-only | — | 歌声/音乐、增强/分离/修复 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| BridgeVoC: Revitalizing Neural Vocoder from a Restoration Perspective | 2511.07116 | arXiv-only | arXiv-only | 扩散模型、GAN、Transformer/注意力 | 增强/分离/修复 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Evaluating Objective Speech Quality Metrics for Neural Audio Codecs | 2511.19734 | arXiv-only | arXiv-only | 变分 | 通用语音处理 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Harmonic-Percussive Disentangled Neural Audio Codec for Bandwidth Extension | 2511.21580 | arXiv-only | arXiv-only | 语言模型/自回归、Transformer/注意力、解耦 | 通用语音处理 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Large Speech Model Enabled Semantic Communication | 2512.04711 | arXiv-only | arXiv-only | 语言模型/自回归、可控/指令、实时/流式 | 边缘/实时 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EEG-to-Voice Decoding of Spoken and Imagined speech Using Non-Invasive EEG | 2512.22146 | arXiv-only | arXiv-only | 语言模型/自回归、自监督、变分 | 增强/分离/修复 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Real-Time Streamable Generative Speech Restoration with Flow Matching | 2512.19442 | arXiv-only | arXiv-only | 扩散模型、流匹配、实时/流式 | 边缘/实时、增强/分离/修复 | 高保真编解码 | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SACodec: Asymmetric Quantization with Semantic Anchoring for Low-Bitrate High-Fidelity Neural Speech Codecs | 2512.20944 | arXiv-only | arXiv-only | 语言模型/自回归、自监督、低资源 | 通用语音处理 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Semantic Codebooks as Effective Priors for Neural Speech Compression | 2512.21653 | arXiv-only | arXiv-only | 语言模型/自回归、自监督 | 通用语音处理 | 低码率/高音质/语义token | 码率-音质折中、实时性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |


### 【非编创】TTS/语音生成 (9)
| Eliminating stability hallucinations in llm-based tts models via attention guidance | 2509.19852 | arXiv-only | arXiv-only | 语言模型/自回归、Transformer/注意力 | TTS/语音生成 | 偏好/对齐、幻觉抑制 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| IntMeanFlow: Few-step Speech Generation with Integral Velocity Distillation | 2510.07979 | arXiv-only | arXiv-only | 流匹配、蒸馏/少步 | TTS/语音生成、评测/基准 | 统一/端到端框架、蒸馏/少步 | 自然度/音质、推理加速 | 待核(数据/算力/特定语种/评测指标) |
| DMP-TTS: Disentangled multi-modal Prompting for Controllable Text-to-Speech with Chained Guidance | 2512.09504 | arXiv-only | arXiv-only | 扩散、Transformer/注意力、解耦 | TTS/语音生成 | 统一/端到端框架、可控/指令 | 自然度/音质 | 待核(数据/算力/特定语种/评测指标) |

### 【非编创】歌声(singing voice) (10)
| Quantize More, Lose Less: Autoregressive Generation from Residually Quantized Speech Representations | 2507.12197 | arXiv-only | arXiv-only | 流匹配、语言模型/自回归、GAN | 歌声/音乐 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Source Separation for A Cappella Music | 2509.26580 | arXiv-only | arXiv-only | 变分 | 歌声/音乐、增强/分离/修复 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Perceived Femininity in Singing Voice: Analysis and Prediction | 2511.02726 | arXiv-only | arXiv-only | 微调/适配器、图网络、变分 | 歌声/音乐 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Efficient and Fast Generative-Based Singing Voice Separation using a Latent Diffusion Model | 2511.20470 | arXiv-only | arXiv-only | 扩散模型、变分 | 歌声/音乐、增强/分离/修复 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SingingSDS: A Singing-Capable Spoken Dialogue System for Conversational Roleplay Applications | 2511.20972 | arXiv-only | arXiv-only | 语言模型/自回归、变分 | 对话/智能体/会议、歌声/音乐 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| CartoonSing: Unifying Human and Nonhuman Timbres in Singing Generation | 2511.21045 | arXiv-only | arXiv-only | — | 歌声/音乐 | 零样本歌声合成/SVC/编辑 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Continual Learning for Singing Voice Separation with Human in the Loop Adaptation | 2512.02432 | arXiv-only | arXiv-only | 微调/适配器、变分 | 歌声/音乐、增强/分离/修复 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Generative Multi-modal Feedback for Singing Voice Synthesis Evaluation | 2512.02523 | arXiv-only | arXiv-only | 语言模型/自回归、强化学习、微调/适配器 | 歌声/音乐 | 歌声合成/韵律建模 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| YingMusic-Singer: Zero-shot Singing Voice Synthesis and Editing with Annotation-free Melody Guidance | 2512.04779 | arXiv-only | arXiv-only | 扩散模型、流匹配、零样本 | 歌声/音乐、增强/分离/修复 | 零样本歌声合成/SVC/编辑 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| YingMusic-SVC: Real-World Robust Zero-Shot Singing Voice Conversion with Flow-GRPO and Singing-Specific Inductive Biases | 2512.04793 | arXiv-only | arXiv-only | 流匹配、零样本、强化学习 | 歌声/音乐、增强/分离/修复 | 零样本歌声合成/SVC/编辑 | 音准、表现力、音色保真 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】paralinguistic/病理语音 (5)
| Unified Acoustic Representations for Screening Neurological and Respiratory Pathologies from Voice | 2508.20717 | arXiv-only | arXiv-only | 自监督、变分、Mamba/SSM | 边缘/实时、副语言/病理/无障碍 | 病理/副语言建模/辅助技术 | 临床可用性、可懂度、无障碍 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| UTI-LLM: A Personalized Articulatory-Speech Therapy Assistance System Based on Multimodal Large Language Model | 2509.13145 | arXiv-only | arXiv-only | 语言模型/自回归、GAN、实时/流式 | 边缘/实时、对话/智能体/会议 | 病理/副语言建模/辅助技术 | 临床可用性、可懂度、无障碍 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SpeechAgent: An End-to-End Mobile Infrastructure for Speech Impairment Assistance | 2510.20113 | arXiv-only | arXiv-only | 语言模型/自回归、实时/流式、变分 | 边缘/实时、对话/智能体/会议 | 病理/副语言建模/辅助技术 | 临床可用性、可懂度、无障碍 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SAND Challenge: Four Approaches for Dysartria Severity Classification | 2512.02669 | arXiv-only | arXiv-only | Transformer/注意力、变分 | 通用语音处理 | 病理/副语言建模/辅助技术 | 临床可用性、可懂度、无障碍 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Domain-Agnostic Causal-Aware Audio Transformer for Infant Cry Classification | 2512.16271 | arXiv-only | arXiv-only | 语言模型/自回归、可控/指令、Transformer/注意力 | 副语言/病理/无障碍、增强/分离/修复 | 病理/副语言建模/辅助技术 | 临床可用性、可懂度、无障碍 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【编创】语音多模态 (3)
| MCIF: Multimodal Crosslingual Instruction-Following Benchmark from Scientific Talks | 2507.19634 | arXiv-only | arXiv-only | 语言模型/自回归、自监督、Mamba/SSM | 语音多模态、多语言/低资源 | 统一/端到端框架、可控/指令 | 泛化 | 待核(数据/算力/特定语种/评测指标) |
| Investigating the Invertibility of Multimodal Latent Spaces: Limitations of Optimization-Based Methods | 2507.23010 | arXiv-only | arXiv-only | 强化学习 | 语音多模态、TTS/语音生成 | 统一/端到端框架、鲁棒 | 鲁棒性、自然度/音质 | 待核(数据/算力/特定语种/评测指标) |
| Speech-Audio Compositional Attacks on Multimodal LLMs and Their Mitigation with SALMONN-Guard | 2511.10222 | arXiv-only | arXiv-only | 语言模型/自回归 | 语音多模态、对话/agent | 数据集/基准、鲁棒 | 鲁棒性 | 待核(数据/算力/特定语种/评测指标) |

### 【非编创】语音翻译/S2S (2)
| MTP-S2UT: Enhancing Speech-to-Speech Translation Quality with Multi-token Prediction | 2510.10003 | arXiv-only | arXiv-only | 语言模型/自回归、变分 | 增强/分离/修复 | S2S翻译/跨语言语音 | 翻译保真、音色保持 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| POTSA: A Cross-Lingual Speech Alignment Framework for Speech-to-Text Translation | 2511.09232 | arXiv-only | arXiv-only | 语言模型/自回归、零样本、低资源 | 多语言/低资源 | S2S翻译/跨语言语音 | 翻译保真、音色保持 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】说话人验证/识别 (6)
| Improved Dysarthric Speech to Text Conversion via TTS Personalization | 2508.06391 | arXiv-only | arXiv-only | 零样本、可控/指令、Transformer/注意力 | 通用语音处理 | 鲁棒说话人验证/跨域 | EER、鲁棒性、可部署性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Multi-Target Backdoor Attacks Against Speaker Recognition | 2508.08559 | arXiv-only | arXiv-only | 变分 | 增强/分离/修复 | 鲁棒说话人验证/跨域 | EER、鲁棒性、可部署性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Enhancing Self-Supervised Speaker Verification Using Similarity-Connected Graphs and GCN | 2509.04147 | arXiv-only | arXiv-only | 自监督、图网络 | 增强/分离/修复 | 鲁棒说话人验证/跨域 | EER、鲁棒性、可部署性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ParsVoice: A Large-Scale Multi-Speaker Persian Speech Corpus for Text-to-Speech Synthesis | 2510.10774 | arXiv-only | arXiv-only | 语言模型/自回归、零样本、低资源 | 多语言/低资源、增强/分离/修复 | 鲁棒说话人验证/跨域 | EER、鲁棒性、可部署性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SynTTS-Commands: A Public Dataset for On-Device KWS via TTS-Synthesized Multilingual Speech | 2511.07821 | arXiv-only | arXiv-only | GAN、实时/流式、变分 | 多语言/低资源、边缘/实时 | 鲁棒说话人验证/跨域 | EER、鲁棒性、可部署性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speaker Recognition -- Wavelet Packet Based Multiresolution Feature Extraction Approach | 2512.18902 | arXiv-only | arXiv-only | 变分 | 增强/分离/修复 | 鲁棒说话人验证/跨域 | EER、鲁棒性、可部署性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】水印/隐写/取证 (3)
| Yours or Mine? Overwriting Attacks Against Neural Audio Watermarking | 2509.05835 | arXiv-only | arXiv-only | 变分、水印/隐写 | 隐私/安全/鉴伪、增强/分离/修复 | 音频水印/隐写/篡改定位 | 不可感知性、鲁棒性、定位精度 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Multi-bit Audio Watermarking | 2510.01968 | arXiv-only | arXiv-only | 自监督、变分、水印/隐写 | 隐私/安全/鉴伪、歌声/音乐 | 音频水印/隐写/篡改定位 | 不可感知性、鲁棒性、定位精度 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| HarmonicAttack: An Adaptive Cross-Domain Audio Watermark Removal | 2511.21577 | arXiv-only | arXiv-only | 变分、水印/隐写 | 隐私/安全/鉴伪 | 音频水印/隐写/篡改定位 | 不可感知性、鲁棒性、定位精度 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】评测/数据集 (2)
| Data-independent Beamforming for End-to-end Multichannel Multi-speaker ASR | 2509.10234 | arXiv-only | arXiv-only | — | 对话/智能体/会议、增强/分离/修复 | 评测基准/数据集 | 覆盖度、标注质量 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Fun-ASR Technical Report | 2509.12508 | arXiv-only | arXiv-only | 语言模型/自回归、强化学习、实时/流式 | 边缘/实时、增强/分离/修复 | 评测基准/数据集 | 覆盖度、标注质量 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】ASR/识别(边界) (6)
| OLMoASR: Open Models and Data for Training Robust Speech Recognition Models | 2508.20869 | arXiv-only | arXiv-only | 零样本、变分 | 通用语音处理 | ASR/识别(边界,与生成交叉) | 识别精度、鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Unified Learnable 2D Convolutional Feature Extraction for ASR | 2509.10031 | arXiv-only | arXiv-only | — | 通用语音处理 | ASR/识别(边界,与生成交叉) | 识别精度、鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| CS-FLEURS: A Massively Multilingual and Code-Switched Speech Dataset | 2509.14161 | arXiv-only | arXiv-only | 变分 | 多语言/低资源 | ASR/识别(边界,与生成交叉) | 识别精度、鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| XPPG-PCA: Reference-free automatic speech severity evaluation with principal components | 2510.00657 | arXiv-only | arXiv-only | 变分、Mamba/SSM | 副语言/病理/无障碍、增强/分离/修复 | ASR/识别(边界,与生成交叉) | 识别精度、鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| CLiFT-ASR: A Cross-Lingual Fine-Tuning Framework for Low-Resource Taiwanese Hokkien Speech Recognition | 2511.06860 | arXiv-only | arXiv-only | 自监督、低资源、微调/适配器 | 多语言/低资源 | ASR/识别(边界,与生成交叉) | 识别精度、鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| On the Cross-lingual Transferability of Pre-trained wav2vec2-based Models | 2511.21704 | arXiv-only | arXiv-only | 自监督、微调/适配器、变分 | 多语言/低资源、边缘/实时 | ASR/识别(边界,与生成交叉) | 识别精度、鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】其他/边界 (7)
| MeMo: Attentional Momentum for Real-time Audio-visual Speaker Extraction under Impaired Visual Conditions | 2507.15294 | arXiv-only | arXiv-only | Transformer/注意力、实时/流式、变分 | 边缘/实时 | 边界/交叉方向 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Cross-Learning Fine-Tuning Strategy for Dysarthric Speech Recognition Via CDSD database | 2508.18732 | arXiv-only | arXiv-only | 微调/适配器、变分 | 副语言/病理/无障碍、增强/分离/修复 | 边界/交叉方向 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Study on Zero-Shot Non-Intrusive Speech Intelligibility for Hearing Aids Using Large Language Models | 2509.03021 | arXiv-only | arXiv-only | 语言模型/自回归、零样本、Mamba/SSM | 通用语音处理 | 边界/交叉方向 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| FireRedChat: A Pluggable, Full-Duplex Voice Interaction System with Cascaded and Semi-Cascaded Implementations | 2509.06502 | arXiv-only | arXiv-only | 可控/指令、实时/流式、变分 | 边缘/实时、对话/智能体/会议 | 边界/交叉方向 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ERIS: Evolutionary Real-world Interference Scheme for Jailbreaking Audio Large Models | 2509.11128 | arXiv-only | arXiv-only | 可控/指令、变分 | 隐私/安全/鉴伪、增强/分离/修复 | 边界/交叉方向 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Efficient Solutions for Mitigating Initialization Bias in Unsupervised Self-Adaptive Auditory Attention Decoding | 2509.14764 | arXiv-only | arXiv-only | Transformer/注意力、图网络、变分 | 通用语音处理 | 边界/交叉方向 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| PART: Progressive Alignment Representation Training for Multilingual Speech-To-Text with LLMs | 2509.19745 | arXiv-only | arXiv-only | 语言模型/自回归、变分 | 多语言/低资源、增强/分离/修复 | 边界/交叉方向 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |


### 【非编创】剔除自编创（二次精读判定为非编创漏入）

| 论文 Title | arXiv ID | comment归属venue | 状态 | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|---|---|
| SPGISpeech 2.0: Transcribed multi-speaker financial audio for speaker-tagged transcription | 2508.05554 | Interspeech-2025 | 补漏 | 微调/适配器、变分 | 通用语音处理 | 端到端/TSE/多说话人建模 | 分离精度、在线/低延迟、重叠语音 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| HuBERT-VIC: Improving Noise-Robust Automatic Speech Recognition of Speech Foundation Model via Variance-Invariance-Covariance Regularization | 2508.12292 | Interspeech-2025 | 补漏 | 自监督、变分 | 增强/分离/修复 | 语音理解-生成建模 | 指令可控、多任务、对话能力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The TCG CREST -- RKMVERI Submission for the NCIIPC Startup India AI Grand Challenge | 2512.11009 | arXiv-only | arXiv-only | GAN、低资源、微调/适配器 | 多语言/低资源 | 鲁棒聚类/在线分离 | 分离精度、在线/低延迟、重叠语音 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Training Text-to-Speech Model with Purely Synthetic Data: Feasibility, Sensitivity, and Generalization Capability | 2512.17356 | arXiv-only | arXiv-only | Transformer/注意力、变分 | 增强/分离/修复 | 跨语料/多模态情感 | 情感准确性、表现力、泛化 | [剔除:纯TTS] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Pitch Accent Detection improves Pretrained Automatic Speech Recognition | 2508.04814 | arXiv-only | arXiv-only | 自监督、微调/适配器 | 通用语音处理 | 口音识别/鲁棒 | 口音自然度、可懂度、跨方言泛化 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Automatic Pronunciation Error Detection and Correction of the Holy Quran's Learners Using Deep Learning | 2509.00094 | arXiv-only | arXiv-only | 自监督、微调/适配器、变分 | 通用语音处理 | 口音识别/鲁棒 | 口音自然度、可懂度、跨方言泛化 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| NADI 2025: The First Multidialectal Arabic Speech Processing Shared Task | 2509.02038 | arXiv-only | arXiv-only | 变分 | 增强/分离/修复 | 口音识别/鲁棒 | 口音自然度、可懂度、跨方言泛化 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Critical Review of the Need for Knowledge-Centric Evaluation of Quranic Recitation | 2510.12858 | arXiv-only | arXiv-only | 图网络、变分、Mamba/SSM | 边缘/实时 | 口音识别/鲁棒 | 口音自然度、可懂度、跨方言泛化 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Mispronunciation Detection and Diagnosis Without Model Training: A Retrieval-Based Approach | 2511.20107 | arXiv-only | arXiv-only | 自监督、变分 | 副语言/病理/无障碍 | 口音识别/鲁棒 | 口音自然度、可懂度、跨方言泛化 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Hearing to Translate: The Effectiveness of Speech Modality Integration into LLMs | 2512.16378 | arXiv-only | arXiv-only | 语言模型/自回归、变分 | 多语言/低资源 | 语音理解-生成建模 | 指令可控、多任务、对话能力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Do AI Voices Learn Social Nuances? A Case of Politeness and Speech Rate | 2511.10693 | arXiv-only | arXiv-only | 可控/指令 | 通用语音处理 | 生成质量/表现力 | 自然度、音色保真、实时性 | [剔除:纯TTS] 见原文; 多为数据/算力/特定语种/评测指标局限 |


### 【非编创】原 speech-LM 理解/对话侧（口径收紧移出编创）

| 论文 Title | arXiv ID | comment归属venue | 状态 | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|---|---|
| Reference-aware SFM layers for intrusive intelligibility prediction | 2509.17270 | ICASSP-2026 | 补漏 | 待核 | 通用语音处理 | 待核 | 待核 | [口径收紧移出: SFM侵入式可懂度预测，评测/基础设施] 待核(数据/算力/特定语种/评测指标) |
| Where Do Backdoors Live? A Component-Level Analysis of Backdoor Propagation in Speech Language Models | 2510.01157 | Interspeech-2026 | 未覆盖venue | 语言模型/自回归 | 语音多模态 | 统一/端到端框架 | 待核 | [口径收紧移出: SLM后门传播组件分析，安全/理解侧] 待核(数据/算力/特定语种/评测指标) |
| ZO-ASR: Zeroth-Order Fine-Tuning of Speech Foundation Models without Back-Propagation | 2512.01267 | ASRU-2025 | 未覆盖venue | 自监督、微调/适配器、零样本 | ASR/识别 | 零样本、轻量/高效 | 鲁棒性、零样本/低资源可用 | [口径收紧移出: ASR基础模型零阶微调，识别侧] 待核(数据/算力/特定语种/评测指标) |
| QAMRO: Quality-aware Adaptive Margin Ranking Optimization for Human-aligned Assessment of Audio Generation Systems | 2508.08957 | ASRU-2025 | 未覆盖venue | 自监督、Mamba/SSM | TTS/语音生成、评测/基准 | 统一/端到端框架、数据集/基准 | 鲁棒性、自然度/音质 | [口径收紧移出: 音频生成系统人 align评测排序优化，评测侧] 待核(数据/算力/特定语种/评测指标) |
| Analysis of Domain Shift across ASR Architectures via TTS-Enabled Separation of Target Domain and Acoustic Conditions | 2508.09868 | ASRU-2025 | 未覆盖venue | 语言模型/自回归 | 增强/分离/修复、TTS/语音生成 | 可控/指令、数据集/基准 | 泛化 | [口径收紧移出: TTS分离法分析ASR域漂移，识别侧分析] 待核(数据/算力/特定语种/评测指标) |
| Hearing More with Less: Multi-Modal Retrieval-and-Selection Augmented Conversational LLM-Based ASR | 2508.01166 | arXiv-only | arXiv-only | 语言模型/自回归 | 对话/agent、ASR/识别 | 数据集/基准 | 精度 | [口径收紧移出: 检索增强对话LLM-ASR，识别/对话侧] 待核(数据/算力/特定语种/评测指标) |
| OSUM-EChat: Enhancing End-to-End Empathetic Spoken Chatbot via Understanding-Driven Spoken Dialogue | 2508.09600 | arXiv-only | arXiv-only | 语言模型/自回归 | 情感/韵律、对话/agent | 统一/端到端框架、数据集/基准 | 自然度/音质、表现力 | [口径收紧移出: 共情口语对话chatbot，对话侧] 待核(数据/算力/特定语种/评测指标) |
| Audio Flamingo Sound-CoT Technical Report: Improving Chain-of-Thought Reasoning in Sound Understanding | 2508.11818 | arXiv-only | arXiv-only | 语言模型/自回归、Mamba/SSM、微调/适配器 | 通用语音处理 | 数据集/基准 | 待核 | [口径收紧移出: Audio Flamingo声音理解CoT推理，理解侧] 待核(数据/算力/特定语种/评测指标) |
| WenetSpeech-Yue: A Large-scale Cantonese Speech Corpus with Multi-dimensional Annotation | 2509.03959 | arXiv-only | arXiv-only | 语言模型/自回归 | TTS/语音生成、ASR/识别 | 数据集/基准、偏好/对齐优化 | 自然度/音质、泛化 | [口径收紧移出: 大规模粤语语音语料，数据集/基础设施] 待核(数据/算力/特定语种/评测指标) |
| EchoX: Towards Mitigating Acoustic-Semantic Gap via Echo Training for Speech-to-Speech LLMs | 2509.09174 | arXiv-only | arXiv-only | 语言模型/自回归、Transformer/注意力 | 边缘/实时 | 数据集/基准、新架构 | 待核 | [口径收紧移出: S2S LLM echo训练对齐，对话/训练基础设施] 待核(数据/算力/特定语种/评测指标) |
| Deep Learning for Tuberculosis Screening in a High-burden Setting using Cough Analysis and Speech Foundation Models | 2509.09746 | arXiv-only | arXiv-only | 图网络、微调/适配器 | 语音多模态、副语言/病理 | 可控/指令、数据集/基准 | 鲁棒性、零样本/低资源可用 | [口径收紧移出: 咳嗽分析结核筛查，医学/病理理解侧] 待核(数据/算力/特定语种/评测指标) |
| Reference-free automatic speech severity evaluation using acoustic unit language modelling | 2510.00639 | arXiv-only | arXiv-only | 语言模型/自回归 | ASR/识别、副语言/病理 | 数据集/基准、鲁棒 | 鲁棒性、自然度/音质 | [口径收紧移出: Reference-free automatic speech severity evaluation (评测/病理评估),非编创] 待核(数据/算力/特定语种/评测指标) |
| Audio-Maestro: Enhancing Large Audio-Language Models with Tool-Augmented Reasoning | 2510.11454 | arXiv-only | arXiv-only | 语言模型/自回归 | 语音多模态、边缘/实时 | 统一/端到端框架 | 精度 | [口径收紧移出: Audio-Maestro tool-augmented reasoning LALM (理解/reasoning/基础设施)] 待核(数据/算力/特定语种/评测指标) |
| Not in Sync: Unveiling Temporal Bias in Audio Chat Models | 2510.12185 | arXiv-only | arXiv-only | 语言模型/自回归 | 语音多模态 | 统一/端到端框架、可控/指令 | 鲁棒性 | [口径收紧移出: Temporal bias in audio chat models (评测/分析对话模型)] 待核(数据/算力/特定语种/评测指标) |
| Hallucination Benchmark for Speech Foundation Models | 2510.16567 | arXiv-only | arXiv-only | 强化学习 | ASR/识别、评测/基准 | 统一/端到端框架、数据集/基准 | 自然度/音质 | [口径收紧移出: Hallucination benchmark for speech foundation models (评测/benchmark)] 待核(数据/算力/特定语种/评测指标) |
| Assessing Factual Music Comprehension in Large Audio Language Models | 2511.05550 | arXiv-only | arXiv-only | 语言模型/自回归、Mamba/SSM | 语音多模态 | 数据集/基准 | 自然度/音质 | [口径收紧移出: Assessing factual music comprehension in LALM (理解/评测)] 待核(数据/算力/特定语种/评测指标) |
| End-to-end Contrastive Language-Speech Pretraining Model For Long-form Spoken Question Answering | 2511.09282 | arXiv-only | arXiv-only | 语言模型/自回归 | ASR/识别 | 统一/端到端框架、轻量/高效 | 鲁棒性、效率/成本 | [口径收紧移出: Long-form spoken QA (理解/ASR/SLU)] 待核(数据/算力/特定语种/评测指标) |
| VocalNet-M2: Advancing Low-Latency Spoken Language Modeling via Integrated Multi-Codebook Tokenization and Multi-Token Prediction | 2511.10232 | arXiv-only | arXiv-only | 语言模型/自回归、实时/流式 | 对话/agent、TTS/语音生成 | 统一/端到端框架、实时/低延迟 | 实时性、效率/成本 | [口径收紧移出: Spoken dialogue/tokenization+MTP 通用SLM omni助手基础设施,生成仅作对话输出;倾向move] 待核(数据/算力/特定语种/评测指标) |
| AV-Dialog: Spoken Dialogue Models with Audio-Visual Input | 2511.11124 | arXiv-only | arXiv-only | 实时/流式 | 增强/分离/修复、语音多模态 | 统一/端到端框架、实时/低延迟 | 鲁棒性、实时性 | [口径收紧移出: AV-Dialog spoken dialogue with AV input (对话/理解)] 待核(数据/算力/特定语种/评测指标) |
| Step-Audio-R1 Technical Report | 2511.15848 | arXiv-only | arXiv-only | 语言模型/自回归 | 语音多模态 | 统一/端到端框架、数据集/基准 | 待核 | [口径收紧移出: Step-Audio-R1 omni大模型技术报告,生成语音为通用助手一部分→move] 待核(数据/算力/特定语种/评测指标) |
| ORCA: Open-ended Response Correctness Assessment for Audio Question Answering | 2512.09066 | arXiv-only | arXiv-only | 语言模型/自回归、Mamba/SSM | 通用语音处理 | 统一/端到端框架、数据集/基准 | 自然度/音质 | [口径收紧移出: ORCA open-ended response correctness assessment for AQA (评测)] 待核(数据/算力/特定语种/评测指标) |
| BRACE: A Benchmark for Robust Audio Caption Quality Evaluation | 2512.10403 | arXiv-only | arXiv-only | 语言模型/自回归 | 通用语音处理 | 数据集/基准、鲁棒 | 鲁棒性、自然度/音质 | [口径收紧移出: BRACE benchmark for audio caption quality eval (评测)] 待核(数据/算力/特定语种/评测指标) |
| X-Talk: On the Underestimated Potential of Modular Speech-to-Speech Dialogue System | 2512.18706 | arXiv-only | arXiv-only | 语言模型/自回归、自监督 | 增强/分离/修复、情感/韵律 | 统一/端到端框架、鲁棒 | 鲁棒性、表现力 | [口径收紧移出: X-Talk modular speech-to-speech dialogue system (对话);VC/s2s对话非编创倾向move] 待核(数据/算力/特定语种/评测指标) |
| SLM-TTA: A Framework for Test-Time Adaptation of Generative Spoken Language Models | 2512.24739 | arXiv-only | arXiv-only | 语言模型/自回归、强化学习 | 对话/agent、ASR/识别 | 统一/端到端框架、轻量/高效 | 鲁棒性、精度 | [口径收紧移出: SLM-TTA test-time adaptation of generative SLM for ASR (训练/适配基础设施)] 待核(数据/算力/特定语种/评测指标) |
| Large Language Model Data Generation for Enhanced Intent Recognition in German Speech | 2508.06277 | arXiv-only | arXiv-only | 语言模型/自回归、Transformer/注意力… | 语音克隆/VC、歌声 | 数据集/基准、鲁棒 | 鲁棒性、自然度/音质 | [口径收紧移出: LLM数据生成增强意图识别(ASR/SLU);数据生成服务理解→move] 待核(数据/算力/特定语种/评测指标) |
| Open-Source Full-Duplex Conversational Datasets for Natural and Interactive Speech Synthesis | 2509.04093 | arXiv-only | arXiv-only | 强化学习、微调/适配器 | 对话/agent、TTS/语音生成 | 数据集/基准、偏好/对齐优化 | 自然度/音质 | [口径收紧移出: Full-duplex conversational datasets for TTS synthesis (数据集,非编创方法本身)→move] 待核(数据/算力/特定语种/评测指标) |
| i-LAVA: Insights on Low Latency Voice-2-Voice Architecture for Agents | 2509.20971 | arXiv-only | arXiv-only | 实时/流式 | 情感/韵律、对话/agent | 统一/端到端框架、实时/低延迟 | 实时性、自然度/音质 | [口径收紧移出: i-LAVA voice-2-voice architecture for agents (对话/agent基础设施)] 待核(数据/算力/特定语种/评测指标) |
| UniFlow-Audio: Unified Flow Matching for Audio Generation from Omni-Modalities | 2509.24391 | arXiv-only | arXiv-only | 流匹配、语言模型/自回归、Transformer… | 对话/agent、TTS/语音生成 | 统一/端到端框架、新架构 | 自然度/音质 | [口径收紧移出: UniFlow-Audio unified audio generation from omni-modalities (omni/对话+TTS通用生成,边界模糊→move)] 待核(数据/算力/特定语种/评测指标) |
| Smark: A Watermark for Text-to-Speech Diffusion Models via Discrete Wavelet Transform | 2512.18791 | arXiv-only | arXiv-only | 扩散、水印/隐写 | 鉴伪/安全、TTS/语音生成 | 统一/端到端框架、轻量/高效 | 自然度/音质、精度 | [口径收紧移出: Smark TTS diffusion watermark (鉴伪/安全,非编创方法)→move] 待核(数据/算力/特定语种/评测指标) |

## 备注
- 枚举方法: arXiv API `search_query=cat:cs.SD AND submittedDate:[202507010000 TO 202512312359]`, `sortBy=submittedDate ascending`, 每页200条, start步进200, 页间9s间距防429。共10页, 末页3条, 取完1803条原始entry, 按base ID(去版本号)去重后仍1803条(无重复)。日期范围校验: min 2025-07-01 / max 2025-12-31。
- 限流: 全程直连(--noproxy *), HTTP 200, 无429/503。代理未启用(避免触发429)。
- 覆盖率: cs.SD 2025H2 共1803条; 主类cs.SD 1095条, 跨类eess.AS 335条, 其余(cs.CL/LG/MM/CV/HC/AI/CR等)373条(跨类含语音)。
- 域内占比: 766/1803≈42.5%(cs.SD语音侧, 含边界); 排除主体为音乐MIR/音乐生成(~427)、房间声学/空间音频/beamforming/DOA(~316)、纯ASR(~108)、声学事件/场景检测(~52)、其他非语音(~97)及8条边界误判修正。
- 去重: 域内766条中485条已被现有md收录(eess.AS×2 + 17 venue md, ID集2086条), 跳过; 净新增281条。
- 漏检风险: ①关键词筛可能漏掉标题/摘要不含常见语音词但实为语音编创的工作; ②"纯TTS"排除可能误伤通用TTS基线/系统报告(已在speech-LM/agent/TTS子方向回补零样本/可控/扩散类); ③房间声学/beamforming与语音增强交叉的部分(SE为主)按SE保留, 纯RIR/空间音频已剔除; ④comment venue归属依赖作者填写, 部分无comment或含非标准缩写归为arXiv-only; ⑤跨类(cs.CL/LG)论文在cs.SD列表内已收, 但纯cs.CL的语音论文若未投cs.SD则不在本枚举(可由eess.AS补)。
- 技术点/创新点/体验提升由标题+摘要关键词规则推断, 仅供索引, 精确语义见原文。
