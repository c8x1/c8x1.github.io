# ISMIR 2025 (语音相关子集: 歌声/vocal/lyrics)

> 归属: 混合（编创 11 / 非编创 1） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


> 检索日期 2026-06-25 | 论文数 4 | 范围: ISMIR 2025 (Daejeon, South Korea, 2025-09-21~25) 全量枚举 100 篇 (DBLP) 后筛语音相关子集。仅保留歌声(singing voice)分离/合成/转换、vocal extraction、lyrics 处理、speech-music 相关; 排除纯器乐、纯音乐 MIR、音乐理论。

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| AI-Generated Song Detection via Lyrics Transcripts | 2506.18488 | 用通用 ASR (Whisper large-v2) 转写歌曲歌词→文本表示→应用 AI 生成文本检测 (LLM2Vec 嵌入); 对抗音频扰动鲁棒 | AI 生成歌曲检测 (deepfake 鉴伪) | 用 ASR 转写得到歌词而非依赖完美歌词库, 填补"仅有音频"真实场景缺口; 对多生成器/多语种/多曲风泛化; 扰动下优于 SOTA 音频检测器 | 无需歌词数据库即可检测 AI 歌曲, 实际可用性大幅提升 | 依赖 ASR 转写质量; 歌词不可靠转写时性能下降; 多语种间表现不均 |
| IdolSongsJp Corpus: A Multi-Singer Song Corpus in the Style of Japanese Idol Groups | 2507.01349 | 多歌手歌曲语料库: 委约专业作曲家创作 15 首日系偶像风格曲目, 含 master 音轨 + 分轨 stem + 干声 vocal + 和弦标注 | 数据集 / singer diarization、歌声分离、和弦估计基准 | 针对偶像团体"utawari"(独唱/合唱交替)结构与高响度复杂 mastering 构建专门基准; 同时含分离 stem 与干声 | 为多歌手交替演唱场景提供评测基准, 覆盖真实偶像曲风挑战 | 仅 15 首、委托创作非真实偶像录音; 规模有限; 风格聚焦日系 |
| Leveraging Carnatic live recordings for singing voice separation using regression-guided latent diffusion | n/a | 基于分数的 latent diffusion 模型做弱监督歌声分离; 预训练扩散模型对 Carnatic 混音做初步人声分离→单独训练回归器估计"串扰/bleeding"程度→引导扩散生成更干净样本 | 弱监督歌声分离 (live 录音、跨源串扰) | 不依赖干净多轨数据 (现场录音天然有源间串扰); 用 out-of-domain 小干净集训练回归器量化 bleeding 并反向引导扩散; latent 空间计算高效 | 为缺乏干净多轨的曲种(Carnatic 印度古典)提供可用分离方案, 低算力可训 | 引入 artifacts; 弱监督分离质量上限受串扰估计精度制约; 泛化到其它曲种未验证 |
| Tuning Matters: Analyzing Musical Tuning Bias in Neural Vocoders | n/a | 评估多款神经 mel-to-audio vocoder 在非标准音律(非 440Hz 等比)下的偏差; 用钢琴/小提琴/歌声录音测试 | 神经 vocoder 鲁棒性 / 歌声波形重建 | 揭示不同神经 vocoder 对 musical tuning 存在系统性偏差, 非标准定调下波形重建质量退化; 含歌声录音评测 | 指出 vocoder 在歌声/非标准定调下的缺陷, 为未来鲁棒 vocoder 提供改进方向 | 聚焦西方音乐 tuning 体系; 偏诊断性, 未提出改进模型; 评测数据有限 |
### 【非编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| MIDI-VALLE: Improving Expressive Piano Performance Synthesis Through Neural Codec Language Modelling | 2507.08530 | 编解码、LLM | tts、text-to-speech、codec | 零样本泛化 | 音质、鲁棒性、表现力 | 评测局限 |
| Latent Granular Resynthesis using Neural Audio Codecs | 2507.19202 | 编解码 | codec | 新方法/统一框架 | 待核 | 待核 |
### 【编创】补漏（来自 arXiv sweep，二次精读已填列）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| MIDI-VALLE: Improving Expressive Piano Performance Synthesis Through Neural Codec Language Modelling | 2507.08530 | 编解码、LLM | tts、text-to-speech、codec | 零样本泛化 | 音质、鲁棒性、表现力 | 评测局限 |
| Latent Granular Resynthesis using Neural Audio Codecs | 2507.19202 | 编解码 | codec | 新方法/统一框架 | 待核 | 待核 |

## 备注

- ISMIR (International Society for Music Information Retrieval) 主体是**音乐**信息检索, 语音相关子集本身较少。本年度 100 篇 (DBLP 全量枚举) 中, 严格语音相关 (歌声/vocal/lyrics/speech-music) 仅筛出 4 篇。
- 排除的"伪相关": 含 song/voice 字样但实为器乐或音乐理论的论文, 如 "When Voices Interleave"(solo flute 器乐演奏计时分析)、"Simple and Effective Semantic Song Segmentation"(歌曲结构分割, 非人声)、"The Florence Price Art Song Dataset"(钢琴伴奏艺术歌曲, 器乐为主)、"What song now?"(节奏吉他学习)、"HAISP songwriting"(歌曲创作影响分析) 等均不计入。
- "Melodic and Metrical Elements of Expressiveness in Hindustani Vocal Music" 虽含 Vocal, 但属音乐学/表演分析而非 DSP/ML 技术工作, 不计入。
- arXiv ID 反验: ISMIR 2025 论文以 Zenodo 开放获取 DOI 为主, 多数无 arXiv 版本。本表 4 篇中 2 篇经 arXiv HTML abs 页反验标题完全匹配 (2506.18488、2507.01349); 另 2 篇 (Carnatic 歌声分离、Tuning Matters/Vocoders) 在 arXiv 检索无果, 标 "n/a", 绝不编造。
- 检索入口: DBLP (`dblp.org/db/conf/ismir/ismir2025.html`) 全量枚举 100 篇 + Zenodo API 取摘要补充技术点 + arXiv API/HTML abs 页反验 ID。
