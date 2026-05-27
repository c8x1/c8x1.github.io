# OpenSourceSmartGlasses 全局架构解析

> **前置知识**：文档1（嵌入式系统基础概念）
> **学习目标**：从全局视角理解整个项目的架构、技术选型、数据流
> **预计学习时间**：2天

---

## 目录

- [2.1 项目概览](#21-项目概览)
- [2.2 仓库结构导航](#22-仓库结构导航)
- [2.3 系统架构全景图](#23-系统架构全景图)
- [2.4 技术栈全景](#24-技术栈全景)
- [2.5 数据流全景](#25-数据流全景)
- [2.6 main.cpp 启动流程逐行解析](#26-maincpp-启动流程逐行解析)
- [2.7 构建配置详解](#27-构建配置详解)
- [2.8 给音频工程师的架构理解指南](#28-给音频工程师的架构理解指南)

---

## 2.1 项目概览

**OpenSourceSmartGlasses (OSSG)** 是一个开源的 AI 智能眼镜项目，由 Mentra Community 维护。它的设计理念是：

> 让任何人都能以低成本构建自己的 AI 智能眼镜原型。

**核心特性：**
- 基于 ESP32 的低成本硬件（芯片成本约 ¥15）
- 瘦客户端架构（眼镜只做采集和显示，AI 在服务器端运行）
- 实时语音识别和翻译
- 搜索引擎集成
- 可扩展的 UI 系统
- WiFi 无线通信

**项目哲学：不追求"在眼镜上跑大模型"，而是做一个高效的"感知-显示终端"。**

这个设计哲学非常务实——以 ESP32 的算力（240MHz 双核、520KB RAM），根本不可能运行现代 LLM。但作为音频采集和结果显示的终端，ESP32 完全够用。

---

## 2.2 仓库结构导航

### 顶层目录树

```
OpenSourceSmartGlasses/
├── electronics_and_firmware/       ← 🔧 硬件和固件（我们的重点！）
│   ├── OSSG_v0p1_and_v0p2/       ← 早期原型（v0.1 和 v0.2）
│   ├── esp32_firmware_v0p3/       ← v0.3 固件（当前活跃版本）
│   │   └── ossg_firmware_mcu/     ← 固件主工程
│   ├── OSSG_v0p4-2P/             ← v0.4 硬件设计（2P版本）
│   ├── OSSG_v0p4-2S/             ← v0.4 硬件设计（2S版本）
│   └── OSSG_v0p5/                ← v0.5 最新硬件设计
│
├── android_app/                    ← 📱 Android 伴侣应用
│
├── server/                         ← ☁️ 后端服务器（AI 处理）
│
├── docs/                           ← 📄 项目文档
│
└── README.md                       ← 项目说明
```

### 固件主工程结构（核心！）

```
ossg_firmware_mcu/                         ← 固件根目录
│
├── platformio.ini                         ← ⭐ 构建配置（最重要！）
├── sdkconfig.defaults                     ← ESP-IDF 默认配置
├── huge_app.csv                           ← Flash 分区表
│
├── src/                                   ← 源代码
│   ├── main.cpp                           ← ⭐ 程序入口（app_main）
│   │
│   ├── comms/                             ← 通信模块
│   │   ├── wifi_websocket_comms.hpp       ← WiFi + WebSocket 接口
│   │   └── wifi_websocket_comms.cpp       ← 实现
│   │
│   ├── display/                           ← 显示模块
│   │   ├── displaymanager.hpp             ← ⭐ 显示管理器接口
│   │   ├── displaymanager.cpp             ← 实现
│   │   ├── global_settings.hpp            ← 显示全局配置（分辨率等）
│   │   ├── lv_conf.h                      ← LVGL 配置
│   │   ├── ui.h                           ← UI 界面定义
│   │   └── ...（更多 UI 文件）
│   │
│   ├── microphones/                       ← 🎤 音频模块（你关注的重点）
│   │   ├── microphones.hpp                ← 麦克风接口
│   │   └── microphones.cpp                ← 实现
│   │
│   └── utils/                             ← 工具模块
│       └── json_parse.cpp                 ← JSON 解析器
│
├── include/                               ← 头文件
│   └── message_types.hpp                  ← ⭐ 消息类型定义（协议核心）
│
├── lib/                                   ← 第三方库（git submodule）
│   └── LovyanGFX_SmartGlasses/            ← 图形库（定制版）
│
├── components/                            ← ESP-IDF 组件
│   └── lvgl/                              ← LVGL UI 框架 (v8.3)
│
└── test/                                  ← 测试文件
```

### 硬件版本演进

```
v0.1 (2022)          v0.2               v0.3 (当前固件)      v0.4               v0.5 (最新)
┌─────────┐      ┌─────────┐       ┌─────────────┐    ┌─────────┐      ┌─────────────┐
│ 原型验证  │ ──→ │ 功能完善 │ ──→ │ 固件活跃开发 │ ──→│ 硬件优化 │ ──→ │ 最新设计    │
│ 面包板    │      │ PCB     │       │ 软件功能完整 │    │ 双版本  │      │ 完整原理图  │
│          │      │         │       │             │    │ 2P/2S   │      │             │
└─────────┘      └─────────┘       └─────────────┘    └─────────┘      └─────────────┘
  概念验证          首次PCB          WiFi+WebSocket      外观/尺寸        生产级设计
                    验证              + LVGL + PDM        改进            准备
```

### 核心文件清单

| 文件 | 职责 | 重要度 | 后续文档详解 |
|------|------|--------|-------------|
| `main.cpp` | 程序入口，系统初始化 | ⭐⭐⭐ | 文档2+3 |
| `message_types.hpp` | 消息协议定义 | ⭐⭐⭐ | 文档6 |
| `wifi_websocket_comms.*` | WiFi+WebSocket 通信 | ⭐⭐⭐ | 文档6 |
| `microphones.*` | PDM 麦克风驱动 | ⭐⭐⭐ | 文档4 |
| `displaymanager.*` | 显示管理 | ⭐⭐ | 文档5 |
| `json_parse.cpp` | JSON 消息解析 | ⭐⭐ | 文档3 |
| `global_settings.hpp` | 显示分辨率配置 | ⭐ | 文档5 |
| `platformio.ini` | 构建配置 | ⭐⭐⭐ | 本文档 |
| `huge_app.csv` | Flash 分区表 | ⭐⭐ | 文档3 |

---

## 2.3 系统架构全景图

### 三大组件

```
┌─────────────────────────────────────────────────────────────────┐
│                    OpenSourceSmartGlasses 系统架构                │
│                                                                 │
│  ┌──────────────┐    WiFi    ┌──────────────┐    互联网    ┌──────────────┐
│  │              │ ──────────→│              │ ──────────→ │              │
│  │   ESP32      │  WebSocket │   Android    │   API调用    │   Linux      │
│  │   智能眼镜   │ ←──────────│   手机 App   │ ←────────── │   服务器     │
│  │   (ASG)      │  JSON消息  │   (ASP)      │   AI结果    │   (GLBOX)    │
│  │              │            │              │             │              │
│  │  ┌────────┐  │            │              │             │  ┌────────┐  │
│  │  │ PDM Mic│  │            │  ┌────────┐  │             │  │ ASR    │  │
│  │  │ 复合视频│  │            │  │ 转发/  │  │             │  │ NLU    │  │
│  │  │ 触摸板 │  │            │  │ 预处理 │  │             │  │ TTS    │  │
│  │  │ 电池   │  │            │  └────────┘  │             │  │ 搜索   │  │
│  │  └────────┘  │            │              │             │  └────────┘  │
│  └──────────────┘            └──────────────┘             └──────────────┘
│                                                                 │
│  职责：采集+显示       职责：中继+控制       职责：AI处理     │
│  算力：240MHz双核      算力：手机级          算力：GPU集群    │
│  功耗：~100mA          功耗：手机级          功耗：服务器级   │
└─────────────────────────────────────────────────────────────────┘
```

### 瘦客户端架构设计理念

这是一种经典的**边缘计算（Edge Computing）**架构——在资源受限的边缘设备上做最少的计算，把繁重的任务卸载（offload）到更强大的后端。

**为什么不把 AI 放在眼镜上？**

| 因素 | ESP32 能做的 | 需要的 |
|------|-------------|--------|
| **算力** | 240 MHz 双核，~600 DMIPS | LLM 推理需要数 GFLOPS |
| **内存** | 520KB + 可选 4MB PSRAM | LLM 需要 GB 级内存 |
| **功耗** | 全速运行 ~100mA | 独立运行数小时 |
| **延迟** | 本地处理低延迟 | 网络 + 云端处理增加延迟 |
| **灵活性** | 固件更新复杂 | 服务器端随时更新模型 |

**设计权衡：**
```
方案A：全本地处理（如 Orion 原型）
  优点：无网络依赖、低延迟、隐私好
  缺点：需要昂贵芯片、大电池、散热好

方案B：瘦客户端（本项目选择）✓
  优点：低成本（¥100以内）、低功耗、灵活更新
  缺点：依赖网络、延迟较高、隐私风险

方案C：混合方案（业界趋势）
  本地做轻量AI（唤醒词、VAD、降噪）
  云端做重量AI（LLM、复杂搜索）
```

> **面试考点**：能清楚解释为什么选择瘦客户端架构，以及各种方案的 trade-off。

### 与 Android 架构的类比

如果你熟悉 Android 系统，可以这样理解这个项目的架构：

```
本项目的架构                       Android 的架构
───────────────                   ──────────────

ESP32 智能眼镜                    Bluetooth 耳机 + 智能手表
  ↓ WiFi/WebSocket                   ↓ BLE/A2DP
Android 伴侣 App                  Android System (Audio/Media)
  ↓ HTTP/gRPC                        ↓ Binder IPC
Linux 服务器                       Google Cloud (语音助手后端)

眼镜 = 外设（采集+输出）
手机 = 中间层（协议转换、缓存）
服务器 = 云端智能（AI 处理）
```

---

## 2.4 技术栈全景

### 技术栈关系图

```
┌─────────────────────────────────────────────────────────┐
│                    应用层                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │语音命令   │  │实时字幕   │  │搜索引擎   │              │
│  │3步流程    │  │显示      │  │结果展示   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
├─────────────────────────────────────────────────────────┤
│                    UI 框架层                              │
│  ┌──────────────────────────────────────┐               │
│  │         LVGL v8.3                     │              │
│  │  (Light and Versatile Graphics Library)│              │
│  │  设计工具: SquareLine Studio 1.1.1     │              │
│  └───────────────┬──────────────────────┘               │
│                  ↓                                       │
├─────────────────────────────────────────────────────────┤
│                    图形驱动层                              │
│  ┌──────────────────────────────────────┐               │
│  │     LovyanGFX (定制版)                 │              │
│  │  输出: ESP32 I2S → 复合视频 (NTSC/PAL) │              │
│  └──────────────────────────────────────┘               │
├─────────────────────────────────────────────────────────┤
│                    通信层                                  │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐          │
│  │  WiFi STA   │  │  WebSocket  │  │   cJSON   │          │
│  │  (Station)  │  │  (TCP WS)   │  │  (JSON)   │          │
│  └────────────┘  └────────────┘  └──────────┘          │
├─────────────────────────────────────────────────────────┤
│                    音频层                                  │
│  ┌──────────────────────────────────────┐               │
│  │  I2S PDM 模式 → PDM MEMS 麦克风       │              │
│  │  采集 → Ring Buffer → Base64 → WS    │              │
│  └──────────────────────────────────────┘               │
├─────────────────────────────────────────────────────────┤
│                    操作系统层                              │
│  ┌──────────────────────────────────────┐               │
│  │  FreeRTOS (ESP-IDF 内置)              │              │
│  │  5个任务 + MessageBuffer 通信          │              │
│  └──────────────────────────────────────┘               │
├─────────────────────────────────────────────────────────┤
│                    硬件层                                  │
│  ┌──────────────────────────────────────┐               │
│  │  ESP32-PICO-D4                        │              │
│  │  240MHz 双核 | 520KB SRAM | 4MB Flash │              │
│  │  WiFi + BLE | I2S/SPI/I2C/UART       │              │
│  └──────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────┘
```

### 各技术选型的原因和替代方案

| 组件 | 当前选择 | 为什么？ | 替代方案 |
|------|---------|---------|---------|
| 芯片 | ESP32-PICO-D4 | 小封装、WiFi内置、低成本 | ESP32-S3（更强AI能力）、nRF5340（更低功耗但无WiFi） |
| 框架 | ESP-IDF | 官方支持、功能最全 | Arduino（更简单但性能受限） |
| 构建系统 | PlatformIO | 专业IDE、依赖管理 | ESP-IDF 原生 CMake |
| 图形库 | LovyanGFX | ESP32优化、支持复合视频 | TFT_eSPI（不支持复合视频） |
| UI框架 | LVGL v8.3 | 轻量级嵌入式UI标准 | uGFX、TouchGFX（商业） |
| 通信 | WebSocket | 双向实时、基于TCP | MQTT（物联网标准但非实时）、BLE（低带宽） |
| JSON | cJSON | 超轻量、单文件 | ArduinoJson（更方便但更大）、jsmn（只解析不生成） |
| 音频接口 | I2S PDM | 数字MEMS麦克风标准 | I2S标准模式（需外部ADC） |
| 显示输出 | 复合视频 | 零额外硬件、ESP32原生支持 | SPI LCD（需额外屏幕）、MIPI DSI（ESP32不支持） |

> **如果重新设计？**
> - 芯片：换 ESP32-S3（向量指令，更好的AI能力）
> - 通信：WiFi+BLE混合（BLE用于配对和低功耗通知，WiFi用于音频流）
> - 音频：用Opus编码替代Base64+PCM
> - 显示：SPI OLED（更好的画质和效率）

---

## 2.5 数据流全景

### 三条主要数据流

#### 数据流1：音频上行流（用户说话 → AI 识别）

```
用户的语音
    │
    ↓
┌───────────────────────────────────────────────────────────────────┐
│ ESP32 眼镜                                                        │
│                                                                   │
│  PDM MEMS ──→ I2S DMA ──→ microphone_stream_task ──→ Ring Buffer │
│  麦克风       硬件自动     FreeRTOS 任务            MessageBuffer │
│  声波→PDM    搬运数据     持续采集                  4KB缓冲       │
│               到RAM                                              │
│                                                                   │
│  Ring Buffer ──→ sendAudioChunk_task ──→ Base64编码 ──→ WebSocket│
│  MessageBuffer   FreeRTOS 任务          3字节→4字符     TCP 发送  │
│  消费者          读取+编码              膨胀33%          到服务器  │
└───────────────────────────────────────────────────────────────────┘
    │
    ↓ WiFi / Internet
┌───────────────────────────────────────────────────────────────────┐
│ Linux 服务器                                                      │
│                                                                   │
│  WebSocket ──→ Base64解码 ──→ ASR模型 ──→ 文字结果               │
│  接收音频      PCM还原        语音识别     (如Whisper)            │
│                                                                   │
│  文字结果 ──→ NLU/LLM ──→ 意图/回答                               │
│              自然语言理解   生成回复                                │
└───────────────────────────────────────────────────────────────────┘
    │
    ↓ WebSocket / JSON
┌───────────────────────────────────────────────────────────────────┐
│ ESP32 眼镜（数据流2：结果下行）                                    │
│                                                                   │
│  WebSocket ──→ eventsBuffer ──→ eventDistributor ──→ UI 更新     │
│  接收JSON     MessageBuffer     JSON解析            LVGL渲染     │
│               1KB缓冲           消息分发             显示结果     │
└───────────────────────────────────────────────────────────────────┘
```

#### 数据流2：控制下行流（服务器 → 眼镜 UI）

```
服务器发送 JSON 消息（示例）：

{
    "MESSAGE_TYPE": "FINAL_TRANSCRIPT",
    "title": "用户说的话",
    "body": "你好，今天天气怎么样？"
}

    ↓ WebSocket 接收
    ↓ 写入 eventsBuffer (1KB)
    ↓ eventDistributor 任务阻塞等待 → 被唤醒
    ↓ cJSON 解析 JSON → 提取 MESSAGE_TYPE
    ↓ 匹配到 "FINAL_TRANSCRIPT"
    ↓ 如果当前模式是 MODE_LIVE_LIFE_CAPTIONS
    ↓ 调用 displayLiveCaptions(title, body)
    ↓ LVGL 更新 UI
    ↓ LovyanGFX 渲染到 framebuffer
    ↓ I2S → 复合视频输出 → 用户看到字幕
```

#### 数据流3：模式切换流

```
服务器发送模式切换：

{
    "MESSAGE_TYPE": "ACTION_SWITCH_MODES",
    "NEW_MODE": "MODE_LIVE_LIFE_CAPTIONS"
}

    ↓ eventDistributor 解析
    ↓ 更新 currentMode 变量
    ↓ 后续的 FINAL_TRANSCRIPT 消息
      将被路由到 displayLiveCaptions() 而不是其他处理函数
```

### 端到端延迟分析

```
用户说话          服务器ASR         服务器NLU          结果显示
  │                │                 │                │
  ├─ 音频采集 ─────┤                 │                │
  │  ~20ms         │                 │                │
  ├─ 编码+发送 ────┤                 │                │
  │  ~10ms         │                 │                │
  ├─ 网络传输 ──────┤                │                │
  │  ~20-100ms     │                 │                │
  │                ├─ ASR 处理 ──────┤                │
  │                │  ~200-500ms     │                │
  │                │                 ├─ LLM 处理 ─────┤
  │                │                 │  ~500-2000ms   │
  │                │                 │                ├─ 网络回传
  │                │                 │                │  ~20-100ms
  │                │                 │                ├─ JSON解析+UI
  │                │                 │                │  ~10-50ms
  ↓                ↓                 ↓                ↓

总延迟：~780ms - 2790ms（约1-3秒）

主要瓶颈：
1. ASR 模型推理 (~200-500ms)
2. LLM 生成 (~500-2000ms)
3. 网络往返 (~40-200ms)
```

> **面试考点**：能分析出延迟瓶颈在哪里，以及如何优化（流式ASR、流式LLM输出、边缘推理）。

---

## 2.6 main.cpp 启动流程逐行解析

这是理解整个系统的关键入口。让我们逐行分析 `app_main()` 函数。

### 完整代码（带逐行注释）

```cpp
// main.cpp — OpenSourceSmartGlasses 固件入口
// 这是 ESP-IDF 的标准入口函数，相当于 C 的 main()
// FreeRTOS 会自动调用 app_main()

// 全局变量声明
MessageBufferHandle_t eventsBuffer;         // 接收服务器消息的缓冲区 (1KB)
MessageBufferHandle_t websocketSendBuffer;  // 发送音频数据的缓冲区 (4KB)
size_t eventsBufferLen = 1024;              // 事件缓冲区大小
size_t websocketSendBufferLen = 4096;       // WebSocket 发送缓冲区大小

// FreeRTOS 任务句柄（用于后续管理任务）
TaskHandle_t eventsTask;
TaskHandle_t webSocketSendTask;
TaskHandle_t webSocketPingTask;
TaskHandle_t sendAudioTaskHandle;
TaskHandle_t microphoneTaskHandle;

extern "C" void app_main(void) {
    // ═══════════════════════════════════════════════════════════
    // 第1步：初始化 NVS（非易失性存储）
    // ═══════════════════════════════════════════════════════════
    // 为什么第一个？
    // - NVS 存储 WiFi 凭据（SSID/密码）
    // - 后续的 WiFi 初始化需要读取 NVS 中的配置
    // - 如果 NVS 损坏或未初始化，WiFi 无法连接
    // 类比 Android：相当于 Mount /data 分区
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        // NVS 分区损坏，擦除后重新初始化
        nvs_flash_erase();
        nvs_flash_init();
    }

    // ═══════════════════════════════════════════════════════════
    // 第2步：创建默认事件循环
    // ═══════════════════════════════════════════════════════════
    // ESP-IDF 的事件系统，用于 WiFi 事件（连接/断开/获取IP）
    // 类比 Android：相当于注册 BroadcastReceiver
    esp_event_loop_create_default();

    // ═══════════════════════════════════════════════════════════
    // 第3步：启动显示系统
    // ═══════════════════════════════════════════════════════════
    // 初始化 LovyanGFX + LVGL
    // 分配显示缓冲区（需要 PSRAM！）
    // 显示启动画面
    startTheDisplay();

    // ═══════════════════════════════════════════════════════════
    // 第4步：初始化 WiFi Station 模式
    // ═══════════════════════════════════════════════════════════
    // Station 模式 = 连接到已有 WiFi 网络（不是创建热点）
    // 类比 Android：WifiManager.enableNetwork()
    wifi_init_sta();

    // ═══════════════════════════════════════════════════════════
    // 第5步：创建消息缓冲区和事件分发任务
    // ═══════════════════════════════════════════════════════════
    // eventsBuffer: 服务器→眼镜 的消息通道
    //   - 大小：1KB（够存一个 JSON 消息）
    //   - 类型：MessageBuffer（可变长度消息）
    eventsBuffer = xMessageBufferCreate(eventsBufferLen);

    // 创建事件分发任务
    //   - 栈大小：10KB（因为要处理 JSON 字符串，需要较多栈空间）
    //   - 优先级：1（中等优先级，所有任务相同）
    //   - 参数：NULL（不需要传参数）
    xTaskCreate(eventDistributor,
                "events_distribution_task",
                10 * 1024,
                NULL,
                1,
                &eventsTask);

    // ═══════════════════════════════════════════════════════════
    // 第6步：创建 WebSocket 发送缓冲区和通信任务
    // ═══════════════════════════════════════════════════════════
    // websocketSendBuffer: 眼镜→服务器 的消息通道
    //   - 大小：4KB（存音频数据块）
    websocketSendBuffer = xMessageBufferCreate(websocketSendBufferLen);

    // 启动 WebSocket 客户端
    //   - 发送缓冲区：4KB
    //   - 接收缓冲区：eventsBuffer（服务器消息直接写入）
    websocket_app_start(websocketSendBuffer,
                        websocketSendBufferLen,
                        eventsBuffer);

    // WebSocket 发送任务
    //   - 从 websocketSendBuffer 读取数据并通过网络发送
    xTaskCreate(websocket_send_loop,
                "web_socket_send_task",
                6 * 1024,     // 6KB 栈
                NULL,
                1,            // 优先级 1
                &webSocketSendTask);

    // 心跳保活任务
    //   - 每 30 秒发送一个 PING
    //   - 防止 WebSocket 连接超时断开
    xTaskCreate(ping_loop_task,
                "ping_loop_task",
                2 * 1024,     // 2KB 栈（任务很简单）
                NULL,
                1,
                &webSocketPingTask);

    // ═══════════════════════════════════════════════════════════
    // 第7步：初始化音频管线
    // ═══════════════════════════════════════════════════════════
    // 配置 I2S PDM 模式
    // 分配音频 DMA 缓冲区
    setup_audio_buffer();

    // 音频发送任务
    //   - 从音频缓冲区读取 PCM 数据
    //   - Base64 编码
    //   - 写入 websocketSendBuffer
    //   - 注意：传入了 websocketSendBuffer 作为参数！
    xTaskCreate(sendAudioChunk,
                "send_audio_chunk_task",
                6 * 1024,
                websocketSendBuffer,  // ← 参数：发送缓冲区句柄
                1,
                &sendAudioTaskHandle);

    // 麦克风采集任务
    //   - 配置 PDM 麦克风硬件
    //   - 持续从 I2S DMA 读取数据
    //   - 写入音频缓冲区（被 sendAudioChunk 消费）
    xTaskCreate(microphone_stream,
                "microphone_stream_task",
                6 * 1024,
                NULL,
                1,
                &microphoneTaskHandle);

    // ═══════════════════════════════════════════════════════════
    // app_main() 返回后，FreeRTOS 调度器接管
    // 5个任务开始并发运行
    // ═══════════════════════════════════════════════════════════
}
```

### 启动时序图

```
时间 ─────────────────────────────────────────────────────→

app_main() 调用
    │
    ├── nvs_flash_init()          ←── 1. NVS初始化
    │
    ├── esp_event_loop_create()   ←── 2. 事件循环
    │
    ├── startTheDisplay()         ←── 3. 显示初始化
    │   └── LovyanGFX init
    │   └── LVGL init
    │   └── 显示缓冲区分配
    │
    ├── wifi_init_sta()           ←── 4. WiFi初始化
    │   └── WiFi 开始连接...
    │        │
    │        │ (异步) ──── WiFi 连接成功 ──── 获取IP
    │
    ├── xMessageBufferCreate()    ←── 5. 创建消息缓冲区
    │
    ├── xTaskCreate(eventDist)    ←── 6. 事件分发任务 [开始运行]
    │
    ├── websocket_app_start()     ←── 7. WebSocket 初始化
    │   └── 开始连接服务器...
    │
    ├── xTaskCreate(ws_send)      ←── 8. WebSocket发送任务 [开始运行]
    ├── xTaskCreate(ping)         ←── 9. 心跳任务 [开始运行]
    │
    ├── setup_audio_buffer()      ←── 10. 音频硬件初始化
    │
    ├── xTaskCreate(sendAudio)    ←── 11. 音频发送任务 [开始运行]
    ├── xTaskCreate(micStream)    ←── 12. 麦克风采集任务 [开始运行]
    │
    └── return                    ←── app_main 返回
                                   FreeRTOS 调度器接管
                                   5个任务并发运行
```

### 关键设计问题分析

**Q: 为什么所有任务优先级都是 1？**

这不是最优设计。理想情况下：
- `microphone_stream_task` 应该是最高优先级（避免音频丢帧）
- `sendAudioChunk` 应该次高
- `eventDistributor` 中等
- `ping_loop_task` 最低

当前设计之所以"能用"，是因为 ESP32 是双核的——FreeRTOS 会自动将任务分配到两个核心上，减少了竞争。

**Q: 为什么用 MessageBuffer 而不是 Queue？**

- `Queue` 传输固定大小的消息（需要预先定义消息结构体）
- `MessageBuffer` 传输可变长度的消息（适合 JSON 字符串和变长音频块）
- `StreamBuffer` 是单生产者单消费者的（本项目场景：一个写一个读，但 MessageBuffer 更安全）

**Q: 栈大小 10KB/6KB/2KB 是怎么定的？**

- `eventDistributor` 用 10KB：需要处理 JSON 字符串（可能很长），`cJSON_Parse` 需要较多栈
- `sendAudioChunk` 用 6KB：Base64 编码需要临时缓冲区
- `microphone_stream` 用 6KB：I2S 驱动需要一些栈空间
- `ping_loop_task` 用 2KB：只发 "PING"，很轻量

---

## 2.7 构建配置详解

### platformio.ini 逐行解析

```ini
[env:pico32]                            # 构建目标环境名
platform = espressif32@5.1.1            # Espressif32 平台，版本 5.1.1
                                        # 这个版本包含 ESP-IDF v4.4.x
board = pico32                          # 开发板：ESP32-PICO-D4
                                        # PICO 是超小封装版本 (7×7mm)
framework = espidf                      # 使用 ESP-IDF 框架（非 Arduino）
                                        # ESP-IDF 提供最大控制力
monitor_speed = 115200                  # 串口监视器波特率
                                        # 和 ESP_LOG 的默认波特率一致
board_build.partitions = huge_app.csv   # 自定义分区表
                                        # 默认分区只有 1.6MB 给 app
                                        # huge_app 给 3MB（本项目固件较大）

board_build.f_cpu = 240000000L          # CPU 频率 = 240 MHz（最高）

build_flags =
    -Os                                 # 编译优化：优化代码大小
                                        # -O2 优化速度，-Os 优化大小
                                        # Flash 空间有限，优先减小体积
    -Wl,-Map,output.map                 # 链接器输出映射文件
                                        # 用于分析内存布局和符号
    -D LV_CONF_INCLUDE_SIMPLE           # LVGL 配置宏
                                        # 告诉 LVGL 直接 include "lv_conf.h"
    -I src/display                      # 添加头文件搜索路径
    -I src/utils
    -I src/microphones
    -I src/comms
```

### sdkconfig.defaults 解析

```ini
CONFIG_BOOTLOADER_WDT_TIME_MS=9000     # Bootloader 看门狗超时 9 秒
                                        # 防止 Bootloader 阶段卡死
CONFIG_ESPTOOLPY_FLASHSIZE_4MB=y       # Flash 大小 4MB
                                        # 必须与实际硬件匹配
```

### 构建流程

```
你运行 pio run 时，PlatformIO 背后做了什么？

1. 读取 platformio.ini → 确定目标平台、框架、编译选项
2. 下载工具链 → Xtensa GCC 编译器（首次构建时）
3. 下载平台包 → ESP-IDF v4.4.x + FreeRTOS
4. 处理依赖 → LVGL、LovyanGFX、cJSON
5. 运行 CMake → 生成构建文件
6. 编译源码 → .c/.cpp → .o
7. 链接 → .o → firmware.elf
8. 转换 → .elf → firmware.bin
9. 生成 Bootloader + 分区表

输出：
  .pio/build/pico32/
  ├── firmware.bin          ← 应用固件
  ├── bootloader.bin        ← Bootloader
  └── partitions.bin        ← 分区表
```

---

## 2.8 给音频工程师的架构理解指南

### 用 Android Audio Framework 来理解

```
Android Audio Architecture              OSSG Architecture
══════════════════════════              ═══════════════════

┌─────────────────┐                    ┌─────────────────┐
│   App (Java)     │                    │  Server (Python) │
│   AudioRecord    │                    │  Whisper ASR     │
│   AudioTrack     │                    │  GPT NLU         │
├─────────────────┤                    ├─────────────────┤
│  AudioFlinger    │                    │  eventDistributor│
│  MixerThread     │                    │  (消息路由)       │
│  BufferQueue     │                    │  MessageBuffer   │
├─────────────────┤                    ├─────────────────┤
│  Audio HAL       │                    │  WiFi + WebSocket│
│  (硬件抽象)       │                    │  (网络传输)       │
├─────────────────┤                    ├─────────────────┤
│  ALSA Driver     │                    │  I2S PDM Driver  │
│  (内核驱动)       │                    │  (ESP-IDF驱动)    │
├─────────────────┤                    ├─────────────────┤
│  I2S/CODEC HW    │                    │  PDM MEMS Mic    │
│  (硬件)          │                    │  (硬件)           │
└─────────────────┘                    └─────────────────┘

关键区别：
- Android: HAL→AudioFlinger→App 在同一设备上
- OSSG: 音频采集在眼镜，处理在服务器，通过WiFi连接
- OSSG 没有混音器（只有一个音频流）
- OSSG 没有AudioPolicy（只有一种音频用途：语音采集）
```

### 音频相关的代码路径

如果你想改造音频管线，需要关注这些文件：

```
音频数据流向（带文件位置）

1. 硬件初始化
   src/microphones/microphones.cpp
   └── setup_audio_buffer()
       └── 配置 I2S PDM 模式
       └── 分配 DMA 缓冲区

2. 音频采集
   src/microphones/microphones.cpp
   └── microphone_stream()  [FreeRTOS 任务]
       └── i2s_read() 循环
       └── 写入音频缓冲区

3. 音频编码和发送
   src/main.cpp
   └── sendAudioChunk()  [FreeRTOS 任务]
       └── 从缓冲区读取
       └── Base64 编码
       └── 写入 websocketSendBuffer

4. 网络传输
   src/comms/wifi_websocket_comms.cpp
   └── websocket_send_loop()  [FreeRTOS 任务]
       └── 从 websocketSendBuffer 读取
       └── WebSocket 发送到服务器

5. 结果接收
   src/comms/wifi_websocket_comms.cpp
   └── WebSocket 接收回调
       └── 写入 eventsBuffer

6. 结果处理和显示
   src/main.cpp → eventDistributor()
   └── JSON 解析 (src/utils/json_parse.cpp)
   └── 消息路由 (include/message_types.hpp)
   └── UI 更新 (src/display/displaymanager.cpp)
```

### 如果要加入本地音频处理

你作为音频工程师最关心的切入点：

```
方案A：在 sendAudioChunk 之前插入处理
─────────────────────────────────────
microphone_stream → [音频缓冲区] → 本地处理(VAD/NS/AEC) → sendAudioChunk → WebSocket

需要修改：
1. 在 microphone_stream 和 sendAudioChunk 之间加一个处理任务
2. 或者直接在 microphone_stream 中处理后再写入缓冲区

方案B：替换整个音频管线
─────────────────────────────────────
用 ESP-ADF 的 Pipeline 架构替换手写的采集-发送流程：
  [PDM Mic] → [AFE处理] → [编码器] → [WebSocket Sink]

需要修改：
1. 大幅重构音频模块
2. 引入 ESP-ADF 依赖
3. 可能需要更多 Flash 空间

方案C：混合方案（推荐）
─────────────────────────────────────
保留现有架构，在 microphone_stream 中添加本地 VAD：
  有语音时 → 正常发送音频
  无语音时 → 不发送（省带宽和功耗）
```

---

## 总结

| 你应该记住的 | 一句话总结 |
|-------------|-----------|
| 架构模式 | 瘦客户端：眼镜采集+显示，服务器做AI |
| 核心芯片 | ESP32-PICO-D4，240MHz双核，520KB RAM，4MB Flash |
| 操作系统 | FreeRTOS（5个任务并发） |
| 音频流 | PDM Mic → I2S → Ring Buffer → Base64 → WebSocket |
| 数据流 | WebSocket ↔ JSON ↔ eventDistributor ↔ UI |
| 显示 | LovyanGFX + LVGL → 复合视频 480×360 |
| 构建系统 | PlatformIO + ESP-IDF |

**下一篇**：[文档3 - FreeRTOS 实时操作系统与任务架构](03_freertos_and_task_architecture.md)

---

> **参考来源**：
> - OpenSourceSmartGlasses GitHub: https://github.com/Mentra-Community/OpenSourceSmartGlasses
> - ESP-IDF 编程指南: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/
> - PlatformIO 文档: https://docs.platformio.org/
