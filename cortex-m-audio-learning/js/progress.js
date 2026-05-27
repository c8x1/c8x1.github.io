// Progress Tracking with localStorage
(function() {
  const STORAGE_KEY = 'cortex-m-learning-progress';

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  window.LearningProgress = {
    complete: function(itemId) {
      var progress = getProgress();
      progress[itemId] = { completed: true, date: new Date().toISOString() };
      saveProgress(progress);
      this.updateUI();
    },

    uncomplete: function(itemId) {
      var progress = getProgress();
      delete progress[itemId];
      saveProgress(progress);
      this.updateUI();
    },

    isCompleted: function(itemId) {
      var progress = getProgress();
      return !!progress[itemId];
    },

    getCompletedCount: function() {
      return Object.keys(getProgress()).length;
    },

    getTotalItems: function() {
      return 21; // 6 phases + 10 projects + 4 practical projects + 1 topic
    },

    getPercentage: function() {
      return Math.round((this.getCompletedCount() / this.getTotalItems()) * 100);
    },

    updateUI: function() {
      // Update progress bar
      var progressBars = document.querySelectorAll('[data-progress-bar]');
      progressBars.forEach(function(bar) {
        var fill = bar.querySelector('.fill');
        if (fill) fill.style.width = LearningProgress.getPercentage() + '%';
      });

      // Update progress text
      var progressTexts = document.querySelectorAll('[data-progress-text]');
      progressTexts.forEach(function(el) {
        el.textContent = LearningProgress.getCompletedCount() + '/' + LearningProgress.getTotalItems();
      });

      // Update phase cards
      document.querySelectorAll('[data-phase-id]').forEach(function(card) {
        var id = card.getAttribute('data-phase-id');
        if (LearningProgress.isCompleted(id)) {
          card.classList.add('completed');
        } else {
          card.classList.remove('completed');
        }
      });

      // Update sidebar nav items
      document.querySelectorAll('[data-nav-id]').forEach(function(link) {
        var id = link.getAttribute('data-nav-id');
        if (LearningProgress.isCompleted(id)) {
          link.classList.add('completed');
        }
      });

      // Update checkbox buttons
      document.querySelectorAll('[data-complete-btn]').forEach(function(btn) {
        var id = btn.getAttribute('data-complete-btn');
        if (LearningProgress.isCompleted(id)) {
          btn.textContent = '✓ 已完成';
          btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
          btn.classList.add('bg-green-600', 'hover:bg-green-700');
        } else {
          btn.textContent = '标记为已完成';
          btn.classList.remove('bg-green-600', 'hover:bg-green-700');
          btn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }
      });
    }
  };

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    LearningProgress.updateUI();

    // Bind complete buttons
    document.querySelectorAll('[data-complete-btn]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = this.getAttribute('data-complete-btn');
        if (LearningProgress.isCompleted(id)) {
          LearningProgress.uncomplete(id);
        } else {
          LearningProgress.complete(id);
        }
      });
    });
  });
})();
