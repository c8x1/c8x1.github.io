// Navigation & Mobile Menu
(function() {
  // Mobile menu toggle
  document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('hidden');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.add('hidden');
      });
    }

    // Highlight current page in nav
    const currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar-nav a').forEach(function(link) {
      if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
      }
    });

    // Fade-in on scroll
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function(el) {
      observer.observe(el);
    });
  });
})();
