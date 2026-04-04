#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
每日文章推送流水线 v3 — 优化版
目标: 60秒内完成
- 精准搜索，每次2页，固定3篇文章
- 最简HTML模板
"""
import json, base64, re, urllib.request, urllib.error, urllib.parse, sys
from datetime import date


_TAG_COLORS = {
    "哲学":"blue","人工智能":"blue","商业战略":"blue","创业":"green","商业":"green","书评":"green",
    "文化":"orange","美好生活":"orange","自我认知":"orange","女性主义":"pink","中东政治":"pink",
    "阅读清单":"purple","文化批评":"purple","社会学":"blue","经济学":"blue","科技":"blue","技术":"blue",
    "心理学":"purple","科学哲学":"purple","生物学":"green","科学发现":"green","精选":"blue",
    "AI":"blue","大模型":"blue","开源":"blue",
}
def tag_color(cat):
    return _TAG_COLORS.get(cat,"gray")

# ── 搜索配置 ──────────────────────────────────────────────
SEARCH_KEYWORDS = [
    "AI Agent 2026 技术突破",
    "大模型 开源 最新进展 2026",
]
MAX_PAGES = 2          # 每次关键词最多搜索2页
MAX_ARTICLES = 3       # 固定3篇

# ── GitHub / 飞书配置 ─────────────────────────────────────
GT = 'YOUR_GITHUB_TOKEN_HERE'
REPO = 'c8x1/c8x1.github.io'
FAID = 'cli_a9475643023adbd6'
FSEC = '3NIAIwo0ikAzsnvtRwTxQbGsWnWQYjcd'
FUID = 'ou_5fc1f55128962fa0c8fda833dde80c73'
SF = '/workspace/scripts/.last_push_date'

# ── GitHub API ────────────────────────────────────────────
def gh(path, method='GET', data=None):
    url = 'https://api.github.com/' + urllib.parse.quote(path, safe='/')
    req = urllib.request.Request(url, method=method,
        headers={'Authorization': 'token ' + GT,
                 'Accept': 'application/vnd.github.v3+json',
                 'User-Agent': 'OpenClaw/1.0'})
    if data:
        req.data = json.dumps(data).encode()
        req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return json.loads(r.read())
    except Exception as e:
        print('  [ERR] ' + method + ' ' + path + ' -> ' + str(e))
        return None

# ── 飞书 Token ────────────────────────────────────────────
def ft():
    d = json.dumps({'app_id': FAID, 'app_secret': FSEC}).encode()
    req = urllib.request.Request(
        'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
        data=d, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=8) as r:
        return json.loads(r.read())['tenant_access_token']

def fs(token, uid, text):
    d = {'receive_id': uid, 'msg_type': 'text',
         'content': json.dumps({'text': text}), 'receive_id_type': 'open_id'}
    req = urllib.request.Request(
        'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id',
        data=json.dumps(d).encode(),
        headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=8) as r:
        return json.loads(r.read())

def slug(t):
    s = re.sub(r'[^\w\s-]', '', t.lower())
    return re.sub(r'[-\s]+', '-', s).strip('-')[:60]

# ── 搜索 ──────────────────────────────────────────────────
def search_articles():
    """用 MCP batch_web_search (通过 stdout JSON 协议) 搜索文章"""
    print('  [Search] Starting...')
    results = []
    for kw in SEARCH_KEYWORDS:
        for page in range(1, MAX_PAGES + 1):
            cmd = [
                sys.executable, '-c',
                'import json, subprocess; '
                'r = subprocess.run(["mcporter","call","matrix-mcp","batch_web_search",'
                '"{\\"queries\\":[{\\"query\\":\\"' + kw + '\\",\\"num_results\\":5,\\"cursor\\":"' + str(page) + '"}]}"],'
                'capture_output=True, text=True); print(r.stdout[:2000] if r.stdout else r.stderr[:500])'
            ]
            import subprocess
            try:
                r = subprocess.run(cmd, timeout=15, capture_output=True, text=True)
                raw = r.stdout.strip()
                if raw.startswith('{') or raw.startswith('['):
                    data = json.loads(raw)
                    items = data.get('results', []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
                    for item in items[:5]:
                        if isinstance(item, dict) and item.get('title') and item.get('url'):
                            results.append(item)
            except Exception as e:
                print('  [WARN] Search page failed: ' + str(e))
    # 去重 + 取前MAX_ARTICLES
    seen = set()
    unique = []
    for r in results:
        url = r.get('url', '')
        if url and url not in seen and len(unique) < MAX_ARTICLES:
            seen.add(url)
            unique.append(r)
    print('  [Search] Got ' + str(len(unique)) + ' articles')
    return unique


def esc_h(t):
    if not t: return ""
    return t.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace('"',"&quot;").replace("'","&#039;")


def make_html(article, date_str):
    """生成完整 Tailwind CSS 模板文章（与 build-all.js 一致）"""
    tags = article.get('tags', [])
    cats = ''.join('<span class="tag tag-%s">%s</span>' % (tag_color(t), esc_h(t)) for t in (tags if isinstance(tags,list) else [tags]))
    import datetime
    d = datetime.date.fromisoformat(date_str)
    df = '%d年%d月%d日' % (d.year, d.month, d.day)
    bc = article.get('content_cn','') or article.get('content','') or article.get('snippet','') or article.get('summary','')
    be = article.get('content_en','') or ''
    rt = max(1, len(bc.split())//300)
    sub = '<p class="article-subtitle">%s</p>' % esc_h(article.get('subtitle','')) if article.get('subtitle') else ''
    ou = article.get('originalUrl') or article.get('url','') or ''
    ol = ('<span class="meta-separator">·</span><a href="%s" target="_blank" rel="noopener noreferrer">原文 <i class="fas fa-external-link-alt text-xs"></i></a>' % esc_h(ou)) if ou else ''
    os_ = ('<div class="source-section"><p class="source-link"><strong>原文链接：</strong><a href="%s" target="_blank" rel="noopener noreferrer">%s</a></p></div>' % (esc_h(ou),esc_h(ou))) if ou else ''
    secs = ''
    if bc:
        secs += '<div><h2>中文原文</h2><div>' + ''.join('<p>%s</p>' % p for p in bc.split('\n') if p.strip()) + '</div></div>'
    if be:
        secs += '<div class="section"><h2 class="en">English Original</h2><div>' + ''.join('<p>%s</p>' % p for p in be.split('\n') if p.strip()) + '</div></div>'
    if not secs: secs = '<p>%s</p>' % esc_h(article.get('summary',''))
    t_ = esc_h(article.get('title',''))
    au = esc_h(article.get('author',''))
    so = esc_h(article.get('source',''))
    md = esc_h(article.get('summary','')[:200])
    tc = "{ darkMode: 'class', theme: { extend: { fontFamily: { serif: ['Noto Serif SC', 'serif'], sans: ['Inter', 'sans-serif'] } } } }"
    html = '\n'.join([
        '<!DOCTYPE html>',
        '<html lang="zh-CN">',
        '<head>',
        '    <meta charset="UTF-8">',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '    <meta name="description" content="%s">' % md,
        '    <title>%s | 每日精选</title>' % t_,
        '    <meta property="og:title" content="%s">' % t_,
        '    <meta property="og:description" content="%s">' % md,
        '    <meta property="og:type" content="article">',
        '    <meta property="article:published_time" content="%s">' % date_str,
        '    <meta property="article:author" content="%s">' % au,
        '    <link rel="preconnect" href="https://fonts.googleapis.com">',
        '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">',
        '    <script src="https://cdn.tailwindcss.com"></script>',
        '    <script>tailwind.config = { %s }</script>' % tc,
        '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">',
        '    <link rel="stylesheet" href="/assets/css/main.css">',
        '    <link rel="stylesheet" href="/assets/css/article.css">',
        '    <script>(function(){var th=localStorage.getItem("theme");if(th==="dark"||(!th&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark");}})();</script>',
        '</head>',
        '<body class="bg-gray-50 dark:bg-[#0f0f23] text-gray-800 dark:text-gray-200">',
        '    <div class="reading-progress" id="reading-progress"></div>',
        '    <nav class="bg-white dark:bg-[#1a1a2e] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-md">',
        '        <div class="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">',
        '            <a href="/" class="font-serif text-lg font-bold text-gray-900 dark:text-white"><span>每日</span><span class="text-blue-600">精选</span></a>',
        '            <div class="flex items-center gap-3">',
        '                <a href="/" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">← 返回首页</a>',
        '                <button class="theme-toggle w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center" title="切换主题">',
        '                    <i class="fas fa-moon text-gray-600 dark:text-gray-400 icon-moon"></i><i class="fas fa-sun text-yellow-500 icon-sun hidden"></i>',
        '                </button>',
        '            </div>',
        '        </div>',
        '    </nav>',
        '    <article class="article-container" itemscope itemtype="http://schema.org/Article">',
        '        <header class="article-header">',
        '            <div class="article-categories">%s</div>' % cats,
        '            <h1 class="article-page-title" itemprop="headline">%s</h1>' % t_,
        '            %s' % sub,
        '            <div class="article-meta-row">',
        '                <span itemprop="author">%s</span>' % au,
        '                <span class="meta-separator">·</span>',
        '                <span itemprop="publisher">%s</span>' % so,
        '                <span class="meta-separator">·</span>',
        '                <time itemprop="datePublished" datetime="%s">%s</time>' % (date_str, df),
        '                <span class="meta-separator">·</span><span>%d分钟阅读</span>' % rt,
        '                %s' % ol,
        '            </div>',
        '        </header>',
        '        <div class="article-content" itemprop="articleBody">',
        '            %s' % secs,
        '        </div>',
        '        %s' % os_,
        '    </article>',
        '    <script src="/assets/js/main.js"></script>',
        '</body>',
        '</html>',
    ])
    return html


# ── GitHub Push ────────────────────────────────────────────
def push(path, html, title, dstr):
    r = gh('repos/' + REPO + '/contents/' + path)
    sha = r.get('sha') if r else None
    result = gh('repos/' + REPO + '/contents/' + path, method='PUT',
        data={'message': 'feat: ' + dstr + ' - ' + title[:50],
              'content': base64.b64encode(html.encode('utf-8')).decode('ascii'),
              'sha': sha, 'branch': 'main'})
    ok = result and 'content' in result
    print('    [' + ('OK' if ok else 'WARN') + '] ' + path)

def upd_json(arts, dstr):
    r = gh('repos/' + REPO + '/contents/articles.json')
    if not r:
        print('  [WARN] articles.json read failed'); return 0
    data = json.loads(base64.b64decode(r['content']).decode('utf-8'))
    total = data.get('meta', {}).get('totalArticles', 0)
    new_total = total + len(arts)
    data['meta']['totalArticles'] = new_total
    data['meta']['updated'] = dstr
    for a in arts:
        s = slug(a['title'])
        data['articles'].append({
            'id': s, 'title': a['title'],
            'subtitle': a.get('subtitle', ''),
            'author': a.get('author', ''), 'source': a.get('source', ''),
            'date': dstr, 'category': ['精选'],
            'tags': [], 'summary': a.get('snippet', '')[:200],
            'file': dstr + '/' + s + '.html',
            'originalUrl': a.get('url', ''),
            'stats': {'wordCount': len((a.get('content_cn','') or a.get('snippet','')).split()), 'readTime': max(1, len((a.get('content_cn','') or a.get('snippet','')).split()) // 300)}, 'content_cn': a.get('content_cn','') or '', 'content_en': a.get('content_en','') or ''
        })
    result = gh('repos/' + REPO + '/contents/articles.json', method='PUT',
        data={'message': 'update index: ' + dstr + ' +' + str(len(arts)),
              'content': base64.b64encode(json.dumps(data, ensure_ascii=False, indent=2).encode()).decode(),
              'sha': r['sha'], 'branch': 'main'})
    print('    [OK] articles.json -> total ' + str(new_total))
    return new_total

# ── 主流程 ────────────────────────────────────────────────
def main():
    today = date.today().isoformat()
    disp = today[:4] + '年' + str(int(today[5:7])) + '月' + str(int(today[8:10])) + '日'
    print('[Pipeline v3] ' + today)

    print('  [1/4] Search articles...')
    articles = search_articles()
    if not articles:
        print('  [WARN] No articles found, fallback to empty push')
        articles = []

    print('  [2/4] Push HTML...')
    for a in articles:
        s = slug(a['title'])
        html = make_html(a, today)
        push(today + '/' + s + '.html', html, a['title'], today)

    print('  [3/4] Update articles.json...')
    new_total = upd_json(articles, today)

    print('  [4/4] Feishu notification...')
    token = ft()
    links = '\n'.join([
        '> ' + a['title'] + '\n  https://c8x1.github.io/' + today + '/' + slug(a['title']) + '.html'
        for a in articles
    ])
    msg = disp + ' 每日精选已更新\n\n---\n' + links + '\n\n---\n全部: https://c8x1.github.io/' + today + '/\n累计: ' + str(new_total) + ' 篇'
    r = fs(token, FUID, msg)
    print('    Feishu: ' + str(r.get('code', r)))

    with open(SF, 'w') as f:
        f.write(today)
    print('[DONE] ' + today + ' +' + str(len(articles)) + ' articles')

if __name__ == '__main__':
    main()
