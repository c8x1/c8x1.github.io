const sharedBlueprints = {
  1: {
    prereq: ["mmio", "bootloader", "partition"],
    lab: "worksheet",
    focus: "嵌入式产品全景",
    codeTitle: "一个固件最小启动流",
    code: `bootloader_start();
verify_firmware_signature();
init_clock_tree();
init_pins_and_power();
start_scheduler();
app_main_loop();`,
    flow: ["Product Goal", "Hardware Boundary", "Firmware", "Data/Power Flow", "Validation"],
    core: [
      ["共通基础：从物理世界开始", "嵌入式系统不是先写代码，而是先定义物理输入、用户反馈、功耗边界、升级路径和故障恢复。代码只是把这些边界固化成可重复执行的控制流。"],
      ["共通基础：画边界比画模块更重要", "设备端、手机端、云端、工厂端和维修端都可能参与产品闭环。第一天的目标是把数据流、控制流、电源流和升级流画清楚。"]
    ]
  },
  2: {
    prereq: ["mmio", "fixed_point", "stack_heap"],
    lab: "worksheet",
    focus: "MCU/MPU/DSP/NPU边界",
    codeTitle: "芯片角色不是一个main函数能解决",
    code: `audio_frame = dma_read();
event = read_button_or_ble();
features = audio_frontend(audio_frame);
intent = phone_ai_session(features);`,
    flow: ["Workload", "Realtime", "Memory", "Power", "Ecosystem"],
    core: [
      ["共通基础：芯片按工作负载分工", "MCU适合确定性I/O和低功耗控制，MPU适合Linux和复杂应用，DSP适合流式信号处理，NPU适合固定模型图的能效。"],
      ["共通基础：更强芯片会带来系统成本", "算力提升通常伴随更高功耗、更复杂BSP、更大散热和更长启动时间；顶层选型要同时看性能、量产和维护。"]
    ]
  },
  3: {
    prereq: ["dma", "isr", "ring_buffer", "rtos_task", "semaphore"],
    lab: "dma",
    focus: "实时性与延迟预算",
    codeTitle: "DMA把音频帧放进环形缓冲，任务再处理",
    code: `on_dma_frame_ready() {
  clear_dma_irq();
  queue_send_from_isr(audio_queue, frame_index);
}

audio_task() {
  while (true) {
    frame = queue_receive(audio_queue);
    process_frontend(frame);
  }
}`,
    flow: ["DMA", "ISR", "Queue", "Task", "Deadline"],
    core: [
      ["共通基础：实时性看最坏情况", "平均耗时不能证明稳定；一次日志刷写、BLE重连或cache miss超过音频帧周期，就可能让队列水位上升并最终丢帧。"],
      ["共通基础：ISR只通知，任务做重活", "中断里应只清标志、记录时间戳、投递事件。AEC、NS、日志、malloc和复杂状态机都应离开ISR。"]
    ]
  },
  4: {
    prereq: ["stack_heap", "cache", "ring_buffer", "fixed_point"],
    lab: "memory",
    focus: "内存、缓存与数据搬运",
    codeTitle: "静态规划音频buffer和模型arena",
    code: `#define FRAME_SAMPLES 160
#define CHANNELS 4
static int16_t audio_ring[8][CHANNELS][FRAME_SAMPLES];
static uint8_t model_arena[96 * 1024];

void audio_task() {
  int16_t local_window[FRAME_SAMPLES];
}`,
    flow: ["RAM Budget", "Buffer", "Stack/Heap", "Cache", "Evidence"],
    core: [
      ["共通基础：RAM是架构预算", "音频环形缓冲、算法scratch、模型arena、显示buffer、BLE队列和日志会抢同一块RAM，不能只看芯片宣传页的总容量。"],
      ["共通基础：cache会让DMA读写变得反直觉", "DMA写了内存后CPU可能还读到cache旧数据；CPU写发送buffer后DMA可能看不到。需要明确clean/invalidate策略。"]
    ]
  },
  5: {
    prereq: ["mmio", "polling", "dma", "isr"],
    lab: "ble",
    focus: "总线与外设",
    codeTitle: "外设驱动的共同形状",
    code: `enable_peripheral_clock(I2S0);
configure_pins(I2S0_PINS);
write_register(I2S0_SAMPLE_RATE, 16000);
configure_dma(I2S0_RX, audio_buffer);
enable_interrupt(I2S0_DMA_DONE);
start_i2s_rx();`,
    flow: ["Clock", "Pinmux", "Register", "DMA/IRQ", "Protocol"],
    core: [
      ["共通基础：总线先看数据率和时钟", "PDM/I2S承载连续音频，SPI常刷屏或Flash，I2C常用于控制，USB适合标准设备类，BLE适合低功耗小数据。"],
      ["共通基础：驱动是硬件状态机", "驱动不是魔法库，而是开时钟、配pin、写寄存器、设DMA、处理中断和错误状态。"]
    ]
  },
  6: {
    prereq: ["rtos_task", "queue", "semaphore", "priority_inversion", "isr"],
    lab: "rtos",
    focus: "RTOS任务模型",
    codeTitle: "任务、队列和信号量组成音频系统",
    code: `isr_dma_done() {
  semaphore_give_from_isr(frame_ready);
}

audio_task(priority=5) {
  wait(frame_ready);
  process_frame();
  queue_send(ble_queue, summary);
}`,
    flow: ["ISR", "Semaphore", "High Priority Task", "Queue", "Low Priority Task"],
    core: [
      ["共通基础：RTOS把并发显式化", "系统不再只有main loop，而是多个任务共享CPU。调度器根据优先级、阻塞和时间片决定谁运行。"],
      ["共通基础：队列是边界契约", "队列长度、消息大小、满队列策略和超时都要设计；队列满时丢旧帧、丢新日志还是降级，决定产品表现。"]
    ]
  },
  7: {
    prereq: ["device_tree", "bootloader", "partition", "rtos_task"],
    lab: "worksheet",
    focus: "RTOS/SDK选型评审",
    codeTitle: "读SDK目录时先找这些入口",
    code: `boards/          // 板级配置、pin、clock
drivers/         // 外设驱动
samples/         // 最小可运行例子
subsys/bluetooth // 协议栈或中间件
Kconfig          // 功能开关
CMakeLists.txt   // 构建入口`,
    flow: ["SDK", "Board", "Driver", "Sample", "Production Risk"],
    core: [
      ["共通基础：选型要连生态一起看", "FreeRTOS轻，Zephyr跨平台抽象强，ESP-IDF适合Espressif产品，Linux适合复杂系统。选型还要看团队、示例、调试器、社区和长期维护。"],
      ["共通基础：读开源项目先读结构", "先找samples、boards、drivers、docs、issues、release，再钻源码。先知道项目解决什么，再看它如何组织硬件差异。"]
    ]
  },
  8: {
    prereq: ["dma", "isr", "ring_buffer", "cache"],
    lab: "dma",
    focus: "音频采集链路",
    codeTitle: "音频采集callback的最小职责",
    code: `on_dma_frame_ready(frame_id) {
  timestamp = read_hw_timer();
  pcm = audio_ring[frame_id];
  dump_if_enabled(pcm, timestamp);
  queue_send(frontend_queue, frame_id);
}`,
    flow: ["Mic", "PDM/I2S", "DMA", "PCM Dump", "Frontend"],
    core: [
      ["共通基础：采集链路先证明原始数据可信", "算法指标之前，要确认通道顺序、采样率、时间戳、增益、底噪和dump链路。没有可信PCM，后面的模型和算法都只是猜。"],
      ["共通基础：debug格式也是产品能力", "bring-up时能保存原始PCM、队列水位、CPU峰值和配置快照，才能把硬件、驱动、算法边界分开。"]
    ]
  },
  9: {
    prereq: ["ring_buffer", "fixed_point", "rtos_task", "queue"],
    lab: "memory",
    focus: "AEC/NS/AGC/VAD/KWS",
    codeTitle: "音频前端pipeline接口",
    code: `frame = queue_receive(frontend_queue);
aec_out = aec_process(frame, farend_reference);
ns_out = noise_suppress(aec_out);
if (vad_detect(ns_out)) {
  kws_score = keyword_model(ns_out);
}`,
    flow: ["Reference", "AEC", "NS/AGC", "VAD", "KWS"],
    core: [
      ["共通基础：前端算法依赖系统事实", "AEC需要参考信号和延迟对齐，NS需要质量权衡，AGC要避免泵音，VAD/KWS要在功耗和误触发之间取舍。"],
      ["共通基础：算法失败要能回到证据", "回声残留、误唤醒、语音断裂都要能对应到参考路径、时间戳、增益、CPU峰值和模型阈值。"]
    ]
  },
  10: {
    prereq: ["dma", "ring_buffer", "fixed_point"],
    lab: "memory",
    focus: "FOA、阵列与空间音频",
    codeTitle: "FOA帧从A-format到B-format",
    code: `raw4 = read_aligned_channels();
calibrated = apply_gain_phase_calibration(raw4);
b_format = matrix_A_to_B * calibrated;
write_usb_audio_frame(b_format);`,
    flow: ["Geometry", "A-format", "Calibration", "B-format", "Playback/Test"],
    core: [
      ["共通基础：空间音频先定义坐标和格式", "A-format是胶囊原始通道，B-format是场景表示。通道顺序、坐标系、归一化和采样率必须写成规格。"],
      ["共通基础：几何和校准比模型名更重要", "阵列几何、胶囊一致性、相位误差和结构声学会直接污染空间表示，不能只靠后端模型补救。"]
    ]
  },
  11: {
    prereq: ["stack_heap", "fixed_point", "cache"],
    lab: "memory",
    focus: "TinyML与端侧AI",
    codeTitle: "端侧模型推理的资源边界",
    code: `features = make_log_mel(frame);
tensor = quantize_int8(features);
invoke_tflm_model(tensor, arena);
if (score > threshold) wake_system();`,
    flow: ["Features", "Quantize", "Arena", "Inference", "Decision"],
    core: [
      ["共通基础：端侧AI先看生命周期", "模型不只是一个文件，还包括特征、量化、arena、算子覆盖、阈值、数据漂移、更新和回滚。"],
      ["共通基础：端侧AI适合轻量确定性判断", "唤醒、VAD、KWS、状态识别适合端侧；复杂ASR、LLM和长上下文更适合手机或云。"]
    ]
  },
  12: {
    prereq: ["rtos_task", "queue", "mmio"],
    lab: "rtos",
    focus: "显示型AI眼镜架构",
    codeTitle: "眼镜交互状态机",
    code: `state = IDLE;
on_wake_word() { state = LISTENING; show("听写中"); }
on_phone_result(text) { state = DISPLAYING; render_text(text); }
on_timeout() { state = IDLE; dim_display(); }`,
    flow: ["Wake", "Phone Session", "Display", "Speaker", "Idle"],
    core: [
      ["共通基础：眼镜不是小手机", "它要把信息压成短文本、状态、提示和确认；输入以语音、按键、触控为主，手机承担复杂UI和大模型。"],
      ["共通基础：体验来自状态机而不是单点模型", "唤醒、聆听、上传、等待、显示、超时、重连、低电量都要是可解释的状态。"]
    ]
  },
  13: {
    prereq: ["queue", "rtos_task", "polling"],
    lab: "ble",
    focus: "连接与手机协同",
    codeTitle: "BLE短消息打包",
    code: `packet.seq++;
packet.type = TRANSCRIPT_DELTA;
packet.payload = utf8_short_text;
queue_send(ble_tx_queue, packet);`,
    flow: ["Device", "BLE", "Phone App", "Network", "User Feedback"],
    core: [
      ["共通基础：很多智能硬件是手机外设", "设备端做确定性I/O和低功耗状态，手机端做账号、网络、复杂UI和重计算。"],
      ["共通基础：BLE不是无限管道", "BLE适合控制、状态、短文本和压缩片段；实时音频要看P99延迟、重传和手机后台限制。"]
    ]
  },
  14: {
    prereq: ["rtos_task", "semaphore", "mmio"],
    lab: "power",
    focus: "低功耗系统设计",
    codeTitle: "功耗状态机",
    code: `if (idle_for(30s)) enter_light_sleep();
if (button_or_wakeword()) resume_clocks();
if (battery_low()) reduce_display_duty();`,
    flow: ["Battery", "Duty Cycle", "Sleep", "Wake", "Degrade"],
    core: [
      ["共通基础：功耗预算是可穿戴生死线", "电池容量、平均电流、峰值电流、睡眠占比、显示占空比和无线重连共同决定续航。"],
      ["共通基础：低功耗设计要有降级策略", "降亮度、降采样率、关闭常开模型、延迟同步都应是设计的一部分，而不是事后补丁。"]
    ]
  },
  15: {
    prereq: ["device_tree", "partition", "bootloader"],
    lab: "worksheet",
    focus: "嵌入式Linux边界",
    codeTitle: "Linux启动层次",
    code: `ROM -> bootloader -> kernel -> device tree -> rootfs -> app service`,
    flow: ["Bootloader", "Kernel", "Device Tree", "Rootfs", "Service"],
    core: [
      ["共通基础：Linux解决复杂性，也带来成本", "当产品需要复杂网络、多进程、文件系统、容器或丰富UI时，Linux值得考虑；否则MCU+RTOS更直接。"],
      ["共通基础：Linux边界要写清楚", "启动时间、功耗、安全更新、BSP维护和服务监控都要进入架构评审。"]
    ]
  },
  16: {
    prereq: ["device_tree", "mmio", "isr"],
    lab: "worksheet",
    focus: "BSP、驱动与设备树",
    codeTitle: "设备树描述硬件",
    code: `compatible = "vendor,display";
reg = <0x3c>;
reset-gpios = <&gpio0 12 GPIO_ACTIVE_LOW>;`,
    flow: ["Schematic", "Pinmux", "Device Tree", "Driver", "App"],
    core: [
      ["共通基础：BSP是硬件和应用的契约层", "BSP把启动、pinmux、clock、power、外设和驱动绑定起来。设备树/Kconfig让同一份代码适配多硬件。"],
      ["共通基础：换硬件先看描述和时序", "换麦克、codec、屏幕、触控或PMIC时，最先变化的是clock、pin、初始化顺序和唤醒路径。"]
    ]
  },
  17: {
    prereq: ["bootloader", "partition", "ota"],
    lab: "ota",
    focus: "OTA、安全与隐私",
    codeTitle: "OTA回滚状态机",
    code: `download(app_B);
verify_signature(app_B);
mark_pending(app_B);
reboot();
if (!health_ok()) rollback(app_A);`,
    flow: ["Download", "Verify", "Switch", "Health Check", "Rollback"],
    core: [
      ["共通基础：能升级不等于可产品化", "签名、分区、回滚、断电恢复、版本兼容和日志脱敏共同决定长期可信。"],
      ["共通基础：隐私是系统架构问题", "麦克、字幕、会话、日志、dump和云同步都要有权限边界和保留策略。"]
    ]
  },
  18: {
    prereq: ["isr", "queue", "ring_buffer"],
    lab: "rtos",
    focus: "调试与可观测性",
    codeTitle: "嵌入式trace事件",
    code: `trace_event("audio_q", queue_depth);
trace_event("cpu_peak", cpu_usage);
trace_event("ble_state", connection_state);`,
    flow: ["Symptom", "Timestamp", "Queue/CPU", "Dump", "Root Cause"],
    core: [
      ["共通基础：调试靠证据链", "串口、JTAG、trace、crash dump、音频dump、功耗曲线和无线抓包各自回答不同问题。"],
      ["共通基础：跨端问题要统一时间线", "设备、手机、云端和用户操作要能对齐时间戳，否则很容易把系统问题误判成模型问题。"]
    ]
  },
  19: {
    prereq: ["mmio", "device_tree", "partition"],
    lab: "worksheet",
    focus: "硬件协作与量产",
    codeTitle: "PVT bring-up checklist",
    code: `power_rails_ok();
clock_tree_ok();
peripheral_smoke_test();
audio_loopback_dump();
ota_power_cut_test();`,
    flow: ["Schematic", "EVT", "DVT", "PVT", "Factory Test"],
    core: [
      ["共通基础：硬件协作要可验证", "原理图评审、bring-up、DFM、测试夹具、校准、认证和EOL替代料都会影响软件架构。"],
      ["共通基础：量产风险要前置", "pass/fail证据、校准流程、产测时间、返修入口和序列号追踪要在设计阶段就考虑。"]
    ]
  },
  20: {
    prereq: ["rtos_task", "queue", "device_tree"],
    lab: "worksheet",
    focus: "Agent-era嵌入式开发",
    codeTitle: "可交给agent的任务契约",
    code: `Task: inspect BLE queue overflow
Inputs: src/ble, protocol.md, target latency
Output: findings + minimal patch + test steps
Do not change: audio ISR or OTA partition layout`,
    flow: ["Context", "Boundary", "Acceptance", "Risk", "Review"],
    core: [
      ["共通基础：agent适合加速，不适合替你定义硬件事实", "agent能读SDK、写样板、补测试、找风险；但硬件假设、实时预算和安全边界必须由你给出。"],
      ["共通基础：好任务要有禁止项", "嵌入式尤其要告诉agent不能改ISR时序、不能扩大heap、不能绕过签名、不能假设datasheet不存在的寄存器。"]
    ]
  },
  21: {
    prereq: ["dma", "rtos_task", "partition", "ota"],
    lab: "power",
    focus: "Capstone双MVP评审",
    codeTitle: "MVP评审包结构",
    code: `MVP {
  goal;
  block_diagram;
  latency_power_memory_budget;
  top_3_risks;
  next_week_experiments;
}`,
    flow: ["Goal", "Architecture", "Budget", "Risks", "Experiments"],
    core: [
      ["共通基础：最终能力是做取舍", "能和硬件公司讨论的方案，不是概念堆叠，而是架构、预算、风险、验证计划和下一步实现路径。"],
      ["共通基础：MVP要验证最大未知量", "第一版不追求完整愿景，要把最不确定且最影响产品成败的东西变成一周内可验证的实验。"]
    ]
  }
};

const trackPlans = {
  1: {
    foa: ["可信多通道采集MVP", "设备端胶囊/PDM/I2S/USB形成主链路，手机或PC只做录制、配置和分析。电源流要覆盖麦克偏置、codec、主控和USB供电；升级流要能恢复采集固件。", "首版先按4胶囊、48kHz、24bit、USB Audio估算，原始吞吐约4.6Mbps；先不承诺无线传多通道无压缩。", "通道顺序错、时钟不稳、USB枚举失败、校准文件丢失都会让空间信息不可用。", "输出硬件框图、通道表、原始PCM dump、USB描述符、10分钟连续录音无丢帧日志。", "默认先做有线FOA采集器，再评估BLE控制和端侧轻处理。", "FOA MVP四流框图"],
    glasses: ["无摄像头显示型AI眼镜MVP", "眼镜端负责麦克、扬声器、小显示、BLE和电源状态；手机端负责ASR/LLM/账号/网络；云端只处理必须在线的重计算。", "首版按单/双麦16kHz语音、BLE短文本、显示刷新低占空比估算；目标是8小时轻使用而不是全程显示。", "手机后台被杀、BLE断连、显示 stale 文本、隐私指示缺失、电池快速下降都会破坏体验。", "输出设备-手机-云边界图、状态机、BLE消息表、功耗模式表、隐私数据流图。", "默认眼镜只做确定性I/O和低功耗状态，复杂AI交给手机。", "AI眼镜MVP四流框图"]
  },
  2: {
    foa: ["音频采集芯片角色表", "MCU负责PDM/I2S DMA、USB/BLE控制和健康监测；DSP可做decimation/beamforming；手机/PC做调参、可视化和重模型。", "4通道48kHz 24bit输入约4.6Mbps，RAM至少预留100ms环形buffer、校准表和dump缓冲；DSP/NPU不是首版刚需。", "把复杂神经增强塞进主控会吃掉实时余量；MPU/Linux会增加启动和功耗，未必适合纯采集器。", "输出芯片角色表、算力/RAM/功耗估算、端侧与主机分工、反对意见。", "默认MCU+音频外设先证明采集稳定，再决定是否加DSP。", "FOA芯片角色评审"],
    glasses: ["眼镜端/手机端分工表", "眼镜MCU管理常开低功耗、显示、BLE、麦克和按键；手机承担ASR、LLM、长上下文、账号和网络。", "眼镜端RAM优先留给音频小buffer、BLE队列、显示tile和状态机；大模型arena通常不放眼镜首版。", "选MPU会让热、重量、续航和BSP复杂度失控；所有AI都上云会让离线体验和隐私变差。", "输出设备/手机/云职责表、功耗风险、离线降级策略和首版芯片假设。", "默认低功耗MCU+手机协同，不在眼镜端跑复杂ASR/LLM。", "AI眼镜芯片角色评审"]
  },
  3: {
    foa: ["多通道采集实时预算", "DMA每帧把多通道PCM推入ring buffer，ISR只投递帧号，高优先级任务做格式检查、dump和轻处理。", "10ms帧意味着100Hz deadline；4通道16kHz 16bit每帧约1.25KB，8帧buffer约10KB但增加80ms排队延迟。", "underrun会造成通道不同步、FOA编码失真和后续AEC/VAD误判。", "观测DMA半满/满中断间隔、队列水位、CPU峰值、overrun计数和PCM连续性。", "默认音频任务优先级高于日志、UI和普通BLE控制。", "FOA实时预算表"],
    glasses: ["语音到显示实时预算", "眼镜采集短语音片段，BLE发给手机，手机ASR/LLM返回短文本，眼镜显示并用扬声器/震动确认。", "目标可感知反馈通常要压到300-800ms内；眼镜端本地链路只应占几十毫秒，网络和模型延迟由手机提示状态兜底。", "扬声器提示阻塞采集、BLE重连、手机后台限制造成的等待会让用户以为眼镜没听见。", "观测唤醒时间、BLE RTT、手机处理状态、显示更新时间和提示音与麦克采集重叠。", "默认眼镜快速显示状态，如“听写中/处理中/已断连”，不等完整答案才反馈。", "眼镜端到端延迟预算"]
  },
  4: {
    foa: ["音频buffer与校准内存表", "FOA链路至少包含原始多通道buffer、算法scratch、校准矩阵、USB发送buffer和故障dump窗口。", "8通道48kHz 24bit 100ms约112.5KB，仅原始环形buffer就可能吃掉小MCU大量RAM。", "局部大数组放stack会随机崩溃；cache未invalidate会让CPU读到旧PCM。", "观测map文件、heap水位、stack watermark、cache维护点、dump前后样本一致性。", "默认实时路径用静态buffer和固定内存池，不在音频回调中malloc。", "FOA内存预算表"],
    glasses: ["显示/音频/连接内存表", "眼镜RAM同时服务音频片段、BLE队列、显示tile、字体缓存、状态日志和小模型arena。", "例如单色小屏整帧buffer可能只需数KB，但彩色高分屏会迅速吃掉RAM；显示策略要优先tile/局部刷新。", "BLE包堆积、显示buffer过大、日志无限增长会挤压音频和状态机。", "观测任务stack、BLE队列长度、显示buffer峰值、低电量模式下内存回收。", "默认显示短文本和局部刷新，避免首版使用大整帧彩色buffer。", "眼镜内存预算表"]
  },
  5: {
    foa: ["PDM/I2S/USB链路规格", "PDM麦克经decimation进入PCM，I2S/TDM或USB把多通道帧送出；控制面可用I2C/SPI配置codec或时钟。", "通道数、采样率、bit depth和USB Audio端点共同决定吞吐；BLE只适合控制和状态，不适合无压缩FOA多通道流。", "clock ratio、slot宽度、左右对齐或通道顺序错，会表现为噪声、串音、音调异常或空间方向反转。", "观测逻辑分析仪时钟、USB枚举、PCM频谱、通道脉冲响应和I2C寄存器快照。", "默认有线USB承载音频，BLE只做控制/状态。", "FOA外设与总线清单"],
    glasses: ["显示/BLE/音频外设清单", "眼镜常见外设包括麦克PDM/I2S、开放式扬声器、SPI/QSPI/MIPI显示、触控/按键、IMU、电量计和BLE。", "BLE短文本和控制可靠，实时音频要压缩、分段并考虑手机后台；显示刷新要估算SPI吞吐和功耗。", "屏幕花屏、BLE卡顿、麦克噪声和触控误触通常来自时序、供电、EMI或驱动状态机。", "观测SPI帧率、BLE吞吐/P99、音频dump、触控中断、供电纹波。", "默认把BLE设计成状态同步协议，而不是把它当透明高速串口。", "眼镜外设与总线清单"]
  },
  6: {
    foa: ["音频RTOS任务拓扑", "FOA典型任务：DMA ISR、audio_process、usb_tx、control、logger、health monitor；队列边界要标出满队列策略。", "audio_process必须在帧周期内完成；usb_tx可排队但不能反压采集；日志任务必须丢日志而不是阻塞音频。", "低优先级日志持锁、USB发送阻塞、控制命令长时间占用I2C都会破坏音频实时性。", "观测任务运行时间、队列水位、锁等待、优先级反转和音频overrun计数。", "默认音频路径不等待慢外设，所有慢操作经队列异步化。", "FOA RTOS任务评审"],
    glasses: ["眼镜交互RTOS任务拓扑", "眼镜典型任务：audio/wake、ble_session、display、button_touch、power_state、speaker_prompt、logger。", "audio/wake优先级高，display允许几十毫秒抖动，BLE重连不能阻塞按键和低电量状态。", "显示刷新占CPU、扬声器提示抢音频、BLE重连风暴都会让交互状态错乱。", "观测状态机事件、任务延迟、BLE连接状态、显示队列和电源模式切换。", "默认所有用户可感知状态都有超时和取消路径。", "眼镜RTOS任务评审"]
  },
  7: {
    foa: ["FOA SDK/RTOS选型", "快速原型可看ESP-ADF/ESP-IDF或XMOS音频栈；跨平台产品可评估Zephyr；专业USB音频可能需要厂商SDK。", "选型要验证多通道音频DMA、USB Audio、时钟配置、dump工具和长期维护，而不是只看demo能播放。", "社区示例少、USB类不完整、音频驱动封装太深会拖慢bring-up。", "观测samples、boards、drivers、issues、release节奏、许可证和厂商支持。", "默认用最短一周实验验证音频DMA+USB稳定，再做长期框架承诺。", "FOA SDK选型评审"],
    glasses: ["眼镜固件生态选型", "Zephyr适合BLE/多外设/低功耗抽象，厂商SDK适合快速打通屏幕和电源，Linux通常放手机或底座侧。", "选型要验证BLE后台、显示驱动、低功耗唤醒、OTA和手机App协同，而不是只看RTOS名气。", "跨端工具链割裂、屏幕驱动闭源、BLE栈限制会影响量产速度。", "观测示例覆盖、手机端SDK、功耗API、OTA方案、调试工具和社区活跃度。", "默认眼镜端选择低功耗生态成熟的RTOS，手机端承接复杂体验。", "眼镜SDK选型评审"]
  },
  8: {
    foa: ["FOA bring-up dump流程", "先从原始PDM/PCM开始，逐级dump：单通道噪声、四通道同步、校准前后、A/B-format输出。", "每个采样点应能追溯通道、帧号、硬件时间戳和配置版本；长期录音至少跑10-30分钟看漂移和丢帧。", "通道增益差、相位偏、胶囊坏、decimation配置错会让后续空间算法全部失真。", "证据包括脉冲响应、扫频、静音底噪、队列水位、CPU峰值和dump文件hash。", "默认先冻结一版可复现实验音场，再开始主观听感优化。", "FOA音频dump计划"],
    glasses: ["佩戴态语音采集验证", "眼镜麦克受镜腿、头发、佩戴松紧和头部姿态影响，需要在真实佩戴条件下采集。", "16kHz单/双麦可作为首版语音入口；重点不是高保真，而是嘈杂环境下唤醒、VAD和手机ASR可用。", "摩擦噪声、风噪、扬声器漏音、佩戴偏移会让实验室指标失效。", "证据包括不同佩戴者dump、说话/走路/风噪场景、误唤醒率、ASR WER和电流曲线。", "默认用真实佩戴数据做阈值和降级策略，不只用桌面麦克样本。", "眼镜佩戴态采集计划"]
  },
  9: {
    foa: ["FOA设备的AEC/前端边界", "如果FOA硬件带监听扬声器或回放，就必须定义far-end reference、播放路径延迟和采集时间戳。", "AEC参考延迟误差超过数毫秒就可能明显残留；NS/AGC要保护空间线索，不能只追求单声道清晰。", "扬声器非线性、参考路径错、采样率漂移、双讲会造成AEC失败。", "证据包括参考信号dump、残余回声曲线、双讲片段、处理前后空间方向一致性。", "默认前端轻处理保守启用，优先保证原始多通道可回放和可诊断。", "FOA AEC排障树"],
    glasses: ["开放式扬声器回声闭环", "眼镜扬声器离麦克很近，提示音、TTS和环境声会同时进入麦克，AEC和双讲体验是核心风险。", "需要定义提示音音量、播放ducking、采集门控和手机端AEC参考；目标是用户讲话不被自己的眼镜提示打断。", "开放式声学路径随佩戴和脸型变化，固定滤波器很容易失效。", "证据包括提示音期间的麦克dump、双讲测试、回声残留评分、用户打断场景。", "默认提示音短、低占空比，并在状态机中显式标记播放期。", "眼镜AEC排障树"]
  },
  10: {
    foa: ["FOA最小规格与校准文件", "必须定义胶囊坐标、A-format通道顺序、B-format归一化、A-to-B矩阵和校准文件版本。", "首版可要求4胶囊、48kHz、24bit、WXYZ输出；校准文件至少包含gain、phase/delay、温度/批次信息。", "坐标系写错、矩阵版本错、校准文件丢失会让声场旋转、塌缩或方向反转。", "证据包括转台测试、固定声源方位误差、A/B-format对照、校准前后指标。", "默认把校准文件当产品资产管理，随固件/硬件版本绑定。", "FOA最小规格书"],
    glasses: ["眼镜上的空间音频取舍", "眼镜多麦可用于方向提示、语音增强和环境感知，但不应承诺专业FOA空间录音。", "镜腿距离和遮挡限制空间分辨率；目标应是改善ASR/VAD和交互反馈，而非高阶ambisonics。", "把眼镜麦克当标准阵列会导致方向估计不稳，佩戴差异会放大误差。", "证据包括左右/前后声源分类、佩戴者差异、扬声器播放时方向鲁棒性。", "默认用双麦/多麦做轻量方向提示和增强，不把它包装成专业FOA采集。", "眼镜空间音频边界说明"]
  },
  11: {
    foa: ["FOA端侧AI部署边界", "FOA硬件适合端侧VAD/KWS/轻量NS，用于降低传输或触发录制；复杂分离和空间增强可放主机。", "KWS模型arena例如几十到数百KB，必须和多通道buffer、USB队列共存。", "端侧模型阈值漂移、误触发、CPU抢占音频任务都会影响采集稳定。", "证据包括模型arena、推理耗时、误唤醒率、音频overrun和不同噪声场景结果。", "默认端侧AI只做门控或轻判断，不在采集MVP里承诺复杂增强。", "FOA TinyML部署边界"],
    glasses: ["眼镜端侧唤醒与短命令", "眼镜端适合常开唤醒、VAD和少量短命令；手机承担长语音识别、LLM和联网。", "常开模型必须低mA级别，推理窗口和特征buffer要纳入8小时功耗预算。", "误唤醒会消耗电池和隐私信任，漏唤醒会破坏交互入口。", "证据包括不同噪声下FAR/FRR、常开电流、唤醒到手机会话延迟。", "默认端侧只判断“是否值得叫醒手机”，不在眼镜上跑完整ASR。", "眼镜TinyML部署边界"]
  },
  12: {
    foa: ["FOA作为眼镜/主机音频外设", "FOA硬件可作为高质量空间采集外设，为手机、PC或眼镜生态提供可信多通道输入。", "重点是标准接口、时间戳、校准和供电，而不是在采集器上实现完整AI体验。", "主机识别不到设备、格式不兼容、校准未随数据传递会让生态接入失败。", "证据包括USB Audio枚举、主机录音、校准metadata、跨平台兼容清单。", "默认FOA设备先做好标准音频外设，再考虑与眼镜联动。", "FOA外设产品架构"],
    glasses: ["显示型AI眼镜状态机", "状态至少包括Idle、Wake Listening、Uploading、Thinking、Displaying、Error、Low Power。每个状态有进入事件、退出条件和用户可见反馈。", "短文本显示要限制字数、行数、停留时间和刷新频率；手机结果迟到时要有超时和取消。", "状态不透明、旧文本残留、断连不提示会让用户不信任设备。", "证据包括状态转移日志、显示payload、BLE session id、超时场景录像。", "默认每个异步动作都有可见状态，不让用户面对空白等待。", "眼镜交互状态机"]
  },
  13: {
    foa: ["FOA连接协议边界", "FOA音频优先走USB Audio或本地存储，BLE只传控制、状态、校准版本和短诊断。", "BLE控制包要有seq、ack、配置版本和错误码；音频吞吐不应压到BLE首版。", "控制和音频混用同一低速链路会造成配置延迟和丢包难定位。", "证据包括USB吞吐、BLE RTT、配置生效时间、断连恢复日志。", "默认音频数据面和控制面分离。", "FOA连接协议草案"],
    glasses: ["眼镜BLE/手机协同契约", "眼镜通过BLE和手机交换状态、短文本、控制、压缩语音片段和健康信息。手机负责网络和AI会话。", "包契约要包含seq、session id、type、ttl、ack策略；字幕delta通常几十到几百字节。", "手机后台限制、断连重连、包乱序会造成字幕跳变或状态错乱。", "证据包括P99 RTT、重连时间、包丢失率、后台/锁屏场景。", "默认协议以状态同步和短文本为主，语音片段只在VAD后分段发送。", "眼镜BLE包契约"]
  },
  14: {
    foa: ["移动FOA录音功耗预算", "便携FOA需要估算麦克偏置、codec/DSP、主控、USB/存储和指示灯功耗。", "如果目标是4小时移动录音，平均电流和热都要留余量；高采样率和多通道会推高存储/传输功耗。", "电源纹波会进入音频，低电量写文件失败会损坏录音。", "证据包括不同采样率电流、底噪对比、低电量录音、热稳定性。", "默认先做有线供电稳定版，再扩展电池移动版。", "FOA移动录音功耗预算"],
    glasses: ["8小时眼镜功耗预算", "眼镜功耗来自常开唤醒、BLE连接、显示、扬声器提示、IMU/触控和电源管理。", "例如220mAh电池若平均电流超过27mA，8小时目标就会失败；显示和常开模型占空比必须被约束。", "重连风暴、显示常亮、提示音过长会迅速耗电并发热。", "证据包括模式电流表、一天使用脚本、低电量降级、热感知测试。", "默认把显示做成短时glanceable反馈，并在状态机里强制熄屏。", "眼镜8小时功耗预算"]
  },
  15: {
    foa: ["FOA的Linux/RTOS决策", "纯采集器优先RTOS；若要网络录音、插件处理、文件管理和复杂UI，可在网关或主机侧引入Linux。", "Linux会带来启动、功耗、BSP和安全更新成本；专业音频网关才可能值得。", "为了跑Linux牺牲采集稳定性，是FOA MVP常见过度设计。", "证据包括启动时间、音频稳定性、文件系统断电测试和升级路径。", "默认FOA设备端RTOS，复杂分析放PC/手机/Linux网关。", "FOA Linux边界决策"],
    glasses: ["眼镜端避免Linux的理由", "眼镜本体通常避免Linux以控制功耗、启动和热；复杂体验放手机App或云服务。", "如果使用Linux级SoC，必须证明续航、热、BSP和安全更新能被承担。", "把眼镜做成小手机会导致重量、热和维护成本失控。", "证据包括冷启动、待机电流、热像、后台服务稳定性和OTA成本。", "默认眼镜端MCU/RTOS，手机承担Linux级复杂性。", "眼镜Linux边界决策"]
  },
  16: {
    foa: ["FOA BSP变更点清单", "换麦克阵列、codec或时钟源时，BSP变更集中在pinmux、clock tree、PDM/I2S、DMA和校准存储。", "每个硬件变体要有板级配置和通道映射，不要把硬件差异散落在算法代码里。", "板级配置和算法假设不一致会导致通道错位、采样率错和校准失效。", "证据包括board config、寄存器dump、通道脉冲测试和校准版本。", "默认硬件差异留在BSP/配置层，算法只消费规范化音频帧。", "FOA BSP变更评审"],
    glasses: ["眼镜BSP/设备树边界", "换显示、触控、PMIC、IMU或麦克时，BSP要描述供电、reset、IRQ、bus地址和唤醒能力。", "显示初始化和低功耗唤醒时序尤其容易跨越驱动、状态机和电源管理。", "驱动假设屏幕常开或PMIC状态不清，会造成黑屏、耗电或无法唤醒。", "证据包括设备树/Kconfig、初始化trace、睡眠唤醒日志、屏幕重置测试。", "默认把外设能力声明成配置，而不是写死在交互逻辑中。", "眼镜BSP变更评审"]
  },
  17: {
    foa: ["FOA OTA与录音隐私", "FOA设备OTA要保护采集稳定性和校准文件；录音dump、日志和序列号都可能包含隐私或商业敏感信息。", "分区要能回滚固件且不破坏校准数据；日志上传要脱敏并默认关闭原始音频。", "升级后校准不兼容、断电损坏文件、日志泄露录音是高风险事故。", "证据包括断电OTA、校准迁移、日志脱敏审计和恢复流程。", "默认固件A/B回滚，校准分区独立且带版本校验。", "FOA OTA/隐私策略"],
    glasses: ["眼镜OTA与用户信任", "眼镜涉及常开麦克、字幕、AI会话和手机同步，OTA和隐私提示必须可解释。", "升级失败不能让眼镜无法摘除配对或无法关闭麦克；用户可见隐私状态要和实际采集一致。", "隐私指示与真实采集不同步、日志含会话文本、OTA失败卡住会直接伤害信任。", "证据包括OTA回滚、隐私灯/图标状态、日志脱敏、删除会话测试。", "默认所有采集状态都有用户可见提示，并把隐私策略写入状态机。", "眼镜OTA/隐私策略"]
  },
  18: {
    foa: ["FOA音频问题证据链", "FOA调试要同时看PCM、时间戳、队列水位、CPU峰值、通道校准和USB状态。", "问题定位顺序：先原始数据，再驱动时序，再算法处理，再主机接收。", "只听主观结果容易把通道/时钟问题误判成算法问题。", "证据包括多点dump、trace、频谱、相位、USB抓包和配置快照。", "默认每个音频bug都要求附带原始PCM和系统trace。", "FOA调试证据链"],
    glasses: ["眼镜跨端问题证据链", "眼镜问题跨设备固件、手机App、BLE、云服务和用户场景，必须统一session id和时间线。", "翻译卡顿可能来自麦克、BLE、手机后台、网络、ASR或显示队列。", "只优化模型会忽略连接和状态机根因。", "证据包括设备trace、手机日志、BLE事件、网络耗时、显示事件和用户操作录像。", "默认每次会话都有可关联的session id和端到端事件表。", "眼镜跨端调试计划"]
  },
  19: {
    foa: ["FOA产测与校准流程", "量产要测麦克开短路、底噪、增益、相位、通道顺序、USB枚举、校准写入和序列号绑定。", "产测时间要可控；校准文件要可追溯到硬件批次和固件版本。", "胶水/网布/结构公差会让算法指标批量漂移。", "证据包括产测pass/fail、校准数据库、抽检录音和返修入口。", "默认把校准和产测设计成MVP的一等公民。", "FOA PVT bring-up checklist"],
    glasses: ["眼镜PVT与可穿戴约束", "眼镜PVT要覆盖重量、热、佩戴舒适、扬声器漏音、显示可读性、BLE稳定、充电和隐私提示。", "产测不仅测电路通不通，还要测显示、触控、音频和低功耗模式是否可用。", "结构遮挡麦克、镜腿发热、隐私提示不明显会在用户场景暴露。", "证据包括佩戴测试、热像、漏音测试、低电量循环和产测夹具记录。", "默认把舒适性、热和隐私作为硬件验收项，而非外观问题。", "眼镜PVT bring-up checklist"]
  },
  20: {
    foa: ["FOA agent任务拆分", "可让agent读ESP-ADF/XMOS/Zephyr示例，抽取音频DMA、USB Audio、buffer和任务图，但不能让它猜硬件寄存器事实。", "任务要限定文件范围、硬件假设、验收dump和禁止项，例如不能改ISR重活、不能引入heap。", "agent可能幻觉datasheet能力、破坏时序或忽略校准版本。", "证据包括agent输出的链路图、patch、测试步骤和人工评审清单。", "默认让agent做阅读、样板和测试，不让它独自做硬件取舍。", "FOA agent任务包"],
    glasses: ["眼镜agent任务拆分", "可让agent生成BLE协议、显示状态机、手机协同mock和评估rubric，但必须给出状态、包格式、超时和隐私限制。", "任务要说明断连、后台、低电量、隐私提示和显示payload限制。", "agent容易把眼镜写成手机App，忽略功耗和用户可见状态。", "证据包括状态机图、协议schema、端到端mock、失败场景测试。", "默认把跨端契约写清楚后再交给agent实现。", "眼镜agent任务包"]
  },
  21: {
    foa: ["FOA/麦克阵列MVP评审", "最终方案包含硬件框图、通道/格式规格、采集链路、实时预算、算法边界、校准、OTA和量产风险。", "必须给出吞吐、RAM、延迟、功耗和产测时间数量级；不能只说“后续优化”。", "最大风险通常是通道一致性、校准可维护性、实时稳定和结构声学偏差。", "证据包括一周实验计划、dump脚本、转台/声源测试、产测checklist。", "默认MVP目标是可信采集和可诊断，不是一次做完所有增强算法。", "FOA最终MVP评审包"],
    glasses: ["无摄像头显示型AI眼镜MVP评审", "最终方案包含显示交互、语音链路、扬声器、BLE/手机协同、功耗、OTA、隐私和跨端可观测性。", "必须给出8小时功耗预算、端到端延迟、BLE协议、状态机和离线降级。", "最大风险通常是续航、重连、隐私信任、显示可读性和手机后台限制。", "证据包括一天使用脚本、BLE/手机mock、状态机测试、隐私提示审计。", "默认MVP目标是稳定的glanceable AI反馈，不是把手机功能搬到眼镜。", "眼镜最终MVP评审包"]
  }
};

const repoCatalog = {
  xmos: {
    repo: "XMOS lib_mic_array",
    url: "https://github.com/xmos/lib_mic_array"
  },
  adf: {
    repo: "Espressif ESP-ADF",
    url: "https://github.com/espressif/esp-adf"
  },
  respeaker: {
    repo: "ReSpeaker mic_array",
    url: "https://github.com/respeaker/mic_array"
  },
  zephyr: {
    repo: "Zephyr RTOS",
    url: "https://github.com/zephyrproject-rtos/zephyr"
  },
  tflm: {
    repo: "TensorFlow Lite Micro",
    url: "https://github.com/tensorflow/tflite-micro"
  },
  ossg: {
    repo: "OpenSourceSmartGlasses",
    url: "https://github.com/Mentra-Community/OpenSourceSmartGlasses"
  },
  mentra: {
    repo: "MentraOS",
    url: "https://github.com/Mentra-Community/MentraOS"
  },
  sidekick: {
    repo: "SidekickOS",
    url: "https://github.com/siersidekick/SidekickOS"
  }
};

function projectEntry(repoKey, paths, whyThisModule, readQuestions, codeAnchors, engineeringArtifact, conceptBridge, engineeringDecision, avoidDetail = "今天只读模块边界、配置入口和数据流，不追函数内部每一行语法。") {
  const repo = repoCatalog[repoKey];
  return {
    sourceRefs: {
      ...repo,
      paths,
      whyThisModule,
      readQuestions,
      codeAnchors,
      engineeringArtifact,
      avoidDetail
    },
    projectLesson: {
      repoEvidence: `打开 ${repo.repo}，先按路径 ${paths.map((p) => "`" + p + "`").join("、")} 阅读。今天要抓住的是：${whyThisModule}`,
      conceptBridge,
      codeReading: `带着三个问题读：${readQuestions.map((q, i) => `${i + 1}. ${q}`).join(" ")} 代码锚点：${codeAnchors.map((a) => "`" + a + "`").join("、")}。`,
      engineeringDecision,
      artifactChecklist: `验收产物是《${engineeringArtifact}》。必须引用至少一个仓库路径、一个配置/代码锚点、一个数量级估算、一个失败模式和一个下一步实验。`
    }
  };
}

const trackProjectLessons = {
  1: {
    foa: projectEntry("xmos", ["README.rst", "examples/", "lib_mic_array/"], "用一个真实 PDM 麦克阵列库看产品边界：输入是 PDM，输出是按帧 PCM，工具链和芯片能力也是架构的一部分。", ["README 把哪些能力写成库特性，而不是应用特性？", "examples 目录如何暗示最小可运行路径？", "1-16 mic、sample rate、frame size 会改变哪些预算？"], ["README Features", "examples/", "lib_mic_array/"], "FOA 开源模块边界图", "DMA/ISR/buffer 不是抽象词，它们在 mic array 项目里对应 PDM 接收、decimation 和 frame 交付边界。", "先把 FOA MVP 定义成可信采集器：证明 PDM 到 PCM frame 可持续、可配置、可 dump，再谈空间编码。"),
    glasses: projectEntry("ossg", ["README.md", "electronics_and_firmware/", "mechanical/"], "用开源眼镜整仓看系统边界：它同时包含电子、固件、机械和产品愿景，天然适合理解设备-手机-云的分工。", ["README 如何定义 all-day wearable 和 immediately useful？", "electronics_and_firmware 与 mechanical 为什么要一起读？", "哪些能力在眼镜端，哪些明显需要手机/云？"], ["README Overview", "electronics_and_firmware/", "mechanical/"], "AI 眼镜开源产品边界图", "嵌入式系统先是物理产品，OSSG 把镜架、板子、麦克、显示和固件放在一起，迫使你从硬件约束读软件。", "先把眼镜端定义成低功耗 I/O 设备：麦克、显示、BLE、电源状态可靠，再让手机/云承担复杂 AI。")
  },
  2: {
    foa: projectEntry("xmos", ["lib_mic_array/", "doc/", "README.rst"], "lib_mic_array 把 PDM receive、decimation、framing 做成专用音频模块，适合拆 MCU/DSP 的角色边界。", ["哪些工作是连续流式处理，不能交给普通 main loop？", "为什么 XS3 vector unit 会成为库能力边界？", "frame 输出之后才轮到上层算法做什么？"], ["lib_mic_array/", "doc/", "README Required tools"], "FOA 芯片角色表", "MCU、DSP、NPU 的差别可以从这个库读出来：硬实时采样和 decimation 靠底层音频能力，神经增强不是第一层。", "默认 MCU/音频专用硬件负责采集和 frame，上位机或更强芯片负责重算法。"),
    glasses: projectEntry("sidekick", ["README.md", "firmware/", "firmware/main.ino"], "SidekickOS 明确写出 ESP32S3、BLE、camera/audio/client 分层，适合拆眼镜端 MCU 的工作边界。", ["README 把 ESP32S3 用在哪些实时 I/O 上？", "firmware 和 client 分离说明了什么产品分工？", "哪些功能不应该放到眼镜 MCU 首版？"], ["README Hardware", "firmware/main.ino", "sidekickos-client/"], "眼镜端/手机端芯片角色表", "ESP32S3 在眼镜里不是小电脑，而是外设聚合器和低功耗状态机；复杂 UI/AI 应该在 client 或手机侧。", "默认眼镜 MCU 做采集、BLE、状态和电源；手机做模型、网络和长交互。")
  },
  3: {
    foa: projectEntry("xmos", ["lib_mic_array/", "examples/", "README Known issues"], "PDM receive 和 framing 路径能把 DMA/ISR/ring buffer 讲实：硬件不断生产 frame，消费者必须等时取走。", ["PDM 数据如何变成固定 frame？", "如果 frame_rx 没有等时调用，README 的 known issue 暗示什么风险？", "buffer 深度增加会换来什么延迟？"], ["PDM receive", "ma_frame_rx", "README Known issues"], "FOA DMA/ring buffer 实时预算", "DMA 是生产者，ISR 是通知者，ring buffer 是生产者和音频任务之间的缓冲契约；不是为了炫技，而是为了不丢连续音频。", "默认 ISR 只投递 frame ready，高优先级任务消费 frame，日志和控制都不能反压采集。"),
    glasses: projectEntry("sidekick", ["firmware/main/", "firmware/main.ino", "firmware/components/"], "SidekickOS 固件把 camera/mic/BLE 事件放在一个资源受限设备里，适合看 producer/consumer 为什么会互相挤压。", ["capture 事件和 BLE 发送之间是否有队列边界？", "主循环/任务里哪些动作可能阻塞实时输入？", "丢帧、延迟和重连分别会被用户怎样感知？"], ["firmware/main.ino", "firmware/main/", "BLE send path"], "眼镜 producer/consumer 时间线", "眼镜端的 producer 不只有麦克，还有 camera、按键、BLE、显示；每条流都要有队列和超时意识。", "默认用户可感知路径优先：唤醒/按键/状态提示不能被大数据发送拖住。")
  },
  4: {
    foa: projectEntry("xmos", ["README Features", "lib_mic_array/", "examples/"], "lib_mic_array 支持 1-16 PDM mic、不同 sample rate 和 frame size，刚好训练 RAM/frame 预算。", ["16 mic 与 4 mic 的 frame RAM 差多少？", "frame size 变大如何同时影响 CPU 调度和延迟？", "哪些 buffer 应该静态分配？"], ["1 to 16 PDM microphones", "Configurable frame size", "sample rates"], "FOA RAM/frame 预算表", "内存不是代码细节，而是架构预算：多通道 PCM、算法 scratch、USB buffer 和 dump 窗口会抢同一块 RAM。", "默认实时音频路径用静态 buffer；任何 malloc、长日志和大 stack 都要从音频回调移走。"),
    glasses: projectEntry("sidekick", ["firmware/partitions.csv", "firmware/main/", "README.md"], "SidekickOS 的 partitions 和 firmware 目录能同时训练 Flash 分区、运行 RAM、媒体 buffer 的边界。", ["partitions.csv 给 OTA/文件系统留下了什么空间？", "camera/audio/display buffer 哪个最可能吃 RAM？", "日志和 web/client 功能会不会挤压固件资源？"], ["firmware/partitions.csv", "firmware/main/", "README Audio Streaming"], "眼镜 Flash/RAM 预算表", "眼镜内存预算要同时看固件分区和运行期 buffer；显示、音频、BLE 和 camera 都可能成为峰值来源。", "默认先限制 payload 尺寸、显示内容和音频片段长度，再考虑更复杂体验。")
  },
  5: {
    foa: projectEntry("xmos", ["README Features", "doc/", "lib_mic_array/"], "XMOS 文档里的 PDM clock、MCLK divider、SDR/DDR、sample rate 是外设总线课的真实材料。", ["PDM clock 为什么和 sample rate 绑定？", "SDR/DDR 配置会影响什么硬件连接？", "多 mic 输入为什么不适合直接走 BLE？"], ["3.072 MHz PDM clock", "MCLK to PDM clock divider", "SDR and DDR"], "FOA 外设/时钟清单", "总线选择首先看连续数据率和时钟关系。PDM/I2S/USB/BLE 不是平级替代品，各自服务不同数据面。", "默认音频数据面走 PDM/I2S/USB，BLE 只做控制、状态和短诊断。"),
    glasses: projectEntry("ossg", ["electronics_and_firmware/", "res/", "README Images"], "OSSG 电子目录和板卡图片能把显示、麦克、LED、电池、无线连接放回真实眼镜硬件约束。", ["哪些外设是用户体验刚需，哪些只是 demo 扩展？", "显示和麦克对供电/结构有什么依赖？", "BLE/无线连接应承载数据面还是控制面？"], ["electronics_and_firmware/", "v0p5 schematic images", "README display/microphones"], "眼镜外设与总线清单", "眼镜外设不是越多越好；每个外设都会带来引脚、供电、驱动、EMI 和功耗账单。", "默认 BLE 承载状态/短文本，显示做短时反馈，麦克采集保持低码率和可诊断。")
  },
  6: {
    foa: projectEntry("adf", ["README.md", "components/", "examples/"], "ESP-ADF 是产品化音频框架，components/examples 比单个驱动更适合理解 audio pipeline、task 和 queue。", ["ESP-ADF 和 ESP-IDF 的边界是什么？", "audio pipeline 中 element 之间怎样传递数据？", "哪些 service 可能阻塞实时音频？"], ["README ESP-ADF vs ESP-IDF", "components/", "examples/"], "FOA audio pipeline 任务拓扑", "RTOS 任务不是抽象调度题，ADF 的 pipeline/element/service 展示了音频产品如何把处理、控制、OTA 分层。", "默认采集和处理任务优先级高于日志、网络和 UI；慢服务只能异步接入。"),
    glasses: projectEntry("sidekick", ["firmware/", "firmware/main/", "sidekickos-client/"], "SidekickOS 的 firmware/client 分层适合拆 capture、BLE、command、status 的任务边界。", ["哪些代码属于设备实时任务，哪些属于客户端逻辑？", "BLE 发送失败时固件应该阻塞还是降级？", "状态上报和媒体采集谁优先？"], ["firmware/main/", "BLE 5.0", "sidekickos-client/"], "眼镜 RTOS/任务边界图", "眼镜任务拓扑要以用户状态为中心：采集、BLE、显示、按键、电源都要有优先级和超时。", "默认 capture/status 高优先级，bulk transfer 和日志可丢弃或延后。")
  },
  7: {
    foa: projectEntry("zephyr", ["samples/", "boards/", "drivers/"], "用 Zephyr 的 samples/boards/drivers 作为 SDK 选型对照，避免只看音频 demo 就定框架。", ["samples 是否覆盖你的目标链路？", "boards/drivers 能否表达麦克、codec、USB、BLE？", "和 ESP-ADF/XMOS 相比，抽象强弱如何影响 bring-up？"], ["samples/", "boards/", "drivers/"], "FOA SDK/RTOS 选型评审", "选型的第一性原理是生态和证据：示例、板级配置、驱动成熟度、调试工具、长期维护。", "默认先做一周 spike 验证 DMA + USB Audio + dump，再承诺长期框架。"),
    glasses: projectEntry("mentra", ["README.md", "mcu_client/", "mobile/", "cloud/"], "MentraOS 仓库天然展示眼镜 OS 的跨端结构：mcu_client、mobile、cloud 分别承担不同复杂度。", ["mcu_client/mobile/cloud 三层各自解决什么？", "OpenSourceSmartGlasses firmware 与 MentraOS app/cloud 如何互补？", "选型时哪些风险来自手机后台和云服务？"], ["mcu_client/", "mobile/", "cloud/", "glasses-compatibility.md"], "眼镜 SDK/OS 选型评审", "眼镜 OS 选型不能只看设备固件；手机 app、云会话、兼容眼镜列表和开发者 SDK 都是产品框架。", "默认眼镜端选择低功耗稳定栈，跨端应用生态交给 MentraOS 类平台。")
  },
  8: {
    foa: projectEntry("xmos", ["examples/", "lib_mic_array/", "tests/"], "XMOS examples/tests 适合把 bring-up 变成证据链：先 dump 原始 PCM，再看 frame、通道、漂移。", ["最小 example 需要哪些输入配置？", "测试如何证明 frame 连续性？", "dump 文件要带哪些 metadata 才能复现？"], ["examples/", "tests/", "frame output"], "FOA PCM dump bring-up 流程", "音频算法前先证明数据可信；开源 example 是最小链路，测试目录是证据习惯。", "默认先冻结可复现实验音场和 dump 格式，再开始调算法。"),
    glasses: projectEntry("sidekick", ["README Audio Streaming", "firmware/", "docs/"], "SidekickOS 明确把 audio streaming 标为工作中，正适合训练佩戴态语音采集的风险意识。", ["音频流在 README 中处于什么成熟度？", "佩戴/移动/风噪场景会让桌面测试失效吗？", "BLE 音频和状态提示如何互相影响？"], ["README Audio Streaming", "firmware/", "docs/"], "眼镜佩戴态采集计划", "开源项目未完成的模块更有教学价值：它提示你哪些链路还没有被工程证据闭合。", "默认先做佩戴态 dump 和场景脚本，别急着承诺稳定实时音频。")
  },
  9: {
    foa: projectEntry("adf", ["components/", "examples/", "docs/"], "ESP-ADF 的 audio pipeline 是理解 AEC/NS/AGC/VAD 插入点的产品框架材料。", ["前端算法应该作为 pipeline element 还是外部服务？", "far-end reference 在框架里从哪里进入？", "处理耗时如何反压采集？"], ["audio pipeline", "components/", "examples/"], "FOA AEC/前端插入点图", "AEC/NS 不是一个函数，而是和 reference、timestamp、queue、CPU 预算绑定的 pipeline 节点。", "默认保留 raw dump 和 reference dump，前端处理保守启用。"),
    glasses: projectEntry("mentra", ["cloud/", "mobile/", "mcu_client/"], "MentraOS 的跨端会话结构适合解释眼镜音频如何进入手机/云，再返回字幕或 AI 结果。", ["音频/会话状态在哪一端创建？", "手机和云之间的延迟如何反馈到眼镜显示？", "隐私提示应该跟随哪个采集状态？"], ["cloud/", "mobile/", "mcu_client/"], "眼镜音频会话链路图", "眼镜 AEC/VAD/KWS 不只是算法问题，还要和跨端 session、手机后台、云延迟一起设计。", "默认每个采集会话都有 session id、状态提示和超时。")
  },
  10: {
    foa: projectEntry("xmos", ["lib_mic_array/", "doc/", "python/"], "lib_mic_array 的 mic count、framing 和 Python 工具可作为 FOA A-format/B-format 规格的底层输入证据。", ["库输出的是原始阵列 frame 还是 Ambisonics？", "A-format 到 B-format 需要哪些库外信息？", "校准文件应该绑定哪些硬件版本？"], ["framing", "python/", "configurable frame size"], "FOA A/B-format 与校准规格", "FOA 的关键不是会背 WXYZ，而是知道开源库只给你可信 frame，坐标系、矩阵和校准是产品层责任。", "默认把校准文件作为产品资产，随硬件批次、固件版本和通道表一起管理。"),
    glasses: projectEntry("ossg", ["README.md", "electronics_and_firmware/endpiece_mic_board_v0p1", "electronics_and_firmware/endpiece_mic_board_v0p2"], "OSSG 的端部麦克板目录适合说明眼镜麦克几何和佩戴限制，不适合包装成专业 FOA。", ["镜腿/端部麦克位置和专业阵列有什么不同？", "佩戴差异会怎样影响方向估计？", "什么空间音频目标对眼镜更合理？"], ["endpiece_mic_board_v0p1", "endpiece_mic_board_v0p2", "README microphones"], "眼镜空间音频边界说明", "真实眼镜麦克受结构和佩戴影响，目标应是交互增强和方向提示，而不是专业 Ambisonics 录音。", "默认眼镜空间音频只承诺辅助 ASR/VAD/提示，不承诺 FOA。")
  },
  11: {
    foa: projectEntry("tflm", ["tensorflow/lite/micro/examples/", "tensorflow/lite/micro/"], "TFLite Micro examples 能把模型 arena、量化输入、推理耗时和音频 buffer 共存讲清楚。", ["example 如何声明 tensor arena？", "音频特征 buffer 和模型 arena 如何抢 RAM？", "推理应该在采集任务内还是异步任务内？"], ["micro/examples/", "tensor_arena", "Invoke"], "FOA TinyML 资源边界表", "TinyML 的第一性原理是固定内存和固定时序；不是把 Python 模型直接搬上 MCU。", "默认端侧 AI 只做 VAD/KWS/门控，不抢占 FOA 采集实时性。"),
    glasses: projectEntry("mentra", ["mcu_client/", "mobile/", "cloud/"], "MentraOS 跨端结构能说明唤醒、短命令和 LLM 该放在哪一端。", ["哪些判断必须眼镜端本地完成？", "哪些任务明显应该手机/云完成？", "误唤醒和隐私状态如何进入 session？"], ["mcu_client/", "mobile/", "cloud/"], "眼镜端侧 AI 放置决策", "眼镜端侧 AI 的目标是决定是否叫醒更重系统，而不是在镜腿里跑完整 AI 助手。", "默认眼镜本地只做低功耗唤醒/VAD，长语音和 LLM 交给手机/云。")
  },
  12: {
    foa: projectEntry("adf", ["components/", "examples/", "README.md"], "用 ESP-ADF/USB 主机思维反推 FOA 外设：标准接口、metadata、校准版本比花哨算法更重要。", ["标准 audio device 需要暴露哪些格式？", "校准 metadata 如何随数据被主机理解？", "设备状态和错误码从哪里上报？"], ["components/", "examples/", "README Product Services"], "FOA 作为主机外设架构", "FOA 设备要先成为可枚举、可录制、可诊断的音频外设，之后才是空间算法平台。", "默认 USB/本地存储承载音频，控制面单独表达状态和校准版本。"),
    glasses: projectEntry("mentra", ["README.md", "docs/", "cloud/packages/", "mobile/"], "MentraOS app/session/layout API 是眼镜状态机的真实产品材料：应用发起文本/布局，设备展示短反馈。", ["一次 app session 有哪些状态？", "layout/showText 类 API 对显示内容有什么暗示？", "断连/超时/旧文本应该如何退出？"], ["docs.mentra.glass", "cloud/packages/", "mobile/"], "眼镜 Idle/Listening/Thinking/Displaying 状态机", "眼镜体验来自状态机，而不是单个模型；每个异步动作都必须有用户可见反馈和退出条件。", "默认状态包括 Idle、Listening、Uploading、Thinking、Displaying、Error、Low Power。")
  },
  13: {
    foa: projectEntry("adf", ["components/", "examples/", "docs/"], "ADF 产品服务和连接能力适合训练 FOA 的数据面/控制面分离，而不是把多通道音频塞进 BLE。", ["哪些数据必须实时高吞吐？", "哪些配置/状态适合低速可靠传输？", "控制包需要哪些版本和 ack 字段？"], ["components/", "examples/", "OTA/service concepts"], "FOA 控制协议草案", "BLE 对 FOA 更像控制面，不是多通道无压缩音频数据面。", "默认音频走 USB Audio/存储，BLE 传 seq、ack、配置版本、错误码。"),
    glasses: projectEntry("sidekick", ["README BLE 5.0", "firmware/", "sidekickos-client/"], "SidekickOS 把 BLE 5.0、517-byte MTU、client 分层写进 README，适合做眼镜 BLE 包契约。", ["README 提到的 MTU/DLE 能解决什么，不能解决什么？", "firmware 与 client 如何确认包顺序？", "手机后台/断连时用户看到什么？"], ["BLE 5.0", "517-byte MTU", "firmware/"], "眼镜 BLE 包契约", "BLE 不是透明串口，它是带连接间隔、MTU、重传、后台限制的状态同步通道。", "默认包包含 seq、session id、type、ttl、ack 策略和显示 payload 限制。")
  },
  14: {
    foa: projectEntry("xmos", ["README Features", "doc/", "examples/"], "XMOS sample rate、mic count 和工具链要求能推导移动 FOA 录音功耗：通道越多，存储/传输/处理越贵。", ["哪些配置会线性增加功耗和吞吐？", "有线供电和电池版验证顺序应如何安排？", "电源纹波会怎样进入音频证据链？"], ["sample rates", "1 to 16 PDM microphones", "examples/"], "移动 FOA 录音功耗预算", "功耗预算不是最后优化项；麦克偏置、主控、USB/存储和指示灯会改变音频质量和续航。", "默认先做有线稳定采集，再扩展电池移动录音。"),
    glasses: projectEntry("ossg", ["README.md", "electronics_and_firmware/", "mechanical/"], "OSSG 的 all-day wearable 目标必须落到电池、重量、显示占空比、无线连接和佩戴舒适。", ["all-day wearable 对平均电流意味着什么？", "显示和常开麦克的占空比如何限制？", "结构重量和热如何反过来限制软件功能？"], ["README all day wearable", "electronics_and_firmware/", "mechanical/"], "眼镜 8 小时功耗预算", "眼镜续航不是 mAh 除以一个电流这么简单；状态机必须主动降级显示、音频和连接行为。", "默认以 8 小时轻使用为目标，显示短时 glanceable，常开模型低占空比。")
  },
  15: {
    foa: projectEntry("adf", ["README.md", "components/", "esp-idf"], "ESP-ADF 建在 ESP-IDF 上，适合讨论 RTOS 产品框架与 Linux 网关的边界。", ["ADF/IDF 已经覆盖哪些产品服务？", "什么需求才值得引入 Linux？", "Linux 会给启动、功耗、BSP 和安全带来哪些成本？"], ["README ESP-ADF vs ESP-IDF", "components/", "esp-idf"], "FOA Linux/RTOS 边界决策", "嵌入式 Linux 适合复杂应用和网络文件系统，不一定适合纯采集实时设备。", "默认 FOA 设备端 RTOS，复杂分析、网络和文件管理放 PC/手机/Linux 网关。"),
    glasses: projectEntry("mentra", ["cloud/", "mobile/", "mcu_client/", "asg_client/"], "MentraOS 把复杂 OS 能力放到 mobile/cloud/asg_client，适合说明眼镜本体为什么通常避免 Linux。", ["哪些复杂性已经被手机/云吸收？", "mcu_client 还需要承担哪些确定性 I/O？", "如果眼镜本体跑 Linux，会新增哪些量产风险？"], ["cloud/", "mobile/", "mcu_client/"], "眼镜 Linux 边界决策", "眼镜本体是可穿戴低功耗设备，不是缩小手机；跨端 OS 可以在手机/云表达复杂性。", "默认眼镜端 MCU/RTOS，手机和云承担 app runtime、网络和 AI。")
  },
  16: {
    foa: projectEntry("zephyr", ["boards/", "drivers/", "dts/"], "Zephyr 的 boards/drivers/dts 是 BSP/设备树的标准学习材料，可迁移到 mic/codec/clock 变更评审。", ["board 描述和 driver 代码如何分工？", "mic/codec/clock 变更应落在哪一层？", "配置和算法假设不一致会怎样失败？"], ["boards/", "drivers/", "dts/"], "FOA BSP 变更点清单", "BSP 的价值是把硬件差异集中表达，避免算法代码散落 pin、clock、DMA 假设。", "默认硬件变体只改 board/config/calibration，算法消费规范化 frame。"),
    glasses: projectEntry("ossg", ["electronics_and_firmware/", "mechanical/", "res/"], "OSSG 的电子/机械资料能把 display、PMIC、IMU、mic 的 BSP 边界放到真实硬件形态里。", ["显示 reset/供电/总线应由哪里描述？", "PMIC/电池状态如何影响状态机？", "机械遮挡为什么也是 BSP 风险？"], ["electronics_and_firmware/", "mechanical/", "schematic images"], "眼镜 BSP/设备配置边界", "眼镜 BSP 不只是驱动能跑，还要表达唤醒、供电、reset、IRQ、机械遮挡等产品事实。", "默认把外设能力和板级差异配置化，不写死在交互逻辑里。")
  },
  17: {
    foa: projectEntry("adf", ["README.md", "components/", "examples/"], "ESP-ADF v3 强调 product services、battery、OTA，适合把 FOA OTA/隐私从概念落到产品服务。", ["OTA 和 battery service 会怎样影响录音稳定性？", "校准文件应不应该跟固件同分区？", "日志/dump 默认上传会有什么隐私风险？"], ["README Product Services", "components/", "examples/"], "FOA OTA/校准/隐私策略", "OTA 对音频设备不是下载新固件这么简单；要保护校准资产、录音隐私和断电恢复。", "默认 A/B 固件回滚，校准独立分区并带版本校验，原始音频日志默认关闭。"),
    glasses: projectEntry("mentra", ["cloud/", "mobile/", "docs/", "README.md"], "MentraOS 涉及账号、应用、云会话和眼镜显示，适合讨论采集隐私、日志脱敏和 OTA 信任。", ["采集状态在哪些端被感知？", "会话文本和音频日志如何脱敏？", "OTA 失败时用户怎样恢复控制？"], ["cloud/", "mobile/", "docs/", "README"], "眼镜 OTA/隐私信任策略", "眼镜隐私是跨端状态一致性问题：设备、手机、云和用户可见提示必须对齐。", "默认所有采集状态有可见提示；日志脱敏；升级失败可回滚且不破坏关闭麦克能力。")
  },
  18: {
    foa: projectEntry("xmos", ["tests/", "examples/", "python/"], "XMOS tests/examples/python 工具适合构建 PCM、时间戳、配置和频谱的音频证据链。", ["测试如何证明 frame 连续？", "Python 工具能否辅助 dump/分析？", "bug 报告需要哪些配置快照？"], ["tests/", "examples/", "python/"], "FOA 音频调试证据链", "音频 bug 先看原始 PCM 和时序，再看算法；否则会把通道/时钟问题误判成模型问题。", "默认每个问题附 PCM dump、队列水位、CPU 峰值、配置和版本。"),
    glasses: projectEntry("mentra", ["cloud/", "mobile/", "mcu_client/", "asg_client/"], "MentraOS 跨端目录适合训练 session id 时间线：设备、手机、云、显示都要能对齐。", ["一次用户会话如何跨目录流动？", "卡顿可能来自哪一端？", "日志如何避免泄露完整用户内容？"], ["cloud/", "mobile/", "mcu_client/", "asg_client/"], "眼镜跨端调试时间线", "眼镜问题不是单端 bug；ASR 慢、BLE 卡、显示旧文本、云失败都需要同一个 session id 串起来。", "默认每次会话有设备 trace、手机日志、云耗时和显示事件。")
  },
  19: {
    foa: projectEntry("respeaker", ["README.md", "mic_array.py", "odas/"], "ReSpeaker mic_array 更贴近实物麦克阵列应用，可用来训练 DOA/VAD/KWS 与产测校准的连接。", ["示例如何暴露 DOA/VAD/KWS？", "量产时哪些指标不能靠单次听感判断？", "通道一致性和结构公差如何进入测试？"], ["mic_array.py", "odas/", "README"], "FOA 产测与校准 checklist", "产测不是把板子点亮，而是证明每个通道、方向、底噪、相位和序列号都可追溯。", "默认把校准数据库、通道测试和抽检录音作为 MVP 一等公民。"),
    glasses: projectEntry("ossg", ["mechanical/", "electronics_and_firmware/", "res/"], "OSSG 的 mechanical/electronics/res 能把 PVT 从软件功能拉回佩戴、热、显示、音频和结构。", ["机械结构如何影响麦克和显示？", "电子板与佩戴舒适如何互相制约？", "产测夹具需要覆盖哪些用户可见功能？"], ["mechanical/", "electronics_and_firmware/", "res/"], "眼镜 PVT bring-up checklist", "眼镜量产风险一半在软件外：重量、热、漏音、镜腿结构、充电和隐私提示都会决定可用性。", "默认 PVT 同时测显示、BLE、音频、热、佩戴和隐私提示。")
  },
  20: {
    foa: projectEntry("adf", ["README.md", "components/", "examples/"], "让 agent 读 ESP-ADF/XMOS 指定目录，输出 pipeline、DMA、buffer、测试计划，是 agent-era 嵌入式协作的真实练习。", ["agent 应该读哪些目录，不该猜哪些硬件事实？", "任务说明如何限制 ISR、heap、时序和校准？", "输出如何被人工评审？"], ["components/", "examples/", "lib_mic_array/"], "FOA agent 任务包", "agent 很会读代码和写样板，但不能替代 datasheet、示波器和声学验证。", "默认给 agent 文件范围、硬件假设、验收 dump、禁止项和人工评审清单。"),
    glasses: projectEntry("mentra", ["docs/", "cloud/", "mobile/", "mcu_client/"], "让 agent 读 MentraOS/SidekickOS 的跨端模块，产出 BLE schema、状态机和 mock，而不是让它凭空设计眼镜。", ["agent 输入应包含哪些 repo 路径？", "状态机/协议任务的验收标准是什么？", "怎样防止 agent 把眼镜写成手机 App？"], ["docs/", "cloud/", "mobile/", "firmware/"], "眼镜 agent 任务包", "agent 适合生成跨端契约和测试 mock，但必须被功耗、隐私、显示 payload、断连策略约束。", "默认任务包含状态、包格式、超时、隐私限制和移动端后台场景。")
  },
  21: {
    foa: projectEntry("xmos", ["README.rst", "examples/", "lib_mic_array/", "doc/"], "Capstone 用 XMOS/ESP-ADF 证据合成 FOA MVP：底层采集可信，产品框架可升级可诊断。", ["MVP 的最大未知量是什么？", "哪些证据来自开源模块，哪些还需要实验补齐？", "一周内最短验证路径是什么？"], ["lib_mic_array/", "ESP-ADF components/", "examples/"], "FOA 麦克阵列 MVP 评审包", "最终能力是把 repo 证据、预算、风险和实验串成可落地架构，而不是复述概念。", "默认 MVP 目标是可信多通道采集、校准和可诊断，不承诺完整空间增强。"),
    glasses: projectEntry("mentra", ["README.md", "mcu_client/", "mobile/", "cloud/", "OpenSourceSmartGlasses/electronics_and_firmware"], "Capstone 用 OSSG/MentraOS/SidekickOS 证据合成无摄像头显示型 AI 眼镜：硬件可穿戴，跨端 OS 可交互。", ["哪些能力必须眼镜端完成？", "哪些能力交给手机/云更合理？", "如何证明 8 小时、隐私和断连体验？"], ["mcu_client/", "mobile/", "cloud/", "electronics_and_firmware/"], "无摄像头显示型 AI 眼镜 MVP 评审包", "最终方案要同时站在硬件、固件、手机、云和用户信任上做取舍。", "默认 MVP 目标是稳定的 glanceable AI 反馈、可解释采集状态和可靠手机协同。")
  }
};

const validationFields = [
  ["moduleRead", "我读了哪个开源模块"],
  ["repoFacts", "我从模块中抽出的工程事实"],
  ["uncertainty", "我不确定的代码/配置"],
  ["architecture", "架构/数据流说明"],
  ["budget", "延迟/内存/功耗/吞吐预算"],
  ["risks", "前三个风险和验证实验"],
  ["agent", "可交给agent的任务描述"]
];

function planToTrack(plan, track, focus, project) {
  const [goal, path, budget, failure, evidence, decision, artifact] = plan;
  const trackName = track === "foa" ? "FOA麦克/阵列" : "AI眼镜";
  const sourceRefs = project.sourceRefs;
  const projectLesson = project.projectLesson;
  return {
    productGoal: goal,
    sourceRefs,
    repoWalkthrough: {
      title: `跟读 ${sourceRefs.repo}：${sourceRefs.engineeringArtifact}`,
      paths: sourceRefs.paths,
      codeAnchors: sourceRefs.codeAnchors,
      readQuestions: sourceRefs.readQuestions,
      pseudo: `// 不背语法，只追数据流和责任边界
open_repo("${sourceRefs.repo}");
read_paths(${JSON.stringify(sourceRefs.paths)});
find_anchors(${JSON.stringify(sourceRefs.codeAnchors)});
draw_flow("input -> buffer/state -> consumer -> evidence");
write_artifact("${sourceRefs.engineeringArtifact}");`
    },
    deepLesson: [
      ["Repo Evidence", projectLesson.repoEvidence],
      ["Concept Bridge", projectLesson.conceptBridge],
      ["Code Reading", projectLesson.codeReading],
      ["Engineering Decision", projectLesson.engineeringDecision],
      ["Product Path", path],
      ["Budget / Failure / Evidence", `预算：${budget}\n\n失败模式：${failure}\n\n观测证据：${evidence}`],
      ["Artifact Checklist", projectLesson.artifactChecklist]
    ],
    caseStudy: [
      ["项目模块", `${sourceRefs.repo} / ${sourceRefs.paths.join(" / ")}`],
      ["为什么读它", sourceRefs.whyThisModule],
      ["代码锚点", sourceRefs.codeAnchors.join("；")],
      ["工程产物", sourceRefs.engineeringArtifact],
      ["默认取舍", decision]
    ],
    validation: {
      challenge: `围绕 ${sourceRefs.repo} 的 ${sourceRefs.paths.join("、")} 写《${sourceRefs.engineeringArtifact}》。答案必须引用当天开源模块；如果只写概念定义，最高按 3/5 评。`,
      fields: validationFields,
      reference: `合格答案应直接服务《${sourceRefs.engineeringArtifact}》：说明读了 ${sourceRefs.repo} 的哪些路径，抽出至少一个代码/配置锚点，给出数量级预算，说明失败现象，列出可观测证据，并把下一步实验拆成 agent 可执行任务。`,
      rubric: [
        `明确引用当天开源模块：${sourceRefs.repo} / ${sourceRefs.paths.join("、")}；没有项目证据最高 3 分`,
        `产物明确对应${trackName}，不是把另一条主线换词复用`,
        "包含至少一个数量级预算，如ms、KB、mA、kbps、队列深度或产测时间",
        "能把失败模式映射到用户可见现象和工程证据",
        "agent任务有输入、输出、验收标准和禁止事项"
      ],
      pitfalls: [
        "只写概念定义，没有产品链路",
        "没有数量级估算",
        "风险只写泛泛而谈的“稳定性”",
        "把agent当成硬件事实来源"
      ]
    }
  };
}

function buildLesson(day) {
  const shared = sharedBlueprints[day.day];
  const plans = trackPlans[day.day];
  const projects = trackProjectLessons[day.day];
  return {
    shared: {
      focus: shared.focus,
      coreLesson: shared.core
    },
    prerequisites: shared.prereq,
    mentalModel: {
      title: `${shared.focus}的共通心智模型`,
      body: `先掌握共通嵌入式机制，再切到FOA或AI眼镜轨道看它如何变成产品决策。今天的共通路径是：${shared.flow.join(" -> ")}。`,
      flow: shared.flow
    },
    coreLesson: shared.core,
    codeWalkthrough: {
      title: shared.codeTitle,
      code: shared.code,
      explanation: [
        "先找输入从哪里来：外设、队列、文件、手机还是云端。",
        "再找数据暂存在哪里：ring buffer、queue、arena、Flash分区或显示buffer。",
        "最后找失败路径：超时、满队列、校验失败、低电量、断连或隐私边界。"
      ]
    },
    interactiveLab: { type: shared.lab },
    tracks: {
      foa: planToTrack(plans.foa, "foa", shared.focus, projects.foa),
      glasses: planToTrack(plans.glasses, "glasses", shared.focus, projects.glasses)
    }
  };
}

window.LESSON_DETAILS = Object.fromEntries(
  window.COURSE_DAYS.map((day) => [day.day, buildLesson(day)])
);
