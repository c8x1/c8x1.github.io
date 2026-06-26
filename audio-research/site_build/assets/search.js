// search.js — flexsearch 客户端搜索
(function () {
  var input = document.getElementById('search-input');
  var resultsEl = document.getElementById('search-results');
  if (!input || !resultsEl) return;

  var index = null;
  var docs = null;
  var loaded = false;

  function baseUrl() {
    // 相对当前页算到 site 根
    var p = window.location.pathname;
    // 去掉末尾文件名, 保留目录
    var dir = p.substring(0, p.lastIndexOf('/'));
    if (dir.endsWith('/')) dir = dir.slice(0, -1);
    // 若在子目录(deep/...), 回退
    var depth = (dir.match(/\//g) || []).length;
    // /tech1.html -> dir='' depth=0 -> ''
    // /deep/tech1/01.html -> dir=/deep/tech1 depth=2 -> '../../'
    var prefix = '';
    if (depth === 0) prefix = '';
    else prefix = '../'.repeat(depth);
    return prefix;
  }

  function loadIndex(cb) {
    if (loaded) { cb(); return; }
    var url = baseUrl() + 'search-index.json';
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      docs = data;
      index = new FlexSearch.Index({ tokenize: 'forward', encode: function (s) {
        return s.toLowerCase().replace(/[　-￿]/g, function (c) { return c; }).split(/\s+/);
      }});
      data.forEach(function (d, i) {
        index.add(i, d.title + ' ' + d.headings + ' ' + d.snippet);
      });
      loaded = true;
      cb();
    }).catch(function (e) {
      console.error('search index load failed', e);
    });
  }

  function render(q) {
    if (!q.trim()) { resultsEl.hidden = true; resultsEl.innerHTML = ''; return; }
    var ids = index.search(q, 30);
    if (!ids.length) {
      resultsEl.innerHTML = '<li style="padding:8px 12px;color:var(--text-muted);font-size:13px">无匹配结果</li>';
      resultsEl.hidden = false;
      return;
    }
    var html = '';
    ids.forEach(function (id) {
      var d = docs[id];
      var url = baseUrl() + d.url;
      var snip = d.snippet ? d.snippet.substring(0, 90) : '';
      html += '<li><a href="' + url + '"><span class="sr-title">' + escapeHtml(d.title) +
        '</span><span class="sr-snippet">' + escapeHtml(snip) + '</span></a></li>';
    });
    resultsEl.innerHTML = html;
    resultsEl.hidden = false;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]; });
  }

  var timer = null;
  input.addEventListener('input', function () {
    var v = input.value;
    if (!v.trim()) { resultsEl.hidden = true; resultsEl.innerHTML = ''; return; }
    clearTimeout(timer);
    timer = setTimeout(function () {
      loadIndex(function () { render(v); });
    }, 120);
  });
  input.addEventListener('focus', function () {
    if (input.value.trim()) loadIndex(function () { render(input.value); });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-box')) { resultsEl.hidden = true; }
  });
  input.addEventListener('click', function (e) { e.stopPropagation(); });
})();
