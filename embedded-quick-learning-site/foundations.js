window.FOUNDATIONS = {
  dma: {
    title: "DMA",
    category: "实时数据搬运",
    definition: "DMA 是让外设和内存直接搬数据的硬件机制，CPU只负责配置和响应完成事件。",
    mentalModel: "把 CPU 想成项目经理，DMA 像搬运工。CPU告诉搬运工从哪搬、搬到哪、搬多少，搬完或半满时再叫CPU处理。",
    pseudocode: `// CPU配置一次，之后由硬件持续搬运
dma.src = I2S_RX_FIFO;
dma.dst = audio_ring_buffer;
dma.length = FRAME_BYTES;
dma.mode = CIRCULAR;
dma.start();

on_dma_half_full_interrupt() {
  notify(audio_task);
}`,
    failure: "DMA buffer太小会频繁中断；CPU处理太慢会覆盖未处理数据；cache没同步会读到旧数据。",
    product: "FOA麦克依赖DMA稳定接收多通道音频；AI眼镜用DMA降低麦克采集和屏幕刷新的CPU占用。"
  },
  isr: {
    title: "Interrupt / ISR",
    category: "实时响应",
    definition: "中断是硬件打断CPU当前工作，ISR是处理中断的最短函数。",
    mentalModel: "门铃响了先开门确认，不要站在门口把整件事办完。ISR只做记录、清标志、通知任务。",
    pseudocode: `on_i2s_rx_interrupt() {
  clear_interrupt_flag();
  push_event(AUDIO_FRAME_READY);
  // 不在ISR里跑AEC、写文件、打印大量日志
}`,
    failure: "ISR太长会让其他中断延迟，音频可能爆音，BLE连接可能抖动。",
    product: "音频帧到达、按键、充电状态、BLE事件都会触发中断。"
  },
  polling: {
    title: "Polling",
    category: "外设访问",
    definition: "轮询是CPU反复检查某个状态位，直到外设准备好。",
    mentalModel: "不停看取餐号是否到了。简单但浪费CPU，适合低频或bring-up阶段。",
    pseudocode: `while (!(UART_STATUS & TX_READY)) {
  // 等待外设可写
}
UART_TX = byte;`,
    failure: "在高优先级路径里轮询太久，会阻塞音频和无线任务。",
    product: "早期调试可轮询寄存器；量产音频链路应更多依赖DMA/中断。"
  },
  mmio: {
    title: "Register / MMIO",
    category: "硬件抽象",
    definition: "MMIO把硬件寄存器映射成内存地址，软件读写这些地址来控制外设。",
    mentalModel: "硬件给你一排开关和仪表盘，写寄存器是拨开关，读寄存器是看仪表。",
    pseudocode: `#define GPIO_OUT 0x40020014
write32(GPIO_OUT, read32(GPIO_OUT) | LED_BIT);`,
    failure: "写错bit、时钟没开、pinmux没配，代码看似正确但外设完全不动。",
    product: "屏幕背光、I2S时钟、PDM麦克、充电芯片最终都落到寄存器配置。"
  },
  ring_buffer: {
    title: "Ring Buffer",
    category: "流式数据",
    definition: "环形缓冲是首尾相接的固定内存区，用读写指针吸收生产者和消费者速度差。",
    mentalModel: "像传送带上的格子，麦克不断放帧，算法不断取帧；放太快会覆盖，取太慢会堆满。",
    pseudocode: `if (free_space(ring) >= frame.size) {
  write_frame(ring, frame);
} else {
  underrun_or_drop++;
}`,
    failure: "没有定义满/空策略会导致爆音、延迟无限增长或数据覆盖。",
    product: "音频采集、BLE包队列、显示命令队列都常用ring buffer。"
  },
  cache: {
    title: "Cache Coherency",
    category: "内存一致性",
    definition: "cache一致性问题是CPU cache里的数据和DMA/外设看到的内存不一致。",
    mentalModel: "CPU手里有草稿纸，DMA看的是白板；如果不同步，双方读到的不是同一份内容。",
    pseudocode: `cache_invalidate(rx_buffer);
process(rx_buffer);

prepare(tx_buffer);
cache_clean(tx_buffer);
dma_send(tx_buffer);`,
    failure: "音频帧随机旧数据、屏幕偶发花屏、网络包内容错乱。",
    product: "带cache的MPU/高端MCU做音频DMA或显示DMA时必须关心。"
  },
  stack_heap: {
    title: "Stack / Heap",
    category: "内存模型",
    definition: "stack用于函数调用和局部变量，heap用于动态申请；嵌入式更偏向固定内存和可预测生命周期。",
    mentalModel: "stack像临时工作台，函数结束就清；heap像仓库，借了要还，碎片会越积越麻烦。",
    pseudocode: `void audio_task() {
  int16_t frame[160]; // stack
}

static int16_t ring[8][160]; // fixed pool`,
    failure: "任务栈溢出会随机崩溃；heap碎片会让长时间运行后才失败。",
    product: "音频实时路径应避免频繁malloc；模型arena和buffer最好静态规划。"
  },
  fixed_point: {
    title: "Fixed-point",
    category: "数值计算",
    definition: "定点数用整数模拟小数，换取更低功耗和更稳定的嵌入式性能。",
    mentalModel: "把所有小数先乘以一个固定比例存成整数，计算后再缩放回来。",
    pseudocode: `// Q15: 1.0 ~= 32767
int32_t y = (int32_t)x_q15 * gain_q15;
y = y >> 15;`,
    failure: "缩放错误会溢出、削波或噪声变大。",
    product: "低功耗DSP、KWS、AEC滤波器和音量处理都可能用定点实现。"
  },
  rtos_task: {
    title: "RTOS Task",
    category: "并发模型",
    definition: "RTOS task是可调度的执行单元，有优先级、栈和阻塞状态。",
    mentalModel: "任务像不同岗位的人，调度器按优先级和是否有活来安排谁占用CPU。",
    pseudocode: `audio_task(priority=high) {
  while (true) {
    wait(frame_ready);
    process_audio_frame();
  }
}`,
    failure: "优先级乱设会让日志或UI抢走音频CPU，造成卡顿。",
    product: "音频处理、BLE、显示、电源管理、日志通常拆成不同task。"
  },
  queue: {
    title: "Queue",
    category: "任务通信",
    definition: "队列是在任务之间传事件或数据的有界通道。",
    mentalModel: "像窗口排队，队伍长度有限；满了就必须决定拒收、等待还是丢弃。",
    pseudocode: `queue_send(audio_queue, frame_id, timeout=0);
queue_receive(audio_queue, &frame_id, timeout=10ms);`,
    failure: "队列无界或阻塞策略错误，会导致内存涨、延迟涨或死锁。",
    product: "音频帧、BLE命令、显示消息、OTA状态都适合用队列传递。"
  },
  semaphore: {
    title: "Semaphore",
    category: "同步",
    definition: "信号量用于通知资源或事件可用，常见于ISR通知任务。",
    mentalModel: "像发号牌。DMA半满发一个号，音频任务拿到号才处理对应buffer。",
    pseudocode: `isr() { semaphore_give(frame_ready); }
task() { semaphore_take(frame_ready); process(); }`,
    failure: "漏发或多发会让任务饿死或重复处理旧数据。",
    product: "DMA完成、按键事件、传输完成都可用信号量唤醒任务。"
  },
  priority_inversion: {
    title: "Priority Inversion",
    category: "调度风险",
    definition: "高优先级任务等待低优先级任务持有的锁，中优先级任务又抢占低优先级任务，导致高优先级长期等。",
    mentalModel: "老板等实习生拿钥匙，中层一直拉着实习生开会，老板反而最久等。",
    pseudocode: `low.lock(i2c);
high.wait(i2c);
medium.run_forever(); // high被间接饿住`,
    failure: "偶发长延迟，日志看起来CPU没满但音频仍然卡。",
    product: "共享I2C、日志锁、文件系统锁都可能影响音频或显示实时性。"
  },
  device_tree: {
    title: "Device Tree",
    category: "板级描述",
    definition: "设备树用数据描述板子上有什么硬件、连到哪些pin和总线。",
    mentalModel: "像硬件户口本，驱动读它来知道屏幕、麦克、I2C设备在哪里。",
    pseudocode: `i2s0 {
  status = "okay";
  pinctrl = <&i2s_pins>;
  mclk = <12288000>;
};`,
    failure: "pin、clock、地址写错，驱动加载了但硬件表现异常。",
    product: "换屏幕、codec、麦克阵列或电源芯片时，设备树/BSP会先变。"
  },
  bootloader: {
    title: "Bootloader",
    category: "启动与升级",
    definition: "bootloader是上电后最先运行的软件，负责初始化、选择固件、校验和跳转。",
    mentalModel: "像开机门卫，先确认固件身份和健康状态，再放它进入主程序。",
    pseudocode: `if (verify(app_b) && app_b_pending) boot(app_b);
else if (verify(app_a)) boot(app_a);
else enter_recovery();`,
    failure: "bootloader策略错会让OTA失败后设备变砖。",
    product: "FOA麦克和AI眼镜都需要可靠升级，尤其是卖出后的固件修复。"
  },
  partition: {
    title: "Flash Partition",
    category: "存储布局",
    definition: "分区把Flash划成bootloader、应用A/B、配置、模型、日志等区域。",
    mentalModel: "像仓库分区，升级包、当前固件、备用固件和用户数据不能互相踩。",
    pseudocode: `bootloader | app_A | app_B | config | model | crash_log`,
    failure: "分区过小导致升级失败；配置区被覆盖导致校准丢失。",
    product: "校准文件、KWS模型、OTA包和crash dump都需要清晰分区。"
  },
  ota: {
    title: "OTA Rollback",
    category: "升级可靠性",
    definition: "OTA回滚是在新固件启动失败或健康检查失败时自动退回旧版本。",
    mentalModel: "试穿新鞋，走两步确认没问题再扔旧鞋；否则立刻换回旧鞋。",
    pseudocode: `download(app_B);
verify_signature(app_B);
mark_pending(app_B);
reboot();
if (health_ok()) mark_confirmed(app_B);
else rollback(app_A);`,
    failure: "断电、签名失败、版本不兼容、健康确认缺失都会造成升级事故。",
    product: "智能眼镜涉及用户日用，OTA失败必须能恢复；音频硬件也不能因升级丢校准。"
  }
};
