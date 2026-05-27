// Code Walkthrough Interactions
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Collapsible code sections
    document.querySelectorAll('.code-collapse-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        var content = this.nextElementSibling;
        this.classList.toggle('open');
        content.classList.toggle('open');
      });
    });

    // Annotation marker hover - scroll to annotation in list
    document.querySelectorAll('.ann-marker').forEach(function(marker) {
      marker.addEventListener('click', function() {
        var num = this.textContent;
        var annItem = document.querySelector('.annotation-list .ann-item[data-ann="' + num + '"]');
        if (annItem) {
          annItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          annItem.style.background = 'rgba(59,130,246,0.2)';
          annItem.style.borderRadius = '0.25rem';
          setTimeout(function() {
            annItem.style.background = '';
            annItem.style.borderRadius = '';
          }, 2000);
        }
      });
    });

    // Line numbers toggle
    var lineNumToggle = document.getElementById('toggle-line-numbers');
    if (lineNumToggle) {
      lineNumToggle.addEventListener('click', function() {
        document.querySelectorAll('.code-block').forEach(function(block) {
          block.classList.toggle('hide-line-numbers');
        });
      });
    }
  });
})();
