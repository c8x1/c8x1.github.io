# FreeRTOS 实时操作系统与任务架构——深入源码

> **前置知识**：文档1（嵌入式基础）、文档2（项目全局架构）
> **学习目标**：深入理解 FreeRTOS 核心概念，能读懂并修改项目的任务架构
> **预计学习时间**：2天

---

## 目录

- [3.1 FreeRTOS 核心概念](#31-freertos-核心概念)
- [3.2 项目中的任务架构深度分析](#32-项目中的任务架构深度分析)
- [3.3 app_main 逐步深度解析](#33-app_main-逐步深度解析)
- [3.4 事件分发机制](#34-事件分发机制)
- [3.5 内存管理策略](#35-内存管理策略)
- [3.6 面试高频考点](#36-面试高频考点)
- [3.7 实践练习](#37-实践练习)

---

## 3.1 FreeRTOS 核心概念

### 什么是 FreeRTOS？

FreeRTOS 是一个**实时操作系统内核**，提供：
- **多任务调度**：让多个任务"同时"运行（时间片轮转）
- **任务间通信**：队列、消息缓冲区
- **同步机制**：信号量、互斥锁
- **定时服务**：软件定时器、精确延迟

```
没有 FreeRTOS（裸机）：             有 FreeRTOS：

CPU                               CPU
┌──────────────────────┐          ┌──────────────────────┐
│                      │          │  ┌──────┐ ┌──────┐   │
│   while(1) {         │          │  │Task A│ │Task B│   │
│     做所有事情        │          │  │ 音频  │ │ 通信  │   │
│     串行执行          │          │  └──┬───┘ └──┬───┘   │
│   }                  │          │     │        │       │
│                      │          │  ┌──┴────────┴──┐   │
│   一个任务阻塞 =     │          │  │  FreeRTOS     │   │
│   整个系统卡住       │          │  │  调度器        │   │
│                      │          │  │  自动切换任务  │   │
└──────────────────────┘          │  └───────────────┘   │
                                  │  ┌──────┐ ┌──────┐   │
                                  │  │Task C│ │Task D│   │
                                  │  │ 显示  │ │ 传感器│   │
                                  │  └──────┘ └──────┘   │
                                  └──────────────────────┘

                                  任务 A 阻塞时，
                                  其他任务照常运行！
```

### 与 Android 的类比

| FreeRTOS 概念 | Android 对应 | 说明 |
|--------------|-------------|------|
| Task | Thread | 独立执行线程 |
| xTaskCreate() | new Thread().start() | 创建并启动任务 |
| vTaskDelay() | Thread.sleep() | 延迟（但不占CPU） |
| Queue | BlockingQueue | 线程安全队列 |
| MessageBuffer | MessageQueue + Handler | 可变长度消息传递 |
| Mutex | synchronized / ReentrantLock | 互斥锁 |
| Semaphore | java.util.concurrent.Semaphore | 信号量 |
| Software Timer | Handler.postDelayed() | 定时回调 |
| Priority | Thread.setPriority() | 优先级调度 |
| Tick (1ms) | 系统时钟中断 | 调度的基本时间单位 |

---

### Task（任务）

#### 任务状态机

```
                    xTaskCreate()
                         │
                         ↓
┌──────────┐    调度器选中    ┌──────────┐
│  Ready   │ ──────────────→│ Running  │
│  就绪     │ ←────────────── │  运行中   │
│  等待CPU  │    被抢占/时间片  │  正在执行  │
└────┬─────┘                 └────┬─────┘
     │                            │
     │                            │ vTaskDelay()
     │                            │ xQueueReceive()
     │                            │ xMessageBufferReceive()
     │                            │ (等待事件)
     │                            ↓
     │                       ┌──────────┐
     │  事件发生              │ Blocked  │
     │ ←──────────────────── │  阻塞     │
     │                       │  等待事件  │
     │                       └──────────┘
     │
     │  vTaskSuspend()
     │ ←─────────────────────────────────
     │                                    External
┌────┴─────┐                              Resume
│Suspended │ ←───────────────────────────
│  挂起     │
└──────────┘

vTaskDelete() → 从任何状态 → 删除任务（释放资源）
```

#### 任务创建 API

```c
// 动态创建任务（最常用）
BaseType_t xTaskCreate(
    TaskFunction_t pxTaskCode,    // 任务函数
    const char * const pcName,    // 任务名（调试用）
    const uint16_t usStackDepth,  // 栈大小（单位：字，不是字节！）
                                  // ESP32: 1字 = 4字节
                                  // 所以 10*1024 = 10KB 栈
    void * const pvParameters,    // 传给任务的参数
    UBaseType_t uxPriority,       // 优先级（数字越大越优先）
    TaskHandle_t * const pxCreatedTask  // 任务句柄（输出）
);

// 返回值：pdPASS = 成功，errCOULD_NOT_ALLOCATE_REQUIRED_MEMORY = 失败
```

#### 调度算法

FreeRTOS 使用**抢占式优先级调度**：

```
规则1：高优先级任务 always 优先于低优先级任务
规则2：同优先级任务 round-robin 时间片轮转
规则3：空闲任务（优先级0）在没有其他任务就绪时运行

示例（3个任务，优先级1/2/3）：

时间 ─────────────────────────────────────→
      ┌──────┐        ┌──────┐
Task C│ 运行  │        │ 运行  │        优先级3（最高）
(pri3)└──────┘        └──────┘
             ┌──────┐              ┌──────┐
Task B│      │ 运行  │              │ 运行  │  优先级2
(pri2)│      └──────┘              └──────┘
                    ┌──────────────────────┐
Task A│             │     运行             │  优先级1（最低）
(pri1)│             └──────────────────────┘

Task C 就绪时，立即抢占 A 和 B
Task B 就绪时，立即抢占 A
```

> **面试考点**：FreeRTOS 的调度是**确定性的**——给定相同的任务优先级和就绪状态，调度结果是完全确定的。这与 Linux 的 CFS 调度器不同。

---

### Queue（队列）vs MessageBuffer（消息缓冲区）

#### Queue

```c
// 创建队列（固定大小元素）
QueueHandle_t xQueueCreate(UBaseType_t uxQueueLength,   // 队列长度（元素个数）
                           UBaseType_t uxItemSize);      // 每个元素大小（字节）

// 发送（写入队列尾部）
xQueueSend(queue, &item, portMAX_DELAY);  // 阻塞等待
xQueueSendToFront(queue, &item, 0);       // 非阻塞，写到队列头部

// 接收（从队列头部读取）
xQueueReceive(queue, &item, portMAX_DELAY);  // 阻塞等待

// 示例：传递整数
QueueHandle_t audioQueue = xQueueCreate(10, sizeof(int16_t));
int16_t sample = 1234;
xQueueSend(audioQueue, &sample, portMAX_DELAY);
xQueueReceive(audioQueue, &sample, portMAX_DELAY);
```

#### MessageBuffer（本项目使用）

```c
// 创建消息缓冲区（可变长度消息）
MessageBufferHandle_t xMessageBufferCreate(size_t xBufferSizeBytes);

// 发送可变长度消息
size_t xMessageBufferSend(MessageBufferHandle_t xMessageBuffer,
                          const void *pvTxData,        // 数据指针
                          size_t xDataLengthBytes,      // 数据长度
                          TickType_t xTicksToWait);     // 超时

// 接收可变长度消息
size_t xMessageBufferReceive(MessageBufferHandle_t xMessageBuffer,
                             void *pvRxData,            // 接收缓冲区
                             size_t xBufferLengthBytes,  // 缓冲区大小
                             TickType_t xTicksToWait);   // 超时

// 示例：传递 JSON 字符串
char jsonMsg[] = "{\"MESSAGE_TYPE\":\"FINAL_TRANSCRIPT\",\"body\":\"hello\"}";
xMessageBufferSend(eventsBuffer, jsonMsg, strlen(jsonMsg), portMAX_DELAY);

char rxBuffer[1024];
size_t received = xMessageBufferReceive(eventsBuffer, rxBuffer, sizeof(rxBuffer), portMAX_DELAY);
rxBuffer[received] = '\0';  // 确保字符串终止
```

#### 为什么项目用 MessageBuffer 而不是 Queue？

```
Queue:
  ✗ 固定大小元素——必须定义一个最大长度的结构体
  ✗ 浪费空间（短消息也占最大元素的空间）
  ✓ 支持多生产者多消费者

MessageBuffer:
  ✓ 可变长度消息——JSON 字符串长度不固定
  ✓ 节省空间（只存实际消息长度）
  ✗ 只支持单生产者单消费者
  → 本项目：WebSocket接收回调(生产者) → eventDistributor(消费者)，单对单，完美匹配
```

---

### Semaphore（信号量）& Mutex（互斥锁）

```
三种同步原语：

1. 二值信号量 (Binary Semaphore)
   值：0 或 1
   用途：事件通知
   类比 Android：CountDownLatch(1)

   Task A (等待)               Task B (通知)
   xSemaphoreTake(sem,         xSemaphoreGive(sem);
       portMAX_DELAY);  ←── 信号量变为1
   // 被唤醒，继续执行

2. 计数信号量 (Counting Semaphore)
   值：0 到 N
   用途：资源计数
   类比：Semaphore(N)

   // 管理 3 个音频缓冲区
   SemaphoreHandle_t bufSem = xSemaphoreCreateCounting(3, 3);
   // 获取缓冲区
   xSemaphoreTake(bufSem, portMAX_DELAY);  // 计数-1
   // 释放缓冲区
   xSemaphoreGive(bufSem);                 // 计数+1

3. 互斥锁 (Mutex)
   值：0 或 1，但有优先级继承
   用途：保护共享资源
   类比 Android：synchronized 块

   // 保护 I2C 总线（同时只有一个任务能访问）
   SemaphoreHandle_t i2cMutex = xSemaphoreCreateMutex();

   void taskA() {
       xSemaphoreTake(i2cMutex, portMAX_DELAY);  // 加锁
       i2c_write(...);                            // 访问 I2C
       xSemaphoreGive(i2cMutex);                  // 解锁
   }
```

#### 优先级反转问题

```
无优先级继承（二值信号量）：

  高优先级 Task H 想获取已被低优先级 Task L 持有的锁
  Task H 必须等待 Task L 释放锁
  但 Task L 可能被中优先级 Task M 抢占
  → Task H 被 Task M 间接阻塞！（优先级反转）

  解决方案：Mutex 有优先级继承
  当 Task H 等待 Task L 的 Mutex 时，
  Task L 的优先级临时提升到 Task H 的级别
  → Task L 不会被 Task M 抢占
  → Task L 尽快释放锁
  → Task H 尽快获得锁
```

> **面试考点**：什么是优先级反转？Mutex 如何通过优先级继承解决？著名的火星探路者号优先级反转事故。

---

### Software Timer（软件定时器）

```c
// 创建周期定时器（类似 Handler.postDelayed 的循环版）
TimerHandle_t xTimerCreate(
    const char *pcTimerName,
    TickType_t xTimerPeriodInTicks,    // 周期
    UBaseType_t uxAutoReload,          // pdTRUE = 周期, pdFALSE = 单次
    void *pvTimerID,                   // 定时器ID
    TimerCallbackFunction_t pxCallbackFunction  // 回调函数
);

// 回调函数在 Timer Daemon Task 中执行
// 不要在回调中做耗时操作！
void timerCallback(TimerHandle_t xTimer) {
    // 轻量操作，如设置标志位、发送信号量
    xSemaphoreGive(heartbeatSem);
}
```

---

## 3.2 项目中的任务架构深度分析

### 完整任务关系图

```
┌──────────────────────────────────────────────────────────────────┐
│                      app_main() 初始化                           │
│  NVS → 事件循环 → 显示 → WiFi → 缓冲区 → 5个任务               │
└──────────────────────────────┬───────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
    ┌────┴─────┐         ┌────┴─────┐         ┌────┴─────┐
    │ Core 0   │         │ 共享资源  │         │ Core 1   │
    │ (协议栈)  │         │          │         │ (应用)    │
    │          │         │ ┌──────┐ │         │          │
    │ wifi_    │         │ │events│ │         │ event_   │
    │ init_sta │         │ │Buffer│ │         │ Distrib- │
    │          │         │ │(1KB) │ │         │ utor     │
    │          │         │ └──┬───┘ │         │ (10KB栈) │
    │          │         │    │     │         │          │
    │          │         │ ┌──┴───┐ │         │ 读JSON → │
    │          │←─WebSocket──────→ │ │         │ 解析 →   │
    │          │  接收回调  │ │wsSend│ │         │ 路由到UI │
    │          │  写events │ │Buffer│ │         │          │
    │          │  Buffer   │ │(4KB) │ │         └──────────┘
    │          │         │ └──┬───┘ │
    │  ┌──────┐│         │    │     │         ┌──────────┐
    │  │ws_   ││         │    │     │         │ mic_     │
    │  │send_ ││         │    │     │         │ stream   │
    │  │loop  ││         │    │     │         │ (6KB栈)  │
    │  │(6KB) ││←───────│←───┘     │         │          │
    │  └──────┘│ 读wsSend │         │         │ I2S采集 →│
    │          │ Buffer   │         │         │ 写音频   │
    │  ┌──────┐│         │         │         │ 缓冲区   │
    │  │ping_ ││         │         │         └──────────┘
    │  │loop  ││                              ┌──────────┐
    │  │(2KB) ││                              │sendAudio │
    │  │30s心跳││                              │Chunk     │
    │  └──────┘│                              │ (6KB栈)  │
    └──────────┘                              │          │
                                              │ 读音频 → │
                                              │ Base64 → │
                                              │ wsSend → │
                                              │ 网络发送 │
                                              └──────────┘

数据流向：
  麦克风 → [音频缓冲] → sendAudio → [wsSend缓冲] → ws_send_loop → 网络 → 服务器
  服务器 → 网络 → WebSocket接收 → [events缓冲] → eventDistributor → UI
```

### 每个任务的详细分析

#### Task 1: eventDistributor（事件分发器）

```
职责：接收服务器 JSON 消息，解析并路由到对应的 UI 处理函数
栈大小：10 KB（最大，因为需要处理 JSON 字符串）
优先级：1
数据流：eventsBuffer → cJSON 解析 → UI 函数调用

为什么需要 10KB 栈？
  - cJSON_Parse() 需要大量栈空间（递归解析）
  - JSON 字符串本身可能很长（搜索结果含图片URL等）
  - 需要存储 currentMode[1024]（当前模式字符串）

类比 Android：
  相当于一个 HandlerThread，从 MessageQueue 取消息，
  根据 what 类型分发到不同的处理逻辑
```

#### Task 2: websocket_send_loop（WebSocket 发送）

```
职责：从 websocketSendBuffer 读取数据，通过 WebSocket 发送到服务器
栈大小：6 KB
优先级：1
数据流：websocketSendBuffer → WebSocket API

类比 Android：
  相当于一个后台线程从 BlockingQueue 取数据，用 OkHttp 发 HTTP 请求
```

#### Task 3: ping_loop_task（心跳保活）

```
职责：每 30 秒发送一个 PING 消息，保持 WebSocket 连接
栈大小：2 KB（最小，任务很简单）
优先级：1

为什么不直接发送？要通过 websocketSendBuffer？
  如果直接调用 WebSocket API，可能与 ws_send_loop 竞争
  但看代码，ping 可能直接调用了 websocket_send_text()——这是个潜在的线程安全问题

改进建议：
  应该通过 websocketSendBuffer 发送 PING，而不是直接调用
  或者将这个任务改为 FreeRTOS Software Timer
```

#### Task 4: sendAudioChunk（音频发送）

```
职责：从音频缓冲区读取 PCM 数据，Base64 编码，写入 WebSocket 发送缓冲区
栈大小：6 KB
优先级：1
参数：websocketSendBuffer（发送缓冲区句柄）
数据流：音频缓冲区 → Base64编码 → websocketSendBuffer

为什么传入 websocketSendBuffer？
  因为这个任务需要知道往哪里写编码后的音频数据
  通过 xTaskCreate 的 pvParameters 传入

类比 Android：
  相当于 AudioTrack 的写入线程，但方向相反（读取→编码→发送）
```

#### Task 5: microphone_stream（麦克风采集）

```
职责：持续从 I2S PDM 读取音频数据，写入音频缓冲区
栈大小：6 KB
优先级：1
数据流：I2S DMA → 音频缓冲区

类比 Android：
  相当于 AudioRecord 的录制线程
  i2s_read() ≈ AudioRecord.read()
  写入缓冲区 ≈ 写入 AudioFlinger 的 shared memory

这个任务的优先级应该是最高！
  因为音频采集是实时任务，如果被延迟会导致丢帧
  建议提升到优先级 3-5
```

### 为什么所有任务优先级都是 1？

```
优点：
  ✓ 简单——不需要考虑优先级反转
  ✓ 所有任务公平竞争 CPU
  ✓ ESP32 是双核，一定程度上缓解了竞争

缺点：
  ✗ 音频采集可能被其他任务延迟（丢帧风险）
  ✗ 心跳任务和音频任务同等重要（不合理）
  ✗ 在高负载时可能出现音频卡顿

理想的优先级设置：
  microphone_stream:   优先级 5（最高，实时性要求最高）
  sendAudioChunk:      优先级 4
  eventDistributor:    优先级 3
  websocket_send_loop: 优先级 2
  ping_loop_task:      优先级 1（最低）
```

---

## 3.3 app_main 逐步深度解析

### 初始化顺序能否改变？

```
当前顺序：NVS → 事件循环 → 显示 → WiFi → 消息缓冲区 → 任务 → 音频

可以改变的：
  - 显示和WiFi的顺序可以互换
  - 音频初始化可以在WiFi之前

不能改变的（依赖关系）：
  1. NVS 必须在 WiFi 之前（WiFi 需要 NVS 读凭据）
  2. 事件循环必须在 WiFi 之前（WiFi 事件需要事件循环）
  3. 消息缓冲区必须在任务之前（任务需要缓冲区句柄）
  4. WebSocket 必须在 WiFi 连接之后（但代码中WiFi连接是异步的）
```

### 缺失的错误处理

```c
// 当前代码（简化）
nvs_flash_init();
esp_event_loop_create_default();
startTheDisplay();
wifi_init_sta();
eventsBuffer = xMessageBufferCreate(eventsBufferLen);
xTaskCreate(eventDistributor, ...);

// 问题：如果任何一步失败怎么办？
// 1. nvs_flash_init() 可能返回错误
// 2. xMessageBufferCreate() 可能返回 NULL（内存不足）
// 3. xTaskCreate() 可能返回 errCOULD_NOT_ALLOCATE_REQUIRED_MEMORY

// 改进后的代码应该包含错误检查
esp_err_t ret = nvs_flash_init();
if (ret != ESP_OK) {
    ESP_LOGE("MAIN", "NVS init failed: %s", esp_err_to_name(ret));
    // 处理错误...
}

eventsBuffer = xMessageBufferCreate(eventsBufferLen);
if (eventsBuffer == NULL) {
    ESP_LOGE("MAIN", "Failed to create events buffer!");
    // 处理错误...
}

BaseType_t taskRet = xTaskCreate(eventDistributor, "events_distribution_task", 10*1024, NULL, 1, &eventsTask);
if (taskRet != pdPASS) {
    ESP_LOGE("MAIN", "Failed to create event distributor task!");
    // 处理错误...
}
```

---

## 3.4 事件分发机制

### eventDistributor 完整工作流

```c
void eventDistributor(void *args) {
    // 初始化消息类型常量
    MessageTypes messageTypesList = MessageTypes();

    // 当前模式（状态机的状态变量）
    char currentMode[1024] = messageTypesList.MODE_HOME;

    // JSON 字符串缓冲区（在栈上分配！这就是为什么需要10KB栈）
    char jsonString[eventsBufferLen];

    while (true) {
        // 阻塞等待消息（portMAX_DELAY = 永久等待）
        int bytes_written = xMessageBufferReceive(
            eventsBuffer,          // 从哪里读
            jsonString,            // 读到哪里
            eventsBufferLen,       // 最大读取长度
            portMAX_DELAY          // 永久等待
        );

        if (bytes_written != 0) {
            // 解析 JSON
            JsonMessageParser* jsonMessageParser = new JsonMessageParser(jsonString);
            char* messageType = jsonMessageParser->getMessageType();
            char* title = jsonMessageParser->getJsonKey("title");
            char* body = jsonMessageParser->getJsonKey("body");

            // ═══ 消息路由（if-else 链）═══

            if (!strcmp(messageType, messageTypesList.FINAL_TRANSCRIPT)) {
                // 语音识别最终结果
                if (!strcmp(currentMode, messageTypesList.MODE_LIVE_LIFE_CAPTIONS)) {
                    displayLiveCaptions(title, body);
                }
                // 可以根据模式做不同的处理
            }
            else if (!strcmp(messageType, messageTypesList.INTERMEDIATE_TRANSCRIPT)) {
                // 语音识别中间结果（流式）
                // 显示部分识别结果
            }
            else if (!strcmp(messageType, messageTypesList.SEARCH_ENGINE_RESULT)) {
                // 搜索引擎结果
                char* image = jsonMessageParser->getJsonKey("image");
                displaySearchEngineResult(title, body, image);
            }
            else if (!strcmp(messageType, messageTypesList.TRANSLATE_TEXT_RESULT)) {
                // 翻译结果
                displayLiveCaptions(title, body);
            }
            else if (!strcmp(messageType, messageTypesList.ACTION_SWITCH_MODES)) {
                // 模式切换
                char* newMode = jsonMessageParser->getJsonKey("NEW_MODE");
                snprintf(currentMode, sizeof(currentMode), "%s", newMode);
                // 更新UI到新模式
            }

            // 释放 JSON 解析器
            delete jsonMessageParser;
        }
    }
}
```

### 消息类型系统 (message_types.hpp)

```cpp
class MessageTypes {
public:
    // ═══ 音频相关 ═══
    const char* AUDIO_CHUNK_ENCRYPTED = "AUDIO_CHUNK_ENCRYPTED";
    const char* AUDIO_DATA = "AUDIO_DATA";

    // ═══ 语音识别 ═══
    const char* FINAL_TRANSCRIPT = "FINAL_TRANSCRIPT";
    const char* INTERMEDIATE_TRANSCRIPT = "INTERMEDIATE_TRANSCRIPT";
    const char* TRANSCRIPT_TEXT = "TRANSCRIPT_TEXT";

    // ═══ 语音命令 ═══
    const char* VOICE_COMMAND_STREAM_EVENT = "VOICE_COMMAND_STREAM_EVENT";
    const char* WAKE_WORD_EVENT_TYPE = "WAKE_WORD_EVENT_TYPE";
    const char* COMMAND_EVENT_TYPE = "COMMAND_EVENT_TYPE";

    // ═══ AI 功能 ═══
    const char* SEARCH_ENGINE_RESULT = "SEARCH_ENGINE_RESULT";
    const char* SEARCH_ENGINE_RESULT_DATA = "SEARCH_ENGINE_RESULT_DATA";
    const char* TRANSLATE_TEXT_RESULT = "TRANSLATE_TEXT_RESULT";

    // ═══ 模式控制 ═══
    const char* ACTION_SWITCH_MODES = "ACTION_SWITCH_MODES";
    const char* NEW_MODE = "NEW_MODE";

    const char* MODE_HOME = "MODE_HOME";
    const char* MODE_LIVE_LIFE_CAPTIONS = "MODE_LIFE_LIFE_CAPTIONS";
    const char* MODE_VISUAL_SEARCH = "MODE_VISUAL_SEARCH";
    const char* MODE_LANGUAGE_TRANSLATE = "MODE_LANGUAGE_TRANSLATE";

    // ═══ 其他 ═══
    const char* TIMESTAMP = "TIMESTAMP";
    const char* SG_TOUCHPAD_EVENT = "SG_TOUCHPAD_EVENT";
    const char* FACE_SIGHTING_EVENT = "FACE_SIGHTING_EVENT";
};
```

### 状态机：模式切换

```
MODE_HOME (默认)
    │
    ├─ ACTION_SWITCH_MODES → MODE_LIVE_LIFE_CAPTIONS
    │   └─ 实时字幕模式
    │   └─ FINAL_TRANSCRIPT → displayLiveCaptions()
    │
    ├─ ACTION_SWITCH_MODES → MODE_VISUAL_SEARCH
    │   └─ 视觉搜索模式
    │   └─ SEARCH_ENGINE_RESULT → displaySearchEngineResult()
    │
    └─ ACTION_SWITCH_MODES → MODE_LANGUAGE_TRANSLATE
        └─ 翻译模式
        └─ TRANSLATE_TEXT_RESULT → displayLiveCaptions()

模式切换决定了同一条消息如何被处理！
这是典型的 "策略模式" (Strategy Pattern)
```

### cJSON 使用示例

```c
#include "cJSON.h"

// 解析 JSON
char* jsonString = "{\"MESSAGE_TYPE\":\"FINAL_TRANSCRIPT\",\"body\":\"Hello World\"}";

cJSON* root = cJSON_Parse(jsonString);
if (root == NULL) {
    ESP_LOGE("JSON", "Parse error");
    return;
}

// 获取字符串字段
cJSON* typeItem = cJSON_GetObjectItem(root, "MESSAGE_TYPE");
if (typeItem && cJSON_IsString(typeItem)) {
    char* type = typeItem->valuestring;
    ESP_LOGI("JSON", "Message type: %s", type);
}

// 获取嵌套对象
cJSON* bodyItem = cJSON_GetObjectItem(root, "body");
if (bodyItem && cJSON_IsString(bodyItem)) {
    ESP_LOGI("JSON", "Body: %s", bodyItem->valuestring);
}

// 重要：用完必须释放！
cJSON_Delete(root);
```

### JSON 解析的内存风险

```c
// 项目中的 JsonMessageParser 实现
class JsonMessageParser {
    char* messageType;
    cJSON* jsonObj;

public:
    JsonMessageParser(char* jsonString) {
        jsonObj = cJSON_Parse(jsonString);
        if (jsonObj) {
            cJSON* typeItem = cJSON_GetObjectItem(jsonObj, "MESSAGE_TYPE");
            if (typeItem) {
                messageType = typeItem->valuestring;
                // ⚠️ 注意：messageType 指向 cJSON 内部的字符串
                // 不能在 cJSON_Delete 之后使用！
            }
        }
    }

    char* getJsonKey(const char* key) {
        if (cJSON_GetObjectItem(jsonObj, key)) {
            return cJSON_GetObjectItem(jsonObj, key)->valuestring;
        }
        return (char*)"fuck";  // ⚠️ 原始代码的错误处理——生产代码应改进
    }

    ~JsonMessageParser() {
        cJSON_Delete(jsonObj);  // 释放 cJSON 分配的内存
    }
};
```

**风险分析：**
1. `new JsonMessageParser()` 使用了动态内存分配——在嵌入式中有碎片化风险
2. `getJsonKey()` 返回的指针指向 cJSON 内部——必须在 `delete` 之前使用
3. 错误处理粗糙——应该返回 NULL 并让调用者检查

---

## 3.5 内存管理策略

### ESP32 内存架构

```
┌──────────────────────────────────────────┐
│              ESP32 内存映射               │
│                                          │
│  内部 SRAM (520KB)                       │
│  ├── .data 段 (~20KB)  — 已初始化全局变量 │
│  ├── .bss 段 (~30KB)   — 未初始化全局变量 │
│  ├── WiFi/BLE 栈 (~50KB)                │
│  ├── FreeRTOS 堆 (~200KB)               │
│  │   ├── 任务栈 (10+6+6+6+2 = 30KB)     │
│  │   ├── 消息缓冲区 (4+1 = 5KB)          │
│  │   └── 动态分配                        │
│  └── 剩余可用堆 (~170KB)                │
│                                          │
│  外部 PSRAM (可选, 2-8MB)               │
│  ├── 显示缓冲区 (~340KB, 480×360×2)     │
│  ├── 大块数据缓冲区                      │
│  └── 剩余可用 (~3.6MB)                  │
│                                          │
│  Flash (4MB, XIP)                       │
│  ├── .text 段 — 代码（直接执行）          │
│  ├── .rodata 段 — 只读数据（常量字符串）  │
│  └── SPIFFS 文件系统 (960KB)            │
└──────────────────────────────────────────┘
```

### 分区表详解

```
huge_app.csv:
# Name,   Type, SubType, Offset,   Size
nvs,      data, nvs,     0x9000,   0x5000     ← 20KB NVS
otadata,  data, ota,     0xe000,   0x2000     ← 8KB OTA状态
app0,     app,  ota_0,   0x10000,  0x300000   ← 3MB 应用固件
spiffs,   data, spiffs,  0x310000, 0xF0000    ← 960KB 文件系统

为什么叫 huge_app？
  默认分区表只给 app 1.6MB
  本项目固件 + LVGL + LovyanGFX + cJSON 体积较大
  所以自定义分区表，给 app 3MB

OTA（Over-The-Air）支持：
  otadata 分区存储当前使用哪个 OTA 分区
  app0 是 OTA 分区 0（可以再加 app1 做双分区 OTA）
  当前只用单分区——OTA 更新时直接覆盖 app0
```

### 堆管理

```c
// ESP-IDF 堆诊断 API
#include "esp_heap_caps.h"

// 获取可用堆大小
size_t free_heap = esp_get_free_heap_size();
ESP_LOGI("MEM", "Free heap: %d bytes", free_heap);

// 获取最大可分配块（检查碎片化）
size_t max_block = heap_caps_get_largest_free_block(MALLOC_CAP_8BIT);
ESP_LOGI("MEM", "Largest free block: %d bytes", max_block);

// 分配到 PSRAM（如果可用）
void* psram_buf = heap_caps_malloc(1024*1024, MALLOC_CAP_SPIRAM);  // 1MB from PSRAM

// 分配到 DMA 可访问的内存
void* dma_buf = heap_caps_malloc(4096, MALLOC_CAP_DMA);

// 打印堆信息
heap_caps_print_heap_info(MALLOC_CAP_8BIT);
```

### 内存碎片化风险

```
长时间运行后的内存碎片化：

初始：  [████████████████████████████████]  全部可用
运行后：[██..████..██..██████..████..████]  .. = 碎片

可用总量：还是200KB
最大连续块：可能只有 30KB
→ malloc(50KB) 会失败！虽然总空闲足够

本项目中的风险：
  - eventDistributor 中的 new/delete JsonMessageParser
  - cJSON_Parse/cJSON_Delete 的频繁调用
  - WebSocket 接收缓冲区的动态使用

预防措施：
  1. 使用内存池（预分配固定大小的 JSON 解析器）
  2. 使用静态分配替代动态分配
  3. 定期监控 max_block 大小
  4. 在看门狗回调中检查内存健康
```

---

## 3.6 面试高频考点

### 1. FreeRTOS 调度算法
- **抢占式优先级调度**：高优先级任务立即抢占低优先级
- **同优先级时间片轮转**：每个 tick (1ms) 切换一次
- **空闲任务**：优先级0，可以做内存回收（idle hook）

### 2. 任务间通信方式对比

| 方式 | 特点 | 适用场景 |
|------|------|----------|
| Queue | 固定大小、多生产者多消费者 | 结构化数据传递 |
| MessageBuffer | 可变长度、单生产者单消费者 | JSON字符串、变长数据 |
| StreamBuffer | 字节流、单生产者单消费者 | 音频数据流 |
| Semaphore | 二值/计数，事件通知 | 中断→任务通知 |
| Mutex | 带优先级继承的互斥 | 保护共享资源 |
| Event Group | 多事件位组合 | 等待多个条件 |
| 全局变量 + Mutex | 最灵活 | 复杂数据共享 |

### 3. 优先级反转
- **定义**：高优先级任务被低优先级任务间接阻塞
- **解决**：Mutex 的**优先级继承**（临时提升锁持有者优先级）
- **经典案例**：1997年火星探路者号（Priority Inversion 导致系统重启）

### 4. 死锁
- **四个必要条件**：互斥、持有并等待、不可抢占、循环等待
- **预防**：资源排序（总是按相同顺序获取多个锁）、超时机制
- **本项目风险**：较低（任务间主要通过 MessageBuffer 通信，而非 Mutex）

### 5. 中断安全（ISR 调用规则）
- ISR 中必须使用 `...FromISR()` 后缀的 API
- 如 `xSemaphoreGiveFromISR()`, `xQueueSendFromISR()`
- ISR 中不能调用 `vTaskDelay()` 或任何阻塞 API
- 如需在 ISR 中触发任务切换，调用 `portYIELD_FROM_ISR()`

### 6. 栈溢出检测
```c
// FreeRTOS 配置
#define configCHECK_FOR_STACK_OVERFLOW  2  // 启用栈溢出检测（方法2最全面）

// 溢出回调
void vApplicationStackOverflowHook(TaskHandle_t xTask, char *pcTaskName) {
    ESP_LOGE("STACK", "Stack overflow in task: %s", pcTaskName);
    // 通常在这里重启系统
    esp_restart();
}
```

### 7. 看门狗定时器 (WDT)
- **目的**：检测系统死锁或任务长时间阻塞
- **机制**：必须定期"喂狗"，否则触发系统重启
- **本项目**：Bootloader WDT 超时 9秒
- **Task WDT**：检测任务是否长时间不让出 CPU

---

## 3.7 实践练习

### 练习1：生产者-消费者模式

```c
// 目标：创建两个任务，生产者生成数据，消费者处理数据
// 使用 Queue 传递数据

static QueueHandle_t dataQueue;

void producer_task(void *args) {
    int counter = 0;
    while (1) {
        xQueueSend(dataQueue, &counter, portMAX_DELAY);
        ESP_LOGI("PROD", "Sent: %d", counter);
        counter++;
        vTaskDelay(pdMS_TO_TICKS(1000));  // 每秒发送一次
    }
}

void consumer_task(void *args) {
    int received;
    while (1) {
        xQueueReceive(dataQueue, &received, portMAX_DELAY);
        ESP_LOGI("CONS", "Received: %d", received);
    }
}

void app_main() {
    dataQueue = xQueueCreate(10, sizeof(int));
    xTaskCreate(producer_task, "producer", 4096, NULL, 1, NULL);
    xTaskCreate(consumer_task, "consumer", 4096, NULL, 1, NULL);
}
```

### 练习2：用 MessageBuffer 实现任务通信

```c
// 目标：模拟项目的 eventDistributor 模式
// 任务 A 发送 JSON 消息，任务 B 解析并路由

static MessageBufferHandle_t msgBuffer;

void sender_task(void *args) {
    const char* messages[] = {
        "{\"type\":\"HEARTBEAT\",\"ts\":1000}",
        "{\"type\":\"AUDIO_LEVEL\",\"level\":75}",
        "{\"type\":\"MODE_SWITCH\",\"mode\":\"CAPTION\"}",
    };
    int idx = 0;
    while (1) {
        const char* msg = messages[idx % 3];
        xMessageBufferSend(msgBuffer, msg, strlen(msg), portMAX_DELAY);
        ESP_LOGI("SENDER", "Sent: %s", msg);
        idx++;
        vTaskDelay(pdMS_TO_TICKS(2000));
    }
}

void receiver_task(void *args) {
    char buffer[256];
    while (1) {
        size_t len = xMessageBufferReceive(msgBuffer, buffer, sizeof(buffer), portMAX_DELAY);
        buffer[len] = '\0';

        // 简单字符串匹配（实际项目用 cJSON）
        if (strstr(buffer, "HEARTBEAT")) {
            ESP_LOGI("RECV", "Heartbeat received");
        } else if (strstr(buffer, "AUDIO_LEVEL")) {
            ESP_LOGI("RECV", "Audio level update");
        } else if (strstr(buffer, "MODE_SWITCH")) {
            ESP_LOGI("RECV", "Mode switch requested");
        }
    }
}

void app_main() {
    msgBuffer = xMessageBufferCreate(1024);
    xTaskCreate(sender_task, "sender", 4096, NULL, 1, NULL);
    xTaskCreate(receiver_task, "receiver", 4096, NULL, 2, NULL);  // 接收者优先级更高
}
```

### 练习3：添加自定义消息类型

**挑战任务**：在项目中添加一个新的消息类型 `AUDIO_LEVEL_UPDATE`，让眼镜实时显示音频电平。

需要修改的文件：
1. `include/message_types.hpp` — 添加新消息类型常量
2. `src/main.cpp` eventDistributor — 添加新的 if 分支
3. `src/display/displaymanager.hpp` — 添加新的显示函数

---

## 总结

| 概念 | 本项目中的应用 | 面试重要度 |
|------|--------------|-----------|
| FreeRTOS Task | 5个任务并发运行 | ⭐⭐⭐ |
| MessageBuffer | 事件缓冲区 + 音频缓冲区 | ⭐⭐⭐ |
| cJSON | JSON 消息解析 | ⭐⭐ |
| 状态机 | 模式切换 | ⭐⭐⭐ |
| 优先级调度 | 所有任务优先级1（可改进） | ⭐⭐⭐ |
| 内存管理 | PSRAM依赖 + 动态分配风险 | ⭐⭐ |

**下一篇**：[文档4 - 音频管线深度剖析](04_audio_pipeline_deep_dive.md)

---

> **参考来源**：
> - FreeRTOS 官方文档: https://www.freertos.org/
> - 《Mastering the FreeRTOS Real Time Kernel》（免费电子书）: https://www.freertos.org/Documentation/RTOS_book.html
> - ESP-IDF FreeRTOS API: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/freertos.html
