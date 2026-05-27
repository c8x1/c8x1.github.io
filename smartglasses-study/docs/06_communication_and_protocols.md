# 通信协议与系统互联——眼镜如何与世界对话

> **前置知识**：文档1-5
> **学习目标**：理解 WiFi、WebSocket、JSON 协议，以及 BLE 基础知识（面试必问）
> **预计学习时间**：2天

---

## 目录

- [6.1 WiFi 通信](#61-wifi-通信)
- [6.2 TCP/IP 与 WebSocket](#62-tcpip-与-websocket)
- [6.3 JSON 消息协议](#63-json-消息协议)
- [6.4 BLE 蓝牙低功耗](#64-ble-蓝牙低功耗)
- [6.5 交互时序图](#65-交互时序图)
- [6.6 面试要点](#66-面试要点)

---

## 6.1 WiFi 通信

### ESP32 WiFi 架构

```
ESP32 WiFi 协议栈（从上到下）

┌─────────────────────────────────┐
│  应用层                          │
│  WebSocket Client               │  ← 本项目使用
├─────────────────────────────────┤
│  传输层                          │
│  TCP (LwIP)                     │  ← 轻量级 TCP/IP 协议栈
├─────────────────────────────────┤
│  网络层                          │
│  IP (LwIP)                      │
├─────────────────────────────────┤
│  WiFi 驱动                      │
│  802.11 b/g/n (2.4GHz)         │  ← 硬件 MAC + 基带
├─────────────────────────────────┤
│  射频前端                        │
│  内置天线 / 外置天线             │  ← 2.4GHz 射频
└─────────────────────────────────┘
```

### Station 模式（本项目使用）

ESP32 有三种 WiFi 模式：
- **Station (STA)**：连接到已有 WiFi 网络（像手机连路由器）
- **SoftAP (AP)**：创建自己的 WiFi 热点（像手机开热点）
- **STA+AP**：同时连接和创建热点

本项目使用 Station 模式——眼镜连接到现有 WiFi 网络。

```c
// WiFi Station 初始化（简化版）
void wifi_init_sta(void) {
    // 1. 初始化 WiFi 底层资源
    ESP_ERROR_CHECK(esp_netif_init());
    esp_netif_create_default_wifi_sta();

    // 2. 使用默认配置初始化 WiFi
    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    // 3. 注册事件处理
    esp_event_handler_instance_t instance_any_id;
    esp_event_handler_instance_t instance_got_ip;
    esp_event_handler_instance_register(
        WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler, NULL, &instance_any_id);
    esp_event_handler_instance_register(
        IP_EVENT, IP_EVENT_STA_GOT_IP, &ip_event_handler, NULL, &instance_got_ip);

    // 4. 配置 SSID 和密码
    wifi_config_t wifi_config = {
        .sta = {
            .ssid = "YourWiFiSSID",
            .password = "YourWiFiPassword",
            .threshold.authmode = WIFI_AUTH_WPA2_PSK,  // WPA2 安全
        },
    };

    // 5. 启动 WiFi
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());

    ESP_LOGI("WiFi", "Connecting to WiFi...");
    // WiFi 连接是异步的——事件回调通知连接结果
}

// WiFi 事件处理
static void wifi_event_handler(void* arg, esp_event_base_t event_base,
                                int32_t event_id, void* event_data) {
    if (event_id == WIFI_EVENT_STA_CONNECTED) {
        ESP_LOGI("WiFi", "Connected to AP");
    } else if (event_id == WIFI_EVENT_STA_DISCONNECTED) {
        ESP_LOGI("WiFi", "Disconnected, reconnecting...");
        esp_wifi_connect();  // 自动重连
    }
}

// 获取 IP 地址
static void ip_event_handler(void* arg, esp_event_base_t event_base,
                              int32_t event_id, void* event_data) {
    ip_event_got_ip_t* event = (ip_event_got_ip_t*)event_data;
    ESP_LOGI("WiFi", "Got IP: " IPSTR, IP2STR(&event->ip_info.ip));
    // 现在可以开始 WebSocket 连接了
}
```

### WiFi 功耗分析

```
WiFi 各状态的功耗（ESP32）：

Active (TX):        ~170-240 mA    ← 正在发送数据
Active (RX):        ~100-130 mA    ← 正在接收数据
Modem Sleep:        ~20-50 mA      ← WiFi 关闭，CPU 运行
Light Sleep:        ~0.8 mA        ← CPU 暂停，WiFi 关闭
Deep Sleep:         ~0.01 mA       ← 几乎完全关闭

与 BLE 对比：
BLE Active (TX):    ~15-30 mA      ← 比 WiFi 低 5-10 倍！
BLE Sleep:          ~0.001 mA      ← 比 WiFi 低 10 倍！
BLE Scan:           ~10-20 mA

→ 为什么本项目用 WiFi 不用 BLE？
  因为 BLE 4.x 的带宽只有 ~250 kbps
  而音频流需要至少 256 kbps（16kHz 16bit PCM）
  BLE 5.0 的 2Mbps PHY 理论上够用，但实际吞吐量更低
  WiFi 的 ~20 Mbps 带宽绰绰有余
```

---

## 6.2 TCP/IP 与 WebSocket

### 网络协议分层

```
OSI 七层模型              本项目的协议栈               数据封装
────────────              ────────────────             ─────────

7. 应用层                 WebSocket (JSON)             应用数据
6. 表示层                 Base64/JSON 编码             ↑
5. 会话层                 WebSocket 会话管理            │
4. 传输层                 TCP                          TCP头 + 数据
3. 网络层                 IP                           IP头 + TCP头 + 数据
2. 数据链路层             WiFi (802.11)                802.11头 + IP包
1. 物理层                 2.4GHz 射频                  无线电波
```

### 为什么选择 WebSocket？

| 协议 | 特点 | 适合本项目？ |
|------|------|-------------|
| **WebSocket** | 双向实时、持久连接、低开销 | ✅ 完美匹配 |
| HTTP 轮询 | 每次请求都要建连、开销大 | ❌ 延迟高、开销大 |
| MQTT | 发布/订阅、IoT 标准 | △ 可以但不适合流数据 |
| 原始 TCP | 最灵活、需要自定义协议 | △ 可以但开发量大 |
| BLE | 低功耗、低带宽 | ❌ 带宽不够音频流 |

```
WebSocket 握手过程：

Client (ESP32)                       Server
    │                                   │
    │  ── HTTP GET /ws ───────────────→ │  升级请求
    │  Upgrade: websocket               │
    │  Connection: Upgrade              │
    │  Sec-WebSocket-Key: xxx           │
    │                                   │
    │  ←── HTTP 101 Switching ────────  │  同意升级
    │  Upgrade: websocket               │
    │  Sec-WebSocket-Accept: yyy        │
    │                                   │
    │  ═══ WebSocket 连接建立 ═══       │
    │                                   │
    │  ←──→ 双向实时通信 ←──→          │  全双工
    │  帧格式：                         │
    │  [FIN][OPCODE][MASK][PAYLOAD]     │
    │                                   │
```

### WebSocket 帧格式

```
WebSocket 帧：

  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length     |
 |I|S|S|S|  (4)  |A|     (7)     |            (16/64)             |
 |N|V|V|V|       |S|             |   (if payload len == 126/127)  |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |     Extended payload length continued (if payload len == 127)  |
 +-------------------------------+-------------------------------+
 |                               |Masking-key (if MASK set)       |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 |                     Payload Data continued                    |
 +---------------------------------------------------------------+

Opcode 类型：
  0x0 = Continuation（续帧）
  0x1 = Text（文本帧，本项目用于 JSON）
  0x2 = Binary（二进制帧，可优化为传输音频）
  0x8 = Close（关闭）
  0x9 = Ping（心跳请求）
  0xA = Pong（心跳响应）
```

### 本项目的 WebSocket 实现

```c
// src/comms/wifi_websocket_comms.hpp

// 接口函数
void wifi_init_sta();  // WiFi Station 初始化
void websocket_app_start(
    MessageBufferHandle_t sendBuf,    // 发送缓冲区 (4KB)
    size_t sendBufLen,
    MessageBufferHandle_t recvBuf     // 接收缓冲区 (eventsBuffer)
);
void websocket_send_loop(void *args); // 发送任务
void ping_loop_task(void *args);      // 心跳任务
void websocket_send_text(char *text); // 发送文本消息

// 工作流程：
// 1. wifi_init_sta() → 连接 WiFi
// 2. websocket_app_start() → 连接 WebSocket 服务器
// 3. 接收到的消息 → 写入 recvBuf (eventsBuffer)
// 4. websocket_send_loop() 从 sendBuf 读取 → 通过 WebSocket 发送
// 5. ping_loop_task() 每 30 秒发送 PING

// 发送循环（简化）
void websocket_send_loop(void *args) {
    char buffer[4096];
    while (1) {
        // 从发送缓冲区读取数据
        size_t len = xMessageBufferReceive(
            websocketSendBuffer, buffer, sizeof(buffer), portMAX_DELAY);

        if (len > 0) {
            // 通过 WebSocket 发送
            websocket_send_text(buffer);
        }
    }
}

// 心跳循环
void ping_loop_task(void *args) {
    while (1) {
        websocket_send_text("PING");  // 发送心跳
        vTaskDelay(pdMS_TO_TICKS(30000));  // 30秒间隔
    }
}
```

---

## 6.3 JSON 消息协议

### 消息格式

所有下行消息都是 JSON 格式，包含 `MESSAGE_TYPE` 字段用于路由：

```json
// 语音识别结果
{
    "MESSAGE_TYPE": "FINAL_TRANSCRIPT",
    "title": "User",
    "body": "今天天气怎么样"
}

// 搜索引擎结果
{
    "MESSAGE_TYPE": "SEARCH_ENGINE_RESULT",
    "title": "ESP32 - Wikipedia",
    "body": "ESP32 is a series of low-cost, low-power microcontrollers...",
    "image": "https://example.com/esp32.jpg"
}

// 翻译结果
{
    "MESSAGE_TYPE": "TRANSLATE_TEXT_RESULT",
    "title": "English → 中文",
    "body": "今天天气很好"
}

// 模式切换
{
    "MESSAGE_TYPE": "ACTION_SWITCH_MODES",
    "NEW_MODE": "MODE_LIVE_LIFE_CAPTIONS"
}

// 中间识别结果（流式）
{
    "MESSAGE_TYPE": "INTERMEDIATE_TRANSCRIPT",
    "title": "User",
    "body": "今天天..."  // 逐步更新
}
```

### 消息路由实现

```c
// eventDistributor 中的消息路由（简化）
void route_message(const char* json_string) {
    cJSON* root = cJSON_Parse(json_string);
    if (!root) return;

    cJSON* type_item = cJSON_GetObjectItem(root, "MESSAGE_TYPE");
    if (!type_item) { cJSON_Delete(root); return; }

    const char* type = type_item->valuestring;

    // 提取通用字段
    const char* title = cJSON_GetStringValue(cJSON_GetObjectItem(root, "title"));
    const char* body = cJSON_GetStringValue(cJSON_GetObjectItem(root, "body"));

    // 路由到对应的处理函数
    if (strcmp(type, "FINAL_TRANSCRIPT") == 0) {
        if (strcmp(current_mode, "MODE_LIFE_LIFE_CAPTIONS") == 0) {
            displayLiveCaptions(title, body);
        }
    }
    else if (strcmp(type, "SEARCH_ENGINE_RESULT") == 0) {
        const char* image = cJSON_GetStringValue(cJSON_GetObjectItem(root, "image"));
        displaySearchEngineResult(title, body, image ? image : "");
    }
    else if (strcmp(type, "TRANSLATE_TEXT_RESULT") == 0) {
        displayLiveCaptions(title, body);
    }
    else if (strcmp(type, "ACTION_SWITCH_MODES") == 0) {
        const char* new_mode = cJSON_GetStringValue(cJSON_GetObjectItem(root, "NEW_MODE"));
        if (new_mode) strncpy(current_mode, new_mode, sizeof(current_mode));
    }

    cJSON_Delete(root);
}
```

### 消息协议的评价与改进

**优点：**
- JSON 可读性好，方便调试
- `MESSAGE_TYPE` 字段简单明了
- 容易扩展新消息类型

**缺点：**
- JSON 文本开销大（键名每次重复传输）
- 没有版本控制
- 没有压缩
- 没有消息确认（不知道消息是否送达）

**改进建议：**

| 方案 | 开销节省 | 复杂度 | 适用阶段 |
|------|---------|--------|---------|
| MessagePack | ~30% | 低 | 快速改进 |
| Protocol Buffers | ~60% | 中 | 生产级 |
| CBOR | ~40% | 低 | IoT 常用 |
| 自定义二进制协议 | ~70% | 高 | 性能极致优化 |

---

## 6.4 BLE 蓝牙低功耗

> 虽然本项目没有使用 BLE，但 BLE 是面试中的高频考点，而且未来的智能眼镜几乎一定会用到。

### BLE vs 经典蓝牙

```
                  经典蓝牙 (BR/EDR)          BLE (Bluetooth Low Energy)
                  ══════════════════          ══════════════════════════
设计目标           音频流传输                  低功耗、间歇数据传输
功耗               ~30-50 mA                  ~0.01-15 mA
带宽               1-3 Mbps                   1-2 Mbps (BLE 5.0)
延迟               ~100ms 连接                ~3-6ms 连接
典型应用           耳机(A2DP)、鼠标(HID)       传感器、穿戴设备、Beacon
音频协议           A2DP, HFP                  LE Audio (BT 5.2+)

为什么智能眼镜需要两者？
  BLE：配对、通知、传感器数据、低功耗待机
  WiFi：音频流、大文件传输、AI 交互
  → 理想方案：BLE + WiFi 混合
```

### BLE GATT 架构

```
BLE GATT (Generic Attribute Profile) 是 BLE 的数据模型：

GATT Server（提供数据的一方）
┌─────────────────────────────────────────┐
│  Service A: Heart Rate                   │  ← 一个 Service
│  ├── Characteristic: Heart Rate Value    │  ← 可读的数据
│  │   └── Descriptor: Client Config      │  ← 配置通知
│  └── Characteristic: Body Location       │
│                                          │
│  Service B: Battery Level                │
│  └── Characteristic: Battery %           │
└─────────────────────────────────────────┘

类比 Android：
  GATT Server  ≈ ContentProvider（提供数据）
  Service      ≈ 一个数据表
  Characteristic ≈ 表中的列
  Read/Write/Notify ≈ query/insert/onChange

智能眼镜的 GATT 设计示例：
┌─────────────────────────────────────────┐
│  Service: SmartGlasses Control           │
│  ├── Characteristic: Mode (R/W)          │  读写当前模式
│  ├── Characteristic: Notification (N)    │  通知推送（Notify）
│  └── Characteristic: Audio Control (W)   │  开始/停止录音
│                                          │
│  Service: Battery                        │
│  └── Characteristic: Level (R/N)         │  电量百分比
│                                          │
│  Service: Device Info                    │
│  ├── Characteristic: Firmware Ver (R)    │  固件版本
│  └── Characteristic: Manufacturer (R)    │  制造商
└─────────────────────────────────────────┘
```

### BLE 音频：LE Audio (Bluetooth 5.2+)

```
LE Audio 是 BLE 的音频扩展，对智能眼镜非常重要：

新特性：
1. LC3 编解码器
   - 比 SBC 音质好
   - 码率更低（32-256 kbps）
   - 延迟更低（~20ms）

2. Auracast（广播音频）
   - 一个源 → 多个接收者
   - 公共场所音频共享

3. Isochronous Channels
   - 确定性延迟
   - 适合实时音频

对智能眼镜的意义：
  - 低功耗音频传输（比 WiFi 省电 5-10 倍）
  - 可以用于与手机配对的语音交互
  - 可以用于音频输出（提示音、TTS）

但注意：
  - ESP32 不支持 BLE 5.2（最高 BLE 4.2）
  - ESP32-C5 / ESP32-P4 支持更高版本
  - 目前智能眼镜主要还是 WiFi + BLE 4.x 混合方案
```

---

## 6.5 交互时序图

### 完整的语音交互时序

```
用户      ESP32眼镜         WiFi/网络      服务器(ASR+NLU)
│           │                 │               │
│ 说话      │                 │               │
│──────────→│                 │               │
│           │ PDM采集         │               │
│           │ I2S→PCM         │               │
│           │ Base64编码      │               │
│           │                 │               │
│           │ WebSocket发送   │               │
│           │────────────────→│ 转发           │
│           │                 │──────────────→│
│           │                 │               │ ASR处理
│           │                 │               │ (200-500ms)
│           │                 │               │
│           │                 │               │ NLU处理
│           │                 │               │ (500-2000ms)
│           │                 │               │
│           │                 │ JSON结果       │
│           │                 │←──────────────│
│           │ JSON接收        │               │
│           │←────────────────│               │
│           │                 │               │
│           │ JSON解析        │               │
│           │ UI更新          │               │
│           │ LVGL渲染        │               │
│           │                 │               │
│ 看到结果  │                 │               │
│←──────────│                 │               │
│           │                 │               │

总延迟：~1-3秒
瓶颈：ASR + NLU 推理
```

### 模式切换时序

```
用户      ESP32眼镜          服务器
│           │                  │
│ 双击触摸板│                  │
│──────────→│                  │
│           │ SG_TOUCHPAD_EVENT│
│           │─────────────────→│
│           │                  │ 切换到字幕模式
│           │ ACTION_SWITCH    │
│           │←─────────────────│
│           │                  │
│           │ currentMode =    │
│           │ MODE_LIVE_       │
│           │ CAPTIONS         │
│           │                  │
│           │ 后续的 ASR 结果  │
│           │ 路由到字幕显示   │
```

---

## 6.6 面试要点

### 1. TCP vs UDP 选择
- **TCP**：可靠、有序、有重传 → 适合控制消息和需要完整性的数据
- **UDP**：不可靠、无序、无重传 → 适合实时音视频（可以丢帧但延迟低）
- **本项目用 TCP（WebSocket over TCP）**：因为语音识别需要完整音频
- **改进方案**：实时音频可以用 UDP（类似 WebRTC），容忍少量丢包

### 2. WebSocket vs MQTT
- **WebSocket**：双向实时、适合流数据、TCP 基础
- **MQTT**：发布/订阅、适合 IoT 控制、轻量
- **选择**：音频流用 WebSocket，控制命令可以用 MQTT

### 3. BLE vs WiFi 功耗
- BLE：~0.01-15 mA，适合间歇小数据
- WiFi：~20-240 mA，适合大数据流
- 混合方案：BLE 用于配对+通知，WiFi 用于音频流

### 4. 嵌入式网络安全
- TLS/SSL 在 ESP32 上的实现（mbedTLS）
- HTTPS/FTPS/WSS (WebSocket Secure)
- 证书验证和固定（Certificate Pinning）
- OTA 固件签名验证

### 5. JSON vs 二进制协议
- JSON：可读性好、调试方便、开销大
- Protobuf：紧凑高效、需要 schema、调试不便
- 选择原则：原型用 JSON，生产用二进制

---

## 总结

| 协议 | 在项目中的角色 | 面试重要度 |
|------|--------------|-----------|
| WiFi Station | 网络连接基础设施 | ⭐⭐ |
| TCP | 传输层可靠性保证 | ⭐⭐ |
| WebSocket | 双向实时通信通道 | ⭐⭐⭐ |
| JSON/cJSON | 消息编码和解析 | ⭐⭐ |
| BLE GATT | 面试必考（项目未用） | ⭐⭐⭐ |
| LE Audio | 未来趋势 | ⭐⭐ |

**下一篇**：[文档7 - 系统集成与Demo路线图](07_integration_and_roadmap.md)

---

> **参考来源**：
> - ESP-IDF WiFi 文档: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/wifi.html
> - WebSocket 协议 RFC 6455: https://tools.ietf.org/html/rfc6455
> - BLE Core Specification: https://www.bluetooth.com/specifications/specs/core-specification/
> - cJSON 库: https://github.com/DaveGamble/cJSON
