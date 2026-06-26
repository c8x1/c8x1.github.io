// nav.js — 侧栏树展开折叠 / 当前页高亮 / 当前 tech 自动展开 / 移动端抽屉 / 亮暗切换
(function () {
  // ---- 主题 ----
  var root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
    try { localStorage.setItem('theme', t); } catch (e) {}
  }
  window.toggleTheme = function () {
    var cur = root.getAttribute('data-theme') || 'light';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  };
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (saved) { applyTheme(saved); }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { applyTheme('dark'); }
    else { applyTheme('light'); }
  })();

  // ---- 当前页高亮 + 自动展开当前 tech ----
  var cur = window.location.pathname.split('/').pop() || 'index.html';
  if (!cur.endsWith('.html')) cur = 'index.html';
  // 处理目录路径: deep/tech1-x/01-y.html -> 取文件名, 但要匹配 data-target (后者含路径)
  var curPath = window.location.pathname.replace(/^.*\/site\//, '').replace(/^\/+/, '');
  // 在本地 server 下 pathname 可能是 /tech1-x.html 或 /deep/tech1-x/01-y.html
  if (curPath === '' || curPath === '/' || curPath.endsWith('/')) curPath = 'index.html';

  var items = document.querySelectorAll('.nav-item[data-target]');
  items.forEach(function (el) {
    var tgt = el.getAttribute('data-target');
    // 匹配: 末段文件名相同 (deep 页 data-target 是 deep/tech/xx.html, pathname 也是这样)
    var same = (tgt === curPath) || (tgt.endsWith(cur));
    if (same) {
      el.classList.add('active');
      var group = el.closest('.nav-group');
      if (group) {
        group.classList.add('open');
        var ch = group.querySelector('.nav-children');
        if (ch) ch.hidden = false;
      }
    }
  });

  // ---- 展开折叠 ----
  document.querySelectorAll('.nav-tech').forEach(function (el) {
    el.addEventListener('click', function (e) {
      // 如果点击的是 caret 区域或带修饰键, 仅切换; 否则让链接跳转
      // 这里: 点 caret span 切换, 点文字跳转. 简化: 用 caret 单独控制
    });
  });
  document.querySelectorAll('.nav-caret').forEach(function (caret) {
    caret.style.cursor = 'pointer';
    caret.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var group = caret.closest('.nav-group');
      if (!group) return;
      var ch = group.querySelector('.nav-children');
      group.classList.toggle('open');
      if (ch) ch.hidden = !group.classList.contains('open');
    });
  });
  // tech 标题点击若已展开且当前就在该 tech, 折叠; 默认跳转
  document.querySelectorAll('.nav-tech').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target.classList.contains('nav-caret')) return; // 已处理
      var group = el.closest('.nav-group');
      var ch = group && group.querySelector('.nav-children');
      // 点标题: 展开 + 跳转 (跳转由 a 默认行为完成)
      if (group) { group.classList.add('open'); if (ch) ch.hidden = false; }
    });
  });

  // ---- 移动端抽屉 ----
  window.toggleSidebar = function (show) {
    var sb = document.getElementById('sidebar');
    var ov = document.getElementById('sidebar-overlay');
    if (show) { sb.classList.add('show'); ov.classList.add('show'); }
    else { sb.classList.remove('show'); ov.classList.remove('show'); }
  };
})();
