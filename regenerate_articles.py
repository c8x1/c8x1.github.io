#!/usr/bin/env python3
"""Regenerate 2026-04-03 articles with the full Tailwind CSS template."""

import json
import re
import os
import html

REPO_DIR = os.path.dirname(os.path.abspath(__file__))
ARTICLES_JSON = os.path.join(REPO_DIR, 'articles.json')

def extract_content_from_simple_html(html_content):
    """Extract structured content from the simple inline CSS template."""
    result = {}

    # Extract title
    m = re.search(r'<h1>(.*?)</h1>', html_content)
    if m:
        result['title'] = html.unescape(m.group(1))

    # Extract subtitle, author, source from the line: <p><em>SUBTITLE</em> — AUTHOR · SOURCE</p>
    m = re.search(r'<p><em>(.*?)</em>\s*(?:&#8212;|—)\s*(.*?)\s*(?:&#183;|·)\s*(.*?)</p>', html_content)
    if m:
        result['subtitle'] = html.unescape(m.group(1))
        result['author'] = html.unescape(m.group(2))
        result['source'] = html.unescape(m.group(3))

    # Extract summary from blockquote
    m = re.search(r'<blockquote>(.*?)</blockquote>', html_content, re.DOTALL)
    if m:
        result['summary'] = html.unescape(m.group(1))

    # Extract Chinese content (between <h2>中文原文</h2> and the next section)
    m = re.search(r'<h2>中文原文</h2>\s*<div>(.*?)</div>\s*</div>', html_content, re.DOTALL)
    if m:
        result['zh_content'] = m.group(1)

    # Extract English content
    m = re.search(r'<h2 class="en">English Original</h2>\s*<div>(.*?)</div>\s*</div>', html_content, re.DOTALL)
    if m:
        result['en_content'] = m.group(1)

    # Extract original URL
    m = re.search(r'<a href="(.*?)">原文链接</a>', html_content)
    if m:
        result['originalUrl'] = html.unescape(m.group(1))

    return result


def generate_full_article(article_meta, extracted):
    """Generate full Tailwind CSS article HTML."""

    title = article_meta.get('title', extracted.get('title', ''))
    subtitle = article_meta.get('subtitle', extracted.get('subtitle', ''))
    author = article_meta.get('author', extracted.get('author', ''))
    source = article_meta.get('source', extracted.get('source', ''))
    date = article_meta.get('date', '2026-04-03')
    summary = article_meta.get('summary', extracted.get('summary', ''))
    original_url = article_meta.get('originalUrl', extracted.get('originalUrl', ''))
    categories = article_meta.get('category', [])
    tags = article_meta.get('tags', [])
    read_time = article_meta.get('stats', {}).get('readTime', 10)
    zh_content = extracted.get('zh_content', '')
    en_content = extracted.get('en_content', '')

    # Category tags
    category_tags = '\n            '.join(
        f'<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{html.escape(c)}</span>'
        for c in categories
    )

    # Tag badges in footer
    tag_badges = '\n                '.join(
        f'<span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{html.escape(t)}</span>'
        for t in tags
    )

    # Format date for display
    date_display = date
    try:
        from datetime import datetime
        dt = datetime.strptime(date, '%Y-%m-%d')
        date_display = f'{dt.year}年{dt.month}月{dt.day}日'
    except:
        pass

    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{html.escape(title)} | AI精选</title>
    <meta name="description" content="{html.escape(summary)}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style type="text/tailwindcss">
        @layer base {{
            body {{
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                @apply bg-gray-50 text-gray-900 antialiased;
            }}
            h1, h2, h3, h4, h5, h6 {{
                font-family: 'Noto Serif SC', serif;
            }}
        }}
        @layer components {{
            .article-body p {{
                @apply text-lg leading-relaxed text-gray-700 mb-6;
            }}
            .article-body h2 {{
                @apply text-2xl font-bold text-gray-900 mt-12 mb-6 pb-2 border-b border-gray-200;
            }}
            .article-body h3 {{
                @apply text-xl font-semibold text-gray-800 mt-8 mb-4;
            }}
            .article-body blockquote {{
                @apply border-l-4 border-blue-500 pl-6 py-2 my-8 bg-blue-50 italic text-gray-700;
            }}
            .article-body ul {{
                @apply list-disc list-inside space-y-2 mb-6 text-gray-700;
            }}
            .article-body ol {{
                @apply list-decimal list-inside space-y-2 mb-6 text-gray-700;
            }}
            .article-body a {{
                @apply text-blue-600 hover:text-blue-700 underline;
            }}
            .en-section {{
                @apply mt-12 pt-8 border-t-2 border-blue-200;
            }}
            .en-section h2 {{
                @apply text-2xl font-bold text-blue-800 mt-0 mb-6 pb-2 border-b border-blue-200;
            }}
            .en-section p {{
                @apply text-lg leading-relaxed text-gray-700 mb-6;
            }}
        }}
    </style>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a href="../../index.html" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    每日精选
                </a>
                <div class="hidden md:flex space-x-8">
                    <a href="../../index.html" class="text-gray-600 hover:text-gray-900 transition-colors">首页</a>
                    <a href="../../index.html#archive" class="text-gray-600 hover:text-gray-900 transition-colors">归档</a>
                    <a href="../../about.html" class="text-gray-600 hover:text-gray-900 transition-colors">关于</a>
                </div>
                <button class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Article Header -->
        <header class="mb-12 text-center">
            <div class="flex flex-wrap justify-center gap-3 text-sm text-gray-500 mb-4">
                {category_tags}
                <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{date}</span>
                <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">约{read_time}分钟阅读</span>
            </div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {html.escape(title)}
            </h1>
            <p class="text-lg md:text-xl text-gray-500 italic mb-6">
                {html.escape(subtitle)}
            </p>
            <div class="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 border-t border-b border-gray-200 py-4">
                <span>作者：{html.escape(author)}</span>
                <span class="hidden sm:inline">·</span>
                <span>来源：{html.escape(source)}</span>
            </div>
        </header>

        <!-- Article Body -->
        <article class="article-body">
            <p class="lead text-xl text-gray-600 font-medium border-l-4 border-blue-500 pl-6 py-2 mb-8">
                {html.escape(summary)}
            </p>

            <h2>中文全文</h2>
            {zh_content}

            <div class="en-section">
                <h2>English Original</h2>
                {en_content}
            </div>
        </article>

        <!-- Article Footer -->
        <footer class="mt-16 pt-8 border-t border-gray-200">
            <div class="flex flex-wrap justify-between items-center gap-4">
                <div class="text-sm text-gray-500">
                    <p>原文链接：<a href="{html.escape(original_url)}" target="_blank" class="text-blue-600 hover:text-blue-700">{html.escape(source)}</a></p>
                </div>
                <div class="flex flex-wrap gap-2">
                    {tag_badges}
                </div>
            </div>
        </footer>

        <!-- Navigation Buttons -->
        <div class="mt-12 flex justify-between">
            <a href="../../index.html" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                返回首页
            </a>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-12 mt-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <p class="mb-2">每日精选 | Daily Curated</p>
                <p class="text-sm text-gray-500">每天精选高质量英文文章，翻译为中文</p>
            </div>
        </div>
    </footer>
</body>
</html>'''


def main():
    # Load articles metadata
    with open(ARTICLES_JSON, 'r', encoding='utf-8') as f:
        data = json.load(f)

    articles_by_id = {a['id']: a for a in data['articles']}

    # Process 2026-04-03 articles
    target_dir = os.path.join(REPO_DIR, '2026-04-03')
    for filename in os.listdir(target_dir):
        if not filename.endswith('.html'):
            continue

        filepath = os.path.join(target_dir, filename)
        print(f'Processing: {filename}')

        with open(filepath, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Extract content from simple template
        extracted = extract_content_from_simple_html(html_content)

        # Find matching article metadata
        article_id = os.path.splitext(filename)[0]
        article_meta = articles_by_id.get(article_id, {})

        if not article_meta:
            # Try to find by file path
            file_path = f'2026-04-03/{filename}'
            for a in data['articles']:
                if a.get('file') == file_path:
                    article_meta = a
                    break

        if not article_meta:
            print(f'  WARNING: No metadata found for {filename}, using extracted data')
            article_meta = {}

        # Generate full template
        new_html = generate_full_article(article_meta, extracted)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_html)

        print(f'  Done: {filename}')

    print('\nAll articles regenerated successfully!')


if __name__ == '__main__':
    main()
