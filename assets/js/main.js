document.addEventListener('DOMContentLoaded', () => {
  const init = window.ARLibro || {};

  if (typeof init.initCursor === 'function') {
    init.initCursor();
  }

  if (typeof init.initStarfield === 'function') {
    init.initStarfield();
  }

  if (typeof init.initNavScroll === 'function') {
    init.initNavScroll();
  }

  if (typeof init.initStepReveal === 'function') {
    init.initStepReveal();
  }
});
