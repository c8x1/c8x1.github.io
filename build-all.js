#!/usr/bin/env node
/**
 * 离线文章生成器 - 无需原仓库，使用占位内容
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');

// HTML 转义
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 获取标签颜色
function getTagColor(category) {
  const colors = {
    '哲学': 'blue', '人工智能': 'blue', '商业战略': 'blue',
    '创业': 'green', '商业': 'green', '书评': 'green', '政治学': 'green',
    '文化': 'orange', '美好生活': 'orange', '自我认知': 'orange',
    '女性主义': 'pink', '中东政治': 'pink',
    '阅读清单': 'purple', '文化批评': 'purple',
    '社会学': 'blue', '经济学': 'blue',
    '科技': 'blue', '技术': 'blue',
    '心理学': 'purple', '科学哲学': 'purple',
    '生物学': 'green', '科学发现': 'green',
    '创意写作': 'orange',
    '发展研究': 'green'
  };
  return colors[category] || 'gray';
}

// 生成文章页
function generateArticle(article, allArticles) {
  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = allArticles[currentIndex + 1];
  const nextArticle = allArticles[currentIndex - 1];
  
  const categories = (article.category || [])
    .map(cat => `<span class="tag tag-${getTagColor(cat)}">${escapeHtml(cat)}</span>`)
    .join('');
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };
  
  const prevNav = prevArticle ? `
    <a href="/${prevArticle.file}" class="nav-link prev" title="${escapeHtml(prevArticle.title)}">
      <span class="nav-link-text">${escapeHtml(prevArticle.title)}</span>
    </a>
  ` : '<span></span>';
  
  const nextNav = nextArticle ? `
    <a href="/${nextArticle.file}" class="nav-link next" title="${escapeHtml(nextArticle.title)}">
      <span class="nav-link-text">${escapeHtml(nextArticle.title)}</span>
    </a>
  ` : '<span></span>';
  
  const originalLink = article.originalUrl ? `
    <div class="source-section">
      <p class="source-link">
        <strong>原文链接：</strong>
        <a href="${article.originalUrl}" target="_blank" rel="noopener noreferrer">${article.originalUrl}</a>
      </p>
    </div>
  ` : '';

  // 构建正文内容：优先用 content_cn + content_en，其次用 summary
  const hasContent = article.content_cn || article.content_en;
  const content_cn = article.content_cn || article.summary || '';
  const content_en = article.content_en || '';

  function para(text) {
    if (!text) return '';
    return text.split('\n\n').map(block => {
      const b = block.trim();
      if (!b) return '';
      if (b.startsWith('* ') || b.startsWith('- ')) {
        const items = b.split('\n').filter(l => l.startsWith('* ')||l.startsWith('- '))
          .map(l => `<li>${escapeHtml(l.replace(/^[*-] /,''))}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${escapeHtml(b).replace(/\n/g,'<br>')}</p>`;
    }).join('');
  }

  let articleBody = '';
  if (content_en) {
    articleBody = `<div><h2>English Original</h2><div>${para(content_en)}</div></div>`;
  }
  if (content_cn) {
    articleBody += `<div><h2>中文原文</h2><div>${para(content_cn)}</div></div>`;
  }
  if (!articleBody) {
    articleBody = `<p>${escapeHtml(article.summary || '')}</p>`;
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(article.summary || '')}">
    <title>${escapeHtml(article.title)} | 每日精选</title>
    <meta property="og:title" content="${escapeHtml(article.title)}">
    <meta property="og:description" content="${escapeHtml(article.summary || '')}">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="${article.date}">
    <meta property="article:author" content="${escapeHtml(article.author || '')}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        serif: ['Noto Serif SC', 'serif'],
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="stylesheet" href="/assets/css/article.css">
    <script>
        (function() {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>
</head>
<body class="bg-gray-50 dark:bg-[#0f0f23] text-gray-800 dark:text-gray-200">
    <div class="reading-progress" id="reading-progress"></div>
    <nav class="bg-white dark:bg-[#1a1a2e] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
        <div class="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" class="font-serif text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                <span>每日</span><span class="text-blue-600">精选</span>
            </a>
            <div class="flex items-center gap-3">
                <a href="/" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">← 返回首页</a>
                <button class="theme-toggle w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors" title="切换主题">
                    <i class="fas fa-moon text-gray-600 dark:text-gray-400 icon-moon"></i>
                    <i class="fas fa-sun text-yellow-500 icon-sun hidden"></i>
                </button>
            </div>
        </div>
    </nav>

    <article class="article-container" itemscope itemtype="http://schema.org/Article">
        <header class="article-header">
            <div class="article-categories">${categories}</div>
            <h1 class="article-page-title" itemprop="headline">${escapeHtml(article.title)}</h1>
            ${article.subtitle ? `<p class="article-subtitle">${escapeHtml(article.subtitle)}</p>` : ''}
            <div class="article-meta-row">
                <span itemprop="author">${escapeHtml(article.author || '未知作者')}</span>
                <span class="meta-separator">·</span>
                <span itemprop="publisher">${escapeHtml(article.source || '未知来源')}</span>
                <span class="meta-separator">·</span>
                <time itemprop="datePublished" datetime="${article.date}">${formatDate(article.date)}</time>
                ${article.stats?.readTime ? `<span class="meta-separator">·</span><span>${article.stats.readTime}分钟阅读</span>` : ''}
                ${article.originalUrl ? `<span class="meta-separator">·</span><a href="${article.originalUrl}" target="_blank" rel="noopener noreferrer">原文 <i class="fas fa-external-link-alt text-xs"></i></a>` : ''}
            </div>
        </header>

        <div class="article-content" itemprop="articleBody">
            ${articleBody}
        </div>

        ${originalLink}
    </article>

    <nav class="article-navigation" aria-label="文章导航">
        ${prevNav}
        <a href="/" class="nav-home">返回列表</a>
        ${nextNav}
    </nav>

    <footer class="bg-gray-100 dark:bg-[#16213e] border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
        <div class="max-w-3xl mx-auto px-4 text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">&copy; 2025 Noc's Blog · 每日精选</p>
        </div>
    </footer>

    <button class="back-to-top" id="back-to-top" aria-label="返回顶部">↑</button>

    <script src="/assets/js/main.js"></script>
    <script>
        (function() {
            const progressBar = document.getElementById('reading-progress');
            if (progressBar) {
                let ticking = false;
                function updateProgress() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    progressBar.style.width = Math.min(progress, 100) + '%';
                    ticking = false;
                }
                window.addEventListener('scroll', function() {
                    if (!ticking) {
                        requestAnimationFrame(updateProgress);
                        ticking = true;
                    }
                }, { passive: true });
            }

            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
                let ticking = false;
                function toggleBackToTop() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    backToTop.classList.toggle('visible', scrollTop > 300);
                    ticking = false;
                }
                window.addEventListener('scroll', function() {
                    if (!ticking) {
                        requestAnimationFrame(toggleBackToTop);
                        ticking = true;
                    }
                }, { passive: true });
                backToTop.addEventListener('click', function() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        })();
    </script>
</body>
</html>`;
}

// 主函数
function main() {
  console.log('🚀 生成所有文章页面...\n');
  
  const articlesPath = path.join(DIST_DIR, 'articles.json');
  const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const articles = articlesData.articles;
  
  let count = 0;
  
  for (const article of articles) {
    if (!article.file || typeof article.file !== 'string') {
      console.warn(`  ⚠ Skipping article without valid file path: ${article.title || article.id || article}`);
      continue;
    }
    const outputPath = path.join(DIST_DIR, article.file);
    const dir = path.dirname(outputPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const html = generateArticle(article, articles);
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`✅ ${article.file}`);
    count++;
  }
  
  console.log(`\n🎉 完成！共生成 ${count} 个页面`);
  console.log('\n📦 部署命令：');
  console.log('cd dist && git init && git add . && git commit -m "optimize: rebuild" && git push git@github.com:c8x1/c8x1.github.io.git master');
}

main();
