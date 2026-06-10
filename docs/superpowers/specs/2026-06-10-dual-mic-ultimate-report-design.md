# 双路麦克风时延对齐 — 终极版调研报告设计

## 概述

将三份独立的深度调研报告（`dual_mic_alignment_report.html`、`dual-channel-audio-delay-alignment-report.html`、`dual-mic-active-calibration-report.html`）合并为一份去重、整合、重新设计的终极版 HTML 报告。

**目标**：精华浓缩版，保留核心公式和代码，删除冗余描述，每章有快速结论。预估 85-95KB。

## 视觉设计

### 色彩系统

| 用途 | 色值 | 说明 |
|------|------|------|
| 背景 | `#fafaf7` | 暖白，减少眼疲劳 |
| 卡片 | `#ffffff` | 纯白 + 轻微阴影 |
| 主色 | `#1e40af` | 深蓝，标题和强调 |
| 辅色 | `#059669` | 翠绿，推荐/成功 |
| 警示 | `#d97706` | 琥珀色 |
| 危险 | `#dc2626` | 红色 |
| 代码背景 | `#1e293b` | 暗色底 |
| 文本 | `#1f2937` | 深灰 |
| 次要文本 | `#6b7280` | 中灰 |
| 边框 | `#e5e7eb` | 浅灰 |

### 排版

- 标题：Inter / system-ui，font-weight 700-800
- 正文：15px / line-height 1.75
- 代码：SF Mono / JetBrains Mono / Consolas
- 中文回退：PingFang SC / Noto Sans SC
- 最大内容宽度：1120px 居中

### 布局

- 顶部 sticky 导航条（毛玻璃背景 `backdrop-filter: blur(10px)`）
- 每章开头"⚡快速结论"卡片（浅绿底 + 左边框）
- 响应式：768px 断点以下单列
- 打印友好：`@media print` 切换黑白、去阴影

### 组件库

1. **KPI 卡片** — 渐变大卡片网格（2 列主卡 + 2 列副卡），用于一页结论
2. **评分卡片** — 稳定性/体验/复杂度条形图，用于方案对比
3. **对比表** — 斑马纹 + 推荐行高亮 + 响应式横滚
4. **Callout** — info/warn/danger/success 四色，左侧 4px 边条
5. **公式块** — 浅黄底 + 虚线边框 + 等宽字体
6. **代码块** — 暗色底 + CSS 语法高亮色（无 JS 依赖）
7. **ASCII 图表** — 等宽字体 + 浅灰底框
8. **Phase 时间线** — 左侧渐变竖线 + 圆点标记
9. **审查徽章** — 小胶囊标签（green/orange/red/blue）
10. **流程步骤** — 5 步横排卡片（Report 3 的 flow-step 风格）

## 内容架构

### 第 1 章：一页结论

- 来源：Report 3 KPI 卡片 + Report 1 摘要
- 组件：4 格 KPI 仪表板（首选 MVP / 最稳 Fallback / 高级探索 / 验收指标）
- 推荐路径图（简版：Chirp → 超声 → 水印 → 持续跟踪）
- "为什么不能只靠算法等第一句话"的简明解释

### 第 2 章：问题本质与约束

- 来源：Report 1 §1 + Report 2 §1 + Report 3 几何分析
- 去重：三份报告的问题定义合并为一张约束表
- 保留 Report 3 独有的几何偏差分析（喇叭位置 vs 嘴巴位置的 delta）
- 10ms 阈值的物理解释（Haas Effect）

### 第 3 章：方案全景图

- 来源：Report 1 §2 三族分类 + Report 2 §2 注入架构 + Report 3 方法评分
- Report 1 的 ASCII 三族分类图（方案 A/B/C）
- Report 2 的四种注入架构对比表（扬声器外放 / TX 内置 / 用户操作 / RX 数字注入）
- Report 3 的 6 方法评分卡片（条形图风格）

### 第 4 章：主动校准信号（最大去重区）

三份报告都覆盖了 Chirp/ESS/MLS/Golay/超声，大量重复。合并策略：

- **4.1 线性 Chirp（LFM）** — 数学定义 + 匹配滤波 + 窗函数表 + 推荐参数（以 Report 1 为主，补充 Report 2 的淡入淡出设计）
- **4.2 指数扫频 ESS** — 数学定义 + 逆滤波器归一化 + 非线性分离（以 Report 1 为主，补充 Report 2 的实测对比数据）
- **4.3 最大长度序列 MLS** — LFSR 原理 + FHT 加速 + 长度选择建议（以 Report 1 为主）
- **4.4 Golay 互补序列** — 数学定义 + 递归构造 + 时间开销警告（Report 1 + Report 2 合并，Report 1 的警告为主）
- **4.5 近超声 Chirp** — 频段表 + 硬件可靠性警告 + 推荐参数（以 Report 1 为主，Report 3 的风险提示补充）
- **4.6 综合对比表** — 合并三份报告的对比表为一张终极对比表

### 第 5 章：音频水印持续校准

- 来源：主要来自 Report 1 §4（Report 2/3 几乎无此内容）
- 5.1 扩频水印（DSSS）— 嵌入算法 + 心理声学掩蔽 + 处理增益
- 5.2 导频音（Pilot Tone）— Hilbert 变换 + 多频 Vernier 解模糊
- 5.3 自同步机制 — 三种方式对比
- 5.4 实时性能评估

### 第 6 章：被动 TDE 基线 — GCC-PHAT

- 来源：Report 1 §5
- 原理 + PHAT 加权公式
- 与主动方案的互补关系（ASCII 图）
- 优势与局限表

### 第 7 章：检测算法与亚采样精度

- 来源：Report 1 插值分析 + Report 2 §6（高度重叠，合并去重）
- 匹配滤波流程图（Report 2 的 ASCII 图更好，采用）
- 插值方法对比表（合并两份报告的表格）
- Report 2 独有的多径/混响处理策略

### 第 8 章：心理声学与用户体验设计

- 来源：Report 2 §7 + Report 3 UI 嵌码策略
- 三种频谱整形策略（Report 2）
- 用户可接受性设计表（Report 2）
- Report 3 的"嵌入倒计时/提示音"产品化策略

### 第 9 章：关键工程约束

- 来源：Report 1 §6（最详细）+ Report 2/3 风险补充
- 9.1 蓝牙编码延迟抖动（Report 1 的编码表 + Report 3 的漂移警告）
- 9.2 时钟漂移（Report 1 的量化分析）
- 9.3 手机音频 DSP 管线对抗（Report 1 的 DSP 表 + 对策）
- 9.4 系统音频处理改写探针（Report 3 的 AGC/NS/AEC 风险）
- 9.5 多径反射（Report 3 的"最早且足够强"峰策略）

### 第 10 章：持续跟踪与漂移对策

- 来源：Report 1 水印跟踪 + Report 2 §8
- 10.1 扩频水印持续跟踪（Report 2 参数表）
- 10.2 NLMS 自适应滤波器（Report 2 代码）
- 10.3 BFM 二值化特征匹配（Report 2）
- 10.4 周期性重校准策略（Report 1 的看门狗机制）

### 第 11 章：实施与实验路线

- 来源：Report 1 §7 时间线 + Report 3 实验矩阵
- Phase 时间线（Report 1 的 4 阶段，视觉组件）
- 实验矩阵表（Report 3 的 5 阶段实验，含成功标准和失败处理）
- 方案组合推荐（Report 1 的 8 步流程图）

### 第 12 章：参考代码

- 来源：Report 1 + Report 2 代码（去重合并）
- 12.1 Chirp 信号生成（Report 1 版本，含 Tukey 窗）
- 12.2 延迟估计算法（Report 1 版本，含对数域抛物线插值）
- 12.3 Golay 序列生成（Report 2 版本，递归构造）
- 12.4 Android AudioTimestamp 粗估（Report 2 独有）
- 12.5 最小可行方案 vs 完美方案（Report 2 的双栏对比）

### 第 13 章：参考文献与审查

- 来源：Report 1 §8-9 + Report 2 §10
- 去重合并文献列表（三份报告约 45 条引用，去重后预估 ~35 条）
- 按主题分组：校准信号 / 水印 / TDE / 约束与工程
- 保留 Report 1 的独立审查摘要（审查评分 + 已修正问题表）

## 去重策略总结

| 重叠区域 | 处理方式 |
|----------|----------|
| Chirp 数学定义 + 参数 | 三份报告合并为一份，以 Report 1 为主 |
| 窗函数对比表 | Report 1 和 Report 2 高度重叠，合并为一张完整表 |
| 插值方法 | Report 1 更详细（含精度数据），采用 Report 1 |
| 匹配滤波流程图 | Report 2 的 ASCII 图更清晰，采用 Report 2 |
| Golay 对比 | Report 1 强调风险（不推荐无线场景），Report 2 强调精度，合并两者观点 |
| MLS 参数表 | Report 1 更完整，采用 Report 1 |
| 近超声频段表 | Report 1 独有详细数据，直接采用 |
| 蓝牙/时钟分析 | Report 1 独有深度分析，直接采用 |
| 相位模糊解法 | Report 1 独有多频 Vernier，直接采用 |

## 技术约束

- 纯 HTML + CSS，无 JavaScript 依赖（离线可用、打印友好）
- 响应式设计（移动端可读）
- 打印样式表（`@media print`）
- 所有外部链接保留原始 URL
- 文件编码 UTF-8
- 输出路径：`/Users/noctis/Workspace/trySth/trending-clones/dual-mic-delay-alignment-ultimate-report.html`
