const days = window.COURSE_DAYS;
let currentDay = 1;
let currentTrack = localStorage.getItem("embedded-track") || "foa";
let currentTab = localStorage.getItem("embedded-active-tab") || "foundations";
let pendingFoundationKey = "";
let llmUnlocked = false;

const $ = (id) => document.getElementById(id);
const stateKey = (day, key) => "embedded-day-" + day + "-" + key;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function renderMarkdown(value) {
  const blocks = String(value || "").replace(/\r\n/g, "\n").split(/```/);
  return blocks.map((block, index) => {
    if (index % 2 === 1) {
      const lines = block.replace(/^\w+\n/, "").replace(/\n$/, "");
      return `<pre class="markdown-code"><code>${escapeHtml(lines)}</code></pre>`;
    }
    return renderMarkdownText(block);
  }).join("");
}

function renderMarkdownText(text) {
  const lines = text.split("\n");
  const html = [];
  let listType = "";
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = "";
    }
  };
  const openList = (type) => {
    if (listType !== type) {
      closeList();
      html.push(`<${type}>`);
      listType = type;
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i];
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }
    if (line.includes("|") && lines[i + 1]?.trim().match(/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/)) {
      flushParagraph();
      closeList();
      const headers = line.split("|").map((cell) => cell.trim()).filter(Boolean);
      const rows = [];
      i += 2;
      while (i < lines.length && lines[i].trim().includes("|")) {
        rows.push(lines[i].trim().split("|").map((cell) => cell.trim()).filter(Boolean));
        i += 1;
      }
      i -= 1;
      html.push(`
        <div class="markdown-table-wrap">
          <table>
            <thead><tr>${headers.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join("")}</tr></thead>
            <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table>
        </div>
      `);
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = Math.min(heading[1].length + 2, 6);
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      openList("ul");
      html.push(`<li>${renderInlineMarkdown(unordered[1])}</li>`);
      continue;
    }
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      openList("ol");
      html.push(`<li>${renderInlineMarkdown(ordered[1])}</li>`);
      continue;
    }
    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      flushParagraph();
      closeList();
      html.push(`<blockquote>${renderInlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }
    closeList();
    paragraph.push(line);
  }
  flushParagraph();
  closeList();
  return html.join("");
}

function getDoneSet() {
  return new Set(JSON.parse(localStorage.getItem("embedded-done-days") || "[]"));
}

function saveDoneSet(set) {
  localStorage.setItem("embedded-done-days", JSON.stringify([...set]));
}

function getCurrentLesson() {
  const day = days.find((d) => d.day === currentDay) || days[0];
  return { day, lesson: window.LESSON_DETAILS[day.day] };
}

function getTrackLesson(lesson, track = currentTrack) {
  return lesson.tracks?.[track] || lesson.tracks?.foa || {
    productGoal: "",
    deepLesson: lesson.deepLesson || [],
    caseStudy: lesson.productCase?.[track] || [],
    validation: lesson.validation
  };
}

function applyTheme(choice = localStorage.getItem("embedded-theme") || "system") {
  localStorage.setItem("embedded-theme", choice);
  document.documentElement.dataset.theme = choice;
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.classList.toggle("active", button.dataset.themeChoice === choice);
  });
}

function renderProgress() {
  const done = getDoneSet();
  $("progressNumber").textContent = done.size + "/21";
  $("progressBar").style.width = Math.round((done.size / days.length) * 100) + "%";
}

function renderRadar() {
  const axes = [
    ["DMA/Buffer", ["dma", "ring_buffer"]],
    ["RTOS", ["rtos_task", "queue", "semaphore"]],
    ["总线/外设", ["mmio", "polling", "device_tree"]],
    ["功耗/内存", ["stack_heap", "cache", "fixed_point"]],
    ["OTA/安全", ["bootloader", "partition", "ota"]],
    ["调试/量产", ["isr", "priority_inversion"]]
  ];
  const done = getDoneSet();
  $("radarList").innerHTML = axes.map(([label, keys]) => {
    const total = days.filter((d) => (window.LESSON_DETAILS[d.day]?.prerequisites || []).some((k) => keys.includes(k))).length || 1;
    const finished = days.filter((d) => done.has(d.day) && (window.LESSON_DETAILS[d.day]?.prerequisites || []).some((k) => keys.includes(k))).length;
    const pct = Math.min(100, Math.round((finished / total) * 100));
    return `<div class="radar-row"><span>${label}</span><div><i style="width:${pct}%"></i></div><b>${pct}%</b></div>`;
  }).join("");
}

function renderDayList() {
  const q = $("daySearch").value.trim().toLowerCase();
  const done = getDoneSet();
  $("dayList").innerHTML = "";
  days
    .filter((d) => {
      const lesson = window.LESSON_DETAILS[d.day];
      const searchable = [d.title, d.theme, d.concept, d.foa, d.glasses, ...(lesson?.prerequisites || []), JSON.stringify(lesson?.tracks || {})].join(" ").toLowerCase();
      return !q || searchable.includes(q);
    })
    .forEach((d) => {
      const btn = document.createElement("button");
      btn.className = "day-item" + (d.day === currentDay ? " active" : "") + (d.milestone ? " milestone" : "");
      btn.innerHTML = `<span>Day ${d.day}</span><strong>${d.title}</strong><small>${d.week}</small>${done.has(d.day) ? "<b>完成</b>" : ""}`;
      btn.addEventListener("click", () => {
        currentDay = d.day;
        location.hash = "day-" + d.day;
        render();
      });
      $("dayList").appendChild(btn);
    });
}

function renderTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === currentTab);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === "tab-" + currentTab);
  });
}

function renderFoundations(lesson) {
  $("foundationCards").innerHTML = lesson.prerequisites.map((key) => {
    const item = window.FOUNDATIONS[key];
    if (!item) return "";
    return `
      <article class="foundation-card">
        <div class="foundation-topline">
          <span>${item.category}</span>
          <label><input type="checkbox" data-foundation="${key}"> 已理解</label>
        </div>
        <h4>${item.title}</h4>
        <p>${item.definition}</p>
        <button class="inline-action" data-ask-foundation="${key}">问一下这个概念</button>
        <details>
          <summary>直觉模型 / 伪代码 / 事故</summary>
          <p>${item.mentalModel}</p>
          <pre class="mini-code"><code>${escapeHtml(item.pseudocode)}</code></pre>
          <p><strong>常见事故：</strong>${item.failure}</p>
          <p><strong>产品位置：</strong>${item.product}</p>
        </details>
      </article>
    `;
  }).join("");
  $("foundationCards").querySelectorAll("input[data-foundation]").forEach((input) => {
    const key = "foundation-done-" + input.dataset.foundation;
    input.checked = localStorage.getItem(key) === "1";
    input.addEventListener("change", () => {
      localStorage.setItem(key, input.checked ? "1" : "0");
    });
  });
  $("foundationCards").querySelectorAll("[data-ask-foundation]").forEach((button) => {
    button.addEventListener("click", () => {
      pendingFoundationKey = button.dataset.askFoundation;
      const item = window.FOUNDATIONS[pendingFoundationKey];
      $("llmQuestion").value = `请用嵌入式音频/AI眼镜的例子解释 ${item.title}，我现在对这个概念不熟。`;
      openLlmDrawer();
    });
  });
}

function renderSourceCard(trackLesson) {
  const source = trackLesson.sourceRefs;
  if (!source) return "";
  return `
    <article class="source-card">
      <div class="source-card-main">
        <p class="eyebrow">Open Source Module</p>
        <h4><a href="${source.url}" target="_blank" rel="noreferrer">${escapeHtml(source.repo)}</a></h4>
        <p>${escapeHtml(source.whyThisModule)}</p>
      </div>
      <div class="source-meta">
        <strong>今天读这些路径</strong>
        <div class="path-list">${source.paths.map((path) => `<code>${escapeHtml(path)}</code>`).join("")}</div>
      </div>
      <div class="source-meta">
        <strong>读代码问题</strong>
        <ol>${source.readQuestions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol>
      </div>
      <div class="source-meta">
        <strong>今天先别钻</strong>
        <p>${escapeHtml(source.avoidDetail || "先读模块边界和数据流，暂时不追每一行实现。")}</p>
      </div>
    </article>
  `;
}

function renderLesson(lesson) {
  const trackLesson = getTrackLesson(lesson);
  const sharedBlocks = lesson.coreLesson || lesson.shared?.coreLesson || [];
  const trackBlocks = trackLesson.deepLesson || [];
  $("mentalModelTitle").textContent = lesson.mentalModel.title;
  $("mentalModelBody").textContent = lesson.mentalModel.body;
  $("mentalModelFlow").innerHTML = lesson.mentalModel.flow.map((x, i) =>
    `<div class="flow-node">${x}</div>${i < lesson.mentalModel.flow.length - 1 ? '<div class="flow-arrow">></div>' : ""}`
  ).join("");
  const lessonHtml = [
    ...sharedBlocks.map(([title, body], index) => ({ title, body, index: index + 1, scope: "共通基础", kind: "shared" })),
    ...trackBlocks.map(([title, body], index) => ({ title, body, index: index + 1, scope: currentTrack === "foa" ? "FOA轨道" : "眼镜轨道", kind: "track" }))
  ].map((block) => `
    <section class="lesson-block ${block.kind}">
      <span>${block.index}</span>
      <em class="lesson-scope">${block.scope}</em>
      <h4>${escapeHtml(block.title)}</h4>
      <div class="lesson-body">${renderMarkdown(block.body)}</div>
    </section>
  `).join("");
  $("lessonBlocks").innerHTML = renderSourceCard(trackLesson) + lessonHtml;
}

function renderCodeWalkthrough(lesson) {
  const trackLesson = getTrackLesson(lesson);
  const repo = trackLesson.repoWalkthrough;
  $("codeTitle").textContent = lesson.codeWalkthrough.title;
  $("codeBlock").textContent = lesson.codeWalkthrough.code;
  const repoHtml = repo ? `
    <article class="repo-walkthrough">
      <div>
        <p class="eyebrow">Repo Walkthrough</p>
        <h4>${escapeHtml(repo.title)}</h4>
      </div>
      <div class="repo-columns">
        <section>
          <strong>路径</strong>
          <div class="path-list">${repo.paths.map((path) => `<code>${escapeHtml(path)}</code>`).join("")}</div>
        </section>
        <section>
          <strong>代码/配置锚点</strong>
          <div class="path-list">${repo.codeAnchors.map((anchor) => `<code>${escapeHtml(anchor)}</code>`).join("")}</div>
        </section>
      </div>
      <ol>${repo.readQuestions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol>
      <pre class="mini-code"><code>${escapeHtml(repo.pseudo)}</code></pre>
    </article>
  ` : "";
  $("codeExplanation").innerHTML = repoHtml + lesson.codeWalkthrough.explanation.map((detail, index) => `
    <div class="detail-item"><span>${index + 1}</span><p>${detail}</p></div>
  `).join("");
}

function getLabDefaults(type) {
  const defaults = {
    dma: { bufferFrames: 4, produceMs: 10, consumeMs: 12, steps: 24 },
    rtos: { audioCost: 3, bleCost: 5, logCost: 7, ticks: 18 },
    ble: { sampleRate: 16000, bitDepth: 16, channels: 1, compression: 4 },
    power: { battery: 220, idleMa: 2, listenMa: 18, displayMa: 45, listenPct: 20, displayPct: 12 },
    ota: { signature: 1, powerLoss: 0, health: 1 },
    memory: { channels: 4, sampleRate: 16000, bitDepth: 16, bufferMs: 100, arenaKb: 96 },
    worksheet: { confidence: 2 }
  };
  const saved = localStorage.getItem(stateKey(currentDay, "lab-" + type));
  return { ...defaults[type], ...(saved ? JSON.parse(saved) : {}) };
}

function saveLab(type, values) {
  localStorage.setItem(stateKey(currentDay, "lab-" + type), JSON.stringify(values));
}

function slider(label, id, value, min, max, step = 1) {
  return `<label>${label}<input data-lab-input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"><b>${value}</b></label>`;
}

function renderLab(lesson) {
  const type = lesson.interactiveLab.type || "worksheet";
  const values = getLabDefaults(type);
  const titles = {
    dma: "DMA Ring Buffer：生产者/消费者实验",
    rtos: "RTOS Priority Queue：任务调度实验",
    ble: "BLE Throughput：吞吐预算实验",
    power: "Power Budget：续航预算实验",
    ota: "OTA Rollback：回滚状态机实验",
    memory: "Memory Budget：buffer与arena实验",
    worksheet: "工程推演练习"
  };
  $("labTitle").textContent = titles[type] || titles.worksheet;

  if (type === "dma") renderDmaLab(values);
  else if (type === "rtos") renderRtosLab(values);
  else if (type === "ble") renderBleLab(values);
  else if (type === "power") renderPowerLab(values);
  else if (type === "ota") renderOtaLab(values);
  else if (type === "memory") renderMemoryLab(values);
  else renderWorksheetLab(values);

  $("labControls").querySelectorAll("[data-lab-input]").forEach((input) => {
    input.addEventListener("input", () => {
      input.nextElementSibling.textContent = input.value;
      const next = Object.fromEntries([...$("labControls").querySelectorAll("[data-lab-input]")].map((el) => [el.id, Number(el.value)]));
      saveLab(type, next);
      renderLab(lesson);
    });
  });
}

function renderDmaLab(v) {
  $("labControls").innerHTML = [
    slider("buffer帧数", "bufferFrames", v.bufferFrames, 2, 10),
    slider("DMA生产周期 ms", "produceMs", v.produceMs, 5, 20),
    slider("CPU处理耗时 ms", "consumeMs", v.consumeMs, 4, 25),
    slider("模拟步数", "steps", v.steps, 8, 40)
  ].join("");
  let t = 0, level = 0, underrun = 0, overrun = 0, nextProduce = 0, cpuFree = 0;
  const events = [];
  for (let i = 0; i < v.steps; i++) {
    t = i * v.produceMs;
    level++;
    if (level > v.bufferFrames) { overrun++; level = v.bufferFrames; }
    if (t >= cpuFree && level > 0) { level--; cpuFree = t + v.consumeMs; }
    if (t >= cpuFree && level === 0) underrun++;
    events.push({ t, level, cpuFree });
    nextProduce += v.produceMs;
  }
  const safe = overrun === 0 && v.consumeMs <= v.produceMs;
  $("labOutput").innerHTML = `
    <div class="metric-grid">
      <div><b>${overrun}</b><span>overrun/覆盖风险</span></div>
      <div><b>${v.bufferFrames * v.produceMs}ms</b><span>缓冲带来的最大排队延迟</span></div>
      <div><b>${safe ? "稳定" : "危险"}</b><span>结论</span></div>
    </div>
    <div class="timeline">${events.map((e) => `<span style="height:${18 + e.level * 12}px" title="${e.t}ms level=${e.level}"></span>`).join("")}</div>
    <p>读法：每根柱子是buffer水位。CPU处理耗时大于DMA生产周期时，水位会持续上涨，最终覆盖未处理帧。增大buffer只能延后事故，也会增加延迟。</p>
  `;
}

function renderRtosLab(v) {
  $("labControls").innerHTML = [
    slider("音频任务耗时", "audioCost", v.audioCost, 1, 10),
    slider("BLE任务耗时", "bleCost", v.bleCost, 1, 12),
    slider("日志任务耗时", "logCost", v.logCost, 1, 14),
    slider("模拟ticks", "ticks", v.ticks, 8, 30)
  ].join("");
  const schedule = [];
  for (let i = 0; i < v.ticks; i++) {
    if (i % 3 === 0 && v.audioCost < 8) schedule.push("audio");
    else if (i % 4 === 0) schedule.push("ble");
    else schedule.push(v.logCost > 10 ? "log*" : "log");
  }
  const risk = v.audioCost >= 8 || v.logCost > 10;
  $("labOutput").innerHTML = `
    <div class="schedule">${schedule.map((s) => `<span class="${s.replace("*", " risk")}">${s}</span>`).join("")}</div>
    <p>${risk ? "风险：音频任务或日志任务耗时过长，会挤压高优先级路径。真实系统还要看锁和中断关闭时间。" : "当前参数下音频任务较轻，调度余量尚可。"}</p>
  `;
}

function renderBleLab(v) {
  $("labControls").innerHTML = [
    slider("采样率 Hz", "sampleRate", v.sampleRate, 8000, 48000, 1000),
    slider("位深", "bitDepth", v.bitDepth, 8, 24),
    slider("通道数", "channels", v.channels, 1, 8),
    slider("压缩比", "compression", v.compression, 1, 12)
  ].join("");
  const raw = v.sampleRate * v.bitDepth * v.channels / 1000;
  const compressed = raw / v.compression;
  $("labOutput").innerHTML = `
    <div class="metric-grid">
      <div><b>${raw.toFixed(0)} kbps</b><span>原始PCM</span></div>
      <div><b>${compressed.toFixed(0)} kbps</b><span>压缩后估算</span></div>
      <div><b>${compressed < 120 ? "可尝试" : "偏危险"}</b><span>BLE实时风险</span></div>
    </div>
    <p>BLE还要扣掉协议开销、重传、手机后台限制和连接间隔。工程上要实测P99延迟，不只看平均吞吐。</p>
  `;
}

function renderPowerLab(v) {
  $("labControls").innerHTML = [
    slider("电池 mAh", "battery", v.battery, 80, 800, 10),
    slider("待机 mA", "idleMa", v.idleMa, 1, 20),
    slider("聆听 mA", "listenMa", v.listenMa, 5, 80),
    slider("显示 mA", "displayMa", v.displayMa, 5, 120),
    slider("聆听占空比 %", "listenPct", v.listenPct, 0, 100),
    slider("显示占空比 %", "displayPct", v.displayPct, 0, 100)
  ].join("");
  const avg = v.idleMa + v.listenMa * v.listenPct / 100 + v.displayMa * v.displayPct / 100;
  const hours = v.battery / avg;
  $("labOutput").innerHTML = `
    <div class="metric-grid">
      <div><b>${avg.toFixed(1)} mA</b><span>平均电流</span></div>
      <div><b>${hours.toFixed(1)} h</b><span>估算续航</span></div>
      <div><b>${hours >= 8 ? "达标" : "不足"}</b><span>8小时目标</span></div>
    </div>
    <p>这是粗估，但足够训练直觉：常开麦克和显示占空比会迅速吃掉眼镜续航。</p>
  `;
}

function renderOtaLab(v) {
  $("labControls").innerHTML = [
    slider("签名有效", "signature", v.signature, 0, 1),
    slider("升级中断电", "powerLoss", v.powerLoss, 0, 1),
    slider("健康检查通过", "health", v.health, 0, 1)
  ].join("");
  const states = ["下载备用分区", v.signature ? "签名校验通过" : "签名失败: 保持旧版本"];
  if (v.signature) states.push(v.powerLoss ? "断电: bootloader继续旧版本" : "切换到新版本");
  if (v.signature && !v.powerLoss) states.push(v.health ? "确认新版本" : "健康失败: 回滚旧版本");
  $("labOutput").innerHTML = `<div class="state-chain">${states.map((s) => `<span>${s}</span>`).join("")}</div><p>OTA可靠性的核心是：新固件先pending，只有健康检查通过才confirmed。</p>`;
}

function renderMemoryLab(v) {
  $("labControls").innerHTML = [
    slider("通道数", "channels", v.channels, 1, 8),
    slider("采样率 Hz", "sampleRate", v.sampleRate, 8000, 48000, 1000),
    slider("位深", "bitDepth", v.bitDepth, 8, 32),
    slider("缓冲 ms", "bufferMs", v.bufferMs, 10, 500, 10),
    slider("模型arena KB", "arenaKb", v.arenaKb, 16, 512, 8)
  ].join("");
  const audioKb = v.channels * v.sampleRate * (v.bitDepth / 8) * (v.bufferMs / 1000) / 1024;
  const total = audioKb + v.arenaKb;
  $("labOutput").innerHTML = `
    <div class="metric-grid">
      <div><b>${audioKb.toFixed(1)} KB</b><span>音频buffer</span></div>
      <div><b>${v.arenaKb} KB</b><span>模型arena</span></div>
      <div><b>${total.toFixed(1)} KB</b><span>合计不含栈/队列</span></div>
    </div>
    <p>真实峰值还要加频域scratch、显示buffer、BLE队列、日志和任务栈。</p>
  `;
}

function renderWorksheetLab(v) {
  $("labControls").innerHTML = slider("当前理解信心", "confidence", v.confidence, 0, 5);
  $("labOutput").innerHTML = `<p>这是工程推演日。请在验收挑战里输出架构、预算、风险和agent任务。信心低于3时，先回到“先修概念”补基础卡片。</p>`;
}

function renderCase(day, lesson) {
  const trackLesson = getTrackLesson(lesson);
  $("caseTitle").textContent = currentTrack === "foa" ? "FOA项目模块拆解" : "AI眼镜项目模块拆解";
  $("caseStudy").innerHTML = (trackLesson.caseStudy || []).map(([title, body]) => `
    <section class="case-row">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(body)}</p>
    </section>
  `).join("");
}

function renderValidation(day, lesson) {
  const validation = getTrackLesson(lesson).validation || lesson.validation;
  $("validationChallenge").textContent = validation.challenge;
  $("validationFields").innerHTML = validation.fields.map(([key, label]) => `
    <label class="validation-field">
      <span>${label}</span>
      <textarea data-validation="${key}" rows="4" placeholder="写成工程评审材料，不写概念背诵。"></textarea>
    </label>
  `).join("");
  $("validationFields").querySelectorAll("textarea").forEach((textarea) => {
    const key = stateKey(day.day, "validation-" + currentTrack + "-" + textarea.dataset.validation);
    textarea.value = localStorage.getItem(key) || "";
    textarea.addEventListener("input", () => localStorage.setItem(key, textarea.value));
  });
  $("rubricList").innerHTML = validation.rubric.map((r, i) => `
    <label class="rubric-item">
      <input type="checkbox" data-rubric="${i}">
      <span class="rubric-index">${i + 1}</span>
      <span class="rubric-text">${escapeHtml(r)}</span>
    </label>
  `).join("");
  $("pitfallList").innerHTML = validation.pitfalls.map((p) => `<span>${escapeHtml(p)}</span>`).join("");
  $("referenceAnswer").innerHTML = `<strong>参考方向</strong><p>${escapeHtml(validation.reference)}</p>`;
  $("scoreRange").value = localStorage.getItem(stateKey(day.day, "score")) || "0";
  $("scoreValue").textContent = $("scoreRange").value;
  renderSavedEvaluation(day);
}

function readValidationAnswers(day) {
  return Object.fromEntries(lessonFields(day).map(([key, label]) => [
    key,
    {
      label,
      value: localStorage.getItem(stateKey(day.day, "validation-" + currentTrack + "-" + key)) || ""
    }
  ]));
}

function lessonFields(day) {
  const lesson = window.LESSON_DETAILS[day.day];
  return (getTrackLesson(lesson).validation || lesson.validation).fields;
}

function renderSavedEvaluation(day) {
  const saved = localStorage.getItem(stateKey(day.day, "llm-evaluation-" + currentTrack));
  $("evaluationResult").innerHTML = saved ? renderEvaluation(JSON.parse(saved)) : "";
}

function renderEvaluation(result) {
  const rubric = Array.isArray(result.rubricScores)
    ? result.rubricScores.map((r) => `<li>${escapeHtml(r.name || r.criterion || "分项")}：${escapeHtml(r.score ?? "-")} - ${renderInlineMarkdown(r.comment || "")}</li>`).join("")
    : "";
  return `
    <div class="evaluation-card">
      <strong>LLM评分：${escapeHtml(result.score ?? "-")} / 5</strong>
      ${rubric ? `<ul>${rubric}</ul>` : ""}
      <p><b>亮点：</b>${renderInlineMarkdown((result.strengths || []).join("；") || "暂无")}</p>
      <p><b>漏洞：</b>${renderInlineMarkdown((result.gaps || []).join("；") || "暂无")}</p>
      <p><b>建议重学：</b>${renderInlineMarkdown((result.reviewConcepts || []).join("、") || "暂无")}</p>
      <div><b>下一版答案：</b><div class="markdown-body">${renderMarkdown(result.suggestedRevision || "暂无")}</div></div>
    </div>
  `;
}

function getLlmBase() {
  return (window.APP_CONFIG?.LLM_API_BASE || "").replace(/\/$/, "");
}

function buildLessonContext(day, lesson) {
  const trackLesson = getTrackLesson(lesson);
  const validation = trackLesson.validation || lesson.validation;
  return {
    title: day.title,
    theme: day.theme,
    concept: day.concept,
    track: currentTrack,
    trackProductGoal: trackLesson.productGoal,
    mentalModel: lesson.mentalModel,
    sharedCoreLesson: lesson.coreLesson || lesson.shared?.coreLesson || [],
    trackDeepLesson: trackLesson.deepLesson || [],
    trackCaseStudy: trackLesson.caseStudy || [],
    sourceRefs: trackLesson.sourceRefs || null,
    repoWalkthrough: trackLesson.repoWalkthrough || null,
    engineeringArtifact: trackLesson.sourceRefs?.engineeringArtifact || "",
    codeWalkthrough: lesson.codeWalkthrough,
    validation
  };
}

function buildFoundationContext(lesson) {
  return lesson.prerequisites.map((key) => ({ key, ...window.FOUNDATIONS[key] }));
}

function openLlmDrawer() {
  $("llmDrawer").classList.add("open");
  $("llmDrawer").setAttribute("aria-hidden", "false");
  $("llmFab").setAttribute("aria-expanded", "true");
  $("llmQuestion").focus();
}

function closeLlmDrawer() {
  $("llmDrawer").classList.remove("open");
  $("llmDrawer").setAttribute("aria-hidden", "true");
  $("llmFab").setAttribute("aria-expanded", "false");
}

function appendLlmMessage(role, text) {
  const item = document.createElement("div");
  item.className = "llm-message " + role;
  if (role === "assistant") {
    item.classList.add("markdown-body");
    item.innerHTML = renderMarkdown(text);
  } else {
    item.textContent = text;
  }
  $("llmMessages").appendChild(item);
  $("llmMessages").scrollTop = $("llmMessages").scrollHeight;
}

async function postLlm(path, payload) {
  const base = getLlmBase();
  if (!base) throw new Error("LLM_API_BASE 未配置。请部署 Cloudflare Worker 后在 src/config.js 中填写地址。");
  const response = await fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function unlockLlm() {
  const base = getLlmBase();
  if (!base) {
    $("llmStatus").textContent = "LLM_API_BASE 未配置，无法解锁。";
    return;
  }
  const password = $("llmPassword").value;
  $("llmStatus").textContent = "正在解锁...";
  try {
    const response = await fetch(base + "/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password })
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.message || result.error || "解锁失败。");
    llmUnlocked = true;
    $("llmPassword").value = "";
    $("llmAuth").classList.add("hidden");
    $("llmStatus").textContent = "LLM 已解锁。";
  } catch (error) {
    llmUnlocked = false;
    $("llmAuth").classList.remove("hidden");
    $("llmStatus").textContent = error.message;
  }
}

async function sendClarifyQuestion() {
  const question = $("llmQuestion").value.trim();
  if (!question) return;
  const { day, lesson } = getCurrentLesson();
  appendLlmMessage("user", question);
  $("llmQuestion").value = "";
  $("llmStatus").textContent = "正在询问 LLM...";
  try {
    const result = await postLlm("/api/chat", {
      mode: "clarify",
      day: day.day,
      track: currentTrack,
      tab: currentTab,
      question,
      foundationKey: pendingFoundationKey,
      lessonContext: buildLessonContext(day, lesson),
      foundationContext: buildFoundationContext(lesson)
    });
    appendLlmMessage("assistant", result.answer || "没有返回内容。");
    localStorage.setItem(stateKey(day.day, "llm-chat"), $("llmMessages").innerHTML);
    $("llmStatus").textContent = "已返回。";
    pendingFoundationKey = "";
  } catch (error) {
    appendLlmMessage("assistant", error.message);
    if (String(error.message).includes("401") || String(error.message).includes("locked")) $("llmAuth").classList.remove("hidden");
    $("llmStatus").textContent = "LLM 未启用或请求失败。";
  }
}

async function evaluateCurrentWork() {
  const { day, lesson } = getCurrentLesson();
  const validation = getTrackLesson(lesson).validation || lesson.validation;
  $("evaluationResult").innerHTML = `<div class="evaluation-card">正在评估...</div>`;
  try {
    const result = await postLlm("/api/evaluate", {
      mode: "evaluate",
      day: day.day,
      track: currentTrack,
      answers: readValidationAnswers(day),
      rubric: validation.rubric,
      pitfalls: validation.pitfalls,
      reference: validation.reference,
      lessonContext: buildLessonContext(day, lesson),
      foundationContext: buildFoundationContext(lesson)
    });
    localStorage.setItem(stateKey(day.day, "llm-evaluation-" + currentTrack), JSON.stringify(result));
    $("evaluationResult").innerHTML = renderEvaluation(result);
  } catch (error) {
    $("evaluationResult").innerHTML = `<div class="evaluation-card">${escapeHtml(error.message)}</div>`;
    if (String(error.message).includes("401") || String(error.message).includes("locked")) {
      openLlmDrawer();
      $("llmAuth").classList.remove("hidden");
    }
  }
}

function render() {
  const { day, lesson } = getCurrentLesson();
  const trackLesson = getTrackLesson(lesson);
  document.querySelectorAll(".segmented").forEach((b) => b.classList.toggle("active", b.dataset.track === currentTrack));
  $("dayTitle").textContent = "Day " + day.day + " · " + day.title;
  $("dayTheme").textContent = day.theme;
  $("conceptText").textContent = day.concept;
  $("trackTitle").textContent = currentTrack === "foa" ? "FOA麦克硬件映射" : "显示型AI眼镜映射";
  $("trackText").textContent = trackLesson.productGoal || (currentTrack === "foa" ? day.foa : day.glasses);
  const sourceEntry = $("sourceEntry");
  const sourceGuideLink = $("sourceGuideLink");
  if (sourceEntry && sourceGuideLink) {
    const hasSourceReader = day.day <= 7;
    sourceEntry.classList.toggle("hidden", !hasSourceReader);
    sourceGuideLink.href = hasSourceReader ? `./source/day-${day.day}.html?track=${currentTrack}` : "./source/index.html";
  }
  $("favoriteBtn").textContent = localStorage.getItem(stateKey(day.day, "favorite")) === "1" ? "★" : "☆";
  $("llmStatus").textContent = getLlmBase()
    ? (llmUnlocked ? "LLM 已解锁，可提问和评估。" : "LLM 已配置，输入访问密码后可调用。")
    : "LLM_API_BASE 未配置，离线学习可用。";
  $("llmAuth").classList.toggle("hidden", !getLlmBase() || llmUnlocked);
  renderTabs();
  renderFoundations(lesson);
  renderLesson(lesson);
  renderCodeWalkthrough(lesson);
  renderLab(lesson);
  renderCase(day, lesson);
  renderValidation(day, lesson);
  renderDayList();
  renderProgress();
  renderRadar();
}

document.querySelectorAll(".segmented").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentTrack = btn.dataset.track;
    localStorage.setItem("embedded-track", currentTrack);
    render();
  });
});

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    currentTab = button.dataset.tab;
    localStorage.setItem("embedded-active-tab", currentTab);
    renderTabs();
  });
});

document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.themeChoice));
});

$("daySearch").addEventListener("input", renderDayList);
$("scoreRange").addEventListener("input", () => {
  $("scoreValue").textContent = $("scoreRange").value;
  localStorage.setItem(stateKey(currentDay, "score"), $("scoreRange").value);
});
$("completeBtn").addEventListener("click", () => {
  const done = getDoneSet();
  done.add(currentDay);
  saveDoneSet(done);
  render();
});
$("favoriteBtn").addEventListener("click", () => {
  const key = stateKey(currentDay, "favorite");
  localStorage.setItem(key, localStorage.getItem(key) === "1" ? "0" : "1");
  render();
});
$("llmFab").addEventListener("click", openLlmDrawer);
$("llmClose").addEventListener("click", closeLlmDrawer);
$("llmSend").addEventListener("click", sendClarifyQuestion);
$("llmUnlock").addEventListener("click", unlockLlm);
$("llmPassword").addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlockLlm();
});
$("evaluateBtn").addEventListener("click", evaluateCurrentWork);

const hashDay = Number((location.hash.match(/day-(\d+)/) || [])[1]);
if (hashDay) currentDay = Math.max(1, Math.min(21, hashDay));
window.addEventListener("hashchange", () => {
  const d = Number((location.hash.match(/day-(\d+)/) || [])[1]);
  if (d) {
    currentDay = d;
    render();
  }
});

applyTheme();
render();
