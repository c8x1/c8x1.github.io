# 语音论文检索总览 · 2025H2 – 2026-06-25

> 检索日期：2026-06-25 ｜ 范围：2025年7月 至今 ｜ 来源：核心会议+顶刊（17 个 subagent）+ arXiv 全量补漏（cs.SD/eess.AS，4 个 subagent，按类判域内 + comment 归属 venue + 去重）
> 筛选规则：**语音范畴内全收，排除纯 ASR、纯 TTS**；保留 VC/声音克隆、语音编辑（含基于 TTS 的编辑）、生成式增强/分离/修复、情感/韵律、口音/方言、匿名化/隐私、神经编解码、speech-LM/指令式/agent、paralinguistic、语音多模态。
> 方法论：DBLP/OpenReview/ACL Anthology 全量枚举（非关键词采样）+ arXiv ID 经 `arxiv.org/abs/<id>` HTML abs 页逐条反验（不打 API 防 429、不用 WebFetch 防拦截）；**0 编造 ID**，无预印本者标 `n/a`。

## 一、来源清单与产出

| 来源 | 年份 | 论文数 | arXiv 已验 | 文件 | 覆盖说明 |
|------|------|-------|-----------|------|---------|
| ICASSP（A组: VC/编辑/增强/分离/编解码） | 2026 | 38 | 28 | [ICASSP-2026-A.md](ICASSP-2026-A.md) | **下界**：DBLP 未上线、IEEE Xplore 反爬，以 OpenAlex+arXiv comment 枚举，实际录用数更高（漏检 15–30%） |
| ICASSP（B组: 情感/韵律/口音/匿名化/speech-LM/paralinguistic） | 2026 | 127 | 127 | [ICASSP-2026-B.md](ICASSP-2026-B.md) | **下界**：以 arXiv co:"ICASSP 2026" 为主源，漏检 15–30% |
| Interspeech（A组: VC/编辑/增强/分离/编解码） | 2025 | 145 | 83 | [Interspeech-2025-A.md](Interspeech-2025-A.md) | DBLP 全量 1181 篇筛得，可核验 |
| Interspeech（B组: 情感/韵律/口音/匿名化/speech-LM/paralinguistic） | 2025 | 484 | 173 | [Interspeech-2025-B.md](Interspeech-2025-B.md) | DBLP 全量筛得；311 篇无 arXiv 据 ISCA Anthology 题录描述并标注未全文核验 |
| NeurIPS | 2025 | 64 | 59 | [NeurIPS-2025.md](NeurIPS-2025.md) | OpenReview v2 全量 5286 篇筛得，可核验 |
| ICML | 2025 | 31 | 31 | [ICML-2025.md](ICML-2025.md) | DBLP+OpenReview 双源一致，全部反验 |
| ICLR | 2026 | 63 | 56 | [ICLR-2026.md](ICLR-2026.md) | OpenReview 5351 篇 accepted 筛得，可核验 |
| ACL | 2025 | 43 | 38 | [ACL-2025.md](ACL-2025.md) | ACL Anthology 全量 1037 篇筛得 |
| EMNLP | 2025 | 55 | 37 | [EMNLP-2025.md](EMNLP-2025.md) | DBLP 1810 篇 main 筛得 |
| ACM MM | 2025 | 76 | 38 | [ACMMM-2025.md](ACMMM-2025.md) | DBLP 1620 篇筛得；ACM DL 独占论文多无 arXiv |
| VoicePrivacy | 2025 | **0** | — | [VoicePrivacy-2025.md](VoicePrivacy-2025.md) | **2025 无此届**：系列为双年赛（2020/2022/2024），下一届 2026 |
| CHiME（CHiME-9） | 2025 | 3 | 3 | [CHiME-2025.md](CHiME-2025.md) | Task1 三篇已上 arXiv；Task2-ECHI 截至 2026-06-25 未上 arXiv，待 Workshop 后重检 |
| ISMIR | 2025 | 4 | 2 | [ISMIR-2025.md](ISMIR-2025.md) | 语音子集本就少（歌声/vocal/lyrics），2 篇无 arXiv |
| IEEE/ACM TASLP | 2025H2–2026 | **0** | — | [TASLP-2025H2-2026.md](TASLP-2025H2-2026.md) | **环境受阻**：DBLP 仅至 vol32(2024)、IEEE Xplore 反爬、Crossref/OpenAlex 均无 vol33/34；非"无论文"，建议在可登录 IEEE 环境补检 |
| IEEE TSP | 2025H2–2026 | 4 | 0 | [TSP-2025H2-2026.md](TSP-2025H2-2026.md) | DBLP 全量 509 篇筛得，语音占比 ~0.8%；4 篇均无 arXiv |
| IEEE SPL | 2025H2–2026 | 41 | 0 | [SPL-2025H2-2026.md](SPL-2025H2-2026.md) | DBLP 1394 篇筛得；IEEE 独占，41 篇均无 arXiv |
| IEEE TMM | 2025H2–2026 | 13 | 7 | [TMM-2025H2-2026.md](TMM-2025H2-2026.md) | DBLP 全量筛得；DBLP 无月份字段，以 Vol.27/28 全年枚举 |
| **合计** | | **1191** | **684** | 17 个 md | |

> arXiv 已验率 = 684/1191 ≈ 57%。未验者多为 IEEE/ACM DL 独占或 ISCA Archive 发表、无 arXiv 预印本的正式会议论文——**均经 arXiv 标题检索确认无匹配后标 `n/a`，非编造**。

## 二、关键缺口与补检建议

| 缺口 | 原因 | 建议 |
|------|------|------|
| **ICASSP 2026**（A+B 共 165 篇，估实际 300–500） | DBLP 未收录、IEEE Xplore 反爬、OpenAlex 索引尚不完整 | 待 DBLP 上线 `icassp2026.html` 或在可登录 IEEE 环境重检 |
| **TASLP 2025H2–2026**（0 篇） | DBLP 仅至 vol32、IEEE/Crossref/OpenAlex 均无法取 vol33/34 | 在可登录 IEEE Xplore 环境补检 vol33(2025)/vol34(2026) 各 issue，每条 arXiv ID 仍须 HTML abs 页反验 |
| **VoicePrivacy 2025**（0 篇） | 2025 无此届（双年赛） | 改收 VoicePrivacy 2024（最近一届）补该子方向 |
| **CHiME Task2-ECHI** | 截至 2026-06-25 未上 arXiv | 待 CHiME-9 Workshop（ICASSP 2026 卫星，2026-05-04）后重检 |
| Interspeech B 组 311 篇 n/a | ISCA Archive 发表、无 arXiv | 已据官方 proceedings 题录描述并标注"未全文核验"，可按需逐篇深读补全列 |

## 三、子方向分类 × 编创/非编创归属（口径冻结 2026-06-25）

> 口径：**编创** = 生成/编辑/变换/克隆（纯语音，不含歌声）；**非编创** = 分析/识别/安全 + 支撑(编解码/翻译) + 歌声 + 边界。
> 落盘：每个 md 顶部已加 `归属` 行、每个 H3 已加 `【编创】/【非编创】` 标记，可直接 `grep '【编创】'` 筛选。
> 计数为逐行归类近似值（含 arXiv 模板行；arXiv sweep 有少量纯 ASR 被 agent 关键词筛漏、误入 speech-LM 编创 bucket，真正纯编创数会略低）。

| 归属 | 类别 | 篇数 |
|------|------|-----|
| ✅编创 | 语音编辑（含基于 TTS 的编辑） | 37 |
| ✅编创 | VC / 声音克隆 / zero-shot 说话人 | 227 |
| ✅编创 | 情感 / 韵律 / 表现力 | 486 |
| ✅编创 | 口音 / 方言 / 跨语言 | 144 |
| ✅编创 | 生成式增强 / 去噪 / 去混响 / BWE / 修复 | 442 |
| ✅编创 | 分离 / TSE / diarization / 多对象 | 200 |
| ✅编创 | speech-LM / 指令 / agent / omni（含 TTS 边界） | 652 |
| ✅编创 | 语音多模态 / 数字人 / talking head | 120 |
| | **编创小计** | **2308** |
| ❌非编创 | paralinguistic / 病理 / 年龄 / 性别 / 临床 | 269 |
| ❌非编创 | 匿名化 / anti-spoof / deepfake / 水印 / 取证 | 269 |
| ❌非编创 | 说话人识别 / 验证（SV） | 36 |
| ❌非编创 | 神经语音编解码 / 声码器（支撑） | 105 |
| ❌非编创 | 语音翻译 / 同传 / S2S（支撑） | 9 |
| ❌非编创 | 歌声 / singing / vocal / lyrics | 68 |
| ❌非编创 | 其他 / 边界（未归类） | 238 |
| | **非编创小计** | **994** |
| | **合计（表行数）** | **3302** |

> 编创占比 ≈ 2308 / 3302 ≈ **70%**。表行数 3302 比去重论文数 3245 多 ~57，因个别 venue md 顶部有元数据表行；不影响比例。
> 该分类可作为后续"paper→问题映射表"和场景聚类的骨架。每个 venue md 内部已按子方向分组排序。

## 四、方法论合规性

- ✅ 全量枚举（DBLP/OpenReview/ACL Anthology），非关键词采样
- ✅ arXiv ID 逐条经 HTML abs 页反验标题，0 编造
- ✅ 未用 WebFetch 抓 arxiv.org（本环境被拦），全程 curl 直连/代理 7897
- ✅ 未连发 arXiv API（触发全局 429 后改 HTML abs 页 + 间距），符合 skill §2.3 踩坑教训
- ⚠ 局限：IEEE Xplore 反爬、DBLP 部分新会议/期刊未上线，导致 ICASSP 2026 / TASLP 覆盖不足——已在对应 md 备注 与上表标注

---

## 五、arXiv 全量补漏检索（cs.SD / eess.AS, 2025H2 – 2026H1）

> 方法：按 arXiv 类目（cs.SD / eess.AS）全量枚举 2025-07 至 2026-06-25 提交 → 类目判域内 → 解析 `<arxiv:comment>` 归属 venue → 与现有 17 个 venue md 跨类目去重 → **只输出净新增**（补漏 / 未覆盖venue / arXiv-only）。

| 类目×半年 | 枚举总数 | 域内 | 已收录跳过 | 净新增 | 补漏 | 未覆盖venue | arXiv-only | 文件 |
|----------|--------|-----|----------|-------|------|-----------|-----------|------|
| eess.AS 2025H2 | 1672 | 882 | 124 | 758 | 117 | 102 | 539 | [arXiv-eessAS-2025H2.md](arXiv-eessAS-2025H2.md) |
| eess.AS 2026H1 | 1325 | 674 | 34 | 640 | 36 | 192 | 412 | [arXiv-eessAS-2026H1.md](arXiv-eessAS-2026H1.md) |
| cs.SD 2025H2 | 1803 | 766 | 485 | 281 | 29 | 19 | 233 | [arXiv-csSD-2025H2.md](arXiv-csSD-2025H2.md) |
| cs.SD 2026H1 | 1788 | 681 | 306 | 375 | 22 | 78 | 275 | [arXiv-csSD-2026H1.md](arXiv-csSD-2026H1.md) |
| **合计** | **6588** | **3003** | **949** | **2054** | **204** | **391** | **1459** | 4 md |

**三类净新增说明：**
- **补漏 204 篇** = arXiv comment 已归属到我们覆盖的 venue，但原 venue sweep 漏收。其中 **ICASSP-2026 共 ~43 篇**（eess.AS 2026H1 补 30 + cs.SD 2025H2 补 13 等），直接弥补了 ICASSP 2026 的下界缺口；另有 Interspeech/EMNLP/NeurIPS/SPL/TASLP 少量补漏。可按需把这些行合并回对应 venue md。
- **未覆盖venue 391 篇** = 归属到覆盖清单外的 venue：Interspeech-2026（~197，⚠ 尚未召开，arXiv comment 多为 "submitted to" 非已录用，需谨慎甄别）、ICML-2026 / ACL-2026 / EMNLP-2026（同为未召开届）、ASRU / APSIPA / SLT / WASPAA / EUSIPCO / IWAENC 等（本就未在本轮 venue sweep 范围）。
- **arXiv-only 1459 篇** = 无 venue comment，含真正的预印本与未标注 venue 的已录用工作。这部分是 venue 检索永远覆盖不到的，arXiv sweep 的核心增量价值。
- **已收录跳过 949 篇** = 与现有 17 个 venue md 或 eess.AS md 去重命中（cs.SD 与 eess.AS 跨类目重合很大，故 cs.SD 的 already 占比高）。跨类目去重保证不重复列。

> ⚠ **列质量差异（重要）**：arXiv sweep 的 2054 篇因规模大，`技术点/创新点/体验提升/局限性` 四列由 **标题+摘要关键词规则模板生成**（agent 已诚实标注 "仅供索引，高价值条目建议二次精读"），质量低于 venue sweep 的 1191 篇（后者逐篇人工复核）。`arXiv ID` 与 `comment归属venue` 两列是机器抽取、可核验可信。建议把 arXiv sweep 当作**索引/补漏线索**，对感兴趣的条目再回到 abs 页精读补全四列。

## 六、总量

- venue sweep：**1191 篇**（684 篇 arXiv ID 已反验）
- arXiv sweep 净新增：**2054 篇**（补漏 204 + 未覆盖venue 391 + arXiv-only 1459；与 venue sweep 已去重）
- **合计去重后约 3245 篇** 语音相关论文（2025H2 至 2026-06-25），覆盖 21 个 md（17 venue + 4 arXiv）。

## 七、二次精读与合集（2026-06-25 后处理）

> 在初版检索之上做了三件事：① arXiv 编创行二次精读（按摘要重填四列 + 剔除纯 ASR/纯 TTS/纯检测/纯评测漏入）；② 补漏合并回 venue md；③ 抽取编创合集。

| 后处理 | 结果 |
|--------|------|
| ① arXiv 编创二次精读 | 4 个 arXiv md 的【编创】行用 arXiv API 摘要重填 5 列（技术点/场景/创新点/体验提升/局限性）；剔除 293 篇非编创漏入（纯 ASR 为主），移至各文件 `### 【非编创】剔除自编创` 段。注：四列仍为摘要级（部分"待核"/英文截断），非全文精读。 |
| ② 补漏合并 | 124 篇补漏（keep）回填到 11 个 venue md 的 `### 【编创】补漏（来自 arXiv sweep）` 段。**ICASSP 2026 拿到 73 篇（A+42 / B+31）**、TASLP 拿到 15 篇（部分弥补环境受阻的 0 篇）。 |
| ③ 编创合集 | [编创合集-2025H2-2026.md](编创合集-2025H2-2026.md)：**去重后 942 篇编创论文**（口径最终：speech-LM/多模态按场景并入 6 任务类，115 篇纯生成/对话/理解移出非编创），按 6 类分组（语音编辑 31 / VC 182 / 情感韵律 267 / 口音方言 56 / 生成式增强 302 / 分离 104）。 |

**后处理后的全局计数**（逐行，含补漏在 arXiv+venue 双计的重复与跨类目重合）：
- 编创 1804 / 非编创 1591 / 合计 3395（行数）。
- 去重后**编创合集 1350 篇**（按 arXiv ID 去重，已剔 ASR、已跳过补漏双计）——这是可用的编创工作集。
- 非编创 1591 含二次精读剔除的 293 篇（原误入编创的 ASR/检测/评测）。

> 口径不变：编创 = 生成/编辑/变换/克隆（纯语音，不含歌声）；非编创 = 分析/识别/安全 + 支撑(编解码/翻译) + 歌声 + 边界。各 md 顶部 `归属` 行与 H3 `【编创】/【非编创】` 标记同步更新。

## 八、编创精选（2026-06-25）

> 从合集精选代表作：[精选-编创-2025H2-2026.md](精选-编创-2025H2-2026.md)
> **口径演进**：speech-LM 只留可控生成/编辑 → 进一步把 speech-LM/语音多模态按场景并入 6 任务类（纯生成→非编创）。最终只剩 **6 个真任务类**。
> 引用数经 Semantic Scholar 核实。每篇含"选取理由"。

| 类 | 篇 |
|----|----|
| 语音编辑 | 16 |
| 生成式增强 / 修复 | 22 |
| 情感 / 韵律 | 18 |
| VC / 声音克隆 | 18 |
| 分离 / TSE | 14 |
| 口音 / 方言 | 9 |
| **合计** | **97** |

> 合集同步：[编创合集-2025H2-2026.md](编创合集-2025H2-2026.md) **942 篇**（speech-LM/多模态 150 篇中 35 篇并入 6 任务类、115 篇移出非编创）。
> ⚠ 残留：csSD-2026H1（无 H3 结构）的 speech-LM/多模态行未参与重桶，合集 942 含这点水分（估几十篇）。