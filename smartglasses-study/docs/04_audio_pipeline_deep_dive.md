# 音频管线深度剖析——你最容易上手的入口

> **前置知识**：文档1-3
> **学习目标**：从音频工程师视角深入理解智能眼镜的音频系统，提出改进方案
> **预计学习时间**：2天
> **这是你最容易上手的篇章**——用你已有的音频知识来理解嵌入式

---

## 目录

- [4.1 智能眼镜音频系统概览](#41-智能眼镜音频系统概览)
- [4.2 PDM 麦克风与 I2S 接口](#42-pdm-麦克风与-i2s-接口)
- [4.3 音频采集管线源码分析](#43-音频采集管线源码分析)
- [4.4 音频传输管线源码分析](#44-音频传输管线源码分析)
- [4.5 从音频工程师视角的改进建议](#45-从音频工程师视角的改进建议)
- [4.6 ESP32 音频开发生态](#46-esp32-音频开发生态)
- [4.7 面试要点](#47-面试要点)
- [4.8 实践练习](#48-实践练习)

---

## 4.1 智能眼镜音频系统概览

### 与 Android Audio Framework 的完整类比

你已经非常熟悉 Android 的音频架构了。让我们用你已知的知识来理解这个项目的音频系统：

```
Android Audio Framework                    本项目音频管线
═════════════════════════                  ═══════════════════

┌────────────────────┐                    ┌────────────────────┐
│   Application      │                    │   Server (Python)   │
│   AudioRecord      │                    │   Whisper ASR       │
│   .read(buffer)    │                    │   GPT NLU           │
├────────────────────┤                    ├────────────────────┤
│   AudioFlinger      │                    │   sendAudioChunk    │
│   MixerThread       │                    │   (Base64 encode)   │
│   BufferQueue       │                    │                     │
├────────────────────┤                    ├────────────────────┤
│   AudioFlinger      │                    │   microphone_stream │
│   RecordThread      │                    │   (I2S PDM read)    │
│   Shared Memory     │                    │   MessageBuffer     │
├────────────────────┤                    ├────────────────────┤
│   Audio HAL         │                    │   ESP-IDF I2S Driver│
│   (vendor impl)     │                    │   (PDM mode)        │
├────────────────────┤                    ├────────────────────┤
│   ALSA/TinyALSA     │                    │   I2S HAL           │
│   (kernel driver)   │                    │   (ESP32 hardware)  │
├────────────────────┤                    ├────────────────────┤
│   I2S/CODEC Driver  │                    │   PDM MEMS Driver   │
│   (kernel module)   │                    │   (built-in)        │
├────────────────────┤                    ├────────────────────┤
│   I2S/CODEC HW      │                    │   PDM MEMS Mic HW   │
│   (PMIC/CODEC)      │                    │   (数字麦克风)       │
└────────────────────┘                    └────────────────────┘
```

### 关键差异

| 维度 | Android Audio | 本项目 |
|------|-------------|--------|
| 采样率 | 44.1/48kHz（媒体）/ 16kHz（语音） | ~16kHz（推测） |
| 位深 | 16/24bit | 16bit |
| 声道 | 立体声/单声道 | 单声道 |
| 缓冲区 | AudioFlinger shared memory (MB级) | MessageBuffer (4KB) |
| 编码 | 不编码（PCM直传） | Base64（膨胀33%） |
| 传输 | Binder IPC（进程间） | WiFi WebSocket（网络） |
| 延迟 | 5-20ms（FAST track） | 100-500ms（含网络） |
| 处理 | HAL层AEC/NS/AGC | **无本地处理** |

### 智能眼镜音频的特殊挑战

```
                    ┌─────────────────────────────┐
                    │   智能眼镜音频的困境          │
                    │                             │
  远场拾音 ←────────│ 用户嘴巴 → 麦克风：~10cm    │
  (信噪比低)        │                             │
                    │ 环境噪声：户外/餐厅/交通      │──→ 输入质量差
  风噪 ←──────────│ 穿戴设备典型问题              │
  (户外几乎不可用)  │                             │
                    │ WiFi射频干扰                 │
  自身噪声 ←───────│ 显示驱动噪声                 │
  (电磁干扰)        │                             │
                    ├─────────────────────────────┤
                    │ 电池容量：~200mAh            │
  功耗约束 ←───────│ 持续采集 vs 按需采集          │──→ 系统设计约束
                    │ WiFi传输功耗高               │
                    ├─────────────────────────────┤
                    │ ASR 需要完整语音             │
  延迟要求 ←───────│ 对话场景需要 <300ms          │──→ 用户体验
                    │ 网络延迟不可控               │
                    └─────────────────────────────┘
```

---

## 4.2 PDM 麦克风与 I2S 接口

### PDM（Pulse Density Modulation）原理

作为音频工程师，你可能更熟悉 PCM（Pulse Code Modulation）。PDM 是另一种音频数字化方式：

```
PCM（你熟悉的）                              PDM（本项目用的）
──────────────                              ──────────────

模拟信号 → 采样 → 量化 → 编码               模拟信号 → Sigma-Delta调制 → 1-bit流
                                              (过采样率 = 64×fs)
每个采样点 = 多位数字 (16bit/24bit)          每个时钟周期 = 1 bit (0或1)

例：1kHz 正弦波 @ 16kHz PCM                 例：1kHz 正弦波 @ 1.024MHz PDM
    采样点: 1000, 1414, 1000, 0, -1000...       1-bit: 1,1,1,0,1,1,0,1,0,1,0,0,...

数据率: 16kHz × 16bit = 256kbps             数据率: 1.024MHz × 1bit = 1.024Mbps

PDM → PCM 转换:
  PDM 1-bit流 → CIC 滤波器 (降采样) → FIR 低通滤波 → PCM 16-bit

  1.024 MHz × 1-bit  →  64× 降采样  →  16 kHz × 16-bit
```

**为什么 PDM 适合智能眼镜？**

| 特性 | PDM | I2S标准 | 模拟 |
|------|-----|---------|------|
| 引脚数 | 2 (CLK+DATA) | 3 (SCK+WS+SD) | 3+ (需要ADC) |
| 抗干扰 | 强（数字信号） | 强 | 弱（模拟信号） |
| 外部ADC | 不需要 | 不需要 | 需要 |
| 成本 | 低 | 中 | 高 |
| 功耗 | 极低 (~1mA) | 低 | 较高 |

### PDM MEMS 麦克风常见型号

| 型号 | 厂商 | SNR | 灵敏度 | 频响 | 功耗 | 价格 |
|------|------|-----|--------|------|------|------|
| MP34DT01 | ST | 61dB | -26dBFS | 20-20kHz | ~650µA | ¥5 |
| SPH0645 | Knowles | 65dB | -26dBFS | 20-50kHz | ~600µA | ¥10 |
| ICS-43434 | TDK | 65dB | -26dBFS | 20-20kHz | ~490µA | ¥8 |

> **音频工程师关注点**：SNR 61-65dB 对于语音采集够用（电话音质约 40dB，CD 约 96dB），但对于远场拾音+环境噪声场景，65dB SNR 是最低要求。

### ESP32 I2S PDM 配置详解

```c
// ESP32 I2S PDM RX 配置
i2s_config_t i2s_config = {
    // ═══ 模式配置 ═══
    .mode = (i2s_mode_t)(
        I2S_MODE_MASTER |    // ESP32 作为 I2S 主机（提供时钟）
        I2S_MODE_RX   |      // 接收模式（录音）
        I2S_MODE_PDM        // PDM 模式（不是标准 I2S）
    ),

    // ═══ 采样参数 ═══
    .sample_rate = 16000,                        // 16 kHz
    // 对于 PDM 模式，ESP32 内部 PDM→PCM 转换的输出采样率
    // PDM 过采样率固定为 64×，所以实际 PDM 时钟 = 16kHz × 64 = 1.024 MHz

    .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,  // 16-bit PCM 输出
    // PDM→PCM 转换后输出 16-bit PCM

    .channel_format = I2S_CHANNEL_FMT_ALL_RIGHT,    // 单声道（右声道）
    // PDM 麦克风是单声道的

    // ═══ 通信格式 ═══
    .communication_format = I2S_COMM_FORMAT_STAND_I2S,

    // ═══ DMA 配置 ═══
    .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,  // 中断优先级
    .dma_buf_count = 8,    // DMA 缓冲区数量
    // 多个 DMA 缓冲区形成乒乓结构，CPU 处理一个时硬件填充另一个

    .dma_buf_len = 256,    // 每个 DMA 缓冲区大小（采样数 × 字节数/采样）
    // 256 × 2字节(16bit) = 512 字节/缓冲区
    // 总 DMA 缓冲 = 8 × 512 = 4096 字节 = 4KB
    // @ 16kHz 16bit mono → 4KB / 32KB/s ≈ 128ms 的音频缓冲

    .use_apll = false,     // 不使用 APLL（高精度时钟，PDM 不需要）
    .tx_desc_auto_clear = false,
    .fixed_mclk = 0,
};

// ═══ 引脚配置 ═══
i2s_pin_config_t pin_config = {
    .bck_io_num = I2S_PIN_NO_CHANGE,   // PDM 模式不需要 BCK
    .ws_io_num = GPIO_NUM_14,          // PDM CLK 输出（到麦克风）
    .data_out_num = I2S_PIN_NO_CHANGE, // 录音模式，无数据输出
    .data_in_num = GPIO_NUM_34,        // PDM DATA 输入（从麦克风）
};
```

### DMA 乒乓缓冲机制

```
DMA (Direct Memory Access) 的工作方式：

硬件自动在 I2S 外设和 RAM 之间搬运数据，不需要 CPU 参与
CPU 只需要定期从 DMA 缓冲区读取数据即可

DMA 缓冲区布局（8个缓冲区，乒乓操作）：

时间 ──────────────────────────────────→

DMA:  [Buf0][Buf1][Buf2][Buf3][Buf4][Buf5][Buf6][Buf7]
       ↑ 写入                                ↑ 写入
       硬件自动填充                           硬件自动填充

CPU:  i2s_read() 按顺序读取已填充的缓冲区
      当 CPU 读 Buf0 时，硬件在写 Buf1
      当 CPU 读 Buf1 时，硬件在写 Buf2
      ...循环往复

类比 Android：
  DMA 缓冲区 ≈ AudioFlinger 的 shared memory buffer
  i2s_read() ≈ AudioRecord.read()（从 buffer 消费数据）
  硬件自动填充 ≈ AudioHAL 的 write()（向 buffer 生产数据）
```

---

## 4.3 音频采集管线源码分析

### setup_audio_buffer()

```c
// src/microphones/microphones.cpp（推断实现）

void setup_audio_buffer(void) {
    // 1. 配置 I2S PDM 模式
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX | I2S_MODE_PDM),
        .sample_rate = 16000,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_ALL_RIGHT,
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 8,
        .dma_buf_len = 256,
        .use_apll = false,
    };

    // 2. 配置引脚
    i2s_pin_config_t pin_config = {
        .bck_io_num = I2S_PIN_NO_CHANGE,
        .ws_io_num = PDM_CLK_PIN,
        .data_out_num = I2S_PIN_NO_CHANGE,
        .data_in_num = PDM_DATA_PIN,
    };

    // 3. 安装 I2S 驱动
    i2s_driver_install(I2S_NUM_0, &i2s_config, 0, NULL);
    i2s_set_pin(I2S_NUM_0, &pin_config);

    // 4. 可选：设置 PDM 参数
    i2s_set_pdm_rx_down_sample(0, I2S_PDM_DSR_64S);
    // 64倍降采样：1.024MHz PDM → 16kHz PCM

    ESP_LOGI("MIC", "PDM microphone initialized: 16kHz, 16bit, mono");
}
```

### microphone_stream_task

```c
// 持续采集音频的 FreeRTOS 任务
void microphone_stream(void *args) {
    // 音频读取缓冲区
    // 每次读取 1024 字节 = 512 个采样点 = 32ms @ 16kHz
    uint8_t audio_read_buffer[1024];
    size_t bytes_read = 0;

    ESP_LOGI("MIC", "Microphone stream started");

    while (true) {
        // ═══ 核心循环：从 I2S DMA 读取音频数据 ═══
        // i2s_read() 会阻塞直到 DMA 缓冲区有数据
        // 类比：AudioRecord.read(buffer, size)
        esp_err_t result = i2s_read(
            I2S_NUM_0,              // I2S 端口号
            audio_read_buffer,      // 目标缓冲区
            sizeof(audio_read_buffer),  // 读取大小
            &bytes_read,            // 实际读取字节数（输出）
            portMAX_DELAY           // 永久等待（阻塞直到有数据）
        );

        if (result == ESP_OK && bytes_read > 0) {
            // ═══ 将音频数据写入发送缓冲区 ═══
            // 后续由 sendAudioChunk 任务消费
            xMessageBufferSend(
                audioBuffer,         // 音频消息缓冲区
                audio_read_buffer,   // 音频数据
                bytes_read,          // 数据长度
                portMAX_DELAY        // 永久等待（缓冲区满时阻塞）
            );
        }
    }
}
```

### 缓冲区分析

```
音频数据从麦克风到网络的缓冲区链路：

PDM Mic → I2S DMA (4KB) → MessageBuffer (audio) → sendAudioChunk → websocketSendBuffer (4KB)

每个环节的缓冲大小和延迟：

I2S DMA:
  总大小 = 8 × 512 = 4096 字节
  @ 16kHz 16bit mono = 32KB/s 数据率
  缓冲时间 = 4096 / 32000 = 128ms
  → 如果 CPU 超过 128ms 没有读取，DMA 会溢出，音频丢失！

MessageBuffer (音频):
  大小未知（推测 4-8KB）
  作用：解耦采集和发送任务
  → 如果网络慢，缓冲区会满，采集任务被阻塞（避免内存溢出）

websocketSendBuffer:
  大小 = 4KB
  @ 16kHz 16bit = 128ms 的音频
  → 加上 Base64 膨胀 33%，实际只有 ~96ms 的音频数据

总缓冲延迟（满载时）：
  DMA 128ms + audio MB ~128ms + wsSend MB 128ms ≈ ~384ms
  → 加上编码和网络延迟，端到端可能 500ms+
```

### 采样参数合理性分析

```
采样率: 16kHz
  ✗ 语音识别精度：对中文来说，16kHz 刚好够用（中文基频 ~300Hz，共振峰 ~4kHz）
  ✗ 但某些辅音（如 s, f, th）的高频信息会丢失
  ✓ 节省带宽：16kHz 比 48kHz 少 3 倍数据
  → 建议：对于 ASR，16kHz 是合理的折中

位深: 16-bit
  ✓ 动态范围 96dB，远超麦克风 SNR (61-65dB)
  ✓ 16-bit 是 ESP32 I2S PDM 的标准输出
  → 不需要改动

声道: 单声道
  ✓ 只有一个 PDM 麦克风
  → 如果要做 Beamforming，需要加第二个麦克风

数据率计算：
  16kHz × 16bit × 1ch = 256 kbps = 32 KB/s
  Base64 编码后 = 32 × 4/3 ≈ 42.7 KB/s ≈ 341 kbps
  → WiFi 带宽远超此需求（~20 Mbps），不是瓶颈
```

---

## 4.4 音频传输管线源码分析

### sendAudioChunk_task

```c
void sendAudioChunk(void *args) {
    // 接收传入的 WebSocket 发送缓冲区句柄
    MessageBufferHandle_t wsSendBuffer = (MessageBufferHandle_t)args;

    uint8_t audio_buffer[1024];
    size_t bytes_read = 0;

    while (true) {
        // ═══ 从音频缓冲区读取 PCM 数据 ═══
        size_t bytes = xMessageBufferReceive(
            audioBuffer,           // 音频消息缓冲区
            audio_buffer,          // 接收缓冲区
            sizeof(audio_buffer),  // 最大读取大小
            portMAX_DELAY          // 永久等待
        );

        if (bytes > 0) {
            // ═══ Base64 编码 ═══
            // 3 字节 PCM → 4 字节 Base64 字符
            size_t base64_len = 0;
            char* base64_data = base64_encode(audio_buffer, bytes, &base64_len);

            if (base64_data) {
                // ═══ 构造 JSON 消息 ═══
                // 格式可能是：
                // {"MESSAGE_TYPE":"AUDIO_CHUNK_ENCRYPTED","data":"<base64>"}
                // 或直接发送 Base64 字符串

                // ═══ 写入 WebSocket 发送缓冲区 ═══
                xMessageBufferSend(
                    wsSendBuffer,
                    base64_data,
                    base64_len,
                    portMAX_DELAY
                );

                free(base64_data);  // 释放 Base64 编码缓冲区
            }
        }
    }
}
```

### Base64 编码的问题

```
Base64 编码分析：

输入：16-bit PCM 音频，1024 字节
Base64 输出：1024 × 4/3 ≈ 1366 字节

问题：
  1. 膨胀率 33%：浪费带宽
     → 如果用 Opus 编码，同样音质只需 ~1/10 的带宽

  2. 无压缩：原始 PCM 数据没有利用语音的冗余性
     → 语音信号有大量可压缩的空间

  3. 编解码 CPU 开销：虽然不大，但完全可以通过更好的编码避免

  4. 为什么用 Base64？
     → WebSocket 文本帧需要 UTF-8 编码
     → PCM 二进制数据直接放不进文本帧
     → 解决方案：用 WebSocket 二进制帧直接发送 PCM（不需要 Base64！）
```

### WebSocket 传输分析

```
音频在 WebSocket 中的传输：

方案A（当前）：WebSocket 文本帧 + Base64 编码 PCM
  PCM → Base64 → WebSocket 文本帧 → 服务器 → Base64解码 → PCM
  开销：33% 带宽浪费 + 编解码CPU

方案B（改进）：WebSocket 二进制帧 + 原始 PCM
  PCM → WebSocket 二进制帧 → 服务器 → PCM
  开销：0% 额外带宽，零编解码

方案C（最佳）：WebSocket 二进制帧 + Opus 编码
  PCM → Opus编码 → WebSocket 二进制帧 → 服务器 → Opus解码 → PCM
  开销：带宽减少 80%，延迟增加 5-20ms

为什么当前用方案A？
  → 可能是为了简化服务器端解析
  → JSON 文本格式方便调试
  → 开发初期快速原型，后续应改进
```

### 网络延迟分析

```
端到端音频延迟分解：

采集延迟：
  I2S DMA 填充时间     ~16ms (512采样 @ 16kHz)
  i2s_read() 等待       ~16ms
  小计                  ~32ms

编码+发送延迟：
  MessageBuffer 传递    ~1ms
  Base64 编码            ~2ms
  写入 wsSendBuffer     ~1ms
  WebSocket 发送        ~1ms
  小计                  ~5ms

网络延迟（最大的不确定性）：
  WiFi → 路由器          ~2-5ms (局域网)
  路由器 → 互联网         ~10-50ms (国内)
  服务器处理              ~200-500ms (ASR)
  服务器响应 → 互联网     ~10-50ms
  互联网 → WiFi → 眼镜   ~2-5ms
  小计                    ~224-610ms

接收+显示延迟：
  JSON 解析              ~2ms
  UI 更新               ~10ms
  显示刷新              ~33ms (30fps)
  小计                   ~45ms

总计：~282ms - 692ms（约 0.3-0.7 秒）

主要瓶颈：ASR 推理延迟（200-500ms）和网络延迟（20-100ms）
本地音频管线贡献 ~37ms，占比很小
→ 优化重点应该在 ASR 和网络，而不是本地音频
```

---

## 4.5 从音频工程师视角的改进建议

### 4.5.1 音频编码优化：引入 Opus

**为什么 Opus 是最佳选择？**

作为音频工程师，你可能已经了解 Opus。它在智能眼镜中的优势：

| 参数 | PCM + Base64 (当前) | Opus (改进) |
|------|---------------------|-------------|
| 码率 | 256 kbps (+33% = 341 kbps) | 16-32 kbps |
| 带宽节省 | 基线 | **减少 ~90%** |
| 音质 | 完美 | 语音几乎无损 |
| 延迟 | 0 | 5-20ms |
| CPU 占用 | ~0% | ~15-25% (单核) |
| 内存 | 极小 | ~40KB |

**Opus 编码模式选择：**

```
Opus 有两种编码模式：

1. SILK 模式（语音优化）
   - 码率：6-40 kbps
   - 延迟：20-40ms
   - 最适合：纯语音通话
   → 推荐用于智能眼镜语音命令

2. CELT 模式（混合/音乐）
   - 码率：40-510 kbps
   - 延迟：5-22ms
   - 最适合：音乐、混合内容

3. 自动模式（推荐）
   - Opus 自动在 SILK/CELT 之间切换
   - 检测语音/非语音，自动选择最佳模式
   → 最适合智能眼镜（既有语音也有环境声）
```

**Opus 在 ESP32 上的实现路径：**

```c
// 方案1：直接移植 libopus（最灵活）
// ESP32 有足够的算力运行 Opus 编码器

#include "opus.h"

// 初始化 Opus 编码器
OpusEncoder* encoder = opus_encoder_create(
    16000,      // 采样率 16kHz
    1,          // 声道数 1
    OPUS_APPLICATION_VOIP,  // VOIP 模式（语音优化）
    &error
);

// 配置编码参数
opus_encoder_ctl(encoder, OPUS_SET_BITRATE(24000));  // 24 kbps
opus_encoder_ctl(encoder, OPUS_SET_COMPLEXITY(5));   // 复杂度 5/10
opus_encoder_ctl(encoder, OPUS_SET_VBR(1));          // 启用可变码率

// 编码一帧音频
// Opus 帧大小必须是 2.5, 5, 10, 20, 40, 60ms
// 推荐 20ms：16kHz × 20ms = 320 个采样
int16_t pcm_frame[320];  // 20ms @ 16kHz
uint8_t opus_frame[1276]; // Opus 输出（最大 1276 字节）

int frame_size = opus_encode(
    encoder,
    pcm_frame,      // 输入 PCM
    320,            // 采样数
    opus_frame,     // 输出 Opus 帧
    sizeof(opus_frame)  // 最大输出大小
);
// frame_size = 实际编码后字节数（通常 20-60 字节 @ 24kbps）

// 清理
opus_encoder_destroy(encoder);
```

**集成方案：**

```
改造后的音频管线：

microphone_stream_task:
  I2S PDM → 16kHz 16bit PCM → 写入 audioBuffer

新的 opus_encode_task:
  从 audioBuffer 读 PCM → Opus 编码 → 写入 opusBuffer

sendAudioChunk_task:
  从 opusBuffer 读 Opus 帧 → WebSocket 二进制帧发送

变化：
  1. 新增 opus_encode_task
  2. audioBuffer 和 opusBuffer 都是 MessageBuffer
  3. WebSocket 改用二进制帧
  4. 去掉 Base64 编码

带宽对比：
  旧：32 KB/s (PCM) × 4/3 = 42.7 KB/s
  新：3 KB/s (Opus @ 24kbps) = 3 KB/s
  节省：93%
```

### 4.5.2 本地 VAD（语音活动检测）

**为什么需要本地 VAD？**

当前设计：麦克风持续采集 → 持续上传 → 服务器处理
问题：
- 没人说话时也在上传，浪费带宽和电量
- WiFi 持续发送，功耗约 100mA
- 服务器收到大量静音数据

```
改进后工作流：

┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ 待机模式  │────→│ VAD检测  │────→│ 活跃模式  │────→│ VAD检测  │
│ Mic关闭  │     │ 有语音？ │     │ Mic采集   │     │ 静音？   │
│ WiFi省电 │     │          │     │ WiFi发送  │     │ >2秒？   │
│ ~5mA     │     └──────────┘     │ ~100mA   │     └──────────┘
└──────────┘           │          └──────────┘           │
     ↑                 ↓ 是                           ↓ 是
     └───────────────────────────────────────────────────┘

省电效果：
  假设 80% 时间静音 → 平均功耗从 ~100mA 降到 ~25mA
  电池续航从 8小时 提升到 ~12小时
```

**ESP32 VAD 实现方案：**

```c
// 方案1：简单能量 VAD（最容易实现）
// 类似 Android AudioRecord 的噪声门

bool simple_energy_vad(int16_t* samples, int num_samples, int threshold) {
    int64_t energy = 0;
    for (int i = 0; i < num_samples; i++) {
        energy += (int64_t)samples[i] * samples[i];
    }
    energy /= num_samples;

    // 能量超过阈值 = 有语音
    return (energy > (int64_t)threshold * threshold);
}

// 方案2：ESP-SR 的 VAD（更准确）
#include "esp_mn_speech_commands.h"  // 或 esp_afe_sr_models

// ESP-SR 提供 WebRTC VAD 的 ESP32 优化版本
// 支持 4 种模式：非常激进、激进、中等、宽松
```

### 4.5.3 唤醒词检测本地化

```
当前方案：持续上传音频 → 服务器检测唤醒词
  问题：延迟高、功耗高、隐私差

改进方案：本地 WakeNet 检测唤醒词 → 检测到后开始上传
  优点：低延迟（<100ms）、省电、隐私好

ESP-SR WakeNet 规格：
  模型大小：~300KB
  RAM 占用：~20KB
  CPU 占用：~5%@240MHz（单核 5% 算力）
  检测延迟：~30ms
  误唤醒率：<1次/24小时
  支持自定义唤醒词："Hey Glasses"、"你好眼镜" 等

工作流：
  待机 → WakeNet 检测到 "Hey Glasses"
       → 唤醒系统
       → 开始音频采集和上传
       → 服务器 ASR + NLU
       → 显示结果
       → 超时无语音 → 回到待机
```

### 4.5.4 本地降噪

```
ESP32 能跑什么级别的降噪？

Level 1：谱减法 (Spectral Subtraction)
  CPU：~2%@240MHz
  RAM：~5KB
  效果：中等（信噪比提升 3-6dB）
  适用：稳态噪声（风扇、空调）

Level 2：Wiener 滤波
  CPU：~5%@240MHz
  RAM：~10KB
  效果：较好（SNR 提升 6-10dB）
  适用：非稳态噪声

Level 3：深度学习降噪 (如 DeepFilterNet)
  CPU：~50%@240MHz（可能跑不动）
  RAM：~200KB
  效果：很好（SNR 提升 10-15dB）
  适用：各种噪声环境

推荐：ESP-ADF 提供的 noise_reduction
  → 基于 Wiener 滤波，CPU 占用低，效果好
  → 一行代码集成
```

### 4.5.5 多麦克风 Beamforming（进阶）

```
如果要加第二个麦克风实现 Beamforming：

硬件改动：
  1. 添加第二个 PDM MEMS 麦克风
  2. 距离第一麦克风 ~20-40mm
  3. 连接到 ESP32 的另一个 I2S 通道

软件改动：
  使用 ESP-ADF 的 mic_array 组件：
    2 × PDM Mic → I2S 双通道 → AFE 处理 → Beamforming → 增强语音

效果：
  - 指向性拾音：聚焦用户嘴部方向
  - 空间降噪：抑制来自其他方向的声音
  - SNR 提升：~6-12dB

类比 Android：
  相当于 Pixel 手机的 "前后双麦克风降噪"
  或者 Android 的 AudioEffect.TYPE_VOICE_COMMUNICATION_AUDIO_FOCUS
```

---

## 4.6 ESP32 音频开发生态

### ESP-ADF（Audio Development Framework）

```
ESP-ADF 是 Espressif 官方的音频开发框架
类似于 Android 的 AudioFlinger + MediaPlayerService

核心概念：Pipeline（管线）

┌────────────────────────────────────────────────────┐
│                  ESP-ADF Pipeline                   │
│                                                    │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐         │
│  │ Element  │──→│ Element  │──→│ Element  │──→ 输出 │
│  │ PDM Mic │   │   AFE   │   │  Opus   │         │
│  │ (输入)   │   │ (处理)   │   │ (编码)   │         │
│  └─────────┘   └─────────┘   └─────────┘         │
│       ↑             ↑             ↑               │
│    RingBuf      RingBuf       RingBuf              │
└────────────────────────────────────────────────────┘

每个 Element 是一个独立的音频处理单元
Element 之间通过 RingBuffer 传递数据
可以灵活组合不同的 Element
```

### ESP-SR（Speech Recognition）

```
ESP-SR 提供 ESP32 上的语音处理链：

┌───────────────────────────────────────────┐
│              ESP-SR AFE 算法链             │
│                                           │
│  PCM输入 → [AEC] → [NS] → [AGC] → [VAD] │
│            回声消除  降噪  自动增益  检测  │
│                                           │
│  → WakeNet（唤醒词检测）                   │
│  → MultiNet（命令词识别）                  │
└───────────────────────────────────────────┘

AEC（回声消除）：
  - 消除设备自身播放的声音被麦克风拾取
  - 需要 1 个参考信号（播放的音频）+ 1 个麦克风输入
  - 延迟：< 10ms
  - 适用场景：智能眼镜播放提示音时

NS（降噪）：
  - 基于统计模型的噪声抑制
  - 适用于稳态和非稳态噪声

AGC（自动增益控制）：
  - 自动调整音量，使远场和近场语音音量一致
  - 类似 Android AudioEffect.TYPE_AGC

VAD（语音活动检测）：
  - 检测当前是否有语音
  - 4种灵敏度模式
```

---

## 4.7 面试要点

### I2S/PDM/TDM 接口对比（必问）

| 接口 | 线数 | 数据率 | 用途 |
|------|------|--------|------|
| I2S | 3 (SCK+WS+SD) | 标准音频 | CODEC、DAC |
| PDM | 2 (CLK+DATA) | 1-bit 过采样 | MEMS 数字麦克风 |
| TDM | 2+ (CLK+DATA×N) | 多通道 | 多麦克风阵列 |
| AC97 | 5 | 5 wire | 旧标准，已淘汰 |

### DMA 在音频中的作用

```
DMA = Direct Memory Access
CPU 不参与数据搬运，硬件自动在 I2S 外设和 RAM 之间传输数据

为什么音频必须用 DMA？
  - 音频采样率 16kHz → 每 62.5µs 一个采样
  - 如果用 CPU 中断搬运，CPU 大部分时间在做搬运而不是计算
  - DMA 让 CPU 只需要定期批量处理数据

类比：
  DMA ≈ Android 的 Binder shared memory
  CPU 手动搬运 ≈ Binder 拷贝模式（性能差）
```

### 嵌入式音频算法的定点化

```
为什么需要定点化？
  - 浮点运算在无 FPU 的 MCU 上很慢（软件模拟）
  - ESP32 有单精度 FPU，但仍然比整数慢

定点化技巧：
  1. Q格式：Q15 = 用 int16_t 表示 -1.0 到 +1.0
     值 = 整数 / 32768
     0.5 = 16384

  2. 饱和运算：防止溢出
     result = SATURATE_16(a + b);  // 限制在 -32768 到 32767

  3. 乘加优化：使用 DSP 指令
     int32_t mac = __builtin_muls(a, b);  // 单周期乘加
```

---

## 4.8 实践练习

### 练习1：音频采集与串口输出

```c
// 目标：用 ESP32 采集 PDM 音频，计算 RMS 能量，通过串口输出

void audio_monitor_task(void *args) {
    uint8_t buffer[512];
    size_t bytes_read;

    while (1) {
        i2s_read(I2S_NUM_0, buffer, sizeof(buffer), &bytes_read, portMAX_DELAY);

        // 计算 RMS 能量
        int16_t* samples = (int16_t*)buffer;
        int num_samples = bytes_read / 2;
        float rms = 0;
        for (int i = 0; i < num_samples; i++) {
            rms += (float)samples[i] * samples[i];
        }
        rms = sqrtf(rms / num_samples);

        // 转换为 dB
        float db = 20 * log10f(rms / 32768.0f);
        ESP_LOGI("AUDIO", "Level: %.1f dB", db);

        // 简单 VAD
        if (db > -40) {
            ESP_LOGI("VAD", "Speech detected! Level: %.1f dB", db);
        }
    }
}
```

### 练习2：添加能量 VAD

在 `microphone_stream_task` 中添加 VAD，只有在有语音时才写入缓冲区：

```c
void microphone_stream_with_vad(void *args) {
    uint8_t buffer[1024];
    size_t bytes_read;
    int silence_frames = 0;
    const int SILENCE_THRESHOLD = -40;  // dB
    const int SILENCE_TIMEOUT = 30;     // 30 帧 ≈ 1秒静音后停止

    while (1) {
        i2s_read(I2S_NUM_0, buffer, sizeof(buffer), &bytes_read, portMAX_DELAY);

        float db = calculate_db(buffer, bytes_read);

        if (db > SILENCE_THRESHOLD) {
            // 有语音 → 发送
            silence_frames = 0;
            xMessageBufferSend(audioBuffer, buffer, bytes_read, portMAX_DELAY);
        } else {
            silence_frames++;
            if (silence_frames < 5) {
                // 刚开始静音，继续发送（保留语音尾部）
                xMessageBufferSend(audioBuffer, buffer, bytes_read, portMAX_DELAY);
            }
            // 静音超时后不再发送
        }
    }
}
```

### 练习3：音频波形显示

使用 LVGL 在屏幕上显示实时音频波形（结合文档5的知识）。

---

## 总结

| 你应该记住的 | 关键数据 |
|-------------|---------|
| 采样参数 | 16kHz / 16bit / 单声道 |
| 音频接口 | I2S PDM 模式 |
| 传输方式 | PCM → Base64 → WebSocket 文本帧 |
| 最大改进空间 | Opus 编码（省 90% 带宽） |
| 最佳切入点 | 添加本地 VAD（省电 + 省带宽） |
| 进阶方向 | 双麦 Beamforming + AEC |

**下一篇**：[文档5 - 显示系统与UI框架](05_display_and_ui_system.md)

---

> **参考来源**：
> - ESP-ADF 文档: https://docs.espressif.com/projects/esp-adf/en/latest/
> - ESP-SR 文档: https://github.com/espressif/esp-sr
> - Opus 编解码器: https://opus-codec.org/
> - I2S 协议规范: https://www.nxp.com/docs/en/application-note/AN10866.pdf
