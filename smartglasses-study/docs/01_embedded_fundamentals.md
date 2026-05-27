# 嵌入式系统基础概念——从零开始的世界观

> **适用读者**：音频算法/软件工程师，熟悉 Android Audio Framework，对嵌入式领域零基础
> **学习目标**：建立嵌入式系统的完整知识框架，为后续深入 OpenSourceSmartGlasses 项目打下基础
> **预计学习时间**：2天

---

## 目录

- [1.1 什么是嵌入式系统？](#11-什么是嵌入式系统)
- [1.2 核心硬件概念](#12-核心硬件概念)
- [1.3 存储架构](#13-存储架构)
- [1.4 软件架构概览](#14-软件架构概览)
- [1.5 开发环境与工具链](#15-开发环境与工具链)
- [1.6 给音频工程师的类比映射表](#16-给音频工程师的类比映射表)
- [附录](#附录)

---

## 1.1 什么是嵌入式系统？

### 定义

嵌入式系统（Embedded System）是一种**为特定功能而设计的专用计算机系统**，它是更大系统的一个组成部分，通常有严格的资源限制（内存、功耗、体积、成本）。

你可能觉得嵌入式离你很远，但其实你每天都在使用：

| 设备 | 内部芯片 | 它做什么 |
|------|----------|----------|
| 你的蓝牙耳机 | DSP/MCU | 音频解码、降噪、蓝牙协议栈 |
| 智能手表 | SoC (如 Snapdragon Wear) | 传感器融合、UI、通信 |
| 汽车的 ABS 刹车系统 | MCU (如 Infineon Aurix) | 实时控制刹车压力 |
| USB-C 充电器 | MCU (如 STM32) | PD 协议协商、电压调节 |
| **智能眼镜** | **ESP32 SoC** | **音频采集、显示、WiFi 通信** |

### 嵌入式 vs 通用计算机

你熟悉的 PC 或 Android 手机是**通用计算机**——它能运行任何软件，你可以装 App、玩游戏、写代码。而嵌入式系统是**专用**的——它只做一件事或几件事，但要做到极致可靠、极低功耗。

```
通用计算机 (PC / Android 手机)          嵌入式系统 (ESP32 智能眼镜)
┌─────────────────────────┐           ┌─────────────────────────┐
│ 操作系统: Windows/Linux  │           │ 操作系统: FreeRTOS       │
│     / Android            │           │   (或裸机, 无OS)         │
├─────────────────────────┤           ├─────────────────────────┤
│ 内存: 8-32 GB RAM       │           │ 内存: 520 KB SRAM       │
│                            │           │   + 可选 4MB PSRAM      │
├─────────────────────────┤           ├─────────────────────────┤
│ 存储: 256GB-2TB SSD     │           │ 存储: 4MB Flash         │
├─────────────────────────┤           ├─────────────────────────┤
│ CPU: 3-5 GHz, 4-16核   │           │ CPU: 240 MHz, 双核      │
├─────────────────────────┤           ├─────────────────────────┤
│ 功耗: 15-300W           │           │ 功耗: 0.01-0.5W        │
├─────────────────────────┤           ├─────────────────────────┤
│ 成本: ¥3000-10000+     │           │ 成本: ¥10-30 (芯片级)   │
└─────────────────────────┘           └─────────────────────────┘
```

**核心差异：**

| 特征 | 通用计算机 | 嵌入式系统 |
|------|-----------|-----------|
| 设计目标 | 通用计算 | 特定功能 |
| 操作系统 | Windows/Linux/Android | RTOS 或裸机 |
| 内存 | GB 级别 | KB-MB 级别 |
| 实时性 | 不保证（尽力而为） | 严格保证（硬实时/软实时） |
| 功耗 | 瓦特级 | 毫瓦/微瓦级 |
| 开发方式 | 高层语言+框架 | C/C++ + 硬件寄存器 |
| 更新方式 | 应用商店OTA | JTAG烧录/OTA |

### 你其实已经在用嵌入式概念了

作为音频工程师，你日常接触的 Android Audio Framework 中的很多概念，本质上就是嵌入式系统的思维：

- **Audio HAL（硬件抽象层）** → 本质上就是在操作嵌入式音频硬件（I2S 控制器、DAC、CODEC）
- **AudioFlinger 的共享内存 Buffer** → 就是嵌入式中的 Ring Buffer
- **AudioRecord 的回调机制** → 就是嵌入式中的中断 + DMA 回调
- **低延迟音频通路（FAST track）** → 就是嵌入式中的实时任务调度

> **面试考点**：嵌入式系统的三个核心特征——专用性、实时性、资源受限。

---

## 1.2 核心硬件概念

### 1.2.1 MCU（微控制器，Microcontroller Unit）

#### 什么是 MCU？

MCU 是把**CPU、内存（RAM）、存储（Flash）、外设接口**全部集成在一块芯片上的完整计算机系统。你可以把它理解为一台"麻雀虽小五脏俱全"的电脑。

```
MCU 内部结构（以 STM32 为例）
┌──────────────────────────────────────────┐
│                    MCU 芯片               │
│                                          │
│  ┌──────────┐  ┌──────────┐             │
│  │ CPU Core │  │   SRAM   │             │
│  │(Cortex-M4)│  │ (64KB)  │             │
│  └────┬─────┘  └──────────┘             │
│       │         ┌──────────┐             │
│       ├─────────│  Flash   │             │
│       │         │ (256KB)  │             │
│       │         └──────────┘             │
│       │                                   │
│  ┌────┴──────────────────────────────┐   │
│  │           内部总线 (AHB/APB)        │   │
│  ├──────┬──────┬──────┬──────┬──────┤   │
│  │ GPIO │ UART │  I2C │  SPI │  ADC │   │
│  └──────┴──────┴──────┴──────┴──────┘   │
│                                          │
│  引脚 ────────────────────────────── 引脚 │
└──────────────────────────────────────────┘
```

#### MCU 的关键参数

| 参数 | 含义 | 典型范围 | 音频相关考量 |
|------|------|----------|-------------|
| **主频 (Clock)** | CPU 运行频率 | 48-400 MHz | 影响音频处理算力 |
| **SRAM** | 运行内存 | 8KB-1MB | 音频缓冲区大小受限 |
| **Flash** | 程序存储 | 32KB-2MB | 固件 + 模型大小受限 |
| **GPIO 数量** | 通用 IO 引脚数 | 8-100+ | 连接传感器、显示屏 |
| **ADC** | 模拟数字转换 | 10-12 bit | 模拟麦克风采集 |
| **DAC** | 数字模拟转换 | 8-12 bit | 音频播放 |
| **功耗** | 工作电流 | 5-100 mA | 电池续航关键 |
| **封装** | 芯片物理大小 | QFN/BGA | 穿戴设备的尺寸约束 |

#### 常见 MCU 内核对比

ARM Cortex-M 系列是嵌入式领域最主流的 CPU 内核：

```
性能与功耗谱系（从低到高）

Cortex-M0(+) → Cortex-M3 → Cortex-M4 → Cortex-M7
  ¥3, 极低功耗     ¥8       ¥12         ¥25
  48MHz            120MHz    180MHz      480MHz
  简单控制         通用      DSP指令      高性能
                            FPU浮点      双发射

                          ↑
                    音频处理的甜蜜点
                    (需要 DSP 指令 + FPU)
```

> **为什么 M4/M7 适合音频？** 它们有 **DSP 指令集**（单周期 MAC 乘加运算）和 **硬件浮点单元 (FPU)**，这对 FFT、滤波器等音频算法至关重要。

### 1.2.2 SoC（系统级芯片，System-on-Chip）

#### 什么是 SoC？

SoC 比 MCU 更进一步——它不仅包含 CPU+RAM+Flash+外设，还集成了**专用处理单元**，比如 WiFi/BLE 无线电、DSP、AI 加速器、视频编解码器等。

ESP32 就是一个典型的"轻量级 SoC"：

```
ESP32 内部结构
┌────────────────────────────────────────────────────┐
│                    ESP32 SoC                        │
│                                                    │
│  ┌─────────────┐  ┌─────────────┐                 │
│  │ Xtensa LX6  │  │ Xtensa LX6  │  双核 CPU      │
│  │  Core 0     │  │  Core 1     │  @ 240 MHz      │
│  │ (Protocol)  │  │ (App)       │                 │
│  └──────┬──────┘  └──────┬──────┘                 │
│         │                │                         │
│  ┌──────┴────────────────┴──────┐                 │
│  │        内部总线               │                 │
│  ├────────┬────────┬───────────┤                 │
│  │ 520KB  │ WiFi/  │  外设模块  │                 │
│  │ SRAM   │ BLE    │ I2S/SPI/  │                 │
│  │        │ 无线电 │ I2C/UART/ │                 │
│  │        │        │ ADC/DAC   │                 │
│  └────────┴────────┴───────────┘                 │
│                                                    │
│  外部接口：Flash (4MB) / PSRAM (可选)              │
└────────────────────────────────────────────────────┘
```

#### MCU vs SoC 对比

| 特征 | MCU | SoC |
|------|-----|-----|
| 集成度 | CPU+RAM+外设 | CPU+RAM+外设+无线+DSP+... |
| 无线连接 | 通常需要外挂模块 | 内置 WiFi/BLE |
| 处理能力 | 单核，较低 | 多核，较高 |
| 操作系统 | 裸机或 RTOS | RTOS 或 Linux |
| 典型应用 | 传感器、电机控制 | IoT 设备、穿戴设备 |
| **例子** | STM32F103 | **ESP32**, Snapdragon Wear |

> **为什么智能眼镜用 SoC 而不是 MCU？** 因为智能眼镜需要 WiFi 连接（传输音频到服务器）、双核处理（一个核做通信，一个核做音频采集），这些都是纯 MCU 难以胜任的。

### 1.2.3 FPGA（现场可编程门阵列）

#### 什么是 FPGA？

MCU 和 SoC 的硬件是**固定的**——CPU 在出厂时就确定了，你只能写软件来运行。而 FPGA 是**可编程的硬件**——你可以用硬件描述语言（Verilog/VHDL）来**定义芯片内部的电路结构**。

```
MCU/SoC:  硬件固定 → 写软件控制硬件
FPGA:     硬件可编程 → 写"硬件"本身

类比：
MCU 就像买了一台电脑，你能装软件
FPGA 就像买了一堆电子元件，你自己组装一台电脑
```

#### FPGA 在智能眼镜中的角色

FPGA 在穿戴设备中不太常见（成本高、功耗高），但在以下场景有价值：
- **视频处理加速**：实时的图像预处理
- **自定义传感器接口**：非标准协议的传感器
- **AI 推理加速**：并行计算加速神经网络推理
- **原型验证**：在流片（制造 ASIC）之前验证设计

> **入门阶段你不需要学 FPGA**。了解概念即可，面试中如果被问到，知道它是什么、与 MCU/SoC 的区别就够了。

### 1.2.4 通信协议详解

嵌入式系统中，芯片与外部世界（传感器、显示屏、存储器）的通信依靠几种标准的**总线协议**。你可以把它们类比为 Android 中的 IPC（进程间通信），只不过这里是**硬件级别的通信**。

#### 协议总览

```
┌─────────────────────────────────────────────────┐
│              嵌入式通信协议谱系                     │
│                                                 │
│  低速 ←───────────────────────────────→ 高速    │
│  简单 ←───────────────────────────────→ 复杂    │
│                                                 │
│  UART    I2C     SPI      I2S     USB    MIPI   │
│  (调试)  (传感器) (显示屏) (音频)  (数据) (摄像头)│
│  2线     2线     4线      3线     4线    4+线    │
│  ~1Mbps  ~3.4M  ~80M    ~24M    ~480M  ~数Gbps  │
└─────────────────────────────────────────────────┘
```

---

#### GPIO（通用输入输出）

GPIO 是最基础的数字接口，每个引脚可以设置为输入（读取高低电平）或输出（输出高低电平）。

**基本概念：**
- **高电平 (HIGH)**：引脚电压 = VDD（通常 3.3V），逻辑 "1"
- **低电平 (LOW)**：引脚电压 = GND（0V），逻辑 "0"
- **上拉电阻 (Pull-up)**：引脚默认被拉到高电平，按下按钮时变为低电平
- **下拉电阻 (Pull-down)**：引脚默认被拉到低电平，按下按钮时变为高电平

**两种使用模式：**

```
轮询模式 (Polling)              中断模式 (Interrupt)
─────────────────              ──────────────────
while (true) {                 void ISR_button() {
    if (gpio_read(BTN)) {         // 按钮按下！
        // 处理                    // 立即处理
    }                          }
    delay(10); // 等待10ms
}                               // CPU 可以做其他事

优点：简单                       优点：实时响应、省电
缺点：浪费CPU、响应慢             缺点：需要注意中断安全
```

**ESP32 GPIO 示例代码（ESP-IDF 风格）：**

```c
#include "driver/gpio.h"

#define LED_PIN    GPIO_NUM_2
#define BUTTON_PIN GPIO_NUM_0

void gpio_example_init(void) {
    // 配置 LED 引脚为输出
    gpio_config_t io_conf = {
        .pin_bit_mask = (1ULL << LED_PIN),
        .mode = GPIO_MODE_OUTPUT,
        .pull_up_en = GPIO_PULLUP_DISABLE,
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .intr_type = GPIO_INTR_DISABLE,
    };
    gpio_config(&io_conf);

    // 配置按钮引脚为输入，带上拉电阻
    gpio_config_t btn_conf = {
        .pin_bit_mask = (1ULL << BUTTON_PIN),
        .mode = GPIO_MODE_INPUT,
        .pull_up_en = GPIO_PULLUP_ENABLE,       // 上拉：默认高电平
        .pull_down_en = GPIO_PULLDOWN_DISABLE,
        .intr_type = GPIO_INTR_NEGEDGE,         // 下降沿中断（高→低）
    };
    gpio_config(&btn_conf);
}

// 设置 LED 亮灭
gpio_set_level(LED_PIN, 1);  // 亮
gpio_set_level(LED_PIN, 0);  // 灭

// 读取按钮状态
int button_state = gpio_get_level(BUTTON_PIN);  // 0=按下, 1=松开
```

**智能眼镜中的 GPIO 应用：**
- LED 指示灯（充电状态、通知）
- 电源按钮
- 触摸板中断
- 显示电源控制（`power_to_display(bool)`）

---

#### I2C（内部集成电路总线，Inter-Integrated Circuit）

I2C 是一种**两线制、主从式、同步串行**总线，非常适合连接低速传感器。

**为什么叫"两线制"？** 因为只需要两根信号线：
- **SDA（Serial Data）**：数据线，双向
- **SCL（Serial Clock）**：时钟线，由主机驱动

```
I2C 总线拓扑（多个设备共享同一组 SDA/SCL 线）

        VDD (3.3V)
         │
    ┌────┤────┐────┐────┐
    │    │    │    │    │
   RP   RP   RP   RP   RP    ← 上拉电阻 (通常 4.7kΩ)
    │    │    │    │    │
────┴────┴────┴────┴────┴──── SDA（数据线）
────┬────┬────┬────┬────┬──── SCL（时钟线）
    │    │    │    │    │
  ┌─┴─┐┌─┴─┐┌─┴─┐┌─┴─┐
  │ESP││IMU││EEP││RTC│
  │32 ││   ││ROM││   │
  └───┘└───┘└───┘└───┘
 主机  从机  从机  从机
       地址0x68 地址0x50 地址0x51
```

**通信过程（以读取 IMU 数据为例）：**

```
时间 ──────────────────────────────────────────────→

主机(ESP32):  [S][设备地址+W][  ][寄存器地址][  ][S][设备地址+R][  ][数据1][  ][数据2][N][P]
从机(IMU):                  [ACK]            [ACK]              [ACK]      [ACK]

图例: [S]=START  [P]=STOP  [ACK]=应答  [N]=非应答  W=写(0)  R=读(1)

步骤分解：
1. 主机发送 START 条件（SDA 在 SCL 高电平时下拉）
2. 主机发送 7 位设备地址 + 读/写位（如 0x68+W = 写模式）
3. 从机应答 ACK
4. 主机发送寄存器地址（如 0x3B = X轴加速度高字节）
5. 从机应答 ACK
6. 主机再次发送 START（重复启动）
7. 主机发送设备地址 + R（读模式）
8. 从机应答 ACK
9. 从机发送数据字节
10. 主机应答 ACK（继续读）或 NACK（停止读）
11. 主机发送 STOP 条件
```

**I2C 速度等级：**

| 模式 | 速度 | 适用场景 |
|------|------|----------|
| Standard | 100 kbps | 慢速传感器 |
| Fast | 400 kbps | 大多数传感器 |
| Fast-Plus | 1 Mbps | 高速传感器 |
| High-Speed | 3.4 Mbps | 特殊高速设备 |

**ESP32 I2C 示例（读取 IMU 加速度数据）：**

```c
#include "driver/i2c.h"

#define I2C_MASTER_NUM      I2C_NUM_0
#define I2C_MASTER_SDA_GPIO  GPIO_NUM_21
#define I2C_MASTER_SCL_GPIO  GPIO_NUM_22
#define IMU_ADDRESS          0x68    // BMI160 的 I2C 地址
#define IMU_ACCEL_X_REG      0x12    // 加速度 X 轴寄存器

void i2c_master_init(void) {
    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = I2C_MASTER_SDA_GPIO,
        .scl_io_num = I2C_MASTER_SCL_GPIO,
        .sda_pullup_en = GPIO_PULLUP_ENABLE,
        .scl_pullup_en = GPIO_PULLUP_ENABLE,
        .master.clk_speed = 400000,  // 400 kHz Fast Mode
    };
    i2c_param_config(I2C_MASTER_NUM, &conf);
    i2c_driver_install(I2C_MASTER_NUM, I2C_MODE_MASTER, 0, 0, 0);
}

// 读取 IMU 的 6 字节加速度数据 (X/Y/Z 各 2 字节)
void read_imu_accel(int16_t *accel_x, int16_t *accel_y, int16_t *accel_z) {
    uint8_t data[6];

    // 写：告诉 IMU 我们要从哪个寄存器开始读
    i2c_cmd_handle_t cmd = i2c_cmd_link_create();
    i2c_master_start(cmd);
    i2c_master_write_byte(cmd, (IMU_ADDRESS << 1) | I2C_MASTER_WRITE, true);
    i2c_master_write_byte(cmd, IMU_ACCEL_X_REG, true);
    i2c_master_start(cmd);  // 重复 START
    // 读：读取 6 字节数据
    i2c_master_write_byte(cmd, (IMU_ADDRESS << 1) | I2C_MASTER_READ, true);
    i2c_master_read(cmd, data, 5, I2C_MASTER_ACK);     // 前 5 字节 ACK
    i2c_master_read(cmd, &data[5], 1, I2C_MASTER_NACK); // 最后 1 字节 NACK
    i2c_master_stop(cmd);

    esp_err_t ret = i2c_master_cmd_begin(I2C_MASTER_NUM, cmd, 100 / portTICK_PERIOD_MS);
    i2c_cmd_link_delete(cmd);

    if (ret == ESP_OK) {
        *accel_x = (int16_t)(data[0] << 8 | data[1]);
        *accel_y = (int16_t)(data[2] << 8 | data[3]);
        *accel_z = (int16_t)(data[4] << 8 | data[5]);
    }
}
```

**智能眼镜中的 I2C 应用：**
- IMU 传感器（加速度计、陀螺仪）—— 如 BMI160
- 环境光传感器
- EEPROM 存储校准数据
- RTC（实时时钟）

**与 I2C 对应的 Android 类比：**
```
I2C 总线         →  Android 的 Sensor HAL
I2C 设备地址     →  Android 的 Sensor Type (accel/gyro/...)
I2C 寄存器读取   →  SensorEvent 回调
```

---

#### SPI（串行外设接口，Serial Peripheral Interface）

SPI 是一种**四线制、全双工、高速同步**总线。比 I2C 更快，但需要更多引脚。

**四根信号线：**
- **MOSI（Master Out Slave In）**：主机→从机的数据线
- **MISO（Master In Slave Out）**：从机→主机的数据线
- **SCK（Serial Clock）**：时钟线，由主机驱动
- **CS/SS（Chip Select）**：片选线，选中特定的从机

```
SPI 连接拓扑

主机 (ESP32)                    从机 1 (显示屏)        从机 2 (Flash)
┌─────────┐                   ┌─────────┐           ┌─────────┐
│     MOSI├───────────────────┤MOSI/DIN ├───────────┤SI/DI    │
│     MISO├───────────────────┤MISO/DOUT├───────────┤SO/DO    │
│      SCK├───────────────────┤CLK      ├───────────┤CLK      │
│      CS0├───────────────────┤CS       │           │         │
│      CS1├───────────────────┤         ├───────────┤CS       │
└─────────┘                   └─────────┘           └─────────┘

注意：每个从机需要一根独立的 CS 线！
所以 N 个从机需要 3 + N 根线（MOSI/MISO/SCK + N 根 CS）
```

**SPI vs I2C 对比（面试常考）：**

| 特征 | I2C | SPI |
|------|-----|-----|
| 信号线数 | 2 (SDA + SCL) | 4 (MOSI + MISO + SCK + CS) |
| 速度 | 最高 3.4 Mbps | 通常 10-80 Mbps |
| 双工 | 半双工 | 全双工 |
| 设备寻址 | 7位/10位地址 | CS 线选中 |
| 设备数量 | 总线上可挂多个 | 受 CS 引脚数限制 |
| 复杂度 | 简单 | 稍复杂 |
| 典型用途 | 传感器、EEPROM | 显示屏、Flash、高速 ADC |

> **选择原则**：低速设备用 I2C（省引脚），高速设备用 SPI（要带宽）。

**智能眼镜中的 SPI 应用：**
- 高速显示屏（如 SPI OLED/LCD）
- 外部 Flash 存储
- SD 卡

---

#### UART（通用异步收发器，Universal Asynchronous Receiver/Transmitter）

UART 是最简单的串行通信方式，只需两根线：TX（发送）和 RX（接收）。

**关键参数：**
- **波特率 (Baud Rate)**：通信速度，双方必须一致
  - 常用值：9600, 115200, 921600
  - 115200 bps ≈ 每秒传输 ~11.5 KB
- **帧格式**：起始位(1) + 数据位(5-9, 通常8) + 校验位(可选) + 停止位(1-2)

```
UART 数据帧格式（8N1：8数据位，无校验，1停止位）

空闲(高)  起始位  数据位 (LSB先发)              停止位  空闲(高)
─────┐  ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐       ┌───────
     └──┘ ││ ││ ││ ││ ││ ││ ││ ││ │└───────┘
          b0 b1 b2 b3 b4 b5 b6 b7
          ↑                      ↑
        最低位                  最高位
```

**ESP32 UART 示例（调试日志输出）：**

```c
#include "driver/uart.h"

#define UART_NUM      UART_NUM_0
#define UART_BUF_SIZE 1024

void uart_init(void) {
    uart_config_t uart_config = {
        .baud_rate = 115200,
        .data_bits = UART_DATA_8_BITS,
        .parity = UART_PARITY_DISABLE,
        .stop_bits = UART_STOP_BITS_1,
        .flow_ctrl = UART_HW_FLOWCTRL_DISABLE,
    };
    uart_param_config(UART_NUM, &uart_config);
    uart_driver_install(UART_NUM, UART_BUF_SIZE, 0, 0, NULL, 0);
}

// 发送调试信息
printf("Audio buffer level: %d bytes\n", buffer_level);

// ESP-IDF 日志系统（更推荐）
ESP_LOGI("Audio", "Sampling at %d Hz", sample_rate);
ESP_LOGE("Audio", "Buffer overflow!");
```

**智能眼镜中的 UART 应用：**
- 调试串口（最重要的调试手段！）
- GPS 模块通信
- 蓝牙模块通信

> **类比 Android**：UART 调试输出 ≈ Android 的 `logcat`。`ESP_LOGI` ≈ `Log.i()`。

---

#### I2S（集成电路音频总线，Inter-IC Sound）—— **重点中的重点！**

作为音频工程师，I2S 是你最需要深入理解的嵌入式接口。

**为什么需要专用音频总线？**

I2C 太慢（400kbps 不够音频），SPI 可以但不适合连续流数据，UART 也不行。音频需要一个**专门的、持续不断的数据流**接口——这就是 I2S。

**I2S 三根信号线：**

| 信号线 | 全称 | 方向 | 作用 |
|--------|------|------|------|
| **SCK (BCLK)** | Serial Clock / Bit Clock | 主→从 | 位时钟，每个音频位一个周期 |
| **WS (LRCLK)** | Word Select / Left-Right Clock | 主→从 | 声道选择（0=左，1=右） |
| **SD (SDIN/SDOUT)** | Serial Data | 双向 | 音频数据 |

**I2S 时序图：**

```
I2S 时序（立体声，16bit 采样）

SCK:  ┌─┐ ┌─┐ ┌─┐ ┌─┐     ┌─┐ ┌─┐ ┌─┐ ┌─┐
      └─┘ └─┘ └─┘ └─┘ ... └─┘ └─┘ └─┘ └─┘

WS:   ┌─────────────────────┐ ┌─────────────────────┐
      │       左声道          │ │       右声道          │
      └─────────────────────┘ └─────────────────────┘

SD:   ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐ ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
      │MSB              LSB│ │MSB              LSB│
      └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘ └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘

WS=0 → 左声道数据    WS=1 → 右声道数据
```

**关键参数计算：**
```
采样率 = 48 kHz
位深度 = 16 bit
声道数 = 2 (立体声)

SCK 频率 = 采样率 × 位深度 × 声道数
         = 48000 × 16 × 2
         = 1.536 MHz

WS 频率 = 采样率 = 48 kHz

数据率 = 48000 × 16 × 2 = 1.536 Mbps
```

**音频接口对比表：**

| 接口 | 信号线 | 数据格式 | 适用场景 | 在智能眼镜中 |
|------|--------|----------|----------|-------------|
| **I2S** | 3 (SCK+WS+SD) | PCM 数字音频 | 标准音频 CODEC | 连接 ADC/DAC |
| **PDM** | 2 (CLK+DATA) | 1-bit 脉冲密度 | 数字 MEMS 麦克风 | **本项目使用！** |
| **TDM** | 2+ (CLK+DATA×N) | 多通道时分复用 | 多通道音频 | 多麦阵列 |
| **PCM** | 4 (CLK+FS+DIN+DOUT) | 压扩/线性 PCM | 语音通话 | 蓝牙语音 |

**PDM（脉冲密度调制）—— 本项目使用的音频接口：**

PDM 是 I2S 的一种变体，专为数字 MEMS 麦克风设计。它只需要两根线（CLK + DATA），输出 1-bit 的高频数据流。

```
PDM 原理

模拟音频信号:    ╭─╮   ╭──╮ ╭──╮    ╭─╮
               ╱  ╲ ╱   ╲╱   ╲  ╱  ╲
              ╱    ╲╱          ╲╱    ╲

PDM 输出 (1-bit):  1  0  1  1  1  0  1  1  1  1  0  1  1  0  1
                  ↑ 密集的1 = 高振幅   ↑ 稀疏的1 = 低振幅

解码过程: PDM → CIC滤波器(降采样) → FIR低通滤波 → PCM
```

> **为什么用 PDM？** 因为 PDM MEMS 麦克风是数字输出的——不需要外部 ADC，抗干扰能力强，引脚少，非常适合穿戴设备。ESP32 的 I2S 外设原生支持 PDM 模式。

**ESP32 I2S PDM 麦克风配置示例：**

```c
#include "driver/i2s.h"

#define I2S_NUM         I2S_NUM_0
#define I2S_SAMPLE_RATE 16000    // 16 kHz 语音级采样率
#define I2S_SAMPLE_BITS 16       // 16-bit
#define I2S_READ_LEN    1024     // 每次读取 1024 字节
#define PIN_CLK         GPIO_NUM_14   // PDM CLK
#define PIN_DATA        GPIO_NUM_34   // PDM DATA

void i2s_pdm_mic_init(void) {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX | I2S_MODE_PDM),
        .sample_rate = I2S_SAMPLE_RATE,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_ALL_RIGHT,  // 单声道
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,      // 中断优先级
        .dma_buf_count = 8,      // DMA 缓冲区数量
        .dma_buf_len = 256,      // 每个 DMA 缓冲区大小
        .use_apll = false,       // 不使用 APLL（高精度时钟）
        .tx_desc_auto_clear = false,
        .fixed_mclk = 0,
    };

    i2s_pin_config_t pin_config = {
        .bck_io_num = I2S_PIN_NO_CHANGE,  // PDM 模式不需要 BCK
        .ws_io_num = PIN_CLK,              // PDM CLK → WS 引脚
        .data_out_num = I2S_PIN_NO_CHANGE,
        .data_in_num = PIN_DATA,           // PDM DATA 输入
    };

    i2s_driver_install(I2S_NUM, &i2s_config, 0, NULL);
    i2s_set_pin(I2S_NUM, &pin_config);
}

// 读取音频数据（类似 Android AudioRecord.read()）
void read_audio(void) {
    uint8_t audio_buffer[I2S_READ_LEN];
    size_t bytes_read = 0;

    while (1) {
        // 从 I2S DMA 缓冲区读取数据
        i2s_read(I2S_NUM, audio_buffer, I2S_READ_LEN, &bytes_read, portMAX_DELAY);

        // audio_buffer 现在包含 PCM 数据（16-bit, 16kHz, 单声道）
        // 可以送去编码、传输、或本地处理

        ESP_LOGI("Audio", "Read %d bytes", bytes_read);
    }
}
```

> **类比 Android**：`i2s_read()` ≈ `AudioRecord.read()`，DMA 缓冲区 ≈ AudioFlinger 的 shared memory buffer。

---

## 1.3 存储架构

嵌入式系统的存储和 PC 很不一样，理解存储架构对于理解整个系统至关重要。

### 存储类型对比

```
存储层次（从快到慢、从小到大）

┌─────────────┐
│   寄存器      │  CPU 内部，纳秒级，几百字节
├─────────────┤
│   SRAM        │  片内 RAM，10ns 级，520KB (ESP32)
│  (运行内存)   │  → 类比 Android 的 RAM
├─────────────┤
│   PSRAM       │  片外扩展 RAM，稍慢，2-8MB
│  (外部内存)   │  → 类比 Android 的 swap 分区
├─────────────┤
│   Flash       │  非易失存储，微秒级，4-16MB
│  (程序存储)   │  → 类比 Android 的 /system 分区
├─────────────┤
│   SD 卡/eMMC  │  大容量存储，毫秒级，GB 级
│              │  → 类比 Android 的 /data 分区
└─────────────┘
```

### Flash 存储

Flash 是嵌入式的"硬盘"，用来存储固件代码和常量数据。

- **NOR Flash**：随机读取快（直接执行代码 XIP），适合存固件
- **NAND Flash**：密度高、成本低，适合大数据存储

ESP32 使用 NOR Flash，支持 **XIP（eXecute In Place）**——CPU 可以直接从 Flash 执行代码，不需要先复制到 RAM。

### SRAM（内部 RAM）

ESP32 有 520 KB 内部 SRAM，但实际可用的比这少：
- 系统保留部分
- WiFi/BLE 协议栈占用约 50KB
- FreeRTOS 任务栈占用
- 实际可用约 300KB 左右

### PSRAM（外部伪静态 RAM）

ESP32 可以外接 PSRAM（通过 SPI 或 QPI 接口连接的 DRAM），提供额外的 2-8MB 内存。

在 OpenSourceSmartGlasses 项目中，PSRAM 非常关键：
- **没有 PSRAM**：只有 ~50-60KB 可用堆内存，显示可能闪烁
- **有 PSRAM**：约 4MB 可用堆内存，显示和音频运行正常

> **为什么显示需要 PSRAM？** 显示缓冲区 480×360 像素 × 2字节(RGB565) = 345,600 字节 ≈ 338KB。内部 SRAM 完全不够用，必须放在 PSRAM 中。

### NVS（非易失性存储）

NVS 是 ESP-IDF 提供的键值对存储系统，类似于 Android 的 SharedPreferences。

```c
#include "nvs_flash.h"
#include "nvs.h"

// 写入
nvs_handle_t handle;
nvs_open("storage", NVS_READWRITE, &handle);
nvs_set_i32(handle, "wifi_channel", 6);
nvs_set_str(handle, "device_name", "SmartGlasses");
nvs_commit(handle);  // 确保写入 Flash
nvs_close(handle);

// 读取
nvs_open("storage", NVS_READONLY, &handle);
int32_t channel;
nvs_get_i32(handle, "wifi_channel", &channel);
char name[32];
size_t name_len = sizeof(name);
nvs_get_str(handle, "device_name", name, &name_len);
nvs_close(handle);
```

### 分区表

Flash 被划分为多个分区，各有用途。本项目的分区表（`huge_app.csv`）：

```
4MB Flash 布局 (0x000000 - 0x400000)

┌──────────┬──────────┬────────────────────────────────┐
│ 偏移地址  │ 大小     │ 内容                           │
├──────────┼──────────┼────────────────────────────────┤
│ 0x000000 │ 4KB      │ Bootloader（引导加载器）         │
│ 0x008000 │ 24KB     │ Partition Table（分区表）        │
│ 0x009000 │ 20KB     │ NVS（键值存储）                  │
│ 0x00E000 │ 8KB      │ OTA Data（OTA 状态）            │
│ 0x010000 │ 3MB      │ Application（应用程序固件）      │
│ 0x310000 │ 960KB    │ SPIFFS（文件系统）               │
└──────────┴──────────┴────────────────────────────────┘

→ 类比 Android 分区：
   Bootloader ≈ Android Bootloader
   Application ≈ /system 分区
   SPIFFS ≈ /data 分区
   NVS ≈ SharedPreferences 所在分区
```

> **面试考点**：嵌入式 Flash 分区设计需要考虑：固件大小、OTA 升级（双分区 vs 单分区）、文件系统、配置存储。

---

## 1.4 软件架构概览

### 裸机编程（Bare-metal）

裸机就是**没有操作系统**，程序直接在硬件上运行。最简单的结构是"超级循环 (Super Loop)"：

```c
// 裸机 Super Loop 模式
void main(void) {
    // 初始化硬件
    hardware_init();

    // 主循环（永不退出）
    while (1) {
        read_sensors();     // 读传感器
        process_data();     // 处理数据
        update_display();   // 更新显示
        check_buttons();    // 检查按键
    }
}
```

**裸机的局限：**
- 所有功能在一个循环里，无法并行
- 如果 `process_data()` 耗时长，`update_display()` 就被延迟
- 难以处理多个实时任务
- 无法优雅地处理异步事件

> **类比 Android**：裸机循环 ≈ 在主线程做所有事（UI + 网络 + 计算），会 ANR。

### RTOS（实时操作系统）

RTOS 解决了裸机的并发问题。它提供：
- **多任务调度**：多个任务"同时"运行（分时复用 CPU）
- **任务间通信**：队列、信号量、互斥锁
- **定时服务**：软件定时器、延迟函数
- **内存管理**：堆分配、内存池

```
裸机                          RTOS (FreeRTOS)
┌──────────────┐            ┌──────────────┐
│   while(1)   │            │  Task 1: 音频 │ ← 独立执行
│   {          │            │  Task 2: 通信 │ ← 独立执行
│     所有功能  │            │  Task 3: 显示 │ ← 独立执行
│     串行执行  │            │  Task 4: 传感器│ ← 独立执行
│   }          │            │  RTOS 调度器   │ ← 统一调度
└──────────────┘            └──────────────┘

单线程                       多任务并发
```

**常用 RTOS 对比：**

| RTOS | 特点 | 开源 | 适用场景 |
|------|------|------|----------|
| **FreeRTOS** | 最流行、小 footprint | MIT | ESP32、STM32、大多数 MCU |
| Zephyr | Linux 基金会支持 | Apache 2.0 | IoT 设备、Nordic nRF |
| RIOT | 学术界友好 | LGPL | IoT 研究 |
| mbed OS | ARM 官方 | Apache 2.0 | ARM Cortex-M |
| ThreadX | 微软收购、高性能 | MIT (2023) | 高端 MCU、消费电子 |

> **本项目使用 FreeRTOS**——它内置于 ESP-IDF 中，是 ESP32 的默认 RTOS。

### Embedded Linux

当 MCU/SoC 的算力足够强（如 Cortex-A 系列，几百 MHz 到 GHz 级别），就可以运行完整的 Linux 系统。

- **适合 Linux 的场景**：复杂 UI、视频处理、运行 Python/Node.js、需要完整网络协议栈
- **不适合 Linux 的场景**：严格实时要求（微秒级响应）、极低功耗（微安级）

智能眼镜的典型架构是**双处理器**：
- **MCU/RTOS 核心**：传感器、音频前端、低功耗待机（ESP32）
- **Linux 核心**：AI 推理、复杂 UI、应用逻辑（如 Snapdragon AR2）

---

## 1.5 开发环境与工具链

### 开发环境对比

| 环境 | 上手难度 | 功能 | 适合阶段 |
|------|---------|------|---------|
| **Arduino IDE** | 最简单 | 基础编译烧录 | 入门学习 |
| **PlatformIO** | 中等 | 专业 IDE、调试、库管理 | **项目开发（本项目使用）** |
| **ESP-IDF** | 较难 | 全功能、最大控制 | 生产级开发 |

### PlatformIO —— 本项目的开发环境

PlatformIO 是基于 VS Code 的嵌入式开发平台，类似 Android Studio 之于 Android 开发。

**核心配置文件 `platformio.ini`（本项目的配置）：**

```ini
[env:pico32]
platform = espressif32@5.1.1    # Espressif 平台版本
board = pico32                   # 目标开发板：ESP32-PICO-D4
framework = espidf               # 使用 ESP-IDF 框架（不是 Arduino）
monitor_speed = 115200           # 串口监视器波特率
board_build.partitions = huge_app.csv  # 自定义分区表
board_build.f_cpu = 240000000L   # CPU 频率 240MHz

build_flags =
    -Os                         # 优化代码大小
    -Wl,-Map,output.map         # 生成链接映射文件
    -D LV_CONF_INCLUDE_SIMPLE   # LVGL 配置宏
    -I src/display              # 头文件搜索路径
    -I src/utils
    -I src/microphones
    -I src/comms
```

**常用命令：**
```bash
pio run                    # 编译
pio run --target upload    # 编译并烧录
pio device monitor         # 打开串口监视器（类似 logcat）
pio run --target clean     # 清理构建
```

### 交叉编译与工具链

你的电脑是 x86/x64 架构（Intel/AMD），但 ESP32 是 Xtensa 架构。你不能直接用电脑上的编译器编译 ESP32 的代码——需要**交叉编译**。

```
交叉编译流程

你的电脑 (x86_64)                        ESP32 (Xtensa LX6)
┌──────────────────┐
│ .c / .cpp 源文件  │
│        ↓          │
│ Xtensa GCC 预处理  │    交叉编译器
│        ↓          │    (不在目标平台上运行)
│ Xtensa GCC 编译   │
│        ↓          │
│ Xtensa 链接器     │
│        ↓          │
│ .elf 可执行文件    │
│        ↓          │
│ esptool 转换      │    ───── 烧录线 ───→  ┌────────────┐
│        ↓          │                       │ Flash 存储  │
│ .bin 固件文件     │                       │            │
└──────────────────┘                       └────┬───────┘
                                                │ ESP32 从
                                                │ Flash 执行
                                                ↓
                                           ┌────────────┐
                                           │ 固件运行！  │
                                           └────────────┘
```

### 从源码到固件的完整流程

```
1. 预处理 (Preprocessing)
   .c → .i
   - 展开 #include（头文件插入）
   - 展开 #define（宏替换）
   - 处理 #ifdef 条件编译

2. 编译 (Compilation)
   .i → .s → .o
   - C代码 → 汇编代码 → 机器码（目标文件）
   - 每个源文件独立编译

3. 链接 (Linking)
   .o + 库 → .elf
   - 合并所有目标文件
   - 解析符号引用（函数调用、全局变量）
   - 分配内存地址

4. 转换 (Conversion)
   .elf → .bin
   - esptool.py 将 ELF 转为二进制固件
   - 生成 Bootloader + Partition Table + Application

5. 烧录 (Flashing)
   .bin → Flash
   - 通过 USB/串口将固件写入 Flash
   - 使用 esptool.py 或 PlatformIO
```

---

## 1.6 给音频工程师的类比映射表

你已有的 Android Audio 知识，就是最好的嵌入式学习起点。以下是完整的类比映射：

### 架构层级类比

| 嵌入式概念 | Android 对应 | 说明 |
|-----------|-------------|------|
| ESP32 SoC | 手机 SoC (Snapdragon) | 都是 SoC，只是性能差距大 |
| FreeRTOS | Android Linux Kernel | 都是 OS，提供任务调度和 IPC |
| FreeRTOS Task | Android Thread / HandlerThread | 独立的执行线程 |
| FreeRTOS Queue / MessageBuffer | Android MessageQueue + Handler | 任务间异步通信 |
| FreeRTOS Mutex | Android synchronized / ReentrantLock | 互斥访问共享资源 |
| FreeRTOS Semaphore | Android Semaphore | 计数信号量，资源管理 |
| FreeRTOS Timer | Android Handler.postDelayed() | 定时任务 |
| ISR（中断服务程序） | Android Binder 回调 | 硬件事件触发的回调 |
| DMA（直接内存访问） | AudioFlinger 的 buffer 搬运 | 硬件自动搬运数据，不占 CPU |

### 音频系统类比

| 嵌入式音频 | Android 音频 | 说明 |
|-----------|-------------|------|
| I2S / PDM 接口 | Audio HAL | 硬件级音频接口 |
| I2S DMA Buffer | AudioFlinger 的 Shared Memory | 音频数据缓冲区 |
| `i2s_read()` | `AudioRecord.read()` | 读取音频数据 |
| Ring Buffer | AudioTrack/AudioRecord 内部 buffer | 环形缓冲区 |
| PDM → PCM 转换 | HAL 层格式转换 | 音频格式转换 |
| ESP-ADF Pipeline | AudioFlinger 的 Thread | 音频处理管线 |
| NVS 存储 | SharedPreferences | 键值对持久化 |

### 系统概念类比

| 嵌入式概念 | Android 对应 | 说明 |
|-----------|-------------|------|
| Bootloader | Android Bootloader | 系统引导 |
| Flash 分区 | Android 分区 (boot/system/data) | 存储分区 |
| OTA 升级 | Android System Update | 空中固件升级 |
| Watchdog Timer | Android Watchdog | 系统死锁检测 |
| Brown-out Detection | 电压监测 | 掉电保护 |
| sdkconfig | Android build.prop / framework-res | 系统配置 |
| 交叉编译 | NDK (ARM cross-compile) | 在 x86 上编译目标平台代码 |
| JTAG/SWD 调试 | ADB + JDWP | 硬件级调试 |

---

## 附录

### A. 嵌入式常用缩写速查表

| 缩写 | 全称 | 中文 |
|------|------|------|
| MCU | Microcontroller Unit | 微控制器 |
| SoC | System-on-Chip | 系统级芯片 |
| FPGA | Field-Programmable Gate Array | 现场可编程门阵列 |
| GPIO | General Purpose Input/Output | 通用输入输出 |
| I2C | Inter-Integrated Circuit | 内部集成电路总线 |
| SPI | Serial Peripheral Interface | 串行外设接口 |
| UART | Universal Asynchronous Receiver/Transmitter | 通用异步收发器 |
| I2S | Inter-IC Sound | 集成电路音频总线 |
| PDM | Pulse Density Modulation | 脉冲密度调制 |
| DMA | Direct Memory Access | 直接内存访问 |
| ISR | Interrupt Service Routine | 中断服务程序 |
| RTOS | Real-Time Operating System | 实时操作系统 |
| NVS | Non-Volatile Storage | 非易失性存储 |
| OTA | Over-The-Air | 空中升级 |
| PCB | Printed Circuit Board | 印刷电路板 |
| ADC | Analog-to-Digital Converter | 模数转换器 |
| DAC | Digital-to-Analog Converter | 数模转换器 |
| MEMS | Micro-Electro-Mechanical Systems | 微机电系统 |
| JTAG | Joint Test Action Group | 调试接口标准 |
| SWD | Serial Wire Debug | 串行线调试 |

### B. 推荐购买清单

| 物品 | 型号 | 价格区间 | 说明 |
|------|------|---------|------|
| 开发板 | ESP32-S3-DevKitC-1 | ¥40-80 | 带 USB-C，方便调试 |
| PDM 麦克风模块 | MP34DT01-MEMSGPSS | ¥5-15 | 数字 PDM 输出 |
| USB 转串口 | CP2102 / CH340 | ¥5-15 | 如果开发板没有自带 |
| 逻辑分析仪 | Saleae 仿制版 | ¥20-50 | 分析 I2C/SPI 协议 |
| 小 OLED 屏 | SSD1306 0.96" I2C | ¥8-15 | 练习 I2C 显示 |

### C. 下一步

学完本篇后，继续阅读：
- **文档2**：OpenSourceSmartGlasses 项目全局架构解析
- 把本篇的代码示例在开发板上实际跑一遍
- 特别关注 I2S/PDM 部分——这是你后续改造音频管线的入口

---

> **参考来源**：
> - Espressif ESP32 技术参考手册: https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf
> - ESP-IDF 编程指南: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/
> - FreeRTOS 官方文档: https://www.freertos.org/
> - ARM Cortex-M 编程手册: https://developer.arm.com/documentation
