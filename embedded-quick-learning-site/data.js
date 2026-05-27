window.COURSE_DAYS = [
  {
    "day": 1,
    "week": "第一周：嵌入式第一性原理",
    "title": "嵌入式产品全景",
    "theme": "从产品目标倒推硬件、固件、算法、连接和量产边界。",
    "concept": "嵌入式不是低级编程的同义词，而是把物理世界、实时约束、有限资源和长期维护绑在一起的系统工程。你要先看清能量、数据、控制和升级四条流。",
    "foa": "FOA/麦克硬件的核心流是声压/PDM到PCM，到阵列/FOA编码，再到USB/BLE/存储或上层算法。",
    "glasses": "显示型AI眼镜的核心流是语音输入、手机/云端推理、短文本显示、扬声器反馈和电池管理。",
    "exercise": "画两个MVP框图：FOA麦克和无摄像头显示型AI眼镜。每张图必须标出数据流、控制流、电源流、升级流。",
    "rubric": [
      "四条流都存在且方向清晰",
      "每个模块能解释为什么在设备端/手机端/云端",
      "能指出最大不确定性：功耗、实时性、空间、成本或供应链"
    ]
  },
  {
    "day": 2,
    "week": "第一周：嵌入式第一性原理",
    "title": "MCU、MPU、DSP、NPU边界",
    "theme": "用资源和约束，而不是品牌，理解芯片选择。",
    "concept": "MCU擅长确定性控制和低功耗，MPU擅长复杂系统和Linux生态，DSP擅长流式信号处理，NPU擅长固定算子图的吞吐/能效。顶层设计先问工作负载形态。",
    "foa": "FOA采集和轻量前处理适合MCU/DSP；复杂神经增强或多模型推理可能需要外部DSP/NPU或手机协同。",
    "glasses": "无摄像头眼镜可以用低功耗MCU负责显示、音频、BLE，手机负责大模型和复杂ASR。",
    "exercise": "为两个产品各做一张芯片角色表：主控、音频协处理、无线、充电/电源、传感器。写出不用更强芯片的理由。",
    "rubric": [
      "能把任务映射到算力、RAM、实时性和功耗",
      "能说清哪些工作应该外包给手机",
      "没有用单一芯片包打天下的偷懒设计"
    ]
  },
  {
    "day": 3,
    "week": "第一周：嵌入式第一性原理",
    "title": "实时性与延迟预算",
    "theme": "把实时性理解为预算表，而不是一句低延迟。",
    "concept": "实时系统关心最坏情况。音频帧长、中断抖动、任务优先级、DMA、buffer深度共同决定体验。",
    "foa": "多通道采集一旦underrun，空间信息会破坏；AEC/VAD/KWS还会引入帧级延迟。",
    "glasses": "语音指令到显示反馈要有可感知上限，扬声器提示不能阻塞麦克采集。",
    "exercise": "列一个100ms端到端延迟预算，把采集、前处理、传输、推理、UI反馈拆开。",
    "rubric": [
      "预算总和小于目标且每项有理由",
      "能指出抖动来源和缓冲策略",
      "能区分平均延迟和最坏延迟"
    ]
  },
  {
    "day": 4,
    "week": "第一周：嵌入式第一性原理",
    "title": "内存、缓存与数据搬运",
    "theme": "嵌入式瓶颈常常不是算力，而是内存和拷贝。",
    "concept": "RAM决定能同时保留多少音频帧、模型tensor、显示buffer和通信队列。零拷贝、DMA和固定内存池是可靠性的朋友。",
    "foa": "估算8通道、16kHz、16bit、100ms环形缓冲约25.6KB，不含中间频域buffer。",
    "glasses": "小屏幕若使用整帧buffer，分辨率和色深会直接吃掉RAM；局部刷新可以换功耗和内存。",
    "exercise": "做一个内存表：音频环形缓冲、算法scratch、模型arena、BLE包队列、显示buffer。",
    "rubric": [
      "每项都有数量级计算",
      "能识别峰值内存而非只看常驻内存",
      "能提出至少两个降内存手段"
    ]
  },
  {
    "day": 5,
    "week": "第一周：嵌入式第一性原理",
    "title": "总线与外设",
    "theme": "I/O是产品结构的骨架。",
    "concept": "PDM/I2S/USB/BLE/SPI/I2C/UART不是语法知识，而是吞吐、时钟、拓扑、调试和供应链约束的集合。",
    "foa": "PDM麦克数量、PDM clock、decimation和I2S/USB输出决定阵列可扩展性。",
    "glasses": "显示屏常走SPI/QSPI/MIPI类接口；BLE适合控制和短数据，不适合无压缩高质量音频流。",
    "exercise": "给两个产品分别列出外设清单，并为每条总线写出吞吐需求、时钟主从、失败现象。",
    "rubric": [
      "总线选择和数据率匹配",
      "知道哪些接口对时钟同步敏感",
      "能从失败现象反推可能的总线问题"
    ]
  },
  {
    "day": 6,
    "week": "第一周：嵌入式第一性原理",
    "title": "RTOS任务模型",
    "theme": "任务划分是嵌入式架构的第一张组织结构图。",
    "concept": "RTOS用任务、队列、定时器、事件和中断把并发变得可控。坏任务划分会让算法再好也跑不稳。",
    "foa": "典型任务：采集ISR/DMA、音频处理、命令控制、传输、日志和健康监测。",
    "glasses": "典型任务：麦克采集、唤醒/编码、BLE连接、显示刷新、按键/触控、电源状态机。",
    "exercise": "为AI眼镜写任务优先级表，解释每个队列的最大长度和丢弃策略。",
    "rubric": [
      "最高优先级留给硬实时路径",
      "低优先级任务不会阻塞音频",
      "队列满时的降级行为明确"
    ]
  },
  {
    "day": 7,
    "week": "第一周：嵌入式第一性原理",
    "title": "RTOS/SDK选型评审",
    "theme": "FreeRTOS、Zephyr、ESP-IDF不是谁更高级，而是谁更适合产品阶段。",
    "concept": "FreeRTOS轻，Zephyr抽象强且跨芯片，ESP-IDF适合Espressif快速产品化，Linux适合复杂应用和生态。",
    "foa": "快速音频原型可选ESP-ADF/ESP-IDF；跨平台产品线或BLE/传感器复杂组合可评估Zephyr。",
    "glasses": "无摄像头显示眼镜可用Zephyr或厂商SDK做低功耗设备，手机App承担复杂体验。",
    "exercise": "完成阶段评审：为两个产品分别在FreeRTOS、Zephyr、ESP-IDF、Linux中选型，写出反对意见和回应。",
    "rubric": [
      "选型包含阶段、团队、生态和量产因素",
      "能主动写出自己方案的缺点",
      "能把开源社区活跃度纳入风险判断"
    ],
    "milestone": true
  },
  {
    "day": 8,
    "week": "第二周：你的优势迁移",
    "title": "音频采集链路",
    "theme": "把你熟悉的音频算法放回硬件时钟和缓冲里。",
    "concept": "嵌入式音频链路要同时满足采样同步、通道对齐、增益一致、时钟稳定和可dump调试。",
    "foa": "FOA阵列尤其依赖通道一致性；通道延迟或增益偏差会污染空间编码。",
    "glasses": "眼镜上的麦克位置受结构限制，远比桌面设备更依赖校准和姿态假设。",
    "exercise": "设计一次bring-up音频dump流程：从原始PDM/PCM到算法输入，每一步保存什么、看什么指标。",
    "rubric": [
      "覆盖通道顺序、增益、相位、噪声底",
      "能定位硬件/驱动/算法边界",
      "能设计可复现实验音源"
    ]
  },
  {
    "day": 9,
    "week": "第二周：你的优势迁移",
    "title": "AEC、NS、AGC、VAD、KWS",
    "theme": "前端算法产品化靠系统约束，不靠单点指标。",
    "concept": "AEC需要远端参考和延迟对齐，NS需要感知质量权衡，AGC要避免泵音，VAD/KWS要在功耗和误触发之间取舍。",
    "foa": "麦克硬件如果带扬声器监听或回放，就必须定义AEC参考路径和延迟测量方法。",
    "glasses": "眼镜开放式扬声器到麦克路径短且变化大，AEC和双讲体验是核心风险。",
    "exercise": "写一份AEC失效排障树：从回声残留现象出发，列5个可能原因和验证方法。",
    "rubric": [
      "包含参考信号、时延、非线性、双讲、播放路径变化",
      "每个原因有可执行验证",
      "能说明何时用传统算法、何时加神经后滤波"
    ]
  },
  {
    "day": 10,
    "week": "第二周：你的优势迁移",
    "title": "FOA、阵列与空间音频",
    "theme": "空间音频的工程核心是几何、校准和格式。",
    "concept": "A-format是胶囊原始通道，B-format是场景表示。DOA、beamforming、Ambisonics编码都依赖阵列几何和传递函数。",
    "foa": "FOA MVP要定义胶囊布局、坐标系、通道顺序、校准文件和输出格式。",
    "glasses": "眼镜可把双麦/多麦用于方向提示、语音增强或情境感知，但不应承诺过高空间分辨率。",
    "exercise": "写一份FOA麦克最小规格：通道数、采样率、格式、校准、USB描述、测试音场。",
    "rubric": [
      "规格能被硬件/固件/算法共同理解",
      "包含通道坐标和校准策略",
      "能识别FOA和beamforming目标不同"
    ]
  },
  {
    "day": 11,
    "week": "第二周：你的优势迁移",
    "title": "TinyML与端侧AI",
    "theme": "端侧AI先看模型生命周期，再看框架名字。",
    "concept": "端侧AI约束来自量化、算子覆盖、内存arena、实时deadline、数据漂移和更新机制。",
    "foa": "可端侧运行KWS、VAD、轻量NS，重型分离/增强可在手机或PC端完成。",
    "glasses": "眼镜端适合唤醒、短命令、状态识别；ASR/LLM优先交给手机或云端。",
    "exercise": "把一个AI功能拆成端侧、手机侧、云侧三段，说明每段输入输出和失败降级。",
    "rubric": [
      "分层理由包含功耗、隐私、延迟和更新",
      "知道模型arena和算子支持是落地风险",
      "有离线不可用时的体验设计"
    ]
  },
  {
    "day": 12,
    "week": "第二周：你的优势迁移",
    "title": "显示型AI眼镜架构",
    "theme": "无摄像头眼镜的价值在低打扰显示和语音闭环。",
    "concept": "显示型眼镜不是小手机。它应该把信息压缩成短文本、状态、提示和确认，输入以语音/按键/触控为主。",
    "foa": "音频硬件可成为眼镜的外部录音/空间采集配件，提供高质量输入。",
    "glasses": "核心模块：低功耗MCU、BLE、麦克、开放式扬声器、小显示、触控/按键、电池和充电。",
    "exercise": "设计3个无摄像头AI眼镜场景：会议字幕、实时翻译、AI提示。每个场景写端到端链路。",
    "rubric": [
      "每个场景都有输入、处理、显示、反馈",
      "不依赖摄像头也能成立",
      "明确手机和眼镜的职责边界"
    ]
  },
  {
    "day": 13,
    "week": "第二周：你的优势迁移",
    "title": "连接与手机协同",
    "theme": "很多智能硬件其实是手机外设加专用体验。",
    "concept": "BLE适合低功耗控制和小数据，Wi-Fi适合高吞吐但耗电，USB适合稳定调试/音频设备类。手机App承担账号、网络、大模型和复杂UI。",
    "foa": "FOA麦克可用USB Audio做标准设备，也可用BLE只传控制状态。",
    "glasses": "眼镜用BLE传状态、短文本、控制和压缩音频片段；手机负责网络和AI会话。",
    "exercise": "估算一条BLE链路是否能承载16kHz单声道语音。写出压缩前后数据率和风险。",
    "rubric": [
      "计算包含采样率、位深、通道和协议开销",
      "能说明实时音频不只看平均吞吐",
      "能提出降采样、编码、VAD分段等策略"
    ]
  },
  {
    "day": 14,
    "week": "第二周：你的优势迁移",
    "title": "低功耗系统设计",
    "theme": "功耗预算是可穿戴产品的生死线。",
    "concept": "电池容量、平均电流、峰值电流、睡眠占比、显示占空比和无线重连共同决定续航。",
    "foa": "麦克硬件可以更重视性能和稳定供电，但移动录音仍需看PDM、DSP和传输功耗。",
    "glasses": "显示、扬声器、BLE、麦克常开和唤醒模型都要进入日用续航预算。",
    "exercise": "完成阶段评审：给AI眼镜做8小时续航预算，列出三档工作模式和降级策略。",
    "rubric": [
      "预算能从mAh和平均电流推导",
      "包含显示和音频的占空比",
      "降级策略不破坏核心体验"
    ],
    "milestone": true
  },
  {
    "day": 15,
    "week": "第三周：产品化与agent-era工作流",
    "title": "嵌入式Linux边界",
    "theme": "Linux解决复杂性，也带来启动、维护和安全成本。",
    "concept": "当产品需要复杂网络、多进程、文件系统、容器或丰富UI时，嵌入式Linux值得考虑；否则MCU+RTOS更直接。",
    "foa": "专业录音/空间音频网关可用Linux处理文件、网络和插件；纯采集设备不一定需要。",
    "glasses": "眼镜本体通常避免Linux以控制功耗和体积，手机/底座可承担Linux级复杂性。",
    "exercise": "写一张Linux vs RTOS决策表，分别填入两个产品的MVP和第二代版本。",
    "rubric": [
      "能区分MVP和产品线演进",
      "包含启动时间、功耗、安全更新和开发效率",
      "没有把Linux当万能升级"
    ]
  },
  {
    "day": 16,
    "week": "第三周：产品化与agent-era工作流",
    "title": "BSP、驱动与设备树",
    "theme": "板级软件是硬件和应用之间的契约。",
    "concept": "BSP把启动、pinmux、clock、power、外设和驱动绑定起来。设备树/Kconfig/CMake类配置让同一代码适配多硬件。",
    "foa": "换麦克阵列或codec时，最先动的是clock、pinmux、I2S/PDM配置和驱动描述。",
    "glasses": "换屏幕、触控或电源芯片会影响驱动、初始化时序和睡眠唤醒路径。",
    "exercise": "读一个开源项目目录结构，标出firmware、hardware、client、docs、tests分别承担什么。",
    "rubric": [
      "能从目录推断架构边界",
      "能识别BSP层和应用层",
      "能提出适合agent阅读的代码入口"
    ]
  },
  {
    "day": 17,
    "week": "第三周：产品化与agent-era工作流",
    "title": "OTA、安全与隐私",
    "theme": "能升级、能回滚、能保护数据，才像产品。",
    "concept": "安全启动、签名固件、分区表、回滚、证书、日志脱敏和权限边界共同决定长期可信。",
    "foa": "音频设备要考虑固件签名、USB权限、录音数据隐私和校准文件保护。",
    "glasses": "眼镜涉及麦克常开、字幕内容、AI会话和手机同步，隐私策略必须体现在系统架构里。",
    "exercise": "设计一个OTA失败回滚流程，并列出3个用户不可见但工程必须记录的状态。",
    "rubric": [
      "包含下载、校验、切换、健康确认、回滚",
      "知道断电和版本兼容风险",
      "隐私数据不会被无意日志化"
    ]
  },
  {
    "day": 18,
    "week": "第三周：产品化与agent-era工作流",
    "title": "调试与可观测性",
    "theme": "嵌入式调试靠证据链，不靠猜。",
    "concept": "串口、JTAG、trace、crash dump、音频dump、功耗曲线、无线抓包各自回答不同问题。",
    "foa": "音频问题要能同时看PCM、时间戳、队列水位、CPU负载和算法状态。",
    "glasses": "眼镜问题常跨设备：眼镜固件、手机App、BLE、云服务和用户场景都要留观测点。",
    "exercise": "给“用户说眼镜翻译偶尔卡顿”写一套定位计划，按最快排除顺序排列。",
    "rubric": [
      "覆盖设备端、手机端、网络端",
      "先收集时间戳和队列/连接状态",
      "能避免只优化模型而忽略链路"
    ]
  },
  {
    "day": 19,
    "week": "第三周：产品化与agent-era工作流",
    "title": "硬件协作与量产",
    "theme": "会和硬件团队说话，是嵌入式顶层能力的一半。",
    "concept": "原理图评审、bring-up、DFM、测试夹具、校准、认证、EOL替代料都影响软件架构。",
    "foa": "麦克一致性、声学结构、公差、胶水/开孔/网布都会影响算法指标。",
    "glasses": "眼镜还要面对佩戴舒适、热、重量、扬声器漏音、结构遮挡和用户隐私提示。",
    "exercise": "写一份EVT bring-up checklist：上电、时钟、外设、音频、显示、无线、功耗、OTA。",
    "rubric": [
      "按风险和依赖排序",
      "每项有pass/fail证据",
      "包含校准和产测思路"
    ]
  },
  {
    "day": 20,
    "week": "第三周：产品化与agent-era工作流",
    "title": "Agent-era嵌入式开发",
    "theme": "Agent适合加速阅读、生成和验证，但系统边界必须由你掌握。",
    "concept": "好的agent任务需要上下文、文件范围、硬件假设、验收标准和禁止事项。嵌入式尤其要防止agent改坏时序、资源和安全边界。",
    "foa": "让agent读ESP-ADF或XMOS示例时，要限定目标：链路图、buffer、任务、配置，不要让它盲改驱动。",
    "glasses": "让agent写BLE协议或显示状态机时，要给出包格式、状态转移、超时和回滚要求。",
    "exercise": "把“做一个语音眼镜demo”改写成5个agent任务，每个包含输入、输出、验收和风险。",
    "rubric": [
      "任务可并行且边界清晰",
      "有测试或人工验收方法",
      "明确哪些硬件事实不能臆造"
    ]
  },
  {
    "day": 21,
    "week": "第三周：产品化与agent-era工作流",
    "title": "Capstone：双MVP方案评审",
    "theme": "把21天内容收束成能和硬件公司讨论的方案。",
    "concept": "最终能力不是背概念，而是能给出架构、预算、风险、验证计划和下一步实现路径。",
    "foa": "方案A：FOA/麦克阵列硬件MVP，包含硬件框图、音频链路、算法部署、校准、实时性预算和量产风险。",
    "glasses": "方案B：无摄像头显示型AI眼镜MVP，包含显示交互、语音链路、扬声器、手机协同、功耗预算、OTA和隐私。",
    "exercise": "完成两个一页纸MVP评审稿，并用评分表自评。每个方案必须有3个最大风险和一个下一周实验计划。",
    "rubric": [
      "系统完整性：模块、数据、控制、电源、升级齐全",
      "约束意识：算力、RAM、功耗、延迟、成本有估算",
      "可落地性：有MVP边界、实验计划和agent任务拆分"
    ],
    "milestone": true
  }
];
window.COURSE_SOURCES = [
  {
    "name": "Zephyr RTOS",
    "url": "https://github.com/zephyrproject-rtos/zephyr",
    "note": "Scalable RTOS, multi-architecture, security-focused, strong board and driver model."
  },
  {
    "name": "FreeRTOS",
    "url": "https://www.freertos.org/",
    "note": "Small-footprint RTOS for MCUs, task/queue/timer primitives, broad silicon support."
  },
  {
    "name": "ESP-IDF",
    "url": "https://github.com/espressif/esp-idf",
    "note": "Production SDK for Espressif SoCs with networking, RTOS, peripheral drivers and examples."
  },
  {
    "name": "ESP-ADF",
    "url": "https://github.com/espressif/esp-adf",
    "note": "Audio application framework for Espressif SoCs, useful for media pipelines and voice products."
  },
  {
    "name": "TensorFlow Lite Micro",
    "url": "https://github.com/tensorflow/tflite-micro",
    "note": "ML inference stack for DSPs, MCUs and memory-constrained devices."
  },
  {
    "name": "MLPerf Tiny",
    "url": "https://github.com/mlcommons/tiny",
    "note": "Benchmark suite for ultra-low-power ML systems, useful for hardware/software tradeoffs."
  },
  {
    "name": "Yocto Project",
    "url": "https://www.yoctoproject.org/",
    "note": "Build system for custom embedded Linux distributions, BSPs and reproducible images."
  },
  {
    "name": "ReSpeaker mic_array",
    "url": "https://github.com/respeaker/mic_array",
    "note": "Practical mic-array examples for DOA, VAD and KWS."
  },
  {
    "name": "XMOS lib_mic_array",
    "url": "https://github.com/xmos/lib_mic_array",
    "note": "PDM microphone array library with decimation, framing and multichannel capture primitives."
  },
  {
    "name": "MentraOS",
    "url": "https://github.com/Mentra-Community/MentraOS",
    "note": "Open smart-glasses OS/SDK showing app lifecycle, phone/cloud coordination and glasses I/O."
  },
  {
    "name": "OpenSourceSmartGlasses",
    "url": "https://github.com/Mentra-Community/OpenSourceSmartGlasses",
    "note": "Open hardware/software smart-glasses project emphasizing all-day wearability and extensibility."
  },
  {
    "name": "SidekickOS",
    "url": "https://github.com/siersidekick/SidekickOS",
    "note": "Open smart-glasses clip implementation with BLE, audio streaming and modular firmware/client split."
  },
  {
    "name": "HyBeam",
    "url": "https://arxiv.org/abs/2510.22637",
    "note": "Wearable speech enhancement paper: hybrid raw-mic and beamformer signals for array-agnostic robustness."
  },
  {
    "name": "DynamicSound",
    "url": "https://arxiv.org/abs/2601.15433",
    "note": "Open acoustic simulator for moving sources and arbitrary microphone arrays."
  },
  {
    "name": "Neural Ambisonics Encoding",
    "url": "https://arxiv.org/abs/2601.23196",
    "note": "Cross-attention approach for array-independent Ambisonics encoding using transfer functions."
  }
];

