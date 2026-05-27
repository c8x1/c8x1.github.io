window.SOURCE_LESSONS = {
  "1": {
    "title": "系统边界：从仓库 README 识别输入、输出和产品责任",
    "theme": "不要从语法开始。先读开源项目怎样定义自己：它处理什么，不处理什么，交给谁继续做。",
    "tracks": {
      "foa": {
        "product": "FOA 麦克 / 麦克阵列",
        "repo": "XMOS lib_mic_array",
        "repoUrl": "https://github.com/xmos/lib_mic_array",
        "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
        "filePath": "README.rst",
        "licenseNote": "XMOS Public Licence；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "README.rst",
          "examples/",
          "lib_mic_array/"
        ],
        "why": "读 XMOS README 的 Summary 和 Features。目标是判断 lib_mic_array 只覆盖 PDM 麦克阵列到 PCM/frame 的底座，不覆盖完整产品。",
        "avoid": "今天不钻 decimation 代码、不装工具链；只从源码摘录里识别输入、输出、配置项和产品缺口。",
        "excerpt": "今天把 README.rst 当作系统边界文件读：PDM microphone array library / 1 to 16 PDM microphones / configurable frame size。",
        "segments": [
          [
            "源码身份",
            "PDM microphone array library",
            "项目先把自己定义成 mic array library，而不是录音机、USB 设备或 AI 产品。",
            "你的 FOA MVP 需要补齐 USB/存储/校准/dump/状态管理。"
          ],
          [
            "能力变量",
            "1 to 16 PDM microphones",
            "通道数是架构变量，会影响 RAM、线束、校准、产测和波束/FOA 算法复杂度。",
            "Day 1 先做 4/8/16 mic 三档，不要默认一步到 16 mic。"
          ],
          [
            "交付边界",
            "Framing with configurable frame size",
            "frame 是库交给上层的契约点。",
            "架构图必须画 frame 交付点，而不是只画一个笼统的算法模块。"
          ]
        ],
        "concepts": [
          "PDM 输入",
          "PCM/frame 输出",
          "库能力 vs 产品能力",
          "配置变量",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "从源码摘录标出输入、处理、输出",
          "列出 README 暗示的三个架构变量",
          "画 PDM -> decimation -> frame -> 上层消费者",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "FOA 开源模块边界图",
        "inference": "合格的边界图会说明：XMOS 解决实时采集底座，你的产品还要解决连接、校准、dump、升级和用户可见状态。",
        "validation": {
          "challenge": "写一页《FOA 开源模块边界图》，必须引用 README.rst 的 Summary/Features 片段和至少一个目录路径。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：把 lib_mic_array 定义为 PDM -> PCM/frame 底座；把 USB/存储/校准/产测/升级明确列为产品层补充。"
        },
        "sourceBlocks": [
          {
            "title": "XMOS README.rst / Summary",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": ":description: PDM microphone array library\n:devices: xcore.ai\n\nSummary\nThe XMOS microphone array library is designed to allow\ninterfacing to PDM microphones coupled with efficient\ndecimation to user configurable output sample rates.",
            "notes": [
              [
                "这段源码在说什么",
                "它把项目边界压得很窄：输入是 PDM 麦克风，核心动作是 decimation，输出是上层能消费的采样率。"
              ],
              [
                "你该怎么读",
                "不要先钻滤波器实现，先问：这个库接管了哪段实时链路，哪段还留给你的产品补齐。"
              ]
            ],
            "tasks": [
              "圈出输入、处理、输出三个词",
              "把这三件事画成 PDM -> decimation -> PCM/frame"
            ]
          },
          {
            "title": "XMOS README.rst / Feature constraints",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "Features\n* 48, 32, 16 kHz output sample rates by default\n* 1 to 16 PDM microphones\n* Supports up to 8 microphones using only a single thread\n* Configurable MCLK to PDM clock divider\n* Supports both SDR and DDR microphone configurations\n* Framing with configurable frame size",
            "notes": [
              [
                "这不是功能清单而已",
                "这里每一行都是架构变量：采样率、麦克数、线程、时钟、SDR/DDR、frame size 都会进入预算。"
              ],
              [
                "工程判断",
                "FOA MVP 的第一版规格应该从这些变量收敛，而不是从“我要最强阵列”发散。"
              ]
            ],
            "tasks": [
              "选 4ch/8ch/16ch 三档写出风险",
              "把 frame size 和延迟写成同一个取舍"
            ]
          }
        ],
        "overview": {
          "question": "这个开源库到底负责 FOA 产品里的哪一段？",
          "outcome": "交付一张 PDM 麦克阵列模块边界图，明确 XMOS 库负责采集底座，哪些产品能力还没覆盖。",
          "map": [
            "总：README 用一句话定义库身份",
            "分：Features 暴露通道数、采样率、frame size",
            "验收：把库边界和产品缺口画清楚"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 FOA 麦克 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "把音频算法经验迁移到硬件",
            "body": "你已经熟悉 AEC/NS/AGC/KWS，但嵌入式第一关不是算法效果，而是样本是否稳定、等时、可追踪地到达算法入口。",
            "checks": [
              "先保证 PCM/frame 连续",
              "再讨论算法质量",
              "最后讨论量产校准"
            ]
          },
          {
            "label": "读法",
            "title": "把源码分成数据面和控制面",
            "body": "数据面负责连续音频流，控制面负责配置、状态、升级和错误恢复。读开源项目时先标出两条面，很多嵌入式混乱都来自把它们混在一起。",
            "checks": [
              "数据面不能被日志/网络阻塞",
              "控制面要有超时和状态码"
            ]
          },
          {
            "label": "预算",
            "title": "任何模块都要落到数量级",
            "body": "每天至少做一个粗预算：字节数、毫秒数、吞吐、任务周期或工具链成本。预算不需要精确到最终量产，但必须能暴露方向性风险。",
            "checks": [
              "写明假设",
              "写明最坏情况",
              "写明下一步怎么测"
            ]
          },
          {
            "label": "失败模式",
            "title": "源码里的小字通常比功能列表更重要",
            "body": "Known issue、partition、required tools、目录边界都是风险入口。工程评审要把这些风险翻译成测试项，而不是当作备注跳过。",
            "checks": [
              "列一个会让 demo 失败的问题",
              "列一个会让量产失败的问题"
            ]
          }
        ]
      },
      "glasses": {
        "product": "AI 眼镜",
        "repo": "OpenSourceSmartGlasses",
        "repoUrl": "https://github.com/Mentra-Community/OpenSourceSmartGlasses",
        "sourceUrl": "https://github.com/Mentra-Community/OpenSourceSmartGlasses/blob/main/README.md",
        "filePath": "README.md + electronics_and_firmware/",
        "licenseNote": "MIT License；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "README.md",
          "electronics_and_firmware/",
          "mechanical/"
        ],
        "why": "读 OpenSourceSmartGlasses README，识别 display、microphones、wireless phone connection、battery、LED indicator 如何共同定义产品边界。",
        "avoid": "今天不看 PCB/CAD 细节；只读 README 和目录结构，建立设备端、手机端、云端、机械/电气边界。",
        "excerpt": "今天把 README.md 当作产品约束文件读：display / microphones / wireless phone connection / all day wearable。",
        "segments": [
          [
            "产品承诺",
            "All day wearable",
            "这不是营销词，而是功耗、热、重量、佩戴舒适度约束。",
            "眼镜端不能常亮、常算、常高吞吐。"
          ],
          [
            "闭环体验",
            "Immediately useful",
            "第一版必须有用户可感知闭环，例如语音输入到短文本显示。",
            "MVP 不应只是硬件炫技。"
          ],
          [
            "仓库边界",
            "mechanical, electrical, and software files",
            "目录结构说明眼镜是跨学科产品。",
            "固件判断必须带上机械、电源、显示和手机协同。"
          ]
        ],
        "concepts": [
          "可穿戴约束",
          "设备-手机-云分工",
          "硬件/机械/固件共同设计",
          "MVP 闭环",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "把 README 的产品词映射到模块",
          "说明 all-day 如何限制软件策略",
          "画设备/手机/云职责边界",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "AI 眼镜开源产品边界图",
        "inference": "合格的边界图会把眼镜端定义为低功耗 I/O 和状态提示，把手机/云定义为 AI、网络、账号和长任务承载。",
        "validation": {
          "challenge": "写一页《AI 眼镜开源产品边界图》，必须引用 README.md 和 electronics_and_firmware/ 或 mechanical/。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：all-day wearable 转译成功耗/重量/热；wireless phone connection 转译成跨端架构；display/microphones 转译成实时 I/O。"
        },
        "sourceBlocks": [
          {
            "title": "OpenSourceSmartGlasses README.md / Product promise",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/Mentra-Community/OpenSourceSmartGlasses/blob/main/README.md",
            "code": "# Open Source Smart Glasses\nSmart glasses with display, microphones, wireless phone\nconnection, prescription lenses, hours of battery life,\nand LED indicator.\n\nDesigned to be:\n1. All day wearable\n2. Immediately useful\n3. Extendable",
            "notes": [
              [
                "产品边界",
                "显示、麦克、无线连接、镜片、电池、LED 都在一句话里出现，说明眼镜是硬件约束密集的系统。"
              ],
              [
                "第一性原理",
                "all day wearable 会反向约束显示刷新、BLE 连接、麦克开启策略和热设计。"
              ]
            ],
            "tasks": [
              "把每个产品词映射到硬件/固件模块",
              "写出 all-day 对功耗和热的限制"
            ]
          },
          {
            "title": "OpenSourceSmartGlasses README.md / Repo boundary",
            "filePath": "README.md + electronics_and_firmware/",
            "sourceUrl": "https://github.com/Mentra-Community/OpenSourceSmartGlasses",
            "code": "This repo holds mechanical, electrical, and software files.\n\nRepository map:\n  electronics_and_firmware/\n  mechanical/\n  README.md",
            "notes": [
              [
                "为什么读目录",
                "这个仓不是单一固件仓，目录告诉你机械、电气、固件都在定义产品边界。"
              ],
              [
                "工程判断",
                "眼镜的架构图必须画设备端、手机端、云端，还要画工厂/校准/装配证据。"
              ]
            ],
            "tasks": [
              "说明 electronics_and_firmware 和 mechanical 为什么要一起看",
              "列出不属于 MCU 固件但影响固件的约束"
            ]
          }
        ],
        "overview": {
          "question": "AI 眼镜不是一个 App，它的系统边界从哪里开始？",
          "outcome": "交付一张设备/手机/云/机械电气边界图，说明 all-day wearable 如何限制软件策略。",
          "map": [
            "总：README 给出产品承诺",
            "分：显示、麦克、无线连接、电池、LED 分别落到模块",
            "验收：把可穿戴约束转成工程决策"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 AI 眼镜 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "AI 眼镜首先是可穿戴系统",
            "body": "眼镜的核心约束不是模型多强，而是重量、热、功耗、显示可读性、麦克可用性和手机协同是否成立。",
            "checks": [
              "先看佩戴约束",
              "再看交互闭环",
              "最后看 AI 放置位置"
            ]
          },
          {
            "label": "读法",
            "title": "每个源码片段都要问跨端责任",
            "body": "看到 BLE、client、mobile、cloud、display、mic 时，不要只问它怎么写代码，要问它属于设备端、手机端还是云端。",
            "checks": [
              "设备端做确定性 I/O",
              "手机端做权限和体验",
              "云端做长任务和多用户"
            ]
          },
          {
            "label": "预算",
            "title": "眼镜预算要同时算时间和能量",
            "body": "AUDIO_INTERVAL、BLE、显示刷新、SPIFFS、partition 这些看似分散的配置都会进入功耗、延迟和可恢复性预算。",
            "checks": [
              "写一次 8 小时假设",
              "写一个 BLE 堵塞场景",
              "写一个 OTA 空间风险"
            ]
          },
          {
            "label": "失败模式",
            "title": "用户看到的是状态，不是线程",
            "body": "眼镜固件的 bug 往往表现为旧文字、没提示、卡顿、发热、断连，而不是一个漂亮的异常栈。验收时要把内部故障翻译成用户症状。",
            "checks": [
              "列用户可见症状",
              "列设备日志证据",
              "列手机/云证据"
            ]
          }
        ]
      }
    }
  },
  "2": {
    "title": "芯片角色：把 MCU/DSP/客户端分工写成证据链",
    "theme": "从 README 和目录结构里识别芯片能力、工具链、手机/客户端边界，而不是凭宣传页选型。",
    "tracks": {
      "foa": {
        "product": "FOA 麦克 / 麦克阵列",
        "repo": "XMOS lib_mic_array",
        "repoUrl": "https://github.com/xmos/lib_mic_array",
        "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
        "filePath": "README.rst + lib_mic_array/",
        "licenseNote": "XMOS Public Licence；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "README.rst",
          "lib_mic_array/",
          "doc/"
        ],
        "why": "读 XMOS README 的 XS3 vector unit 和 Required tools，判断为什么底层音频流处理不是任意 MCU 都能替代。",
        "avoid": "不学 XMOS 汇编和工具安装；只把 device/tool 约束写进选型评审。",
        "excerpt": "今天抓住两条源码证据：only available for XS3 devices / Required tools。",
        "segments": [
          [
            "芯片约束",
            "XS3 vector unit",
            "多通道 decimation/framing 是硬实时流式负载，依赖特定计算单元。",
            "FOA 选型要问 PDM、并行处理、USB/输出链路。"
          ],
          [
            "工具链",
            "XMOS XTC Tools",
            "工具链也是产品成本：CI、调试、量产复现都受它影响。",
            "选型表必须写工具链风险。"
          ],
          [
            "职责分工",
            "PDM microphones -> output sample rates",
            "采集芯片负责确定性数据面。",
            "重 AI 可后置到手机/主机/更强 SoC。"
          ]
        ],
        "concepts": [
          "MCU/DSP 分工",
          "向量单元",
          "工具链风险",
          "实时流式负载",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "找出 README 限定硬件平台的语句",
          "解释 decimation/framing 为什么不是普通业务逻辑",
          "写 FOA 设备端与主机端芯片角色",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "FOA 芯片角色表",
        "inference": "底层采集要先保证确定性，复杂 AI 可以后置；这比“单芯片包打天下”更像可量产方案。",
        "validation": {
          "challenge": "完成《FOA 芯片角色表》，必须引用 XS3 vector unit 和 Required tools。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：XMOS 做采集/decimation/frame，主机或手机做重 AI、UI、存储和网络。"
        },
        "sourceBlocks": [
          {
            "title": "XMOS README.rst / Device and tools",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "This library is only available for XS3 devices due to\nrequiring the XS3 vector unit.\n\nRequired tools\n* XMOS XTC Tools: 15.3.1",
            "notes": [
              [
                "芯片角色",
                "README 直接告诉你：这不是一个随便搬到任意 MCU 的 C 库，它依赖 XS3 的向量单元。"
              ],
              [
                "选型落点",
                "嵌入式选型要把工具链也算进去：能否 CI 构建、能否量产复现、团队是否能调试。"
              ]
            ],
            "tasks": [
              "把 XS3 vector unit 写进选型表",
              "写出工具链风险而不是只写芯片价格"
            ]
          },
          {
            "title": "XMOS README.rst / Feature constraints",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "Features\n* 48, 32, 16 kHz output sample rates by default\n* 1 to 16 PDM microphones\n* Supports up to 8 microphones using only a single thread\n* Configurable MCLK to PDM clock divider\n* Supports both SDR and DDR microphone configurations\n* Framing with configurable frame size",
            "notes": [
              [
                "这不是功能清单而已",
                "这里每一行都是架构变量：采样率、麦克数、线程、时钟、SDR/DDR、frame size 都会进入预算。"
              ],
              [
                "工程判断",
                "FOA MVP 的第一版规格应该从这些变量收敛，而不是从“我要最强阵列”发散。"
              ]
            ],
            "tasks": [
              "选 4ch/8ch/16ch 三档写出风险",
              "把 frame size 和延迟写成同一个取舍"
            ]
          }
        ],
        "overview": {
          "question": "为什么多通道音频底座不能随便换成普通 MCU？",
          "outcome": "交付芯片角色表，区分采集/decimation/frame、重 AI、主机 UI、工具链风险。",
          "map": [
            "总：先看 XS3/vector unit 约束",
            "分：再看工具链和可迁移性",
            "验收：写出反对意见和 fallback"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 FOA 麦克 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "把音频算法经验迁移到硬件",
            "body": "你已经熟悉 AEC/NS/AGC/KWS，但嵌入式第一关不是算法效果，而是样本是否稳定、等时、可追踪地到达算法入口。",
            "checks": [
              "先保证 PCM/frame 连续",
              "再讨论算法质量",
              "最后讨论量产校准"
            ]
          },
          {
            "label": "读法",
            "title": "把源码分成数据面和控制面",
            "body": "数据面负责连续音频流，控制面负责配置、状态、升级和错误恢复。读开源项目时先标出两条面，很多嵌入式混乱都来自把它们混在一起。",
            "checks": [
              "数据面不能被日志/网络阻塞",
              "控制面要有超时和状态码"
            ]
          },
          {
            "label": "预算",
            "title": "任何模块都要落到数量级",
            "body": "每天至少做一个粗预算：字节数、毫秒数、吞吐、任务周期或工具链成本。预算不需要精确到最终量产，但必须能暴露方向性风险。",
            "checks": [
              "写明假设",
              "写明最坏情况",
              "写明下一步怎么测"
            ]
          },
          {
            "label": "失败模式",
            "title": "源码里的小字通常比功能列表更重要",
            "body": "Known issue、partition、required tools、目录边界都是风险入口。工程评审要把这些风险翻译成测试项，而不是当作备注跳过。",
            "checks": [
              "列一个会让 demo 失败的问题",
              "列一个会让量产失败的问题"
            ]
          }
        ]
      },
      "glasses": {
        "product": "AI 眼镜",
        "repo": "SidekickOS",
        "repoUrl": "https://github.com/siersidekick/SidekickOS",
        "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/README.md",
        "filePath": "README.md + firmware/",
        "licenseNote": "MIT License；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "README.md",
          "firmware/",
          "sidekickos-client/"
        ],
        "why": "读 SidekickOS README 的 ESP32S3、BLE 5.0、client 分层，识别眼镜端 MCU 与手机/浏览器客户端的职责。",
        "avoid": "今天不追 camera 算法；只看硬件角色、连接角色和 client 分层。",
        "excerpt": "今天抓住三条源码证据：Hardware - ESP32S3 / Connectivity - BLE 5.0 / Separate firmware and client components。",
        "segments": [
          [
            "MCU 角色",
            "ESP32S3",
            "眼镜端 MCU 聚合 camera/mic/BLE 等外设，并维护低功耗状态。",
            "不要把完整 AI 体验塞进 MCU。"
          ],
          [
            "连接边界",
            "BLE 5.0",
            "BLE 是低功耗连接，不是透明高速总线。",
            "音频/图像要有压缩、节流、降级。"
          ],
          [
            "客户端",
            "Separate firmware and client components",
            "复杂 UI、网络、AI 会转移到客户端。",
            "架构图必须画 client，不要只画眼镜固件。"
          ]
        ],
        "concepts": [
          "MCU vs client",
          "BLE 外设模型",
          "跨端分工",
          "低功耗边界",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "列出 ESP32S3 应该承担的确定性职责",
          "解释 firmware/client 分离的产品含义",
          "写三个不应放进眼镜 MCU 的任务",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "眼镜端/客户端芯片角色表",
        "inference": "AI 眼镜的聪明来自跨端系统，不来自眼镜端单芯片硬扛所有计算。",
        "validation": {
          "challenge": "完成《眼镜端/客户端芯片角色表》，必须引用 README.md 中 ESP32S3、BLE、client 证据。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：眼镜端做低功耗 I/O 和状态机，客户端做 UI、网络、AI 和长任务。"
        },
        "sourceBlocks": [
          {
            "title": "SidekickOS README.md / Hardware and connectivity",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/README.md",
            "code": "# SidekickOS - Open Source Smart Glasses\n\n- Hardware - ESP32S3\n- Connectivity - BLE 5.0\n\nRequired hardware:\n- XIAO ESP32S3 Sense (with camera and microphone)",
            "notes": [
              [
                "芯片角色",
                "ESP32S3 在这里更像外设聚合和无线连接芯片，不是承载全部 AI 体验的主机。"
              ],
              [
                "跨端边界",
                "BLE 5.0 提醒你：手机/客户端一定是系统的一部分。"
              ]
            ],
            "tasks": [
              "写出 ESP32S3 负责的确定性 I/O",
              "列出应该留给手机/客户端的任务"
            ]
          },
          {
            "title": "SidekickOS README.md / Feature split",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/README.md",
            "code": "SidekickOS provides:\n- High-Resolution Camera Capture\n- Audio Streaming - G.711 μ-law encoded audio over BLE\n- Multi-Platform Clients - Python API and Web browser interface\n- Modular Design - Separate firmware and client components",
            "notes": [
              [
                "模块分层",
                "firmware 和 client 被显式分开，说明复杂 UI、网络和 AI 可以放在设备外。"
              ],
              [
                "失败模式",
                "audio over BLE 是连续流，一旦和图像/状态共用链路，就要设计降级和丢弃策略。"
              ]
            ],
            "tasks": [
              "指出哪些是 producer，哪些是 consumer",
              "写出 BLE 堵塞时的降级顺序"
            ]
          }
        ],
        "overview": {
          "question": "眼镜端 ESP32S3、BLE、客户端分别应该承担什么？",
          "outcome": "交付眼镜端/客户端角色表，说明哪些任务必须在设备端，哪些应该外置。",
          "map": [
            "总：先看 ESP32S3 和 BLE 角色",
            "分：再看 firmware/client 分离",
            "验收：列出 MCU 不该硬扛的任务"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 AI 眼镜 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "AI 眼镜首先是可穿戴系统",
            "body": "眼镜的核心约束不是模型多强，而是重量、热、功耗、显示可读性、麦克可用性和手机协同是否成立。",
            "checks": [
              "先看佩戴约束",
              "再看交互闭环",
              "最后看 AI 放置位置"
            ]
          },
          {
            "label": "读法",
            "title": "每个源码片段都要问跨端责任",
            "body": "看到 BLE、client、mobile、cloud、display、mic 时，不要只问它怎么写代码，要问它属于设备端、手机端还是云端。",
            "checks": [
              "设备端做确定性 I/O",
              "手机端做权限和体验",
              "云端做长任务和多用户"
            ]
          },
          {
            "label": "预算",
            "title": "眼镜预算要同时算时间和能量",
            "body": "AUDIO_INTERVAL、BLE、显示刷新、SPIFFS、partition 这些看似分散的配置都会进入功耗、延迟和可恢复性预算。",
            "checks": [
              "写一次 8 小时假设",
              "写一个 BLE 堵塞场景",
              "写一个 OTA 空间风险"
            ]
          },
          {
            "label": "失败模式",
            "title": "用户看到的是状态，不是线程",
            "body": "眼镜固件的 bug 往往表现为旧文字、没提示、卡顿、发热、断连，而不是一个漂亮的异常栈。验收时要把内部故障翻译成用户症状。",
            "checks": [
              "列用户可见症状",
              "列设备日志证据",
              "列手机/云证据"
            ]
          }
        ]
      }
    }
  },
  "3": {
    "title": "DMA/ISR/ring buffer：在真实流式代码里找 producer/consumer",
    "theme": "今天重点不是背 DMA 定义，而是看源码中的连续输入、状态位、buffer 和等时消费。",
    "tracks": {
      "foa": {
        "product": "FOA 麦克 / 麦克阵列",
        "repo": "XMOS lib_mic_array",
        "repoUrl": "https://github.com/xmos/lib_mic_array",
        "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
        "filePath": "README.rst Known issues + lib_mic_array/",
        "licenseNote": "XMOS Public Licence；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "README.rst",
          "lib_mic_array/",
          "examples/"
        ],
        "why": "读 XMOS Known issue，围绕 ma_frame_rx 必须等时调用来理解 DMA/ISR/ring buffer 的真实风险。",
        "avoid": "不钻 ISR 实现；只看 producer、consumer、deadline、lock-up/overrun 证据。",
        "excerpt": "今天的关键源码句：PDM receive can lock-up in ISR mode when ma_frame_rx is not called isochronously。",
        "segments": [
          [
            "producer",
            "PDM receive",
            "硬件侧持续产生数据，不会等应用层慢慢处理。",
            "这就是 DMA/ISR 课程的真实语境。"
          ],
          [
            "consumer",
            "ma_frame_rx",
            "frame_rx 是消费边界，必须按节奏被调用。",
            "音频任务要高优先级且可测周期。"
          ],
          [
            "deadline",
            "isochronously",
            "平均速度够不够不重要，最坏阻塞会破坏连续流。",
            "验收看 P99 耗时、水位和 underrun/overrun。"
          ]
        ],
        "concepts": [
          "DMA producer",
          "ISR 通知",
          "ring buffer 水位",
          "deadline",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "把 PDM receive 和 ma_frame_rx 画成 producer/consumer",
          "写 buffer 深度增加的收益和代价",
          "列出 lock-up 排查证据",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "FOA DMA/ring buffer 实时预算",
        "inference": "实时系统不是跑得快，而是在最坏情况下仍按时消费。",
        "validation": {
          "challenge": "完成《FOA DMA/ring buffer 实时预算》，必须引用 Known issue 或 ma_frame_rx 锚点。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：PDM receive 是 producer，frame_rx/audio task 是 consumer；buffer 增大只能缓冲抖动但会增加延迟。"
        },
        "sourceBlocks": [
          {
            "title": "XMOS README.rst / Known issue",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "Known issues\n* PDM receive can lock-up in ISR mode when ma_frame_rx\n  is not called isochronously after first transfer.",
            "notes": [
              [
                "DMA/ISR 的真实入口",
                "这句话比定义更有用：输入端持续产生数据，消费端如果不等时调用，系统会锁住。"
              ],
              [
                "排障落点",
                "遇到音频断流时，不要只看平均 CPU，要看 frame_rx 周期、最长阻塞、overrun/lock-up 证据。"
              ]
            ],
            "tasks": [
              "标出 producer 和 consumer",
              "写出 isochronously 对任务调度的要求"
            ]
          },
          {
            "title": "XMOS README.rst / Feature constraints",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "Features\n* 48, 32, 16 kHz output sample rates by default\n* 1 to 16 PDM microphones\n* Supports up to 8 microphones using only a single thread\n* Configurable MCLK to PDM clock divider\n* Supports both SDR and DDR microphone configurations\n* Framing with configurable frame size",
            "notes": [
              [
                "这不是功能清单而已",
                "这里每一行都是架构变量：采样率、麦克数、线程、时钟、SDR/DDR、frame size 都会进入预算。"
              ],
              [
                "工程判断",
                "FOA MVP 的第一版规格应该从这些变量收敛，而不是从“我要最强阵列”发散。"
              ]
            ],
            "tasks": [
              "选 4ch/8ch/16ch 三档写出风险",
              "把 frame size 和延迟写成同一个取舍"
            ]
          }
        ],
        "overview": {
          "question": "DMA/ISR/ring buffer 在 mic array 里到底解决什么风险？",
          "outcome": "交付 producer/consumer 时间线和实时预算，说明 ma_frame_rx 为什么要等时调用。",
          "map": [
            "总：先读 Known issue",
            "分：把 PDM receive、frame_rx、buffer 放到同一张图",
            "验收：给出 underrun/lock-up 证据链"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 FOA 麦克 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "把音频算法经验迁移到硬件",
            "body": "你已经熟悉 AEC/NS/AGC/KWS，但嵌入式第一关不是算法效果，而是样本是否稳定、等时、可追踪地到达算法入口。",
            "checks": [
              "先保证 PCM/frame 连续",
              "再讨论算法质量",
              "最后讨论量产校准"
            ]
          },
          {
            "label": "读法",
            "title": "把源码分成数据面和控制面",
            "body": "数据面负责连续音频流，控制面负责配置、状态、升级和错误恢复。读开源项目时先标出两条面，很多嵌入式混乱都来自把它们混在一起。",
            "checks": [
              "数据面不能被日志/网络阻塞",
              "控制面要有超时和状态码"
            ]
          },
          {
            "label": "预算",
            "title": "任何模块都要落到数量级",
            "body": "每天至少做一个粗预算：字节数、毫秒数、吞吐、任务周期或工具链成本。预算不需要精确到最终量产，但必须能暴露方向性风险。",
            "checks": [
              "写明假设",
              "写明最坏情况",
              "写明下一步怎么测"
            ]
          },
          {
            "label": "失败模式",
            "title": "源码里的小字通常比功能列表更重要",
            "body": "Known issue、partition、required tools、目录边界都是风险入口。工程评审要把这些风险翻译成测试项，而不是当作备注跳过。",
            "checks": [
              "列一个会让 demo 失败的问题",
              "列一个会让量产失败的问题"
            ]
          }
        ]
      },
      "glasses": {
        "product": "AI 眼镜",
        "repo": "SidekickOS",
        "repoUrl": "https://github.com/siersidekick/SidekickOS",
        "sourceUrl": "https://github.com/siersidekick/SidekickOS/tree/main/firmware",
        "filePath": "firmware/main.ino + firmware/main/",
        "licenseNote": "MIT License；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "firmware/main.ino",
          "firmware/main/",
          "firmware/components/"
        ],
        "why": "读 SidekickOS main.ino 的 include、I2S pins、BLE 状态和 audio buffer，把眼镜固件看成多 producer/consumer 系统。",
        "avoid": "不追 camera 编码；只看 camera/BLE/I2S/SPIFFS 共存时的事件流和阻塞风险。",
        "excerpt": "今天抓住 main.ino 的真实变量：BLEDevice / driver/i2s / audioBuffer / AUDIO_INTERVAL。",
        "segments": [
          [
            "外设地图",
            "esp_camera / BLEDevice / driver/i2s / SPIFFS",
            "include 列表就是资源竞争图。",
            "camera、audio、BLE、文件系统不能互相无限阻塞。"
          ],
          [
            "状态机",
            "bleDeviceConnected / frameStreamingEnabled / audioStreamingEnabled",
            "这些 bool 是最小运行状态。",
            "状态切换要能解释用户看到什么。"
          ],
          [
            "预算点",
            "AUDIO_BUFFER_SIZE / AUDIO_INTERVAL",
            "这两个常量能进入吞吐和延迟估算。",
            "BLE 堵塞时要定义丢弃或降级策略。"
          ]
        ],
        "concepts": [
          "多 producer",
          "BLE consumer",
          "阻塞风险",
          "用户可见延迟",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "画 capture/audio/status -> BLE/client 的事件流",
          "计算连续两个 20ms 包失败的影响",
          "写 BLE 堵塞时不应阻塞哪些路径",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "眼镜 producer/consumer 时间线",
        "inference": "眼镜比单一音频设备更复杂，因为多个用户可见功能共享同一个 MCU 和无线链路。",
        "validation": {
          "challenge": "完成《眼镜 producer/consumer 时间线》，必须引用 main.ino 的 include、状态变量或 audio buffer。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：camera/audio/button/status 是 producer，BLE/client/display 是 consumer；阻塞会变成旧状态、卡顿或延迟。"
        },
        "sourceBlocks": [
          {
            "title": "SidekickOS firmware/main.ino / Includes and pins",
            "filePath": "firmware/main.ino",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/firmware/main.ino",
            "code": "#include \"esp_camera.h\"\n#include \"BLEDevice.h\"\n#include \"driver/i2s.h\"\n#include \"SPIFFS.h\"\n\n// Microphone I2S pins\n#define I2S_WS_PIN 42\n#define I2S_SD_PIN 41\n#define I2S_SCK_PIN 1",
            "notes": [
              [
                "概念落点",
                "include 列表就是外设地图：camera、BLE、I2S mic、SPIFFS 同时存在。"
              ],
              [
                "DMA/ISR 的影子",
                "I2S 音频通常靠硬件外设和 buffer 连续搬运；你不必先懂寄存器，也要知道它是实时 producer。"
              ]
            ],
            "tasks": [
              "把 camera/BLE/I2S/SPIFFS 画成资源竞争图",
              "标出最可能产生连续数据的模块"
            ]
          },
          {
            "title": "SidekickOS firmware/main.ino / Streaming state",
            "filePath": "firmware/main.ino",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/firmware/main.ino",
            "code": "bool bleDeviceConnected = false;\nbool frameStreamingEnabled = false;\nbool audioStreamingEnabled = false;\n\nconst int AUDIO_BUFFER_SIZE = 256;\nint16_t audioBuffer[AUDIO_BUFFER_SIZE];\nconst int AUDIO_INTERVAL = 20; // ms between audio packets",
            "notes": [
              [
                "状态机",
                "三个 bool 是最小状态机：连接、图像流、音频流。它们会共同决定任务是否运行。"
              ],
              [
                "预算入口",
                "AUDIO_BUFFER_SIZE 和 AUDIO_INTERVAL 是你做 BLE 吞吐、延迟、underrun 估算的抓手。"
              ]
            ],
            "tasks": [
              "把三个 bool 画成状态转换",
              "计算 20ms 音频包失败两次后的可感知延迟"
            ]
          }
        ],
        "overview": {
          "question": "多外设眼镜固件如何避免一个流卡住另一个流？",
          "outcome": "交付眼镜 producer/consumer 时间线，覆盖 camera/audio/BLE/status。",
          "map": [
            "总：先看 include 和状态变量",
            "分：拆连续流、间歇事件和 BLE 消费者",
            "验收：写降级策略"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 AI 眼镜 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "AI 眼镜首先是可穿戴系统",
            "body": "眼镜的核心约束不是模型多强，而是重量、热、功耗、显示可读性、麦克可用性和手机协同是否成立。",
            "checks": [
              "先看佩戴约束",
              "再看交互闭环",
              "最后看 AI 放置位置"
            ]
          },
          {
            "label": "读法",
            "title": "每个源码片段都要问跨端责任",
            "body": "看到 BLE、client、mobile、cloud、display、mic 时，不要只问它怎么写代码，要问它属于设备端、手机端还是云端。",
            "checks": [
              "设备端做确定性 I/O",
              "手机端做权限和体验",
              "云端做长任务和多用户"
            ]
          },
          {
            "label": "预算",
            "title": "眼镜预算要同时算时间和能量",
            "body": "AUDIO_INTERVAL、BLE、显示刷新、SPIFFS、partition 这些看似分散的配置都会进入功耗、延迟和可恢复性预算。",
            "checks": [
              "写一次 8 小时假设",
              "写一个 BLE 堵塞场景",
              "写一个 OTA 空间风险"
            ]
          },
          {
            "label": "失败模式",
            "title": "用户看到的是状态，不是线程",
            "body": "眼镜固件的 bug 往往表现为旧文字、没提示、卡顿、发热、断连，而不是一个漂亮的异常栈。验收时要把内部故障翻译成用户症状。",
            "checks": [
              "列用户可见症状",
              "列设备日志证据",
              "列手机/云证据"
            ]
          }
        ]
      }
    }
  },
  "4": {
    "title": "RAM/Flash/buffer：用配置片段做容量预算",
    "theme": "把 sample rate、mic count、audio buffer、partition table 变成能讨论的字节数和延迟。",
    "tracks": {
      "foa": {
        "product": "FOA 麦克 / 麦克阵列",
        "repo": "XMOS lib_mic_array",
        "repoUrl": "https://github.com/xmos/lib_mic_array",
        "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
        "filePath": "README.rst Features",
        "licenseNote": "XMOS Public Licence；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "README.rst",
          "examples/",
          "lib_mic_array/"
        ],
        "why": "读 XMOS Features 的 sample rate、mic count、frame size，把 README 变量转成 RAM 与延迟预算。",
        "avoid": "不看滤波器内部内存布局；今天只做数量级预算。",
        "excerpt": "预算入口：48/32/16 kHz、1 to 16 PDM microphones、configurable frame size。",
        "segments": [
          [
            "采样率",
            "48, 32, 16 kHz",
            "采样率直接决定每秒样本数。",
            "预算表至少列 16k/48k 两档。"
          ],
          [
            "通道数",
            "1 to 16 PDM microphones",
            "通道数线性放大 PCM、dump 和算法 scratch。",
            "不要用单通道语音直觉估多通道阵列。"
          ],
          [
            "frame size",
            "configurable frame size",
            "帧越大调度越轻但延迟越高。",
            "必须写清延迟代价。"
          ]
        ],
        "concepts": [
          "frame bytes",
          "ring buffer depth",
          "latency vs memory",
          "static allocation",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "计算 8ch/48k/16bit/100ms PCM",
          "解释 frame size 变大怎样影响调度",
          "列出非 PCM 的 RAM 项",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "FOA RAM/frame 预算表",
        "inference": "RAM 预算是架构决策，不是编译器报错后才补救。",
        "validation": {
          "challenge": "完成《FOA RAM/frame 预算表》，必须引用 sample rate、mic count 或 frame size。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：多通道 PCM 只是起点，还要加算法 scratch、USB buffer、dump 和任务栈。"
        },
        "sourceBlocks": [
          {
            "title": "XMOS README.rst / Rate, channel, frame budget",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "* 48, 32, 16 kHz output sample rates by default\n* 1 to 16 PDM microphones\n* Framing with configurable frame size",
            "notes": [
              [
                "预算入口",
                "100ms PCM 内存可以直接从 sample rate * channel * bytes/sample 算起，然后再加 ring、dump、算法 scratch。"
              ],
              [
                "失败模式",
                "frame size 变大能降低调度频率，但端到端延迟会上升，语音交互会变钝。"
              ]
            ],
            "tasks": [
              "算 8ch/48k/16bit/100ms PCM 字节数",
              "写出 frame size 加倍的收益和代价"
            ]
          },
          {
            "title": "XMOS README.rst / Feature constraints",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "Features\n* 48, 32, 16 kHz output sample rates by default\n* 1 to 16 PDM microphones\n* Supports up to 8 microphones using only a single thread\n* Configurable MCLK to PDM clock divider\n* Supports both SDR and DDR microphone configurations\n* Framing with configurable frame size",
            "notes": [
              [
                "这不是功能清单而已",
                "这里每一行都是架构变量：采样率、麦克数、线程、时钟、SDR/DDR、frame size 都会进入预算。"
              ],
              [
                "工程判断",
                "FOA MVP 的第一版规格应该从这些变量收敛，而不是从“我要最强阵列”发散。"
              ]
            ],
            "tasks": [
              "选 4ch/8ch/16ch 三档写出风险",
              "把 frame size 和延迟写成同一个取舍"
            ]
          }
        ],
        "overview": {
          "question": "README 中几个数字如何变成 RAM 和延迟预算？",
          "outcome": "交付 FOA RAM/frame 预算表，至少覆盖两档采样率和两档通道数。",
          "map": [
            "总：先确定 sample rate/channel/frame",
            "分：算 PCM、ring、dump、scratch",
            "验收：说明内存与延迟取舍"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 FOA 麦克 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "把音频算法经验迁移到硬件",
            "body": "你已经熟悉 AEC/NS/AGC/KWS，但嵌入式第一关不是算法效果，而是样本是否稳定、等时、可追踪地到达算法入口。",
            "checks": [
              "先保证 PCM/frame 连续",
              "再讨论算法质量",
              "最后讨论量产校准"
            ]
          },
          {
            "label": "读法",
            "title": "把源码分成数据面和控制面",
            "body": "数据面负责连续音频流，控制面负责配置、状态、升级和错误恢复。读开源项目时先标出两条面，很多嵌入式混乱都来自把它们混在一起。",
            "checks": [
              "数据面不能被日志/网络阻塞",
              "控制面要有超时和状态码"
            ]
          },
          {
            "label": "预算",
            "title": "任何模块都要落到数量级",
            "body": "每天至少做一个粗预算：字节数、毫秒数、吞吐、任务周期或工具链成本。预算不需要精确到最终量产，但必须能暴露方向性风险。",
            "checks": [
              "写明假设",
              "写明最坏情况",
              "写明下一步怎么测"
            ]
          },
          {
            "label": "失败模式",
            "title": "源码里的小字通常比功能列表更重要",
            "body": "Known issue、partition、required tools、目录边界都是风险入口。工程评审要把这些风险翻译成测试项，而不是当作备注跳过。",
            "checks": [
              "列一个会让 demo 失败的问题",
              "列一个会让量产失败的问题"
            ]
          }
        ]
      },
      "glasses": {
        "product": "AI 眼镜",
        "repo": "SidekickOS",
        "repoUrl": "https://github.com/siersidekick/SidekickOS",
        "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/firmware/partitions.csv",
        "filePath": "firmware/partitions.csv + firmware/",
        "licenseNote": "MIT License；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "firmware/partitions.csv",
          "firmware/main/",
          "README.md"
        ],
        "why": "读 SidekickOS partitions.csv 与 main.ino 的 audio buffer，把 Flash 分区和运行时 buffer 放到同一张资源表。",
        "avoid": "不争论具体分区是否最佳；只看 app、spiffs、nvs 与运行时媒体 buffer 的角色。",
        "excerpt": "预算入口：factory app 0x180000、spiffs 0x270000、audioBuffer 256、AUDIO_INTERVAL 20ms。",
        "segments": [
          [
            "Flash map",
            "partitions.csv",
            "分区表决定固件、状态、文件系统的空间。",
            "OTA/日志/模型都要进入 Flash 预算。"
          ],
          [
            "持久状态",
            "nvs",
            "配对、配置、校准不能和临时缓存混在一起。",
            "升级失败不能破坏用户状态。"
          ],
          [
            "运行 buffer",
            "audioBuffer",
            "运行 RAM 和 Flash 是两张表，但会共同限制产品功能。",
            "音频、图像、显示缓存要一起算。"
          ]
        ],
        "concepts": [
          "Flash partition",
          "NVS",
          "SPIFFS",
          "runtime buffer",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "把 factory/spiffs 换算成 MB",
          "说明日志为什么不能无限增长",
          "列出音频/图像/显示三个运行 buffer",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "眼镜 Flash/RAM 资源预算表",
        "inference": "眼镜资源预算要同时看固件升级空间、文件缓存、日志隐私和运行时媒体 buffer。",
        "validation": {
          "challenge": "完成《眼镜 Flash/RAM 资源预算表》，必须引用 partitions.csv 和 main.ino buffer。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：factory/spiffs/nvs 管 Flash，audio/camera/display 管运行 RAM；没有 A/B OTA 时回滚风险要单列。"
        },
        "sourceBlocks": [
          {
            "title": "SidekickOS firmware/partitions.csv / Flash map",
            "filePath": "firmware/partitions.csv",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/firmware/partitions.csv",
            "code": "# Name,   Type, SubType, Offset,  Size, Flags\nnvs,      data, nvs,     0x9000,  0x6000,\nphy_init, data, phy,     0xf000,  0x1000,\nfactory,  app,  factory, 0x10000, 0x180000,\nspiffs,   data, spiffs,  0x190000, 0x270000,",
            "notes": [
              [
                "Flash 不是硬盘",
                "分区表决定固件、持久状态、文件系统如何共享有限空间。"
              ],
              [
                "OTA 伏笔",
                "这里只看到 factory，没有完整 A/B OTA 分区时，升级和回滚策略就要单独评审。"
              ]
            ],
            "tasks": [
              "把 factory 和 spiffs 换算成 MB",
              "说明日志/模型/缓存为什么会挤压 OTA 空间"
            ]
          },
          {
            "title": "SidekickOS firmware/main.ino / Streaming state",
            "filePath": "firmware/main.ino",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/firmware/main.ino",
            "code": "bool bleDeviceConnected = false;\nbool frameStreamingEnabled = false;\nbool audioStreamingEnabled = false;\n\nconst int AUDIO_BUFFER_SIZE = 256;\nint16_t audioBuffer[AUDIO_BUFFER_SIZE];\nconst int AUDIO_INTERVAL = 20; // ms between audio packets",
            "notes": [
              [
                "状态机",
                "三个 bool 是最小状态机：连接、图像流、音频流。它们会共同决定任务是否运行。"
              ],
              [
                "预算入口",
                "AUDIO_BUFFER_SIZE 和 AUDIO_INTERVAL 是你做 BLE 吞吐、延迟、underrun 估算的抓手。"
              ]
            ],
            "tasks": [
              "把三个 bool 画成状态转换",
              "计算 20ms 音频包失败两次后的可感知延迟"
            ]
          }
        ],
        "overview": {
          "question": "Flash 分区和运行时 buffer 如何共同限制眼镜功能？",
          "outcome": "交付 Flash/RAM 资源预算表，覆盖 factory、spiffs、nvs、audio/image/display buffer。",
          "map": [
            "总：先看 partitions.csv",
            "分：再看 audioBuffer 和媒体缓存",
            "验收：写 OTA/日志/隐私风险"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 AI 眼镜 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "AI 眼镜首先是可穿戴系统",
            "body": "眼镜的核心约束不是模型多强，而是重量、热、功耗、显示可读性、麦克可用性和手机协同是否成立。",
            "checks": [
              "先看佩戴约束",
              "再看交互闭环",
              "最后看 AI 放置位置"
            ]
          },
          {
            "label": "读法",
            "title": "每个源码片段都要问跨端责任",
            "body": "看到 BLE、client、mobile、cloud、display、mic 时，不要只问它怎么写代码，要问它属于设备端、手机端还是云端。",
            "checks": [
              "设备端做确定性 I/O",
              "手机端做权限和体验",
              "云端做长任务和多用户"
            ]
          },
          {
            "label": "预算",
            "title": "眼镜预算要同时算时间和能量",
            "body": "AUDIO_INTERVAL、BLE、显示刷新、SPIFFS、partition 这些看似分散的配置都会进入功耗、延迟和可恢复性预算。",
            "checks": [
              "写一次 8 小时假设",
              "写一个 BLE 堵塞场景",
              "写一个 OTA 空间风险"
            ]
          },
          {
            "label": "失败模式",
            "title": "用户看到的是状态，不是线程",
            "body": "眼镜固件的 bug 往往表现为旧文字、没提示、卡顿、发热、断连，而不是一个漂亮的异常栈。验收时要把内部故障翻译成用户症状。",
            "checks": [
              "列用户可见症状",
              "列设备日志证据",
              "列手机/云证据"
            ]
          }
        ]
      }
    }
  },
  "5": {
    "title": "外设总线：从时钟、I2S、BLE、显示约束读硬件边界",
    "theme": "总线不是名词表，它决定数据从哪里来、以什么节奏来、能不能被手机端及时消费。",
    "tracks": {
      "foa": {
        "product": "FOA 麦克 / 麦克阵列",
        "repo": "XMOS lib_mic_array",
        "repoUrl": "https://github.com/xmos/lib_mic_array",
        "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
        "filePath": "README.rst Features + doc/",
        "licenseNote": "XMOS Public Licence；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "README.rst",
          "doc/",
          "lib_mic_array/"
        ],
        "why": "读 XMOS 的 MCLK/PDM clock、SDR/DDR、sample rate 片段，把外设总线从名词变成时钟和吞吐约束。",
        "avoid": "不推导 PDM 调制细节；只画 PDM、PCM、USB/BLE/主机输出边界。",
        "excerpt": "总线入口：MCLK to PDM clock divider / SDR and DDR microphone configurations / 3.072 MHz PDM clock。",
        "segments": [
          [
            "时钟",
            "MCLK to PDM clock divider",
            "时钟配置决定板级设计和可采集节奏。",
            "硬件框图必须画 clock。"
          ],
          [
            "PDM 模式",
            "SDR and DDR",
            "同样管脚/时钟下可能有不同数据效率。",
            "评审要问麦克布线和模式。"
          ],
          [
            "输出边界",
            "sample rates",
            "PDM 是输入侧，PCM/USB/BLE 是后续输出侧。",
            "不要把 BLE 当多通道原始音频主链路。"
          ]
        ],
        "concepts": [
          "PDM clock",
          "MCLK divider",
          "SDR/DDR",
          "input bus vs output bus",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "解释 PDM clock 与 sample rate 的关系",
          "画 PDM -> PCM -> USB/host",
          "说明 BLE 适合控制还是音频主链路",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "FOA 外设总线边界图",
        "inference": "总线选择会限制通道数、板级设计、实时性和最终产品接口。",
        "validation": {
          "challenge": "完成《FOA 外设总线边界图》，必须引用 MCLK/PDM/SDR-DDR 片段。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：PDM 是采集输入，frame/PCM 是软件边界，USB/存储/主机是产品输出。"
        },
        "sourceBlocks": [
          {
            "title": "XMOS README.rst / Clock and bus hints",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "* Configurable MCLK to PDM clock divider\n* Supports both SDR and DDR microphone configurations\n* 48, 32, 16 kHz output sample rates by default\n  (3.072 MHz PDM clock)",
            "notes": [
              [
                "总线不是抽象名词",
                "PDM clock、MCLK divider、SDR/DDR 决定了板级时钟、麦克布局和可支持的通道数。"
              ],
              [
                "产品边界",
                "如果最终产品要 USB 或 BLE 输出，PDM 只是采集侧总线，后面还要另算传输总线。"
              ]
            ],
            "tasks": [
              "把 PDM clock 和 sample rate 连起来",
              "指出 PDM、I2S、USB、BLE 分别在哪一段"
            ]
          },
          {
            "title": "XMOS README.rst / Rate, channel, frame budget",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "* 48, 32, 16 kHz output sample rates by default\n* 1 to 16 PDM microphones\n* Framing with configurable frame size",
            "notes": [
              [
                "预算入口",
                "100ms PCM 内存可以直接从 sample rate * channel * bytes/sample 算起，然后再加 ring、dump、算法 scratch。"
              ],
              [
                "失败模式",
                "frame size 变大能降低调度频率，但端到端延迟会上升，语音交互会变钝。"
              ]
            ],
            "tasks": [
              "算 8ch/48k/16bit/100ms PCM 字节数",
              "写出 frame size 加倍的收益和代价"
            ]
          }
        ],
        "overview": {
          "question": "PDM clock、SDR/DDR、输出总线如何决定阵列上限？",
          "outcome": "交付外设总线边界图，区分输入采集总线和产品输出链路。",
          "map": [
            "总：先看 PDM/MCLK/SDR-DDR",
            "分：再画 PDM->PCM->USB/host",
            "验收：说明 BLE 为什么不适合多通道主音频链路"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 FOA 麦克 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "把音频算法经验迁移到硬件",
            "body": "你已经熟悉 AEC/NS/AGC/KWS，但嵌入式第一关不是算法效果，而是样本是否稳定、等时、可追踪地到达算法入口。",
            "checks": [
              "先保证 PCM/frame 连续",
              "再讨论算法质量",
              "最后讨论量产校准"
            ]
          },
          {
            "label": "读法",
            "title": "把源码分成数据面和控制面",
            "body": "数据面负责连续音频流，控制面负责配置、状态、升级和错误恢复。读开源项目时先标出两条面，很多嵌入式混乱都来自把它们混在一起。",
            "checks": [
              "数据面不能被日志/网络阻塞",
              "控制面要有超时和状态码"
            ]
          },
          {
            "label": "预算",
            "title": "任何模块都要落到数量级",
            "body": "每天至少做一个粗预算：字节数、毫秒数、吞吐、任务周期或工具链成本。预算不需要精确到最终量产，但必须能暴露方向性风险。",
            "checks": [
              "写明假设",
              "写明最坏情况",
              "写明下一步怎么测"
            ]
          },
          {
            "label": "失败模式",
            "title": "源码里的小字通常比功能列表更重要",
            "body": "Known issue、partition、required tools、目录边界都是风险入口。工程评审要把这些风险翻译成测试项，而不是当作备注跳过。",
            "checks": [
              "列一个会让 demo 失败的问题",
              "列一个会让量产失败的问题"
            ]
          }
        ]
      },
      "glasses": {
        "product": "AI 眼镜",
        "repo": "OpenSourceSmartGlasses",
        "repoUrl": "https://github.com/Mentra-Community/OpenSourceSmartGlasses",
        "sourceUrl": "https://github.com/Mentra-Community/OpenSourceSmartGlasses/tree/main/electronics_and_firmware",
        "filePath": "electronics_and_firmware/ + README.md",
        "licenseNote": "MIT License；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "electronics_and_firmware/",
          "res/",
          "README.md"
        ],
        "why": "读 OSSG 产品承诺和 SidekickOS main.ino pins，拆显示、麦克、BLE、电源约束怎样共同影响总线选择。",
        "avoid": "不做 PCB 走线评审；只建立外设-总线-功耗-体验的因果链。",
        "excerpt": "总线入口：display / microphones / wireless phone connection，以及 main.ino 的 I2S_WS/I2S_SD/I2S_SCK。",
        "segments": [
          [
            "产品外设",
            "display, microphones, wireless phone connection",
            "README 一句话已经给出主要 I/O。",
            "总线图要覆盖显示、音频、BLE。"
          ],
          [
            "I2S 麦克",
            "I2S_WS_PIN / I2S_SD_PIN / I2S_SCK_PIN",
            "源码 pins 说明音频不是抽象输入，而是具体外设。",
            "采集链路要有 buffer 和调度预算。"
          ],
          [
            "可穿戴限制",
            "hours of battery life",
            "总线活动会反映到功耗。",
            "高频传输要有状态机控制。"
          ]
        ],
        "concepts": [
          "I2S pins",
          "BLE link",
          "display refresh",
          "power-aware bus",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "画显示/麦克/BLE 三条 I/O",
          "指出哪条是连续流、哪条是间歇控制",
          "写一个总线拥塞降级策略",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "眼镜外设总线约束图",
        "inference": "眼镜总线设计要服务佩戴体验：稳定状态提示比追求满速吞吐更重要。",
        "validation": {
          "challenge": "完成《眼镜外设总线约束图》，必须引用 README 外设词和 main.ino I2S pins。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：I2S 负责麦克连续流，BLE 负责跨端连接，显示刷新和功耗由状态机控制。"
        },
        "sourceBlocks": [
          {
            "title": "OpenSourceSmartGlasses README.md / Product promise",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/Mentra-Community/OpenSourceSmartGlasses/blob/main/README.md",
            "code": "# Open Source Smart Glasses\nSmart glasses with display, microphones, wireless phone\nconnection, prescription lenses, hours of battery life,\nand LED indicator.\n\nDesigned to be:\n1. All day wearable\n2. Immediately useful\n3. Extendable",
            "notes": [
              [
                "产品边界",
                "显示、麦克、无线连接、镜片、电池、LED 都在一句话里出现，说明眼镜是硬件约束密集的系统。"
              ],
              [
                "第一性原理",
                "all day wearable 会反向约束显示刷新、BLE 连接、麦克开启策略和热设计。"
              ]
            ],
            "tasks": [
              "把每个产品词映射到硬件/固件模块",
              "写出 all-day 对功耗和热的限制"
            ]
          },
          {
            "title": "SidekickOS firmware/main.ino / Includes and pins",
            "filePath": "firmware/main.ino",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/firmware/main.ino",
            "code": "#include \"esp_camera.h\"\n#include \"BLEDevice.h\"\n#include \"driver/i2s.h\"\n#include \"SPIFFS.h\"\n\n// Microphone I2S pins\n#define I2S_WS_PIN 42\n#define I2S_SD_PIN 41\n#define I2S_SCK_PIN 1",
            "notes": [
              [
                "概念落点",
                "include 列表就是外设地图：camera、BLE、I2S mic、SPIFFS 同时存在。"
              ],
              [
                "DMA/ISR 的影子",
                "I2S 音频通常靠硬件外设和 buffer 连续搬运；你不必先懂寄存器，也要知道它是实时 producer。"
              ]
            ],
            "tasks": [
              "把 camera/BLE/I2S/SPIFFS 画成资源竞争图",
              "标出最可能产生连续数据的模块"
            ]
          }
        ],
        "overview": {
          "question": "显示、麦克、BLE、电源这些外设如何互相牵制？",
          "outcome": "交付眼镜外设总线约束图，覆盖连续流、间歇控制和功耗状态机。",
          "map": [
            "总：先看 README 外设承诺",
            "分：再看 I2S pins 和 BLE",
            "验收：写拥塞与降级策略"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 AI 眼镜 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "AI 眼镜首先是可穿戴系统",
            "body": "眼镜的核心约束不是模型多强，而是重量、热、功耗、显示可读性、麦克可用性和手机协同是否成立。",
            "checks": [
              "先看佩戴约束",
              "再看交互闭环",
              "最后看 AI 放置位置"
            ]
          },
          {
            "label": "读法",
            "title": "每个源码片段都要问跨端责任",
            "body": "看到 BLE、client、mobile、cloud、display、mic 时，不要只问它怎么写代码，要问它属于设备端、手机端还是云端。",
            "checks": [
              "设备端做确定性 I/O",
              "手机端做权限和体验",
              "云端做长任务和多用户"
            ]
          },
          {
            "label": "预算",
            "title": "眼镜预算要同时算时间和能量",
            "body": "AUDIO_INTERVAL、BLE、显示刷新、SPIFFS、partition 这些看似分散的配置都会进入功耗、延迟和可恢复性预算。",
            "checks": [
              "写一次 8 小时假设",
              "写一个 BLE 堵塞场景",
              "写一个 OTA 空间风险"
            ]
          },
          {
            "label": "失败模式",
            "title": "用户看到的是状态，不是线程",
            "body": "眼镜固件的 bug 往往表现为旧文字、没提示、卡顿、发热、断连，而不是一个漂亮的异常栈。验收时要把内部故障翻译成用户症状。",
            "checks": [
              "列用户可见症状",
              "列设备日志证据",
              "列手机/云证据"
            ]
          }
        ]
      }
    }
  },
  "6": {
    "title": "RTOS/任务：用 SDK 分层和状态变量拆任务边界",
    "theme": "通过 ESP-ADF 和 SidekickOS 看 pipeline、task、queue、BLE 状态和客户端分层。",
    "tracks": {
      "foa": {
        "product": "FOA 麦克 / 麦克阵列",
        "repo": "ESP-ADF",
        "repoUrl": "https://github.com/espressif/esp-adf",
        "sourceUrl": "https://github.com/espressif/esp-adf/blob/master/README.md",
        "filePath": "README.md + components/ + examples/",
        "licenseNote": "Apache-2.0；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "README.md",
          "components/",
          "examples/"
        ],
        "why": "读 ESP-ADF vs ESP-IDF 和 Features，理解音频产品框架如何把 driver/task/queue/pipeline 分层。",
        "avoid": "不写 FreeRTOS API；只看 SDK 分层和 audio pipeline 的工程价值。",
        "excerpt": "任务入口：ESP-IDF is the base SDK / ESP-ADF is built on top / Product Services / OTA。",
        "segments": [
          [
            "底座",
            "ESP-IDF",
            "OS、drivers、Bluetooth 等在底层。",
            "驱动问题回 IDF 查。"
          ],
          [
            "产品框架",
            "ESP-ADF",
            "音频播放、服务、OTA 在上层。",
            "应用不应直接堆一堆阻塞循环。"
          ],
          [
            "服务化",
            "Product Services",
            "电池、OTA、音频流都需要任务边界。",
            "FOA 产品可借鉴 pipeline 思维。"
          ]
        ],
        "concepts": [
          "RTOS task",
          "queue",
          "audio pipeline",
          "SDK layering",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "画 IDF -> ADF -> app 分层",
          "指出 pipeline 中 producer/consumer",
          "写 audio task 的验收指标",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "FOA audio pipeline/RTOS 任务图",
        "inference": "RTOS 不是会不会写线程，而是能否把实时流、控制流、升级流拆成可观测任务。",
        "validation": {
          "challenge": "完成《FOA audio pipeline/RTOS 任务图》，必须引用 ESP-ADF vs ESP-IDF。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：IDF 提供 OS/driver，ADF 提供产品服务和 pipeline；FOA 应把采集、处理、输出、控制拆任务。"
        },
        "sourceBlocks": [
          {
            "title": "ESP-ADF README.md / ADF vs IDF",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/espressif/esp-adf/blob/master/README.md",
            "code": "ESP-ADF vs ESP-IDF\n- ESP-IDF is the base SDK ... OS, drivers, network stack,\n  Bluetooth ...\n- ESP-ADF is built on top of ESP-IDF ... audio/video playback,\n  battery service, OTA ...",
            "notes": [
              [
                "RTOS 任务边界",
                "ESP-IDF 更靠底座，ESP-ADF 把音频产品常见的 pipeline、服务、连接封装到更上层。"
              ],
              [
                "读项目方法",
                "看 ADF 时先看 components/examples 的产品流，再回到底层 IDF 查驱动和 FreeRTOS 细节。"
              ]
            ],
            "tasks": [
              "把 driver、task、queue、audio pipeline 分层",
              "列出哪些问题不该在应用层硬扛"
            ]
          },
          {
            "title": "ESP-ADF README.md / Product services",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/espressif/esp-adf/blob/master/README.md",
            "code": "Features\n- Standalone Components\n- Product Services\n- Resource Efficient\n- OTA services and audio application examples",
            "notes": [
              [
                "SDK 选型证据",
                "这些词说明 ADF 更像产品框架，不只是外设 demo。"
              ],
              [
                "FOA 的取舍",
                "XMOS 适合 mic array 底座，ADF 适合做音频产品服务，两者可以是不同层的参考。"
              ]
            ],
            "tasks": [
              "写出 ADF 相比裸 ESP-IDF 省掉的工程工作",
              "写出它不适合替代 XMOS PDM 阵列底座的地方"
            ]
          }
        ],
        "overview": {
          "question": "音频产品为什么需要 pipeline/task/queue，而不是一个大循环？",
          "outcome": "交付 FOA audio pipeline/RTOS 任务图，拆采集、处理、输出、控制和升级。",
          "map": [
            "总：先看 ESP-IDF/ADF 分层",
            "分：找 Product Services 和 pipeline 位置",
            "验收：定义任务优先级和指标"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 FOA 麦克 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "把音频算法经验迁移到硬件",
            "body": "你已经熟悉 AEC/NS/AGC/KWS，但嵌入式第一关不是算法效果，而是样本是否稳定、等时、可追踪地到达算法入口。",
            "checks": [
              "先保证 PCM/frame 连续",
              "再讨论算法质量",
              "最后讨论量产校准"
            ]
          },
          {
            "label": "读法",
            "title": "把源码分成数据面和控制面",
            "body": "数据面负责连续音频流，控制面负责配置、状态、升级和错误恢复。读开源项目时先标出两条面，很多嵌入式混乱都来自把它们混在一起。",
            "checks": [
              "数据面不能被日志/网络阻塞",
              "控制面要有超时和状态码"
            ]
          },
          {
            "label": "预算",
            "title": "任何模块都要落到数量级",
            "body": "每天至少做一个粗预算：字节数、毫秒数、吞吐、任务周期或工具链成本。预算不需要精确到最终量产，但必须能暴露方向性风险。",
            "checks": [
              "写明假设",
              "写明最坏情况",
              "写明下一步怎么测"
            ]
          },
          {
            "label": "失败模式",
            "title": "源码里的小字通常比功能列表更重要",
            "body": "Known issue、partition、required tools、目录边界都是风险入口。工程评审要把这些风险翻译成测试项，而不是当作备注跳过。",
            "checks": [
              "列一个会让 demo 失败的问题",
              "列一个会让量产失败的问题"
            ]
          }
        ]
      },
      "glasses": {
        "product": "AI 眼镜",
        "repo": "SidekickOS",
        "repoUrl": "https://github.com/siersidekick/SidekickOS",
        "sourceUrl": "https://github.com/siersidekick/SidekickOS",
        "filePath": "firmware/ + sidekickos-client/",
        "licenseNote": "MIT License；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "firmware/",
          "firmware/main/",
          "sidekickos-client/"
        ],
        "why": "读 SidekickOS feature split 和 main.ino 状态变量，拆 capture、BLE、command、status 的任务边界。",
        "avoid": "不优化 BLE 协议；只建立任务优先级和阻塞边界。",
        "excerpt": "任务入口：Separate firmware and client components / bleDeviceConnected / audioStreamingEnabled / AUDIO_INTERVAL。",
        "segments": [
          [
            "固件/客户端",
            "Separate firmware and client components",
            "跨端分层就是任务拆分的第一层。",
            "眼镜端保持确定性，客户端做复杂体验。"
          ],
          [
            "状态变量",
            "bleDeviceConnected",
            "连接状态决定任务是否发送、重试或降级。",
            "状态机必须可观测。"
          ],
          [
            "周期任务",
            "AUDIO_INTERVAL",
            "音频包周期是调度预算入口。",
            "长任务不能抢音频和状态提示。"
          ]
        ],
        "concepts": [
          "task boundary",
          "state flag",
          "queue/backpressure",
          "client split",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "把 capture/BLE/command/status 分成任务",
          "写出哪个任务最高优先级及原因",
          "列出阻塞时的用户可见症状",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "眼镜 RTOS/事件任务图",
        "inference": "眼镜任务设计要从用户可见状态倒推，而不是从代码文件数量倒推。",
        "validation": {
          "challenge": "完成《眼镜 RTOS/事件任务图》，必须引用 SidekickOS feature split 或 main.ino 状态变量。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：capture/audio 是实时 producer，BLE/client 是 consumer，status/display 是用户反馈，不应被长传输阻塞。"
        },
        "sourceBlocks": [
          {
            "title": "SidekickOS README.md / Feature split",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/README.md",
            "code": "SidekickOS provides:\n- High-Resolution Camera Capture\n- Audio Streaming - G.711 μ-law encoded audio over BLE\n- Multi-Platform Clients - Python API and Web browser interface\n- Modular Design - Separate firmware and client components",
            "notes": [
              [
                "模块分层",
                "firmware 和 client 被显式分开，说明复杂 UI、网络和 AI 可以放在设备外。"
              ],
              [
                "失败模式",
                "audio over BLE 是连续流，一旦和图像/状态共用链路，就要设计降级和丢弃策略。"
              ]
            ],
            "tasks": [
              "指出哪些是 producer，哪些是 consumer",
              "写出 BLE 堵塞时的降级顺序"
            ]
          },
          {
            "title": "SidekickOS firmware/main.ino / Streaming state",
            "filePath": "firmware/main.ino",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/firmware/main.ino",
            "code": "bool bleDeviceConnected = false;\nbool frameStreamingEnabled = false;\nbool audioStreamingEnabled = false;\n\nconst int AUDIO_BUFFER_SIZE = 256;\nint16_t audioBuffer[AUDIO_BUFFER_SIZE];\nconst int AUDIO_INTERVAL = 20; // ms between audio packets",
            "notes": [
              [
                "状态机",
                "三个 bool 是最小状态机：连接、图像流、音频流。它们会共同决定任务是否运行。"
              ],
              [
                "预算入口",
                "AUDIO_BUFFER_SIZE 和 AUDIO_INTERVAL 是你做 BLE 吞吐、延迟、underrun 估算的抓手。"
              ]
            ],
            "tasks": [
              "把三个 bool 画成状态转换",
              "计算 20ms 音频包失败两次后的可感知延迟"
            ]
          }
        ],
        "overview": {
          "question": "眼镜固件如何把 capture、BLE、command、status 拆成任务？",
          "outcome": "交付眼镜 RTOS/事件任务图，说明状态变量如何驱动任务边界。",
          "map": [
            "总：先看 firmware/client 分层",
            "分：再看状态变量和 AUDIO_INTERVAL",
            "验收：定义阻塞时用户看到什么"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 AI 眼镜 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "AI 眼镜首先是可穿戴系统",
            "body": "眼镜的核心约束不是模型多强，而是重量、热、功耗、显示可读性、麦克可用性和手机协同是否成立。",
            "checks": [
              "先看佩戴约束",
              "再看交互闭环",
              "最后看 AI 放置位置"
            ]
          },
          {
            "label": "读法",
            "title": "每个源码片段都要问跨端责任",
            "body": "看到 BLE、client、mobile、cloud、display、mic 时，不要只问它怎么写代码，要问它属于设备端、手机端还是云端。",
            "checks": [
              "设备端做确定性 I/O",
              "手机端做权限和体验",
              "云端做长任务和多用户"
            ]
          },
          {
            "label": "预算",
            "title": "眼镜预算要同时算时间和能量",
            "body": "AUDIO_INTERVAL、BLE、显示刷新、SPIFFS、partition 这些看似分散的配置都会进入功耗、延迟和可恢复性预算。",
            "checks": [
              "写一次 8 小时假设",
              "写一个 BLE 堵塞场景",
              "写一个 OTA 空间风险"
            ]
          },
          {
            "label": "失败模式",
            "title": "用户看到的是状态，不是线程",
            "body": "眼镜固件的 bug 往往表现为旧文字、没提示、卡顿、发热、断连，而不是一个漂亮的异常栈。验收时要把内部故障翻译成用户症状。",
            "checks": [
              "列用户可见症状",
              "列设备日志证据",
              "列手机/云证据"
            ]
          }
        ]
      }
    }
  },
  "7": {
    "title": "SDK 选型评审：用目录结构判断生态是否能落地",
    "theme": "选型不是选最熟的名字，而是看 sample、board、driver、工具链和跨端边界能否形成证据链。",
    "tracks": {
      "foa": {
        "product": "FOA 麦克 / 麦克阵列",
        "repo": "Zephyr + ESP-ADF + XMOS",
        "repoUrl": "https://github.com/zephyrproject-rtos/zephyr",
        "sourceUrl": "https://github.com/zephyrproject-rtos/zephyr",
        "filePath": "samples/ + boards/ + drivers/",
        "licenseNote": "XMOS Public Licence；本站只使用短摘录作学习引用，并链接原仓库。",
        "evidencePaths": [
          "zephyr/samples/",
          "zephyr/boards/",
          "zephyr/drivers/",
          "esp-adf/components/",
          "xmos/lib_mic_array/"
        ],
        "why": "对照 Zephyr 目录、ESP-ADF 分层和 XMOS device/tool 约束，做一页 SDK/RTOS 选型评审。",
        "avoid": "不争论信仰；只用源码目录和 README 证据说每个方案解决什么、不解决什么。",
        "excerpt": "选型证据链：Zephyr samples/boards/drivers/dts，ESP-ADF on ESP-IDF，XMOS XS3 vector unit。",
        "segments": [
          [
            "Zephyr",
            "samples -> board config -> devicetree -> driver",
            "强在跨板卡设备模型。",
            "适合验证 BSP/driver 可迁移性。"
          ],
          [
            "ESP-ADF",
            "built on top of ESP-IDF",
            "强在音频产品服务。",
            "适合 ESP 音频产品框架。"
          ],
          [
            "XMOS",
            "XS3 vector unit",
            "强在多 PDM 阵列实时底座。",
            "适合采集底层但工具链要评审。"
          ]
        ],
        "concepts": [
          "SDK ecosystem",
          "board support",
          "driver maturity",
          "spike",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "为 Zephyr/ADF/XMOS 各列一个强证据",
          "写一周 spike 验证清单",
          "写出反对每个方案的意见",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "FOA SDK/RTOS 选型评审",
        "inference": "选型要选最短证据链，而不是选最熟名词。",
        "validation": {
          "challenge": "完成《FOA SDK/RTOS 选型评审》，必须引用至少两个项目路径或摘录。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：XMOS 强在 mic array 底层，ADF 强在音频产品框架，Zephyr 强在跨平台设备模型。"
        },
        "sourceBlocks": [
          {
            "title": "Zephyr repo / Board and driver reading map",
            "filePath": "samples/ + boards/ + drivers/",
            "sourceUrl": "https://github.com/zephyrproject-rtos/zephyr",
            "code": "zephyr/\n  samples/\n  boards/\n  drivers/\n  dts/\n  subsys/\n\nReading order for a board feature:\nsample -> board config -> devicetree -> driver -> subsystem",
            "notes": [
              [
                "为什么放目录树",
                "Day 7 的重点是 SDK 选型，不是抄某个驱动实现；目录结构本身就是工程证据。"
              ],
              [
                "评审落点",
                "成熟 SDK 应该让 sample、board、driver、devicetree 形成可追踪证据链。"
              ]
            ],
            "tasks": [
              "用 sample -> driver 的链路评估可迁移性",
              "写出 Zephyr/XMOS/ADF 各自强项"
            ]
          },
          {
            "title": "ESP-ADF README.md / ADF vs IDF",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/espressif/esp-adf/blob/master/README.md",
            "code": "ESP-ADF vs ESP-IDF\n- ESP-IDF is the base SDK ... OS, drivers, network stack,\n  Bluetooth ...\n- ESP-ADF is built on top of ESP-IDF ... audio/video playback,\n  battery service, OTA ...",
            "notes": [
              [
                "RTOS 任务边界",
                "ESP-IDF 更靠底座，ESP-ADF 把音频产品常见的 pipeline、服务、连接封装到更上层。"
              ],
              [
                "读项目方法",
                "看 ADF 时先看 components/examples 的产品流，再回到底层 IDF 查驱动和 FreeRTOS 细节。"
              ]
            ],
            "tasks": [
              "把 driver、task、queue、audio pipeline 分层",
              "列出哪些问题不该在应用层硬扛"
            ]
          },
          {
            "title": "XMOS README.rst / Device and tools",
            "filePath": "README.rst",
            "sourceUrl": "https://github.com/xmos/lib_mic_array/blob/develop/README.rst",
            "code": "This library is only available for XS3 devices due to\nrequiring the XS3 vector unit.\n\nRequired tools\n* XMOS XTC Tools: 15.3.1",
            "notes": [
              [
                "芯片角色",
                "README 直接告诉你：这不是一个随便搬到任意 MCU 的 C 库，它依赖 XS3 的向量单元。"
              ],
              [
                "选型落点",
                "嵌入式选型要把工具链也算进去：能否 CI 构建、能否量产复现、团队是否能调试。"
              ]
            ],
            "tasks": [
              "把 XS3 vector unit 写进选型表",
              "写出工具链风险而不是只写芯片价格"
            ]
          }
        ],
        "overview": {
          "question": "SDK/RTOS 选型应该看哪些源码证据？",
          "outcome": "交付 FOA SDK/RTOS 选型评审，比较 XMOS、ESP-ADF、Zephyr 的证据链。",
          "map": [
            "总：先定选型问题",
            "分：用目录、README、工具链做证据",
            "验收：给一周 spike 计划"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 FOA 麦克 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "把音频算法经验迁移到硬件",
            "body": "你已经熟悉 AEC/NS/AGC/KWS，但嵌入式第一关不是算法效果，而是样本是否稳定、等时、可追踪地到达算法入口。",
            "checks": [
              "先保证 PCM/frame 连续",
              "再讨论算法质量",
              "最后讨论量产校准"
            ]
          },
          {
            "label": "读法",
            "title": "把源码分成数据面和控制面",
            "body": "数据面负责连续音频流，控制面负责配置、状态、升级和错误恢复。读开源项目时先标出两条面，很多嵌入式混乱都来自把它们混在一起。",
            "checks": [
              "数据面不能被日志/网络阻塞",
              "控制面要有超时和状态码"
            ]
          },
          {
            "label": "预算",
            "title": "任何模块都要落到数量级",
            "body": "每天至少做一个粗预算：字节数、毫秒数、吞吐、任务周期或工具链成本。预算不需要精确到最终量产，但必须能暴露方向性风险。",
            "checks": [
              "写明假设",
              "写明最坏情况",
              "写明下一步怎么测"
            ]
          },
          {
            "label": "失败模式",
            "title": "源码里的小字通常比功能列表更重要",
            "body": "Known issue、partition、required tools、目录边界都是风险入口。工程评审要把这些风险翻译成测试项，而不是当作备注跳过。",
            "checks": [
              "列一个会让 demo 失败的问题",
              "列一个会让量产失败的问题"
            ]
          }
        ]
      },
      "glasses": {
        "product": "AI 眼镜",
        "repo": "MentraOS",
        "repoUrl": "https://github.com/Mentra-Community/MentraOS",
        "sourceUrl": "https://github.com/Mentra-Community/MentraOS",
        "filePath": "mcu_client/ + mobile/ + cloud/",
        "licenseNote": "开源项目；本站只列目录锚点和短摘录，具体代码请回原仓库阅读。",
        "evidencePaths": [
          "mcu_client/",
          "mobile/",
          "cloud/",
          "glasses-compatibility.md"
        ],
        "why": "读 MentraOS mcu_client/mobile/cloud 目录信号和 SidekickOS firmware/client 分层，判断眼镜 OS 为什么不是单端固件。",
        "avoid": "不追云端业务代码；只读跨端边界、兼容性和调试证据链。",
        "excerpt": "选型证据链：mcu_client / mobile / cloud / glasses-compatibility.md / separate firmware and client components。",
        "segments": [
          [
            "设备端",
            "mcu_client",
            "靠近眼镜硬件和固件的确定性接口。",
            "设备端输出清晰状态，不承载全部业务。"
          ],
          [
            "手机端",
            "mobile",
            "权限、后台、账号、网络都在手机现实边界内。",
            "BLE 和后台限制必须进评审。"
          ],
          [
            "云端",
            "cloud",
            "多用户、应用、AI 服务和会话在云端变复杂。",
            "隐私和 session id 要跨端一致。"
          ]
        ],
        "concepts": [
          "cross-device OS",
          "mcu client",
          "mobile boundary",
          "cloud session",
          "源码证据链",
          "工程预算",
          "失败模式",
          "agent 读仓任务"
        ],
        "readTasks": [
          "解释 mcu_client/mobile/cloud 各自职责",
          "说明为什么眼镜 OS 不是单端固件",
          "列出一条跨端调试证据链",
          "把今天的源码摘录改写成一段 5 行以内的伪代码或状态流。",
          "写一个你会交给 agent 的 repo-reading prompt，要求它只读指定路径并输出证据。",
          "列出一个你当前最不确定的底层概念，并说明它卡在哪个源码片段上。"
        ],
        "artifact": "眼镜 SDK/OS 选型评审",
        "inference": "智能眼镜的 OS 更像跨端协作层；硬件公司需要懂固件，也要懂手机和云边界。",
        "validation": {
          "challenge": "完成《眼镜 SDK/OS 选型评审》，必须引用 mcu_client/mobile/cloud 或 SidekickOS firmware/client。",
          "rubric": [
            "必须引用当前页面展示的源码文件路径或目录路径；没有引用最高 3 分",
            "必须把源码事实转成工程判断，不能只复述概念定义",
            "必须包含一个数量级、预算、状态流或风险证据",
            "必须写出一个可交给 coding agent 的下一步任务和验收标准"
          ],
          "reference": "参考方向：眼镜端做 I/O 和状态，mobile/cloud 做体验、账号、网络和 AI 会话；调试要串 session id。"
        },
        "sourceBlocks": [
          {
            "title": "MentraOS README.md / Cross-device OS",
            "filePath": "README.md + repo directories",
            "sourceUrl": "https://github.com/Mentra-Community/MentraOS",
            "code": "<h1>MentraOS</h1>\n<h3>The open source operating system for smart glasses</h3>\n\nRepository signals:\n  mcu_client/\n  mobile/\n  cloud/\n  glasses-compatibility.md",
            "notes": [
              [
                "OS 的含义",
                "这里的 OS 不是单片机 RTOS，而是设备、手机、云、应用共同组成的体验层。"
              ],
              [
                "选型判断",
                "AI 眼镜公司需要懂固件，也要懂手机后台限制、云会话、隐私和账号边界。"
              ]
            ],
            "tasks": [
              "解释 mcu_client/mobile/cloud 各自职责",
              "写出跨端日志如何串成一条时间线"
            ]
          },
          {
            "title": "SidekickOS README.md / Feature split",
            "filePath": "README.md",
            "sourceUrl": "https://github.com/siersidekick/SidekickOS/blob/main/README.md",
            "code": "SidekickOS provides:\n- High-Resolution Camera Capture\n- Audio Streaming - G.711 μ-law encoded audio over BLE\n- Multi-Platform Clients - Python API and Web browser interface\n- Modular Design - Separate firmware and client components",
            "notes": [
              [
                "模块分层",
                "firmware 和 client 被显式分开，说明复杂 UI、网络和 AI 可以放在设备外。"
              ],
              [
                "失败模式",
                "audio over BLE 是连续流，一旦和图像/状态共用链路，就要设计降级和丢弃策略。"
              ]
            ],
            "tasks": [
              "指出哪些是 producer，哪些是 consumer",
              "写出 BLE 堵塞时的降级顺序"
            ]
          }
        ],
        "overview": {
          "question": "眼镜 OS 为什么不是单端固件，而是跨端系统？",
          "outcome": "交付眼镜 SDK/OS 选型评审，覆盖 mcu_client、mobile、cloud 和兼容性。",
          "map": [
            "总：先看跨端目录",
            "分：拆设备、手机、云职责",
            "验收：写跨端调试证据链"
          ],
          "steps": [
            "先读总览，只判断今天要解决的系统问题，不急着看每一行代码。",
            "打开源码摘录，把原文中的名词圈成输入、状态、buffer、输出、工具链或目录边界。",
            "用 Codex 旁注把源码事实翻译成工程判断：预算、实时性、功耗、调试证据或产品缺口。",
            "完成验收产物，答案必须引用至少一个源码路径和一个具体片段。"
          ],
          "detailQuestions": [
            "这一天的源码证据能证明什么，不能证明什么？",
            "如果把这个模块放进你的 AI 眼镜 MVP，第一个会爆的约束是什么？",
            "你会让 coding agent 继续读哪个目录，并要求它输出什么图或测试？"
          ]
        },
        "deepDives": [
          {
            "label": "背景",
            "title": "AI 眼镜首先是可穿戴系统",
            "body": "眼镜的核心约束不是模型多强，而是重量、热、功耗、显示可读性、麦克可用性和手机协同是否成立。",
            "checks": [
              "先看佩戴约束",
              "再看交互闭环",
              "最后看 AI 放置位置"
            ]
          },
          {
            "label": "读法",
            "title": "每个源码片段都要问跨端责任",
            "body": "看到 BLE、client、mobile、cloud、display、mic 时，不要只问它怎么写代码，要问它属于设备端、手机端还是云端。",
            "checks": [
              "设备端做确定性 I/O",
              "手机端做权限和体验",
              "云端做长任务和多用户"
            ]
          },
          {
            "label": "预算",
            "title": "眼镜预算要同时算时间和能量",
            "body": "AUDIO_INTERVAL、BLE、显示刷新、SPIFFS、partition 这些看似分散的配置都会进入功耗、延迟和可恢复性预算。",
            "checks": [
              "写一次 8 小时假设",
              "写一个 BLE 堵塞场景",
              "写一个 OTA 空间风险"
            ]
          },
          {
            "label": "失败模式",
            "title": "用户看到的是状态，不是线程",
            "body": "眼镜固件的 bug 往往表现为旧文字、没提示、卡顿、发热、断连，而不是一个漂亮的异常栈。验收时要把内部故障翻译成用户症状。",
            "checks": [
              "列用户可见症状",
              "列设备日志证据",
              "列手机/云证据"
            ]
          }
        ]
      }
    }
  }
};
