/**
 * 每日精选 - 共享功能模块
 */

(function() {
  'use strict';

  // ============================================
  // 主题管理
  // ============================================
  const ThemeManager = {
    STORAGE_KEY: 'theme',
    
    init() {
      this.applyTheme(this.getTheme());
      this.bindEvents();
    },
    
    getTheme() {
      // 检查本地存储
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) return saved;
      
      // 检查系统偏好
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      
      return 'light';
    },
    
    applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.classList.remove('dark');
      }
    },
    
    toggle() {
      const current = this.getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      
      this.applyTheme(next);
      localStorage.setItem(this.STORAGE_KEY, next);
      
      return next;
    },
    
    bindEvents() {
      // 监听系统主题变化
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // 仅在用户未手动设置时跟随系统
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
      
      // 绑定切换按钮
      document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
    }
  };

  // ============================================
  // 音乐播放器管理
  // ============================================
  const PlayerManager = {
    instance: null,
    
    init(options = {}) {
      // 检查 APlayer 是否可用
      if (typeof APlayer === 'undefined') return;
      
      const container = document.getElementById('aplayer');
      if (!container) return;
      
      const defaultOptions = {
        container: container,
        fixed: true,
        autoplay: false,
        theme: '#3b82f6',
        loop: 'all',
        order: 'random',
        preload: 'metadata',
        volume: 0.7,
        listFolded: true,
        lrcType: 0,
        audio: [
          {
            name: 'Magic Waltz',
            artist: 'Amedeo Tommasi',
            url: 'https://cdn.jsdelivr.net/gh/c8x1/c8x1.github.io@master/music/19ca4ac8-1952-85ad-8000-00009745e2e0_Amedeo_Tommasi_-_Magic_Waltz.mp3',
            cover: ''
          },
          {
            name: 'Midnight City',
            artist: 'M83',
            url: 'https://cdn.jsdelivr.net/gh/c8x1/c8x1.github.io@master/music/19ca4acd-d302-8f69-8000-000041e9ed75_M83_-_Midnight_City.mp3',
            cover: ''
          },
          {
            name: "1900's Theme",
            artist: 'Ennio Morricone',
            url: 'https://cdn.jsdelivr.net/gh/c8x1/c8x1.github.io@master/music/19ca4e23-2082-8215-8000-0000a38438bb_Ennio_Morricone_-_1900_s_Theme.mp3',
            cover: ''
          }
        ]
      };
      
      this.instance = new APlayer({ ...defaultOptions, ...options });
      
      // 标记 body 有播放器
      document.body.classList.add('has-player');
      
      // 监听播放开始，使用 IntersectionObserver 实现懒加载播放
      this.setupLazyLoad();
    },
    
    setupLazyLoad() {
      // 如果用户在页面底部，再加载播放器音频
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 播放器可见时的处理
          }
        });
      });
      
      const container = document.getElementById('aplayer');
      if (container) observer.observe(container);
    },
    
    play() {
      this.instance?.play();
    },
    
    pause() {
      this.instance?.pause();
    }
  };

  // ============================================
  // 阅读进度
  // ============================================
  const ReadingProgress = {
    progressBar: null,
    
    init() {
      // 只在文章页创建进度条
      if (!document.querySelector('.article-content')) return;
      
      this.progressBar = document.createElement('div');
      this.progressBar.className = 'reading-progress';
      this.progressBar.style.width = '0%';
      document.body.appendChild(this.progressBar);
      
      window.addEventListener('scroll', this.throttle(() => {
        this.update();
      }, 16));
    },
    
    update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      if (this.progressBar) {
        this.progressBar.style.width = `${Math.min(progress, 100)}%`;
      }
    },
    
    throttle(fn, wait) {
      let lastTime = 0;
      return function() {
        const now = Date.now();
        if (now - lastTime >= wait) {
          lastTime = now;
          fn.apply(this, arguments);
        }
      };
    }
  };

  // ============================================
  // 返回顶部
  // ============================================
  const BackToTop = {
    button: null,
    threshold: 300,
    
    init() {
      this.button = document.createElement('button');
      this.button.className = 'back-to-top';
      this.button.innerHTML = '↑';
      this.button.setAttribute('aria-label', '返回顶部');
      this.button.setAttribute('title', '返回顶部');
      document.body.appendChild(this.button);
      
      this.button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      
      window.addEventListener('scroll', this.throttle(() => {
        this.toggle();
      }, 100));
    },
    
    toggle() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollTop > this.threshold) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    },
    
    throttle(fn, wait) {
      let timeout;
      return function() {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            fn.apply(this, arguments);
          }, wait);
        }
      };
    }
  };

  // ============================================
  // 图片懒加载
  // ============================================
  const LazyImages = {
    init() {
      if (!('IntersectionObserver' in window)) {
        // 回退：直接加载所有图片
        this.loadAll();
        return;
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.load(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
      });
    },
    
    load(img) {
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      }
    },
    
    loadAll() {
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.load(img);
      });
    }
  };

  // ============================================
  // 搜索功能
  // ============================================
  const Search = {
    data: [],
    
    async init(articlesUrl = '/articles.json') {
      try {
        const response = await fetch(articlesUrl);
        const result = await response.json();
        this.data = result.articles || [];
      } catch (error) {
        console.error('Failed to load search data:', error);
      }
    },
    
    query(keyword) {
      if (!keyword || keyword.length < 2) return [];
      
      const lower = keyword.toLowerCase();
      return this.data.filter(article => {
        return article.title?.toLowerCase().includes(lower) ||
               article.summary?.toLowerCase().includes(lower) ||
               article.tags?.some(tag => tag.toLowerCase().includes(lower)) ||
               article.category?.some(cat => cat.toLowerCase().includes(lower));
      });
    }
  };

  // ============================================
  // 初始化
  // ============================================
  function init() {
    ThemeManager.init();
    ReadingProgress.init();
    BackToTop.init();
    LazyImages.init();
    
    // 播放器延迟加载
    if (document.getElementById('aplayer')) {
      // 使用 requestIdleCallback 或 setTimeout 延迟加载
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => PlayerManager.init());
      } else {
        setTimeout(() => PlayerManager.init(), 1000);
      }
    }
  }

  // DOM 就绪后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 暴露全局 API
  window.DailyCurated = {
    ThemeManager,
    PlayerManager,
    ReadingProgress,
    BackToTop,
    Search
  };
})();
