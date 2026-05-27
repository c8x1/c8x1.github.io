const dayId = Number(document.body.dataset.day || "0");
const allLessons = window.SOURCE_LESSONS;
const days = Object.keys(allLessons).map(Number);
let currentTrack = new URLSearchParams(location.search).get("track") || localStorage.getItem("embedded-source-track") || "foa";
let llmUnlocked = false;

const $ = (id) => document.getElementById(id);
const keyFor = (day, track, key) => `embedded-source-day-${day}-${track}-${key}`;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getLlmBase() {
  return (window.APP_CONFIG?.LLM_API_BASE || "").replace(/\/$/, "");
}

function getLesson() {
  return allLessons[dayId || 1];
}

function getTrackLesson() {
  return getLesson().tracks[currentTrack] || getLesson().tracks.foa;
}

function renderNav() {
  const nav = $("dayNav");
  if (!nav) return;
  nav.innerHTML = days.map((day) => `
    <a class="${day === dayId ? "active" : ""}" href="./day-${day}.html?track=${currentTrack}">Day ${day}</a>
  `).join("");
  const prev = $("prevDay");
  const next = $("nextDay");
  if (prev) {
    prev.href = dayId > 1 ? `./day-${dayId - 1}.html?track=${currentTrack}` : "./index.html";
    prev.textContent = dayId > 1 ? `上一天 Day ${dayId - 1}` : "源码导读首页";
  }
  if (next) {
    next.href = dayId < 7 ? `./day-${dayId + 1}.html?track=${currentTrack}` : "./index.html";
    next.textContent = dayId < 7 ? `下一天 Day ${dayId + 1}` : "回到导读首页";
  }
}

function renderIndex() {
  const list = $("sourceDayList");
  if (!list) return;
  list.innerHTML = days.map((day) => {
    const lesson = allLessons[day];
    const foa = lesson.tracks.foa;
    const glasses = lesson.tracks.glasses;
    const doneFoa = localStorage.getItem(keyFor(day, "foa", "done")) === "1";
    const doneGlasses = localStorage.getItem(keyFor(day, "glasses", "done")) === "1";
    return `
      <article class="source-day-card">
        <div>
          <p class="eyebrow">Day ${day}</p>
          <h2>${escapeHtml(lesson.title)}</h2>
          <p>${escapeHtml(lesson.theme)}</p>
        </div>
        <div class="track-pair">
          <a href="./day-${day}.html?track=foa">
            <strong>FOA</strong>
            <span>${escapeHtml(foa.repo)}</span>
            <small>${doneFoa ? "已完成" : foa.artifact}</small>
          </a>
          <a href="./day-${day}.html?track=glasses">
            <strong>AI眼镜</strong>
            <span>${escapeHtml(glasses.repo)}</span>
            <small>${doneGlasses ? "已完成" : glasses.artifact}</small>
          </a>
        </div>
      </article>
    `;
  }).join("");
}

function renderTrackButtons() {
  document.querySelectorAll("[data-track]").forEach((button) => {
    button.classList.toggle("active", button.dataset.track === currentTrack);
    button.onclick = () => {
      currentTrack = button.dataset.track;
      localStorage.setItem("embedded-source-track", currentTrack);
      const url = new URL(location.href);
      url.searchParams.set("track", currentTrack);
      history.replaceState(null, "", url);
      render();
    };
  });
}

function renderModuleMap(track) {
  $("repoName").textContent = track.repo;
  $("repoLink").href = track.repoUrl;
  $("repoPath").textContent = track.filePath;
  $("repoWhy").textContent = track.why;
  $("repoAvoid").textContent = track.avoid;
  $("pathChips").innerHTML = track.evidencePaths.map((path) => `<code>${escapeHtml(path)}</code>`).join("");
  $("licenseNote").textContent = track.licenseNote;
  $("sourceUrl").href = track.sourceUrl;
}

function renderOverview(track) {
  const overview = track.overview || {};
  $("overviewQuestion").textContent = overview.question || "今天先建立总览，再用源码片段验证你的判断。";
  $("overviewOutcome").textContent = overview.outcome || track.artifact;
  $("overviewMap").innerHTML = (overview.map || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  $("studySteps").innerHTML = (overview.steps || []).map((item, index) => `
    <li>
      <span>${index + 1}</span>
      <p>${escapeHtml(item)}</p>
    </li>
  `).join("");
  $("detailQuestions").innerHTML = (overview.detailQuestions || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderSourceReading(track) {
  $("sourceExcerpt").textContent = track.excerpt;
  const sourceBlocks = (track.sourceBlocks || []).map((block, index) => `
    <article class="raw-source-block">
      <header class="raw-source-head">
        <div>
          <p class="eyebrow">Original excerpt ${index + 1}</p>
          <h3>${escapeHtml(block.title)}</h3>
          <p><code>${escapeHtml(block.filePath || track.filePath)}</code></p>
        </div>
        <a class="source-link" href="${escapeHtml(block.sourceUrl || track.sourceUrl)}" target="_blank" rel="noreferrer">Open source</a>
      </header>
      <div class="raw-source-body">
        <pre class="raw-source-code"><code>${escapeHtml(block.code)}</code></pre>
        <aside class="raw-source-notes">
          ${(block.notes || []).map(([label, text]) => `
            <section>
              <strong>${escapeHtml(label)}</strong>
              <p>${escapeHtml(text)}</p>
            </section>
          `).join("")}
          ${(block.tasks || []).length ? `
            <section>
              <strong>读源码时盯住</strong>
              <ul>${block.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}</ul>
            </section>
          ` : ""}
        </aside>
      </div>
    </article>
  `).join("");
  const segmentCards = track.segments.map(([label, quote, note, decision], index) => `
    <section class="segment-card">
      <div class="source-quote">
        <span>${index + 1}</span>
        <p class="segment-label">${escapeHtml(label)}</p>
        <pre><code>${escapeHtml(quote)}</code></pre>
      </div>
      <div class="codex-note">
        <strong>Codex 注释</strong>
        <p>${escapeHtml(note)}</p>
      </div>
      <div class="engineering-note">
        <strong>工程判断</strong>
        <p>${escapeHtml(decision)}</p>
      </div>
    </section>
  `).join("");
  $("segments").innerHTML = sourceBlocks + segmentCards;
}

function renderConcepts(track) {
  $("conceptList").innerHTML = track.concepts.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  $("readTasks").innerHTML = track.readTasks.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  $("inference").textContent = track.inference;
  $("deepDiveList").innerHTML = (track.deepDives || []).map((item) => `
    <article class="deep-dive-card">
      <p class="eyebrow">${escapeHtml(item.label)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
      ${(item.checks || []).length ? `<ul>${item.checks.map((check) => `<li>${escapeHtml(check)}</li>`).join("")}</ul>` : ""}
    </article>
  `).join("");
}

function renderValidation(track) {
  $("artifactTitle").textContent = track.artifact;
  $("challenge").textContent = track.validation.challenge;
  $("rubric").innerHTML = track.validation.rubric.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  $("reference").textContent = track.validation.reference;
  ["module", "facts", "diagram", "budget", "risks", "agent", "unclear"].forEach((field) => {
    const textarea = document.querySelector(`[data-answer="${field}"]`);
    if (!textarea) return;
    textarea.value = localStorage.getItem(keyFor(dayId, currentTrack, `answer-${field}`)) || "";
    textarea.oninput = () => localStorage.setItem(keyFor(dayId, currentTrack, `answer-${field}`), textarea.value);
  });
  const score = $("score");
  score.value = localStorage.getItem(keyFor(dayId, currentTrack, "score")) || "0";
  $("scoreText").textContent = score.value;
  score.oninput = () => {
    localStorage.setItem(keyFor(dayId, currentTrack, "score"), score.value);
    $("scoreText").textContent = score.value;
  };
  renderSavedEvaluation();
}

function readAnswers() {
  return Object.fromEntries(["module", "facts", "diagram", "budget", "risks", "agent", "unclear"].map((field) => {
    const textarea = document.querySelector(`[data-answer="${field}"]`);
    return [field, textarea?.value || ""];
  }));
}

function buildSourceContext() {
  const lesson = getLesson();
  const track = getTrackLesson();
  return {
    day: dayId,
    title: lesson.title,
    track: currentTrack,
    repo: track.repo,
    repoUrl: track.repoUrl,
    filePath: track.filePath,
    evidencePaths: track.evidencePaths,
    overview: track.overview,
    excerpt: track.excerpt,
    sourceBlocks: track.sourceBlocks,
    segments: track.segments,
    concepts: track.concepts,
    deepDives: track.deepDives,
    readTasks: track.readTasks,
    artifact: track.artifact,
    validation: track.validation
  };
}

async function postLlm(path, payload) {
  const base = getLlmBase();
  if (!base) throw new Error("LLM_API_BASE 未配置。");
  const response = await fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

function renderMarkdownLite(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

async function unlockLlm() {
  const password = $("llmPassword").value;
  $("llmStatus").textContent = "正在解锁...";
  try {
    const response = await fetch(getLlmBase() + "/api/session", {
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
    $("llmStatus").textContent = error.message;
  }
}

async function askLlm() {
  const question = $("llmQuestion").value.trim();
  if (!question) return;
  $("llmAnswer").innerHTML = "正在根据当前源码片段回答...";
  try {
    const result = await postLlm("/api/chat", {
      mode: "clarify",
      day: dayId,
      track: currentTrack,
      tab: "source-reader",
      question,
      lessonContext: buildSourceContext(),
      foundationContext: []
    });
    $("llmAnswer").innerHTML = renderMarkdownLite(result.answer || "没有返回内容。");
  } catch (error) {
    $("llmAnswer").textContent = error.message;
    if (String(error.message).includes("401") || String(error.message).includes("locked")) $("llmAuth").classList.remove("hidden");
  }
}

function renderSavedEvaluation() {
  const saved = localStorage.getItem(keyFor(dayId, currentTrack, "evaluation"));
  $("evaluation").innerHTML = saved ? renderEvaluation(JSON.parse(saved)) : "";
}

function renderEvaluation(result) {
  const rows = Array.isArray(result.rubricScores)
    ? result.rubricScores.map((item) => `<li>${escapeHtml(item.name || item.criterion || "分项")}：${escapeHtml(item.score ?? "-")} - ${escapeHtml(item.comment || "")}</li>`).join("")
    : "";
  return `
    <article class="evaluation-card">
      <strong>LLM评分：${escapeHtml(result.score ?? "-")} / 5</strong>
      ${rows ? `<ul>${rows}</ul>` : ""}
      <p><b>亮点：</b>${escapeHtml((result.strengths || []).join("；") || "暂无")}</p>
      <p><b>漏洞：</b>${escapeHtml((result.gaps || []).join("；") || "暂无")}</p>
      <p><b>建议：</b>${renderMarkdownLite(result.suggestedRevision || "暂无")}</p>
    </article>
  `;
}

async function evaluate() {
  $("evaluation").innerHTML = "<article class=\"evaluation-card\">正在评估，重点检查你是否引用了源码片段...</article>";
  const track = getTrackLesson();
  try {
    const result = await postLlm("/api/evaluate", {
      mode: "evaluate",
      day: dayId,
      track: currentTrack,
      answers: readAnswers(),
      rubric: track.validation.rubric,
      pitfalls: ["只写概念定义，没有引用源码路径", "没有数量级预算", "没有把源码证据转成工程判断"],
      reference: track.validation.reference,
      lessonContext: buildSourceContext(),
      foundationContext: []
    });
    localStorage.setItem(keyFor(dayId, currentTrack, "evaluation"), JSON.stringify(result));
    $("evaluation").innerHTML = renderEvaluation(result);
  } catch (error) {
    $("evaluation").textContent = error.message;
  }
}

function renderDay() {
  const lesson = getLesson();
  const track = getTrackLesson();
  document.title = `Day ${dayId} 源码导读 - ${lesson.title}`;
  $("dayTitle").textContent = `Day ${dayId} · ${lesson.title}`;
  $("dayTheme").textContent = lesson.theme;
  $("trackName").textContent = track.product;
  renderTrackButtons();
  renderNav();
  renderOverview(track);
  renderModuleMap(track);
  renderSourceReading(track);
  renderConcepts(track);
  renderValidation(track);
  $("llmStatus").textContent = getLlmBase() ? "输入密码后可让 LLM 围绕当前源码片段解释和评估。" : "LLM_API_BASE 未配置，离线阅读可用。";
  $("llmAuth").classList.toggle("hidden", !getLlmBase() || llmUnlocked);
}

function render() {
  if (dayId) renderDay();
  else {
    renderIndex();
    renderTrackButtons();
  }
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target?.id === "markDone") {
    localStorage.setItem(keyFor(dayId, currentTrack, "done"), "1");
    target.textContent = "已完成";
  }
  if (target?.id === "llmUnlock") unlockLlm();
  if (target?.id === "llmAsk") askLlm();
  if (target?.id === "evaluateBtn") evaluate();
});

render();
