#!/usr/bin/env node
/**
 * 快速文章迁移脚本
 * 
 * 使用方法:
 * 1. 将原仓库克隆到 ../c8x1.github.io
 * 2. 运行: node migrate.js
 * 3. 检查 dist/ 目录下的生成结果
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  sourceDir: path.join(__dirname, '../c8x1.github.io'),  // 原仓库路径
  distDir: path.join(__dirname, 'dist'),
  template: null  // 将在加载时填充
};

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

// 从原文提取内容
function extractContent(html) {
  // 尝试多种提取模式
  const patterns = [
    /<div class="article-content"[^>]*>([\s\S]*?)<\/div>\s*<div class="mt-8 text-sm/,
    /<div class="prose[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/article>/,
    /<main[^>]*>([\s\S]*?)<\/main>/,
    /<article[^>]*>[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>\s*<\/article>/
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return cleanContent(match[1]);
    }
  }
  
  // 回退：提取 body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    return cleanContent(bodyMatch[1]);
  }
  
  return '<p>内容迁移失败，请手动处理。</p>';
}

// 清理内容
function cleanContent(content) {
  return content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<div id="aplayer"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/\s+class="[^"]*"/g, '')
    .replace(/\s+style="[^"]*"/g, '')
    .replace(/\s+id="[^"]*"/g, '')
    .replace(/<\w+>\s*<\/\w+>/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

// 生成文章页
function generateArticle(article, allArticles, content) {
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
${content}
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
  console.log('🚀 开始迁移文章...\n');
  
  // 检查源目录
  if (!fs.existsSync(CONFIG.sourceDir)) {
    console.error(`❌ 错误：找不到原仓库目录: ${CONFIG.sourceDir}`);
    console.log('请先将原仓库克隆到 ../c8x1.github.io');
    console.log('命令: git clone https://github.com/c8x1/c8x1.github.io.git ../c8x1.github.io');
    process.exit(1);
  }
  
  // 读取文章数据
  const articlesPath = path.join(__dirname, 'dist/articles.json');
  if (!fs.existsSync(articlesPath)) {
    console.error(`❌ 错误：找不到 articles.json`);
    process.exit(1);
  }
  
  const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  const articles = articlesData.articles;
  
  let success = 0;
  let failed = 0;
  
  for (const article of articles) {
    const sourcePath = path.join(CONFIG.sourceDir, article.file);
    const outputPath = path.join(CONFIG.distDir, article.file);
    
    console.log(`📄 ${article.title}`);
    console.log(`   源: ${sourcePath}`);
    
    if (!fs.existsSync(sourcePath)) {
      console.log(`   ⚠️  跳过: 源文件不存在\n`);
      failed++;
      continue;
    }
    
    try {
      // 读取原文
      const html = fs.readFileSync(sourcePath, 'utf-8');
      const content = extractContent(html);
      
      // 生成新页面
      const newHtml = generateArticle(article, articles, content);
      
      // 确保目录存在
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // 写入
      fs.writeFileSync(outputPath, newHtml, 'utf-8');
      console.log(`   ✅ 完成: ${outputPath}\n`);
      success++;
    } catch (error) {
      console.log(`   ❌ 失败: ${error.message}\n`);
      failed++;
    }
  }
  
  console.log(`\n✅ 迁移完成: ${success} 成功, ${failed} 失败`);
}

main();
