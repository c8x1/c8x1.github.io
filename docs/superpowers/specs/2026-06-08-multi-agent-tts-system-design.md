# Multi-Agent TTS 系统架构设计

日期：2026-06-08

## 1. 项目定位

本项目第一版定位为 **Agentic Audio Drama Director**：用户输入一段长文本，如话剧、小说章节或互动剧情片段，系统自动将其导演成分场景有声短剧。用户不需要理解或调节 TTS、音效、空间声、混音等音频参数，只需要提交文本、查看分场景成片说明，并通过自然语言提出返修意见。

项目重点不是重新训练 TTS 或音频生成模型，而是在 agent 趋势下构建一套 harness 工程：把部门已有成熟算法能力组织成可规划、可调用、可回听、可评估、可审计的自动声音导演系统。

## 2. MVP 目标与边界

MVP 目标：

1. 极简入口：长文本输入，一键生成。
2. 自动理解：识别场景、角色、旁白、对话、动作描写、情绪线索和环境线索。
3. 自动导演：为每个场景规划角色音色、情绪、语速、停顿、环境音、关键音效和空间感。
4. 分场景输出：每个场景有音频片段、导演摘要、角色说明、音效说明和空间说明。
5. 自然语言返修：用户可以说“第二场雨声弱一点”“女主更克制一些”，系统定位并局部重做。
6. 中台可观测：内部记录每个 agent 的输入、输出、模型或算法调用、质检结果和返修原因。

第一版不做：

- 不开放复杂参数面板。
- 不做完整 DAW 编辑器。
- 不做实时语音交互。
- 不从零训练 TTS、音效生成或空间声模型。
- 不做完整互动分支剧情 runtime，只处理单条文本线性成片。

核心成功标准是：用户感觉自己不是在使用单一 TTS 工具，而是在把文本交给一个自动化声音导演团队；内部团队则能看到 harness 如何把已有算法能力组织成可追溯的生产流程。

## 3. 总体架构

第一版采用 **Director Agent + Specialist Agents + Audio Algorithm Services** 三层结构。

### 3.1 Director Agent

Director Agent 是系统中枢，负责：

- 理解用户输入和作品目标。
- 维护全局 Project Manifest。
- 拆分任务并调度 specialist agents。
- 合并 Scene Manifest。
- 检查角色、情绪、音效、空间声之间的冲突。
- 控制自动返修轮数。
- 接收用户自然语言返修。
- 输出用户可读的分场景导演说明。

Director Agent 不直接合成音频，而是通过结构化 manifest 调用底层算法服务。

### 3.2 Specialist Agents

第一版只保留必要 specialist agents，避免一开始变成庞大的多 agent 平台。

**Script Analyst Agent**

分析长文本，拆分场景，识别角色、旁白、台词、动作描写、时间地点、环境线索和情绪线索。

**Casting & Voice Agent**

为角色分配 voice profile，包括年龄感、性别感、气质、语言风格和可用 voice id。它调用现有 TTS voice library 或 voice selection 能力，不负责训练新音色。

**Performance Director Agent**

规划台词和旁白的情绪、力度、语速、停顿、强调和非语言表达，如叹气、迟疑、压低声音。

**Sound Design Agent**

判断每个场景是否需要环境音和事件音效，如雨声、脚步、关门、远处人群。它调用现有音效生成或检索能力。

**Spatial Director Agent**

判断是否需要空间声，包括角色远近、左右位置、室内外混响、声源移动。第一版只做轻量空间规划，不做复杂 3D 场景编辑。

**Synthesis Router Agent**

把 manifest 转成底层算法调用。它负责模型或服务选择、参数映射、依赖顺序、超时、重试和资产登记。

**Revision Interpreter Agent**

解析用户自然语言返修，定位场景、角色、音效、空间或表演问题，并将其转成 manifest field changes。

**Audio Critic Agent**

对生成结果做自动质检，覆盖文本忠实、角色一致、情绪匹配、音效是否抢戏、空间是否合理、响度是否稳定和明显 artifact。低分项回到对应 agent 局部返修。

### 3.3 Audio Algorithm Services

底层接入部门已有算法能力：

- TTS / voice cloning / multi-speaker TTS。
- 音效生成或音效库检索。
- 空间声渲染 / reverb / panning / binaural。
- 混音 / loudness / mastering。
- ASR 或 forced alignment，用于检查文本忠实。
- 音频事件检测、说话人相似度、情绪识别等质检模型。

关键原则：agent 不替代算法，agent 负责编排算法。

## 4. 核心数据结构

第一版定义三类核心结构：Project Manifest、Scene Manifest、Execution Trace。

### 4.1 Project Manifest

Project Manifest 描述整部作品的全局设定。

```json
{
  "project_id": "audio_drama_001",
  "source_text": "...",
  "language": "zh-CN",
  "genre": "悬疑短剧",
  "global_style": {
    "narration_style": "冷静、克制",
    "production_intent": "沉浸式有声短剧",
    "quality_priority": "high_quality_offline"
  },
  "characters": [
    {
      "character_id": "char_hero",
      "name": "林舟",
      "role": "男主",
      "voice_profile": {
        "age_impression": "青年",
        "temperament": "疲惫、敏感、克制",
        "voice_id": "voice_male_low_03"
      },
      "consistency_constraints": [
        "同一角色跨场景保持音色稳定",
        "强情绪时不能明显漂移"
      ]
    }
  ],
  "scenes": ["scene_001", "scene_002"]
}
```

### 4.2 Scene Manifest

Scene Manifest 描述每个场景的可执行导演方案。

```json
{
  "scene_id": "scene_001",
  "title": "雨夜门外",
  "summary": "男主在雨夜回到旧宅，发现门内有陌生脚步声。",
  "setting": {
    "location": "旧宅门口",
    "time": "夜晚",
    "atmosphere": "潮湿、紧张、压抑"
  },
  "timeline": [
    {
      "event_id": "evt_001",
      "type": "ambience",
      "description": "持续雨声，较远的雷声",
      "intensity": "medium_low",
      "spatial": "wide_background"
    },
    {
      "event_id": "evt_002",
      "type": "speech",
      "speaker": "char_hero",
      "text": "有人在里面？",
      "performance": {
        "emotion": "警觉、压低声音",
        "speed": "slow",
        "pause_before_ms": 600,
        "style_tags": ["whisper_like", "tense"]
      },
      "spatial": {
        "position": "center_close",
        "reverb": "outdoor_light"
      }
    }
  ],
  "quality_targets": {
    "text_fidelity": "strict",
    "voice_consistency": "strict",
    "ambience_intrusion": "low",
    "loudness_target": "-16 LUFS"
  }
}
```

### 4.3 Execution Trace

Execution Trace 记录 agent 和算法调用过程，用于解释、调试和返修。

```json
{
  "trace_id": "trace_scene_001_v2",
  "scene_id": "scene_001",
  "revision": 2,
  "steps": [
    {
      "agent": "Sound Design Agent",
      "decision": "降低雨声强度",
      "reason": "用户反馈雨声抢对白",
      "changed_fields": ["timeline.evt_001.intensity"]
    },
    {
      "service": "ambience_generator",
      "input_manifest_hash": "...",
      "output_asset": "rain_scene_001_v2.wav",
      "status": "success"
    }
  ],
  "critic_scores": {
    "text_fidelity": 0.96,
    "voice_consistency": 0.91,
    "ambience_balance": 0.88,
    "overall": 0.90
  }
}
```

这三个结构的职责分别是：

- Project Manifest 保证角色和全局风格不乱。
- Scene Manifest 让每个场景可生成、可解释、可局部修改。
- Execution Trace 让 harness 工程可观测，并让自然语言返修能落到具体字段和具体音频资产。

## 5. 首次生成流程

1. 用户提交长文本。可选填写作品类型，如小说、话剧、短剧。
2. Director Agent 建立项目目标，判断语言、体裁、叙事结构和生成策略，创建初版 Project Manifest。
3. Script Analyst Agent 拆分场景，输出场景列表、角色表、旁白/对白区分、动作描写、环境线索和情绪线索。
4. Casting & Voice Agent 为主要角色和旁白选择 voice profile。
5. Performance Director Agent、Sound Design Agent、Spatial Director Agent 对每个场景并行生成表演、音效和空间方案。
6. Director Agent 合并方案并做冲突检查，例如音效过密、空间设计不符合场景、角色情绪跨场景突变。
7. Synthesis Router Agent 按依赖顺序调用底层服务：对白/旁白 TTS、音效/环境音、空间声渲染、场景混音、loudness。
8. Audio Critic Agent 质检。必要时触发 1-2 轮自动局部返修。
9. 系统输出完整音频、分场景音频、每个场景的导演摘要、角色说明、音效/空间说明和已知问题。

## 6. 自然语言返修流程

用户输入示例：

> 第二场雨声太大，女主不要那么激动，像是在强装镇定。

系统处理步骤：

1. Revision Interpreter Agent 解析返修意图，定位 scene_002，识别变更对象为雨声强度和女主表演情绪。
2. Director Agent 更新 manifest，例如将 ambience intensity 从 medium 调为 low，将女主 emotion 从 panic 调为 restrained_anxiety。
3. Rendering Pipeline 只重做受影响的 TTS 片段、雨声轨道和该场景混音，不重做其他场景。
4. Audio Critic Agent 局部复检，确认返修是否满足用户意图，同时检查对白清晰度、角色一致性和响度是否被破坏。
5. 系统保存 scene_002_v2，并在 trace 中记录用户反馈、字段变化、重生成资产和质检结果。

第一版返修限制：

- 支持按场景、角色、音效、空间感的自然语言修改。
- 不支持用户手动拖时间线。
- 不支持细到毫秒级剪辑。
- 不做多分支剧情编辑。
- 每次返修默认影响最小范围，避免整片漂移。

## 7. 模块拆解

### 7.1 Minimal Web App

界面保持简单：

- 长文本输入区。
- 生成按钮。
- 生成进度。
- 分场景结果列表。
- 每个场景的音频播放器和导演摘要。
- 自然语言返修输入框。
- 完整成片播放器。
- 后台 trace/debug 入口，仅内部可见。

### 7.2 Project & Scene Manifest Store

负责保存：

- 原始文本。
- Project Manifest。
- Scene Manifest。
- 音频资产路径。
- 版本历史。
- Execution Trace。

第一版可以使用数据库或简单对象存储，重点是 schema 稳定。

### 7.3 Director Orchestrator

核心 harness 模块，负责：

- 创建 project。
- 调用各 specialist agents。
- 合并 manifest。
- 处理冲突。
- 管理状态机。
- 决定哪些步骤并行。
- 控制自动返修轮数。
- 接收用户自然语言返修。

### 7.4 Specialist Agent Layer

实现必要 agent：

- Script Analyst Agent。
- Casting & Voice Agent。
- Performance Director Agent。
- Sound Design Agent。
- Spatial Director Agent。
- Revision Interpreter Agent。
- Audio Critic Agent。

这些 agent 的输出必须是结构化 JSON，不允许只返回自由文本。

### 7.5 Algorithm Service Adapters

将部门成熟算法包装成统一接口：

```text
tts.generate_speech(manifest)
sfx.generate_or_retrieve(event_manifest)
spatial.render(asset, spatial_manifest)
mix.render(scene_tracks, mix_manifest)
qc.evaluate(audio, scene_manifest)
```

每个 adapter 负责参数映射、错误转换、超时、重试和资产登记。

### 7.6 Rendering Pipeline

负责音频生产顺序：

- 台词/旁白生成。
- 环境音和事件音生成。
- 空间化处理。
- 场景混音。
- 全片拼接。
- loudness 统一。
- 导出 wav/mp3。

第一版按 scene 粒度处理，便于局部返修。

### 7.7 Observability & Evaluation

内部可观测能力包括：

- 每个 agent 输入输出。
- 每次算法调用参数。
- 生成耗时。
- 失败原因。
- critic scores。
- 用户返修原因。
- scene version diff。
- 最终质量报告。

这是 harness 项目的说服力来源，不应等到后期补。

## 8. 任务分解计划

**Phase 0：能力盘点**

整理可用 TTS、音效、空间声、混音、QC 服务接口，明确输入输出、延迟、资产格式和限制。

**Phase 1：Manifest 与 Orchestrator 原型**

先不接真实算法，用 mock audio 或示例资产打通 project -> scene -> trace -> result。

**Phase 2：接入 TTS 与分场景输出**

完成文本拆分、角色 casting、TTS 生成、分场景播放器和基础成片拼接。

**Phase 3：接入音效与空间声**

让 Sound Design Agent 和 Spatial Director Agent 写入 manifest，并通过 adapter 生成、检索或渲染音频资产。

**Phase 4：Audio Critic 与自动返修**

上线文本忠实、角色一致、混音响度、音效抢戏等基础检查，并支持内部自动局部返修。

**Phase 5：自然语言局部返修**

支持用户对场景、角色表现、音效和空间感提出返修，系统定位并局部重生成。

**Phase 6：内部评测与 demo 固化**

用 10-20 段话剧/小说样本评测成片质量、返修成功率和生成耗时，沉淀 demo、报告和后续 roadmap。

## 9. 质量指标

第一版建议使用五类指标判断是否做成：

**文本理解质量**

场景拆分是否合理、角色识别是否正确、旁白/对白是否区分准确。

**导演决策质量**

角色音色是否贴合文本，情绪是否自然，音效和空间声是否有必要且不抢戏。

**音频生成质量**

TTS 自然度、角色一致性、文本忠实度、音效质量、混音响度、空间感合理性。

**返修成功率**

用户自然语言返修是否能定位正确场景和对象，局部重做后是否明显改善。

**Harness 可观测性**

每个结果是否能追溯到 manifest、agent 决策、算法调用和 critic 评分。

可量化 MVP 目标：

- 支持 5k-20k 中文长文本。
- 主要角色识别准确率目标：人工评估 85% 以上。
- 场景级生成支持并行。
- 单场景返修只影响该场景资产。
- 每个场景至少产出音频、摘要、角色表演说明、音效说明、空间说明和 critic 分数。
- 自动 critic 至少覆盖文本忠实、响度、角色一致、音效覆盖/抢戏四类。
- 支持 10-20 条内部 benchmark 文本集回归测试。

## 10. 风险与应对

**文本改编过度**

Agent 可能为了戏剧性改写原文。应对方式：manifest 标记 `text_fidelity: strict/loose`，对白默认 strict，旁白可轻微口语化但必须记录。

**角色音色漂移**

情绪变化或多场景生成可能导致角色不像同一个人。应对方式：voice profile 固定，critic 检查 speaker similarity，返修时优先保护 identity。

**音效过度生成**

多 agent 容易“加戏”，环境音和事件音可能抢对白。应对方式：Sound Design Agent 默认保守，Critic 检查对白清晰度和音效 intrusion。

**空间声变成噱头**

不该空间化的内容强行空间化会显得廉价。应对方式：Spatial Director 只有在文本有空间线索或体验收益明显时启用。

**底层算法接口不统一**

不同团队算法输入输出风格不同。应对方式：adapter 层统一 manifest schema、错误码、资产登记和调用日志。

**返修定位失败**

用户说“前面那段”“她那句话”可能模糊。应对方式：Revision Interpreter 先做最佳定位，低置信度时向用户展示候选场景，避免盲改。

## 11. 渐进路线图

**V1：离线一键有声短剧**

长文本输入、分场景导演、TTS、基础音效、基础空间声、分场景播放、trace。

**V1.5：自然语言返修**

支持场景级局部重生成、版本历史、critic 对比、返修原因记录。

**V2：更强创作控制**

加入模板风格，如悬疑、广播剧、儿童故事、互动游戏旁白；支持用户选择“更电影化”“更克制”“更广播剧”等高层风格。

**V3：轻量互动剧情**

支持分支剧情、角色记忆、玩家状态驱动的台词与声景变化。

**V4：实时/半实时 voice drama agent**

把离线导演系统的一部分迁移到低延迟链路，支持 NPC、客服、陪伴等实时交互。

## 12. 第一版验收定义

第一版完成时，应能演示以下闭环：

1. 输入一段 5k-20k 中文小说或话剧文本。
2. 系统自动拆分场景并识别主要角色。
3. 系统为每个场景生成导演方案和分场景音频。
4. 系统输出完整成片和每个场景的可读说明。
5. 用户用自然语言提出至少一条返修意见。
6. 系统定位到对应场景和 manifest 字段，并只局部重生成相关资产。
7. 内部 trace 能展示 agent 决策、算法调用、版本变化和 critic 结果。

这套 MVP 的目标不是证明单个模型最强，而是证明 multi-agent harness 可以把已有音频算法能力变成更自然、更可控、更可解释的用户体验。
