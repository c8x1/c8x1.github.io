# 显示系统与UI框架——从像素到界面

> **前置知识**：文档1-4
> **学习目标**：理解智能眼镜的显示技术和 UI 框架，能修改和自定义界面
> **预计学习时间**：2天

---

## 目录

- [5.1 智能眼镜显示技术全景](#51-智能眼镜显示技术全景)
- [5.2 图形栈详解](#52-图形栈详解)
- [5.3 LVGL 框架核心概念](#53-lvgl-框架核心概念)
- [5.4 项目的 UI 屏幕设计](#54-项目的-ui-屏幕设计)
- [5.5 DisplayManager API 详解](#55-displaymanager-api-详解)
- [5.6 面试要点与实践](#56-面试要点与实践)

---

## 5.1 智能眼镜显示技术全景

### 本项目的显示方案：复合视频输出

本项目使用 ESP32 的 **I2S 外设来输出复合视频信号（Composite Video）**。这听起来很奇怪——I2S 不是音频接口吗？是的，但 ESP32 的 I2S 外设足够灵活，可以通过 DMA 高速输出任意数字波形，包括复合视频信号。

```
复合视频信号原理：

NTSC 制式：
  分辨率：720×480（理论），实际可用 ~480×360
  刷新率：~30fps（60 fields/s 隔行扫描）
  色彩：Y+C（亮度+色度调制）
  一帧信号：

  ┌─────────── 水平消隐 ───────────┐
  │ 同步 │ 后肩 │ 有效视频 │ 前肩 │
  │ 脉冲 │     │ ~52µs   │      │
  └──────┴─────┴─────────┴──────┘

  ESP32 通过 I2S DMA 连续输出这样的信号
  → 低通滤波 → 复合视频接口 → 显示设备
```

**为什么用复合视频？**

| 优势 | 劣势 |
|------|------|
| 不需要额外显示驱动芯片 | 分辨率低（480×360） |
| 只需电阻+电容的低通滤波 | 画质差（模拟信号，有噪点） |
| ESP32 原生支持 | 帧率受限于信号带宽 |
| 成本极低 | 不能做高清UI |
| 适合原型验证 | 不适合生产产品 |

### 智能眼镜显示技术对比

```
显示技术谱系（从简单到复杂）

复合视频 ─── SPI LCD ─── I2C OLED ─── MIPI DSI ─── Waveguide
(本项目)    (常见替代)    (小型可穿戴)  (高端设备)    (AR眼镜)

分辨率：480×360   320×240     128×64      1920×1080   1280×720/eye
成本：  ¥5       ¥15         ¥8          ¥200+       ¥500+
功耗：  ~50mA    ~30mA       ~10mA       ~200mA      ~100mA
画质：  差       一般        一般         好          好+透明
适用：  原型     中期原型    小型UI       消费级      消费级AR

                    ↑
              当前项目的选择
              （成本最低、最快实现）
```

### 未来智能眼镜会用的显示技术

**MicroOLED + Waveguide（波导）：**

```
这是目前消费级 AR 智能眼镜的主流方案

工作原理：
┌──────────┐     ┌──────────┐     ┌──────────┐
│ MicroOLED │────→│ 光波导    │────→│ 用户眼睛  │
│ 微型显示屏│     │ (透明玻璃) │     │          │
│ ~0.5寸   │     │ 全反射传导 │     │ 看到叠加  │
│ 1280×720 │     │ 光到眼前  │     │ 在实景上  │
└──────────┘     └──────────┘     └──────────┘

代表产品：
  - Meta Ray-Ban：单色 LED（极简方案）
  - XREAL Air：Sony MicroOLED + Birdbath光学
  - Apple Vision Pro：双 MicroOLED + Pancake（VR，非透明AR）

面试加分：
  - 了解 MicroOLED vs MicroLED 的区别
  - 了解 Waveguide 的三种类型（SRG/VHG/Reflective）
  - 知道光效（Optical Efficiency）为什么重要（通常只有 1-10%）
```

---

## 5.2 图形栈详解

### 四层架构

```
┌─────────────────────────────────────────────┐
│  应用层 (Application)                        │
│  displaySearchEngineResult(title, body)      │  ← 你调用的 API
│  displayLiveCaptions(title, body)            │
├─────────────────────────────────────────────┤
│  UI 框架层 (LVGL v8.3)                       │
│  lv_label_set_text(label, "Hello")          │  ← UI 控件管理
│  lv_obj_align(label, LV_ALIGN_CENTER)       │  ← 布局计算
│  lv_task_handler()                          │  ← 事件循环
├─────────────────────────────────────────────┤
│  图形驱动层 (LovyanGFX)                      │
│  lcd.fillRect(x, y, w, h, color)            │  ← 像素级绘制
│  lcd.pushImage(x, y, w, h, data)            │  ← 图像传输
│  → 帧缓冲区 (Framebuffer)                    │
├─────────────────────────────────────────────┤
│  硬件输出层 (ESP32 I2S → DAC)               │
│  帧缓冲区 → I2S DMA → 低通滤波 → 复合视频   │  ← 硬件信号生成
│  480×360 @ ~30fps                            │
└─────────────────────────────────────────────┘

数据流（一帧的渲染过程）：
  1. LVGL 计算哪些区域需要重绘
  2. LVGL 调用 LovyanGFX 的绘图 API（画文字、矩形、图片）
  3. LovyanGFX 写入帧缓冲区（RGB565 格式）
  4. I2S DMA 从帧缓冲区读取数据
  5. I2S 输出复合视频信号
  6. 显示设备显示画面
```

### 与 Android UI 的类比

```
Android UI Stack              OSSG Display Stack
════════════════              ══════════════════

Activity/Fragment             displaymanager API
  ↓                             ↓
View (TextView, etc.)         LVGL Objects (lv_label, etc.)
  ↓                             ↓
Canvas / Draw                 LovyanGFX API
  ↓                             ↓
SurfaceFlinger                Framebuffer 直接写入
  ↓                             ↓
HAL / DRM                     I2S → Composite Video
```

### 分辨率和内存

```c
// src/display/global_settings.hpp
#define AV_WIDTH_OG  480        // 原始宽度
#define AV_HEIGHT_OG 360        // 原始高度
#define AV_SAFEZONE  40         // 安全边距（CRT overscan补偿）
#define AV_WIDTH  (480 - 40)   // 有效宽度 = 440 像素
#define AV_HEIGHT (360 - 40)   // 有效高度 = 320 像素

// 帧缓冲区大小计算
// RGB565：每个像素 2 字节（红色5位 + 绿色6位 + 蓝色5位）
// 帧缓冲区 = 440 × 320 × 2 = 281,600 字节 ≈ 275 KB

// 这个大小超过了 ESP32 内部 SRAM！
// → 必须使用 PSRAM
// → 没有 PSRAM 时，显示会闪烁或无法工作
```

---

## 5.3 LVGL 框架核心概念

LVGL (Light and Versatile Graphics Library) 是嵌入式领域最流行的 UI 框架。

### 对象模型 (lv_obj)

```
LVGL 的 UI 是一棵对象树：

屏幕 (Screen)
├── 容器 (Container)
│   ├── 标签 (Label) "12:30"
│   ├── 标签 (Label) "3 messages"
│   └── 图片 (Image) notification_icon
├── 卡片 (Card)
│   ├── 标签 (Label) "Search Result"
│   ├── 标签 (Label) "AI is..."
│   └── 图片 (Image) search_icon
└── 按钮 (Button)
    └── 标签 (Label) "OK"

类比 Android：
  lv_obj ≈ View
  屏幕 ≈ Activity 的 DecorView
  容器 ≈ ViewGroup / LinearLayout
  标签 ≈ TextView
  按钮 ≈ Button
  图片 ≈ ImageView
```

### 基本使用示例

```c
#include "lvgl.h"

// 创建一个带文字的标签
void create_hello_label(void) {
    // 1. 获取当前屏幕
    lv_obj_t* screen = lv_scr_act();

    // 2. 创建标签对象
    lv_obj_t* label = lv_label_create(screen);

    // 3. 设置文字
    lv_label_set_text(label, "Hello, Smart Glasses!");

    // 4. 设置位置（居中）
    lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);

    // 5. 设置样式
    static lv_style_t style;
    lv_style_init(&style);
    lv_style_set_text_color(&style, lv_color_hex(0xFFFFFF));  // 白色
    lv_style_set_text_font(&style, &lv_font_montserrat_20);   // 20号字体
    lv_obj_add_style(label, &style, 0);
}
```

### 事件系统

```c
// 按钮点击事件（类似 Android OnClickListener）
void btn_event_handler(lv_event_t* e) {
    lv_event_code_t code = lv_event_get_code(e);
    if (code == LV_EVENT_CLICKED) {
        ESP_LOGI("UI", "Button clicked!");
    }
}

// 创建按钮并绑定事件
lv_obj_t* btn = lv_btn_create(lv_scr_act());
lv_obj_align(btn, LV_ALIGN_CENTER, 0, 40);
lv_obj_add_event_cb(btn, btn_event_handler, LV_EVENT_CLICKED, NULL);

lv_obj_t* btn_label = lv_label_create(btn);
lv_label_set_text(btn_label, "Click Me");

// 类比 Android：
// btn.setOnClickListener(new View.OnClickListener() { ... });
```

### 样式系统

```c
// LVGL 样式 ≈ Android Style / CSS

// 方式1：局部样式（只影响这个对象）
lv_obj_set_style_bg_color(btn, lv_color_hex(0x0077CC), 0);    // 背景色
lv_obj_set_style_text_color(btn, lv_color_hex(0xFFFFFF), 0);  // 文字色
lv_obj_set_style_radius(btn, 10, 0);                           // 圆角
lv_obj_set_style_border_width(btn, 2, 0);                      // 边框宽度

// 方式2：共享样式（可以复用）
static lv_style_t card_style;
lv_style_init(&card_style);
lv_style_set_bg_color(&card_style, lv_color_hex(0x333333));
lv_style_set_bg_opa(&card_style, LV_OPA_90);  // 90%不透明
lv_style_set_radius(&card_style, 8);
lv_style_set_pad_all(&card_style, 10);         // 内边距
lv_style_set_border_width(&card_style, 0);

// 应用到多个对象
lv_obj_add_style(card1, &card_style, 0);
lv_obj_add_style(card2, &card_style, 0);
```

### 动画

```c
// 简单的淡入动画
lv_obj_t* label = lv_label_create(lv_scr_act());
lv_label_set_text(label, "Fade In");

// 从完全透明渐变到完全可见
lv_anim_t anim;
lv_anim_init(&anim);
lv_anim_set_var(&anim, label);
lv_anim_set_exec_cb(&anim, (lv_anim_exec_xcb_t)lv_obj_set_style_opa);
lv_anim_set_values(&anim, LV_OPA_TRANSP, LV_OPA_COVER);  // 0 → 255
lv_anim_set_time(&anim, 500);   // 500ms
lv_anim_set_path_cb(&anim, lv_anim_path_ease_out);  // 缓动函数
lv_anim_start(&anim);
```

### LVGL 主循环

```c
// LVGL 需要定期调用两个函数

// 1. tick 处理（通常在定时器或任务中）
void lv_tick_task(void *arg) {
    lv_tick_inc(1);  // 告诉 LVGL 过去了 1ms
}

// 2. 事件处理（在主循环或任务中）
void lvgl_task(void *arg) {
    while (1) {
        lv_task_handler();  // 处理 UI 事件、重绘
        vTaskDelay(pdMS_TO_TICKS(5));  // 5ms 间隔 = 200Hz
    }
}

// 类比 Android：
// lv_tick_inc() ≈ vsync 信号
// lv_task_handler() ≈ Choreographer.doFrame()
```

---

## 5.4 项目的 UI 屏幕设计

### 屏幕1：Home（主页）

```
┌──────────────────────────────┐
│              12:30            │  ← 时钟
│            Wednesday          │
│                              │
│  ┌─────────────────────────┐ │
│  │  📧 3 new messages      │ │  ← 通知卡片
│  │  📅 Meeting at 2pm      │ │
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │  Activity: ●●●○○        │ │  ← 活动指示器
│  │  WiFi: Connected         │ │
│  └─────────────────────────┘ │
│                              │
│          [🎤 Say command]    │  ← 提示
└──────────────────────────────┘

LVGL 实现（简化）：
  Screen
  ├── lv_label "12:30" (大字体，居中)
  ├── lv_label "Wednesday" (小字体)
  ├── lv_obj (卡片容器)
  │   ├── lv_label "3 new messages"
  │   └── lv_label "Meeting at 2pm"
  └── lv_label "Tap to speak" (底部提示)
```

### 屏幕2：语音命令 3 步流程

```
Step 1: 等待语音输入           Step 2: 正在识别           Step 3: 显示结果
┌──────────────────────┐     ┌──────────────────────┐  ┌──────────────────────┐
│                      │     │   🎤 Listening...     │  │  "今天天气怎么样"     │
│   🎤 Say something   │     │                      │  │  ↓                   │
│                      │     │   ████████░░░        │  │  天气：晴 28°C      │
│   Tap to start       │     │   Processing...      │  │  明天：多云 25°C     │
│                      │     │                      │  │                      │
└──────────────────────┘     └──────────────────────┘  └──────────────────────┘

对应的 API 调用：
  displayEnterVoiceCommandStep1()   // 显示 "Say something"
  displayEnterVoiceCommandStep2()   // 显示 "Listening..."
  displayEnterVoiceCommandStep3(cmd, soFar)  // 显示识别结果
```

### 屏幕3：实时字幕

```
┌──────────────────────────────┐
│  ┌────────────────────────┐  │
│  │  LIVE CAPTIONS         │  │  ← 标题
│  │  ═══════════════════   │  │
│  │                        │  │
│  │  So the weather today  │  │  ← 当前句子（大字）
│  │  is going to be sunny  │  │
│  │  with temperatures     │  │
│  │  around 28 degrees...  │  │
│  │                        │  │
│  │  ── separating line ── │  │
│  │                        │  │
│  │  Previous: The meeting │  │  ← 上一句（小字，淡色）
│  │  has been moved to 3pm │  │
│  └────────────────────────┘  │
└──────────────────────────────┘

API: displayLiveCaptions(title, body)
  title = 说话人/来源
  body  = 字幕文本
```

### 屏幕4：搜索结果

```
┌──────────────────────────────┐
│  ┌────────────────────────┐  │
│  │  🔍 Search: "ESP32"    │  │
│  │  ═══════════════════   │  │
│  │                        │  │
│  │  ESP32 - Wikipedia     │  │  ← 标题
│  │  ESP32 is a series of  │  │  ← 摘要
│  │  low-cost, low-power...│  │
│  │                        │  │
│  │  ┌──────────────┐      │  │  ← 图片（如果有）
│  │  │   [image]    │      │  │
│  │  └──────────────┘      │  │
│  └────────────────────────┘  │
└──────────────────────────────┘

API: displaySearchEngineResult(title, body, image)
```

---

## 5.5 DisplayManager API 详解

```c
// src/display/displaymanager.hpp

// ═══ 基础控制 ═══

// 初始化显示硬件
extern void setup_display_en(void);
// 内部调用：LovyanGFX 初始化 → 分配帧缓冲区 → 启动输出

// 控制显示电源
extern void power_to_display(bool power_on);
// power_on = true: 开启显示
// power_on = false: 关闭显示（省电）
// 类比 Android：PowerManager.goToSleep()

// 启动显示系统（LVGL + 渲染循环）
extern void displayStart(void);
// 内部：创建 LVGL 显示驱动 → 启动 lv_task_handler 循环

// 清空屏幕
extern void displayClear(void);
// 填充黑色

// ═══ UI 更新函数 ═══

// 更新活动指示器（显示"正在活动"状态）
extern void updateActivity(int seconds = 5);
// seconds: 活动状态保持几秒

// 更新时钟显示
extern void updateClock(void);
// 从网络时间或 RTC 读取时间，更新 Home 屏的时钟

// ═══ 语音命令 UI ═══

extern void displayEnterVoiceCommandStep1(void);
// 显示 "Say something" 提示
// 等待用户开始说话

extern void displayEnterVoiceCommandStep2(void);
// 显示 "Listening..." + 动画
// 表示正在录制和传输音频

extern void displayEnterVoiceCommandStep3(char* command, char* soFar);
// command: 识别出的命令文本
// soFar: 当前已识别的部分（流式更新）
// 显示实时 ASR 结果

// ═══ AI 功能 UI ═══

extern void displaySearchEngineResult(char* title, char* body, char* image = "");
// title: 搜索结果标题
// body: 搜索结果摘要
// image: 图片URL或Base64（可选）
// 渲染搜索结果卡片

extern void displayLiveCaptions(char* title = "", char* body = "");
// title: 字幕来源/说话人
// body: 字幕文本
// 渲染实时字幕界面
```

### 渲染性能分析

```
480×360 显示的性能需求：

帧缓冲区大小：480 × 360 × 2 (RGB565) = 345,600 字节 ≈ 338 KB
刷新率：30 fps
像素填充率：480 × 360 × 30 = 5,184,000 像素/秒 = ~10 MB/s

ESP32 的限制：
  - 240 MHz CPU → 每秒 240M 个时钟周期
  - 10 MB/s 像素数据 → 需要 DMA 搬运
  - SRAM 只有 520KB → 帧缓冲区必须放 PSRAM
  - PSRAM 带宽：~80 MB/s (SPI 模式) → 勉强够 30fps

优化技巧：
  1. 部分刷新：只重绘变化的区域（LVGL 默认行为）
  2. 双缓冲：一个缓冲区显示，另一个绘制（需要额外 338KB）
  3. 降低分辨率：用 240×180 代替 480×360
  4. 减少 FPS：用 20fps 代替 30fps
```

---

## 5.6 面试要点与实践

### 面试要点

**1. Framebuffer 概念**
- 一块内存区域，每个像素的颜色值直接对应屏幕上的一个点
- 写入 framebuffer = 绘制屏幕
- 类比 Android：SurfaceFlinger 的 buffer

**2. 双缓冲 vs 单缓冲**
- 单缓冲：绘制和显示用同一块内存 → 可能看到撕裂（tearing）
- 双缓冲：前台显示缓冲A，后台绘制缓冲B → 完成后交换 → 无撕裂
- 本项目：单缓冲（内存不够双缓冲）

**3. 显示刷新率与功耗**
- 更高的刷新率 = 更多功耗
- 穿戴设备通常 20-30fps（手机 60-120fps）
- 静态画面时可以降低到 1fps 甚至关闭显示

### 实践：修改 UI

**练习1：修改时钟字体**

找到 `displaymanager.cpp` 中的时钟标签创建代码，修改字体：

```c
// 找到时钟标签的创建位置
// 将默认字体改为更大的字体
lv_obj_set_style_text_font(clock_label, &lv_font_montserrat_28, 0);
```

**练习2：添加一个音频电平指示器**

```c
// 创建一个水平条形图显示音频电平
lv_obj_t* level_bar = lv_bar_create(lv_scr_act());
lv_obj_set_size(level_bar, 200, 20);
lv_obj_align(level_bar, LV_ALIGN_BOTTOM_MID, 0, -20);
lv_bar_set_range(level_bar, 0, 100);

// 在音频任务中更新
void update_audio_level(int level) {
    lv_bar_set_value(level_bar, level, LV_ANIM_ON);
}
```

---

## 总结

| 概念 | 本项目实现 | 类比 Android |
|------|-----------|-------------|
| 显示输出 | 复合视频 480×360 | LCD/OLED 驱动 |
| 图形库 | LovyanGFX | Skia |
| UI 框架 | LVGL v8.3 | Android View 系统 |
| 帧缓冲区 | PSRAM 338KB | SurfaceFlinger buffer |
| UI 设计工具 | SquareLine Studio | Android Studio Layout Editor |
| 刷新率 | ~30fps | 60-120fps |

**下一篇**：[文档6 - 通信协议与系统互联](06_communication_and_protocols.md)

---

> **参考来源**：
> - LVGL 官方文档: https://docs.lvgl.io/
> - LovyanGFX: https://github.com/lovyan03/LovyanGFX
> - SquareLine Studio: https://squareline.io/
