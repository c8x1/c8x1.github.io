(function() {
    'use strict';

    // === Config ===
    const DOCS = [
        { id: '01', file: 'docs/01_embedded_fundamentals.md', title: '01 嵌入式系统基础概念', day: 'Day 1-2' },
        { id: '02', file: 'docs/02_project_architecture_overview.md', title: '02 项目全局架构解析', day: 'Day 3-4' },
        { id: '03', file: 'docs/03_freertos_and_task_architecture.md', title: '03 FreeRTOS与任务架构', day: 'Day 5-6' },
        { id: '04', file: 'docs/04_audio_pipeline_deep_dive.md', title: '04 音频管线深度剖析', day: 'Day 7-8' },
        { id: '05', file: 'docs/05_display_and_ui_system.md', title: '05 显示系统与UI框架', day: 'Day 9-10' },
        { id: '06', file: 'docs/06_communication_and_protocols.md', title: '06 通信协议与系统互联', day: 'Day 11-12' },
        { id: '07', file: 'docs/07_integration_and_roadmap.md', title: '07 集成与Demo路线图', day: 'Day 13-14' },
    ];

    const STORAGE_KEY = 'sg_study_progress';

    // === State ===
    let currentDocIndex = -1;
    let cache = {};

    // === DOM ===
    const homeView = document.getElementById('home-view');
    const readView = document.getElementById('read-view');
    const readTitle = document.getElementById('read-title');
    const readContent = document.getElementById('read-content');
    const readPage = document.getElementById('read-page');
    const totalProgress = document.getElementById('total-progress');
    const progressText = document.getElementById('progress-text');
    const btnBack = document.getElementById('btn-back');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnPrevBottom = document.getElementById('btn-prev-bottom');
    const btnNextBottom = document.getElementById('btn-next-bottom');
    const btnMarkRead = document.getElementById('btn-mark-read');

    // === Progress ===
    function getProgress() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch { return {}; }
    }

    function saveProgress(progress) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }

    function toggleRead(docId) {
        const p = getProgress();
        if (p[docId]) { delete p[docId]; } else { p[docId] = true; }
        saveProgress(p);
        updateProgressUI();
    }

    function updateProgressUI() {
        const p = getProgress();
        const readCount = DOCS.filter(d => p[d.id]).length;
        const pct = Math.round((readCount / DOCS.length) * 100);

        totalProgress.style.width = pct + '%';
        progressText.textContent = '学习进度：' + pct + '%（' + readCount + '/' + DOCS.length + '）';

        DOCS.forEach(d => {
            const statusEl = document.getElementById('status-' + d.id);
            const cardEl = statusEl ? statusEl.closest('.toc-card') : null;
            if (statusEl) {
                statusEl.className = 'toc-status' + (p[d.id] ? ' read' : '');
            }
            if (cardEl) {
                cardEl.className = 'toc-card' + (p[d.id] ? ' completed' : '');
            }
        });

        // Update mark button
        if (currentDocIndex >= 0) {
            const docId = DOCS[currentDocIndex].id;
            const isRead = !!p[docId];
            btnMarkRead.textContent = isRead ? '✓ 已读' : '✓ 标记已读';
            btnMarkRead.className = 'btn-bottom btn-mark-read' + (isRead ? ' marked' : '');
        }
    }

    // === Navigation ===
    function showHome() {
        homeView.classList.remove('hidden');
        readView.classList.add('hidden');
        currentDocIndex = -1;
        window.scrollTo(0, 0);
        history.pushState(null, '', window.location.pathname);
    }

    function showDoc(index) {
        if (index < 0 || index >= DOCS.length) return;
        currentDocIndex = index;
        const doc = DOCS[index];

        homeView.classList.add('hidden');
        readView.classList.remove('hidden');
        readTitle.textContent = doc.day + ' ' + doc.title;
        readPage.textContent = (index + 1) + '/' + DOCS.length;

        // Update nav buttons
        btnPrev.disabled = (index === 0);
        btnNext.disabled = (index === DOCS.length - 1);
        btnPrevBottom.textContent = index > 0 ? '← ' + DOCS[index-1].title.substring(0,6) : '';
        btnNextBottom.textContent = index < DOCS.length - 1 ? DOCS[index+1].title.substring(0,6) + ' →' : '';

        updateProgressUI();
        window.scrollTo(0, 0);

        // Load content
        loadDoc(doc);

        history.pushState(null, '', '#doc/' + doc.id);
    }

    async function loadDoc(doc) {
        readContent.innerHTML = '<div class="loading">加载中...</div>';

        try {
            let md;
            if (cache[doc.id]) {
                md = cache[doc.id];
            } else {
                const resp = await fetch(doc.file);
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                md = await resp.text();
                cache[doc.id] = md;
            }

            // Render markdown
            const html = marked.parse(md, {
                breaks: true,
                gfm: true,
                headerIds: true,
            });

            readContent.innerHTML = html;

            // Make h2 sections collapsible (for fragmented reading)
            makeCollapsible();

            // Auto-detect scroll to estimate reading
            setupScrollTracker(doc.id);

        } catch (err) {
            readContent.innerHTML = '<p style="color:var(--orange)">加载失败: ' + err.message + '</p><p>请确保通过 HTTP 服务器访问（非 file:// 协议）</p>';
        }
    }

    function makeCollapsible() {
        const headings = readContent.querySelectorAll('h2');
        headings.forEach(h2 => {
            h2.addEventListener('click', function() {
                this.classList.toggle('collapsed');
            });
        });
    }

    let scrollTrackerCleanup = null;
    function setupScrollTracker(docId) {
        if (scrollTrackerCleanup) {
            window.removeEventListener('scroll', scrollTrackerCleanup);
        }

        let scrolledToBottom = false;
        function onScroll() {
            const scrollPos = window.innerHeight + window.scrollY;
            const bodyHeight = document.body.offsetHeight;
            if (scrollPos >= bodyHeight - 200 && !scrolledToBottom) {
                scrolledToBottom = true;
                // Auto-mark as read when scrolled to bottom
                const p = getProgress();
                if (!p[docId]) {
                    p[docId] = true;
                    saveProgress(p);
                    updateProgressUI();
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        scrollTrackerCleanup = onScroll;
    }

    // === Event Listeners ===
    btnBack.addEventListener('click', showHome);

    btnPrev.addEventListener('click', () => showDoc(currentDocIndex - 1));
    btnNext.addEventListener('click', () => showDoc(currentDocIndex + 1));
    btnPrevBottom.addEventListener('click', () => showDoc(currentDocIndex - 1));
    btnNextBottom.addEventListener('click', () => showDoc(currentDocIndex + 1));

    btnMarkRead.addEventListener('click', function() {
        if (currentDocIndex >= 0) {
            toggleRead(DOCS[currentDocIndex].id);
        }
    });

    // TOC card clicks
    document.querySelectorAll('.toc-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const docId = this.dataset.doc;
            const idx = DOCS.findIndex(d => d.id === docId);
            if (idx >= 0) showDoc(idx);
        });
    });

    // Keyboard nav
    document.addEventListener('keydown', function(e) {
        if (currentDocIndex < 0) return;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); showDoc(currentDocIndex - 1); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); showDoc(currentDocIndex + 1); }
        if (e.key === 'Escape') showHome();
    });

    // Handle back button / hash changes
    window.addEventListener('popstate', function() {
        const hash = window.location.hash;
        if (hash.startsWith('#doc/')) {
            const docId = hash.replace('#doc/', '');
            const idx = DOCS.findIndex(d => d.id === docId);
            if (idx >= 0) { showDoc(idx); return; }
        }
        showHome();
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.textContent = '↑';
    scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

    // === Init ===
    function init() {
        updateProgressUI();

        // Check hash on load
        const hash = window.location.hash;
        if (hash.startsWith('#doc/')) {
            const docId = hash.replace('#doc/', '');
            const idx = DOCS.findIndex(d => d.id === docId);
            if (idx >= 0) { showDoc(idx); return; }
        }
    }

    init();
})();
