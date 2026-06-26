# arXiv eess.AS 2025H2 (净新增: 补漏+未覆盖venue+arXiv-only)

> 归属: 混合（编创 343 / 非编创 415） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


> 检索日期 2026-06-25 | 枚举总数 1672 | 域内(含边界) 882 | 已收录跳过 124 | 净新增 758 (补漏 117/未覆盖venue 102/arXiv-only 539)
>
> 域内筛选: 排除纯ASR(仅语音→文本识别转写)、纯TTS(仅文本→语音无编辑/可控/零样本/agent)、纯音乐MIR、纯声学事件/场景检测(非语音)、纯图像/雷达/通信/水声/生物医学非语音、空间音频/ANC/DOA/房间声学/质量评估(非语音编创)。边界模糊保留并标注。comment 无 venue 关键词 → arXiv-only。

| 论文 Title | arXiv ID | comment归属venue | 状态 | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|------------|----------|------------------|------|--------|------|--------|----------|--------|

## 补漏 (117)

### 【编创】TTS/语音生成/speech-LM/agent (29)
| MIDI-VALLE: Improving Expressive Piano Performance Synthesis Through Neural Codec Language Modelling | 2507.08530 | ISMIR-2025 | 补漏 | 编解码、LLM | tts、text-to-speech、codec | 零样本泛化 | 音质、鲁棒性、表现力 | 评测局限 |
| Fine-Tuning Text-to-Speech Diffusion Models Using Reinforcement Learning with Human Feedback | 2508.03123 | Interspeech-2025 | 补漏 | 扩散、强化学习、自回归 | tts、text-to-speech、denois | 高效/轻量 | 自然度、音质、实时 | 评测局限 |
| MiSTR: Multi-Modal iEEG-to-Speech Synthesis with Transformer-Based Prosody Prediction and Neural Phase Reconstruction | 2508.03166 | Interspeech-2025 | 补漏 | 声码器、Transformer | speech synthesis、prosod、v | 新方法/统一框架 | 可懂度 | 评测局限 |
| Parallel GPT: Harmonizing the Independence and Interdependence of Acoustic and Semantic Information for Zero-Shot Text-to-Speech | 2508.04141 | TASLP-2025 | 补漏 | LLM、自回归 | tts、text-to-speech、speech | 零样本泛化 | 音质、相似度、表现力 | 待核 |
| Seeing is Believing: Emotion-Aware Audio-Visual Language Modeling for Expressive Speech Generation | 2508.16188 | EMNLP-2025 | 补漏 | LLM | emotion | 待核 | 表现力 | 待核 |
| Align2Speak: Improving TTS for Low Resource Languages via ASR-Guided Online Preference Optimization | 2509.21718 | ICASSP-2026 | 补漏 | 自回归 | tts、text-to-speech、prosod | 新方法/统一框架 | 音质、可懂度、相似度 | 低资源 |
| ECTSpeech: Enhancing Efficient Speech Synthesis via Easy Consistency Tuning | 2510.05984 | ACMMM-2025 | 补漏 | 扩散、蒸馏 | speech synthesis、denois | 高效/轻量 | 音质、效率 | 待核 |
| Synthesizing speech with selected perceptual voice qualities - A case study with creaky voice | 2511.05143 | Interspeech-2025 | 补漏 | 归一化流 | tts、text-to-speech | 待核 | 音质 | 待核 |

### 【编创】语音编辑 (2)
| Eigenvoice Synthesis based on Model Editing for Speaker Generation | 2507.03377 | Interspeech-2025 | 补漏 | 待核 | 待核 | 新方法/统一框架 | 待核 | 待核 |
| TAU: A Benchmark for Cultural Sound Understanding Beyond Semantics | 2509.26329 | ICASSP-2026 | 补漏 | LLM | 待核 | 待核 | 待核 | 评测局限、泛化局限 |

### 【编创】VC/克隆 (7)
| Analyzing and Improving Speaker Similarity Assessment for Speech Synthesis | 2507.02176 | Interspeech-2025 | 补漏 | 待核 | speech synthesis、cloning | 新方法/统一框架 | 相似度 | 评测局限 |
| Vocoder-Projected Feature Discriminator | 2508.17874 | Interspeech-2025 | 补漏 | 扩散、声码器、蒸馏 | tts、text-to-speech、voice | 新方法/统一框架 | 音质 | 待核 |
| MELA-TTS: Joint transformer-diffusion model with representation alignment for speech synthesis | 2509.14784 | ICASSP-2026 | 补漏 | 扩散、Transformer、自回归 | tts、text-to-speech、speech | 统一/联合建模 | 鲁棒性 | 评测局限 |
| An Extensive Analysis of the Singing Voice Conversion Challenge 2025 Evaluation Results | 2509.15629 | TASLP-2025 | 补漏 | 待核 | voice conversion、singing | 高效/轻量 | 自然度、相似度、效率 | 评测局限 |
| Fed-PISA: Federated Voice Cloning via Personalized Identity-Style Adaptation | 2509.16010 | ICASSP-2026 | 补漏 | LoRA | tts、text-to-speech、clonin | 高效/轻量 | 自然度、相似度、表现力 | 数据局限 |
| Speaker Anonymisation for Speech-based Suicide Risk Detection | 2509.22148 | ICASSP-2026 | 补漏 | 待核 | speech synthesis、voice co | 待核 | 待核 | 评测局限 |
| O_O-VC: Synthetic Data-Driven One-to-One Alignment for Any-to-Any Voice Conversion | 2510.09061 | EMNLP-2025 | 补漏 | 待核 | tts、text-to-speech、voice | 零样本泛化 | 音质、相似度 | 泛化局限 |

### 【编创】增强/去噪/编解码/修复/带宽扩展 (27)
| MambAttention: Mamba with Multi-Head Attention for Generalizable Single-Channel Speech Enhancement | 2507.00966 | TASLP-2025 | 补漏 | 扩散、LLM、Conformer | enhancement | 新方法/统一框架 | 待核 | 评测局限、泛化局限 |
| DARAS: Dynamic Audio-Room Acoustic Synthesis for Blind Room Impulse Response Estimation | 2507.08135 | TASLP-2025 | 补漏 | Mamba、自监督 | enhancement | 高效/轻量 | 鲁棒性、效率 | 待核 |
| Aligning Generative Speech Enhancement with Perceptual Feedback | 2507.09929 | ICASSP-2026 | 补漏 | LLM | enhancement | 待核 | 自然度、音质 | 待核 |
| Latent Granular Resynthesis using Neural Audio Codecs | 2507.19202 | ISMIR-2025 | 补漏 | 编解码 | codec | 新方法/统一框架 | 待核 | 待核 |
| NanoCodec: Towards High-Quality Ultra Fast Speech LLM Inference | 2508.05835 | Interspeech-2025 | 补漏 | 编解码、LLM、自回归 | codec | 高效/轻量 | 音质、效率、速度 | 待核 |
| ParaNoise-SV: Integrated Approach for Noise-Robust Speaker Verification with Parallel Joint Learning of Speech Enhancement and Noise Extraction | 2508.07219 | Interspeech-2025 | 补漏 | 待核 | enhancement | 统一/联合建模 | 鲁棒性 | 待核 |
| Leveraging Mamba with Full-Face Vision for Audio-Visual Speech Enhancement | 2508.13624 | Interspeech-2025 | 补漏 | Mamba | enhancement、target speech | 高效/轻量 | 音质、可懂度、效率 | 评测局限、限于 |
| Leveraging Discriminative Latent Representations for Conditioning GAN-Based Speech Enhancement | 2508.20859 | TASLP-2025 | 补漏 | 扩散、GAN | enhancement | 新方法/统一框架 | 待核 | 评测局限 |
| Joint Learning using Mixture-of-Expert-Based Representation for Speech Enhancement and Robust Emotion Recognition | 2509.08470 | TASLP-2025 | 补漏 | 自监督 | enhancement、emotion | 统一/联合建模 | 鲁棒性、效率 | 算力局限、泛化局限 |
| A Lightweight Fourier-based Network for Binaural Speech Enhancement with Spatial Cue Preservation | 2509.14076 | ICASSP-2026 | 补漏 | 待核 | enhancement | 高效/轻量 | 可懂度、鲁棒性、效率 | 算力局限 |
| AmbiDrop: Array-Agnostic Speech Enhancement Using Ambisonics Encoding and Dropout-Based Learning | 2509.14855 | ICASSP-2026 | 补漏 | 待核 | enhancement | 新方法/统一框架 | 音质、可懂度、鲁棒性 | 泛化局限 |
| DISPATCH: Distilling Selective Patches for Speech Enhancement | 2509.15922 | ICASSP-2026 | 补漏 | 蒸馏 | enhancement | 新方法/统一框架 | 待核 | 待核 |
| Compose Yourself: Average-Velocity Flow Matching for One-Step Speech Enhancement | 2509.15952 | ICASSP-2026 | 补漏 | 扩散、流匹配 | enhancement | 高效/轻量 | 音质、效率、速度 | 算力局限 |
| DeepASA: An Object-Oriented Multi-Purpose Network for Auditory Scene Analysis | 2509.17247 | NeurIPS-2025 | 补漏 | Transformer | separation、source separat | 统一/联合建模 | 鲁棒性 | 评测局限 |
| Towards Evaluating Generative Audio: Insights from Neural Audio Codec Embedding Distances | 2509.18823 | ICASSP-2026 | 补漏 | 编解码 | codec | 零样本泛化 | 音质 | 评测局限 |
| MeanSE: Efficient Generative Speech Enhancement with Mean Flows | 2509.21214 | ICASSP-2026 | 补漏 | 流匹配 | enhancement | 高效/轻量 | 音质、效率 | 算力局限、评测局限 |
| AUV: Teaching Audio Universal Vector Quantization with Single Nested Codebook | 2509.21968 | ICASSP-2026 | 补漏 | 编解码、Conformer、蒸馏 | codec | 统一/联合建模 | 音质 | 评测局限 |
| Unsupervised Speech Enhancement using Data-defined Priors | 2509.22942 | ICASSP-2026 | 补漏 | 待核 | enhancement | 新方法/统一框架 | 待核 | 待核 |
| MeanFlowSE: One-Step Generative Speech Enhancement via MeanFlow | 2509.23299 | ICASSP-2026 | 补漏 | 扩散、流匹配、LLM | enhancement、real-time | 待核 | 音质、可懂度、鲁棒性 | 待核 |
| An Analysis of Joint Nonlinear Spatial Filtering for Spatial Aliasing Reduction | 2509.25982 | ICASSP-2026 | 补漏 | 待核 | enhancement | 统一/联合建模 | 音质、鲁棒性、效率 | 待核 |
| Learning Time-Graph Frequency Representation for Monaural Speech Enhancement | 2510.01130 | TASLP-2025 | 补漏 | 待核 | enhancement | 待核 | 待核 | 待核 |
| PhoenixCodec: Taming Neural Speech Coding for Extreme Low-Resource Scenarios | 2510.21196 | ICASSP-2026 | 补漏 | 编解码 | low-resource、codec | 待核 | 音质、可懂度、鲁棒性 | 低资源、算力局限 |
| FlexIO: Flexible Single- and Multi-Channel Speech Separation and Enhancement | 2510.21485 | ICASSP-2026 | 补漏 | 待核 | enhancement、separation | 新方法/统一框架 | 鲁棒性 | 待核 |
| See the Speaker: Crafting High-Resolution Talking Faces from Speech with Prior Guidance and Region Refinement | 2510.26819 | TASLP-2025 | 补漏 | 扩散、Transformer | enhancement | 新方法/统一框架 | 音质、表现力 | 待核 |
| SUNAC: Source-aware Unified Neural Audio Codec | 2511.16126 | ICASSP-2026 | 补漏 | 编解码、LLM | separation、source separat | 统一/联合建模 | 音质、效率 | 算力局限 |
| JEPA as a Neural Tokenizer: Learning Robust Speech Representations with Density Adaptive Attention | 2512.07168 | NeurIPS-2025 | 补漏 | GAN、编解码、自监督 | codec | 统一/联合建模 | 鲁棒性、效率 | 待核 |
| Aliasing-Free Neural Audio Synthesis | 2512.20211 | TASLP-2025 | 补漏 | 声码器、编解码 | singing、vocoder、codec | 待核 | 音质 | 评测局限 |

### 【编创】分离/TSE/多对象 (10)
| Dynamic Slimmable Networks for Efficient Speech Separation | 2507.06179 | TASLP-2025 | 补漏 | 待核 | separation | 高效/轻量 | 效率 | 算力局限 |
| End-to-End DOA-Guided Speech Extraction in Noisy Multi-Talker Scenarios | 2507.20926 | Interspeech-2025 | 补漏 | 待核 | target speech | 高效/轻量 | 鲁棒性、效率 | 待核 |
| Neural Speech Extraction with Human Feedback | 2508.03041 | Interspeech-2025 | 补漏 | 待核 | target speech | 待核 | 待核 | 评测局限 |
| TISDiSS: A Training-Time and Inference-Time Scalable Framework for Discriminative Source Separation | 2509.15666 | ICASSP-2026 | 补漏 | 待核 | separation、source separat | 统一/联合建模 | 待核 | 待核 |
| TF-CorrNet: Leveraging Spatial Correlation for Continuous Speech Separation | 2509.16481 | SPL-2025 | 补漏 | 待核 | separation、source separat | 新方法/统一框架 | 待核 | 算力局限 |
| Unsupervised Single-Channel Speech Separation with a Diffusion Prior under Speaker-Embedding Guidance | 2509.24395 | ICASSP-2026 | 补漏 | 扩散 | separation | 新方法/统一框架 | 待核 | 待核 |
| Gelina: Unified Speech and Gesture Synthesis via Interleaved Token Prediction | 2510.12834 | ICASSP-2026 | 补漏 | 自回归 | cloning、prosod | 统一/联合建模 | 音质 | 算力局限、评测局限 |
| Spatially Aware Self-Supervised Models for Multi-Channel Neural Speaker Diarization | 2510.14551 | ICASSP-2026 | 补漏 | 自监督 | diarization | 高效/轻量 | 待核 | 算力局限、评测局限 |
| VBx for End-to-End Neural and Clustering-based Diarization | 2510.19572 | ICASSP-2026 | 补漏 | Conformer | diarization | 待核 | 鲁棒性 | 评测局限、泛化局限 |

### 【编创】情感/韵律 (5)
| BERT-APC: A Reference-free Framework for Automatic Pitch Correction via Musical Context Inference | 2511.20006 | TASLP-2025 | 补漏 | LLM | emotion、singing | 新方法/统一框架 | 自然度、音质、鲁棒性 | 待核 |

### 【编创】口音/方言 (2)
| Accent Normalization Using Self-Supervised Discrete Tokens with Non-Parallel Data | 2507.17735 | Interspeech-2025 | 补漏 | 流匹配、自监督 | accent | 新方法/统一框架 | 自然度 | 待核 |

### 【非编创】匿名化/隐私/anti-spoofing/deepfake (5)
| Evaluating Fake Music Detection Performance Under Audio Augmentations | 2507.10447 | ISMIR-2025 | 补漏 | — | 匿名化/隐私/anti-spoofing/deepfake | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Frame-level Temporal Difference Learning for Partial Deepfake Speech Detection | 2507.15101 | SPL-2025 | 补漏 | 注意力 | 匿名化/隐私/anti-spoofing/deepfake | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Generalizable Audio Deepfake Detection via Hierarchical Structure Learning and Feature Whitening in Poincaré sphere | 2508.01897 | Interspeech-2025 | 补漏 | — | 匿名化/隐私/anti-spoofing/deepfake | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Joint Optimization of Speaker and Spoof Detectors for Spoofing-Robust Automatic Speaker Verification | 2510.01818 | TASLP-2025 | 补漏 | 分类器 | 匿名化/隐私/anti-spoofing/deepfake | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Who Gets Heard? Rethinking Fairness in AI for Music Systems | 2511.05953 | NeurIPS-2025 | 补漏 | — | 匿名化/隐私/anti-spoofing/deepfake | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】说话人识别/验证 (8)
| Clustering-based hard negative sampling for supervised contrastive speaker verification | 2507.17540 | Interspeech-2025 | 补漏 | 对比学习、聚类 | 说话人识别/验证 | 轻量 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| An Age-Agnostic System for Robust Speaker Verification | 2508.01637 | Interspeech-2025 | 补漏 | 分类器 | 儿童语音 | 统一模型、解耦 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Privacy Disclosure of Similarity Rank in Speech and Language Processing | 2508.05250 | TASLP-2025 | 补漏 | — | 嘈杂环境 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| G-IFT: A Gated Linear Unit adapter with Iterative Fine-Tuning for Low-Resource Children's Speaker Verification | 2508.07836 | Interspeech-2025 | 补漏 | 适配器、微调、分类器 | 低资源、边缘设备、儿童语音 | 低资源 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Impact of Phonetics on Speaker Identity in Adversarial Voice Attack | 2509.15437 | ICASSP-2026 | 补漏 | — | 通话/呼叫中心 | 端到端 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Short-Segment Speaker Verification with Pre-trained Models and Multi-Resolution Encoder | 2509.19721 | ICASSP-2026 | 补漏 | 自监督学习 | 说话人识别/验证 | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Stage-Wise Learning Strategy with Fixed Anchors for Robust Speaker Verification | 2510.18530 | ICASSP-2026 | 补漏 | 微调 | 通话/呼叫中心、嘈杂环境 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Noise-Conditioned Mixture-of-Experts Framework for Robust Speaker Verification | 2510.18533 | SPL-2025 | 补漏 | — | 通话/呼叫中心、嘈杂环境 | 统一模型 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】paralinguistic/病理 (1)
| Idiosyncratic Versus Normative Modeling of Atypical Speech Recognition: Dysarthric Case Studies | 2509.16718 | EMNLP-2025 | 补漏 | — | paralinguistic/病理 | 个性化 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】其他/边界(语音相邻) (21)
| QHARMA-GAN: Quasi-Harmonic Neural Vocoder based on Autoregressive Moving Average Model | 2507.01611 | TASLP-2025 | 补漏 | GAN | 其他/边界(语音相邻) | 端到端 | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Self-supervised learning of speech representations with Dutch archival data | 2507.04554 | Interspeech-2025 | 补漏 | 自监督学习、微调 | 通话/呼叫中心、嘈杂环境 | 自监督 | 鲁棒性、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Constraint Optimized Multichannel Mixer-limiter Design | 2507.06769 | ICASSP-2026 | 补漏 | — | 实时 | 实时、高效 | 实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Assessing the Alignment of Audio Representations with Timbre Similarity Ratings | 2507.07764 | ISMIR-2025 | 补漏 | — | 通话/呼叫中心 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Best Practices and Considerations for Child Speech Corpus Collection and Curation in Educational, Clinical, and Forensic Scenarios | 2507.12870 | Interspeech-2025 | 补漏 | — | 边缘设备、儿童语音、临床 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SLASH: Self-Supervised Speech Pitch Estimation Leveraging DSP-derived Absolute Pitch | 2507.17208 | Interspeech-2025 | 补漏 | 自监督学习 | 其他/边界(语音相邻) | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Should Top-Down Clustering Affect Boundaries in Unsupervised Word Discovery? | 2507.19204 | TASLP-2025 | 补漏 | 自监督学习、聚类 | 其他/边界(语音相邻) | 自监督 | 速度提升 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SpeechIQ: Speech-Agentic Intelligence Quotient Across Cognitive Levels in Voice Understanding by Large Language Models | 2507.19361 | ACL-2025 | 补漏 | 语言模型、大语言模型 | 智能体 | 统一模型、端到端 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speech LLMs in Low-Resource Scenarios: Data Volume Requirements and the Impact of Pretraining on High-Resource Languages | 2508.05149 | Interspeech-2025 | 补漏 | 语言模型、大语言模型 | 低资源、多语言 | 轻量、低资源 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Iterative refinement, not training objective, makes HuBERT behave differently from wav2vec 2.0 | 2508.08110 | Interspeech-2025 | 补漏 | 自监督学习 | 其他/边界(语音相邻) | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Read to Hear: A Zero-Shot Pronunciation Assessment Using Textual Descriptions and LLMs | 2509.14187 | EMNLP-2025 | 补漏 | 语言模型、大语言模型、零样本 | 通话/呼叫中心、边缘设备 | 零样本泛型、高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SoundCompass: Navigating Target Sound Extraction With Effective Directional Clue Integration In Complex Acoustic Scenes | 2509.18561 | ICASSP-2026 | 补漏 | — | 其他/边界(语音相邻) | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| MUSHRA-1S: A scalable and sensitive test approach for evaluating top-tier speech processing systems | 2509.19219 | ICASSP-2026 | 补漏 | — | 其他/边界(语音相邻) | — | 鲁棒性、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| MuFFIN: Multifaceted Pronunciation Feedback Model with Interactive Hierarchical Neural Modeling | 2510.04956 | TASLP-2025 | 补漏 | 对比学习、分类器 | 通话/呼叫中心、边缘设备 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| DroneAudioset: An Audio Dataset for Drone-based Search and Rescue | 2510.15383 | NeurIPS-2025 | 补漏 | — | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Bayesian Low-Rank Factorization for Robust Model Adaptation | 2510.18723 | ICASSP-2026 | 补漏 | 适配器、LoRA、微调 | 多语言、语码切换 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Adapting Language Balance in Code-Switching Speech | 2510.18724 | ICASSP-2026 | 补漏 | — | 语码切换 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Matching Reverberant Speech Through Learned Acoustic Embeddings and Feedback Delay Networks | 2510.23158 | ICASSP-2026 | 补漏 | — | 其他/边界(语音相邻) | 高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Computational Approach to Analyzing Disrupted Language in Schizophrenia: Integrating Surprisal and Coherence Measures | 2511.03089 | ICASSP-2026 | 补漏 | GAN | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Towards Language-Independent Face-Voice Association with Multimodal Foundation Models | 2512.02759 | ICASSP-2026 | 补漏 | 对比学习、LoRA、微调 | 通话/呼叫中心、多语言 | 跨语言 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| BEST-STD2.0: Balanced and Efficient Speech Tokenizer for Spoken Term Detection | 2512.16395 | ICASSP-2026 | 补漏 | — | 其他/边界(语音相邻) | 高效 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

## 未覆盖venue (102)

### 【编创】TTS/语音生成/speech-LM/agent (36)
| Multi-Step Prediction and Control of Hierarchical Emotion Distribution in Text-to-Speech Synthesis | 2507.04598 | APSIPA-2025 | 未覆盖venue | 待核 | tts、text-to-speech、speech | 新方法/统一框架 | 表现力 | 评测局限 |
| ZipVoice-Dialog: Non-Autoregressive Spoken Dialogue Generation with Flow Matching | 2507.09318 | ACL-2026 | 未覆盖venue | 流匹配、自回归 | tts、text-to-speech | 零样本泛化 | 可懂度、鲁棒性、相似度 | 评测局限 |
| XEmoRAG: Cross-Lingual Emotion Transfer with Controllable Intensity Using Retrieval-Augmented Generation | 2508.07302 | ASRU-2025 | 未覆盖venue | 流匹配、LLM | speech synthesis、prosod、e | 零样本泛化 | 可控、表现力 | 低资源 |
| MixedG2P-T5: G2P-free Speech Synthesis for Mixed-script texts using Speech Self-Supervised Learning and Language Model | 2509.01391 | APSIPA-2025 | 未覆盖venue | LLM、自监督 | text-to-speech、speech syn | 新方法/统一框架 | 待核 | 待核 |
| Computational Narrative Understanding for Expressive Text-to-Speech | 2509.04072 | ACL-2026 | 未覆盖venue | 流匹配、自回归 | tts、text-to-speech、prosod | 新方法/统一框架 | 可懂度、表现力 | 算力局限、评测局限 |
| LibriTTS-VI: A Public Corpus and Novel Methods for Efficient Voice Impression Control | 2509.15626 | Interspeech-2026 | 未覆盖venue | 待核 | tts、text-to-speech | 高效/轻量 | 效率 | 待核 |
| Selective Classifier-free Guidance for Zero-shot Text-to-speech | 2509.19668 | ICASSP-2025 | 未覆盖venue | 待核 | text-to-speech、speech syn | 零样本泛化 | 相似度 | 评测局限 |
| Emotional Text-To-Speech Based on Mutual-Information-Guided Emotion-Timbre Disentanglement | 2510.01722 | APSIPA-2025 | 未覆盖venue | 待核 | tts、text-to-speech、emotio | 新方法/统一框架 | 音质 | 待核 |
| WhisperVC: Decoupled Cross-Domain Alignment and Speech Generation for Low-Resource Whisper-to-Normal Conversion | 2511.01056 | Interspeech-2026 | 未覆盖venue | GAN、声码器、Conformer | prosod、low-resource、vocod | 新方法/统一框架 | 音质、相似度 | 低资源 |
| Time-Layer Adaptive Alignment for Speaker Similarity in Flow-Matching Based Zero-Shot TTS | 2511.09995 | Interspeech-2026 | 未覆盖venue | 流匹配、LLM | tts、text-to-speech、speech | 统一/联合建模 | 音质、鲁棒性、相似度 | 泛化局限 |

### 【编创】VC/克隆 (4)
| Conan: A Chunkwise Online Network for Zero-Shot Adaptive Voice Conversion | 2507.14534 | ASRU-2025 | 未覆盖venue | GAN、声码器 | voice conversion、streamin | 零样本泛化 | 实时 | 评测局限 |
| Maestro-EVC: Controllable Emotional Voice Conversion Guided by References and Explicit Prosody | 2508.06890 | ASRU-2025 | 未覆盖venue | 待核 | speech synthesis、voice co | 新方法/统一框架 | 音质、鲁棒性、可控 | 待核 |
| Scalable Controllable Accented TTS | 2508.07426 | ASRU-2025 | 未覆盖venue | 待核 | tts、voice conversion、acce | 待核 | 鲁棒性、可控 | 待核 |
| Efficient Speech Watermarking for Speech Synthesis via Progressive Knowledge Distillation | 2509.19812 | ASRU-2025 | 未覆盖venue | 蒸馏 | speech synthesis、cloning、 | 高效/轻量 | 鲁棒性、实时、效率 | 算力局限 |

### 【编创】增强/去噪/编解码/修复/带宽扩展 (20)
| Self-Steering Deep Non-Linear Spatially Selective Filters for Efficient Extraction of Moving Speakers under Weak Guidance | 2507.02791 | WASPAA-2025 | 未覆盖venue | 自回归 | enhancement、real-time | 高效/轻量 | 实时、效率 | 算力局限、评测局限 |
| Long-Context Modeling Networks for Monaural Speech Enhancement: A Comparative Study | 2507.04368 | WASPAA-2025 | 未覆盖venue | LLM、Transformer、Conformer | enhancement | 统一/联合建模 | 效率 | 待核 |
| Adaptive Slimming for Scalable and Efficient Speech Enhancement | 2507.04879 | WASPAA-2025 | 未覆盖venue | 待核 | enhancement、real-time | 高效/轻量 | 音质、鲁棒性、实时 | 算力局限 |
| Robust One-step Speech Enhancement via Consistency Distillation | 2507.05688 | WASPAA-2025 | 未覆盖venue | 扩散、蒸馏 | enhancement、real-time | 统一/联合建模 | 音质、鲁棒性、实时 | 泛化局限 |
| Microphone Occlusion Mitigation for Own-Voice Enhancement in Head-Worn Microphone Arrays Using Switching-Adaptive Beamforming | 2507.09350 | WASPAA-2025 | 未覆盖venue | 待核 | enhancement | 高效/轻量 | 鲁棒性、效率 | 评测局限 |
| Cyclic Multichannel Wiener Filter for Acoustic Beamforming | 2507.10159 | WASPAA-2025 | 未覆盖venue | 待核 | enhancement | 待核 | 待核 | 待核 |
| FasTUSS: Faster Task-Aware Unified Source Separation | 2507.11435 | WASPAA-2025 | 未覆盖venue | 待核 | enhancement、separation、so | 统一/联合建模 | 效率、速度 | 待核 |
| VoxATtack: A Multimodal Attack on Voice Anonymization Systems | 2507.12081 | WASPAA-2025 | 未覆盖venue | 待核 | enhancement | 新方法/统一框架 | 待核 | 算力局限、评测局限 |
| Room Impulse Response Generation Conditioned on Acoustic Parameters | 2507.12136 | WASPAA-2025 | 未覆盖venue | 流匹配、编解码、Transformer | codec | 新方法/统一框架 | 待核 | 评测局限 |
| Controlling the Parameterized Multi-channel Wiener Filter using a tiny neural network | 2507.13863 | WASPAA-2025 | 未覆盖venue | 待核 | enhancement | 待核 | 待核 | 算力局限 |
| FlowSE: Flow Matching-based Speech Enhancement | 2508.06840 | ICASSP-2025 | 未覆盖venue | 扩散、流匹配、归一化流 | enhancement | 新方法/统一框架 | 待核 | 算力局限、评测局限 |
| A Framework for Robust Speaker Verification in Highly Noisy Environments Leveraging Both Noisy and Enhanced Audio | 2508.18913 | EUSIPCO-2025 | 未覆盖venue | 待核 | enhancement | 高效/轻量 | 音质、鲁棒性 | 待核 |
| MDD: a Mask Diffusion Detector to Protect Speaker Verification Systems from Adversarial Perturbations | 2508.19180 | APSIPA-2025 | 未覆盖venue | 扩散、编解码 | codec | 新方法/统一框架 | 待核 | 待核 |
| Analysing the Language of Neural Audio Codecs | 2509.01390 | ASRU-2025 | 未覆盖venue | 编解码 | codec | 待核 | 音质、可懂度 | 评测局限 |
| Analysis of Speaker Verification Performance Trade-offs with Neural Audio Codec Transmission | 2509.02771 | APSIPA-2025 | 未覆盖venue | 编解码 | bandwidth、codec | 待核 | 音质 | 评测局限 |
| A High-Quality and Low-Complexity Streamable Neural Speech Codec with Knowledge Distillation | 2509.13670 | APSIPA-2025 | 未覆盖venue | 编解码、蒸馏 | real-time、codec | 高效/轻量 | 音质、实时、低延迟 | 算力局限 |
| DroFiT: A Lightweight Band-fused Frequency Attention Toward Real-time UAV Speech Enhancement | 2509.16945 | Interspeech-2026 | 未覆盖venue | Transformer | enhancement、streaming、rea | 高效/轻量 | 实时、效率 | 算力局限、评测局限 |
| Real-Time System for Audio-Visual Target Speech Enhancement | 2509.20741 | WASPAA-2025 | 未覆盖venue | 待核 | enhancement、target speech | 待核 | 鲁棒性、实时 | 泛化局限 |
| Schrödinger Bridge Mamba for One-Step Speech Enhancement | 2510.16834 | Interspeech-2026 | 未覆盖venue | Mamba | enhancement、denois、stream | 统一/联合建模 | 音质、实时、效率 | 待核 |
| Lightweight Wasserstein Audio-Visual Model for Unified Speech Enhancement and Separation | 2512.06689 | ASRU-2025 | 未覆盖venue | 待核 | enhancement、separation | 统一/联合建模 | 鲁棒性 | 泛化局限 |

### 【编创】分离/TSE/多对象 (7)
| Multi-Utterance Speech Separation and Association Trained on Short Segments | 2507.02562 | WASPAA-2025 | 未覆盖venue | 待核 | separation | 高效/轻量 | 鲁棒性 | 算力局限、泛化局限 |
| A Study of the Scale Invariant Signal to Distortion Ratio in Speech Separation with Noisy References | 2508.14623 | ASRU-2025 | 未覆盖venue | 待核 | separation | 待核 | 音质 | 评测局限 |
| Robust Audio-Visual Target Speaker Extraction with Emotion-Aware Multiple Enrollment Fusion | 2509.12583 | Interspeech-2026 | 未覆盖venue | LLM | emotion | 待核 | 鲁棒性 | 待核 |
| Token-based Attractors and Cross-attention in Spoof Diarization | 2509.13085 | ASRU-2025 | 未覆盖venue | 待核 | separation、diarization | 待核 | 待核 | 待核 |
| Spatially-Augmented Sequence-to-Sequence Neural Diarization for Meetings | 2510.09505 | Interspeech-2026 | 未覆盖venue | 待核 | diarization | 待核 | 待核 | 待核 |

### 【编创】情感/韵律 (8)
| SEF-MK: Speaker-Embedding-Free Voice Anonymization through Multi-k-means Quantization | 2508.07086 | ASRU-2025 | 未覆盖venue | 自监督 | emotion | 新方法/统一框架 | 待核 | 待核 |
| Expressive Speech Retrieval using Natural Language Descriptions of Speaking Style | 2508.11187 | ASRU-2025 | 未覆盖venue | 待核 | emotion | 统一/联合建模 | 表现力 | 泛化局限 |
| Controllable Singing Voice Synthesis using Phoneme-Level Energy Sequence | 2509.07038 | ASRU-2025 | 未覆盖venue | 待核 | singing | 待核 | 音质、可控、表现力 | 待核 |

### 【非编创】匿名化/隐私/anti-spoofing/deepfake (7)
| Robust Localization of Partially Fake Speech: Metrics and Out-of-Domain Evaluation | 2507.03468 | APSIPA-2025 | 未覆盖venue | — | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| RawTFNet: A Lightweight CNN Architecture for Speech Anti-spoofing | 2507.08227 | APSIPA-2025 | 未覆盖venue | Transformer | 匿名化/隐私/anti-spoofing/deepfake | 轻量 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Two Views, One Truth: Spectral and Self-Supervised Features Fusion for Robust Speech Deepfake Detection | 2507.20417 | WASPAA-2025 | 未覆盖venue | 自监督学习、注意力 | 通话/呼叫中心 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Fusion of Modulation Spectrogram and SSL with Multi-head Attention for Fake Speech Detection | 2508.01034 | APSIPA-2025 | 未覆盖venue | 自监督学习、注意力 | 多语言 | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Voice Privacy Preservation with Multiple Random Orthogonal Secret Keys: Attack Resistance Analysis | 2509.19906 | APSIPA-2025 | 未覆盖venue | — | 匿名化/隐私/anti-spoofing/deepfake | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Advancing Zero-Shot Open-Set Speech Deepfake Source Tracing | 2509.24674 | Odyssey-2026 | 未覆盖venue | 零样本、少样本 | 匿名化/隐私/anti-spoofing/deepfake | 零样本泛型 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SpeechLLM-as-Judges: Towards General and Interpretable Speech Quality Evaluation | 2510.14664 | ACL-2026 | 未覆盖venue | 语言模型、大语言模型 | 通话/呼叫中心、多语言 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】说话人识别/验证 (2)
| Text adaptation for speaker verification with speaker-text factorized embeddings | 2508.04425 | ICASSP-2020 | 未覆盖venue | 大语言模型 | 说话人识别/验证 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SV-Mixer: Replacing the Transformer Encoder with Lightweight MLPs for Self-Supervised Model Compression in Speaker Verification | 2509.14136 | ASRU-2025 | 未覆盖venue | Transformer、自监督学习、注意力 | 实时 | 实时、轻量、自监督 | 鲁棒性、实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】歌声 (2)
| Towards Reliable Objective Evaluation Metrics for Generative Singing Voice Separation Models | 2507.11427 | WASPAA-2025 | 未覆盖venue | — | 歌声 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Drum-to-Vocal Percussion Sound Conversion and Its Evaluation Methodology | 2509.16862 | APSIPA-2025 | 未覆盖venue | 自编码器、向量量化 | 实时、嘈杂环境 | 实时 | 自然度、实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】其他/边界(语音相邻) (16)
| Multi-Sampling-Frequency Naturalness MOS Prediction Using Self-Supervised Learning Model with Sampling-Frequency-Independent Layer | 2507.14647 | ASRU-2025 | 未覆盖venue | 自监督学习 | 边缘设备 | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Mitigating Data Imbalance in Automated Speaking Assessment | 2509.03010 | APSIPA-2025 | 未覆盖venue | — | 其他/边界(语音相邻) | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Graph Connectionist Temporal Classification for Phoneme Recognition | 2509.05399 | ASRU-2025 | 未覆盖venue | — | 嘈杂环境 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Context-Aware Query Refinement for Target Sound Extraction: Handling Partially Matched Queries | 2509.08292 | WASPAA-2025 | 未覆盖venue | — | 其他/边界(语音相邻) | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Acoustic to Articulatory Speech Inversion for Children with Velopharyngeal Insufficiency | 2509.09489 | ASRU-2025 | 未覆盖venue | 微调 | 通话/呼叫中心、儿童语音、临床 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Whisper Has an Internal Word Aligner | 2509.09987 | ASRU-2025 | 未覆盖venue | 注意力 | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Distilled Low-Latency Neural Vocoder with Explicit Amplitude and Phase Prediction | 2509.13667 | APSIPA-2025 | 未覆盖venue | 知识蒸馏、知识蒸馏 | 低延迟、边缘设备、实时 | 实时、低延迟 | 低延迟、实时响应、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Self-Guided Target Sound Extraction and Classification Through Universal Sound Separation Model and Multiple Clues | 2509.13741 | DCASE-2025 | 未覆盖venue | — | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Comparator Loss: An Ordinal Contrastive Loss to Derive a Severity Score for Speech-based Health Monitoring | 2509.17661 | Odyssey-2026 | 未覆盖venue | 对比学习 | 通话/呼叫中心、临床 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ControlAudio: Tackling Text-Guided, Timing-Indicated and Intelligible Audio Generation via Progressive Diffusion Modeling | 2510.08878 | ACL-2026 | 未覆盖venue | 扩散模型、Transformer | 其他/边界(语音相邻) | 统一模型、可控、扩散生成 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| HyWA: Hypernetwork Weight Adapting Personalized Voice Activity Detection | 2510.12947 | Interspeech-2026 | 未覆盖venue | — | 通话/呼叫中心 | 个性化 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SPEAR: A Unified SSL Framework for Learning Speech and Audio Representations | 2510.25955 | ICML-2026 | 未覆盖venue | 自监督学习、离散token | 边缘设备 | 统一模型、自监督 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Leveraging Language Information for Target Language Extraction | 2511.01652 | APSIPA-2025 | 未覆盖venue | — | 边缘设备、多语言 | 端到端 | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Multiplexing Neural Audio Watermarks | 2511.02278 | Interspeech-2026 | 未覆盖venue | — | 其他/边界(语音相邻) | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Joint Speech and Text Training for LLM-Based End-to-End Spoken Dialogue State Tracking | 2511.22503 | Interspeech-2026 | 未覆盖venue | 语言模型、大语言模型 | 对话 | 端到端 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| What Does the Speaker Embedding Encode? | 2512.18286 | Interspeech-2017 | 未覆盖venue | — | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |

## arXiv-only (539)

### 【编创】TTS/语音生成/speech-LM/agent (152)
| Multi-interaction TTS toward professional recording reproduction | 2507.00808 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、speech | 新方法/统一框架 | 待核 | 待核 |
| SpeechAccentLLM: A Unified Framework for Foreign Accent Conversion and Text to Speech | 2507.01348 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、prosod | 统一/联合建模 | 音质 | 待核 |
| Differentiable Reward Optimization for LLM based TTS system | 2507.05911 | arXiv-only | arXiv-only | 编解码、LLM、强化学习 | tts、text-to-speech、emotio | 零样本泛化 | 音质 | 算力局限 |
| DMOSpeech 2: Reinforcement Learning for Duration Prediction in Metric-Optimized Speech Synthesis | 2507.14988 | arXiv-only | arXiv-only | 扩散、强化学习 | tts、text-to-speech、speech | 零样本泛化 | 音质、相似度 | 评测局限 |
| A2TTS: TTS for Low Resource Indian Languages | 2507.15272 | arXiv-only | arXiv-only | 扩散 | tts、text-to-speech、prosod | 零样本泛化 | 自然度、表现力 | 待核 |
| Technical report: Impact of Duration Prediction on Speaker-specific TTS for Indian Languages | 2507.16875 | arXiv-only | arXiv-only | 归一化流、自回归 | tts、prosod、low-resource | 零样本泛化 | 音质、可懂度 | 低资源、数据局限 |
| BoSS: Beyond-Semantic Speech | 2507.17563 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、emotio | 新方法/统一框架 | 待核 | 评测局限 |
| TTS-1 Technical Report | 2507.21138 | arXiv-only | arXiv-only | LLM、Transformer、自回归 | tts、text-to-speech、speech | 高效/轻量 | 音质、实时、低延迟 | 算力局限 |
| Next Tokens Denoising for Speech Synthesis | 2507.22746 | arXiv-only | arXiv-only | 扩散、流匹配、编解码 | tts、text-to-speech、speech | 高效/轻量 | 音质、效率、速度 | 待核 |
| EmoSteer-TTS: Fine-Grained and Training-Free Emotion-Controllable Text-to-Speech via Activation Steering | 2508.03543 | arXiv-only | arXiv-only | 流匹配 | tts、text-to-speech、emotio | 高效/轻量 | 音质、可控、效率 | 待核 |
| A Scalable Pipeline for Enabling Non-Verbal Speech Generation and Understanding | 2508.05385 | arXiv-only | arXiv-only | 待核 | emotion | 统一/联合建模 | 待核 | 待核 |
| Llasa+: Free Lunch for Accelerated and Streaming Llama-Based Speech Synthesis | 2508.06262 | arXiv-only | arXiv-only | LLM、自回归 | tts、text-to-speech、speech | 新方法/统一框架 | 自然度、音质 | 待核 |
| Text to Speech System for Meitei Mayek Script | 2508.06870 | arXiv-only | arXiv-only | GAN | tts、text-to-speech、speech | 新方法/统一框架 | 待核 | 待核 |
| MultiGen: Child-Friendly Multilingual Speech Generator with LLMs | 2508.08715 | arXiv-only | arXiv-only | LLM | accent、low-resource、multi | 新方法/统一框架 | 音质 | 低资源、评测局限 |
| UtterTune: LoRA-Based Target-Language Pronunciation Edit and Control in Multilingual Text-to-Speech | 2508.09767 | arXiv-only | arXiv-only | LLM、LoRA | tts、text-to-speech、prosod | 高效/轻量 | 自然度、相似度 | 评测局限 |
| EmoSSLSphere: Multilingual Emotional Speech Synthesis with Spherical Vectors and Discrete Speech Tokens | 2508.11273 | arXiv-only | arXiv-only | 自监督 | tts、text-to-speech、speech | 新方法/统一框架 | 自然度、音质、可懂度 | 评测局限 |
| MoE-TTS: Enhancing Out-of-Domain Text Understanding for Description-based TTS via Mixture-of-Experts | 2508.11326 | arXiv-only | arXiv-only | LLM | tts、text-to-speech | 新方法/统一框架 | 待核 | 待核 |
| FNH-TTS: Mixture-of-Experts Duration Modeling for Robust Neural Speech Synthesis | 2508.12001 | arXiv-only | arXiv-only | GAN、声码器、自回归 | tts、text-to-speech、speech | 新方法/统一框架 | 音质、鲁棒性 | 待核 |
| MahaTTS: A Unified Framework for Multilingual Text-to-Speech Synthesis | 2508.14049 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、speech | 统一/联合建模 | 表现力 | 待核 |
| Long-Context Speech Synthesis with Context-Aware Memory | 2508.14713 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、speech | 新方法/统一框架 | 自然度、表现力 | 待核 |
| Unseen Speaker and Language Adaptation for Lightweight Text-To-Speech with Adapters | 2508.18006 | arXiv-only | arXiv-only | 适配器 | tts、text-to-speech、accent | 高效/轻量 | 待核 | 评测局限 |
| CLEAR: Continuous Latent Autoregressive Modeling for High-quality and Low-latency Speech Synthesis | 2508.19098 | arXiv-only | arXiv-only | LLM、自回归 | tts、text-to-speech、speech | 统一/联合建模 | 自然度、音质、鲁棒性 | 待核 |
| Speaker-Conditioned Phrase Break Prediction for Text-to-Speech with Phoneme-Level Pre-trained Language Model | 2509.00675 | arXiv-only | arXiv-only | LLM | tts、text-to-speech | 待核 | 待核 | 评测局限 |
| MPO: Multidimensional Preference Optimization for Language Model-based Text-to-Speech | 2509.00685 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、prosod | 新方法/统一框架 | 音质、可懂度、鲁棒性 | 待核 |
| FireRedTTS-2: Towards Long Conversational Speech Generation for Podcast and Chatbot | 2509.02020 | arXiv-only | arXiv-only | Transformer | tts、prosod、emotion | 待核 | 自然度、可懂度、实时 | 待核 |
| Accelerating Diffusion Transformer-Based Text-to-Speech with Transformer Layer Caching | 2509.08696 | arXiv-only | arXiv-only | 扩散、Transformer | tts、text-to-speech、denois | 统一/联合建模 | 音质 | 算力局限、评测局限 |
| DiTReducio: A Training-Free Acceleration for DiT-Based TTS via Progressive Calibration | 2509.09748 | arXiv-only | arXiv-only | 扩散、Transformer、蒸馏 | tts、text-to-speech、speech | 新方法/统一框架 | 音质、实时 | 算力局限、评测局限 |
| Real-Time Streaming Mel Vocoding with Generative Flow Matching | 2509.15085 | arXiv-only | arXiv-only | 流匹配、GAN、声码器 | tts、text-to-speech、stream | 待核 | 实时 | 待核 |
| Emotion-Aware Speech Generation with Character-Specific Voices for Comics | 2509.15253 | arXiv-only | arXiv-only | LLM | text-to-speech、emotion | 待核 | 待核 | 待核 |
| Beyond Video-to-SFX: Video to Audio Synthesis with Environmentally Aware Speech | 2509.15492 | arXiv-only | arXiv-only | 待核 | speech synthesis | 统一/联合建模 | 待核 | 待核 |
| Bridging the gap between training and inference in LM-based TTS models | 2509.17021 | arXiv-only | arXiv-only | LLM | tts、text-to-speech | 新方法/统一框架 | 音质 | 评测局限 |
| Audiobook-CC: Controllable Long-context Speech Generation for Multicast Audiobook | 2509.17516 | arXiv-only | arXiv-only | 蒸馏 | text-to-speech、speech syn | 新方法/统一框架 | 可控、表现力 | 待核 |
| Discrete-Time Diffusion-Like Models for Speech Synthesis | 2509.18470 | arXiv-only | arXiv-only | 扩散 | speech synthesis | 高效/轻量 | 音质、效率 | 待核 |
| Group Relative Policy Optimization for Text-to-Speech with Large Language Models | 2509.18798 | arXiv-only | arXiv-only | LLM、强化学习 | tts、text-to-speech | 零样本泛化 | 自然度、可懂度 | 算力局限、评测局限 |
| Direct Preference Optimization for Speech Autoregressive Diffusion Models | 2509.18928 | arXiv-only | arXiv-only | 扩散、强化学习、自回归 | text-to-speech | 零样本泛化 | 鲁棒性、表现力 | 待核 |
| HD-PPT: Hierarchical Decoding of Content- and Prompt-Preference Tokens for Instruction-based TTS | 2509.19001 | arXiv-only | arXiv-only | 编解码、LLM | tts、text-to-speech、speech | 新方法/统一框架 | 自然度、可控 | 待核 |
| SCORE: Scaling audio generation using Standardized COmposite REwards | 2509.19831 | arXiv-only | arXiv-only | LLM | 待核 | 新方法/统一框架 | 音质、鲁棒性 | 算力局限、评测局限 |
| Comprehend and Talk: Text to Speech Synthesis via Dual Language Modeling | 2509.22062 | arXiv-only | arXiv-only | 编解码、LLM、Transformer | tts、text-to-speech、speech | 零样本泛化 | 音质、鲁棒性 | 待核 |
| DiaMoE-TTS: A Unified IPA-Based Dialect TTS Framework with Mixture-of-Experts and Parameter-Efficient Zero-Shot Adaptation | 2509.22727 | arXiv-only | arXiv-only | LoRA、适配器 | tts、text-to-speech、dialec | 统一/联合建模 | 表现力、效率 | 待核 |
| VSSFlow: Unifying Video-conditioned Sound and Speech Generation via Joint Learning | 2509.24773 | arXiv-only | arXiv-only | 扩散、流匹配、Transformer | tts、text-to-speech | 统一/联合建模 | 鲁棒性 | 待核 |
| Teaching Machines to Speak Using Articulatory Control | 2510.05619 | arXiv-only | arXiv-only | Transformer、强化学习 | 待核 | 待核 | 可懂度、相似度 | 待核 |
| Modeling Sarcastic Speech: Semantic and Prosodic Cues in a Speech Synthesis Framework | 2510.07096 | arXiv-only | arXiv-only | 待核 | speech synthesis、prosod | 统一/联合建模 | 待核 | 算力局限、评测局限 |
| DialoSpeech: Dual-Speaker Dialogue Generation with LLM and Flow Matching | 2510.08373 | arXiv-only | arXiv-only | 流匹配、LLM | tts、text-to-speech、speech | 新方法/统一框架 | 自然度、表现力 | 待核 |
| DiSTAR: Diffusion over a Scalable Token Autoregressive Representation for Speech Generation | 2510.12210 | arXiv-only | arXiv-only | 扩散、LLM、自回归 | tts、text-to-speech | 零样本泛化 | 自然度、音质、鲁棒性 | 算力局限 |
| Continuous-Token Diffusion for Speaker-Referenced TTS in Multimodal LLMs | 2510.12995 | arXiv-only | arXiv-only | 扩散、LLM、自回归 | tts、text-to-speech、speech | 统一/联合建模 | 鲁棒性、相似度 | 评测局限 |
| ParaStyleTTS: Toward Efficient and Robust Paralinguistic Style Control for Expressive Text-to-Speech Generation | 2510.18308 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、prosod | 高效/轻量 | 音质、鲁棒性、实时 | 低资源、算力局限 |
| StutterZero and StutterFormer: End-to-End Speech Conversion for Stuttering Transcription and Correction | 2510.18938 | arXiv-only | arXiv-only | Transformer | tts、text-to-speech | 统一/联合建模 | 相似度 | 算力局限、评测局限 |
| UltraVoice: Scaling Fine-Grained Style-Controlled Speech Conversations for Spoken Dialogue Models | 2510.22588 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、speech | 新方法/统一框架 | 音质、可控、表现力 | 待核 |
| SoulX-Podcast: Towards Realistic Long-form Podcasts with Dialectal and Paralinguistic Diversity | 2510.23541 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、speech | 待核 | 自然度、表现力 | 评测局限 |
| emg2speech: Synthesizing speech from electromyography using self-supervised speech models | 2510.23969 | arXiv-only | arXiv-only | 声码器、自监督 | vocoder | 待核 | 待核 | 待核 |
| Bayesian Speech Synthesizers Can Learn from Multiple Teachers | 2510.24372 | arXiv-only | arXiv-only | 编解码、LLM、自回归 | tts、text-to-speech、stream | 新方法/统一框架 | 音质、鲁棒性 | 待核 |
| SFMS-ALR: Script-First Multilingual Speech Synthesis with Adaptive Locale Resolution | 2510.25178 | arXiv-only | arXiv-only | SSM | tts、speech synthesis、pros | 统一/联合建模 | 自然度、音质、可懂度 | 评测局限 |
| Speech Recognition Model Improves Text-to-Speech Synthesis using Fine-Grained Reward | 2511.17555 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、speech | 零样本泛化 | 音质、鲁棒性 | 评测局限 |
| InstructAudio: Unified speech and music generation with natural language instruction | 2511.18487 | arXiv-only | arXiv-only | 扩散、Transformer | tts、text-to-speech、speech | 统一/联合建模 | 表现力 | 待核 |
| GLA-Grad++: An Improved Griffin-Lim Guided Diffusion Model for Speech Synthesis | 2511.22293 | arXiv-only | arXiv-only | 扩散、声码器 | speech synthesis、vocoder | 待核 | 音质 | 算力局限 |
| Arabic TTS with FastPitch: Reproducible Baselines, Adversarial Training, and Oversmoothing Analysis | 2512.00937 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、prosod | 高效/轻量 | 速度 | 待核 |
| SyncVoice: Towards Video Dubbing with Vision-Augmented Pretrained TTS Model | 2512.05126 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、speech | 新方法/统一框架 | 自然度 | 限于 |

### 【编创】语音编辑 (8)
| Pronunciation Editing for Finnish Speech using Phonetic Posteriorgrams | 2507.02115 | arXiv-only | arXiv-only | 扩散、流匹配 | tts、speech synthesis、low- | 待核 | 自然度、相似度 | 低资源、评测局限 |
| EditGen: Harnessing Cross-Attention Control for Instruction-Based Auto-Regressive Audio Editing | 2507.11096 | arXiv-only | arXiv-only | 扩散、自回归 | 待核 | 高效/轻量 | 效率 | 评测局限 |
| SALM: Spatial Audio Language Model with Structured Embeddings for Understanding and Editing | 2507.16724 | arXiv-only | arXiv-only | LLM、对比学习 | 待核 | 统一/联合建模 | 待核 | 待核 |
| Interpretable Audio Editing Evaluation via Chain-of-Thought Difference-Commonality Reasoning with Multimodal LLMs | 2509.16975 | arXiv-only | arXiv-only | LLM | 待核 | 待核 | 音质 | 评测局限 |
| Conversational Speech Reveals Structural Robustness Failures in SpeechLLM Backbones | 2509.20321 | arXiv-only | arXiv-only | LLM | 待核 | 待核 | 鲁棒性 | 评测局限、泛化局限 |
| Speak, Edit, Repeat: High-Fidelity Voice Editing and Zero-Shot TTS with Cross-Attentive Mamba | 2510.04738 | arXiv-only | arXiv-only | 扩散、Mamba、自回归 | tts、text-to-speech、speech | 高效/轻量 | 自然度、音质、相似度 | 评测局限 |
| AWARE: Audio Watermarking with Adversarial Resistance to Edits | 2510.17512 | arXiv-only | arXiv-only | 待核 | 待核 | 待核 | 音质、可懂度、鲁棒性 | 待核 |
| Step-Audio-EditX Technical Report | 2511.03601 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、emotio | 零样本泛化 | 鲁棒性、表现力 | 评测局限 |

### 【编创】VC/克隆 (29)
| MuteSwap: Visual-informed Silent Video Identity Conversion | 2507.00498 | arXiv-only | arXiv-only | 对比学习 | speech synthesis、voice co | 新方法/统一框架 | 待核 | 待核 |
| JoyTTS: LLM-based Spoken Chatbot With Voice Cloning | 2507.02380 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、clonin | 待核 | 相似度 | 待核 |
| Open-Source System for Multilingual Translation and Cloned Speech Synthesis | 2507.02530 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、speech | 待核 | 自然度、实时 | 待核 |
| TTS-CtrlNet: Time varying emotion aligned text-to-speech generation with ControlNet | 2507.04349 | arXiv-only | arXiv-only | 流匹配 | tts、text-to-speech、speech | 零样本泛化 | 自然度、可控、相似度 | 待核 |
| Fast-VGAN: Lightweight Voice Conversion with Explicit Control of F0 and Duration Parameters | 2507.04817 | arXiv-only | arXiv-only | GAN、声码器 | voice conversion、vocoder | 高效/轻量 | 可懂度、相似度、表现力 | 评测局限 |
| SemAlignVC: Enhancing zero-shot timbre conversion using semantic alignment | 2507.09070 | arXiv-only | arXiv-only | 编解码、LLM、Transformer | voice conversion、codec | 零样本泛化 | 自然度、可懂度、鲁棒性 | 泛化局限 |
| Voice Conversion for Lombard Speaking Style with Implicit and Explicit Acoustic Feature Conditioning | 2507.09310 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、voice | 待核 | 可懂度、相似度 | 待核 |
| Pronunciation Deviation Analysis Through Voice Cloning and Acoustic Comparison | 2507.10985 | arXiv-only | arXiv-only | 待核 | cloning | 新方法/统一框架 | 待核 | 待核 |
| Towards Scalable AASIST: Refining Graph Attention for Speech Deepfake Detection | 2507.11777 | arXiv-only | arXiv-only | 自监督 | text-to-speech、speech syn | 待核 | 待核 | 评测局限 |
| Seed LiveInterpret 2.0: End-to-end Simultaneous Speech-to-speech Translation with Your Voice | 2507.17527 | arXiv-only | arXiv-only | 强化学习 | cloning、real-time | 新方法/统一框架 | 音质、实时 | 待核 |
| Marco-Voice Technical Report | 2508.02038 | arXiv-only | arXiv-only | 对比学习 | speech synthesis、cloning、 | 统一/联合建模 | 音质、可控、表现力 | 评测局限 |
| REF-VC: Robust, Expressive and Fast Zero-Shot Voice Conversion with Diffusion Transformers | 2508.04996 | arXiv-only | arXiv-only | 扩散、流匹配、Transformer | tts、voice conversion、pros | 高效/轻量 | 鲁棒性、表现力、速度 | 待核 |
| Exploring Disentangled Neural Speech Codecs from Self-Supervised Representations | 2508.08399 | arXiv-only | arXiv-only | 编解码、LLM、自监督 | voice conversion、codec | 待核 | 待核 | 评测局限 |
| Perturbed Public Voices (P$^{2}$V): A Dataset for Robust Audio Deepfake Detection | 2508.10949 | arXiv-only | arXiv-only | LLM | cloning | 新方法/统一框架 | 鲁棒性 | 泛化局限 |
| Entropy-based Coarse and Compressed Semantic Speech Representation Learning | 2509.00503 | arXiv-only | arXiv-only | LLM | voice conversion、speech l | 新方法/统一框架 | 待核 | 待核 |
| MSR-Codec: A Low-Bitrate Multi-Stream Residual Codec for High-Fidelity Speech Generation with Information Disentanglement | 2509.13068 | arXiv-only | arXiv-only | 编解码、LLM | tts、text-to-speech、voice | 高效/轻量 | 相似度 | 待核 |
| A Multilingual Framework for Dysarthria: Detection, Severity Classification, Speech-to-Text, and Clean Speech Generation | 2510.03986 | arXiv-only | arXiv-only | 待核 | cloning、emotion、low-resou | 统一/联合建模 | 可懂度 | 低资源、泛化局限 |
| UniVoice: Unifying Autoregressive ASR and Flow-Matching based TTS with Large Language Models | 2510.04593 | arXiv-only | arXiv-only | 流匹配、LLM、自回归 | tts、text-to-speech、clonin | 统一/联合建模 | 音质 | 待核 |
| SynthVC: Leveraging Synthetic Data for End-to-End Low Latency Streaming Voice Conversion | 2510.09245 | arXiv-only | arXiv-only | 编解码 | voice conversion、separati | 高效/轻量 | 自然度、实时、低延迟 | 待核 |
| R2-SVC: Towards Real-World Robust and Expressive Zero-shot Singing Voice Conversion | 2510.20677 | arXiv-only | arXiv-only | 待核 | voice conversion、enhancem | 零样本泛化 | 自然度、鲁棒性、表现力 | 待核 |
| NaturalVoices: A Large-Scale, Spontaneous and Emotional Podcast Dataset for Voice Conversion | 2511.00256 | arXiv-only | arXiv-only | 待核 | voice conversion、prosod、e | 待核 | 音质、鲁棒性、表现力 | 泛化局限 |
| Ming-UniAudio: Speech LLM for Joint Understanding, Generation and Editing with Unified Representation | 2511.05516 | arXiv-only | arXiv-only | LLM | tts、cloning、speech editin | 统一/联合建模 | 音质 | 评测局限 |
| Generating Novel and Realistic Speakers for Voice Conversion | 2511.07135 | arXiv-only | arXiv-only | 编解码 | voice conversion、codec | 高效/轻量 | 音质 | 评测局限 |
| HQ-SVC: Towards High-Quality Zero-Shot Singing Voice Conversion in Low-Resource Scenarios | 2511.08496 | arXiv-only | arXiv-only | 扩散、编解码 | voice conversion、low-reso | 统一/联合建模 | 自然度、音质、效率 | 低资源、算力局限 |
| Degrading Voice: A Comprehensive Overview of Robust Voice Conversion Through Input Manipulation | 2512.06304 | arXiv-only | arXiv-only | 待核 | voice conversion、emotion、 | 待核 | 自然度、音质、可懂度 | 评测局限 |
| JoyVoice: Long-Context Conditioning for Anthropomorphic Multi-Speaker Conversational Synthesis | 2512.19090 | arXiv-only | arXiv-only | 扩散、Transformer、自回归 | tts、cloning、prosod | 统一/联合建模 | 自然度、音质、可懂度 | 泛化局限 |
| QuarkAudio Technical Report | 2512.20151 | arXiv-only | arXiv-only | 编解码、自监督、自回归 | voice conversion、separati | 统一/联合建模 | 音质、鲁棒性 | 待核 |
| MiMo-Audio: Audio Language Models are Few-Shot Learners | 2512.23808 | arXiv-only | arXiv-only | LLM | tts、voice conversion、spee | 待核 | 待核 | 评测局限、泛化局限 |
| Defense Against Synthetic Speech: Real-Time Detection of RVC Voice Conversion Attacks | 2601.04227 | arXiv-only | arXiv-only | 待核 | voice conversion、cloning、 | 待核 | 鲁棒性、实时 | 评测局限 |

### 【编创】增强/去噪/编解码/修复/带宽扩展 (107)
| Generalizable Detection of Audio Deepfakes | 2507.01750 | arXiv-only | arXiv-only | 待核 | enhancement | 待核 | 鲁棒性 | 泛化局限 |
| An Investigation on Combining Geometry and Consistency Constraints into Phase Estimation for Speech Enhancement | 2507.02192 | arXiv-only | arXiv-only | 待核 | enhancement | 新方法/统一框架 | 待核 | 评测局限 |
| Posterior Transition Modeling for Unsupervised Diffusion-Based Speech Enhancement | 2507.02391 | arXiv-only | arXiv-only | 扩散 | enhancement | 新方法/统一框架 | 鲁棒性、表现力 | 待核 |
| Generic Speech Enhancement with Self-Supervised Representation Space Loss | 2507.07631 | arXiv-only | arXiv-only | 自监督 | enhancement | 新方法/统一框架 | 音质 | 泛化局限 |
| Re-Bottleneck: Latent Re-Structuring for Neural Audio Autoencoders | 2507.07867 | arXiv-only | arXiv-only | 扩散、编解码 | codec | 高效/轻量 | 音质、效率 | 待核 |
| Controllable joint noise reduction and hearing loss compensation using a differentiable auditory model | 2507.09372 | arXiv-only | arXiv-only | 待核 | denois | 统一/联合建模 | 音质、可懂度、可控 | 待核 |
| MB-RIRs: a Synthetic Room Impulse Response Dataset with Frequency-Dependent Absorption Coefficients | 2507.09750 | arXiv-only | arXiv-only | 待核 | enhancement | 高效/轻量 | 效率 | 评测局限 |
| AudioMAE++: learning better masked audio representations with SwiGLU FFNs | 2507.10464 | arXiv-only | arXiv-only | Transformer、自监督 | enhancement | 新方法/统一框架 | 待核 | 评测局限 |
| Schrödinger Bridge Consistency Trajectory Models for Speech Enhancement | 2507.11925 | arXiv-only | arXiv-only | 扩散、蒸馏 | enhancement、real-time | 高效/轻量 | 音质、实时、效率 | 评测局限 |
| Task-Specific Audio Coding for Machines: Machine-Learned Latent Features Are Codes for That Machine | 2507.12701 | arXiv-only | arXiv-only | 编解码 | codec | 高效/轻量 | 效率 | 评测局限 |
| TGIF: Talker Group-Informed Familiarization of Target Speaker Extraction | 2507.14044 | arXiv-only | arXiv-only | 蒸馏 | enhancement | 待核 | 待核 | 算力局限、泛化局限 |
| U-DREAM: Unsupervised Dereverberation guided by a Reverberation Model | 2507.14237 | arXiv-only | arXiv-only | 待核 | low-resource | 高效/轻量 | 效率 | 低资源 |
| Mixture to Beamformed Mixture: Leveraging Beamformed Mixture as Weak-Supervision for Speech Enhancement and Noise-Robust ASR | 2507.15229 | arXiv-only | arXiv-only | 待核 | enhancement、target speech | 新方法/统一框架 | 鲁棒性 | 评测局限、泛化局限 |
| CIS-BWE: Chaos-Informed Speech Bandwidth Extension | 2507.15970 | arXiv-only | arXiv-only | Transformer、Conformer | bandwidth | 新方法/统一框架 | 待核 | 评测局限 |
| Distributed Asynchronous Device Speech Enhancement via Windowed Cross-Attention | 2507.16104 | arXiv-only | arXiv-only | 待核 | enhancement | 高效/轻量 | 速度 | 评测局限 |
| LABNet: A Lightweight Attentive Beamforming Network for Ad-hoc Multichannel Microphone Invariant Real-Time Speech Enhancement | 2507.16190 | arXiv-only | arXiv-only | 待核 | enhancement、real-time | 高效/轻量 | 实时、效率 | 算力局限 |
| Recent Trends in Distant Conversational Speech Recognition: A Review of CHiME-7 and 8 DASR Challenges | 2507.18161 | arXiv-only | arXiv-only | LLM | enhancement、separation、so | 统一/联合建模 | 音质、鲁棒性 | 算力局限、评测局限 |
| Comparison of Knowledge Distillation Methods for Low-complexity Multi-microphone Speech Enhancement using the FT-JNF Architecture | 2507.19208 | arXiv-only | arXiv-only | 蒸馏 | enhancement | 统一/联合建模 | 相似度 | 评测局限 |
| Binaural Speech Enhancement Using Complex Convolutional Recurrent Networks | 2507.20023 | arXiv-only | arXiv-only | 待核 | enhancement | 待核 | 可懂度 | 待核 |
| Binaural Localization Model for Speech in Noise | 2507.20027 | arXiv-only | arXiv-only | 待核 | enhancement | 高效/轻量 | 待核 | 待核 |
| Sync-TVA: A Graph-Attention Framework for Multimodal Emotion Recognition with Cross-Modal Fusion | 2507.21395 | arXiv-only | arXiv-only | 待核 | enhancement、emotion | 新方法/统一框架 | 鲁棒性 | 待核 |
| Multi-Granularity Adaptive Time-Frequency Attention Framework for Audio Deepfake Detection under Real-World Communication Degradations | 2508.01467 | arXiv-only | arXiv-only | 编解码 | codec | 统一/联合建模 | 鲁棒性 | 待核 |
| Enhancing Spectrogram Realism in Singing Voice Synthesis via Explicit Bandwidth Extension Prior to Vocoder | 2508.01796 | arXiv-only | arXiv-only | 扩散、声码器 | denois、bandwidth、singing | 待核 | 音质 | 评测局限 |
| EgoTrigger: Toward Audio-Driven Image Capture for Human Memory Enhancement in All-Day Energy-Efficient Smart Glasses | 2508.01915 | arXiv-only | arXiv-only | 待核 | enhancement、agent | 高效/轻量 | 效率 | 评测局限 |
| Unsupervised Multi-channel Speech Dereverberation via Diffusion | 2508.02071 | arXiv-only | arXiv-only | 扩散 | 待核 | 新方法/统一框架 | 待核 | 待核 |
| Inference-time Scaling for Diffusion-based Audio Super-resolution | 2508.02391 | arXiv-only | arXiv-only | 扩散、LoRA | super-resolution | 新方法/统一框架 | 音质、鲁棒性、相似度 | 算力局限 |
| Towards Reliable Audio Deepfake Attribution and Model Recognition: A Multi-Level Autoencoder-Based Framework | 2508.02521 | arXiv-only | arXiv-only | 编解码 | codec | 新方法/统一框架 | 鲁棒性 | 待核 |
| SecoustiCodec: Cross-Modal Aligned Streaming Single-Codecbook Speech Codec | 2508.02849 | arXiv-only | arXiv-only | 编解码、LLM、对比学习 | emotion、streaming、codec | 统一/联合建模 | 音质、鲁棒性、效率 | 待核 |
| Real-time speech enhancement in noise for throat microphone using neural audio codec as foundation model | 2508.02974 | arXiv-only | arXiv-only | 编解码 | enhancement、bandwidth、rea | 待核 | 鲁棒性、实时 | 待核 |
| Fast Algorithm for Moving Sound Source | 2508.03065 | arXiv-only | arXiv-only | 待核 | enhancement、real-time | 高效/轻量 | 音质、实时、效率 | 算力局限 |
| SpectroStream: A Versatile Neural Codec for General Audio | 2508.05207 | arXiv-only | arXiv-only | 编解码 | codec | 新方法/统一框架 | 音质 | 待核 |
| Investigation of Speech and Noise Latent Representations in Single-channel VAE-based Speech Enhancement | 2508.05293 | arXiv-only | arXiv-only | 待核 | enhancement | 待核 | 待核 | 待核 |
| Egonoise Resilient Source Localization and Speech Enhancement for Drones Using a Hybrid Model and Learning-Based Approach | 2508.06310 | arXiv-only | arXiv-only | 待核 | enhancement | 新方法/统一框架 | 待核 | 评测局限、泛化局限 |
| UniFlow: Unifying Speech Front-End Tasks via Continuous Generative Modeling | 2508.07558 | arXiv-only | arXiv-only | 扩散、流匹配、Transformer | enhancement、denois、separa | 统一/联合建模 | 待核 | 算力局限 |
| Alternating Approach-Putt Models for Multi-Stage Speech Enhancement | 2508.10436 | arXiv-only | arXiv-only | 待核 | enhancement | 新方法/统一框架 | 音质、可懂度 | 待核 |
| End-to-end audio-visual learning for cochlear implant sound coding simulations in noisy environments | 2508.13576 | arXiv-only | arXiv-only | 待核 | enhancement | 统一/联合建模 | 可懂度 | 待核 |
| EffiFusion-GAN: Efficient Fusion Generative Adversarial Network for Speech Enhancement | 2508.14525 | arXiv-only | arXiv-only | GAN | enhancement | 高效/轻量 | 效率 | 评测局限 |
| EffortNet: A Deep Learning Framework for Objective Assessment of Speech Enhancement Technologies Using EEG-Based Alpha Oscillations | 2508.15473 | arXiv-only | arXiv-only | Transformer、自监督 | enhancement | 高效/轻量 | 可懂度、效率 | 待核 |
| Multi-Metric Preference Alignment for Generative Speech Restoration | 2508.17229 | arXiv-only | arXiv-only | 流匹配、自回归 | singing、restoration | 新方法/统一框架 | 音质、鲁棒性 | 评测局限 |
| On the Application of Diffusion Models for Simultaneous Denoising and Dereverberation | 2508.18833 | arXiv-only | arXiv-only | 扩散 | enhancement、denois | 待核 | 待核 | 待核 |
| Audio-Visual Feature Synchronization for Robust Speech Enhancement in Hearing Aids | 2508.19483 | arXiv-only | arXiv-only | 待核 | enhancement、real-time | 高效/轻量 | 音质、可懂度、鲁棒性 | 评测局限 |
| Lightweight speech enhancement guided target speech extraction in noisy multi-speaker scenarios | 2508.19583 | arXiv-only | arXiv-only | LLM | enhancement、denois、target | 统一/联合建模 | 鲁棒性 | 待核 |
| WaveLLDM: Design and Development of a Lightweight Latent Diffusion Model for Speech Enhancement and Restoration | 2508.21153 | arXiv-only | arXiv-only | 扩散、编解码 | enhancement、denois、restor | 高效/轻量 | 音质、效率 | 算力局限、评测局限 |
| A Unified Denoising and Adaptation Framework for Self-Supervised Bengali Dialectal ASR | 2509.00988 | arXiv-only | arXiv-only | 自监督 | denois、dialect、low-resour | 统一/联合建模 | 鲁棒性 | 低资源、评测局限 |
| From Evaluation to Optimization: Neural Speech Assessment for Downstream Applications | 2509.01889 | arXiv-only | arXiv-only | 待核 | enhancement | 高效/轻量 | 音质、可懂度、效率 | 算力局限、评测局限 |
| Spectrogram Patch Codec: A 2D Block-Quantized VQ-VAE and HiFi-GAN for Neural Speech Coding | 2509.02244 | arXiv-only | arXiv-only | GAN、声码器、编解码 | streaming、vocoder、codec | 待核 | 音质、可懂度 | 评测局限 |
| Gaussian Process Regression of Steering Vectors With Physics-Aware Deep Composite Kernels for Augmented Listening | 2509.02571 | arXiv-only | arXiv-only | 待核 | enhancement、super-resolut | 新方法/统一框架 | 表现力 | 待核 |
| STSR: High-Fidelity Speech Super-Resolution via Spectral-Transient Context Modeling | 2509.03913 | arXiv-only | arXiv-only | 扩散 | real-time、restoration、sup | 统一/联合建模 | 音质、鲁棒性、实时 | 算力局限、泛化局限 |
| Test-Time Adaptation for Speech Enhancement via Domain Invariant Embedding Transformation | 2509.04280 | arXiv-only | arXiv-only | 待核 | enhancement、denois | 新方法/统一框架 | 待核 | 泛化局限 |
| Quantum Fourier Transform Based Denoising: Unitary Filtering for Enhanced Speech Clarity | 2509.04851 | arXiv-only | arXiv-only | 待核 | enhancement、denois | 高效/轻量 | 鲁棒性、速度 | 算力局限 |
| Lightweight DNN for Full-Band Speech Denoising on Mobile Devices: Exploiting Long and Short Temporal Patterns | 2509.05079 | arXiv-only | arXiv-only | 待核 | denois、real-time | 高效/轻量 | 实时、低延迟 | 评测局限 |
| On the Contribution of Lexical Features to Speech Emotion Recognition | 2509.05634 | arXiv-only | arXiv-only | Transformer、自监督 | denois、emotion | 待核 | 待核 | 评测局限 |
| The CCF AATC 2025 Speech Restoration Challenge: A Retrospective | 2509.12974 | arXiv-only | arXiv-only | 编解码 | enhancement、restoration、c | 高效/轻量 | 自然度、音质、鲁棒性 | 评测局限 |
| FocalCodec-Stream: Streaming Low-Bitrate Speech Coding via Causal Distillation | 2509.16195 | arXiv-only | arXiv-only | 编解码、蒸馏 | streaming、real-time、codec | 高效/轻量 | 音质、实时 | 待核 |
| Reverse Attention for Lightweight Speech Enhancement on Edge Devices | 2509.16705 | arXiv-only | arXiv-only | 待核 | enhancement、real-time | 高效/轻量 | 音质、可懂度、实时 | 评测局限 |
| RADE for Land Mobile Radio: A Neural Codec for Transmission of Speech over Baseband FM Radio Channels | 2509.17286 | arXiv-only | arXiv-only | 编解码 | bandwidth、codec | 待核 | 音质 | 待核 |
| Influence of Clean Speech Characteristics on Speech Enhancement Performance | 2509.18885 | arXiv-only | arXiv-only | 待核 | enhancement | 待核 | 待核 | 算力局限、评测局限 |
| Generalizability of Predictive and Generative Speech Enhancement Models to Pathological Speakers | 2509.18890 | arXiv-only | arXiv-only | 待核 | enhancement | 待核 | 待核 | 泛化局限 |
| Enhancing Noise Robustness for Neural Speech Codecs through Resource-Efficient Progressive Quantization Perturbation Simulation | 2509.19025 | arXiv-only | arXiv-only | 编解码 | codec | 高效/轻量 | 音质、鲁棒性、效率 | 待核 |
| Improving Test-Time Performance of RVQ-based Neural Codecs | 2509.19186 | arXiv-only | arXiv-only | 编解码 | codec | 新方法/统一框架 | 音质 | 评测局限 |
| Why Speech Deepfake Detectors Won't Generalize: The Limits of Detection in an Open World | 2509.20405 | arXiv-only | arXiv-only | 编解码 | codec | 高效/轻量 | 速度 | 评测局限、泛化局限 |
| SingVERSE: A Diverse, Real-World Benchmark for Singing Voice Enhancement | 2509.20969 | arXiv-only | arXiv-only | 待核 | enhancement、singing | 待核 | 音质、可懂度 | 评测局限 |
| Query-Based Asymmetric Modeling with Decoupled Input-Output Rates for Speech Restoration | 2509.21003 | arXiv-only | arXiv-only | 待核 | bandwidth、streaming、real- | 高效/轻量 | 音质、实时 | 算力局限 |
| Hybrid Real- And Complex-Valued Neural Network Concept For Low-Complexity Phase-Aware Speech Enhancement | 2509.21185 | arXiv-only | arXiv-only | 待核 | enhancement | 高效/轻量 | 音质、可懂度、效率 | 待核 |
| FastEnhancer: Speed-Optimized Streaming Neural Speech Enhancement | 2509.21867 | arXiv-only | arXiv-only | 待核 | enhancement、streaming、rea | 高效/轻量 | 音质、可懂度、实时 | 算力局限、评测局限 |
| LORT: Locally Refined Convolution and Taylor Transformer for Monaural Speech Enhancement | 2509.23832 | arXiv-only | arXiv-only | Transformer | enhancement | 统一/联合建模 | 鲁棒性、效率 | 算力局限 |
| Assessing speech quality metrics for evaluation of neural audio codecs under clean speech conditions | 2509.24457 | arXiv-only | arXiv-only | 编解码 | codec | 待核 | 音质 | 评测局限 |
| SenSE: Semantic-Aware High-Fidelity Universal Speech Enhancement | 2509.24708 | arXiv-only | arXiv-only | 流匹配、LLM | enhancement | 新方法/统一框架 | 音质 | 待核 |
| SAGA-SR: Semantically and Acoustically Guided Audio Super-Resolution | 2509.24924 | arXiv-only | arXiv-only | 扩散、流匹配 | super-resolution | 新方法/统一框架 | 鲁棒性 | 评测局限 |
| VoiceBridge: General Speech Restoration with One-step Latent Bridge Models | 2509.25275 | arXiv-only | arXiv-only | Transformer、蒸馏 | enhancement、denois、restor | 统一/联合建模 | 音质、效率 | 待核 |
| Dereverberation Using Binary Residual Masking with Time-Domain Consistency | 2510.00356 | arXiv-only | arXiv-only | 待核 | real-time、singing | 统一/联合建模 | 音质、实时 | 算力局限 |
| STSM-FiLM: A FiLM-Conditioned Neural Architecture for Time-Scale Modification of Speech | 2510.02672 | arXiv-only | arXiv-only | GAN、编解码 | codec | 新方法/统一框架 | 相似度 | 泛化局限 |
| Désentrelacement Fréquentiel Doux pour les Codecs Audio Neuronaux | 2510.03741 | arXiv-only | arXiv-only | 编解码 | codec | 新方法/统一框架 | 音质 | 评测局限 |
| Benchmarking Fake Voice Detection in the Fake Voice Generation Arms Race | 2510.06544 | arXiv-only | arXiv-only | 流匹配、编解码 | codec | 统一/联合建模 | 鲁棒性 | 评测局限、泛化局限 |
| Déréverbération non-supervisée de la parole par modèle hybride | 2510.09025 | arXiv-only | arXiv-only | 待核 | 待核 | 待核 | 待核 | 待核 |
| Phase Aware Ear-Conditioned Learning for Multi-Channel Binaural Speaker Separation | 2510.11366 | arXiv-only | arXiv-only | 待核 | separation | 统一/联合建模 | 可懂度 | 待核 |
| Dynamically Slimmable Speech Enhancement Network with Metric-Guided Training | 2510.11395 | arXiv-only | arXiv-only | 待核 | enhancement | 高效/轻量 | 音质 | 算力局限、评测局限 |
| FakeMark: Deepfake Speech Attribution With Watermarked Artifacts | 2510.12042 | arXiv-only | arXiv-only | 编解码 | codec | 新方法/统一框架 | 待核 | 泛化局限 |
| LDCodec: A high quality neural audio codec with low-complexity decoder | 2510.15364 | arXiv-only | arXiv-only | 编解码 | streaming、codec | 新方法/统一框架 | 音质 | 待核 |
| Audio-Visual Speech Enhancement for Spatial Audio - Spatial-VisualVoice and the MAVE Database | 2510.16437 | arXiv-only | arXiv-only | 待核 | enhancement | 新方法/统一框架 | 可懂度 | 待核 |
| Adaptive Deterministic Flow Matching for Target Speaker Extraction | 2510.16995 | arXiv-only | arXiv-only | 扩散、流匹配 | enhancement、target speech | 高效/轻量 | 效率 | 待核 |
| Towards Real-Time Generative Speech Restoration with Flow-Matching | 2510.16997 | arXiv-only | arXiv-only | 流匹配 | enhancement、denois、stream | 高效/轻量 | 音质、鲁棒性、实时 | 评测局限 |
| Diffusion Buffer for Online Generative Speech Enhancement | 2510.18744 | arXiv-only | arXiv-only | 扩散 | enhancement、denois | 新方法/统一框架 | 音质 | 算力局限 |
| Relative Transfer Matrix Estimator using Covariance Subtraction | 2510.19439 | arXiv-only | arXiv-only | 待核 | enhancement、separation | 待核 | 待核 | 评测局限、泛化局限 |
| HyBeam: Hybrid Microphone-Beamforming Array-Agnostic Speech Enhancement for Wearables | 2510.22637 | arXiv-only | arXiv-only | 待核 | enhancement | 新方法/统一框架 | 鲁棒性 | 待核 |
| Treble10: A high-quality dataset for far-field speech recognition, dereverberation, and enhancement | 2510.23141 | arXiv-only | arXiv-only | 待核 | enhancement、separation、so | 新方法/统一框架 | 音质 | 评测局限 |
| Low-Resource Audio Codec (LRAC): 2025 Challenge Description | 2510.23312 | arXiv-only | arXiv-only | 编解码 | enhancement、low-resource、 | 高效/轻量 | 音质、鲁棒性、低延迟 | 低资源、算力局限 |
| Forward Convolutive Prediction for Frame Online Monaural Speech Dereverberation Based on Kronecker Product Decomposition | 2510.24471 | arXiv-only | arXiv-only | 待核 | 待核 | 新方法/统一框架 | 待核 | 算力局限 |
| Online neural fusion of distortionless differential beamformers for robust speech enhancement | 2510.24497 | arXiv-only | arXiv-only | 待核 | enhancement | 新方法/统一框架 | 鲁棒性 | 待核 |
| PitchFlower: A flow-based neural audio codec with pitch controllability | 2510.25566 | arXiv-only | arXiv-only | GAN、编解码 | codec | 待核 | 音质 | 待核 |
| Audio-Visual Speech Enhancement In Complex Scenarios With Separation And Dereverberation Joint Modeling | 2510.26825 | arXiv-only | arXiv-only | 待核 | enhancement、separation | 统一/联合建模 | 音质 | 待核 |
| Reference Microphone Selection for Guided Source Separation based on the Normalized L-p Norm | 2510.27198 | arXiv-only | arXiv-only | 待核 | enhancement、separation、so | 新方法/统一框架 | 音质 | 评测局限 |
| BSCodec: A Band-Split Neural Codec for High-Quality Universal Audio Reconstruction | 2511.06150 | arXiv-only | arXiv-only | 编解码 | codec | 新方法/统一框架 | 音质 | 待核 |
| Interpretable Binaural Deep Beamforming Guided by Time-Varying Relative Transfer Function | 2511.10168 | arXiv-only | arXiv-only | 待核 | enhancement | 新方法/统一框架 | 待核 | 评测局限 |
| Real-Time Speech Enhancement via a Hybrid ViT: A Dual-Input Acoustic-Image Feature Fusion | 2511.11825 | arXiv-only | arXiv-only | Transformer | enhancement、real-time | 高效/轻量 | 音质、可懂度、实时 | 算力局限、评测局限 |
| PASE: Leveraging the Phonological Prior of WavLM for Low-Hallucination Generative Speech Enhancement | 2511.13300 | arXiv-only | arXiv-only | 声码器、LLM、蒸馏 | enhancement、denois、prosod | 新方法/统一框架 | 音质、鲁棒性 | 待核 |
| The Spheres Dataset: Multitrack Orchestral Recordings for Music Source Separation and Information Retrieval | 2511.21247 | arXiv-only | arXiv-only | 待核 | separation、source separat | 待核 | 待核 | 评测局限 |
| Where Does Speech Enhancement Adapt? Probing Study Under Controlled Degradation | 2512.00482 | arXiv-only | arXiv-only | 待核 | enhancement | 新方法/统一框架 | 鲁棒性、相似度 | 待核 |
| A Low-Complexity Speech Codec Using Parametric Dithering for ASR | 2512.00511 | arXiv-only | arXiv-only | 编解码 | codec | 待核 | 音质 | 待核 |
| A Universal Harmonic Discriminator for High-quality GAN-based Vocoder | 2512.03486 | arXiv-only | arXiv-only | GAN、声码器 | bandwidth、singing、vocoder | 新方法/统一框架 | 音质 | 待核 |
| TripleC Learning and Lightweight Speech Enhancement for Multi-Condition Target Speech Extraction | 2512.04945 | arXiv-only | arXiv-only | GAN | enhancement、denois、target | 高效/轻量 | 鲁棒性 | 评测局限、泛化局限 |
| Noise Suppression for Time Difference of Arrival: Performance Evaluation of a Generalized Cross-Correlation Method Using Mean Signal and Inverse Filter | 2512.05355 | arXiv-only | arXiv-only | 待核 | bandwidth | 新方法/统一框架 | 鲁棒性 | 评测局限、泛化局限 |
| Unsupervised Single-Channel Audio Separation with Diffusion Source Priors | 2512.07226 | arXiv-only | arXiv-only | 扩散 | denois、separation | 新方法/统一框架 | 音质 | 泛化局限 |
| When De-noising Hurts: A Systematic Study of Speech Enhancement Effects on Modern Medical ASR Systems | 2512.17562 | arXiv-only | arXiv-only | GAN | enhancement、denois | 待核 | 鲁棒性 | 算力局限、评测局限 |
| GenTSE: Enhancing Target Speaker Extraction via a Coarse-to-Fine Generative Language Model | 2512.20978 | arXiv-only | arXiv-only | 编解码、LLM、自回归 | target speech、codec | 新方法/统一框架 | 音质、可懂度 | 泛化局限 |
| Single Channel Blind Dereverberation of Speech Signals | 2512.23322 | arXiv-only | arXiv-only | 待核 | 待核 | 新方法/统一框架 | 待核 | 待核 |

### 【编创】分离/TSE/多对象 (37)
| MMW: Side Talk Rejection Multi-Microphone Whisper on Smart Glasses | 2507.05609 | arXiv-only | arXiv-only | LLM、Mamba | streaming、diarization | 统一/联合建模 | 效率 | 评测局限 |
| Training Strategies for Modality Dropout Resilient Multi-Modal Target Speaker Extraction | 2507.06566 | arXiv-only | arXiv-only | LLM | 待核 | 新方法/统一框架 | 鲁棒性 | 待核 |
| Audio-Visual Speech Separation via Bottleneck Iterative Network | 2507.07270 | arXiv-only | arXiv-only | 待核 | separation | 高效/轻量 | 待核 | 待核 |
| Enforcing Speech Content Privacy in Environmental Sound Recordings using Segment-wise Waveform Reversal | 2507.08412 | arXiv-only | arXiv-only | 待核 | separation | 新方法/统一框架 | 音质、可懂度、鲁棒性 | 算力局限、评测局限 |
| Enhancing Target Speaker Extraction with Explicit Speaker Consistency Modeling | 2507.09510 | arXiv-only | arXiv-only | 待核 | target speech | 新方法/统一框架 | 待核 | 待核 |
| AVFSNet: Audio-Visual Speech Separation for Flexible Number of Speakers with Multi-Scale and Multi-Task Learning | 2507.12972 | arXiv-only | arXiv-only | 待核 | separation、target speech | 统一/联合建模 | 鲁棒性 | 评测局限、泛化局限 |
| Binaural Target Speaker Extraction using Individualized HRTF | 2507.19369 | arXiv-only | arXiv-only | 待核 | 待核 | 新方法/统一框架 | 音质、鲁棒性 | 评测局限 |
| TF-MLPNet: Tiny Real-Time Neural Speech Separation | 2508.03047 | arXiv-only | arXiv-only | 待核 | separation、target speech、 | 待核 | 实时 | 算力局限 |
| Advances in Speech Separation: Techniques, Challenges, and Future Trends | 2508.10830 | arXiv-only | arXiv-only | Transformer、自监督 | separation、source separ | 新方法/统一框架 | 鲁棒性、可懂度 | 评测局限 |
| Listening for "You": Enhancing Speech Image Retrieval via Target Speaker Extraction | 2509.09306 | arXiv-only | arXiv-only | 自监督、对比学习 | 待核 | 新方法/统一框架 | 待核 | 待核 |
| EEND-SAA: Enrollment-Less Main Speaker Voice Activity Detection Using Self-Attention Attractors | 2509.11957 | arXiv-only | arXiv-only | LLM、Transformer | streaming、real-time | 新方法/统一框架 | 实时 | 待核 |
| Diffusion-Based Unsupervised Audio-Visual Speech Separation in Noisy Environments with Noise Prior | 2509.14379 | arXiv-only | arXiv-only | 扩散 | separation | 新方法/统一框架 | 待核 | 待核 |
| SongPrep: A Preprocessing Framework and End-to-end Model for Full-song Structure Parsing and Lyrics Transcription | 2509.17404 | arXiv-only | arXiv-only | LLM | separation、source separat | 新方法/统一框架 | 待核 | 待核 |
| GAN-Based Multi-Microphone Spatial Target Speaker Extraction | 2509.17741 | arXiv-only | arXiv-only | GAN | 待核 | 待核 | 音质 | 待核 |
| Automated Analysis of Naturalistic Recordings in Early Childhood: Applications, Challenges, and Opportunities | 2509.18235 | arXiv-only | arXiv-only | 待核 | diarization | 待核 | 待核 | 待核 |
| Emotional Styles Hide in Deep Speaker Embeddings: Disentangle Deep Speaker Embeddings for Speaker Clustering | 2509.23358 | arXiv-only | arXiv-only | 待核 | emotion、diarization | 新方法/统一框架 | 鲁棒性 | 待核 |
| Neural Forward Filtering for Speaker-Image Separation | 2510.05757 | arXiv-only | arXiv-only | 待核 | separation | 统一/联合建模 | 待核 | 评测局限 |
| VM-UNSSOR: Unsupervised Neural Speech Separation Enhanced by Higher-SNR Virtual Microphone Arrays | 2510.08914 | arXiv-only | arXiv-only | 待核 | separation、target speech | 新方法/统一框架 | 待核 | 算力局限 |
| MC-LExt: Multi-Channel Target Speaker Extraction with Onset-Prompted Speaker Conditioning Mechanism | 2510.15437 | arXiv-only | arXiv-only | LLM | 待核 | 统一/联合建模 | 待核 | 待核 |
| ReFESS-QI: Reference-Free Evaluation For Speech Separation With Joint Quality And Intelligibility Scoring | 2510.21014 | arXiv-only | arXiv-only | 自监督 | separation、source separat | 统一/联合建模 | 音质、可懂度、鲁棒性 | 评测局限 |
| ELEGANCE: Efficient LLM Guidance for Audio-Visual Target Speech Extraction | 2511.06288 | arXiv-only | arXiv-only | GAN、LLM | target speech | 高效/轻量 | 效率 | 待核 |
| On the Use of Self-Supervised Representation Learning for Speaker Diarization and Separation | 2512.15224 | arXiv-only | arXiv-only | 自监督 | separation、low-resource、d | 待核 | 音质 | 低资源、评测局限 |
| MeanFlow-TSE: One-Step Generative Target Speaker Extraction with Mean Flow | 2512.18572 | arXiv-only | arXiv-only | 扩散、流匹配 | separation、real-time | 高效/轻量 | 音质、实时、效率 | 待核 |
| Spectral or spatial? Leveraging both for speaker extraction in challenging data conditions | 2512.20165 | arXiv-only | arXiv-only | LLM | 待核 | 待核 | 鲁棒性 | 评测局限 |
| Call2Instruct: Automated Pipeline for Generating Q&amp;A Datasets from Call Center Recordings for LLM Fine-Tuning | 2601.14263 | arXiv-only | arXiv-only | GAN、LLM | diarization | 待核 | 音质 | 待核 |

### 【编创】情感/韵律 (56)
| Multi-agent Auditory Scene Analysis | 2507.02755 | arXiv-only | arXiv-only | 待核 | separation、emotion、agent | 待核 | 音质、鲁棒性 | 算力局限 |
| LAPS-Diff: A Diffusion-Based Framework for Singing Voice Synthesis With Language Aware Prosody-Style Guided Learning | 2507.04966 | arXiv-only | arXiv-only | 扩散、LLM | prosod、low-resource、singi | 新方法/统一框架 | 自然度、音质、表现力 | 低资源、算力局限 |
| STARS: A Unified Framework for Singing Transcription, Alignment, and Refined Style Annotation | 2507.06670 | arXiv-only | arXiv-only | 自回归 | emotion、singing | 统一/联合建模 | 自然度、音质、鲁棒性 | 评测局限 |
| DiffRhythm+: Controllable and Flexible Full-Length Song Generation with Preference Optimization | 2507.12890 | arXiv-only | arXiv-only | 扩散 | 待核 | 新方法/统一框架 | 自然度、音质、可控 | 评测局限 |
| Non-Verbal Vocalisations and their Challenges: Emotion, Privacy, Sparseness, and Real Life | 2508.01960 | arXiv-only | arXiv-only | 待核 | emotion | 待核 | 待核 | 待核 |
| Transient Noise Removal via Diffusion-based Speech Inpainting | 2508.08890 | arXiv-only | arXiv-only | 扩散 | prosod | 待核 | 鲁棒性 | 待核 |
| Enhancing In-the-Wild Speech Emotion Conversion with Resynthesis-based Duration Modeling | 2508.11535 | arXiv-only | arXiv-only | 待核 | emotion | 高效/轻量 | 可控、表现力、速度 | 待核 |
| The Sound of Risk: A Multimodal Physics-Informed Acoustic Model for Forecasting Market Volatility and Enhancing Market Interpretability | 2508.18653 | arXiv-only | arXiv-only | 待核 | emotion | 新方法/统一框架 | 鲁棒性 | 待核 |
| Toward a Realistic Encoding Model of Auditory Affective Understanding in the Brain | 2509.21381 | arXiv-only | arXiv-only | LoRA | emotion | 待核 | 待核 | 算力局限 |
| HuLA: Prosody-Aware Anti-Spoofing with Multi-Task Learning for Expressive and Emotional Synthetic Speech | 2509.21676 | arXiv-only | arXiv-only | 自监督 | prosod、emotion | 统一/联合建模 | 鲁棒性、表现力 | 待核 |
| Speak Your Mind: The Speech Continuation Task as a Probe of Voice-Based Model Bias | 2509.22061 | arXiv-only | arXiv-only | 待核 | 待核 | 待核 | 音质、相似度、表现力 | 评测局限 |
| Ovi: Twin Backbone Cross-Modal Fusion for Audio-Video Generation | 2510.01284 | arXiv-only | arXiv-only | 待核 | emotion | 统一/联合建模 | 待核 | 待核 |
| Dynamic Stress Detection: A Study of Temporal Progression Modelling of Stress in Speech | 2510.08586 | arXiv-only | arXiv-only | Transformer | emotion | 新方法/统一框架 | 待核 | 待核 |
| DiTSinger: Scaling Singing Voice Synthesis with Diffusion Transformer and Implicit Alignment | 2510.09016 | arXiv-only | arXiv-only | 扩散、LLM、Transformer | singing | 新方法/统一框架 | 音质、鲁棒性、表现力 | 待核 |
| Speech-DRAME: A Framework for Human-Aligned Benchmarks in Speech Role-Play | 2511.01261 | arXiv-only | arXiv-only | LLM | prosod、emotion | 统一/联合建模 | 音质 | 评测局限 |
| Towards General Auditory Intelligence: Large Multimodal Models for Machine Listening and Speaking | 2511.01299 | arXiv-only | arXiv-only | LLM | emotion | 待核 | 表现力 | 算力局限 |
| Towards Attribution of Generators and Emotional Manipulation in Cross-Lingual Synthetic Speech using Geometric Learning | 2511.10790 | arXiv-only | arXiv-only | 待核 | prosod、emotion | 新方法/统一框架 | 待核 | 待核 |
| Head, posture, and full-body gestures in unscripted dyadic conversations in noise | 2512.03636 | arXiv-only | arXiv-only | 待核 | prosod | 待核 | 音质 | 待核 |
| Human perception of audio deepfakes: the role of language and speaking style | 2512.09221 | arXiv-only | arXiv-only | GAN | prosod | 待核 | 自然度 | 待核 |

### 【编创】口音/方言 (6)
| Quantum-Inspired Audio Unlearning: Towards Privacy-Preserving Voice Biometrics | 2507.22208 | arXiv-only | arXiv-only | 待核 | accent | 高效/轻量 | 鲁棒性、效率 | 评测局限 |
| Cross-Dialect Bird Species Recognition with Dialect-Calibrated Augmentation | 2509.22317 | arXiv-only | arXiv-only | GAN | dialect | 高效/轻量 | 鲁棒性 | 待核 |

### 【非编创】匿名化/隐私/anti-spoofing/deepfake (25)
| Phoneme-Level Analysis for Person-of-Interest Speech Deepfake Detection | 2507.08626 | arXiv-only | arXiv-only | — | 匿名化/隐私/anti-spoofing/deepfake | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Less Stress, More Privacy: Stress Detection on Anonymized Speech of Air Traffic Controllers | 2507.08882 | arXiv-only | arXiv-only | — | 匿名化/隐私/anti-spoofing/deepfake | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SHIELD: A Secure and Highly Enhanced Integrated Learning for Robust Deepfake Detection against Adversarial Attacks | 2507.13170 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| LENS-DF: Deepfake Detection and Temporal Localization for Long-Form Noisy Speech | 2507.16220 | arXiv-only | arXiv-only | 自监督学习 | 嘈杂环境 | 可控、自监督 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speaker Disentanglement of Speech Pre-trained Model Based on Interpretability | 2507.17851 | arXiv-only | arXiv-only | 自监督学习 | 匿名化/隐私/anti-spoofing/deepfake | 解耦、自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Localizing Audio-Visual Deepfakes via Hierarchical Boundary Modeling | 2508.02000 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Use Cases for Voice Anonymization | 2508.06356 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Pindrop it! Audio and Visual Deepfake Countermeasures for Robust Detection and Fine Grained-Localization | 2508.08141 | arXiv-only | arXiv-only | — | 匿名化/隐私/anti-spoofing/deepfake | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Rapidly Adapting to New Voice Spoofing: Few-Shot Detection of Synthesized Speech Under Distribution Shifts | 2508.13320 | arXiv-only | arXiv-only | 零样本、少样本 | 通话/呼叫中心 | 零样本泛型 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Hybrid Pruning: In-Situ Compression of Self-Supervised Speech Models for Speaker Verification and Anti-Spoofing | 2508.16232 | arXiv-only | arXiv-only | 自监督学习、微调、知识蒸馏 | 通话/呼叫中心、低资源、边缘设备 | 统一模型、单阶段、自监督、低资源 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Pinhole Effect on Linkability and Dispersion in Speaker Anonymization | 2508.17134 | arXiv-only | arXiv-only | — | 匿名化/隐私/anti-spoofing/deepfake | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speech DF Arena: A Leaderboard for Speech DeepFake Detection Models | 2509.02859 | arXiv-only | arXiv-only | — | 匿名化/隐私/anti-spoofing/deepfake | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Audio Deepfake Verification | 2509.08476 | arXiv-only | arXiv-only | — | 匿名化/隐私/anti-spoofing/deepfake | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Investigating the Potential of Multi-Stage Score Fusion in Spoofing-Aware Speaker Verification | 2509.12668 | arXiv-only | arXiv-only | 分类器 | 匿名化/隐私/anti-spoofing/deepfake | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Mixture of Low-Rank Adapter Experts in Generalizable Audio Deepfake Detection | 2509.13878 | arXiv-only | arXiv-only | 适配器、LoRA、微调 | 匿名化/隐私/anti-spoofing/deepfake | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Discrete optimal transport is a strong audio adversarial attack | 2509.14959 | arXiv-only | arXiv-only | 微调 | 匿名化/隐私/anti-spoofing/deepfake | — | 说话人相似度 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| FakeSound2: A Benchmark for Explainable and Generalizable Deepfake Sound Detection | 2509.17162 | arXiv-only | arXiv-only | — | 匿名化/隐私/anti-spoofing/deepfake | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| XMUspeech Systems for the ASVspoof 5 Challenge | 2509.18102 | arXiv-only | arXiv-only | Transformer、Conformer、自监督学习 | 通话/呼叫中心 | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| AUDDT: A Unified Benchmark Toolkit for Audio and Speech Deepfake Detectors | 2509.21597 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Descriptor:: Extended-Length Audio Dataset for Synthetic Voice Detection and Speaker Recognition (ELAD-SVDSR) | 2510.00218 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | 鲁棒性、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Physics-Guided Deepfake Detection for Voice Authentication Systems | 2512.06040 | arXiv-only | arXiv-only | 自监督学习 | 边缘设备 | 自监督 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Technical Report of Nomi Team in the Environmental Sound Deepfake Detection Challenge 2026 | 2512.06041 | arXiv-only | arXiv-only | 注意力 | 低资源 | 低资源 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| BUT Systems for Environmental Sound Deepfake Detection in the ESDD 2026 Challenge | 2512.08319 | arXiv-only | arXiv-only | 自监督学习、注意力 | 通话/呼叫中心 | 轻量、自监督 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| BUT Systems for WildSpoof Challenge: SASV in the Wild | 2512.12851 | arXiv-only | arXiv-only | 自监督学习、注意力 | 匿名化/隐私/anti-spoofing/deepfake | 轻量、自监督 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EnvSSLAM-FFN: Lightweight Layer-Fused System for ESDD 2026 Challenge | 2512.20369 | arXiv-only | arXiv-only | 自监督学习 | 低资源 | 轻量、自监督、低资源 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】说话人识别/验证 (14)
| The Risks and Detection of Overestimated Privacy Protection in Voice Anonymisation | 2507.22534 | arXiv-only | arXiv-only | — | 说话人识别/验证 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Detecting COPD Through Speech Analysis: A Dataset of Danish Speech and Machine Learning Approach | 2508.02354 | arXiv-only | arXiv-only | — | 说话人识别/验证 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| PadAug: Robust Speaker Verification with Simple Waveform-Level Silence Padding | 2508.14732 | arXiv-only | arXiv-only | — | 说话人识别/验证 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Cochleagram-based Noise Adapted Speaker Identification System for Distorted Speech | 2508.21347 | arXiv-only | arXiv-only | — | 通话/呼叫中心、嘈杂环境 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Evaluating the Effectiveness of Transformer Layers in Wav2Vec 2.0, XLS-R, and Whisper for Speaker Identification Tasks | 2509.00230 | arXiv-only | arXiv-only | Transformer、微调、聚类 | 说话人识别/验证 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Over-the-Air Adversarial Attack Detection: from Datasets to Defenses | 2509.09296 | arXiv-only | arXiv-only | 对比学习 | 说话人识别/验证 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Effective Modeling of Critical Contextual Information for TDNN-based Speaker Verification | 2509.09932 | arXiv-only | arXiv-only | — | 说话人识别/验证 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Can Audio Large Language Models Verify Speaker Identity? | 2509.19755 | arXiv-only | arXiv-only | 语言模型、大语言模型、零样本 | 说话人识别/验证 | 零样本泛型、统一模型、轻量 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Text-Independent Speaker Identification Using Audio Looping With Margin Based Loss Functions | 2509.22838 | arXiv-only | arXiv-only | — | 说话人识别/验证 | 个性化 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| CL-UZH submission to the NIST SRE 2024 Speaker Recognition Evaluation | 2510.00952 | arXiv-only | arXiv-only | — | 说话人识别/验证 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Enhancing Speaker Verification with w2v-BERT 2.0 and Knowledge Distillation guided Structured Pruning | 2510.04213 | arXiv-only | arXiv-only | 自监督学习、适配器、LoRA | 边缘设备 | 自监督、高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Magnitude and Phase-based Feature Fusion Using Co-attention Mechanism for Speaker recognition | 2510.15659 | arXiv-only | arXiv-only | 注意力 | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Interpreting the Dimensions of Speaker Embedding Space | 2510.16489 | arXiv-only | arXiv-only | — | 说话人识别/验证 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Learning Speech Representations with Variational Predictive Coding | 2601.00100 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】歌声 (1)
| PerformSinger: Multimodal Singing Voice Synthesis Leveraging Synchronized Lip Cues from Singing Performance Videos | 2509.22718 | arXiv-only | arXiv-only | 适配器 | 歌声 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【编创】语音多模态 (1)

### 【非编创】paralinguistic/病理 (9)
| Perceptual Ratings Predict Speech Inversion Articulatory Kinematics in Childhood Speech Sound Disorders | 2507.01888 | arXiv-only | arXiv-only | — | 儿童语音、临床 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Concept-based approach to Voice Disorder Detection | 2507.17799 | arXiv-only | arXiv-only | — | 通话/呼叫中心、临床 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Face2VoiceSync: Lightweight Face-Voice Consistency for Text-Driven Talking Face Generation | 2507.19225 | arXiv-only | arXiv-only | VAE | paralinguistic/病理 | 轻量、高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| GeHirNet: A Gender-Aware Hierarchical Model for Voice Pathology Classification | 2508.01172 | arXiv-only | arXiv-only | 分类器 | paralinguistic/病理 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Voice Pathology Detection Using Phonation | 2508.07587 | arXiv-only | arXiv-only | 注意力 | paralinguistic/病理 | 高效 | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Enhancing Speaker-Independent Dysarthric Speech Severity Classification with DSSCNet and Cross-Corpus Adaptation | 2509.13442 | arXiv-only | arXiv-only | 微调 | 临床 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SLAP: Learning Speaker and Health-Related Representations from Natural Language Supervision | 2510.01860 | arXiv-only | arXiv-only | Transformer、对比学习、零样本 | 临床 | 零样本泛型 | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Auden-Voice: General-Purpose Voice Encoder for Speech and Language Understanding | 2511.15145 | arXiv-only | arXiv-only | 对比学习、语言模型、大语言模型 | paralinguistic/病理 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Zero-Shot Recognition of Dysarthric Speech Using Commercial Automatic Speech Recognition and Multimodal Large Language Models | 2512.17474 | arXiv-only | arXiv-only | 语言模型、大语言模型、提示驱动 | 通话/呼叫中心 | 零样本泛型 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |

### 【非编创】其他/边界(语音相邻) (94)
| RECA-PD: A Robust Explainable Cross-Attention Method for Speech-based Parkinson's Disease Classification | 2507.03594 | arXiv-only | arXiv-only | 自监督学习、注意力 | 通话/呼叫中心、临床 | 自监督 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| WSCoach: Wearable Real-time Auditory Feedback for Reducing Unwanted Words in Daily Communication | 2507.04238 | arXiv-only | arXiv-only | LoRA | 通话/呼叫中心、实时 | 实时 | 实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The Overview of Segmental Durations Modification Algorithms on Speech Signal Characteristics | 2507.04264 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| StreamUni: Achieving Streaming Speech Translation with a Unified Large Speech-Language Model | 2507.07803 | arXiv-only | arXiv-only | 语言模型 | 通话/呼叫中心、低延迟、流式 | 流式、低延迟、统一模型、跨语言 | 低延迟、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Input Conditioned Layer Dropping in Speech Foundation Models | 2507.07954 | arXiv-only | arXiv-only | — | 边缘设备 | 轻量 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| SpeakerVid-5M: A Large-Scale High-Quality Dataset for Audio-Visual Dyadic Interactive Human Generation | 2507.09862 | arXiv-only | arXiv-only | 微调 | 对话 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Natural Language-based Assessment of L2 Oral Proficiency using LLMs | 2507.10200 | arXiv-only | arXiv-only | 语言模型、大语言模型、指令微调 | 通话/呼叫中心 | 零样本泛型 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Enhancing In-Domain and Out-Domain EmoFake Detection via Cooperative Multilingual Speech Foundation Models | 2507.12595 | arXiv-only | arXiv-only | — | 多语言 | 跨语言 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Sample-Constrained Black Box Optimization for Audio Personalization | 2507.12773 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | 个性化 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Feature-based analysis of oral narratives from Afrikaans and isiXhosa children | 2507.13164 | arXiv-only | arXiv-only | — | 通话/呼叫中心、多语言、儿童语音 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Voxtral | 2507.13264 | arXiv-only | arXiv-only | — | 通话/呼叫中心、边缘设备 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Parameter-Efficient Fine-Tuning of Foundation Models for CLP Speech Classification | 2507.14898 | arXiv-only | arXiv-only | 自监督学习、适配器、LoRA | 其他/边界(语音相邻) | 自监督、高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| An Investigation of Test-time Adaptation for Audio Classification under Background Noise | 2507.15523 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Interpretable Embeddings of Speech Enhance and Explain Brain Encoding Performance of Audio Models | 2507.16080 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | 高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Does Language Matter for Early Detection of Parkinson's Disease from Speech? | 2507.16832 | arXiv-only | arXiv-only | 自监督学习 | 多语言 | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Bob's Confetti: Phonetic Memorization Attacks in Music and Video Generation | 2507.17937 | arXiv-only | arXiv-only | 提示驱动 | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Tiny is not small enough: High-quality, low-resource facial animation models through hybrid knowledge distillation | 2507.18352 | arXiv-only | arXiv-only | 注意力、知识蒸馏、知识蒸馏 | 低资源、边缘设备、实时 | 实时 | 鲁棒性、实时响应、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| DIFFA: Large Language Diffusion Models Can Listen and Understand | 2507.18452 | arXiv-only | arXiv-only | 扩散模型、语言模型、大语言模型 | 通话/呼叫中心 | 轻量、扩散生成、高效 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Assessment of Personality Dimensions Across Situations in Dyadic Role-Play Scenarios | 2507.19137 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Data Augmentation for Spoken Grammatical Error Correction | 2507.19374 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Hierarchical Graph Neural Network for Compressed Speech Steganalysis | 2507.21591 | arXiv-only | arXiv-only | GAN、图神经网络、图神经网络 | 通话/呼叫中心 | 高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| CUHK-EE Systems for the vTAD Challenge at NCMMSC 2025 | 2507.23266 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Real-time Generation of Various Types of Nodding for Avatar Attentive Listening System | 2507.23298 | arXiv-only | arXiv-only | — | 实时、对话 | 实时 | 实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Subband Architecture Aided Selective Fixed-Filter Active Noise Control | 2508.00603 | arXiv-only | arXiv-only | — | 实时、嘈杂环境 | 实时 | 鲁棒性、实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| PESTO: Real-Time Pitch Estimation with Self-supervised Transposition-equivariant Objective | 2508.01488 | arXiv-only | arXiv-only | 自监督学习 | 实时 | 实时、轻量、自监督 | 实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Lumename: Wearable Device for Hearing Impaired with Personalized ML-Based Auditory Detection and Haptic-Visual Alerts | 2508.01576 | arXiv-only | arXiv-only | GAN | 低资源、实时 | 实时、低资源 | 实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| From Contrast to Commonality: Audio Commonality Captioning for Enhanced Audio-Text Cross-modal Understanding in Multimodal LLMs | 2508.01659 | arXiv-only | arXiv-only | 大语言模型 | 其他/边界(语音相邻) | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Hidden in the Noise: Unveiling Backdoors in Audio LLMs Alignment through Latent Acoustic Pattern Triggers | 2508.02175 | arXiv-only | arXiv-only | 语言模型、大语言模型、注意力 | 其他/边界(语音相邻) | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Reference-free Adversarial Sex Obfuscation in Speech | 2508.02295 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | 解耦 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| READ: Real-time and Efficient Asynchronous Diffusion for Audio-driven Talking Head Generation | 2508.03457 | arXiv-only | arXiv-only | 扩散模型、Transformer、VAE | 实时 | 实时、扩散生成、高效 | 鲁棒性、实时响应、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| RAP: Real-time Audio-driven Portrait Animation with Video Diffusion Transformer | 2508.05115 | arXiv-only | arXiv-only | 扩散模型、Transformer、注意力 | 通话/呼叫中心、实时 | 实时、统一模型 | 实时响应、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| How Does a Deep Neural Network Look at Lexical Stress in English Words? | 2508.07229 | arXiv-only | arXiv-only | 提示驱动、分类器 | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Joint decoding method for controllable contextual speech recognition based on Speech LLM | 2508.08585 | arXiv-only | arXiv-only | 大语言模型、提示驱动、注意力 | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Layer-Wise Analysis of Self-Supervised Representations for Age and Gender Classification in Children's Speech | 2508.10332 | arXiv-only | arXiv-only | 自监督学习 | 儿童语音 | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Pretrained Conformers for Audio Fingerprinting and Retrieval | 2508.11609 | arXiv-only | arXiv-only | Conformer、自监督学习、对比学习 | 其他/边界(语音相邻) | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Music and Artificial Intelligence: Artistic Trends | 2508.11694 | arXiv-only | arXiv-only | — | 多语言 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Systematic FAIRness Assessment of Open Voice Biomarker Datasets for Mental Health and Neurodegenerative Diseases | 2508.14089 | arXiv-only | arXiv-only | — | 临床 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Chinese Heart Failure Status Speech Database with Universal and Personalised Classification | 2508.14908 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| CUPE: Contextless Universal Phoneme Encoder for Language-Agnostic Speech Processing | 2508.15316 | arXiv-only | arXiv-only | 自监督学习、零样本 | 通话/呼叫中心 | 零样本泛型、轻量、跨语言、自监督 | 参数精简 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Audio2Face-3D: Audio-driven Realistic Facial Animation For Digital Avatars | 2508.16401 | arXiv-only | arXiv-only | — | 实时 | 实时 | 实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speech Foundation Models Generalize to Time Series Tasks from Wearable Sensor Data | 2509.00221 | arXiv-only | arXiv-only | 自监督学习 | 其他/边界(语音相邻) | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| IS${}^3$ : Generic Impulsive--Stationary Sound Separation in Acoustic Scenes using Deep Filtering | 2509.02622 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | 轻量 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Comparison of End-to-end Speech Assessment Models for the NOCASA 2025 Challenge | 2509.03256 | arXiv-only | arXiv-only | — | 通话/呼叫中心、儿童语音 | 端到端 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| CommonVoice-SpeechRE and RPG-MoGe: Advancing Speech Relation Extraction with a New Dataset and Multi-Order Generative Framework | 2509.08438 | arXiv-only | arXiv-only | 提示驱动 | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Multimodal Deep Learning for ATCO Command Lifecycle Modeling and Workload Prediction | 2509.10522 | arXiv-only | arXiv-only | Transformer | 其他/边界(语音相邻) | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Deploying UDM Series in Real-Life Stuttered Speech Applications: A Clinical Evaluation Framework | 2509.14304 | arXiv-only | arXiv-only | — | 通话/呼叫中心、临床 | 端到端 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Acoustic Simulation Framework for Multi-channel Replay Speech Detection | 2509.14789 | arXiv-only | arXiv-only | 波束形成 | 语音助手 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| BabyHuBERT: Multilingual Self-Supervised Learning for Segmenting Speakers in Child-Centered Long-Form Recordings | 2509.15001 | arXiv-only | arXiv-only | 自监督学习 | 多语言、儿童语音 | 自监督 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Breathing and Semantic Pause Detection and Exertion-Level Classification in Post-Exercise Speech | 2509.15473 | arXiv-only | arXiv-only | LoRA | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| VOX-KRIKRI: Unifying Speech and Language through Continuous Fusion | 2509.15667 | arXiv-only | arXiv-only | 语言模型、大语言模型、注意力 | 低资源、多语言、流式 | 流式、低资源 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Fine-Tuning Large Multimodal Models for Automatic Pronunciation Assessment | 2509.15701 | arXiv-only | arXiv-only | 零样本、微调 | 通话/呼叫中心 | 零样本泛型、高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Harmonic Summation-Based Robust Pitch Estimation in Noisy and Reverberant Environments | 2509.16480 | arXiv-only | arXiv-only | — | 嘈杂环境 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speech-to-See: End-to-End Speech-Driven Open-Set Object Detection | 2509.16670 | arXiv-only | arXiv-only | LoRA、微调 | 通话/呼叫中心 | 端到端、高效 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Advancing Speech Understanding in Speech-Aware Language Models with GRPO | 2509.16990 | arXiv-only | arXiv-only | 语言模型、大语言模型 | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Benchmarking Humans and Machines on Complex Multilingual Speech Understanding Tasks | 2509.17965 | arXiv-only | arXiv-only | 语言模型、大语言模型、注意力 | 多语言 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Training Flow Matching Models with Reliable Labels via Self-Purification | 2509.19091 | arXiv-only | arXiv-only | 流匹配 | 嘈杂环境 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Non-locally averaged pruned reassigned spectrograms: a tool for glottal pulse visualization and analysis | 2509.19686 | arXiv-only | arXiv-only | LoRA、GMM | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Z-Scores: A Metric for Linguistically Assessing Disfluency Removal | 2509.20319 | arXiv-only | arXiv-only | 大语言模型、提示驱动 | 通话/呼叫中心 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Phoenix-VAD: Streaming Semantic Endpoint Detection for Full-Duplex Speech Interaction | 2509.20410 | arXiv-only | arXiv-only | 大语言模型 | 通话/呼叫中心、流式、对话 | 流式 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Towards Paradigm-General Suicide Risk Detection via Speech LLM | 2509.22153 | arXiv-only | arXiv-only | 大语言模型 | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| WavJEPA: Semantic learning unlocks robust audio foundation models for raw waveforms | 2509.23238 | arXiv-only | arXiv-only | 自监督学习 | 通话/呼叫中心、低延迟、嘈杂环境 | 低延迟、自监督 | 鲁棒性、低延迟 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| AudioRole: An Audio Dataset for Character Role-Playing in Large Language Models | 2509.23435 | arXiv-only | arXiv-only | 语言模型、大语言模型 | 通话/呼叫中心、对话 | 个性化 | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Voice Evaluation of Reasoning Ability: Diagnosing the Modality-Induced Performance Gap | 2509.26542 | arXiv-only | arXiv-only | GAN | 低延迟、实时、流式 | 实时、流式、低延迟、端到端 | 低延迟、实时响应 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Chain-of-Thought Reasoning in Streaming Full-Duplex End-to-End Spoken Dialogue Systems | 2510.02066 | arXiv-only | arXiv-only | — | 流式、对话 | 流式、端到端 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| When Voice Matters: Evidence of Gender Disparity in Positional Bias of SpeechLLMs | 2510.02398 | arXiv-only | arXiv-only | 大语言模型、提示驱动 | 通话/呼叫中心、边缘设备 | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Cross-Lingual Multi-Granularity Framework for Interpretable Parkinson's Disease Diagnosis from Speech | 2510.03758 | arXiv-only | arXiv-only | 注意力 | 多语言、临床 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A MATLAB toolbox for Computation of Speech Transmission Index (STI) | 2510.03825 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | 可懂度 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Advancing Automated Spatio-Semantic Analysis in Picture Description Using Language Models | 2510.05128 | arXiv-only | arXiv-only | 语言模型 | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Evaluating Hallucinations in Audio-Visual Multimodal LLMs with Spoken Queries under Diverse Acoustic Conditions | 2510.08581 | arXiv-only | arXiv-only | 大语言模型、提示驱动 | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EGSTalker: Real-Time Audio-Driven Talking Head Generation with Efficient Gaussian Deformation | 2510.08587 | arXiv-only | arXiv-only | 注意力 | 实时 | 实时、高效 | 实时响应、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Hierarchical Self-Supervised Representation Learning for Depression Detection from Speech | 2510.08593 | arXiv-only | arXiv-only | 自监督学习、分类器、注意力 | 通话/呼叫中心、边缘设备、临床 | 自监督 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The Speech-LLM Takes It All: A Truly Fully End-to-End Spoken Dialogue State Tracking Approach | 2510.09424 | arXiv-only | arXiv-only | 大语言模型、注意力 | 通话/呼叫中心、对话 | 端到端 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| An Efficient Neural Network for Modeling Human Auditory Neurograms for Speech | 2510.19354 | arXiv-only | arXiv-only | — | 低延迟 | 低延迟、高效 | 低延迟 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Beyond IVR Touch-Tones: Customer Intent Routing using LLMs | 2510.21715 | arXiv-only | arXiv-only | 语言模型、大语言模型、提示驱动 | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Optimized Loudspeaker Panning for Adaptive Sound-Field Correction and Non-stationary Listening Areas | 2510.23937 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | 高效 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EasyEyes: Online hearing research using speakers calibrated by phones | 2510.25048 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | 高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Disentangling peripheral hearing loss from central and cognitive effects on speech intelligibility in older adults | 2510.25235 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | 可懂度 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| From the perspective of perceptual speech quality: The robustness of frequency bands to noise | 2511.02252 | arXiv-only | arXiv-only | 注意力 | 嘈杂环境 | — | 可懂度、鲁棒性、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| TTA: Transcribe, Translate and Alignment for Cross-lingual Speech Representation | 2511.14410 | arXiv-only | arXiv-only | 语言模型、大语言模型 | 多语言 | 轻量、跨语言 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Generalized Weighted Overlap-Add (WOLA) Filter Bank for Improved Subband System Identification | 2511.15766 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| RosettaSpeech: Zero-Shot Speech-to-Speech Translation without Parallel Speech | 2511.20974 | arXiv-only | arXiv-only | 零样本 | 通话/呼叫中心 | 零样本泛型、端到端 | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Acoustic neural networks: Identifying design principles and exploring physical feasibility | 2511.21313 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | 高效 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Identifiability Conditions for Acoustic Feedback Cancellation with the Two-Channel Adaptive Feedback Canceller Algorithm | 2512.01466 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| HiPPO: Exploring A Novel Hierarchical Pronunciation Assessment Approach for Spoken Languages | 2512.04964 | arXiv-only | arXiv-only | 对比学习、提示驱动 | 边缘设备 | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| KidSpeak: A General Multi-purpose LLM for Kids' Speech Recognition and Screening | 2512.05994 | arXiv-only | arXiv-only | 扩散模型、大语言模型 | 通话/呼叫中心、边缘设备、儿童语音 | 个性化、扩散生成 | 鲁棒性、音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Linguists should learn to love speech-based deep learning models | 2512.14506 | arXiv-only | arXiv-only | 大语言模型 | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Adaptive Multimodal Person Recognition: A Robust Framework for Handling Missing Modalities | 2512.14961 | arXiv-only | arXiv-only | 注意力 | 通话/呼叫中心 | 统一模型 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Poster: Recognizing Hidden-in-the-Ear Private Key for Reliable Silent Speech Interface Using Multi-Task Learning | 2512.16518 | arXiv-only | arXiv-only | 对比学习 | 其他/边界(语音相邻) | — | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Pseudo-Cepstrum: Pitch Modification for Mel-Based Neural Vocoders | 2512.16519 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Review of MEMS Speakers for Audio Applications | 2512.17708 | arXiv-only | arXiv-only | — | 其他/边界(语音相邻) | — | 音质 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| MauBERT: Universal Phonetic Inductive Biases for Few-Shot Acoustic Units Discovery | 2512.19612 | arXiv-only | arXiv-only | 自监督学习、少样本、微调 | 多语言 | 跨语言、自监督 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| LP-CFM: Perceptual Invariance-Aware Conditional Flow Matching for Speech Modeling | 2512.20314 | arXiv-only | arXiv-only | 流匹配 | 低资源 | 低资源 | 鲁棒性 | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| USE: A Unified Model for Universal Sound Separation and Extraction | 2512.21215 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | 统一模型 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speak the Art: A Direct Speech to Image Generation Framework | 2601.00827 | arXiv-only | arXiv-only | 扩散模型、GAN | 通话/呼叫中心、多语言 | 扩散生成 | — | 见原文; 多为数据/算力/特定语种/评测指标局限 |


### 【非编创】剔除自编创（二次精读判定为非编创漏入）

| 论文 Title | arXiv ID | comment归属venue | 状态 | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|---|---|
| Triple X: A LLM-Based Multilingual Speech Recognition System for the INTERSPEECH2025 MLC-SLM Challenge | 2507.17288 | Interspeech-2025 | 补漏 | 语言模型、大语言模型、适配器 | 多语言 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The TEA-ASLP System for Multilingual Conversational Speech Recognition and Speech Diarization in MLC-SLM 2025 Challenge | 2507.18051 | Interspeech-2025 | 补漏 | 语言模型、大语言模型、提示驱动 | 多语言 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Code-switching Speech Recognition Under the Lens: Model- and Data-Centric Perspectives | 2509.24310 | TASLP-2025 | 补漏 | 语言模型、大语言模型、提示驱动 | 通话/呼叫中心、语码切换 | — | 音质 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Word Error Rate Definitions and Algorithms for Long-Form Multi-talker Speech Recognition | 2508.02112 | TASLP-2025 | 补漏 | — | 通话/呼叫中心 | 统一模型 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Unifying Listener Scoring Scales: Comparison Learning Framework for Speech Quality Assessment and Continuous Speech Emotion Recognition | 2507.13626 | Interspeech-2025 | 补漏 | — | 情感/韵律 | 统一模型 | 鲁棒性、音质、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| DRKF: Decoupled Representations with Knowledge Fusion for Multimodal Emotion Recognition | 2508.01644 | ACMMM-2025 | 补漏 | 对比学习、注意力 | 边缘设备 | 轻量 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EMO-RL: Emotion-Rule-Based Reinforcement Learning Enhanced Audio-Language Model for Generalized Speech Emotion Recognition | 2509.15654 | EMNLP-2025 | 补漏 | 语言模型、强化学习 | 情感/韵律 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EmoHeal: An End-to-End System for Personalized Therapeutic Music Retrieval from Fine-grained Emotions | 2509.15986 | ICASSP-2026 | 补漏 | 微调 | 边缘设备 | 端到端、个性化 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Towards Accurate Phonetic Error Detection Through Phoneme Similarity Modeling | 2507.14346 | Interspeech-2025 | 补漏 | — | 口音/方言 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Incorporating Contextual Paralinguistic Understanding in Large Speech-Language Models | 2508.07273 | ASRU-2025 | 未覆盖venue | 语言模型、大语言模型 | 通话/呼叫中心 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Evaluating Self-Supervised Speech Models via Text-Based LLMS | 2510.04463 | ASRU-2025 | 未覆盖venue | 自监督学习、语言模型、大语言模型 | TTS/语音生成/speech-LM/agent | 自监督 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Can We Really Repurpose Multi-Speaker ASR Corpus for Speaker Diarization? | 2507.09226 | ASRU-2025 | 未覆盖venue | — | 流式 | 流式 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Unifying Diarization, Separation, and ASR with Multi-Speaker Encoder | 2508.20474 | ASRU-2025 | 未覆盖venue | — | 分离/TSE/多对象 | 统一模型 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EmoTale: An Enacted Speech-emotion Dataset in Danish | 2508.14548 | ASRU-2025 | 未覆盖venue | 自监督学习 | 通话/呼叫中心、边缘设备 | 自监督 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Rethinking Cross-Corpus Speech Emotion Recognition Benchmarking: Are Paralinguistic Pre-Trained Representations Sufficient? | 2509.16182 | APSIPA-2025 | 未覆盖venue | — | 多语言 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Are Multimodal Foundation Models All That Is Needed for Emofake Detection? | 2509.16193 | APSIPA-2025 | 未覆盖venue | 注意力 | 情感/韵律 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Investigating Polyglot Speech Foundation Models for Learning Collective Emotion from Crowds | 2509.16329 | APSIPA-2025 | 未覆盖venue | — | 多语言、嘈杂环境 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Multi-Loss Learning for Speech Emotion Recognition with Energy-Adaptive Mixup and Frame-Level Attention | 2512.04551 | Interspeech-2026 | 未覆盖venue | 对比学习、注意力 | 情感/韵律 | — | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ContextASR-Bench: A Massive Contextual Speech Recognition Benchmark | 2507.05727 | arXiv-only | arXiv-only | 语言模型、大语言模型 | 边缘设备 | 统一模型 | 鲁棒性 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The Eloquence team submission for task 1 of MLC-SLM challenge | 2507.19308 | arXiv-only | arXiv-only | 对比学习、语言模型 | 多语言、对话 | — | 鲁棒性 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ProsodyLM: Uncovering the Emerging Prosody Processing Capabilities in Speech Language Models | 2507.20091 | arXiv-only | arXiv-only | 对比学习、语言模型、大语言模型 | TTS/语音生成/speech-LM/agent | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Adaptive Duration Model for Text Speech Alignment | 2507.22612 | arXiv-only | arXiv-only | 提示驱动、零样本、注意力 | 通话/呼叫中心 | 零样本泛型 | 鲁棒性 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Identifying Hearing Difficulty Moments in Conversational Audio | 2507.23590 | arXiv-only | arXiv-only | 语言模型、微调 | TTS/语音生成/speech-LM/agent | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speech Language Models for Under-Represented Languages: Insights from Wolof | 2509.15362 | arXiv-only | arXiv-only | 语言模型、大语言模型 | TTS/语音生成/speech-LM/agent | — | 音质 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The Universal Personalizer: Few-Shot Dysarthric Speech Recognition via Meta-Learning | 2509.15516 | arXiv-only | arXiv-only | 大语言模型、零样本、少样本 | 低资源 | 零样本泛型、个性化、低资源 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Reasoning Beyond Majority Vote: An Explainable SpeechLM Framework for Speech Emotion Recognition | 2509.24187 | arXiv-only | arXiv-only | 语言模型、大语言模型、零样本 | 播客、通话/呼叫中心 | 零样本泛型 | 音质、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| WEE-Therapy: A Mixture of Weak Encoders Framework for Psychological Counseling Dialogue Analysis | 2510.02320 | arXiv-only | arXiv-only | 语言模型、大语言模型 | 边缘设备、临床、对话 | 轻量 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Sci-Phi: A Large Language Model Spatial Audio Descriptor | 2510.05542 | arXiv-only | arXiv-only | 语言模型、大语言模型 | 通话/呼叫中心 | — | 鲁棒性 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Seeing What You Say: Expressive Image Generation from Speech | 2511.03423 | arXiv-only | arXiv-only | — | TTS/语音生成/speech-LM/agent | 统一模型、端到端 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Music Flamingo: Scaling Music Understanding in Audio Language Models | 2511.10289 | arXiv-only | arXiv-only | 语言模型、强化学习、微调 | 通话/呼叫中心 | — | 音质 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Towards Audio Token Compression in Large Audio Language Models | 2511.20973 | arXiv-only | arXiv-only | 语言模型、大语言模型、适配器 | 边缘设备 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Fun-Audio-Chat Technical Report | 2512.20156 | arXiv-only | arXiv-only | 语言模型、大语言模型、指令微调 | 通话/呼叫中心、边缘设备 | 高效 | 鲁棒性、音质 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| AzeroS: Extending LLM to Speech with Self-Generated Instruction-Free Tuning | 2601.06086 | arXiv-only | arXiv-only | 语言模型、大语言模型、指令微调 | 通话/呼叫中心 | 轻量 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Study of the Removability of Speaker-Adversarial Perturbations | 2510.09504 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The DKU System for Multi-Speaker Automatic Speech Recognition in MLC-SLM Challenge | 2507.09499 | arXiv-only | arXiv-only | 语言模型、大语言模型、适配器 | 多语言 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ASR-Synchronized Speaker-Role Diarization | 2507.17765 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | 端到端 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Enhancing Speech Emotion Recognition Leveraging Aligning Timestamps of ASR Transcripts and Speaker Diarization | 2507.19356 | arXiv-only | arXiv-only | 注意力 | 通话/呼叫中心 | — | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| MOVER: Combining Multiple Meeting Recognition Systems | 2508.05055 | arXiv-only | arXiv-only | — | 会议 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Error Analysis in a Modular Meeting Transcription System | 2509.10143 | arXiv-only | arXiv-only | — | 会议 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| From Who Said What to Who They Are: Modular Training-free Identity-Aware LLM Refinement of Speaker Diarization | 2509.15082 | arXiv-only | arXiv-only | 语言模型、大语言模型、提示驱动 | 分离/TSE/多对象 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Scaling Multi-Talker ASR with Speaker-Agnostic Activity Streams | 2510.03630 | arXiv-only | arXiv-only | — | 会议 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Adapting Diarization-Conditioned Whisper for End-to-End Multi-Talker Speech Recognition | 2510.03723 | arXiv-only | arXiv-only | — | 分离/TSE/多对象 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| LibriConvo: Simulating Conversations from Read Literature for ASR and Diarization | 2510.23320 | arXiv-only | arXiv-only | Conformer、零样本、微调 | 通话/呼叫中心、对话 | 零样本泛型 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Toward Conversational Hungarian Speech Recognition: Introducing the BEA-Large and BEA-Dialogue Datasets | 2511.13529 | arXiv-only | arXiv-only | Conformer、微调 | 对话 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Emotion Recognition in Multi-Speaker Conversations through Speaker Identification, Knowledge Distillation, and Hierarchical Fusion | 2511.13731 | arXiv-only | arXiv-only | 注意力、知识蒸馏、知识蒸馏 | 边缘设备 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Train Short, Infer Long: Speech-LLM Enables Zero-Shot Streamable Joint ASR and Diarization on Long Audio | 2511.16046 | arXiv-only | arXiv-only | 语言模型、大语言模型、提示驱动 | 会议、边缘设备、流式 | 零样本泛型、流式、端到端 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Toward Efficient Speech Emotion Recognition via Spectral Learning and Attention | 2507.03251 | arXiv-only | arXiv-only | 注意力 | 边缘设备 | 高效 | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| CLEP-DG: Contrastive Learning for Speech Emotion Domain Generalization via Soft Prompt Tuning | 2507.04048 | arXiv-only | arXiv-only | 对比学习、提示驱动、微调 | 情感/韵律 | — | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Novel Hybrid Deep Learning Technique for Speech Emotion Detection using Feature Engineering | 2507.07046 | arXiv-only | arXiv-only | — | 边缘设备 | — | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| End-to-end Acoustic-linguistic Emotion and Intent Recognition Enhanced by Semi-supervised Learning | 2507.07806 | arXiv-only | arXiv-only | — | 流式 | 流式、端到端 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| THAI Speech Emotion Recognition (THAI-SER) corpus | 2507.09618 | arXiv-only | arXiv-only | — | 情感/韵律 | — | 音质、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Step-Audio 2 Technical Report | 2507.16632 | arXiv-only | arXiv-only | 语言模型、强化学习 | 通话/呼叫中心、边缘设备 | 端到端 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Charting 15 years of progress in deep learning for speech emotion recognition: A replication study | 2508.02448 | arXiv-only | arXiv-only | Transformer | 情感/韵律 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Are Inherently Interpretable Models More Robust? A Study In Music Emotion Recognition | 2508.03780 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Towards interpretable emotion recognition: Identifying key features with machine learning | 2508.04230 | arXiv-only | arXiv-only | — | 情感/韵律 | — | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Emotion Detection Using Conditional Generative Adversarial Networks (cGAN): A Deep Learning Approach | 2508.04481 | arXiv-only | arXiv-only | GAN | 情感/韵律 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Enhancing Dialogue Annotation with Speaker Characteristics Leveraging a Frozen LLM | 2508.04795 | arXiv-only | arXiv-only | 语言模型、大语言模型、微调 | 对话 | 轻量、高效 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| LPGNet: A Lightweight Network with Parallel Attention and Gated Fusion for Multimodal Emotion Recognition | 2508.08925 | arXiv-only | arXiv-only | Transformer、注意力 | 情感/韵律 | 轻量、高效 | 表现力、参数精简 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Speech Emotion Recognition Using Fine-Tuned DWFormer:A Study on Track 1 of the IERPChallenge 2024 | 2508.11371 | arXiv-only | arXiv-only | 微调 | 情感/韵律 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EmoSLLM: Parameter-Efficient Adaptation of LLMs for Speech Emotion Recognition | 2508.14130 | arXiv-only | arXiv-only | 语言模型、大语言模型、提示驱动 | 情感/韵律 | 高效 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Human Feedback Driven Dynamic Speech Emotion Recognition | 2508.14920 | arXiv-only | arXiv-only | — | 情感/韵律 | — | 音质、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| DeepEmoNet: Building Machine Learning Models for Automatic Emotion Recognition in Human Speeches | 2509.00025 | arXiv-only | arXiv-only | — | 情感/韵律 | 高效 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Amplifying Emotional Signals: Data-Efficient Deep Learning for Robust Speech Emotion Recognition | 2509.00077 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| ArabEmoNet: A Lightweight Hybrid 2D CNN-BiLSTM Model with Attention for Robust Arabic Speech Emotion Recognition | 2509.01401 | arXiv-only | arXiv-only | 注意力 | 低资源 | 轻量、低资源 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Xi+: Uncertainty Supervision for Robust Speaker Embedding | 2509.05993 | arXiv-only | arXiv-only | 注意力 | 情感/韵律 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| The MSP-Podcast Corpus | 2509.09791 | arXiv-only | arXiv-only | — | 播客 | — | 音质、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Prominence-aware automatic speech recognition for conversational speech | 2509.10116 | arXiv-only | arXiv-only | Transformer、微调 | 通话/呼叫中心、对话 | — | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| More Similar than Dissimilar: Modeling Annotators for Cross-Corpus Speech Emotion Recognition | 2509.12295 | arXiv-only | arXiv-only | 大语言模型 | 情感/韵律 | 轻量、个性化 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| EmoQ: Speech Emotion Recognition via Speech-Aware Q-Former and Large Language Model | 2509.15775 | arXiv-only | arXiv-only | 语言模型、大语言模型、提示驱动 | 通话/呼叫中心 | 端到端 | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Feature Selection via Graph Topology Inference for Soundscape Emotion Recognition | 2509.16760 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Revisiting MFCCs: Evidence for Spectral-Prosodic Coupling | 2510.05922 | arXiv-only | arXiv-only | — | 通话/呼叫中心 | 高效 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Revisiting Modeling and Evaluation Approaches in Speech Emotion Recognition: Considering Subjectivity of Annotators and Ambiguity of Emotions | 2510.05934 | arXiv-only | arXiv-only | 注意力 | 情感/韵律 | — | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Emotion-Disentangled Embedding Alignment for Noise-Robust and Cross-Corpus Speech Emotion Recognition | 2510.09072 | arXiv-only | arXiv-only | 分类器 | 嘈杂环境 | 解耦 | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Beyond Discrete Categories: Multi-Task Valence-Arousal Modeling for Pet Vocalization Analysis | 2510.12819 | arXiv-only | arXiv-only | Transformer | 情感/韵律 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Switchboard-Affect: Emotion Perception Labels from Conversational Speech | 2510.13906 | arXiv-only | arXiv-only | — | 播客 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| MuseTok: Symbolic Music Tokenization for Generation and Semantic Understanding | 2510.16273 | arXiv-only | arXiv-only | Transformer、VAE、自编码器 | 情感/韵律 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Transformer Redesign for Late Fusion of Audio-Text Features on Ultra-Low-Power Edge Hardware | 2510.18036 | arXiv-only | arXiv-only | Transformer | 通话/呼叫中心、边缘设备、实时 | 实时 | 实时响应、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Compressing Quaternion Convolutional Neural Networks for Audio Classification | 2510.21388 | arXiv-only | arXiv-only | Transformer、知识蒸馏、知识蒸馏 | 边缘设备 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Lost in Phonation: Voice Quality Variation as an Evaluation Dimension for Speech Foundation Models | 2510.25577 | arXiv-only | arXiv-only | — | 情感/韵律 | — | 音质、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Cross-Corpus Validation of Speech Emotion Recognition in Urdu using Domain-Knowledge Acoustic Features | 2510.26823 | arXiv-only | arXiv-only | 分类器 | 通话/呼叫中心、低资源、边缘设备 | 低资源 | 鲁棒性、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| MedVoiceBias: A Controlled Study of Audio LLM Behavior in Clinical Decision-Making | 2511.06592 | arXiv-only | arXiv-only | 语言模型、大语言模型、提示驱动 | 临床 | — | 表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Quality-Controlled Multimodal Emotion Recognition in Conversations with Identity-Based Transfer Learning and MAMBA Fusion | 2511.14969 | arXiv-only | arXiv-only | Mamba/SSM、微调 | 情感/韵律 | — | 音质、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| A Cloud-Based Cross-Modal Transformer for Emotion Recognition and Adaptive Human-Computer Interaction | 2601.14259 | arXiv-only | arXiv-only | Transformer、注意力 | 低延迟、实时 | 实时、低延迟、高效 | 鲁棒性、低延迟、实时响应、表现力 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| On the Relationship between Accent Strength and Articulatory Features | 2507.03149 | arXiv-only | arXiv-only | 自监督学习 | 口音/方言 | 自监督 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| How to Evaluate Automatic Speech Recognition: Comparing Different Performance and Bias Measures | 2507.05885 | arXiv-only | arXiv-only | — | 口音/方言 | 端到端 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| On Barriers to Archival Audio Processing | 2507.08768 | arXiv-only | arXiv-only | — | 多语言 | — | 鲁棒性 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| WildElder: A Chinese Elderly Speech Dataset from the Wild with Fine-Grained Manual Annotations | 2510.09344 | arXiv-only | arXiv-only | — | 口音/方言 | — | 鲁棒性 | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |
| Adapting Speech Foundation Models for Unified Multimodal Speech Recognition with Large Language Models | 2510.22961 | arXiv-only | arXiv-only | 语言模型、大语言模型、提示驱动 | 嘈杂环境 | 统一模型 | — | [剔除:纯ASR] 见原文; 多为数据/算力/特定语种/评测指标局限 |


### 【非编创】原 speech-LM 理解/对话侧（口径收紧移出编创）

| 论文 Title | arXiv ID | comment归属venue | 状态 | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|---|---|
| A Dataset for Automatic Assessment of TTS Quality in Spanish | 2507.01805 | Interspeech-2025 | 补漏 | 自监督 | tts、text-to-speech | 待核 | 自然度、音质 | [口径收紧移出: Dataset for automatic assessment of TTS quality Spanish (评测数据集)→move] 待核 |
| Unlocking Speech Instruction Data Potential with Query Rewriting | 2507.08603 | ACL-2025 | 补漏 | LLM | tts、text-to-speech、speech | 零样本泛化 | 音质、鲁棒性 | [口径收紧移出: Speech instruction data via query rewriting (数据生成/训练基础设施)→move] 待核 |
| Multilingual Source Tracing of Speech Deepfakes: A First Benchmark | 2508.04143 | Interspeech-2025 | 补漏 | 待核 | multilingual | 待核 | 待核 | [口径收紧移出: Multilingual source tracing of speech deepfakes benchmark (鉴伪/评测)→move] 评测局限、泛化局限 |
| The State Of TTS: A Case Study with Human Fooling Rates | 2508.04179 | Interspeech-2025 | 补漏 | 待核 | tts | 零样本泛化 | 音质、表现力 | [口径收紧移出: State of TTS case study with human fooling rates (评测)→move] 评测局限 |
| Is GAN Necessary for Mel-Spectrogram-based Neural Vocoder? | 2508.07711 | SPL-2025 | 补漏 | GAN、声码器 | vocoder | 新方法/统一框架 | 音质 | [口径收紧移出: GAN for mel-spectrogram neural vocoder (声码器/基础设施,非编创方法)→move] 待核 |
| Towards Frame-level Quality Predictions of Synthetic Speech | 2508.10374 | Interspeech-2025 | 补漏 | 待核 | speech synthesis | 待核 | 音质 | [口径收紧移出: Frame-level quality predictions of synthetic speech (评测)→move] 待核 |
| SpeechWeave: Diverse Multilingual Synthetic Text &amp; Audio Data Generation Pipeline for Training Text to Speech Models | 2509.14270 | ACL-2025 | 补漏 | LLM | tts、text-to-speech、multil | 新方法/统一框架 | 音质 | [口径收紧移出: SpeechWeave synthetic text&audio data pipeline for training TTS (数据生成/训练基础设施)→move] 待核 |
| Mitigating Intra-Speaker Variability in Diarization with Style-Controllable Speech Augmentation | 2509.14632 | ICASSP-2026 | 补漏 | 待核 | emotion、diarization | 高效/轻量 | 鲁棒性、可控、速度 | [口径收紧移出: Mitigating diarization variability with style-controllable augmentation (diarization/数据增强)→move] 待核 |
| SpeechMLC: Speech Multi-label Classification | 2509.14677 | Interspeech-2025 | 补漏 | Transformer | 待核 | 统一/联合建模 | 待核 | [口径收紧移出: SpeechMLC multi-label classification (理解/分类)→move] 算力局限、评测局限 |
| SynParaSpeech: Automated Synthesis of Paralinguistic Datasets for Speech Generation and Understanding | 2509.14946 | ICASSP-2026 | 补漏 | 待核 | 待核 | 新方法/统一框架 | 待核 | [口径收紧移出: SynParaSpeech synthesis of paralinguistic datasets (数据集生成)→move] 待核 |
| Sidon: Fast and Robust Open-Source Multilingual Speech Restoration for Large-scale Dataset Cleansing | 2509.17052 | ICASSP-2026 | 补漏 | 声码器 | tts、text-to-speech、speech | 高效/轻量 | 音质、鲁棒性、效率 | [口径收紧移出: Sidon speech restoration for dataset cleansing (数据清洗/修复基础设施)→move] 算力局限 |
| Nord-Parl-TTS: Finnish and Swedish TTS Dataset from Parliament Speech | 2509.17988 | ICASSP-2026 | 补漏 | 待核 | tts、text-to-speech | 统一/联合建模 | 音质 | [口径收紧移出: Nord-Parl-TTS dataset (数据集)→move] 评测局限 |
| Pay More Attention To Audio: Mitigating Imbalance of Cross-Modal Attention in Large Audio Language Models | 2509.18816 | ICASSP-2026 | 补漏 | LLM、Transformer | 待核 | 高效/轻量 | 效率 | [口径收紧移出: Mitigating cross-modal attention imbalance in LALM (训练/基础设施)→move] 算力局限 |
| Frame-Stacked Local Transformers For Efficient Multi-Codebook Speech Generation | 2509.19592 | ICASSP-2026 | 补漏 | LLM、Transformer、自回归 | 待核 | 统一/联合建模 | 音质、效率 | [口径收紧移出: Frame-stacked local transformers for multi-codebook speech generation (通用生成基础设施,边界模糊→move)] 算力局限 |
| SpeechCT-CLIP: Distilling Text-Image Knowledge to Speech for Voice-Native Multimodal CT Analysis | 2510.02322 | ICASSP-2026 | 补漏 | 蒸馏、对比学习 | 待核 | 零样本泛化 | 待核 | [口径收紧移出: SpeechCT-CLIP text-image knowledge distillation for CT analysis (理解/多模态,非编创)→move] 待核 |
| Evaluation of preprocessing pipelines in the creation of in-the-wild TTS datasets | 2510.03111 | ICASSP-2026 | 补漏 | 待核 | tts、denois、low-resource | 待核 | 音质 | [口径收紧移出: Evaluation of preprocessing pipelines for TTS datasets (数据集/评测)→move] 低资源、评测局限 |
| Hearing Health in Home Healthcare: Leveraging LLMs for Illness Scoring and ALMs for Vocal Biomarker Extraction | 2510.18169 | NeurIPS-2025 | 补漏 | LLM | 待核 | 待核 | 待核 | [口径收紧移出: LLM illness scoring + ALM vocal biomarker extraction (理解/评测)→move] 待核 |
| Augmenting Open-Vocabulary Dysarthric Speech Assessment with Human Perceptual Supervision | 2511.02270 | ICASSP-2026 | 补漏 | 自监督 | speech synthesis | 待核 | 可懂度 | [口径收紧移出: Open-vocabulary dysarthric speech assessment (评测/理解)→move] 评测局限 |
| Balalaika: Data-Centric, Prosody-Aware Annotation Pipeline for Russian Speech | 2507.13563 | Interspeech-2026 | 未覆盖venue | 待核 | tts、denois、prosod | 新方法/统一框架 | 音质 | [口径收紧移出: Balalaika prosody-aware annotation pipeline for Russian speech (标注/数据基础设施)→move] 待核 |
| Advancing Speech Quality Assessment Through Scientific Challenges and Open-source Activities | 2508.00317 | APSIPA-2025 | 未覆盖venue | 待核 | 待核 | 待核 | 音质 | [口径收紧移出: Advancing speech quality assessment via challenges/open-source (评测)→move] 评测局限 |
| TurnGuide: Enhancing Meaningful Full Duplex Spoken Interactions via Dynamic Turn-Level Text-Speech Interleaving | 2508.07375 | Interspeech-2026 | 未覆盖venue | LLM | real-time、speech language | 新方法/统一框架 | 音质、实时 | [口径收紧移出: TurnGuide full-duplex spoken interactions turn-level interleaving (对话/agent基础设施)→move] 待核 |
| Fake-Mamba: Real-Time Speech Deepfake Detection Using Bidirectional Mamba as Self-Attention's Alternative | 2508.09294 | ASRU-2025 | 未覆盖venue | Conformer、Mamba | speech synthesis、real-tim | 高效/轻量 | 实时、效率 | [口径收紧移出: Fake-Mamba real-time speech deepfake detection (鉴伪)→move] 评测局限、泛化局限 |
| Improving Resource-Efficient Speech Enhancement via Neural Differentiable DSP Vocoder Refinement | 2508.14709 | ASRU-2025 | 未覆盖venue | 声码器 | speech synthesis、enhancem | 高效/轻量 | 音质、可懂度、实时 | [口径收紧移出: Speech enhancement via differentiable DSP vocoder refinement (增强/声码器)→move] 算力局限 |
| EMO-Reasoning: Benchmarking Emotional Reasoning Capabilities in Spoken Dialogue Systems | 2508.17623 | ASRU-2025 | 未覆盖venue | 待核 | text-to-speech、emotion | 新方法/统一框架 | 待核 | [口径收紧移出: EMO-Reasoning benchmarking emotional reasoning in spoken dialogue (评测/benchmark)→move] 算力局限、评测局限 |
| Zero-shot Context Biasing with Trie-based Decoding using Synthetic Multi-Pronunciation | 2508.17796 | APSIPA-2025 | 未覆盖venue | 待核 | tts、text-to-speech | 零样本泛化 | 待核 | [口径收紧移出: Zero-shot context biasing with trie decoding synthetic multi-pronunciation (ASR解码/理解)→move] 评测局限 |
| Interpolating Speaker Identities in Embedding Space for Data Expansion | 2508.19210 | APSIPA-2025 | 未覆盖venue | 待核 | text-to-speech | 新方法/统一框架 | 待核 | [口径收紧移出: Interpolating speaker identities in embedding space for data expansion (数据增强/克隆数据,非生成方法本身)→move] 算力局限 |
| Multilingual Dataset Integration Strategies for Robust Audio Deepfake Detection: A SAFE Challenge System | 2508.20983 | ASRU-2025 | 未覆盖venue | 编解码、自监督 | tts、multilingual、codec | 待核 | 鲁棒性 | [口径收紧移出: Multilingual audio deepfake detection SAFE challenge (鉴伪/评测)→move] 评测局限、泛化局限 |
| ChipChat: Low-Latency Cascaded Conversational Agent in MLX | 2509.00078 | ASRU-2025 | 未覆盖venue | 声码器、LLM | text-to-speech、speech syn | 新方法/统一框架 | 实时 | [口径收紧移出: ChipChat low-latency cascaded conversational agent (对话/agent)→move] 待核 |
| The AudioMOS Challenge 2025 | 2509.01336 | ASRU-2025 | 未覆盖venue | 待核 | text-to-speech | 待核 | 音质 | [口径收紧移出: AudioMOS Challenge 2025 (评测/benchmark)→move] 评测局限 |
| Improving Perceptual Audio Aesthetic Assessment via Triplet Loss and Self-Supervised Embeddings | 2509.03292 | ASRU-2025 | 未覆盖venue | Transformer、自监督 | tts、text-to-speech | 待核 | 音质、鲁棒性、相似度 | [口径收紧移出: Perceptual audio aesthetic assessment (评测)→move] 评测局限、泛化局限 |
| DarkStream: real-time speech anonymization with low latency | 2509.04667 | ASRU-2025 | 未覆盖venue | GAN、声码器、Transformer | speech synthesis、streamin | 高效/轻量 | 可懂度、鲁棒性、实时 | [口径收紧移出: DarkStream real-time speech anonymization (匿名化/隐私,非编创生成)→move] 评测局限 |
| Few-shot Personalization via In-Context Learning for Speech Emotion Recognition based on Speech-Language Model | 2509.08344 | ASRU-2025 | 未覆盖venue | LLM | emotion | 待核 | 待核 | [口径收紧移出: Few-shot personalization for speech emotion recognition via SLM (理解/SER)→move] 待核 |
| Semantic-VAE: Semantic-Alignment Latent Representation for Better Speech Synthesis | 2509.22167 | Interspeech-2026 | 未覆盖venue | 待核 | tts、text-to-speech、speech | 零样本泛化 | 音质、可懂度、相似度 | [口径收紧移出: Semantic-VAE latent representation for speech synthesis (表示/基础设施,边界模糊→move)] 待核 |
| Investigating Faithfulness in Large Audio Language Models | 2509.22363 | Interspeech-2026 | 未覆盖venue | LLM | 待核 | 新方法/统一框架 | 待核 | [口径收紧移出: Investigating faithfulness in large audio language models (理解/评测)→move] 评测局限 |
| Robustness assessment of large audio language models in multiple-choice evaluation | 2510.04584 | Interspeech-2026 | 未覆盖venue | LLM | 待核 | 新方法/统一框架 | 鲁棒性 | [口径收紧移出: Robustness assessment of LALM in multiple-choice eval (评测)→move] 评测局限 |
| AQA-TTRL: Self-Adaptation in Audio Question Answering with Test-Time Reinforcement Learning | 2510.05478 | Interspeech-2026 | 未覆盖venue | LLM、强化学习 | 待核 | 新方法/统一框架 | 待核 | [口径收紧移出: AQA-TTRL test-time RL for audio QA (训练/理解)→move] 待核 |
| Position: Towards Responsible Evaluation for Text-to-Speech | 2510.06927 | ICML-2026 | 未覆盖venue | 待核 | tts、text-to-speech | 待核 | 鲁棒性 | [口径收紧移出: Position towards responsible evaluation for TTS (评测立场文)→move] 算力局限、评测局限 |
| Full-Duplex-Bench-v2: A Multi-Turn Evaluation Framework for Duplex Dialogue Systems with an Automated Examiner | 2510.07838 | ACL-2026 | 未覆盖venue | 待核 | streaming、agent | 高效/轻量 | 速度 | [口径收紧移出: Full-Duplex-Bench-v2 multi-turn eval framework for duplex dialogue (评测/benchmark)→move] 评测局限 |
| AsyncVoice Agent: Real-Time Explanation for LLM Planning and Reasoning | 2510.16156 | ASRU-2025 | 未覆盖venue | LLM | streaming、real-time、agent | 待核 | 鲁棒性、实时 | [口径收紧移出: AsyncVoice agent real-time explanation for LLM planning/reasoning (agent/对话)→move] 待核 |
| MTR-DuplexBench: Towards a Comprehensive Evaluation of Multi-Round Conversations for Full-Duplex Speech Language Models | 2511.10262 | ACL-2026 | 未覆盖venue | LLM | real-time、speech language | 新方法/统一框架 | 音质、实时 | [口径收紧移出: MTR-DuplexBench evaluation of multi-round full-duplex SLM (评测/benchmark)→move] 评测局限 |
| Codec2Vec: Self-Supervised Speech Representation Learning Using Neural Speech Codecs | 2511.16639 | ASRU-2025 | 未覆盖venue | 编解码、自监督 | speech synthesis、codec | 高效/轻量 | 速度 | [口径收紧移出: Codec2Vec self-supervised representation via neural codecs (表示/基础设施)→move] 评测局限 |
| Comparing Unsupervised and Supervised Semantic Speech Tokens: A Case Study of Child ASR | 2512.03301 | ASRU-2025 | 未覆盖venue | LLM | low-resource | 待核 | 待核 | [口径收紧移出: Comparing semantic speech tokens: child ASR case study (ASR/理解)→move] 低资源 |
| A conversational gesture synthesis system based on emotions and semantics | 2507.03147 | arXiv-only | arXiv-only | 扩散、LLM | speech synthesis、enhancem | 高效/轻量 | 可控、表现力、速度 | [口径收紧移出: Conversational gesture synthesis based on emotions/semantics (gesture非语音编创,边界模糊→move)] 算力局限、评测局限 |
| Traceable TTS: Toward Watermark-Free TTS with Strong Traceability | 2507.03887 | arXiv-only | arXiv-only | 声码器、水印 | tts、text-to-speech、vocode | 统一/联合建模 | 音质、可追溯 | [口径收紧移出: Traceable TTS watermark-free traceability (鉴伪/溯源,非编创方法)→move] 泛化局限 |
| Prosody Labeling with Phoneme-BERT and Speech Foundation Models | 2507.03912 | arXiv-only | arXiv-only | 自监督 | text-to-speech、prosod、acc | 待核 | 可控 | [口径收紧移出: Prosody labeling with phoneme-BERT and speech foundation models (标注/基础设施)→move] 评测局限 |
| OpenS2S: Advancing Fully Open-Source End-to-End Empathetic Large Speech Language Model | 2507.05177 | arXiv-only | arXiv-only | LLM | text-to-speech、emotion、st | 待核 | 音质、可控、表现力 | [口径收紧移出: OpenS2S end-to-end empathetic large speech LM omni (omni大模型生成语音为助手一部分)→move] 待核 |
| Speech Quality Assessment Model Based on Mixture of Experts: System-Level Performance Enhancement and Utterance-Level Challenge Analysis | 2507.06116 | arXiv-only | arXiv-only | 自监督 | text-to-speech、speech syn | 待核 | 音质 | [口径收紧移出: Speech quality assessment model mixture of experts (评测)→move] 待核 |
| SecureSpeech: Prompt-based Speaker and Content Protection | 2507.07799 | arXiv-only | arXiv-only | LLM | text-to-speech、speech syn | 待核 | 音质 | [口径收紧移出: SecureSpeech prompt-based speaker and content protection (安全/隐私,非编创)→move] 待核 |
| RepeaTTS: Towards Feature Discovery through Repeated Fine-Tuning | 2507.08012 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、emotio | 新方法/统一框架 | 可控、表现力 | [口径收紧移出: RepeaTTS feature discovery via repeated fine-tuning (训练方法,边界模糊→move)] 评测局限、限于 |
| Active Learning for Text-to-Speech Synthesis with Informative Sample Collection | 2507.08319 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、speech | 高效/轻量 | 音质、效率 | [口径收紧移出: Active learning for TTS with informative sample collection (训练/数据,非生成方法本身)→move] 待核 |
| BENYO-S2ST-Corpus-1: A Bilingual English-to-Yoruba Direct Speech-to-Speech Translation Corpus | 2507.09342 | arXiv-only | arXiv-only | 待核 | tts、low-resource、multilin | 待核 | 实时、相似度 | [口径收紧移出: BENYO-S2ST-Corpus English-to-Yoruba S2ST corpus (数据集)→move] 低资源 |
| Supporting SENCOTEN Language Documentation Efforts with Automatic Speech Recognition | 2507.10827 | arXiv-only | arXiv-only | LLM | tts、text-to-speech | 新方法/统一框架 | 待核 | [口径收紧移出: SENCOTEN language documentation with ASR (ASR/理解)→move] 数据局限 |
| P.808 Multilingual Speech Enhancement Testing: Approach and Results of URGENT 2025 Challenge | 2507.11306 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、enhanc | 新方法/统一框架 | 音质 | [口径收紧移出: P.808 multilingual speech enhancement testing URGENT challenge (增强/评测)→move] 评测局限 |
| AudioJudge: Understanding What Works in Large Audio Model Based Speech Evaluation | 2507.12705 | arXiv-only | arXiv-only | 待核 | 待核 | 统一/联合建模 | 音质、鲁棒性 | [口径收紧移出: AudioJudge understanding what works in audio model speech evaluation (评测)→move] 评测局限 |
| Autoregressive Speech Enhancement via Acoustic Tokens | 2507.12825 | arXiv-only | arXiv-only | 自回归 | enhancement | 新方法/统一框架 | 音质、可懂度 | [口径收紧移出: Autoregressive speech enhancement via acoustic tokens (增强,非编创生成)→move] 待核 |
| EchoVoices: Preserving Generational Voices and Memories for Seniors and Children | 2507.15221 | arXiv-only | arXiv-only | LLM | tts、speech synthesis、agen | 新方法/统一框架 | 音质、鲁棒性、相似度 | [口径收紧移出: EchoVoices preserving generational voices for seniors/children (应用/agent,边界模糊→move)] 待核 |
| Evaluating Speech-to-Text x LLM x Text-to-Speech Combinations for AI Interview Systems | 2507.16835 | arXiv-only | arXiv-only | LLM | tts、text-to-speech | 待核 | 音质 | [口径收紧移出: Evaluating ASR x LLM x TTS combinations for AI interview systems — benchmark/evaluation of pipeline, not generation method] 评测局限 |
| TELEVAL: A Dynamic Benchmark Designed for Spoken Language Models in Chinese Interactive Scenarios | 2507.18061 | arXiv-only | arXiv-only | LLM | 待核 | 待核 | 待核 | [口径收紧移出: TELEVAL benchmark for spoken language models — evaluation/benchmark] 评测局限 |
| GOAT-SLM: A Spoken Language Model with Paralinguistic and Speaker Characteristic Awareness | 2507.18119 | arXiv-only | arXiv-only | LLM | emotion、dialect | 新方法/统一框架 | 鲁棒性、表现力 | [口径收紧移出: GOAT-SLM spoken language model with paralinguistic/speaker awareness — SLM understanding/representation, not generation] 评测局限 |
| HH-Codec: High Compression High-fidelity Discrete Neural Codec for Spoken Language Modeling | 2507.18897 | arXiv-only | arXiv-only | 编解码、LLM | bandwidth、codec | 新方法/统一框架 | 待核 | [口径收紧移出: HH-Codec neural codec for spoken language modeling — codec/infrastructure] 算力局限、评测局限 |
| Voxlect: A Speech Foundation Model Benchmark for Modeling Dialects and Regional Languages Around the Globe | 2508.01691 | arXiv-only | arXiv-only | 待核 | dialect | 新方法/统一框架 | 鲁棒性 | [口径收紧移出: Voxlect speech foundation model benchmark for dialects — benchmark] 评测局限 |
| When Good Sounds Go Adversarial: Jailbreaking Audio-Language Models with Benign Inputs | 2508.03365 | arXiv-only | arXiv-only | LLM、强化学习 | 待核 | 新方法/统一框架 | 待核 | [口径收紧移出: Adversarial jailbreaking audio-language models — security/attack on understanding models] 评测局限 |
| Think Before You Segment: An Object-aware Reasoning Agent for Referring Audio-Visual Segmentation | 2508.04418 | arXiv-only | arXiv-only | LLM | agent | 新方法/统一框架 | 待核 | [口径收紧移出: Object-aware reasoning agent for referring audio-visual segmentation — audio understanding/segmentation] 评测局限、泛化局限 |
| Toward Low-Latency End-to-End Voice Agents for Telecommunications Using Streaming ASR, Quantized LLMs, and Real-Time TTS | 2508.04721 | arXiv-only | arXiv-only | LLM | tts、text-to-speech、stream | 高效/轻量 | 实时、低延迟 | [口径收紧移出: Low-latency voice agent pipeline (ASR+LLM+TTS) — end-to-end voice agent infrastructure, omni-style] 评测局限 |
| KLASSify to Verify: Audio-Visual Deepfake Detection Using SSL-based Audio and Handcrafted Visual Features | 2508.07337 | arXiv-only | arXiv-only | 自监督 | tts、text-to-speech | 新方法/统一框架 | 鲁棒性 | [口径收紧移出: KLASSify audio-visual deepfake detection — deepfake detection, not generation] 算力局限、泛化局限 |
| Audio-Thinker: Guiding Audio Language Model When and How to Think via Reinforcement Learning | 2508.08039 | arXiv-only | arXiv-only | LLM、强化学习 | 待核 | 新方法/统一框架 | 音质 | [口径收紧移出: Audio-Thinker guiding audio LM reasoning via RL — reasoning-over-audio/understanding] 评测局限、泛化局限 |
| Dual Information Speech Language Models for Emotional Conversations | 2508.08095 | arXiv-only | arXiv-only | LLM、适配器 | emotion、speech language m | 新方法/统一框架 | 待核 | [口径收紧移出: DualSpeechLM for emotional conversations — SLM understanding/conversation, borderline but dual modeling not primarily controllable generation; lean move] 待核 |
| MSU-Bench: Towards Understanding the Conversational Multi-talker Scenarios | 2508.08155 | arXiv-only | arXiv-only | LLM | 待核 | 新方法/统一框架 | 待核 | [口径收紧移出: MSU-Bench multi-talker conversational understanding — benchmark] 评测局限 |
| DualSpeechLM: Towards Unified Speech Understanding and Generation via Dual Speech Token Modeling with Large Language Models | 2508.08961 | arXiv-only | arXiv-only | LLM | speech language model | 统一/联合建模 | 待核 | [口径收紧移出: DualSpeechLM unified understanding+generation via dual tokens — SLM infrastructure; unified not primarily controllable generation; lean move] 待核 |
| $\text{M}^3\text{PDB}$: A Multimodal, Multi-Label, Multilingual Prompt Database for Speech Generation | 2508.09702 | arXiv-only | arXiv-only | 待核 | multilingual、real-time、ag | 高效/轻量 | 音质、鲁棒性、实时 | [口径收紧移出: M3PDB prompt database for speech generation — dataset/database, not generation method] 待核 |
| Benchmarking Prosody Encoding in Discrete Speech Tokens | 2508.11224 | arXiv-only | arXiv-only | LLM、自监督 | prosod、speech language mo | 高效/轻量 | 效率 | [口径收紧移出: Benchmarking prosody encoding in discrete speech tokens — benchmark] 待核 |
| Mini-Omni-Reasoner: Token-Level Thinking-in-Speaking in Large Speech Models | 2508.15827 | arXiv-only | arXiv-only | LLM | real-time | 高效/轻量 | 自然度、实时、效率 | [口径收紧移出: Mini-Omni-Reasoner thinking-in-speaking in large speech models — omni reasoning model, not primarily generation method] 泛化局限 |
| QvTAD: Differential Relative Attribute Learning for Voice Timbre Attribute Detection | 2508.15931 | arXiv-only | arXiv-only | 编解码 | denois、codec | 统一/联合建模 | 待核 | [口径收紧移出: QvTAD voice timbre attribute detection — detection/classification, not generation] 泛化局限 |
| SwiftF0: Fast and Accurate Monophonic Pitch Detection | 2508.18440 | arXiv-only | arXiv-only | 待核 | tts、real-time | 统一/联合建模 | 鲁棒性、实时、效率 | [口径收紧移出: SwiftF0 monophonic pitch detection — pitch detection tool, not generation] 算力局限、评测局限 |
| CodecBench: A Comprehensive Benchmark for Acoustic and Semantic Evaluation | 2508.20660 | arXiv-only | arXiv-only | 编解码、LLM | codec、speech language mod | 新方法/统一框架 | 待核 | [口径收紧移出: CodecBench benchmark for codec evaluation — benchmark] 评测局限 |
| WoW-Bench: Evaluating Fine-Grained Acoustic Perception in Audio-Language Models via Marine Mammal Vocalizations | 2508.20976 | arXiv-only | arXiv-only | LLM | 待核 | 新方法/统一框架 | 待核 | [口径收紧移出: WoW-Bench evaluating acoustic perception in audio-language models — benchmark] 评测局限 |
| AHAMask: Reliable Task Specification for Large Audio Language Models without Instructions | 2509.01787 | arXiv-only | arXiv-only | LLM | 待核 | 高效/轻量 | 效率 | [口径收紧移出: AHAMask task specification for large audio language models — audio LM understanding] 待核 |
| Speech-Based Cognitive Screening: A Systematic Evaluation of LLM Adaptation Strategies | 2509.03525 | arXiv-only | arXiv-only | LLM | 待核 | 高效/轻量 | 效率 | [口径收紧移出: Speech-based cognitive screening, LLM adaptation evaluation — application/evaluation, not generation] 评测局限 |
| Say More with Less: Variable-Frame-Rate Speech Tokenization via Adaptive Clustering and Implicit Duration Coding | 2509.04685 | arXiv-only | arXiv-only | LLM | text-to-speech、speech syn | 零样本泛化 | 自然度、相似度 | [口径收紧移出: Variable-frame-rate speech tokenization — tokenization/infrastructure] 待核 |
| An Empirical Analysis of Discrete Unit Representations in Speech Language Modeling Pre-training | 2509.05359 | arXiv-only | arXiv-only | LLM | speech language model | 待核 | 鲁棒性 | [口径收紧移出: Empirical analysis of discrete unit representations in SLM pre-training — representation analysis/infrastructure] 待核 |
| Speaker Privacy and Security in the Big Data Era: Protection and Defense against Deepfake | 2509.06361 | arXiv-only | arXiv-only | 待核 | 待核 | 待核 | 待核 | [口径收紧移出: Speaker privacy/security, deepfake protection — security/defense, not generation] 待核 |
| Affine Modulation-based Audiogram Fusion Network for Joint Noise Reduction and Hearing Loss Compensation | 2509.07341 | arXiv-only | arXiv-only | Conformer | enhancement、separation | 统一/联合建模 | 音质 | [口径收紧移出: Audiogram fusion for noise reduction and hearing loss compensation — enhancement, not speech-LM generation] 待核 |
| AU-Harness: An Open-Source Toolkit for Holistic Evaluation of Audio LLMs | 2509.08031 | arXiv-only | arXiv-only | LLM | 待核 | 统一/联合建模 | 效率 | [口径收紧移出: AU-Harness toolkit for evaluating audio LLMs — evaluation toolkit] 评测局限 |
| VStyle: A Benchmark for Voice Style Adaptation with Spoken Instructions | 2509.09716 | arXiv-only | arXiv-only | LLM | prosod | 统一/联合建模 | 自然度、可控 | [口径收紧移出: VStyle benchmark for voice style adaptation — benchmark] 评测局限 |
| Towards Data Drift Monitoring for Speech Deepfake Detection in the context of MLOps | 2509.10086 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech | 待核 | 待核 | [口径收紧移出: Data drift monitoring for speech deepfake detection in MLOps — deepfake detection/monitoring] 待核 |
| Length-Aware Rotary Position Embedding for Text-Speech Alignment | 2509.11084 | arXiv-only | arXiv-only | Transformer | tts、text-to-speech | 高效/轻量 | 音质、速度 | [口径收紧移出: Length-aware rotary position embedding for text-speech alignment — alignment/infrastructure, not a generation method per se; lean move] 算力局限 |
| FuseCodec: Semantic-Contextual Fusion and Supervision for Neural Codecs | 2509.11425 | arXiv-only | arXiv-only | 编解码、LLM、自监督 | tts、speech synthesis、code | 统一/联合建模 | 音质、可懂度、鲁棒性 | [口径收紧移出: FuseCodec neural codec with semantic-contextual fusion — codec/infrastructure] 待核 |
| Summary on The Multilingual Conversational Speech Language Model Challenge: Datasets, Tasks, Baselines, and Methods | 2509.13785 | arXiv-only | arXiv-only | LLM、LoRA、蒸馏 | multilingual、speech langu | 待核 | 待核 | [口径收紧移出: Summary on multilingual conversational SLM challenge — challenge/dataset/baselines overview] 待核 |
| From Turn-Taking to Synchronous Dialogue: A Survey of Full-Duplex Spoken Language Models | 2509.14515 | arXiv-only | arXiv-only | LLM | 待核 | 待核 | 待核 | [口径收紧移出: Survey of full-duplex spoken language models — survey of omni/dialogue SLMs] 评测局限 |
| A Novel Semantic Compression Approach for Ultra-low Bandwidth Voice Communication | 2509.15462 | arXiv-only | arXiv-only | 编解码 | text-to-speech、bandwidth、 | 新方法/统一框架 | 音质 | [口径收紧移出: Semantic compression for ultra-low bandwidth voice communication — codec/compression infrastructure] 待核 |
| SightSound-R1: Cross-Modal Reasoning Distillation from Vision to Audio Language Models | 2509.15661 | arXiv-only | arXiv-only | LLM、蒸馏 | 待核 | 待核 | 待核 | [口径收紧移出: SightSound-R1 cross-modal reasoning distillation vision to audio LM — reasoning/understanding distillation] 待核 |
| MBCodec:Thorough disentangle for high-fidelity audio compression | 2509.17006 | arXiv-only | arXiv-only | 编解码、自监督 | tts、text-to-speech、codec | 新方法/统一框架 | 待核 | [口径收紧移出: MBCodec disentangled high-fidelity audio compression — codec/infrastructure] 评测局限 |
| Qwen3-Omni Technical Report | 2509.17765 | arXiv-only | arXiv-only | 扩散、编解码、自回归 | streaming、real-time、codec | 高效/轻量 | 实时 | [口径收紧移出: Qwen3-Omni technical report — omni large model, speech generation only part of general assistant] 算力局限 |
| Explore the Reinforcement Learning for the LLM based ASR and TTS system | 2509.18569 | arXiv-only | arXiv-only | LLM、强化学习 | tts、text-to-speech | 高效/轻量 | 待核 | [口径收紧移出: Explore RL for LLM-based ASR and TTS system — RL exploration over ASR+TTS pipeline; borderline but framing is systems RL not a generation method; lean move] 评测局限 |
| Objective Evaluation of Prosody and Intelligibility in Speech Synthesis via Conditional Prediction of Discrete Tokens | 2509.20485 | arXiv-only | arXiv-only | 待核 | tts、speech synthesis、pros | 新方法/统一框架 | 音质、可懂度 | [口径收紧移出: Objective evaluation of prosody/intelligibility in speech synthesis — evaluation] 算力局限、评测局限 |
| MI-Fuse: Label Fusion for Unsupervised Domain Adaptation with Closed-Source Large-Audio Language Model | 2509.20706 | arXiv-only | arXiv-only | LLM | denois、emotion | 零样本泛化 | 待核 | [口径收紧移出: MI-Fuse label fusion for unsupervised domain adaptation with large-audio LM — audio understanding/domain adaptation] 待核 |
| CMDAR: A Chinese Multi-scene Dynamic Audio Reasoning Benchmark with Diverse Challenges | 2509.22461 | arXiv-only | arXiv-only | LLM | agent | 新方法/统一框架 | 待核 | [口径收紧移出: CMDAR Chinese multi-scene audio reasoning benchmark — benchmark] 评测局限 |
| BFA: Real-time Multilingual Text-to-speech Forced Alignment | 2509.23147 | arXiv-only | arXiv-only | 待核 | text-to-speech、multilingu | 高效/轻量 | 实时、速度 | [口径收紧移出: BFA real-time multilingual TTS forced alignment — forced alignment tool/infrastructure] 评测局限 |
| From Scores to Preferences: Redefining MOS Benchmarking for Speech Quality Reward Modeling | 2510.00743 | arXiv-only | arXiv-only | 待核 | 待核 | 统一/联合建模 | 音质 | [口径收紧移出: From scores to preferences: MOS benchmarking for speech quality reward modeling — evaluation/benchmark] 评测局限 |
| MelTok: 2D Tokenization for Single-Codebook Audio Compression | 2510.01903 | arXiv-only | arXiv-only | 声码器、编解码、LLM | vocoder、codec | 高效/轻量 | 音质、效率 | [口径收紧移出: MelTok 2D tokenization for single-codebook audio compression — tokenization/codec infrastructure] 评测局限 |
| Synthetic Audio Forensics Evaluation (SAFE) Challenge | 2510.03387 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech | 新方法/统一框架 | 待核 | [口径收紧移出: Synthetic Audio Forensics Evaluation (SAFE) Challenge — deepfake detection/evaluation challenge] 评测局限 |
| Investigation of perception inconsistency in speaker embedding for asynchronous voice anonymization | 2510.05718 | arXiv-only | arXiv-only | 编解码 | codec | 待核 | 待核 | [口径收紧移出: Perception inconsistency in speaker embedding for voice anonymization — anonymization/security, not generation] 待核 |
| XLSR-Kanformer: A KAN-Intergrated model for Synthetic Speech Detection | 2510.06706 | arXiv-only | arXiv-only | Conformer、自监督 | speech synthesis、spoof | 新方法/统一框架 | 鲁棒性 | [口径收紧移出: XLSR-Kanformer for synthetic speech detection — deepfake/spoof detection] 待核 |
| SHANKS: Simultaneous Hearing and Thinking for Spoken Language Models | 2510.06917 | arXiv-only | arXiv-only | LLM | real-time | 新方法/统一框架 | 实时 | [口径收紧移出: SHANKS simultaneous hearing and thinking for spoken language models — SLM understanding/reasoning] 待核 |
| AudioMarathon: A Comprehensive Benchmark for Long-Context Audio Understanding and Efficiency in Audio LLMs | 2510.07293 | arXiv-only | arXiv-only | LLM | 待核 | 高效/轻量 | 效率 | [口径收紧移出: AudioMarathon benchmark for long-context audio understanding — benchmark] 评测局限 |
| LongCat-Audio-Codec: An Audio Tokenizer and Detokenizer Solution Designed for Speech Large Language Models | 2510.15227 | arXiv-only | arXiv-only | 编解码、LLM | streaming、codec | 待核 | 音质、可懂度、鲁棒性 | [口径收紧移出: LongCat-Audio-Codec tokenizer/detokenizer for speech LLMs — codec/infrastructure] 评测局限 |
| SAC: Neural Speech Codec with Semantic-Acoustic Dual-Stream Quantization | 2510.16841 | arXiv-only | arXiv-only | 编解码、LLM、自监督 | tts、text-to-speech、codec | 新方法/统一框架 | 自然度、音质、可懂度 | [口径收紧移出: SAC neural speech codec with semantic-acoustic dual-stream quantization — codec/infrastructure] 评测局限 |
| Which Evaluation for Which Model? A Taxonomy for Speech Model Assessment | 2510.19509 | arXiv-only | arXiv-only | 待核 | prosod、real-time | 统一/联合建模 | 实时 | [口径收紧移出: Which evaluation for which model: taxonomy for speech model assessment — evaluation taxonomy] 评测局限 |
| Are These Even Words? Quantifying the Gibberishness of Generative Speech Models | 2510.21317 | arXiv-only | arXiv-only | LLM | speech language model | 待核 | 音质、可懂度 | [口径收紧移出: Quantifying gibberishness of generative speech models — evaluation of speech models] 待核 |
| SP-MCQA: Evaluating Intelligibility of TTS Beyond the Word Level | 2510.26190 | arXiv-only | arXiv-only | 待核 | tts | 新方法/统一框架 | 可懂度、鲁棒性 | [口径收紧移出: TTS可懂度评测,属评测/benchmark] 评测局限 |
| Ultralow-power standoff acoustic leak detection | 2511.00348 | arXiv-only | arXiv-only | 待核 | tts、bandwidth | 待核 | 待核 | [口径收紧移出: 声学泄漏检测(非语音生成),场景bandwidth待核,边界模糊倾向move] 待核 |
| Toward Objective and Interpretable Prosody Evaluation in Text-to-Speech: A Linguistically Motivated Approach | 2511.02104 | arXiv-only | arXiv-only | GAN | tts、text-to-speech、prosod | 待核 | 自然度、表现力 | [口径收紧移出: TTS韵律客观评测,属评测] 评测局限 |
| IDMap: A Pseudo-Speaker Generator Framework Based on Speaker Identity Index to Vector Mapping | 2511.06246 | arXiv-only | arXiv-only | 待核 | prosod | 待核 | 待核 | [口径收紧移出: 伪说话人生成器框架,prosod待核,非明确编创生成,边界模糊倾向move] 算力局限、评测局限 |
| Curved Worlds, Clear Boundaries: Generalizing Speech Deepfake Detection using Hyperbolic and Spherical Geometry Spaces | 2511.10793 | arXiv-only | arXiv-only | 扩散、流匹配、声码器 | tts、text-to-speech、speech | 统一/联合建模 | 待核 | [口径收紧移出: 语音deepfake检测,属检测/理解基础设施] 泛化局限 |
| Synthetic Voices, Real Threats: Evaluating Large Text-to-Speech Models in Generating Harmful Audio | 2511.10913 | arXiv-only | arXiv-only | GAN、LLM | tts、text-to-speech、stream | 待核 | 鲁棒性 | [口径收紧移出: 评估TTS生成有害音频,属评测/安全评估] 评测局限 |
| It Hears, It Sees too: Multi-Modal LLM for Depression Detection By Integrating Visual Understanding into Audio Language Models | 2511.19877 | arXiv-only | arXiv-only | LLM | 待核 | 新方法/统一框架 | 待核 | [口径收紧移出: 多模态LALM抑郁检测,属理解] 算力局限、评测局限 |
| PURE Codec: Progressive Unfolding of Residual Entropy for Speech Codec Learning | 2511.22687 | arXiv-only | arXiv-only | 编解码、LLM | text-to-speech、enhancemen | 新方法/统一框架 | 音质 | [口径收紧移出: 语音codec学习,属编解码/基础设施] 待核 |
| Beyond Unified Models: A Service-Oriented Approach to Low Latency, Context Aware Phonemization for Real Time TTS | 2512.08006 | arXiv-only | arXiv-only | 待核 | tts、text-to-speech、real-t | 统一/联合建模 | 音质、实时、低延迟 | [口径收紧移出: 实时TTS音素化服务架构,基础设施,边界模糊倾向move] 算力局限 |
| LG Uplus System with Multi-Speaker IDs and Discriminator-based Sub-Judges for the WildSpoof Challenge | 2512.09000 | arXiv-only | arXiv-only | GAN | tts、text-to-speech、spoof | 新方法/统一框架 | 音质 | [口径收紧移出: WildSpoof挑战多说话人欺骗检测,属检测/评测] 待核 |
| Spoken DialogSum: An Emotion-Rich Conversational Dataset for Spoken Dialogue Summarization | 2512.14687 | arXiv-only | arXiv-only | LLM | tts、emotion | 新方法/统一框架 | 表现力 | [口径收紧移出: 口语对话摘要数据集,属数据集/理解] 待核 |
| TAVID: Text-Driven Audio-Visual Interactive Dialogue Generation | 2512.20296 | arXiv-only | arXiv-only | 待核 | 待核 | 统一/联合建模 | 音质 | [口径收紧移出: TAVID音视频交互对话生成,对话/omni助手范畴,边界模糊倾向move] 评测局限 |
| SpidR: Learning Fast and Stable Linguistic Units for Spoken Language Models Without Supervision | 2512.20308 | arXiv-only | arXiv-only | LLM、自监督、蒸馏 | 待核 | 高效/轻量 | 音质、效率、速度 | [口径收紧移出: SpidR为spoken LM学语言学单元,属tokenization/基础设施] 评测局限 |

## 备注

### 枚举方法
- 通过 arXiv API (`export.arxiv.org/api/query`) 按 `cat:eess.AS AND submittedDate:[202507010000 TO 202512312359]` 枚举, `sortBy=submittedDate&sortOrder=ascending`, 每页 200, start 步进 200, 共 9 页 (200×8 + 72 = 1672)。
- 含 eess.AS 跨类目(cross-list)全部收录。HTTPS 强制; 方括号 URL 编码为 %5B/%5D。

### 限流
- arXiv API 对 export 端点有严格限流; 检索初期遭遇 HTTP 429 (Rate exceeded) 与 503 (维护页)。采用退避 30-70s 重试 + 直连/代理(127.0.0.1:7897)双通道 + 页间 8s 间距, 最终全量取回 1672 条, 无遗漏、无编造。

### 域内筛选与漏检风险
- 关键词驱动筛选: eess.AS 已是域内, 再按标题/摘要排除纯 ASR / 纯 TTS / 纯音乐 MIR / 纯声学事件场景检测 / 纯图像雷达通信水声生物医学 / 空间音频/ANC/DOA/房间声学/质量评估(非语音编创)。
- `wer`/`cer`/`asr`/`bat`/`engine` 等易子串误匹配词改用词边界正则, 避免误伤 (如 "answer"/"combat" 误判)。
- 漏检风险: ① 标题摘要未出现强子方向关键词的语音论文可能被归入边界或误排; ② "其他/边界(语音相邻)" 类含 talking-face/audio-LLM QA/语音健康 biomarker/ATCO 等边界选题, 已统一标注, 由读者复核。
- 已收录去重: 与 `papers-2025H2-2026/*.md` 中 688 个已核验 arXiv ID 集合比对, 命中即跳过不写入。

### comment 归属不确定性
- venue 由 `<arxiv:comment>` 正则匹配关键词归一化为 venue-year; 无 comment 或无 venue 关键词 → arXiv-only。
- 不确定性: ① 部分 comment 仅写 "Accepted to X" 无年份, 默认归 2025; ② Interspeech-2026/ICASSP-2025/ICASSP-2020/Interspeech-2017 等**不在覆盖清单**的年份一律归 "未覆盖venue"; ③ 同一 comment 同时含多 venue 时取首个命中;  TASLP/TSP/SPL/TMM 为期刊不绑年份, 命中即归 "补漏"。
- 覆盖清单(已扫 venue-year): ICASSP-2026, Interspeech-2025, NeurIPS-2025, ICML-2025, ICLR-2026, ACL-2025, EMNLP-2025, ACMMM-2025, VoicePrivacy-2025, CHiME-2025, ISMIR-2025, TASLP/TSP/SPL/TMM(2025H2-2026)。

### 覆盖率
- 域内(含边界) 882 / 枚举总数 1672 = 52.8%; 净新增 758 / 域内 882 = 85.9% (余 124 已被各 venue md 收录而跳过)。
