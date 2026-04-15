(function () {
  function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (!dot || !ring) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.opacity = '.4';
      });

      el.addEventListener('mouseleave', () => {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '1';
      });
    });
  }

  window.ARLibro = window.ARLibro || {};
  window.ARLibro.initCursor = initCursor;
})();
