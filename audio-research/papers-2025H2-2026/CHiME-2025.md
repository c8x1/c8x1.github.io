# CHiME 2025

> 归属: 编创（3 篇） ｜ 口径见 [00-INDEX.md](00-INDEX.md)


检索日期 2026-06-25 | 论文数 3 | 范围: CHiME-9（第九届 CHiME 挑战赛，2025 年度）system descriptions + 数据集/基准论文。arXiv 已公开的全部收入。

> 版本说明: 用户前提称"CHiME challenge 2025 = Interspeech 2025 附设 workshop"。经官网核实，2025 年度的 CHiME 即 **CHiME-9**，但其 Workshop 并非 Interspeech 2025 附设——CHiME-9 Workshop 与 HSCMA 联合，作为 **ICASSP 2026（Barcelona, 2026-05-04）** 卫星活动举办。CHiME-9 设两个任务:
> - **Task 1 - MCoRec**（Multi-Modal Context-aware Recognition，多模态上下文感知识别）：单房间多并行对话的"鸡尾酒会"问题，需联合转录各说话人语音并聚类出会话分组，语音重叠率高达 100%。偏多说话人 ASR + 会话聚类。
> - **Task 2 - ECHI**（Enhancing Conversations to address Hearing Impairment，面向听力损伤的会话增强）：助听设备/智能眼镜在嘈杂餐厅中增强目标会话、抑制干扰语音与噪声，属**语音增强/分离**核心场景。
>
> 截至 2026-06-25，arXiv 上仅检索到 Task 1（MCoRec）的 3 篇论文（1 篇组织方数据集/基准 + 2 篇 system description）；**Task 2（ECHI）的 system description 尚未上 arXiv**（挑战仍在进行/Workshop 2026-05 才举办）。本表收录 arXiv 已核实的全部 3 篇。

## Task 1 - MCoRec（多模态上下文感知识别 / 多说话人重叠 ASR + 会话聚类）

| 论文 Title | arXiv ID | 技术点 | 场景 | 创新点 | 体验提升 | 局限性 |
|---|---|---|---|---|---|---|
| A Cocktail-Party Benchmark: Multi-Modal dataset and Comparative Evaluation Results | 2510.23276 | 多模态音视频数据集 + 鸡尾酒会基准评测（组织方论文） | 单房间多并行自然对话，2-8 说话人、最多 4 路并行会话，语音重叠最高 100%、会话轮次高度碎片化 | 提出 MCoRec 任务与数据集，统一回答"谁在何时说什么、与谁说"；引入音频+视觉+上下文多模态线索；建立多系统对比基准 | 为重叠会话识别/分离提供首个真实多模态基准与评测协议 | 偏 ASR+聚类评测，非纯增强/分离；任务定义仍依赖强标注 |
| The USTC-NERCSLIP Systems for the CHiME-9 MCoRec Challenge | 2603.01415 | 多模态级联系统（360° 视频逐说话人视觉流 + 单通道音频） | 室内社交场景多并行对话（最多 8 说话人/4 会话，重叠率>90%） | 从同步 360° 视频提取每说话人视觉流与单通道音频融合；改进三模块（说话人相关转录/会话聚类等） | 在高重叠多对话场景下提升转录与聚类精度 | 级联系统依赖视频质量与说话人定位；单通道音频鲁棒性受限 |
| BUT System Description for CHiME-9 MCoRec Challenge | 2604.27436 | 长上下文音视频（AV）ASR + 视觉线索消歧 + 会话聚类 | 严重重叠的并行会话音视频录制，需转录并聚类参与者到会话组 | 将视觉线索整合进长上下文 AV-ASR 以解决仅凭音频难分辨的目标说话人歧义；面向重叠并行会话的转录+聚类 | 提升多说话人重叠场景下目标说话人识别与转录 | 视觉整合到长上下文 AV-ASR 仍有限；高重叠下聚类误差仍存 |

## Task 2 - ECHI（面向听力损伤的会话增强）

> 截至 2026-06-25，arXiv 未检索到 ECHI 的 system description / 基准论文。该任务（助听设备+智能眼镜、实时低延迟、单通道增强、目标说话人保真、干扰语音/噪声抑制、含主观听音评测）是本挑战中**最贴合语音增强/分离**的子任务，论文预计随 ICASSP 2026 CHiME-9 Workshop（2026-05-04）前后陆续公开。建议后续重检。

## 备注

- **arXiv ID 反验**: 全部 3 个 ID 经 `https://arxiv.org/abs/<ID>` HTML abs 页核对标题完全一致，无编造。
  - 2510.23276 → "A Cocktail-Party Benchmark: Multi-Modal dataset and Comparative Evaluation Results" ✓
  - 2603.01415 → "The USTC-NERCSLIP Systems for the CHiME-9 MCoRec Challenge" ✓
  - 2604.27436 → "BUT System Description for CHiME-9 MCoRec Challenge" ✓
- **检索路径**: 官网 chimechallenge.org（确认 CHiME-9 = 2025 年度，Workshop 实为 ICASSP 2026 卫星活动，非 Interspeech 2025）；arXiv API `all:"CHiME-9"`、`ti:"CHiME-9"`、`all:"MCoRec"`、`ti:"MCoRec"`、`ti:"Cocktail-Party Benchmark"` 多组查询交叉去重；DBLP 检索 "chime 2025" 无 CHiME-9 专项条目（论文尚未入会议 proceedings）。
- **遗漏说明**: ECHI（Task 2）系统描述论文截至检索日未上 arXiv，本表无法收录，已在对应小节标注。MCoRec（Task 1）3 篇为 arXiv 已公开的全部。
- **范围边界**: MCoRec 本质是多说话人重叠 ASR + 会话聚类（鸡尾酒会问题），与语音分离/增强高度相关但非纯增强任务；按用户"全部保留"指令收入，并在表中标注其 ASR/聚类属性以免 scope 泄漏。
- **后续重检建议**: 2026-05 Workshop 举办后重检 ECHI system descriptions；关注 chimechallenge.org/ challenges/chime9/task2/results 页是否有 system description 清单。
